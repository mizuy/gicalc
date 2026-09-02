import type { ScoreResult } from '../../types/score';

const GRADES: Record<
  number,
  { interpretation: string; severity: ScoreResult['severity']; details: string[] }
> = {
  1: {
    interpretation: 'Excellent（優）',
    severity: 'none',
    details: ['透明な少量の液体。粘膜の 95% 超が見える。', 'adequate。洗浄前に全体を評価します。'],
  },
  2: {
    interpretation: 'Good（良）',
    severity: 'none',
    details: ['透明な液体が多めでも、粘膜の 90% 超が見える。', 'adequate。洗浄前に全体を評価します。'],
  },
  3: {
    interpretation: 'Fair（可）',
    severity: 'moderate',
    details: [
      '半固形便があるが吸引・洗浄で除去でき、粘膜の 90% 超が見える。',
      '施設により adequate に含めることがあります。',
    ],
  },
  4: {
    interpretation: 'Poor（不良）',
    severity: 'severe',
    details: ['半固形便を吸引できず、粘膜の 90% 未満しか見えない。', 'inadequate。再検査を検討してください。'],
  },
  5: {
    interpretation: 'Inadequate（不適）',
    severity: 'severe',
    details: ['残渣が多く検査を完遂できない。再前処置が必要です。'],
  },
};

export function computeAronchick(values: Record<string, number>): ScoreResult {
  const grade = values.grade;
  const spec = GRADES[grade] ?? GRADES[5];
  return {
    total: grade,
    maxScore: 5,
    displayMode: 'points',
    severity: spec.severity,
    interpretation: spec.interpretation,
    details: spec.details,
  };
}
