import type { ScoreResult } from '../../types/score';

/** JGES 胃癌 ESD/EMR ガイドライン第2版（2020, Dig Endosc den.13883） */
export const JGES_GASTRIC_ESD_2020_PUBMED = '32216137';

export type GastricEsdCurabilityGrade = 'eCuraA' | 'eCuraB' | 'eCuraC-1' | 'eCuraC-2';

/** JGES Fig. 2 相当テーブルの行キー（組織型 × 深達度 × 潰瘍） */
export type GastricEsdCurabilityBaseKey =
  | 'diff-pt1a-ul0'
  | 'diff-pt1a-ul1'
  | 'diff-pt1b-sm1'
  | 'undiff-pt1a-ul0'
  | 'undiff-pt1a-ul1'
  | 'undiff-pt1b-sm1';

/** サイズ列（分化型 ≤30 / >30 mm、未分化型 ≤20 / >20 mm） */
export type GastricEsdCurabilitySizeCol = 'le30' | 'gt30' | 'le20' | 'gt20';

/** サイズ列付きセル ID */
export type GastricEsdCurabilitySizedCellId =
  | 'cell-diff-pt1a-ul0-le30'
  | 'cell-diff-pt1a-ul0-gt30'
  | 'cell-diff-pt1a-ul1-le30'
  | 'cell-diff-pt1a-ul1-gt30'
  | 'cell-diff-pt1b-sm1-le30'
  | 'cell-diff-pt1b-sm1-gt30'
  | 'cell-undiff-pt1a-ul0-le20'
  | 'cell-undiff-pt1a-ul0-gt20'
  | 'cell-undiff-pt1a-ul1-le20'
  | 'cell-undiff-pt1a-ul1-gt20'
  | 'cell-undiff-pt1b-sm1-le20'
  | 'cell-undiff-pt1b-sm1-gt20';

export type GastricEsdCurabilityCellId =
  | GastricEsdCurabilitySizedCellId
  | 'row-c1'
  | 'row-c2'
  | 'row-fig6-undiff-size'
  | 'row-fig6-undiff-sm';

export type GastricEsdCurabilityHighlight = {
  cells: GastricEsdCurabilityCellId[];
  /** 腫瘍因子のみ入力済み（薄いハイライト） */
  partial: boolean;
  /** 全必須項目入力済み（確定ハイライト） */
  complete: boolean;
};

const ROW_FACTOR_FIELDS = ['histology', 'depth', 'ul'] as const;

export function gastricCurabilityCellId(
  base: GastricEsdCurabilityBaseKey,
  col: GastricEsdCurabilitySizeCol,
): GastricEsdCurabilitySizedCellId {
  return `cell-${base}-${col}` as GastricEsdCurabilitySizedCellId;
}

function sizeColsForBase(
  base: GastricEsdCurabilityBaseKey,
  size?: number,
): GastricEsdCurabilitySizeCol[] {
  const isDiff = base.startsWith('diff-');
  if (size === undefined) {
    return isDiff ? ['le30', 'gt30'] : ['le20', 'gt20'];
  }
  if (isDiff) {
    return size === 2 ? ['gt30'] : ['le30'];
  }
  return size === 0 ? ['le20'] : ['gt20'];
}

function sizedCells(
  base: GastricEsdCurabilityBaseKey,
  size?: number,
): GastricEsdCurabilityCellId[] {
  return sizeColsForBase(base, size).map((col) => gastricCurabilityCellId(base, col));
}

export function getGastricEsdCurabilityRequiredFields(
  values: Record<string, number | undefined>,
): string[] {
  const required = ['enBloc', 'histology', 'size', 'depth', 'ul', 'hm', 'vm', 'ly', 'v'];
  if (values.histology === 1) {
    required.push('undiffSize');
    if (values.depth === 1) {
      required.push('undiffInSm');
    }
  }
  return required;
}

