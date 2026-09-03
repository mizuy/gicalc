import { computeSpigelman } from '../../lib/scores/spigelman';
import type { ScoreDefinition } from '../../types/score';

/** Spigelman 1989 Lancet（PMID 2571019） */
export const SPIGELMAN_1989_PUBMED = '2571019';

export const spigelmanScore: ScoreDefinition = {
  id: 'spigelman',
  name: 'Spigelman分類（FAP 十二指腸腺腫）',
  shortName: 'Spigelman',
  organ: 'duodenum',
  category: 'classification',
  categoryLabel: 'FAP十二指腸',
  description:
    '家族性腺腫性ポリポーシス（FAP）の十二指腸腺腫を、個数・最大径・組織型・異型度で 0–12 点・Stage 0–IV に層別します。1989 原法（軽度 / 中等度 / 高度）。Vienna 2 段階は Modified Spigelman。',
  reference: 'Spigelman AD et al. Lancet 1989;2:783-785',
  pubmed: SPIGELMAN_1989_PUBMED,
  note: 'サーベイランス間隔は ESGE 2019 polyposis（van Leerdam）。乳頭部は別評価。現行病理は Vienna（LGD/HGD）が多いので Modified Spigelman も参照。',
  figures: [
    {
      href: 'https://www.ncbi.nlm.nih.gov/books/NBK1345/table/fap.T.spigelman_scoring_system_for_duode/',
      hrefLabel: 'Table 5',
      alt: 'Spigelman scoring system for duodenal adenomas in FAP (GeneReviews Table 5)',
      caption: 'Table 5. Spigelman scoring system for duodenal adenomas in FAP',
      source:
        'Spigelman AD, Williams CB, Talbot IC, Domizio P, Phillips RK. Upper gastrointestinal cancer in patients with familial adenomatous polyposis. Lancet. 1989;2:783-785. Table as summarized in GeneReviews (APC-Associated Polyposis Conditions).',
      doi: 'https://doi.org/10.1016/S0140-6736(89)90840-4',
      pubmed: SPIGELMAN_1989_PUBMED,
      note: '1989 Lancet 原著は CC ではない。点数表は GeneReviews Table 5（公開）へリンクする。',
    },
  ],
  fields: [
    {
      id: 'number',
      label: 'ポリープ個数',
      options: [
        { value: 0, label: '0', description: '0点' },
        { value: 1, label: '1–4', description: '+1点' },
        { value: 2, label: '5–20', description: '+2点' },
        { value: 3, label: '>20', description: '+3点' },
      ],
    },
    {
      id: 'size',
      label: '最大径',
      options: [
        { value: 0, label: 'なし', description: '0点' },
        { value: 1, label: '1–4 mm', description: '+1点' },
        { value: 2, label: '5–10 mm', description: '+2点' },
        { value: 3, label: '>10 mm', description: '+3点' },
      ],
    },
    {
      id: 'histology',
      label: '組織型',
      options: [
        { value: 0, label: '腺腫なし', description: '0点' },
        { value: 1, label: '管状', description: '+1点' },
        { value: 2, label: '管状絨毛', description: '+2点' },
        { value: 3, label: '絨毛', description: '+3点' },
      ],
    },
    {
      id: 'dysplasia',
      label: '異型度（1989）',
      description: '軽度 / 中等度 / 高度。Vienna の LGD/HGD は Modified Spigelman',
      options: [
        { value: 0, label: '異型なし', description: '0点' },
        { value: 1, label: '軽度', description: '+1点' },
        { value: 2, label: '中等度', description: '+2点' },
        { value: 3, label: '高度', description: '+3点' },
      ],
    },
  ],
  compute: computeSpigelman,
};
