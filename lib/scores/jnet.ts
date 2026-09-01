import type { ScoreResult } from '../../types/score';

const TYPES: Record<
  number,
  { label: string; interpretation: string; severity: ScoreResult['severity']; details: string[] }
> = {
  1: {
    label: 'Type 1',
    interpretation: '過形成 / SSL',
    severity: 'none',
    details: [
      '血管: 不可視（または孤立したレース状）。表面: 周囲粘膜に似た規則的な暗色・白色スポット。',
      '推定組織は過形成ポリープまたは SSL。NICE 分類とは別です。',
      '右側で粘液帽など SSL を疑う場合は切除を検討します。',
    ],
  },
  2: {
    label: 'Type 2A',
    interpretation: '腺腫（LGIEN）',
    severity: 'mild',
    details: [
      '血管: 口径整・分布整（網目・らせん）。表面: 管状・分岐・乳頭で整。',
      '推定組織は低異型度粘膜内腫瘍（腺腫）。内視鏡切除の対象です。',
    ],
  },
  3: {
    label: 'Type 2B',
    interpretation: 'HGIEN / 浅層SM',
    severity: 'moderate',
    details: [
      '血管: 口径不同・分布不整。表面: 不整または不明瞭。',
      '推定組織は高異型度粘膜内腫瘍または浅層SM浸潤癌。一括内視鏡切除を検討します。',
    ],
  },
  4: {
    label: 'Type 3',
    interpretation: '深層SM以深',
    severity: 'severe',
    details: [
      '血管: 疎な領域や太い血管の途絶。表面: 無構造（amorphous）。',
      '推定組織は深層SM以深。外科手術を検討します。大腸T1ノモグラムとは別です。',
    ],
  },
};

export function computeJnet(values: Record<string, number>): ScoreResult {
  const spec = TYPES[values.type] ?? TYPES[1];
  return {
    total: values.type,
    displayMode: 'classification',
    classificationLabel: spec.label,
    severity: spec.severity,
    interpretation: spec.interpretation,
    details: spec.details,
  };
}
