import type { ScoreResult } from '../../types/score';

/** JGES 食道 ESD/EMR ガイドライン（2020, Dig Endosc den.13654） */
export const JGES_ESOPHAGUS_ESD_2020_PUBMED = '32072683';

export type EsophagusEsdCurabilityGrade =
  | 'curative'
  | 'additional-strong'
  | 'additional-individual'
  | 'non-curative-margin';

export type EsophagusEsdCurabilityCellId =
  | 'cell-ep-lpm-v0'
  | 'cell-ep-lpm-v1'
  | 'cell-mm-v0'
  | 'cell-mm-v1'
  | 'cell-sm'
  | 'row-margin'
  | 'row-jcog';

export type EsophagusEsdCurabilityHighlight = {
  cells: EsophagusEsdCurabilityCellId[];
  partial: boolean;
  complete: boolean;
};

const FACTOR_FIELDS = ['depth', 'vascular', 'margin'] as const;

export function getEsophagusEsdCurabilityRequiredFields(
  _values: Record<string, number | undefined>,
): string[] {
  return ['depth', 'vascular', 'margin', 'enBloc'];
}

export function isEsophagusEsdCurabilityComplete(
  values: Record<string, number | undefined>,
): boolean {
  return getEsophagusEsdCurabilityRequiredFields(values).every((id) => values[id] !== undefined);
}

function factorCell(values: Record<string, number>): EsophagusEsdCurabilityCellId | null {
  const { depth, vascular } = values;
  if (depth === 0) return vascular === 0 ? 'cell-ep-lpm-v0' : 'cell-ep-lpm-v1';
  if (depth === 1) return vascular === 0 ? 'cell-mm-v0' : 'cell-mm-v1';
  return 'cell-sm';
}

function gradeFor(values: Record<string, number>): EsophagusEsdCurabilityGrade {
  if (values.margin === 1) return 'non-curative-margin';
  if (values.depth === 0 && values.vascular === 0) return 'curative';
  if (values.depth === 0 && values.vascular === 1) return 'additional-strong';
  if (values.depth === 1 && values.vascular === 0) return 'additional-individual';
  return 'additional-strong';
}

export function resolveEsophagusEsdCurabilityHighlight(
  values: Record<string, number | undefined>,
): EsophagusEsdCurabilityHighlight {
  const factorsReady = FACTOR_FIELDS.every((id) => values[id] !== undefined);
  if (!factorsReady) return { cells: [], partial: false, complete: false };

  const filled = Object.fromEntries(
    Object.entries(values).filter(([, value]) => value !== undefined),
  ) as Record<string, number>;
  const cell = factorCell(filled);
  const cells: EsophagusEsdCurabilityCellId[] = cell ? [cell] : [];

  if (!isEsophagusEsdCurabilityComplete(values)) {
    return { cells, partial: true, complete: false };
  }

  if (filled.margin === 1) {
    return { cells: [...cells, 'row-margin'], partial: false, complete: true };
  }
  if (filled.depth === 1 && filled.vascular === 0) {
    return { cells: [...cells, 'row-jcog'], partial: false, complete: true };
  }
  return { cells, partial: false, complete: true };
}

function baseDetails(grade: EsophagusEsdCurabilityGrade): string[] {
  const common = [
    'JGES 食道 ESD/EMR ガイドライン（2020）と食道癌取扱い規約に基づく根治度評価です。',
    '病理診断（p 診）に基づき判定します。適応決定は c 診、根治度評価は p 診です。',
  ];
  switch (grade) {
    case 'curative':
      return [
        ...common,
        '治癒切除に相当します。脈管侵襲陰性・断端陰性の pEP/LPM では LNM 頻度は極めて低く、追加治療は通常不要です。',
        '【ESD ガイドライン】経過観察を行います。飲酒・喫煙中止を強く推奨（CQ8）。',
        '【取扱い規約】異時性食道癌・頭頸部癌の surveillance を計画してください。',
      ];
    case 'additional-individual':
      return [
        ...common,
        'pT1a-MM・脈管侵襲陰性・断端陰性では、追加治療の推奨/非推奨はガイドライン上明確なコンセンサスがありません（CQ6）。',
        '【ESD ガイドライン】JCOG0508 では pMM・脈管陰性・断端陰性は経過観察 arm に含まれています。',
        '【取扱い規約】MDT で追加外科切除または化学放射線療法の要否を個別判断してください。',
      ];
    case 'additional-strong':
      return [
        ...common,
        '非治癒切除または追加治療が強く推奨される所見です。',
        '【ESD ガイドライン】pMM＋脈管侵襲陽性は追加治療強く推奨。pT1b-SM も追加治療強く推奨（CQ7）。',
        '【JCOG0508】pSM・断端陰性は予防的 CRT、pMM＋脈管陽性も予防的 CRT arm。',
        '追加外科切除または化学放射線療法を MDT で検討してください。',
      ];
    case 'non-curative-margin':
      return [
        ...common,
        '非治癒切除（断端陽性）です。遺残腫瘍の可能性があります。',
        '【ESD ガイドライン】断端陽性は確定的化学放射線療法を検討（JCOG0508）。',
        '追加外科切除も選択肢です。MDT で方針を決定してください。',
      ];
  }
}

function severityFor(grade: EsophagusEsdCurabilityGrade): ScoreResult['severity'] {
  switch (grade) {
    case 'curative':
      return 'none';
    case 'additional-individual':
      return 'moderate';
    case 'additional-strong':
      return 'severe';
    case 'non-curative-margin':
      return 'severe';
  }
}

function labelFor(grade: EsophagusEsdCurabilityGrade): string {
  switch (grade) {
    case 'curative':
      return '治癒切除';
    case 'additional-individual':
      return '追加治療要個別判断';
    case 'additional-strong':
      return '追加治療強く推奨';
    case 'non-curative-margin':
      return '非治癒切除（断端陽性）';
  }
}

export function computeEsophagusEsdCurability(values: Record<string, number>): ScoreResult {
  const grade = gradeFor(values);
  const extras: string[] = [];

  if (values.enBloc === 1 && grade === 'curative') {
    extras.push('注：分割切除ですが、断端・深達度・脈管所見が治癒切除条件を満たしています。');
  }
  if (values.enBloc === 1 && grade !== 'curative' && grade !== 'non-curative-margin') {
    extras.push('注：分割切除は病理評価・断端判定に影響し得ます。');
  }

  const depthLabel =
    values.depth === 0
      ? 'pEP/LPM'
      : values.depth === 1
        ? 'pT1a-MM'
        : values.depth === 2
          ? 'pT1b-SM1'
          : 'pT1b-SM2 以深';

  return {
    total: 0,
    displayMode: 'points',
    severity: severityFor(grade),
    interpretation: labelFor(grade),
    details: [
      `該当：${depthLabel}・脈管侵襲${values.vascular === 0 ? '陰性' : '陽性'}・断端${values.margin === 0 ? '陰性' : '陽性'}。`,
      ...extras,
      ...baseDetails(grade),
    ],
  };
}
