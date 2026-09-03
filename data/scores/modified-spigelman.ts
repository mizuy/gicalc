import { computeModifiedSpigelman } from '../../lib/scores/spigelman';
import type { ScoreDefinition } from '../../types/score';

/** Saurin 2004 JCO（PMID 14752072）。Vienna に合わせた Modified Spigelman */
export const SAURIN_2004_PUBMED = '14752072';

export const modifiedSpigelmanScore: ScoreDefinition = {
  id: 'modified-spigelman',
  name: 'Modified Spigelman（FAP 十二指腸腺腫）',
  shortName: 'Mod. Spigelman',
  organ: 'duodenum',
  category: 'classification',
  categoryLabel: 'FAP十二指腸',
  description:
    'Spigelman 1989 を Vienna 分類に合わせて改変（Saurin 2004）。個数・最大径・組織型は同じ。異型度は LGD 1 点、HGD 3 点（中等度 2 点はない）。',
  reference: 'Saurin JC et al. J Clin Oncol 2004;22:493-498',
  pubmed: SAURIN_2004_PUBMED,
  note: 'ESGE 2019 以降の多くの施設がこの 2 段階異型度を使う。1989 原法（3 段階）は Spigelman ページ。乳頭部は別評価。',
  figures: [
    {
      href: 'https://ascopubs.org/doi/10.1200/JCO.2004.06.028',
      hrefLabel: 'Saurin 2004',
      alt: 'Modified Spigelman score and classification (Saurin 2004)',
      caption: 'Saurin JC et al. Surveillance of duodenal adenomas in FAP. J Clin Oncol 2004',
      source: 'Saurin JC, Gutknecht C, Napoleon B, et al. J Clin Oncol. 2004;22:493-498.',
      doi: 'https://doi.org/10.1200/JCO.2004.06.028',
      pubmed: SAURIN_2004_PUBMED,
      note: 'Modified Spigelman の原著。ASCO / JCO の著作権。CC ではないので論文へリンクする。',
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
      label: '異型度（Vienna）',
      description: 'LGD 1 点、HGD 3 点。中等度の 2 点はない',
      options: [
        { value: 0, label: '異型なし', description: '0点' },
        { value: 1, label: 'LGD', description: '+1点' },
        { value: 3, label: 'HGD', description: '+3点' },
      ],
    },
  ],
  compute: computeModifiedSpigelman,
};