export function isGastricEsdCurabilityComplete(values: Record<string, number | undefined>): boolean {
  return getGastricEsdCurabilityRequiredFields(values).every((id) => values[id] !== undefined);
}

function isRowFactorsReady(values: Record<string, number | undefined>): boolean {
  return ROW_FACTOR_FIELDS.every((id) => values[id] !== undefined);
}

function tumorFactorBase(values: Record<string, number>): GastricEsdCurabilityBaseKey | null {
  const { histology, depth, ul } = values;
  const isDiff = histology === 0 || histology === 1;

  if (depth === 0) {
    if (ul === 0) return isDiff ? 'diff-pt1a-ul0' : 'undiff-pt1a-ul0';
    return isDiff ? 'diff-pt1a-ul1' : 'undiff-pt1a-ul1';
  }
  if (depth === 1) {
    return isDiff ? 'diff-pt1b-sm1' : 'undiff-pt1b-sm1';
  }
  if (depth === 2) {
    if (isDiff) return ul === 0 ? 'diff-pt1a-ul0' : 'diff-pt1a-ul1';
    return ul === 0 ? 'undiff-pt1a-ul0' : 'undiff-pt1a-ul1';
  }
  return null;
}

function uniqueCells(cells: GastricEsdCurabilityCellId[]): GastricEsdCurabilityCellId[] {
  return [...new Set(cells)];
}

/** 入力状態から Fig. 2 相当テーブルのハイライト対象を返す */
export function resolveGastricEsdCurabilityHighlight(
  values: Record<string, number | undefined>,
): GastricEsdCurabilityHighlight {
  if (!isRowFactorsReady(values)) {
    return { cells: [], partial: false, complete: false };
  }

  const filled = Object.fromEntries(
    Object.entries(values).filter(([, value]) => value !== undefined),
  ) as Record<string, number>;
  const base = tumorFactorBase(filled);
  const baseCells = base ? sizedCells(base, filled.size) : [];

  if (!isGastricEsdCurabilityComplete(values)) {
    return { cells: baseCells, partial: true, complete: false };
  }

  if (filled.histology === 1 && filled.undiffSize === 1 && filled.depth === 0) {
    return {
      cells: uniqueCells([...baseCells, 'row-fig6-undiff-size', 'row-c2']),
      partial: false,
      complete: true,
    };
  }

  if (filled.histology === 1 && filled.undiffInSm === 1 && filled.depth === 1) {
    return {
      cells: uniqueCells([...baseCells, 'row-fig6-undiff-sm', 'row-c2']),
      partial: false,
      complete: true,
    };
  }

  const result = computeGastricEsdCurability(filled);

  if (result.interpretation.startsWith('eCuraA') || result.interpretation.startsWith('eCuraB')) {
    return { cells: baseCells, partial: false, complete: true };
  }
  if (result.interpretation.startsWith('eCuraC-1')) {
    return { cells: uniqueCells([...baseCells, 'row-c1']), partial: false, complete: true };
  }
  return { cells: uniqueCells([...baseCells, 'row-c2']), partial: false, complete: true };
}

function isDifferentiatedDominant(histology: number): boolean {
  return histology === 0 || histology === 1;
}

function marginsOk(values: Record<string, number>): boolean {
  return values.hm === 0 && values.vm === 0 && values.ly === 0 && values.v === 0;
}

/** eCuraA の3パターン（i–iii）。ignoreEnBlocHm=true なら一括切除・HM は問わない（C-1 判定用）。 */
function meetsEcuraA(values: Record<string, number>, ignoreEnBlocHm = false): boolean {
  if (!ignoreEnBlocHm && (values.enBloc !== 0 || values.hm !== 0)) return false;
  if (!marginsOk(values)) return false;
  if (values.depth !== 0) return false;

  const { histology, size } = values;
  const ul0 = values.ul === 0;

  if (histology === 1 && values.undiffSize === 1) return false;

  if (isDifferentiatedDominant(histology) && ul0) return true;
  if (histology === 2 && size === 0 && ul0) return true;
  if (isDifferentiatedDominant(histology) && size <= 1 && !ul0) return true;

  return false;
}

