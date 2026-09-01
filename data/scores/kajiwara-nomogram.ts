import {
  interpretLnmProbability,
  predictLnmProbability,
  valuesToNomogramInput,
} from '../../lib/nomogram/kajiwara';
import type { ScoreDefinition } from '../../types/score';

export const kajiwaraNomogram: ScoreDefinition = {
  id: 'kajiwara-nomogram',
  name: '大腸T1リンパ節転移予測ノモグラム（Kajiwara / JSCCR）',
  shortName: 'T1 Nomogram',
  category: 't1-colorectal',
  categoryLabel: '大腸T1癌',
  description:
    '内視鏡治療後の大腸T1癌におけるリンパ節転移（LNM）確率を予測します。Kajiwara 2023（GIE; 開発 3080 例）の6因子多変量ロジスティックです。BEST-JやeCuraとは対象・目的が異なります。',
  reference: 'Kajiwara Y et al. Gastrointest Endosc 2023;97:1119-1128.e5',
  pubmed: '36669574',
  fields: [
    {
      id: 'sex',
      label: '性別',
      options: [
        { value: 0, label: '男性' },
        { value: 1, label: '女性' },
      ],
    },
    {
      id: 'location',
      label: '腫瘍部位',
      options: [
        { value: 0, label: '横行結腸T', description: '横行結腸' },
        { value: 1, label: 'A/C/D', description: '上行結腸・盲腸・下行結腸' },
        { value: 2, label: 'S/Rb', description: 'S状結腸・下部直腸' },
        { value: 3, label: 'RS/Ra', description: '直腸S状部・上部直腸' },
      ],
    },
    {
      id: 'grade',
      label: '組織型',
      description: '優位組織型。G1=乳頭腺癌・高分化管状腺癌、G2=中分化、G3=低分化・粘液癌・印環細胞癌',
      options: [
        { value: 0, label: 'G1', description: '乳頭腺癌・高分化管状腺癌' },
        { value: 1, label: 'G2', description: '中分化管状腺癌' },
        { value: 2, label: 'G3', description: '低分化腺癌・粘液癌・印環細胞癌' },
      ],
    },
    {
      id: 'lvi',
      label: '脈管侵襲',
      description: 'リンパ管侵襲または静脈侵襲',
      options: [
        { value: 0, label: 'なし' },
        { value: 1, label: 'あり' },
      ],
    },
    {
      id: 'smDepth',
      label: 'SM浸潤深度',
      description: 'JSCCR絶対計測。MM下縁から、または有茎性はhead/stalk境界から',
      options: [
        { value: 0, label: '<1000μm' },
        { value: 1, label: '1000–1999μm' },
        { value: 2, label: '≥2000μm' },
      ],
    },
    {
      id: 'budding',
      label: '簇出',
      description: '20倍視野（0.785 mm²）hotspot。モデルでは BD2 と BD3 を同一係数',
      options: [
        { value: 0, label: 'BD1', description: '<5個' },
        { value: 1, label: 'BD2/3', description: 'BD2: 5–9個、BD3: ≥10個' },
      ],
    },
  ],
  compute: (values) => {
    const probability = predictLnmProbability(valuesToNomogramInput(values));
    const interpretation = interpretLnmProbability(probability);
    return {
      total: probability,
      displayMode: 'probability',
      probability,
      ...interpretation,
    };
  },
};
