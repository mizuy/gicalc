import type { ClassificationDefinition } from '../../types/score';

/** Sarin 1992 Hepatology（PMID 1446890） */
export const SARIN_1992_PUBMED = '1446890';

export const sarinScore: ClassificationDefinition = {
  id: 'sarin',
  kind: 'classification',
  name: 'Sarin分類（胃静脈瘤）',
  shortName: 'Sarin',
  organ: 'stomach',
  category: 'classification',
  categoryLabel: '内視鏡分類',
  description:
    '胃静脈瘤を、食道静脈瘤との連続と占居部位で GOV1 / GOV2 / IGV1 / IGV2 に分ける。日本の記載基準の Lg-c / Lg-cf / Lg-f はそれぞれ GOV1 / GOV2 / IGV1 にほぼ相当する。',
  originalLead:
    'Gastric varices are classified by their location in the stomach and their relationship to esophageal varices. Gastro-oesophageal varices type 1 (GOV1) are esophageal varices extending 2–5 cm below the gastro-oesophageal junction along the lesser curvature. Gastro-oesophageal varices type 2 (GOV2) are esophageal varices extending into the fundus along the greater curvature. Isolated gastric varices type 1 (IGV1) are isolated fundal varices without esophageal varices. Isolated gastric varices type 2 (IGV2) are isolated varices in the gastric body, antrum, or pylorus (ectopic). In the original cohort, GOV1 accounted for about 75% of gastric varices, GOV2 21%, IGV1 less than 2%, and IGV2 4%. The incidence of bleeding is highest with IGV1, then GOV2.',
  reference: 'Sarin SK et al. Hepatology 1992;16:1343-1349',
  pubmed: SARIN_1992_PUBMED,
  officialUrl: 'https://www.jsge.or.jp/committees/guideline/guideline/lc.html',
  officialLinkLabel: '肝硬変診療ガイドライン2020（胃静脈瘤）',
  note: 'Sarin は国際分類なので日本マークは付けない。日本の記載は門脈圧亢進症学会の Lg（噴門 Lg-c、噴門〜穹窿 Lg-cf、穹窿 Lg-f）。形態・色調・発赤は食道と同じ F / C / RC で書く。Hashizume 1990 は古い日本の胃静脈瘤分類で、現行規約は Lg + F を使う。',
  figures: [
    {
      href: 'https://doi.org/10.1002/hep.1840160607',
      hrefLabel: '1992 paper',
      alt: 'Sarin 1992 classification of gastric varices in Hepatology',
      caption:
        'Sarin SK, Lahoti D, Saxena SP, Murthy NS, Makwana UK. Prevalence, classification and natural history of gastric varices. Hepatology 1992',
      source: 'Sarin SK, Lahoti D, Saxena SP, Murthy NS, Makwana UK. Hepatology. 1992;16:1343-1349.',
      doi: 'https://doi.org/10.1002/hep.1840160607',
      pubmed: SARIN_1992_PUBMED,
      note: '原著。Wiley / Hepatology の著作権。CC ではないので画像は置かず、論文へリンクする。',
    },
  ],
  entries: [
    {
      label: 'GOV1',
      meaning: 'Lesser-curve extension',
      group: 'Sarin',
      severity: 'moderate',
      rows: [
        {
          heading: 'Definition',
          text: 'Esophageal varices extending 2–5 cm below the gastro-oesophageal junction along the lesser curvature',
        },
        {
          heading: 'Share',
          text: 'About 75% of gastric varices; lowest bleeding risk among the four types',
        },
      ],
      comment: 'Lg-c にほぼ相当。血行動態は食道静脈瘤と同じ。EVL など食道に準じた治療。',
    },
    {
      label: 'GOV2',
      meaning: 'Fundal extension',
      group: 'Sarin',
      severity: 'severe',
      rows: [
        {
          heading: 'Definition',
          text: 'Esophageal varices extending into the fundus of the stomach along the greater curvature (cardiofundal)',
        },
        {
          heading: 'Share',
          text: 'About 21% of gastric varices; higher bleeding risk than GOV1',
        },
      ],
      comment: 'Lg-cf にほぼ相当。胃腎シャントを伴うことが多い。結紮より CA や BRTO を考える。',
    },
    {
      label: 'IGV1',
      meaning: 'Isolated fundal',
      group: 'Sarin',
      severity: 'severe',
      rows: [
        {
          heading: 'Definition',
          text: 'Isolated fundal varices without esophageal varices',
        },
        {
          heading: 'Share',
          text: 'Less than 2% of gastric varices; highest bleeding risk of the four types',
        },
      ],
      comment:
        'Lg-f にほぼ相当。脾静脈閉塞（左側門脈圧亢進）を除外する。日本では再出血予防に BRTO を提案する。',
    },
    {
      label: 'IGV2',
      meaning: 'Ectopic gastric',
      group: 'Sarin',
      severity: 'mild',
      rows: [
        {
          heading: 'Definition',
          text: 'Isolated varices in the gastric body, antrum, or pylorus (ectopic), away from the cardiofundal region',
        },
        {
          heading: 'Share',
          text: 'About 4% of gastric varices',
        },
      ],
      comment: 'Lg の記号はない。日本では異所性静脈瘤として別に記載する。',
    },
    {
      label: 'Lg',
      meaning: 'JSPH gastric letters',
      group: '記載基準',
      severity: 'none',
      rows: [
        {
          heading: 'Lg-c',
          text: 'Cardiac, adjacent to the cardiac orifice ≈ GOV1',
        },
        {
          heading: 'Lg-cf',
          text: 'Cardia plus fundus ≈ GOV2',
        },
        {
          heading: 'Lg-f',
          text: 'Fundus only, away from the cardia ≈ IGV1',
        },
      ],
      comment: '形態は F0–F3、色調は Cw / Cb、発赤は胃では RC0 / RC1。詳しい定義は門脈圧亢進症学会分類（F / L / C）のページ。',
    },
    {
      label: 'Guideline',
      meaning: 'JSGE / JSH 2020',
      group: '日本ガイドライン',
      severity: 'none',
      rows: [
        {
          heading: 'Risk',
          text: 'Location, form, red color sign, and liver reserve predict gastric variceal bleeding. An endoscopic RC sign is a bleeding-risk factor (BQ 4-1).',
        },
        {
          heading: 'GOV1',
          text: 'Treat as esophageal varices (EVL / EIS).',
        },
        {
          heading: 'Fundal',
          text: 'For isolated fundal varices, BRTO is suggested to prevent rebleeding (CQ 4-6). Cyanoacrylate injection improves outcomes for never-bled fundal varices; after bleeding, BRTO is preferred over cyanoacrylate (CQ 4-7).',
        },
      ],
      comment:
        'ESGE も胃静脈瘤は Sarin で記載するよう推奨する。欧米は一次予防に NSBB、出血時は CA / TIPS。日本は BRTO の経験が多い。',
    },
  ],
};
