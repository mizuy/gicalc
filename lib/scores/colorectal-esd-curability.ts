import type { ScoreResult } from '../../types/score';

/** JGES 大腸 ESD/EMR ガイドライン第2版（2020, Dig Endosc den.13545） */
export const JGES_COLORECTAL_ESD_2020_PUBMED = '31566804';

export type ColorectalEsdCurabilityGrade =
  | 'curative-tis'
  | 'curative-sm'
  | 'additional-consider'
  | 'incomplete-vm';

export type ColorectalEsdCurabilityCellId =
  | 'row-tis'
  | 'row-vm1'
  | 'row-hm1'
  | 'crit-vm'
  | 'crit-hm'
  | 'crit-histology'
  | 'crit-sm-depth'
  | 'crit-ly'
  | 'crit-v'
  | 'crit-budding'
  | 'row-additional';

const SM_CRITERIA = ['histology', 'smDepth', 'ly', 'v', 'budding'] as const;

export type ColorectalEsdCurabilityHighlight = {
  cells: ColorectalEsdCurabilityCellId[];
  partial: boolean;
  complete: boolean;
};

export function getColorectalEsdCurabilityRequiredFields(
  values: Record<string, number | undefined>,
): string[] {
  const required = ['depth', 'vm', 'hm'];
  if (values.depth === 0) {
    required.push('enBloc');
  }
  if (values.depth === 1) {
    required.push('enBloc', ...SM_CRITERIA);
  }
  return required;
}

export function isColorectalEsdCurabilityComplete(
  values: Record<string, number | undefined>,
): boolean {
  return getColorectalEsdCurabilityRequiredFields(values).every((id) => values[id] !== undefined);
}

function smCriteriaMet(values: Record<string, number>): boolean {
  return (
    values.vm === 0 &&
    values.hm === 0 &&
    values.histology === 0 &&
    values.smDepth === 0 &&
    values.ly === 0 &&
    values.v === 0 &&
    values.budding === 0
  );
}

function smCriteriaCells(values: Record<string, number>): ColorectalEsdCurabilityCellId[] {
  const cells: ColorectalEsdCurabilityCellId[] = ['crit-vm'];
  if (values.hm === 0) cells.push('crit-hm');
  if (values.histology === 0) cells.push('crit-histology');
  if (values.smDepth === 0) cells.push('crit-sm-depth');
  if (values.ly === 0) cells.push('crit-ly');
  if (values.v === 0) cells.push('crit-v');
  if (values.budding === 0) cells.push('crit-budding');
  if (!smCriteriaMet(values)) cells.push('row-additional');
  return cells;
}

export function resolveColorectalEsdCurabilityHighlight(
  values: Record<string, number | undefined>,
): ColorectalEsdCurabilityHighlight {
  if (values.depth === undefined) {
    return { cells: [], partial: false, complete: false };
  }

  if (values.depth === 0) {
    const cells: ColorectalEsdCurabilityCellId[] = ['row-tis'];
    if (values.vm === 1) cells.push('row-vm1');
    if (values.hm === 1) cells.push('row-hm1');
    if (!isColorectalEsdCurabilityComplete(values)) {
      return { cells, partial: values.vm !== undefined || values.hm !== undefined, complete: false };
    }
    return { cells, partial: false, complete: true };
  }

  const partialReady = values.vm !== undefined;
  const filledPartial = Object.fromEntries(
    Object.entries(values).filter(([, value]) => value !== undefined),
  ) as Record<string, number>;

  if (values.vm === 1) {
    const cells: ColorectalEsdCurabilityCellId[] = ['row-vm1', 'crit-vm'];
    if (!isColorectalEsdCurabilityComplete(values)) {
      return { cells, partial: partialReady, complete: false };
    }
    return { cells, partial: false, complete: true };
  }

  const partialCells = partialReady ? smCriteriaCells(filledPartial) : [];
  if (values.hm === 1 && partialReady) {
    partialCells.push('row-hm1');
  }

  if (!isColorectalEsdCurabilityComplete(values)) {
    return { cells: partialCells, partial: partialReady, complete: false };
  }

  const cells = smCriteriaCells(filledPartial);
  if (values.hm === 1) cells.push('row-hm1');
  return { cells, partial: false, complete: true };
}

