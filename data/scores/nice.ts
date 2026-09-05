import type { ClassificationDefinition, ClassificationFigure } from '../../types/score';

/** Hayashi 2013 GIE（PMID 23910062）。Type 1/2 は Hewett 2012。 */
export const NICE_2013_PUBMED = '23910062';
/** Hamada 2021 BMC Gastroenterol（PMID 34454417）。CC BY 4.0 の teaching 図。 */
export const NICE_HAMADA_2021_PUBMED = '34454417';

const HAMADA_SOURCE =
  'Hamada Y, Tanaka K, Katsurahara M, et al. Utility of the narrow-band imaging international colorectal endoscopic classification for optical diagnosis of colorectal polyp histology in clinical practice: a retrospective study. BMC Gastroenterol. 2021;21:336. Fig. 1. Classification: Hayashi N, Tanaka S, Hewett DG, et al. Gastrointest Endosc. 2013;78:625-632.';
const HAMADA_DOI = 'https://doi.org/10.1186/s12876-021-01898-z';

function hamadaCrop(figure: {
  src: string;
  alt: string;
  caption: string;
  note: string;
  aspectRatio: number;
}): ClassificationFigure {
  return {
    ...figure,
    source: HAMADA_SOURCE,
    doi: HAMADA_DOI,
    pubmed: NICE_HAMADA_2021_PUBMED,
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
  };
}

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
      href: 'https://bmcgastroenterol.biomedcentral.com/articles/10.1186/s12876-021-01898-z/figures/1',
      hrefLabel: 'Fig. 1',
      alt: 'NICE classification Type 1, Type 2, and Type 3 (Hamada 2021 Fig. 1)',
      caption: 'Fig. 1. Narrow-band imaging International colorectal endoscopic classification',
      source: HAMADA_SOURCE,
      doi: HAMADA_DOI,
      pubmed: NICE_HAMADA_2021_PUBMED,
      license: 'CC BY 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
      note: '各 Type カードに切り抜きを掲載。原図は埋め込まず Hamada 2021 Fig. 1 へリンクする。ライセンスは CC BY 4.0。',
    },
    {
      href: 'https://ars.els-cdn.com/content/image/1-s2.0-S0016510713018531-gr1_lrg.jpg',
      hrefLabel: 'Hayashi 2013 Fig. 1',
      alt: 'NICE classification Type 1, Type 2, and Type 3 (Hayashi 2013 Fig. 1)',
      caption: 'Fig. 1. The NBI international colorectal endoscopic (NICE) classification (Hayashi 2013)',
      source:
        'Hayashi N, Tanaka S, Hewett DG, et al. Endoscopic prediction of deep submucosal invasive carcinoma: validation of the Narrow-Band Imaging International Colorectal Endoscopic (NICE) classification. Gastrointest Endosc. 2013;78:625-632. Fig. 1.',
      doi: 'https://doi.org/10.1016/j.gie.2013.04.185',
      pubmed: NICE_2013_PUBMED,
      note: 'Hayashi 2013 原著 Fig. 1。Elsevier / GIE の著作権。CC ではないので埋め込まず、出版社の Fig. 1 へリンクする。',
    },
  ],
  entries: [
    {
      label: 'Type 1',
      meaning: 'Hyperplastic',
      severity: 'none',
      figures: [
        hamadaCrop({
          src: '/figures/nice-hamada2021-type1.webp',
          alt: 'NICE Type 1 endoscopic example (Hamada 2021 Fig. 1, Type 1 column)',
          caption: 'Fig. 1 Type 1',
          note: 'Hamada 2021 Fig. 1 Endoscopic image 行から Type 1 列を切り抜き。CC BY 4.0。拡大なし NBI。',
          aspectRatio: 261 / 233,
        }),
      ],
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
      figures: [
        hamadaCrop({
          src: '/figures/nice-hamada2021-type2.webp',
          alt: 'NICE Type 2 endoscopic example (Hamada 2021 Fig. 1, Type 2 column)',
          caption: 'Fig. 1 Type 2',
          note: 'Hamada 2021 Fig. 1 Endoscopic image 行から Type 2 列を切り抜き。CC BY 4.0。拡大なし NBI。',
          aspectRatio: 265 / 233,
        }),
      ],
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
      figures: [
        hamadaCrop({
          src: '/figures/nice-hamada2021-type3.webp',
          alt: 'NICE Type 3 endoscopic example (Hamada 2021 Fig. 1, Type 3 column)',
          caption: 'Fig. 1 Type 3',
          note: 'Hamada 2021 Fig. 1 Endoscopic image 行から Type 3 列を切り抜き。CC BY 4.0。拡大なし NBI。',
          aspectRatio: 268 / 233,
        }),
      ],
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