function meetsEcuraB(values: Record<string, number>, ignoreEnBlocHm = false): boolean {
  if (!ignoreEnBlocHm && (values.enBloc !== 0 || values.hm !== 0)) return false;
  if (!marginsOk(values)) return false;
  if (values.depth !== 1) return false;
  if (values.size > 1) return false;
  if (!isDifferentiatedDominant(values.histology)) return false;
  if (values.histology === 1 && values.undiffInSm === 1) return false;
  return true;
}

function baseDetails(grade: GastricEsdCurabilityGrade): string[] {
  const common = [
    'JGES 胃癌 ESD/EMR ガイドライン第2版・胃癌治療ガイドライン第6版に基づく内視鏡的根治度です。',
    '病理診断（p 診）に基づき判定します。適応決定は c 診、治癒判定は p 診です（ESD ガイドライン）。',
  ];

  switch (grade) {
    case 'eCuraA':
      return [
        ...common,
        '治癒切除に相当します。外科的胃切除と同等の長期成績が得られるとされています。',
        '【ESD ガイドライン】eCuraA 後は異時性胃癌検出を主目的に EGD を年 1–2 回（推奨 1）。',
        '【ESD ガイドライン】H. pylori 陽性例では除菌を推奨（A, 2）。除菌後も EGD フォローは継続。',
        '【治療 GL 第6版】治癒切除後は H. pylori 検査・除菌、年 1–2 回の内視鏡経過観察。',
      ];
    case 'eCuraB':
      return [
        ...common,
        '治癒切除に相当します（適応拡大）。十分な長期成績は限られますが、根治が期待されます。',
        '【ESD ガイドライン】eCuraB 後は EGD に加え、転移検索のため US または CT も望ましい（C, 2）。',
        '【ESD ガイドライン】H. pylori 陽性例では除菌を推奨。',
        '【治療 GL 第6版】SM1（<500 µm）、長径 ≤3 cm、分化型、pT1b（SM1）の条件に該当。',
      ];
    case 'eCuraC-1':
      return [
        ...common,
        '非治癒切除（eCuraC）ですが、転移リスクは eCuraC-2 より低いとされます。',
        '【ESD ガイドライン】追加外科切除に加え、再 ESD・焼灼・経過観察も施設方針と同意のもと選択可（C）。',
        '【ESD ガイドライン】原則追加外科切除：① 長径 ≤3 cm・分化型・pT1a・UL1、② 長径 ≤3 cm・分化型・pT1b（SM1）で、内視鏡的遺残＋標本内癌の合計 >30 mm、または SM 浸潤部の分割切除・断端陽性（Fig. 2–3）。',
        '【ESD ガイドライン】追加切除せず経過観察を選ぶ場合は EGD 慎重フォロー（C, 2）。HM 陽性 ≥6 mm や長径 ≥2 cm では局所再発リスク上昇。',
        '【治療 GL 第6版】側方断端陽性・分割切除のみが eCuraA/B から外れる場合は eCuraC-1。追加切除は個別判断。',
      ];
    case 'eCuraC-2':
      return [
        ...common,
        '非治癒切除です。遺残腫瘍の可能性があります。',
        '【ESD ガイドライン】原則開腹または腹腔鏡下胃切除（C, 1）。追加切除不能時は LNM 頻度データ（Table 3–4）を参考に説明・同意。',
        '【治療 GL 第6版】eCuraC-2 は原則追加外科切除。年齢・合併症等で追加切除しない場合は LNM リスクと再発時の予後不良を説明。',
        'LNM リスク層別化には本アプリの eCura スコア（0–7 点）を参照してください。',
      ];
  }
}

