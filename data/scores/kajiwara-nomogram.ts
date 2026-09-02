import {
  formatAddedPoints,
  interpretLnmProbability,
  NOMOGRAM_ITEM_POINTS,
  nomogramTotalPoints,
  predictLnmProbability,
  valuesToNomogramInput,
} from '../../lib/nomogram/kajiwara';
import type { ScoreDefinition } from '../../types/score';

const pts = (points: number, note?: string): string => {
  const score = formatAddedPoints(points, 'ja');
  return note ? `${score}。${note}` : score;
};

export const kajiwaraNomogram: ScoreDefinition = {
  id: 'kajiwara-nomogram',
  name: '大腸T1リンパ節転移予測ノモグラム（Kajiwara / JSCCR）',
  shortName: 'T1 Nomogram',
  organ: 'colorectum',
  category: 't1-colorectal',
  categoryLabel: '大腸T1癌',
  description:
    '内視鏡治療後の大腸T1癌におけるリンパ節転移（LNM）確率を予測します。Kajiwara 2023（GIE; 開発 3080 例）の6因子多変量ロジスティックです。合計点は SM≥2000 μm を 100 点とした nomogram 点です。',
  reference: 'Kajiwara Y et al. Gastrointest Endosc 2023;97:1119-1128.e5',
  pubmed: '36669574',
  fields: [
    {
      id: 'sex',
      label: '性別',
      options: [
        { value: 0, label: '男性', description: pts(NOMOGRAM_ITEM_POINTS.sexMale) },
        { value: 1, label: '女性', description: pts(NOMOGRAM_ITEM_POINTS.sexFemale) },
      ],
    },
    {
      id: 'location',
      label: '腫瘍部位',
      description: '盲腸から下部直腸の順。同じ点数の部位は同じ係数です。',
      options: [
        { value: 1, label: 'C', description: pts(NOMOGRAM_ITEM_POINTS.locationAcD, '盲腸') },
        { value: 2, label: 'A', description: pts(NOMOGRAM_ITEM_POINTS.locationAcD, '上行結腸') },
        { value: 0, label: 'T', description: pts(NOMOGRAM_ITEM_POINTS.locationT, '横行結腸') },
        { value: 3, label: 'D', description: pts(NOMOGRAM_ITEM_POINTS.locationAcD, '下行結腸') },
        { value: 4, label: 'S', description: pts(NOMOGRAM_ITEM_POINTS.locationSRb, 'S状結腸') },
        { value: 5, label: 'RS', description: pts(NOMOGRAM_ITEM_POINTS.locationRsRa, '直腸S状部') },
        { value: 6, label: 'Ra', description: pts(NOMOGRAM_ITEM_POINTS.locationRsRa, '上部直腸') },
        { value: 7, label: 'Rb', description: pts(NOMOGRAM_ITEM_POINTS.locationSRb, '下部直腸') },
      ],
    },
    {
      id: 'grade',
      label: '組織型',
      description: '優位組織型。G1=乳頭腺癌・高分化管状腺癌、G2=中分化、G3=低分化・粘液癌・印環細胞癌',
      options: [
        { value: 0, label: 'G1', description: pts(NOMOGRAM_ITEM_POINTS.gradeG1, '乳頭腺癌・高分化管状腺癌') },
        { value: 1, label: 'G2', description: pts(NOMOGRAM_ITEM_POINTS.gradeG2, '中分化管状腺癌') },
        { value: 2, label: 'G3', description: pts(NOMOGRAM_ITEM_POINTS.gradeG3, '低分化腺癌・粘液癌・印環細胞癌') },
      ],
    },
    {
      id: 'lvi',
      label: '脈管侵襲',
      description: 'リンパ管侵襲または静脈侵襲',
      options: [
        { value: 0, label: 'なし', description: pts(NOMOGRAM_ITEM_POINTS.lviNegative) },
        { value: 1, label: 'あり', description: pts(NOMOGRAM_ITEM_POINTS.lviPositive) },
      ],
    },
    {
      id: 'smDepth',
      label: 'SM浸潤深度',
      description: 'JSCCR絶対計測。MM下縁から、または有茎性はhead/stalk境界から',
      options: [
        { value: 0, label: '<1000μm', description: pts(NOMOGRAM_ITEM_POINTS.smLt1000) },
        { value: 1, label: '1000–1999μm', description: pts(NOMOGRAM_ITEM_POINTS.sm1000to1999) },
        { value: 2, label: '≥2000μm', description: pts(NOMOGRAM_ITEM_POINTS.sm2000plus) },
      ],
    },
    {
      id: 'budding',
      label: '簇出',
      description: '20倍視野（0.785 mm²）hotspot。モデルでは BD2 と BD3 を同一係数',
      options: [
        { value: 0, label: 'BD1', description: pts(NOMOGRAM_ITEM_POINTS.buddingBd1, '<5個') },
        { value: 1, label: 'BD2/3', description: pts(NOMOGRAM_ITEM_POINTS.buddingBd23, 'BD2: 5–9個、BD3: ≥10個') },
      ],
    },
  ],
  compute: (values) => {
    const input = valuesToNomogramInput(values);
    const probability = predictLnmProbability(input);
    const interpretation = interpretLnmProbability(probability);
    return {
      total: probability,
      displayMode: 'probability',
      probability,
      nomogramPoints: nomogramTotalPoints(input),
      ...interpretation,
    };
  },
};
