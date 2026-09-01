import type { ScoreResult } from '../../types/score';

const TYPES: Record<
  number,
  { label: string; interpretation: string; severity: ScoreResult['severity']; details: string[] }
> = {
  0: {
    label: 'C-0',
    interpretation: '萎縮なし',
    severity: 'none',
    details: [
      '萎縮境界がなく、胃小区が全域で保たれる。原著の6型にはなく、京都分類で用いる。',
      '京都分類の萎縮は C-0/C-1 を 0 点とする。OLGA / EGGIM とは別です。',
    ],
  },
  1: {
    label: 'C-1',
    interpretation: '閉鎖型（軽度）',
    severity: 'none',
    details: [
      '萎縮境界が前庭部にとどまる。閉鎖型（Closed）。',
      '京都分類では C-0 と同じ 0 点。胃癌リスクは相対的に低い。',
    ],
  },
  2: {
    label: 'C-2',
    interpretation: '閉鎖型（中等度）',
    severity: 'mild',
    details: [
      '萎縮境界が胃体下部の小弯にある。閉鎖型。',
      '京都分類の萎縮は C-2/C-3 で +1 点。',
    ],
  },
  3: {
    label: 'C-3',
    interpretation: '閉鎖型（中等度）',
    severity: 'mild',
    details: [
      '萎縮境界が胃体上部小弯〜噴門寄り。まだ小弯上で、噴門を越えない。',
      '京都分類の萎縮は C-2/C-3 で +1 点。',
    ],
  },
  4: {
    label: 'O-1',
    interpretation: '開放型',
    severity: 'moderate',
    details: [
      '萎縮境界が噴門を越え、前後壁に出る。前後壁の萎縮はまだ接しない。開放型（Open）。',
      '京都分類の萎縮は O-1–O-3 で +2 点。開放型は閉鎖型より胃癌リスクが高い。',
    ],
  },
  5: {
    label: 'O-2',
    interpretation: '開放型',
    severity: 'moderate',
    details: [
      'O-1 と O-3 の中間。前後壁の萎縮が接する。開放型。',
      '京都分類の萎縮は O-1–O-3 で +2 点。',
    ],
  },
  6: {
    label: 'O-3',
    interpretation: '開放型（高度）',
    severity: 'severe',
    details: [
      '萎縮境界が大弯にあり、ほぼ全域が萎縮。開放型。',
      '京都分類の萎縮は O-1–O-3 で +2 点。OLGA / EGGIM とは別です。',
    ],
  },
};

export function computeKimuraTakemoto(values: Record<string, number>): ScoreResult {
  const spec = TYPES[values.grade] ?? TYPES[0];
  return {
    total: values.grade,
    displayMode: 'classification',
    classificationLabel: spec.label,
    severity: spec.severity,
    interpretation: spec.interpretation,
    details: spec.details,
  };
}