function severityFor(grade: GastricEsdCurabilityGrade): ScoreResult['severity'] {
  switch (grade) {
    case 'eCuraA':
      return 'none';
    case 'eCuraB':
      return 'mild';
    case 'eCuraC-1':
      return 'moderate';
    case 'eCuraC-2':
      return 'severe';
  }
}

function buildResult(grade: GastricEsdCurabilityGrade, extraDetails: string[] = []): ScoreResult {
  const label =
    grade === 'eCuraA'
      ? 'eCuraA（治癒切除）'
      : grade === 'eCuraB'
        ? 'eCuraB（治癒切除）'
        : grade === 'eCuraC-1'
          ? 'eCuraC-1（非治癒切除）'
          : 'eCuraC-2（非治癒切除）';

  return {
    total: 0,
    displayMode: 'points',
    severity: severityFor(grade),
    interpretation: label,
    details: [...extraDetails, ...baseDetails(grade)],
  };
}

export function computeGastricEsdCurability(values: Record<string, number>): ScoreResult {
  if (values.histology === 1 && values.undiffSize === 1 && values.depth === 0) {
    return buildResult('eCuraC-2', [
      '注：分化型優位で未分化型成分の長径合計が >2 cm のため eCuraC-2（ESD ガイドライン Fig. 6）。',
      '未分化型領域は再構築（mapping）上の長径合計で計測。複数領域は合算。',
    ]);
  }

  if (values.histology === 1 && values.undiffInSm === 1 && values.depth === 1) {
    return buildResult('eCuraC-2', [
      '注：SM 浸潤部に未分化型成分があるため eCuraB ではなく eCuraC-2（ESD ガイドライン Fig. 6）。',
    ]);
  }

  if (meetsEcuraA(values)) {
    const pattern =
      values.histology === 2
        ? '（ii）未分化型優位・長径 ≤2 cm・pT1a・UL0'
        : values.ul === 1
          ? '（iii）分化型優位・長径 ≤3 cm・pT1a・UL1'
          : '（i）分化型優位・pT1a・UL0（長径不問）';
    return buildResult('eCuraA', [`該当パターン：${pattern}。一括切除、HM0、VM0、Ly0、V0。`]);
  }

  if (meetsEcuraB(values)) {
    return buildResult('eCuraB', [
      '該当：分化型優位・長径 ≤3 cm・pT1b（SM1, <500 µm）・一括切除・HM0・VM0・Ly0・V0。',
    ]);
  }

  if (
    isDifferentiatedDominant(values.histology) &&
    marginsOk(values) &&
    (meetsEcuraA(values, true) || meetsEcuraB(values, true)) &&
    (values.enBloc !== 0 || values.hm !== 0)
  ) {
    const reasons: string[] = [];
    if (values.enBloc !== 0) reasons.push('分割切除（一括切除でない）');
    if (values.hm !== 0) reasons.push('水平断端陽性（HM1）');
    return buildResult('eCuraC-1', [`eCuraA/B の条件を満たすが、${reasons.join('・')}のため eCuraC-1。`]);
  }

  const c2Hints: string[] = [];
  if (values.vm !== 0) c2Hints.push('垂直断端陽性（VM1）');
  if (values.ly !== 0) c2Hints.push('リンパ管侵襲陽性（Ly1）');
  if (values.v !== 0) c2Hints.push('静脈侵襲陽性（V1）');
  if (values.depth === 2) c2Hints.push('pT1b（SM2）以深');
  if (values.histology === 2 && (values.size !== 0 || values.ul !== 0)) {
    c2Hints.push('未分化型優位で eCuraA（ii）の条件外');
  }
  if (values.size === 2 && values.depth === 0 && isDifferentiatedDominant(values.histology)) {
    c2Hints.push('長径 >3 cm の pT1a（eCuraA 条件外）');
  }

  return buildResult('eCuraC-2', c2Hints.length ? [`主な要因：${c2Hints.join('、')}。`] : []);
}
