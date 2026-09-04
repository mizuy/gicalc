import type { ScoreResult } from '../../types/score';

const GRADES: Record<
  number,
  { interpretation: string; severity: ScoreResult['severity']; details: string[] }
> = {
  1: {
    interpretation: 'Excellent（優）',
    severity: 'none',
    details: [
      '少量の透明な便汁で、粘膜の 95% 以上が観察可能（JGES 2020 Table 11）。',
      'adequate。洗浄前に大腸全体を評価します。',
    ],
  },
  2: {
    interpretation: 'Good（良）',
    severity: 'none',
    details: [
      '検査に支障がない程度の少量便汁で、粘膜の 90% 以上が観察可能（JGES 2020 Table 11）。',
      'adequate。洗浄前に大腸全体を評価します。',
    ],
  },
  3: {
    interpretation: 'Fair（可）',
    severity: 'moderate',
    details: [
      '少量の便はあるが吸引可能で、粘膜の 90% 以上が観察可能（JGES 2020 Table 11）。',
      '施設により adequate に含めることがあります。',
    ],
  },
  4: {
    interpretation: 'Poor（不良）',
    severity: 'severe',
    details: [
      '吸引不能な便が貯留し、粘膜の 90% 未満しか観察できない（JGES 2020 Table 11）。',
      'inadequate。再検査を検討してください。',
    ],
  },
  5: {
    interpretation: 'Inadequate（不適）',
    severity: 'severe',
    details: [
      '大量の便塊のため精密検査が不可能。再度腸管洗浄が必要（JGES 2020 Table 11）。',
    ],
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
