import {
  computeColorectalEsdCurability,
  JGES_COLORECTAL_ESD_2020_PUBMED,
} from '../../lib/scores/colorectal-esd-curability';
import type { ScoreDefinition } from '../../types/score';

export const colorectalEsdCurabilityScore: ScoreDefinition = {
  id: 'colorectal-esd-curability',
  name: '早期大腸癌 ESD 後・治癒切除判定',
  shortName: '治癒切除',
  developedInJapan: true,
  toolKind: 'algorithm',
  organ: 'colorectum',
  category: 't1-colorectal',
  categoryLabel: '大腸T1癌',
  description:
    '大腸 ESD/EMR 後の病理所見から内視鏡的治癒切除か追加腸切除要否を判定します。JGES 大腸 ESD/EMR ガイドライン第2版の 5 項目と大腸癌治療ガイドラインの記載を併記します。',
  reference: 'Tanaka S et al. Dig Endosc 2020;32:219-239',
  pubmed: JGES_COLORECTAL_ESD_2020_PUBMED,
  officialUrl: 'https://www.jsccr.jp/guideline/',
  officialLinkLabel: '大腸癌治療ガイドライン（JSCCR）',
  note:
    'JGES 大腸 ESD/EMR ガイドライン第2版の pT1（SM）5 項目をテーブル表示。入力に連動して該当行をハイライト。LNM 確率は T1 Nomogram ページを参照。',
  fields: [
    {
      id: 'depth',
      label: '病理深達度',
      options: [
        { value: 0, label: 'pTis / M（粘膜内）' },
        { value: 1, label: 'pT1（SM）' },
      ],
    },
    {
      id: 'vm',
      label: '垂直断端（VM）',
      options: [
        { value: 0, label: 'VM0（陰性・完全切除）' },
        { value: 1, label: 'VM1（陽性・不完全切除）' },
      ],
    },
    {
      id: 'enBloc',
      label: '切除方法',
      options: [
        { value: 0, label: '一括切除' },
        { value: 1, label: '分割切除' },
      ],
    },
    {
      id: 'histology',
      label: '組織型',
      description: 'pT1（SM）の場合のみ',
      options: [
        { value: 0, label: '乳頭腺癌・管状腺癌' },
        { value: 1, label: 'その他（粘液癌等）' },
      ],
    },
    {
      id: 'smDepth',
      label: 'SM 浸潤距離',
      description: 'pT1（SM）の場合のみ',
      options: [
        { value: 0, label: '<1000 µm' },
        { value: 1, label: '≥1000 µm' },
      ],
    },
    {
      id: 'lyv',
      label: '脈管侵襲（Ly / V）',
      options: [
        { value: 0, label: '陰性' },
        { value: 1, label: '陽性' },
      ],
    },
    {
      id: 'budding',
      label: '腫瘍簇出（budding）',
      options: [
        { value: 0, label: 'Grade 1' },
        { value: 1, label: 'Grade 2 / 3' },
      ],
    },
  ],
  compute: computeColorectalEsdCurability,
};