function baseDetails(grade: ColorectalEsdCurabilityGrade): string[] {
  const common = [
    'JGES 大腸 ESD/EMR ガイドライン第2版と大腸癌治療ガイドラインに基づく内視鏡的治癒切除判定です。',
    'pT1（SM）癌は病理組織学的 5 項目で評価します。',
  ];
  switch (grade) {
    case 'curative-tis':
      return [
        ...common,
        'pTis/M・垂直断端陰性の完全切除で経過観察が可能です。',
        '【ESD ガイドライン】分割切除後は 6 カ月前後の内視鏡で局所遺残を確認してください。',
      ];
    case 'curative-sm':
      return [
        ...common,
        '内視鏡的治癒切除に相当します。5 項目すべてを満たしています。',
        '【治療 GL】LNM・遺残再発は極めて稀とされ、経過観察でよい（推奨 2, B）。',
        '【ESD ガイドライン】大腸内視鏡に加え、必要に応じ CEA/CT 等の全身 surveillance を計画。',
      ];
    case 'additional-consider':
      return [
        ...common,
        '5 項目のいずれかを満たさない、または水平断端陽性のため、追加腸切除を低推奨で検討します。',
        '【治療 GL】予測 LNM 率と患者背景（年齢、合併症、QOL）を総合評価し個別判断。',
        'T1 nomogram（本アプリ）で LNM 確率の参考にしてください。',
      ];
    case 'incomplete-vm':
      return [
        ...common,
        '内視鏡的不完全切除（深部断端陽性）です。追加手術を強く推奨します。',
        '【ESD ガイドライン】深部断端陽性は追加外科切除の強い適応です。',
      ];
  }
}

function severityFor(grade: ColorectalEsdCurabilityGrade): ScoreResult['severity'] {
  switch (grade) {
    case 'curative-tis':
    case 'curative-sm':
      return 'none';
    case 'additional-consider':
      return 'moderate';
    case 'incomplete-vm':
      return 'severe';
  }
}

function labelFor(grade: ColorectalEsdCurabilityGrade): string {
  switch (grade) {
    case 'curative-tis':
      return '治癒切除（pTis/M）';
    case 'curative-sm':
      return '内視鏡的治癒切除（pT1 SM）';
    case 'additional-consider':
      return '追加腸切除要検討';
    case 'incomplete-vm':
      return '非治癒切除（VM1）';
  }
}

export function computeColorectalEsdCurability(values: Record<string, number>): ScoreResult {
  if (values.vm === 1) {
    return {
      total: 0,
      displayMode: 'points',
      severity: severityFor('incomplete-vm'),
      interpretation: labelFor('incomplete-vm'),
      details: [
        '垂直断端陽性（内視鏡的不完全切除）。',
        ...baseDetails('incomplete-vm'),
      ],
    };
  }

  if (values.depth === 0) {
    const extras: string[] = [];
    if (values.enBloc === 1) {
      extras.push('注：分割切除後は 6 カ月前後に内視鏡で局所遺残を確認してください。');
    }
    if (values.hm === 1) {
      extras.push('注：水平断端陽性（HM1）。局所遺残リスクを考慮し追加切除または慎重フォローを検討。');
    }
    return {
      total: 0,
      displayMode: 'points',
      severity: severityFor('curative-tis'),
      interpretation: labelFor('curative-tis'),
      details: ['pTis/M・VM0 の完全切除。', ...extras, ...baseDetails('curative-tis')],
    };
  }

  if (values.hm === 1) {
    return {
      total: 0,
      displayMode: 'points',
      severity: severityFor('additional-consider'),
      interpretation: labelFor('additional-consider'),
      details: [
        '水平断端陽性（HM1）。内視鏡的治癒切除の 5 項目を満たしても追加腸切除を検討。',
        ...baseDetails('additional-consider'),
      ],
    };
  }

  if (smCriteriaMet(values)) {
    return {
      total: 0,
      displayMode: 'points',
      severity: severityFor('curative-sm'),
      interpretation: labelFor('curative-sm'),
      details: [
        '5 項目すべて充足：VM0、HM0、乳頭/管状腺癌、SM<1000 µm、Ly0、V0、BD1。',
        ...baseDetails('curative-sm'),
      ],
    };
  }

  const unmet: string[] = [];
  if (values.histology !== 0) unmet.push('組織型（乳頭/管状腺癌以外）');
  if (values.smDepth !== 0) unmet.push('SM 浸潤 ≥1000 µm');
  if (values.ly !== 0) unmet.push('リンパ管侵襲陽性（Ly1）');
  if (values.v !== 0) unmet.push('静脈侵襲陽性（V1）');
  if (values.budding !== 0) unmet.push('BD2/3');

  return {
    total: 0,
    displayMode: 'points',
    severity: severityFor('additional-consider'),
    interpretation: labelFor('additional-consider'),
    details: [`未充足：${unmet.join('、')}。`, ...baseDetails('additional-consider')],
  };
}
