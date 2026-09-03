import type { ClassificationDefinition } from '../../types/score';

/** Matsumoto 2010 Scand J Gastroenterol（PMID 20626303）。大腸 ESD 粘膜下層線維化 F0–F2 の原型 */
export const ESD_FIBROSIS_2010_PUBMED = '20626303';

/** Kim 2016 Intest Res（PMID 27799887）。大腸 ESD の F 分類 Fig. 1 */
export const ESD_FIBROSIS_2016_PUBMED = '27799887';

export const esdFibrosisScore: ClassificationDefinition = {
  id: 'esd-fibrosis',
  kind: 'classification',
  name: 'ESD粘膜下層線維化分類（F0–F2）',
  shortName: 'ESD-F',
  developedInJapan: true,
  organ: 'colorectum',
  category: 'classification',
  categoryLabel: '内視鏡分類',
  description:
    '大腸 ESD 術中、インジゴカルミン入り局注後の粘膜下層所見で線維化程度を F0 / F1 / F2 に分類する。pit pattern / NICE / JNET とは別の分類です。',
  originalLead:
    'The degree of submucosal fibrosis was determined based on the findings observed at the time of submucosal local injection and classified into three groups: F0 (no fibrosis), F1 (mild fibrosis), and F2 (severe fibrosis). F0 was defined as a transparent submucosal layer. F1 appeared as a white web-like structure in the transparent submucosal layer and F2 appeared as a white muscular-like structure without a transparent submucosal layer.',
  reference:
    'Matsumoto A, Tanaka S, Oka S, et al. Scand J Gastroenterol 2010;45:1329-1337. Kim EK, Han DS, et al. Intest Res 2016;14:358-364',
  pubmed: ESD_FIBROSIS_2010_PUBMED,
  figures: [
    {
      href: 'https://www.irjournal.org/journal/view.php?number=178',
      hrefLabel: 'Fig. 1',
      alt: 'ESD submucosal fibrosis F0, F1, and F2 (Kim 2016 Fig. 1)',
      caption: 'Fig. 1. Degrees of endoscopic submucosal fibrosis in early colorectal tumors',
      source:
        'Kim EK, Han DS, Ro Y, et al. The submucosal fibrosis: what does it mean for colorectal endoscopic submucosal dissection? Intest Res. 2016;14:358-364. Fig. 1. Classification originally described for colorectal ESD by Matsumoto A, Tanaka S, Oka S, et al. Scand J Gastroenterol. 2010;45:1329-1337.',
      doi: 'https://doi.org/10.5217/ir.2016.14.4.358',
      pubmed: ESD_FIBROSIS_2016_PUBMED,
      note: '原著 Fig. 1。Intest Res / Korean Association for the Study of Intestinal Diseases の著作権。CC ではないので画像は置かず、論文の Fig. 1 へリンクする。F 分類の大腸原型は Matsumoto 2010（Scand J Gastroenterol）。',
    },
  ],
  note:
    '判定は ESD 操作中、粘膜下層へのインジゴカルミン添加局注（ヒアルロン酸ナトリウム等）後の所見で行う。術前 EUS の EUS-F0/F1/F2 とは別体系。同一 F 定義は早期胃癌 ESD でも用いられるが、本ページは大腸 ESD を主対象とする。JGES 大腸 ESD ガイドラインは生検・蠕動に起因する粘膜下層線維化を適応例に挙げるが、F0–F2 の定義自体は論文・手技記事に依存する。',
  entries: [
    {
      label: 'F0',
      meaning: 'No fibrosis',
      severity: 'none',
      rows: [
        {
          heading: 'Definition',
          text: 'No fibrosis, which manifests as a transparent submucosal layer after indigo carmine submucosal injection',
        },
        {
          heading: 'Appearance',
          text: 'Blue transparent submucosal layer (when indigo carmine is mixed into the injection solution)',
        },
        { heading: 'Dissection', text: 'Submucosal dissection is usually straightforward' },
      ],
    },
    {
      label: 'F1',
      meaning: 'Mild fibrosis',
      severity: 'mild',
      rows: [
        {
          heading: 'Definition',
          text: 'Mild fibrosis, which appears as a white web-like structure in the transparent submucosal layer',
        },
        {
          heading: 'Appearance',
          text: 'White web-like strands within the blue transparent submucosal layer',
        },
        { heading: 'Dissection', text: 'En bloc resection is usually achievable with standard technique' },
      ],
    },
    {
      label: 'F2',
      meaning: 'Severe fibrosis',
      severity: 'severe',
      rows: [
        {
          heading: 'Definition',
          text: 'Severe fibrosis, which appears as a white muscular-like structure without a transparent submucosal layer',
        },
        {
          heading: 'Appearance',
          text: 'White muscular-like structure; no blue transparent submucosal layer. Difficult to separate from the muscular layer',
        },
        {
          heading: 'Outcomes',
          text: 'Associated with lower complete resection rates, longer procedure time, and higher perforation risk in colorectal ESD',
        },
        {
          heading: 'Predictors (colorectal)',
          text: 'Submucosal invasion and carcinoma are independent predictors of F2 fibrosis in multivariate analysis (Kim 2016)',
        },
      ],
      comment:
        '高度線維化では Hook ナイフや ST フードが有用なことが多い。非治癒切除・追加外科のリスクを踏まえ、熟練者または外科切除を検討する。',
    },
    {
      label: 'Assessment',
      meaning: 'When and how to grade',
      group: '判定',
      severity: 'none',
      rows: [
        {
          heading: 'Timing',
          text: 'Graded during colorectal ESD at the time of submucosal injection and dissection, not as a standalone preoperative diagnosis',
        },
        {
          heading: 'Injection',
          text: 'Indigo carmine is added to the submucosal injection solution (e.g., glycerin, hyaluronic acid) to visualize the submucosal layer',
        },
        {
          heading: 'Not EUS-F',
          text: 'Preoperative EUS-based EUS-F0/F1/F2 (submucosal layer brightness and thickness on EUS) is a separate classification used to predict fibrosis before ESD',
        },
        {
          heading: 'Gastric ESD',
          text: 'The same F0–F2 definitions are used during gastric ESD and correlate with Masson trichrome staining (Higashimaya 2012, Gastric Cancer)',
        },
      ],
    },
  ],
};
