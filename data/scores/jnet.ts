import type { ClassificationDefinition } from '../../types/score';

export const jnetScore: ClassificationDefinition = {
  id: 'jnet',
  kind: 'classification',
  name: 'JNET分類（大腸 NBI 拡大）',
  shortName: 'JNET',
  category: 'classification',
  categoryLabel: '内視鏡分類',
  description:
    '大腸腫瘍の NBI 拡大分類（Type 1 / 2A / 2B / 3）の定義一覧です。拡大不要の NICE 分類や大腸T1ノモグラムとは別です。',
  reference: 'Sano Y et al. Dig Endosc 2016;28:526-533',
  entries: [
    {
      label: 'Type 1',
      meaning: '過形成 / SSL',
      severity: 'none',
      rows: [
        { heading: '血管', text: '不可視（または孤立したレース状）' },
        { heading: '表面', text: '周囲粘膜に似た規則的な暗色・白色スポット' },
        { heading: '方針', text: '原則経過。右側で粘液帽など SSL を疑う場合は切除を検討' },
      ],
    },
    {
      label: 'Type 2A',
      meaning: '腺腫（LGIEN）',
      severity: 'mild',
      rows: [
        { heading: '血管', text: '口径整・分布整（網目・らせん）' },
        { heading: '表面', text: '管状・分岐・乳頭で整' },
        { heading: '方針', text: '内視鏡切除' },
      ],
    },
    {
      label: 'Type 2B',
      meaning: 'HGIEN / 浅層SM',
      severity: 'moderate',
      rows: [
        { heading: '血管', text: '口径不同・分布不整' },
        { heading: '表面', text: '不整または不明瞭' },
        { heading: '方針', text: '一括内視鏡切除を検討' },
      ],
    },
    {
      label: 'Type 3',
      meaning: '深層SM以深',
      severity: 'severe',
      rows: [
        { heading: '血管', text: '疎な領域や太い血管の途絶' },
        { heading: '表面', text: '無構造（amorphous）' },
        { heading: '方針', text: '外科手術を検討。大腸T1ノモグラムとは別' },
      ],
    },
  ],
};
