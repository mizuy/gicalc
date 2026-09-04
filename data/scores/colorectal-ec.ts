import type { ClassificationDefinition } from '../../types/score';

/** Kudo 2011 Endoscopy（PMID 21837586）。大腸 EC 分類（メチレンブルー染色） */
export const KUDO_EC_2011_PUBMED = '21837586';
/** Kudo 2015 GIE（PMID 26071058）。EC-V 分類（EC-NBI） */
export const KUDO_ECV_2015_PUBMED = '26071058';
/** Misawa 2021 Clin Endosc Fig. 2–3（PMID 34233111）。CC BY-NC 3.0 */
export const MAEDA_EC_REVIEW_2021_PUBMED = '34233111';

export const colorectalEcScore: ClassificationDefinition = {
  id: 'colorectal-ec',
  kind: 'classification',
  name: '大腸EC分類（超拡大内視鏡）',
  shortName: 'EC',
  developedInJapan: true,
  organ: 'colorectum',
  category: 'classification',
  categoryLabel: '内視鏡分類',
  description:
    '大腸病変の超拡大内視鏡（endocytoscopy; EC）分類。メチレンブルー染色後の腺腔・核に基づく EC1a–EC3b と、EC-NBI の表面微血管に基づく EC-V1–V3。pit pattern / NICE / JNET とは別の分類です。',
  originalLead:
    'After methylene blue staining, colorectal endocytoscopic (EC) images are classified by crypt (glandular lumen) and nuclear findings. Non-neoplastic lesions are EC1 (EC1a: normal mucosa; EC1b: hyperplastic polyp). Neoplastic lesions are EC2 (adenoma to intramucosal cancer) and EC3 (EC3a: intramucosal to slightly invasive submucosal cancer; EC3b: massively invasive submucosal cancer or deeper). EC-V classification uses EC with narrow-band imaging (EC-NBI) without dye: EC-V1, obscure surface microvessels (mainly non-neoplasia); EC-V2, uniform clear microvessel network (adenoma / intramucosal cancer); EC-V3, dilated microvessels of non-homogeneous caliber or arrangement (invasive cancer).',
  reference:
    'Kudo SE et al. Endoscopy 2011;43:869-875. Kudo SE et al. Gastrointest Endosc 2015;82:912-923',
  pubmed: KUDO_EC_2011_PUBMED,
  note: 'EC 分類はメチレンブルー（またはクリスタルバイオレット併用）染色後の観察。EC-V は EC-NBI で染色不要。SMs＝粘膜下層軽度浸潤、SMm＝高度浸潤（リンパ節転移リスク）。EndoBRAIN は EC/EC-NBI 画像の診断支援（薬機承認）で、本ページの分類表とは別製品。',
  figures: [
    {
      src: '/figures/ec-maeda2021-fig2.webp',
      alt: 'Endocytoscopic classification for colorectal lesions EC1a EC1b EC2 EC3a EC3b',
      caption: 'Fig. 2. Endocytoscopic classification for colorectal lesions (Kudo et al.)',
      source:
        'Misawa M, Kudo SE, Takashina Y, et al. Clinical efficacy of endocytoscopy for gastrointestinal endoscopy. Clin Endosc. 2021;54:455-463. Fig. 2 (based on Kudo SE et al. Endoscopy 2011;43:869-875).',
      doi: 'https://doi.org/10.5946/ce.2021.165',
      pubmed: MAEDA_EC_REVIEW_2021_PUBMED,
      license: 'CC BY-NC 3.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-nc/3.0/',
      note: 'Clin Endosc 2021 Fig. 2（CC BY-NC 3.0）。原著 Kudo 2011 Endoscopy は CC ではない。',
      aspectRatio: 783 / 664,
    },
    {
      src: '/figures/ec-maeda2021-fig3.webp',
      alt: 'Endocytoscopic vascular EC-V classification EC-V1 EC-V2 EC-V3 with NBI',
      caption: 'Fig. 3. Endocytoscopic classification based on narrow-band imaging (EC-V)',
      source:
        'Misawa M, Kudo SE, Takashina Y, et al. Clinical efficacy of endocytoscopy for gastrointestinal endoscopy. Clin Endosc. 2021;54:455-463. Fig. 3 (based on Kudo SE et al. Gastrointest Endosc 2015;82:912-923).',
      doi: 'https://doi.org/10.5946/ce.2021.165',
      pubmed: MAEDA_EC_REVIEW_2021_PUBMED,
      license: 'CC BY-NC 3.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-nc/3.0/',
      note: 'Clin Endosc 2021 Fig. 3（CC BY-NC 3.0）。EC-V 原著 Kudo 2015 GIE は CC ではない。',
      aspectRatio: 776 / 314,
    },
  ],
  entries: [
    {
      label: 'EC1a',
      meaning: 'Normal mucosa',
      group: 'EC（染色）',
      severity: 'none',
      rows: [
        {
          heading: 'Crypt',
          text: 'Small round crypt openings clearly visible; smooth crypt margins',
        },
        {
          heading: 'Nuclei',
          text: 'Small, uniform round or slightly spindle-shaped nuclei arranged radially from the crypt margin; or no staining pattern',
        },
        { heading: 'Histology', text: 'Normal colonic mucosa' },
      ],
    },
    {
      label: 'EC1b',
      meaning: 'Hyperplastic polyp',
      group: 'EC（染色）',
      severity: 'none',
      rows: [
        {
          heading: 'Crypt',
          text: 'Serrated (saw-tooth) crypt pattern; fine cytoplasmic granules suggesting mucin',
        },
        {
          heading: 'Nuclei',
          text: 'Small, uniform round nuclei near the crypt margin',
        },
        { heading: 'Histology', text: 'Hyperplastic polyp' },
      ],
      comment: 'EC1b で非腫瘍（過形成）と腫瘍を鑑別する用途が大きい。',
    },
    {
      label: 'EC2',
      meaning: 'Adenoma to intramucosal cancer',
      group: 'EC（染色）',
      severity: 'mild',
      rows: [
        {
          heading: 'Crypt',
          text: 'Clear slit-like crypt openings; smooth crypt margins',
        },
        {
          heading: 'Nuclei',
          text: 'Mildly enlarged spindle-shaped or oval nuclei',
        },
        {
          heading: 'Histology',
          text: 'Adenoma (including low- and high-grade dysplasia) to intramucosal adenocarcinoma',
        },
      ],
      comment: '異型増殖（dysplasia）は主に EC2。深達度は EC3 細分で評価。',
    },
    {
      label: 'EC3a',
      meaning: 'Intramucosal to slightly invasive SM',
      group: 'EC（染色）',
      severity: 'moderate',
      rows: [
        {
          heading: 'Crypt',
          text: 'Irregular crypt openings; round nuclei stain densely with methylene blue',
        },
        {
          heading: 'Histology',
          text: 'Intramucosal cancer to slightly invasive submucosal cancer (SMs)',
        },
      ],
      comment: 'SMs は血管透過がなくリンパ節転移リスクが低い所群（工藤 SM 分類）。',
    },
    {
      label: 'EC3b',
      meaning: 'Massively invasive SM or deeper',
      group: 'EC（染色）',
      severity: 'severe',
      rows: [
        {
          heading: 'Crypt',
          text: 'Crypt openings obscure or indistinct',
        },
        {
          heading: 'Nuclei',
          text: 'Irregular, enlarged nuclei; desmoplastic reaction may appear as fine granular structures',
        },
        {
          heading: 'Histology',
          text: 'Massively invasive submucosal cancer (SMm) or deeper — metastatic risk',
        },
      ],
      comment: 'SMm 以深の鑑別に有用。間質反応（desmoplastic reaction）の細顆粒状構造は EC3b の手がかり。',
    },
    {
      label: 'EC-V1',
      meaning: 'Obscure microvessels',
      group: 'EC-V（EC-NBI）',
      severity: 'none',
      rows: [
        {
          heading: 'Vessels',
          text: 'Surface microvessels very fine and obscure',
        },
        { heading: 'Histology', text: 'Mainly hyperplastic polyp / non-neoplasia' },
        {
          heading: 'Method',
          text: 'EC-NBI without methylene blue staining',
        },
      ],
    },
    {
      label: 'EC-V2',
      meaning: 'Uniform microvessel network',
      group: 'EC-V（EC-NBI）',
      severity: 'mild',
      rows: [
        {
          heading: 'Vessels',
          text: 'Surface microvessels clearly seen; regular network with uniform caliber and arrangement',
        },
        {
          heading: 'Histology',
          text: 'Adenoma to intramucosal cancer',
        },
        {
          heading: 'Method',
          text: 'EC-NBI without methylene blue staining',
        },
      ],
    },
    {
      label: 'EC-V3',
      meaning: 'Irregular dilated microvessels',
      group: 'EC-V（EC-NBI）',
      severity: 'severe',
      rows: [
        {
          heading: 'Vessels',
          text: 'Surface microvessels thick; non-homogeneous caliber or arrangement',
        },
        { heading: 'Histology', text: 'Invasive cancer (including SMm)' },
        {
          heading: 'Method',
          text: 'EC-NBI without methylene blue staining; faster than EC with dye',
        },
      ],
      comment: '浸潤癌（SMm 含む）の予測。EC 染色より手順が簡便。',
    },
    {
      label: 'Observation',
      meaning: 'How to obtain EC images',
      group: 'Method',
      severity: 'none',
      rows: [
        {
          heading: 'EC (stained)',
          text: 'Apply methylene blue (or crystal violet + methylene blue double stain) after washing; contact the EC lens to the lesion and pull the magnification lever',
        },
        {
          heading: 'EC-NBI',
          text: 'Switch to NBI on the endocytoscope; no dye required for EC-V',
        },
        {
          heading: 'Magnification',
          text: 'Contact-type ultra-high magnification (approximately 380–520× on current scopes)',
        },
      ],
      comment: 'GIF-H290EC / CF-H290ECI など一体型 EC スコープ。pit pattern・JNET とは併用して深達度を評価する。',
    },
  ],
};
