import type { ClassificationDefinition } from '../../types/score';

/** Hayashi 2013 GIE（PMID 23910062）。Type 1/2 は Hewett 2012。 */
export const NICE_2013_PUBMED = '23910062';

export const niceScore: ClassificationDefinition = {
  id: 'nice',
  kind: 'classification',
  name: 'NICE分類（大腸 NBI・非拡大）',
  shortName: 'NICE',
  organ: 'colorectum',
  category: 'classification',
  categoryLabel: '内視鏡分類',
  description:
    '大腸腫瘍の NBI 分類（Type 1 / 2 / 3）。拡大なしの高解像度でも使う。JNET（拡大の 1 / 2A / 2B / 3）とは別の分類です。SSA/P は含みません。',
  originalLead:
    'The NICE classification can be applied using colonoscopes with or without optical (zoom) magnification. Type 1 is most likely hyperplastic. Type 2 consists of Vienna classification types 3, 4 and superficial 5 (all adenomas with either low or high grade dysplasia, or with superficial submucosal carcinoma). Type 3 is most likely deep submucosal invasive cancer. The presence of high grade dysplasia or superficial submucosal carcinoma may be suggested by an irregular vessel or surface pattern, and is often associated with atypical morphology (e.g., depressed area).',
  reference: 'Hayashi N et al. Gastrointest Endosc 2013;78:625-632. Type 1 vs 2: Hewett DG et al. Gastroenterology 2012;143:599-607',
  pubmed: NICE_2013_PUBMED,
  figures: [
    {
      src: '/figures/nice-hayashi2013-fig1.jpg',
      alt: 'NICE classification Type 1, Type 2, and Type 3 (Hayashi 2013 Fig. 1)',
      caption: 'Fig. 1. The NBI international colorectal endoscopic (NICE) classification',
      source:
        'Hayashi N, Tanaka S, Hewett DG, et al. Endoscopic prediction of deep submucosal invasive carcinoma: validation of the Narrow-Band Imaging International Colorectal Endoscopic (NICE) classification. Gastrointest Endosc. 2013;78:625-632. Fig. 1.',
      doi: 'https://doi.org/10.1016/j.gie.2013.04.185',
      pubmed: NICE_2013_PUBMED,
      note: '原著 Fig. 1。拡大なしでも使う。JNET とは別分類。',
      aspectRatio: 2354 / 2294,
    },
  ],
  entries: [
    {
      label: 'Type 1',
      meaning: 'Hyperplastic',
      severity: 'none',
      rows: [
        { heading: 'Color', text: 'Same or lighter than background' },
        { heading: 'Vessels', text: 'None, or isolated lacy vessels coursing across the lesion' },
        {
          heading: 'Surface',
          text: 'Dark or white spots of uniform size, or homogeneous absence of pattern',
        },
        { heading: 'Pathology', text: 'Hyperplastic' },
        {
          heading: '*',
          text: 'Can be applied using colonoscopes with or without optical (zoom) magnification.',
        },
      ],
      comment: 'SSA/P はこの分類に含まれない（原著の限界）。',
    },
    {
      label: 'Type 2',
      meaning: 'Adenoma to superficial SM ca',
      severity: 'mild',
      rows: [
        { heading: 'Color', text: 'Browner relative to background (verify color arises from vessels)' },
        { heading: 'Vessels', text: 'Brown vessels surrounding white structures' },
        {
          heading: 'Surface',
          text: 'Oval, tubular or branched white structure surrounded by brown vessels',
        },
        { heading: 'Pathology', text: 'Adenoma' },
        {
          heading: '**',
          text: 'These structures (regular or irregular) may represent the pits and the epithelium of the crypt opening.',
        },
        {
          heading: '***',
          text: 'Type 2 consists of Vienna classification types 3, 4 and superficial 5 (all adenomas with either low or high grade dysplasia, or with superficial submucosal carcinoma). The presence of high grade dysplasia or superficial submucosal carcinoma may be suggested by an irregular vessel or surface pattern, and is often associated with atypical morphology (e.g., depressed area).',
        },
      ],
    },
    {
      label: 'Type 3',
      meaning: 'Deep SM invasive cancer',
      severity: 'severe',
      rows: [
        {
          heading: 'Color',
          text: 'Brown to dark brown relative to background; sometimes patchy whiter areas',
        },
        { heading: 'Vessels', text: 'Has area(s) of disrupted or missing vessels' },
        { heading: 'Surface', text: 'Amorphous or absent surface pattern' },
        { heading: 'Pathology', text: 'Deep submucosal invasive cancer' },
      ],
      comment: '深部SM浸潤は ≥1000 μm。追加外科を検討する。',
    },
  ],
};
