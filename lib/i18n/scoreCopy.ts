import { formatAddedPoints, NOMOGRAM_ITEM_POINTS } from '../nomogram/kajiwara';

const nomogramPts = (points: number, note?: string): string => {
  const score = formatAddedPoints(points, 'en');
  return note ? `${score}. ${note}` : score;
};

export type FieldCopy = {
  label: string;
  description?: string;
  options: Array<{ label: string; description?: string }>;
};

export type FlowCopy = {
  title: string;
  steps: Record<string, { prompt: string; hint?: string; options: Record<string, string> }>;
  map: Record<string, string>;
};

export type ScoreCopy = {
  name: string;
  shortName?: string;
  description: string;
  fields?: Record<string, FieldCopy>;
  groups?: Record<string, string>;
  comments?: Record<string, string>;
  meanings?: Record<string, string>;
  figureNotes?: string[];
  officialLinkLabel?: string;
  note?: string;
  flow?: FlowCopy;
};

const pts = (n: number, plus = true): string => {
  const unit = n === 1 ? 'point' : 'points';
  return `${plus && n > 0 ? '+' : ''}${n} ${unit}`;
};

export const SCORE_EN: Record<string, ScoreCopy> = {
  jes: {
    name: 'JES classification (esophageal squamous, magnifying)',
    description: 'Magnifying endoscopic classification of esophageal squamous epithelium (Type A / B1 / B2 / B3).',
    comments: {
      'Type B2': 'Esophageal SM1 is ≤200 μm.',
    },
    figureNotes: [
      'Top left Fig. 1 Type A; top right Fig. 2 Type B1; bottom left Fig. 3 Type B2; bottom right Fig. 4 Type B3. Springer Open. License: CC BY 4.0.',
      'AVA-small / middle / large. Springer Open. License: CC BY 4.0.',
    ],
  },
  la: {
    name: 'Los Angeles classification (reflux esophagitis)',
    shortName: 'LA',
    description:
      'Grades A–D of reflux esophagitis by the extent of mucosal breaks. So-called minimal changes are not included.',
    groups: {
      軽症: 'Mild',
      重症: 'Severe',
    },
    comments: {
      'Grade C': 'Many guidelines treat A/B as mild and C/D as severe.',
    },
    figureNotes: [
      'VideoGIE 2013 is a CC BY-NC-ND 4.0 video. No complete A–D still-image teaching panel was confirmed as CC, so the figure is not hosted. Link opens the video article. The Lundell 1999 Gut original is not CC.',
    ],
  },
  prague: {
    name: 'Prague C & M (Barrett esophagus)',
    shortName: 'Prague',
    description:
      'Records the endoscopic extent of Barrett esophagus as circumferential (C) and maximum (M) length from the gastroesophageal junction.',
    groups: {
      ランドマーク: 'Landmarks',
      計測: 'Measurement',
      記載例: 'Examples',
    },
    comments: {
      M: 'A common error is to take M as the tongue length only. M is the maximum (circumferential segment plus tongue).',
      C0M1: 'Recognition below 1 cm is unreliable (original RC 0.22).',
    },
    figureNotes: [
      'Original Fig. 3 (C2M5 schematic). Elsevier / Gastroenterology copyright; not CC, so the figure is not hosted. Link opens the publisher Fig. 3 image.',
    ],
  },
  siewert: {
    name: 'Siewert classification (EGJ adenocarcinoma)',
    shortName: 'Siewert',
    description:
      'Splits adenocarcinoma whose center lies within 5 cm of the EGJ into Type I / II / III. Japanese rules and guidelines use the Nishi definition (center within 2 cm of the EGJ, any histology). That zone roughly matches Siewert Type II.',
    officialLinkLabel: 'JGCA gastric cancer guideline, 6th ed. (EGJ cancer)',
    note: 'Siewert is a German surgical classification (no Japan mark). The Japan Esophageal Society and JGCA adopt Nishi. Siewert’s zero point is the top of the gastric folds, as in Prague. Japanese endoscopy prefers the lower end of the palisade vessels, and uses the fold tops only when those vessels are unclear. The Z-line (SCJ) may not coincide with the EGJ.',
    groups: {
      ランドマーク: 'Landmark',
      Siewert: 'Siewert',
      西分類: 'Nishi',
      日本ガイドライン: 'Japanese guidelines',
    },
    comments: {
      EGJ: 'Siewert / Prague use the top of the gastric folds. Japanese rules prefer the lower end of the palisade vessels. In Barrett esophagus or hiatal hernia, use the fold tops as the EGJ.',
      'Type I':
        'Usually outside the Nishi EGJ zone (±2 cm). In Japan this is treated as esophageal (Barrett) adenocarcinoma. Siewert applies to adenocarcinoma only.',
      'Type II': 'Roughly the same as Nishi EGJ carcinoma. This is what Japanese guidelines mean by EGJ cancer.',
      'Type III':
        'If the center is 2–5 cm on the gastric side but the esophagus is not involved, it is gastric cancer, not Type III. It lies outside the Nishi ±2 cm zone.',
      'Nishi EGJ carcinoma':
        'Current rules have no size limit (older editions required diameter ≤4 cm). This is not the same as Siewert’s AEG field (adenocarcinoma within ±5 cm).',
      'JGCA / JES guideline':
        'The JGCA 6th edition and the esophageal-society EGJ algorithm are shared. Approach is chosen by esophageal invasion length, not by Siewert type. Newer analyses measure invasion on the resected specimen rather than by endoscopy alone.',
    },
    figureNotes: [
      'Japanese Classification of Esophageal Cancer, 11th ed., English Fig. 2-6. Springer Open. License: CC BY 4.0. The Siewert 1998 BJS original figure is not CC.',
      '11th ed. Fig. 2-5. EGJ zone = 2 cm oral (abdominal esophagus, Ae) and 2 cm anal. License: CC BY 4.0.',
      '11th ed. Fig. 2-7. Occupation labels. License: CC BY 4.0.',
      'Original 1998 paper. Wiley / BJS copyright; not CC, so the figure is not hosted. Link opens the paper.',
    ],
  },
  'jsph-varices': {
    name: 'Esophagogastric varices (JSPH rules)',
    shortName: 'JSPH varices',
    description:
      'Japan Society for Portal Hypertension rules for recording esophageal and gastric varices: location (L / Lg), form (F), color (C), then red color signs (RC). The international gastric scheme is Sarin (GOV / IGV), on a separate page.',
    officialLinkLabel: 'JSGE/JSH cirrhosis guideline 2020 (EG varices)',
    note: 'Proposed in 1980, revised in 1991, English 2nd edition in 2010. The current Japanese portal-hypertension rules use the same axes. Record in the order L, F, C, RC, bleeding signs, mucosal findings. Gastric varices use Sarin internationally. Western small / large roughly match F1 and F2/F3.',
    groups: {
      部位: 'Location',
      形態: 'Form',
      色調: 'Color',
      発赤所見: 'Red color signs',
      '出血・粘膜': 'Bleeding and mucosa',
      日本ガイドライン: 'Japanese guidelines',
    },
    comments: {
      L: 'When more than one portion is involved, record all of them (Ls,m or Lm,i).',
      Lg: 'The 2010 edition lists the stomach separately from the esophagus. Ectopic varices (body, antrum, duodenum) have no Lg letter — record them as Sarin IGV2.',
      F1: 'F1 with RC is an indication for prophylaxis in Western guidelines. Do not ignore it in Japan either.',
      F2: 'F2 / F3, or any RC-positive varix, is the usual target for prophylactic endoscopy in Japan.',
      Cw: 'If mixed, write the predominant color first (Cw-b / Cb-w). Add Th for thrombosis (Cw-Th).',
      RC: 'Gastric varices in the 2010 edition are only RC0 / RC1 (absent / present). RC is the strongest endoscopic predictor of bleeding.',
      'RC type': 'Record both type and grade, e.g. RC3 (RWM, CRS). HCS carries a high bleeding risk.',
      Guideline:
        'Example: Ls, F3, Cb, RC3 (RWM, CRS). Record the stomach separately, e.g. Lg-f, F2, Cb, RC0. Sarin is on the gastric page.',
    },
    figureNotes: [
      'Nagashima 2022 Fig. 2 (A CRS and RWM; B HCS). MDPI Healthcare. License: CC BY 4.0. The Tajiri 2010 Digestive Endoscopy original figures are not CC.',
      'Original 2010 rules paper. Wiley / Digestive Endoscopy copyright; not CC, so the figure is not hosted. Link opens the paper.',
    ],
  },
  sarin: {
    name: 'Sarin classification (gastric varices)',
    shortName: 'Sarin',
    description:
      'Splits gastric varices by continuity with esophageal varices and by site into GOV1 / GOV2 / IGV1 / IGV2. Japanese recording letters Lg-c / Lg-cf / Lg-f roughly match GOV1 / GOV2 / IGV1.',
    officialLinkLabel: 'JSGE/JSH cirrhosis guideline 2020 (gastric varices)',
    note: 'Sarin is an international classification (no Japan mark). Japanese recording uses JSPH Lg letters (cardiac Lg-c, cardiofundal Lg-cf, fundal Lg-f). Form, color, and red color signs use the same F / C / RC as the esophagus. Hashizume 1990 is an older Japanese gastric scheme; current rules use Lg + F.',
    groups: {
      Sarin: 'Sarin',
      記載基準: 'JSPH letters',
      日本ガイドライン: 'Japanese guidelines',
    },
    comments: {
      GOV1: 'Roughly Lg-c. Vascular anatomy matches esophageal varices. Treat like the esophagus (EVL).',
      GOV2: 'Roughly Lg-cf. Often has a gastrorenal shunt. Prefer cyanoacrylate or BRTO over banding.',
      IGV1:
        'Roughly Lg-f. Exclude splenic-vein occlusion (left-sided portal hypertension). Japanese guidelines suggest BRTO to prevent rebleeding.',
      IGV2: 'No Lg letter. In Japan these are recorded as ectopic varices.',
      Lg: 'Form is F0–F3, color is Cw / Cb, and gastric RC is only RC0 / RC1. Full definitions are on the esophageal JSPH page.',
      Guideline:
        'ESGE also recommends recording gastric varices with Sarin. The West uses NSBB for primary prophylaxis and CA / TIPS for bleeding. Japan has more BRTO experience.',
    },
    figureNotes: [
      'Original 1992 paper. Wiley / Hepatology copyright; not CC, so the figure is not hosted. Link opens the paper.',
    ],
  },
  erefs: {
    name: 'EREFS (eosinophilic esophagitis)',
    shortName: 'EREFS',
    description:
      'Endoscopic findings of eosinophilic esophagitis (Edema / Rings / Exudates / Furrows / Stricture). Original total 0–8. Not a substitute for biopsy.',
    groups: {
      炎症: 'Inflammatory',
      線維狭窄: 'Fibrostenotic',
      合計: 'Total',
    },
    comments: {
      Furrows: 'Later modifications sometimes grade furrows as 0 / mild / severe. This page uses the 2013 original 0–1.',
      Total: 'Biopsies from the distal and mid esophagus are still required. EREFS alone does not confirm the diagnosis.',
    },
    figureNotes: [
      'Abe 2022 Fig. 2 (a edema, b rings, c exudates, d furrows, e stricture, f narrow-caliber). MDPI Diagnostics. License: CC BY 4.0. The Hirano 2013 Gut table is not CC.',
    ],
  },
  hill: {
    name: 'Hill classification (gastroesophageal flap valve)',
    shortName: 'Hill',
    description:
      'Retroflexed grades I–IV of the gastroesophageal flap valve. Endoscopic assessment of the antireflux barrier.',
    groups: {
      正常寄り: 'More competent',
      異常: 'Abnormal',
    },
    comments: {
      'Grade III': 'Grades III–IV are more often associated with reflux and hiatal hernia.',
    },
    figureNotes: [
      'Ge 2023 Fig. 1 (sample images I–IV). Annals of Medicine. License: CC BY-NC 4.0. The Hill 1996 GIE original is not CC.',
    ],
  },
  'kimura-takemoto': {
    name: 'Kimura–Takemoto classification (gastric atrophy)',
    shortName: 'Kimura',
    description: 'Closed / Open classification by the endoscopic atrophic border.',
    groups: {
      萎縮なし: 'No atrophy',
      '閉鎖型（Closed）': 'Closed type',
      '開放型（Open）': 'Open type',
    },
    meanings: {
      'C-0': 'Not in the original paper',
    },
    comments: {
      'C-0': 'Not one of the original 6 types. Used as Kyoto atrophy 0 (C-0/C-1).',
      'C-1': 'Kyoto atrophy 0 points (C-0/C-1).',
      'C-2': 'Kyoto atrophy +1 point (C-2/C-3).',
      'C-3': 'Kyoto atrophy +1 point (C-2/C-3).',
      'O-1': 'Kyoto atrophy +2 points (O-1–O-3).',
      'O-2': 'Kyoto atrophy +2 points (O-1–O-3).',
      'O-3': 'Kyoto atrophy +2 points (O-1–O-3).',
    },
    figureNotes: [
      'C-1–C-3, O-1–O-3. Quach 2019 Clin Endosc Fig. 2. License: CC BY-NC 3.0. The original white-background figure is used as-is (a black background hides the lines).',
    ],
  },
  'mesda-g': {
    name: 'MESDA-G (early gastric cancer, magnifying)',
    description:
      'Simple magnifying (M-NBI) diagnostic algorithm for early gastric cancer. After a suspicious lesion on white-light imaging, decide by the demarcation line (DL), then irregular microvascular (IMVP) and/or irregular microsurface (IMSP) patterns within the DL. Separate from colorectal JNET / NICE. Stomach only.',
    groups: {
      アルゴリズム: 'Algorithm',
      判定: 'Diagnosis',
      'VS分類・微小血管': 'VS classification · microvascular',
      'VS分類・微小表面': 'VS classification · microsurface',
    },
    comments: {
      'Suspicious lesion':
        'Look for subtle color or morphological change on white-light imaging. Stomach only. Separate from colorectal JNET / NICE.',
      'Demarcation line (DL)':
        'If the demarcation line is absent, diagnose non-cancer. If present, evaluate MV and MS separately within the DL.',
      'Irregular MV and/or MS within DL':
        'The original paper reports that 97% of EGC cases fit these criteria. Diagnostic yield for undifferentiated (diffuse-type) EGC was unclear. Contact bleeding or mucus can prevent a clear image.',
      'Irregular MV':
        'A later subclassification (fine-network for differentiated, corkscrew for poorly differentiated) is not a MESDA-G branch.',
      'Absent MV':
        'When white opaque substance (WOS) hides vessels, use WOS morphology as an alternative marker of the microsurface pattern.',
    },
    figureNotes: [
      'Same algorithm as the on-screen flowchart, so the image is not hosted — link to original Fig. 1. Wiley / JGES Open Access, CC BY-NC-ND 4.0. Magnifying algorithm for the stomach. Separate from JNET / NICE.',
      'Original Fig. 13. Wiley / JGES Open Access, CC BY-NC-ND 4.0. Microvascular (V) and microsurface (S) patterns as regular / irregular / absent. Arrows mark the demarcation line (DL).',
    ],
    flow: {
      title: 'Algorithm',
      steps: {
        dl: {
          prompt: 'Is a demarcation line (DL) present?',
          hint: 'A border between the lesion and background mucosa, seen as an abrupt change in MV and/or MS. If absent, diagnose non-cancer. If present, look inside the DL next.',
          options: { absent: 'Absent', present: 'Present' },
        },
        mvms: {
          prompt: 'What are the microvascular (MV) and microsurface (MS) patterns inside the DL?',
          hint: 'Both regular → non-cancer. Irregular MV and/or irregular MS → early gastric cancer (EGC).',
          options: {
            regular: 'Both regular',
            irregular: 'Irregular MV and/or MS',
          },
        },
      },
      map: {
        start: 'Suspicious lesion',
        'dl-gate': 'DL',
        absent: 'Absent',
        present: 'Present',
        'noncancer-dl': 'Non-cancer',
        'mvms-gate': 'IMVP and/or IMSP',
        regular: 'Absent',
        irregular: 'Present',
        'noncancer-regular': 'Non-cancer',
        egc: 'EGC',
      },
    },
  },
  kyoto: {
    name: 'Kyoto classification risk score (original 0–8)',
    shortName: 'Kyoto',
    description:
      'Five findings — atrophy, intestinal metaplasia, enlarged folds, nodularity, and diffuse redness (0–8). Shichijo 2017 found atrophy independently predictive; Kawamura 2021 proposed a modified score because the original model was underpowered in multivariable analysis.',
    fields: {
      atrophy: {
        label: 'Atrophy (Kimura–Takemoto)',
        options: [
          { label: 'C-0 / C-1', description: pts(0, false) },
          { label: 'C-2 / C-3', description: pts(1) },
          { label: 'O-1 / O-2 / O-3', description: pts(2) },
        ],
      },
      im: {
        label: 'Intestinal metaplasia (WLI)',
        description: 'Gray-white flat elevation. Corpus involvement scores 2',
        options: [
          { label: 'Absent', description: pts(0, false) },
          { label: 'Antrum', description: pts(1) },
          { label: 'Corpus', description: pts(2) },
        ],
      },
      fold: {
        label: 'Enlarged folds',
        description: 'Corpus fold width ≥5 mm',
        options: [
          { label: '<5 mm', description: pts(0, false) },
          { label: '≥5 mm', description: pts(1) },
        ],
      },
      nodularity: {
        label: 'Nodularity',
        description: 'Fine granular elevations in the antrum',
        options: [
          { label: 'Absent', description: pts(0, false) },
          { label: 'Present', description: pts(1) },
        ],
      },
      redness: {
        label: 'Diffuse redness',
        description: 'Uniform redness of the corpus mucosa',
        options: [
          { label: 'Absent', description: pts(0, false) },
          { label: 'Mild', description: pts(1) },
          { label: 'Severe', description: pts(2) },
        ],
      },
    },
  },
  'kyoto-modified': {
    name: 'Modified Kyoto classification risk score (0–5)',
    shortName: 'Kyoto-mod',
    description:
      'Kawamura 2021 modification. Invisible RAC 2 points; open-type atrophy, corpus IEE IM >30%, and corpus map-like redness 1 point each.',
    fields: {
      rac: {
        label: 'Angular RAC',
        description: 'Regular arrangement of collecting venules',
        options: [
          { label: 'Visible', description: pts(0, false) },
          { label: 'Invisible', description: pts(2) },
        ],
      },
      openAtrophy: {
        label: 'Open-type atrophy',
        description: 'Kimura–Takemoto O-1–O-3',
        options: [
          { label: 'Closed (C-0–C-3)', description: pts(0, false) },
          { label: 'Open (O-1–O-3)', description: pts(1) },
        ],
      },
      corpusIm: {
        label: 'Corpus IEE IM >30%',
        description: 'LBC / WOS / villous pattern',
        options: [
          { label: 'None / antrum only', description: pts(0, false) },
          { label: 'Corpus >30%', description: pts(1) },
        ],
      },
      mapRedness: {
        label: 'Map-like redness',
        description: 'Only corpus map-like redness is scored',
        options: [
          { label: 'None / antrum only', description: pts(0, false) },
          { label: 'Present in corpus', description: pts(1) },
        ],
      },
    },
  },
  eggim: {
    name: 'EGGIM (endoscopic IM score)',
    description:
      'Scores intestinal metaplasia in 4 antrum/corpus lesser- and greater-curvature areas on IEE (0–8). 5–8 is high risk (Kawamura 2021). No biopsy required.',
    fields: {
      antrumLesser: {
        label: 'Antrum, lesser curvature',
        options: [
          { label: 'None', description: pts(0, false) },
          { label: 'Focal ≤30%', description: pts(1) },
          { label: 'Extensive >30%', description: pts(2) },
        ],
      },
      antrumGreater: {
        label: 'Antrum, greater curvature',
        options: [
          { label: 'None', description: pts(0, false) },
          { label: 'Focal ≤30%', description: pts(1) },
          { label: 'Extensive >30%', description: pts(2) },
        ],
      },
      corpusLesser: {
        label: 'Corpus, lesser curvature',
        options: [
          { label: 'None', description: pts(0, false) },
          { label: 'Focal ≤30%', description: pts(1) },
          { label: 'Extensive >30%', description: pts(2) },
        ],
      },
      corpusGreater: {
        label: 'Corpus, greater curvature',
        options: [
          { label: 'None', description: pts(0, false) },
          { label: 'Focal ≤30%', description: pts(1) },
          { label: 'Extensive >30%', description: pts(2) },
        ],
      },
    },
  },
  'ecura-hatta': {
    name: 'eCura scoring system (early gastric cancer LNM)',
    description:
      'Scores lymph-node metastasis risk after non-curative resection of early gastric cancer. Shows the LNM rate for each score 0–7 as well as the low / intermediate / high-risk groups.',
    fields: {
      ly: {
        label: 'Lymphatic invasion Ly',
        options: [
          { label: 'Ly0', description: pts(0, false) },
          { label: 'Ly1', description: pts(3) },
        ],
      },
      size: {
        label: 'Maximum tumor size',
        options: [
          { label: '≤30 mm', description: pts(0, false) },
          { label: '>30 mm', description: pts(1) },
        ],
      },
      vm: {
        label: 'Vertical margin VM',
        options: [
          { label: 'VM0', description: pts(0, false) },
          { label: 'VM1', description: pts(1) },
        ],
      },
      v: {
        label: 'Venous invasion V',
        options: [
          { label: 'V0', description: pts(0, false) },
          { label: 'V1', description: pts(1) },
        ],
      },
      sm: {
        label: 'SM invasion depth',
        options: [
          { label: 'SM1 <500 μm', description: pts(0, false) },
          { label: 'SM2 ≥500 μm', description: pts(1) },
        ],
      },
    },
  },
  sekiguchi: {
    name: 'Sekiguchi score (early gastric cancer LNM, 11 points)',
    description: 'Stratifies early gastric cancer LNM on an 11-point scale. Separates mixed histology.',
    fields: {
      size: {
        label: 'Tumor size',
        options: [
          { label: '≤2 cm', description: pts(0, false) },
          { label: '>2–≤3 cm', description: pts(1) },
          { label: '>3 cm', description: pts(2) },
        ],
      },
      depth: {
        label: 'Depth',
        description: 'SM1 is scored 0, same as mucosa',
        options: [
          { label: 'M / SM1', description: '0 points (SM1 <500 μm)' },
          { label: 'SM2', description: '+2 points (≥500 μm)' },
        ],
      },
      histology: {
        label: 'Histology',
        description: 'Differentiated = tub1/tub2/pap; undifferentiated = por/sig/muc',
        options: [
          { label: 'Pure differentiated', description: pts(0, false) },
          { label: 'Pure undifferentiated', description: pts(1) },
          { label: 'Mixed, differentiated-predominant', description: pts(1) },
          { label: 'Mixed, undifferentiated-predominant', description: pts(2) },
        ],
      },
      ulcer: {
        label: 'Ulcer UL',
        options: [
          { label: 'Absent', description: pts(0, false) },
          { label: 'Present', description: pts(1) },
        ],
      },
      lvi: {
        label: 'Lymphovascular invasion',
        description: 'Strongest factor (+4)',
        options: [
          { label: 'Absent', description: pts(0, false) },
          { label: 'Present', description: pts(4) },
        ],
      },
    },
  },
  'best-j': {
    name: 'BEST-J score (post-ESD bleeding, early gastric cancer)',
    description: 'Bleeding after ESD Trend from Japan. Predicts delayed bleeding after ESD for early gastric cancer.',
    fields: {
      warfarin: {
        label: 'Warfarin',
        description: 'Antithrombotic (none / continued / withdrawn)',
        options: [
          { label: 'None', description: pts(0, false) },
          { label: 'Continued', description: pts(4, false) },
          { label: 'Withdrawn', description: pts(3, false) },
        ],
      },
      doac: {
        label: 'DOAC',
        options: [
          { label: 'None', description: pts(0, false) },
          { label: 'Continued', description: pts(4, false) },
          { label: 'Withdrawn', description: pts(3, false) },
        ],
      },
      p2y12: {
        label: 'P2Y12 inhibitor',
        options: [
          { label: 'None', description: pts(0, false) },
          { label: 'Continued', description: pts(2, false) },
          { label: 'Withdrawn', description: pts(1, false) },
        ],
      },
      aspirin: {
        label: 'Aspirin',
        options: [
          { label: 'None', description: pts(0, false) },
          { label: 'Continued', description: pts(2, false) },
          { label: 'Withdrawn', description: pts(1, false) },
        ],
      },
      cilostazol: {
        label: 'Cilostazol',
        options: [
          { label: 'None', description: pts(0, false) },
          { label: 'Continued', description: pts(1, false) },
          { label: 'Withdrawn', description: pts(0, false) },
        ],
      },
      dialysis: {
        label: 'Dialysis CKD',
        options: [
          { label: 'No', description: pts(0, false) },
          { label: 'Yes', description: pts(3) },
        ],
      },
      tumorSize: {
        label: 'Tumor >30 mm',
        options: [
          { label: 'No', description: pts(0, false) },
          { label: 'Yes', description: pts(1) },
        ],
      },
      lowerThird: {
        label: 'Lower third of stomach',
        options: [
          { label: 'No', description: pts(0, false) },
          { label: 'Yes', description: pts(1) },
        ],
      },
      multiple: {
        label: 'Multiple lesions',
        options: [
          { label: 'No', description: pts(0, false) },
          { label: 'Yes', description: pts(1) },
        ],
      },
    },
  },
  spigelman: {
    name: 'Spigelman classification (FAP duodenal adenomas)',
    shortName: 'Spigelman',
    description:
      'Stages duodenal adenomas in familial adenomatous polyposis (FAP) by number, max size, histology, and dysplasia (0–12 points, Stage 0–IV). 1989 original (mild / moderate / severe). Use Modified Spigelman for Vienna LGD/HGD.',
    note: 'Surveillance intervals follow ESGE 2019 polyposis (van Leerdam). Assess the papilla separately. Current pathology often uses Vienna (LGD/HGD) — see Modified Spigelman.',
    figureNotes: [
      'The 1989 Lancet original is not CC. Link opens GeneReviews Table 5 (public summary of the points table).',
    ],
    fields: {
      number: {
        label: 'Polyp number',
        options: [
          { label: '0', description: pts(0, false) },
          { label: '1–4', description: pts(1) },
          { label: '5–20', description: pts(2) },
          { label: '>20', description: pts(3) },
        ],
      },
      size: {
        label: 'Largest size',
        options: [
          { label: 'None', description: pts(0, false) },
          { label: '1–4 mm', description: pts(1) },
          { label: '5–10 mm', description: pts(2) },
          { label: '>10 mm', description: pts(3) },
        ],
      },
      histology: {
        label: 'Histology',
        options: [
          { label: 'No adenoma', description: pts(0, false) },
          { label: 'Tubular', description: pts(1) },
          { label: 'Tubulovillous', description: pts(2) },
          { label: 'Villous', description: pts(3) },
        ],
      },
      dysplasia: {
        label: 'Dysplasia (1989)',
        description: 'Mild / moderate / severe. For Vienna LGD/HGD use Modified Spigelman',
        options: [
          { label: 'None', description: pts(0, false) },
          { label: 'Mild', description: pts(1) },
          { label: 'Moderate', description: pts(2) },
          { label: 'Severe', description: pts(3) },
        ],
      },
    },
  },
  'modified-spigelman': {
    name: 'Modified Spigelman (FAP duodenal adenomas)',
    shortName: 'Mod. Spigelman',
    description:
      'Saurin 2004 adaptation of Spigelman 1989 to the Vienna classification. Number, size, and histology are unchanged. Dysplasia is LGD = 1 point, HGD = 3 points (no 2-point moderate).',
    note: 'Many centers after ESGE 2019 use this two-tier dysplasia score. The 1989 three-tier original is on the Spigelman page. Assess the papilla separately.',
    figureNotes: ['Saurin 2004 JCO original. ASCO copyright; not CC — link to the paper.'],
    fields: {
      number: {
        label: 'Polyp number',
        options: [
          { label: '0', description: pts(0, false) },
          { label: '1–4', description: pts(1) },
          { label: '5–20', description: pts(2) },
          { label: '>20', description: pts(3) },
        ],
      },
      size: {
        label: 'Largest size',
        options: [
          { label: 'None', description: pts(0, false) },
          { label: '1–4 mm', description: pts(1) },
          { label: '5–10 mm', description: pts(2) },
          { label: '>10 mm', description: pts(3) },
        ],
      },
      histology: {
        label: 'Histology',
        options: [
          { label: 'No adenoma', description: pts(0, false) },
          { label: 'Tubular', description: pts(1) },
          { label: 'Tubulovillous', description: pts(2) },
          { label: 'Villous', description: pts(3) },
        ],
      },
      dysplasia: {
        label: 'Dysplasia (Vienna)',
        description: 'LGD 1 point, HGD 3 points. No 2-point moderate grade',
        options: [
          { label: 'None', description: pts(0, false) },
          { label: 'LGD', description: pts(1) },
          { label: 'HGD', description: pts(3) },
        ],
      },
    },
  },
  ishii: {
    name: 'Ishii score (SNADET C3 vs C4/5)',
    shortName: 'Ishii',
    description:
      '0–5 points to separate Vienna C3 (LGA) from C4/5 (HGA/cancer) in SNADET. Color and size on WLI; surface and vessels on magnifying NBI. ≥3 points suggests C4/5.',
    note: 'Separate from the Kakushima WLI-only score. Single-center retrospective derivation. For optical diagnosis before biopsy.',
    figureNotes: ['Original paper. Wiley / Digestive Endoscopy copyright; not CC — link to the paper.'],
    fields: {
      color: {
        label: 'Color (WLI)',
        options: [
          { label: 'White / isochromatic', description: pts(0, false) },
          { label: 'Red', description: pts(1) },
        ],
      },
      size: {
        label: 'Tumor size',
        options: [
          { label: '<10 mm', description: pts(0, false) },
          { label: '10–19 mm', description: pts(1) },
          { label: '≥20 mm', description: pts(2) },
        ],
      },
      surface: {
        label: 'Irregular surface (ME-NBI)',
        options: [
          { label: 'Absent', description: pts(0, false) },
          { label: 'Present', description: pts(1) },
        ],
      },
      vessels: {
        label: 'Irregular vessels (ME-NBI)',
        options: [
          { label: 'Absent', description: pts(0, false) },
          { label: 'Present', description: pts(1) },
        ],
      },
    },
  },
  kakushima: {
    name: 'Kakushima WLI score (SNADET LGA vs HGA/cancer)',
    shortName: 'Kakushima WLI',
    description:
      '0–5 points using white-light imaging (± indigo carmine) only to separate Vienna C3 from C4 or higher in SNADET. Size, color, morphology, nodularity. ≥3 points suggests C4 or higher. Separate from Ishii (which adds ME-NBI).',
    note: 'If mixed colors, take the higher points. Biopsy-induced redness or depression can inflate the score. Validation accuracy 86%.',
    figureNotes: [
      'Endosc Int Open Table 2. License: CC BY-NC-ND 4.0. HTML table — link opens Table 2, not an embedded image.',
    ],
    fields: {
      diameter: {
        label: 'Tumor size',
        options: [
          { label: '<10 mm', description: pts(0, false) },
          { label: '≥10 mm', description: pts(1) },
        ],
      },
      color: {
        label: 'Color',
        description: 'If mixed, use the higher score',
        options: [
          { label: 'White', description: pts(0, false) },
          { label: 'Isochromatic', description: pts(1) },
          { label: 'Red', description: pts(2) },
        ],
      },
      macro: {
        label: 'Macroscopic type',
        options: [
          { label: 'Is / Ip / IIa (no depression)', description: pts(0, false) },
          { label: 'Any type with depression or mixed', description: pts(1) },
        ],
      },
      nodularity: {
        label: 'Nodularity',
        options: [
          { label: 'Uniform', description: pts(0, false) },
          { label: 'Heterogeneous or none', description: pts(1) },
        ],
      },
    },
  },
  toya: {
    name: 'Toya classification (SNADET, ME-CV)',
    shortName: 'Toya ME-CV',
    description:
      'ME-CV algorithm (Toya 2020) for SNADET. Monotype vs mixed surface, then pinecone / irregular / monotonous, to separate Vienna C3 from C4/5. ME-NBI algorithm is Kikuchi 2014.',
    note: 'Toya’s published algorithm is crystal-violet magnifying endoscopy (ME-CV), not NBI. Kikuchi 2014 is the ME-NBI algorithm. Duodenal WOS often hides vessels, so surface pattern is prioritized.',
    groups: {
      表面: 'Surface',
      判定: 'Diagnosis',
    },
    comments: {
      'Mixed type': 'Multiple surface patterns → C4/5.',
      Pinecone: 'Pinecone monotype is C4/5 even when single.',
      Monotonous: 'Regular single pattern other than pinecone → C3.',
    },
    figureNotes: [
      'Toya 2020 ME-CV original. Wiley / Digestive Endoscopy copyright; not CC — link to the paper.',
      'Kikuchi 2014 ME-NBI algorithm. Mixed type and unclassified vessels → C4/5. Not CC — link to the paper.',
    ],
    flow: {
      title: 'Algorithm',
      steps: {
        type: {
          prompt: 'Is the surface pattern single or multiple?',
          hint: 'ME-CV. Single = monotype. Multiple = mixed / multiplicity.',
          options: { mixed: 'Multiple (mixed)', mono: 'Single (monotype)' },
        },
        pattern: {
          prompt: 'Which monotype pattern?',
          hint: 'Pinecone or irregular → C4/5. Other regular monotype (convoluted / leaf-like / reticular) → C3.',
          options: { pinecone: 'Pinecone', irregular: 'Irregular', monotonous: 'Monotonous (regular)' },
        },
      },
      map: {
        start: 'SNADET · ME-CV',
        'type-gate': 'Surface type',
        mixed: 'Mixed',
        'c45-mixed': 'C4/5',
        mono: 'Monotype',
        'pattern-gate': 'Pattern',
        'pine-opt': 'Pinecone',
        'c45-pine': 'C4/5',
        'irr-opt': 'Irregular',
        'c45-irr': 'C4/5',
        'mono-opt': 'Monotonous',
        c3: 'C3',
      },
    },
  },
  sps: {
    name: 'SPS diagnostic criteria (serrated polyposis syndrome)',
    shortName: 'SPS',
    description:
      'WHO 2019 diagnostic criteria for serrated polyposis syndrome (formerly hyperplastic polyposis). Includes 2010 criteria for reference, counting rules, and surveillance pointers. Separate from the WASP SSL morphology classification.',
    groups: {
      'WHO 2019': 'WHO 2019',
      'WHO 2010': 'WHO 2010',
      'Serrated polyp types': 'Serrated polyp types',
      Application: 'Application',
    },
    comments: {
      'Criterion I':
        'Expanded from 2010 Type 1: now proximal to the rectum (includes sigmoid); all qualifying polyps must be ≥5 mm. Proximal-predominant phenotype.',
      'Criterion II':
        'Corresponds to 2010 Type 3 with an added requirement of ≥5 polyps proximal to the rectum. Pancolonic phenotype.',
      'Type 2': 'Removed in WHO 2019. Family history is handled in genetic-counseling context.',
      'Type 1': '2019 Criterion I predecessor. Kept for reference when reading older literature.',
      'Type 3': '2019 Criterion II adds ≥5 proximal polyps to the 2010 Type 3 definition.',
      SSL: 'WHO 2019 term is SSL; pathology and endoscopy reports may still use SSA/P.',
      'Counting rules': 'Cumulative over a lifetime and multiple procedures. Conventional adenomas do not count.',
      Surveillance: 'Follow ESGE 2019 polyposis and US MSTF 2020 (Gupta GIE 2020); use local protocols.',
    },
    figureNotes: [
      'McWhinney 2023 Table 1 (2010 vs 2019). Thieme Endoscopy International Open. License: CC BY-NC-ND 4.0. The table is HTML — link opens Table 1, not an embedded image.',
      'Dekker 2020 Gastroenterology commentary on WHO 2019. Elsevier copyright; not CC — link to the paper.',
    ],
    note: 'Either 2019 criterion suffices. The 2010 family-history criterion (Type 2) was removed. Proximal to the rectum = orad to rectosigmoid (2010 used proximal to sigmoid). See ESGE 2019 and US MSTF 2020 for surveillance.',
  },
  apcs: {
    name: 'Asia-Pacific Colorectal Screening Score (APCS)',
    description:
      'Stratifies asymptomatic Asian adults for advanced colorectal neoplasia (advanced adenoma or cancer) by age, sex, family history, and smoking (0–7).',
    fields: {
      age: {
        label: 'Age',
        options: [
          { label: '<50 y', description: pts(0, false) },
          { label: '50–69 y', description: pts(2) },
          { label: '≥70 y', description: pts(3) },
        ],
      },
      sex: {
        label: 'Sex',
        options: [
          { label: 'Female', description: pts(0, false) },
          { label: 'Male', description: pts(1) },
        ],
      },
      family: {
        label: 'Family history of CRC',
        description: 'First-degree relatives only (parents, siblings, children)',
        options: [
          { label: 'No', description: pts(0, false) },
          { label: 'Yes', description: pts(2) },
        ],
      },
      smoking: {
        label: 'Smoking',
        description: 'Current or former. Original “current” is ≥1 pack/week',
        options: [
          { label: 'Never', description: pts(0, false) },
          { label: 'Current or former', description: pts(1) },
        ],
      },
    },
  },
  vienna: {
    name: 'Vienna classification (GI epithelial neoplasia)',
    shortName: 'Vienna',
    description:
      'International pathological classification of epithelial neoplasia in the esophagus, stomach, and colorectum (2000). Bridges Western (invasion-first) and Japanese (cytology-first) terminology. SNADET papers use revised Vienna C3 / C4 / C5.',
    note: 'The 2002 revision moves intramucosal carcinoma to 4.4 and limits Category 5 to submucosal or deeper. SNADET C4 often includes HGA plus intramucosal carcinoma; C5 is SM or deeper.',
    groups: {
      非腫瘍: 'Non-neoplastic',
      腫瘍: 'Neoplastic',
    },
    comments: {
      'Category 4': 'Revised Vienna 4.4 is intramucosal carcinoma. SNADET C4 usually includes this.',
      'Category 5': 'The 2000 original also put intramucosal carcinoma in Category 5. After revision, Category 5 is SM or deeper only.',
    },
    figureNotes: ['Original 2000 Gut paper. BMJ copyright; not CC — link to the paper.'],
  },
  paris: {
    name: 'Paris classification (superficial morphology)',
    description:
      'Endoscopic Type 0 morphology of superficial neoplasia (mucosa to submucosa) in the esophagus, stomach, and colorectum: protruding (0-I), flat (0-II), and excavated (0-III). 0-Isp is not in the 2003/2005 Paris table.',
    groups: {
      隆起型: 'Protruding',
      平坦型: 'Nonprotruding',
      潰瘍型: 'Excavated',
    },
    comments: {
      '0-Is': 'Sessile colorectal lesions have a relatively high SM-invasion rate (2005 Table 4: 34% for colorectal 0-Is).',
      '0-IIb': 'Very rare in the colorectum.',
      '0-IIc': 'Depressed lesions have a high SM-invasion risk (2005 Table 4: 61% for colorectal 0-IIc).',
      '0-III': 'Almost never seen in the colorectum.',
    },
    figureNotes: [
      '0-Isp in the figure is Japanese / later. The 2003/2005 Paris table lists 0-Ip and 0-Is. Figure from Clin Endosc 2025 Fig. 2 (CC BY-NC 4.0). Johnson 2023 Can J Surg is CC BY-NC-ND 4.0. The 2003/2005 originals are not CC.',
    ],
  },
  lst: {
    name: 'LST classification (laterally spreading tumor)',
    description:
      'Colorectal laterally spreading tumors: nonpolypoid lesions ≥10 mm that spread along the wall. Four subtypes — granular (homogeneous / mixed nodular) and nongranular (flat elevated / pseudodepressed). Separate from the Paris classification.',
    groups: {
      顆粒型: 'Granular',
      非顆粒型: 'Nongranular',
    },
    comments: {
      'LST-G homogeneous':
        'Deep SM invasion is low. The 0.5% (CI 0.1–1.0%) on the figure is from the Bogie 2018 meta-analysis.',
      'LST-G mixed nodular':
        'Invasion often sits in the large nodule. The 10.5% (CI 5.9–15.1%) on the figure is from Bogie 2018.',
      'LST-NG flat elevated': 'The 4.9% (CI 2.1–7.8%) on the figure is from Bogie 2018.',
      'LST-NG pseudodepressed':
        'Highest invasion risk of the four subtypes. The 31.6% (CI 19.8–43.4%) on the figure is from Bogie 2018. Consider en-bloc resection.',
    },
    figureNotes: [
      'Four LST subtypes and deep-SMI rates (Bogie 2018 meta-analysis). Figure from Clin Endosc 2025 Fig. 3 (CC BY-NC 4.0). Castillo-Regalado 2022 WJGE is CC BY-NC 4.0. The Kudo 2008 GIE original is not CC.',
    ],
  },
  'esd-fibrosis': {
    name: 'ESD submucosal fibrosis classification (F0–F2)',
    shortName: 'ESD-F',
    description:
      'Intraoperative grading of submucosal fibrosis during colorectal ESD after indigo carmine submucosal injection (F0 / F1 / F2). Separate from pit pattern, NICE, and JNET.',
    groups: {
      判定: 'Assessment',
    },
    comments: {
      F2: 'Hook knife and ST hood are often useful. Consider an experienced endoscopist or surgical resection given incomplete resection and additional-surgery risk.',
    },
    figureNotes: [
      'Original Fig. 1. Intest Res copyright; not CC, so the figure is not hosted. Link opens Fig. 1 in the paper. The colorectal F classification was first described by Matsumoto 2010 (Scand J Gastroenterol).',
    ],
    note: 'Graded during ESD after indigo carmine submucosal injection. Preoperative EUS-F0/F1/F2 is a separate system. The same F definitions are used in gastric ESD, but this page focuses on colorectal ESD. JGES colorectal ESD guidelines list biopsy- or prolapse-related fibrosis as an indication but do not define F0–F2 in the guideline text.',
  },
  'kudo-tsuruta': {
    name: 'Kudo–Tsuruta classification (pit pattern)',
    description: 'Chromoendoscopic pit-pattern classification of colorectal neoplasia (I / II / IIIs / IIIL / IV / VI / VN).',
    groups: {
      非腫瘍: 'Non-neoplastic',
      腺腫: 'Adenoma',
      癌: 'Carcinoma',
    },
    figureNotes: [
      'Types I–VN. Tanaka 2004 Dig Endosc original is not CC, so the figure is not hosted. Link opens Clin Endosc 2025 Fig. 4 (permission reprint).',
    ],
  },
  'colorectal-ec': {
    name: 'Colorectal EC classification (endocytoscopy)',
    shortName: 'EC',
    description:
      'Ultra-magnifying endocytoscopy (EC) of colorectal lesions: EC1a–EC3b after methylene blue staining (crypt and nuclear pattern), and EC-V1–V3 with EC-NBI (surface microvessels). Separate from pit pattern, NICE, and JNET.',
    groups: {
      'EC（染色）': 'EC (stained)',
      'EC-V（EC-NBI）': 'EC-V (EC-NBI)',
      Method: 'Method',
    },
    comments: {
      EC1b: 'EC1b is a key discriminator between non-neoplastic (hyperplastic) and neoplastic lesions.',
      EC2: 'Dysplasias are mainly EC2; depth is assessed with EC3 subtypes.',
      EC3a: 'SMs = slightly invasive submucosal cancer (low nodal risk in Kudo SM classification).',
      EC3b: 'SMm or deeper. Fine granular structures may reflect exposed desmoplastic reaction.',
      'EC-V3': 'Predicts invasive cancer including SMm; faster workflow than methylene blue EC.',
      Observation: 'GIF-H290EC / CF-H290ECI integrated scopes. Often combined with pit pattern and JNET for depth.',
    },
    figureNotes: [
      'Clin Endosc 2021 Fig. 2 (CC BY-NC 3.0). Kudo 2011 Endoscopy original is not CC.',
      'Clin Endosc 2021 Fig. 3 (CC BY-NC 3.0). Kudo 2015 GIE EC-V original is not CC.',
    ],
    note: 'EC uses methylene blue (or crystal violet double stain). EC-V uses EC-NBI without dye. EndoBRAIN is a separate AI decision-support device (PMDA-approved).',
  },
  nice: {
    name: 'NICE classification (colorectal NBI, non-magnifying)',
    description:
      'NBI classification of colorectal tumors (Type 1 / 2 / 3). Used with or without optical magnification. Separate from JNET (magnifying 1 / 2A / 2B / 3). Does not include SSA/P.',
    comments: {
      'Type 1': 'SSA/P is not included in this classification (a limitation of the original paper).',
      'Type 3': 'Deep SM invasion is ≥1000 μm. Consider additional surgery.',
    },
    figureNotes: [
      'Original Fig. 1. Elsevier / GIE copyright; not CC, so the figure is not hosted. Link opens the publisher Fig. 1 image. Used without magnification. Separate from JNET.',
    ],
  },
  wasp: {
    name: 'WASP classification (HP / SSL / adenoma)',
    shortName: 'WASP',
    description:
      'Separates hyperplastic polyps, SSL, and adenomas <10 mm by NICE first, then Hazewinkel SSL features. Separate from both NICE and JNET.',
    groups: {
      手順: 'Steps',
      判定: 'Diagnosis',
    },
    comments: {
      'Step 1 · NICE':
        'A separate classification from NICE itself. It addresses the limitation that NICE Type 1 does not include SSL.',
    },
    figureNotes: [
      'Original Fig. 1. BMJ / Gut copyright; not CC, so the figure is not hosted. Link opens Fig. 1 in the paper. Separate from both NICE and JNET.',
    ],
    flow: {
      title: 'Algorithm',
      steps: {
        nice: {
          prompt: 'Is this NICE Type 1 or Type 2?',
          hint: 'Type 2 features: (1) darker than the surrounding mucosa, (2) prominent brown vessels, or (3) an oval, tubular, or branched surface pattern. Any of these → Type 2. None → Type 1.',
          options: { type1: 'Type 1', type2: 'Type 2' },
        },
        ssl1: {
          prompt: 'How many Hazewinkel SSL features are present?',
          hint: '(1) clouded surface, (2) indistinctive borders, (3) irregular shape, (4) dark spots inside the crypts. Two or more → SSA/P.',
          options: { lt2: '<2 features', gte2: '≥2 features' },
        },
        ssl2: {
          prompt: 'How many Hazewinkel SSL features are present?',
          hint: '(1) clouded surface, (2) indistinctive borders, (3) irregular shape, (4) dark spots inside the crypts. Two or more → SSA/P.',
          options: { lt2: '<2 features', gte2: '≥2 features' },
        },
      },
      map: {
        start: 'Polyp <10 mm',
        'nice-gate': 'NICE',
        type1: 'Type 1',
        type2: 'Type 2',
        'ssl-1': 'SSA/P-like features',
        'ssl-2': 'SSA/P-like features',
        'hp-opt': '<2',
        'ssap1-opt': '≥2',
        'adenoma-opt': '<2',
        'ssap2-opt': '≥2',
        hp: 'Hyperplastic polyp',
        ssap1: 'SSA/P',
        adenoma: 'Adenoma',
        ssap2: 'SSA/P',
      },
    },
  },
  jnet: {
    name: 'JNET classification (colorectal NBI magnifying)',
    description: 'NBI magnifying classification of colorectal tumors (Type 1 / 2A / 2B / 3).',
    figureNotes: [
      'Original Fig. 7. Wiley / JGES standard copyright; not CC, so the figure is not hosted. Link opens Fig. 7 in the paper.',
    ],
  },
  'kajiwara-nomogram': {
    name: 'Colorectal T1 LNM nomogram (Kajiwara / JSCCR)',
    description:
      'Predicts lymph-node metastasis (LNM) probability after endoscopic treatment of colorectal T1 cancer. Six-factor multivariable logistic model from Kajiwara 2023 (GIE; derivation n=3080). Total points treat SM ≥2000 μm as 100 on the nomogram scale.',
    officialLinkLabel: 'Official calculator (JSCCR)',
    note: 'Values may differ slightly from the official site. GI Calc uses the published figures — the actual β coefficients — from the paper.',
    figureNotes: [
      'Original Fig. 2. Elsevier / GIE copyright; not CC, so the figure is not hosted. Link opens the publisher Fig. 2 image.',
    ],
    fields: {
      sex: {
        label: 'Sex',
        options: [
          { label: 'Male', description: nomogramPts(NOMOGRAM_ITEM_POINTS.sexMale) },
          { label: 'Female', description: nomogramPts(NOMOGRAM_ITEM_POINTS.sexFemale) },
        ],
      },
      location: {
        label: 'Tumor location',
        description: 'Cecum to lower rectum. Sites with the same points share a coefficient.',
        options: [
          { label: 'C', description: nomogramPts(NOMOGRAM_ITEM_POINTS.locationAcD, 'Cecum') },
          { label: 'A', description: nomogramPts(NOMOGRAM_ITEM_POINTS.locationAcD, 'Ascending colon') },
          { label: 'T', description: nomogramPts(NOMOGRAM_ITEM_POINTS.locationT, 'Transverse colon') },
          { label: 'D', description: nomogramPts(NOMOGRAM_ITEM_POINTS.locationAcD, 'Descending colon') },
          { label: 'S', description: nomogramPts(NOMOGRAM_ITEM_POINTS.locationSRb, 'Sigmoid colon') },
          { label: 'RS', description: nomogramPts(NOMOGRAM_ITEM_POINTS.locationRsRa, 'Rectosigmoid') },
          { label: 'Ra', description: nomogramPts(NOMOGRAM_ITEM_POINTS.locationRsRa, 'Upper rectum') },
          { label: 'Rb', description: nomogramPts(NOMOGRAM_ITEM_POINTS.locationSRb, 'Lower rectum') },
        ],
      },
      grade: {
        label: 'Histology',
        description:
          'Predominant type. G1 = papillary / well-differentiated tubular; G2 = moderately differentiated; G3 = poorly differentiated, mucinous, or signet-ring',
        options: [
          {
            label: 'G1',
            description: nomogramPts(NOMOGRAM_ITEM_POINTS.gradeG1, 'Papillary or well-differentiated tubular adenocarcinoma'),
          },
          {
            label: 'G2',
            description: nomogramPts(NOMOGRAM_ITEM_POINTS.gradeG2, 'Moderately differentiated tubular adenocarcinoma'),
          },
          {
            label: 'G3',
            description: nomogramPts(
              NOMOGRAM_ITEM_POINTS.gradeG3,
              'Poorly differentiated, mucinous, or signet-ring cell carcinoma',
            ),
          },
        ],
      },
      lvi: {
        label: 'Lymphovascular invasion',
        description: 'Lymphatic or venous invasion',
        options: [
          { label: 'Absent', description: nomogramPts(NOMOGRAM_ITEM_POINTS.lviNegative) },
          { label: 'Present', description: nomogramPts(NOMOGRAM_ITEM_POINTS.lviPositive) },
        ],
      },
      smDepth: {
        label: 'SM invasion depth',
        description: 'JSCCR absolute measurement from the MM, or from the head/stalk border if pedunculated',
        options: [
          { label: '<1000 μm', description: nomogramPts(NOMOGRAM_ITEM_POINTS.smLt1000) },
          { label: '1000–1999 μm', description: nomogramPts(NOMOGRAM_ITEM_POINTS.sm1000to1999) },
          { label: '≥2000 μm', description: nomogramPts(NOMOGRAM_ITEM_POINTS.sm2000plus) },
        ],
      },
      budding: {
        label: 'Tumor budding',
        description: '20× hotspot (0.785 mm²). The model uses the same coefficient for BD2 and BD3',
        options: [
          { label: 'BD1', description: nomogramPts(NOMOGRAM_ITEM_POINTS.buddingBd1, '<5 buds') },
          { label: 'BD2/3', description: nomogramPts(NOMOGRAM_ITEM_POINTS.buddingBd23, 'BD2: 5–9 buds; BD3: ≥10 buds') },
        ],
      },
    },
  },
  bbps: {
    name: 'Boston Bowel Preparation Scale (BBPS)',
    description:
      'Scores bowel preparation in 3 segments (0–3 each, total 0–9). Assign during withdrawal after washing and suction.',
    fields: {
      right: {
        label: 'Right colon',
        description: 'Cecum and ascending colon',
        options: [
          { label: '0', description: 'Solid stool; mucosa not seen' },
          { label: '1', description: 'Only part of the mucosa seen; residue or opaque fluid hides the rest' },
          { label: '2', description: 'Minor residue, fragments, or opaque fluid; mucosa seen well' },
          { label: '3', description: 'No residue. Entire segment mucosa seen' },
        ],
      },
      transverse: {
        label: 'Transverse colon',
        description: 'Includes hepatic and splenic flexures',
        options: [
          { label: '0', description: 'Solid stool; mucosa not seen' },
          { label: '1', description: 'Only part of the mucosa seen; residue or opaque fluid hides the rest' },
          { label: '2', description: 'Minor residue, fragments, or opaque fluid; mucosa seen well' },
          { label: '3', description: 'No residue. Entire segment mucosa seen' },
        ],
      },
      left: {
        label: 'Left colon',
        description: 'Descending colon, sigmoid, and rectum',
        options: [
          { label: '0', description: 'Solid stool; mucosa not seen' },
          { label: '1', description: 'Only part of the mucosa seen; residue or opaque fluid hides the rest' },
          { label: '2', description: 'Minor residue, fragments, or opaque fluid; mucosa seen well' },
          { label: '3', description: 'No residue. Entire segment mucosa seen' },
        ],
      },
    },
  },
  aronchick: {
    name: 'Aronchick scale (bowel preparation)',
    description: 'Rates whole-colon preparation in 5 grades before washing. No segmental scores.',
    fields: {
      grade: {
        label: 'Preparation grade',
        description: 'Score the entire colon before washing or suction',
        options: [
          { label: 'Excellent', description: 'Small amount of clear fluid. Mucosa >95%' },
          { label: 'Good', description: 'Larger volume of clear fluid. Mucosa >90%' },
          { label: 'Fair', description: 'Semisolid stool suctionable. Mucosa >90%' },
          { label: 'Poor', description: 'Not suctionable. Mucosa <90%' },
          { label: 'Inadequate', description: 'Repeat preparation required' },
        ],
      },
    },
  },
  forrest: {
    name: 'Forrest classification (peptic ulcer bleeding)',
    shortName: 'Forrest',
    description:
      'Endoscopic stigmata of peptic ulcer bleeding (Ia–III). Shared language for rebleeding risk and whether endoscopic therapy is needed.',
    groups: {
      活動性出血: 'Active hemorrhage',
      最近の出血兆候: 'Signs of recent hemorrhage',
      出血兆候なし: 'No stigmata',
    },
    comments: {
      Ia: 'Indication for endoscopic hemostasis.',
      Ib: 'Indication for endoscopic hemostasis.',
      IIa: 'Indication for endoscopic hemostasis.',
      IIc: 'IIc / III are usually observed without endoscopic therapy for the stigma itself.',
    },
    figureNotes: [
      'Zhou 2025 Fig. 1 (A Ia spurting, B Ib oozing, C IIa visible vessel, D IIb adherent clot, E IIc black base, F III clean base). J South Med Univ. License: CC BY-NC-ND 4.0. The Forrest 1974 Lancet original is not CC.',
    ],
  },
  gbs: {
    name: 'Glasgow-Blatchford Score (upper GI bleeding)',
    description: 'Predicts need for intervention (transfusion, endoscopy, or surgery) in upper GI bleeding.',
    fields: {
      sex: {
        label: 'Sex',
        description: 'Used for hemoglobin scoring (not a point itself)',
        options: [{ label: 'Male' }, { label: 'Female' }],
      },
      bun: {
        label: 'BUN',
        description: 'mg/dL (original mmol/L × 2.8)',
        options: [
          { label: '<18.2', description: pts(0, false) },
          { label: '18.2–22.3', description: pts(2) },
          { label: '22.4–27.9', description: pts(3) },
          { label: '28.0–69.9', description: pts(4) },
          { label: '≥70', description: pts(6) },
        ],
      },
      hb: {
        label: 'Hemoglobin',
        description: 'g/dL. 12.0–12.9 scores 1 in men only; 10.0–11.9 scores 3 in men / 1 in women',
        options: [
          { label: '≥13.0', description: pts(0, false) },
          { label: '12.0–12.9', description: 'Male +1 / female 0' },
          { label: '10.0–11.9', description: 'Male +3 / female +1' },
          { label: '<10.0', description: pts(6) },
        ],
      },
      sbp: {
        label: 'Systolic blood pressure',
        options: [
          { label: '≥110', description: pts(0, false) },
          { label: '100–109', description: pts(1) },
          { label: '90–99', description: pts(2) },
          { label: '<90', description: pts(3) },
        ],
      },
      pulse: {
        label: 'Pulse',
        options: [
          { label: '<100 /min', description: pts(0, false) },
          { label: '≥100 /min', description: pts(1) },
        ],
      },
      melena: {
        label: 'Melena',
        options: [
          { label: 'No', description: pts(0, false) },
          { label: 'Yes', description: pts(1) },
        ],
      },
      syncope: {
        label: 'Syncope',
        options: [
          { label: 'No', description: pts(0, false) },
          { label: 'Yes', description: pts(2) },
        ],
      },
      hepatic: {
        label: 'Liver disease',
        options: [
          { label: 'No', description: pts(0, false) },
          { label: 'Yes', description: pts(2) },
        ],
      },
      cardiac: {
        label: 'Heart failure',
        options: [
          { label: 'No', description: pts(0, false) },
          { label: 'Yes', description: pts(2) },
        ],
      },
    },
  },
  noblads: {
    name: 'NOBLADS score (acute lower GI bleeding)',
    description: 'Predicts severe acute lower GI bleeding (ongoing or recurrent). 1 point per factor.',
    fields: {
      nsaids: {
        label: 'NSAIDs',
        description: 'Nonselective NSAIDs or COX-2 inhibitors (past 2 weeks)',
        options: [
          { label: 'No', description: pts(0, false) },
          { label: 'Yes', description: pts(1) },
        ],
      },
      noDiarrhea: {
        label: 'No diarrhea',
        description: 'Diarrhea = >3 loose/watery stools a day. Absence of diarrhea is the risk',
        options: [
          { label: 'Diarrhea present', description: pts(0, false) },
          { label: 'No diarrhea', description: pts(1) },
        ],
      },
      noTenderness: {
        label: 'No abdominal tenderness',
        description: 'Absence of tenderness is the risk',
        options: [
          { label: 'Tenderness present', description: pts(0, false) },
          { label: 'No tenderness', description: pts(1) },
        ],
      },
      hypotension: {
        label: 'Systolic BP ≤100',
        options: [
          { label: '>100 mmHg', description: pts(0, false) },
          { label: '≤100 mmHg', description: pts(1) },
        ],
      },
      antiplatelet: {
        label: 'Non-aspirin antiplatelet',
        description: 'Clopidogrel, ticlopidine, cilostazol, etc. Do not include aspirin',
        options: [
          { label: 'No', description: pts(0, false) },
          { label: 'Yes', description: pts(1) },
        ],
      },
      albumin: {
        label: 'Albumin <3.0 g/dL',
        options: [
          { label: '≥3.0', description: pts(0, false) },
          { label: '<3.0', description: pts(1) },
        ],
      },
      charlson: {
        label: 'Charlson comorbidity ≥2',
        options: [
          { label: '0–1', description: pts(0, false) },
          { label: '≥2', description: pts(1) },
        ],
      },
      syncope: {
        label: 'Syncope',
        description: 'Transient altered consciousness (GCS ≤14) or prior syncope',
        options: [
          { label: 'No', description: pts(0, false) },
          { label: 'Yes', description: pts(1) },
        ],
      },
    },
  },
};
