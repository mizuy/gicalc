import { computeAronchick } from '../../lib/scores/aronchick';
import type { ScoreDefinition } from '../../types/score';

/** Aronchick 2000 GIE（PMID 10968848）。Crossref 上 CC BY-NC-ND 4.0（遅延 OA）。 */
export const ARONCHICK_2000_PUBMED = '10968848';

export const aronchickScore: ScoreDefinition = {
  id: 'aronchick',
  name: 'Aronchick Scale（腸管前処置）',
  shortName: 'Aronchick',
  organ: 'colorectum',
  category: 'prep',
  categoryLabel: '腸管前処置',
  description:
    '大腸全体の前処置を洗浄前に5段階で評価します。区域点はありません。JGES 2020 ガイドライン CQ6 で推奨（Table 11）。',
  reference:
    'Aronchick CA et al. Gastrointest Endosc 2000;52:346-352. 日本語定義: JGES 大腸内視鏡スクリーニングとサーベイランスガイドライン 2020 CQ6 Table 11',
  pubmed: ARONCHICK_2000_PUBMED,
  license: 'CC BY-NC-ND 4.0',
  licenseUrl: 'https://creativecommons.org/licenses/by-nc-nd/4.0/',
  officialUrl: 'https://www.jstage.jst.go.jp/article/gee/62/8/62_1519/_article/-char/ja/',
  officialLinkLabel: 'JGES 2020 ガイドライン（Table 11）',
  note:
    '5段階の定義は JGES 2020「大腸内視鏡スクリーニングとサーベイランスガイドライン」CQ6・Table 11（Aronchick bowel preparation scale・日本語改変）に準拠。洗浄・吸引の前に大腸全体を評価する。BBPS とは評価時点が異なる。',
  fields: [
    {
      id: 'grade',
      label: '前処置グレード',
      description: '洗浄・吸引の前に、大腸全体を評価する（JGES Table 11）',
      options: [
        {
          value: 1,
          label: 'Excellent',
          description: '少量の透明な便汁。粘膜 95%以上が観察可能',
        },
        {
          value: 2,
          label: 'Good',
          description: '検査に支障がない程度の少量便汁。粘膜 90%以上が観察可能',
        },
        {
          value: 3,
          label: 'Fair',
          description: '少量の便はあるが吸引可能。粘膜 90%以上が観察可能',
        },
        {
          value: 4,
          label: 'Poor',
          description: '吸引不能な便が貯留。粘膜 90%未満しか観察できない',
        },
        {
          value: 5,
          label: 'Inadequate',
          description: '大量便塊で精密検査不能。再度腸管洗浄が必要',
        },
      ],
    },
  ],
  compute: computeAronchick,
};
