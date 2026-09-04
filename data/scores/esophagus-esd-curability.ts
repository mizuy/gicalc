import {
  computeEsophagusEsdCurability,
  JGES_ESOPHAGUS_ESD_2020_PUBMED,
} from '../../lib/scores/esophagus-esd-curability';
import type { ScoreDefinition } from '../../types/score';

export const esophagusEsdCurabilityScore: ScoreDefinition = {
  id: 'esophagus-esd-curability',
  name: '早期食道癌 ESD 後・治癒切除判定',
  shortName: '治癒切除',
  developedInJapan: true,
  toolKind: 'algorithm',
  organ: 'esophagus',
  category: 'classification',
  categoryLabel: '内視鏡分類',
  description:
    '食道扁平上皮癌 ESD/EMR 後の病理所見から治癒切除か追加治療要否を判定します。JGES 食道 ESD/EMR ガイドライン（2020）Fig. 5 と食道癌取扱い規約の記載を併記します。',
  reference: 'Ishihara R et al. Dig Endosc 2020;32:452-493',
  pubmed: JGES_ESOPHAGUS_ESD_2020_PUBMED,
  officialUrl: 'https://www.esophagus.jp/guideline/',
  officialLinkLabel: '食道癌取扱い規約（JES）',
  note:
    'JGES 食道 ESD/EMR ガイドライン（2020）の根治度評価テーブルを画面上部に表示。深達度・脈管侵襲・断端から該当セルをハイライト。pT1a-MM・脈管陰性は CQ6 で個別判断。',
  figures: [
    {
      href: 'https://onlinelibrary.wiley.com/doi/10.1111/den.13654#den13654-fig-0005',
      hrefLabel: 'Fig. 5',
      alt: 'Curability assessment after esophageal ER (JGES 2020 Fig. 5)',
      caption: 'Fig. 5. Recommendation summary for curability assessment (CQ6–7)',
      source: 'Ishihara R, et al. Dig Endosc. 2020;32:452-493. Fig. 5.',
      doi: 'https://doi.org/10.1111/den.13654',
      pubmed: JGES_ESOPHAGUS_ESD_2020_PUBMED,
      note: '根治度評価と追加治療の推奨。画面テーブルと同じロジック。',
    },
  ],
  fields: [
    {
      id: 'depth',
      label: '深達度（p 診）',
      options: [
        { value: 0, label: 'pEP / pLPM（粘膜内）' },
        { value: 1, label: 'pT1a-MM（粘膜筋板）' },
        { value: 2, label: 'pT1b-SM1' },
        { value: 3, label: 'pT1b-SM2 以深' },
      ],
    },
    {
      id: 'vascular',
      label: '脈管侵襲（Ly / V）',
      description: 'リンパ管・静脈侵襲。免疫染色（D2-40 等）含む病理評価',
      options: [
        { value: 0, label: '陰性' },
        { value: 1, label: '陽性' },
      ],
    },
    {
      id: 'margin',
      label: '切除断端',
      options: [
        { value: 0, label: '陰性（R0）' },
        { value: 1, label: '陽性' },
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
  ],
  compute: computeEsophagusEsdCurability,
};
