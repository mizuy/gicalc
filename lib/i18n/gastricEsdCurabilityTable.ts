import type { Locale } from './types';

export type GastricEsdCurabilityGradeCell = {
  grade: string;
  pattern?: string;
};

export type GastricEsdCurabilityColKey = 'diff-le3' | 'diff-gt3' | 'undiff-le2' | 'undiff-gt2';

export type GastricEsdCurabilityUnifiedRow = {
  rowKey: string;
  depthLabel?: string;
  depthRowSpan?: number;
  ulcerLabel?: string;
  diffMergeSizeCols?: boolean;
  diffCells: [GastricEsdCurabilityGradeCell | null, GastricEsdCurabilityGradeCell | null];
  undiffCells: [GastricEsdCurabilityGradeCell | null, GastricEsdCurabilityGradeCell | null];
  diffColKeys: [GastricEsdCurabilityColKey, GastricEsdCurabilityColKey];
  undiffColKeys: [GastricEsdCurabilityColKey, GastricEsdCurabilityColKey];
};

export type GastricEsdCurabilityTableCopy = {
  title: string;
  subtitle: string;
  caption: string;
  footnoteStar: string;
  footnoteEcuraB: string;
  headers: {
    depth: string;
    ulcer: string;
    differentiated: string;
    undifferentiated: string;
    diffLe3: string;
    diffGt3: string;
    undiffLe2: string;
    undiffGt2: string;
  };
  rows: GastricEsdCurabilityUnifiedRow[];
  notes: {
    c1: string;
    c2: string;
    fig6UndiffSize: string;
    fig6UndiffSm: string;
  };
  inputSection: string;
  tableHint: string;
};

const A = (pattern?: string): GastricEsdCurabilityGradeCell => ({ grade: 'eCuraA', pattern });
const C2 = (): GastricEsdCurabilityGradeCell => ({ grade: 'eCuraC-2' });

const SHARED_ROWS: GastricEsdCurabilityUnifiedRow[] = [
  {
    rowKey: 'pt1a-ul0',
    depthLabel: 'pT1a (M)',
    depthRowSpan: 2,
    ulcerLabel: 'UL0',
    diffMergeSizeCols: true,
    diffCells: [A('(i)'), A('(i)')],
    undiffCells: [A('(ii)'), C2()],
    diffColKeys: ['diff-le3', 'diff-gt3'],
    undiffColKeys: ['undiff-le2', 'undiff-gt2'],
  },
  {
    rowKey: 'pt1a-ul1',
    depthLabel: 'pT1a (M)',
    ulcerLabel: 'UL1',
    diffCells: [A('(iii)'), C2()],
    undiffCells: [C2(), C2()],
    diffColKeys: ['diff-le3', 'diff-gt3'],
    undiffColKeys: ['undiff-le2', 'undiff-gt2'],
  },
  {
    rowKey: 'pt1b-sm1',
    depthLabel: 'pT1b1 (SM1)',
    ulcerLabel: '—',
    diffCells: [A('(iv)'), C2()],
    undiffCells: [C2(), C2()],
    diffColKeys: ['diff-le3', 'diff-gt3'],
    undiffColKeys: ['undiff-le2', 'undiff-gt2'],
  },
  {
    rowKey: 'pt1b-sm2',
    depthLabel: 'pT1b2 (SM2)',
    ulcerLabel: '—',
    diffCells: [C2(), C2()],
    undiffCells: [C2(), C2()],
    diffColKeys: ['diff-le3', 'diff-gt3'],
    undiffColKeys: ['undiff-le2', 'undiff-gt2'],
  },
];

export const GASTRIC_ESD_CURABILITY_TABLE: Record<Locale, GastricEsdCurabilityTableCopy> = {
  ja: {
    title: 'Fig. 2 腫瘍関連因子による根治度評価',
    subtitle: 'JGES 胃癌 ESD/EMR ガイドライン第2版（2020）',
    caption:
      'pT1a (M)＝粘膜内癌、pT1b1 (SM1)＝粘膜下浸潤 <500 µm、pT1b2 (SM2)＝≥500 µm。UL0/UL1＝潰瘍・潰瘍瘢痕の有無。長径は再構図上の最大径。判定ロジックは胃癌治療ガイドライン第7版（2025年3月改訂）に準拠（SM1・分化型 ≤3 cm は eCuraA）。',
    footnoteStar: '* eCuraA は一括切除かつ HM0、VM0、Ly0、V0 に限定',
    footnoteEcuraB:
      '※ 第7版で定義された eCuraB（適応拡大切除後など）は本表には含みません。該当時はガイドライン本文を参照してください。',
    headers: {
      depth: '壁深達度',
      ulcer: '潰瘍',
      differentiated: '分化型',
      undifferentiated: '未分化型',
      diffLe3: '≤3 cm',
      diffGt3: '>3 cm',
      undiffLe2: '≤2 cm',
      undiffGt2: '>2 cm',
    },
    rows: SHARED_ROWS,
    notes: {
      c1: 'eCuraC-1：eCuraA の条件を満たすが、分割切除または水平断端陽性（HM1）',
      c2: 'eCuraC-2：上記以外（垂直断端・脈管侵襲・SM2 以深、サイズ超過など）',
      fig6UndiffSize:
        'Fig. 6 例外：分化型優位＋未分化成分の mapping 上長径合計 >2 cm → eCuraC-2',
      fig6UndiffSm: 'Fig. 6 例外：SM 浸潤部に未分化型成分 → eCuraC-2',
    },
    inputSection: '病理所見の入力',
    tableHint: 'すべての項目を入力すると、該当セルがハイライトされます',
  },
  en: {
    title: 'Fig. 2 Evaluation of curability according to tumor-related factors',
    subtitle: 'JGES gastric ESD/EMR guideline 2nd ed. (2020)',
    caption:
      'pT1a (M), intramucosal; pT1b1 (SM1), SM invasion <500 µm; pT1b2 (SM2), ≥500 µm. UL0/UL1, ulcer/scar. Long diameter on reconstruction. Logic follows JGCA treatment guideline 7th ed. (Mar 2025): differentiated SM1 ≤3 cm is eCuraA.',
    footnoteStar: '* eCuraA requires en bloc resection and HM0, VM0, Ly0, V0',
    footnoteEcuraB:
      '* eCuraB per the 7th-edition expanded-indication definition is not shown in this table; see the guideline text when applicable.',
    headers: {
      depth: 'Depth',
      ulcer: 'Ulcer',
      differentiated: 'Differentiated',
      undifferentiated: 'Undifferentiated',
      diffLe3: '≤3 cm',
      diffGt3: '>3 cm',
      undiffLe2: '≤2 cm',
      undiffGt2: '>2 cm',
    },
    rows: SHARED_ROWS,
    notes: {
      c1: 'eCuraC-1: meets eCuraA criteria but piecemeal resection or HM1',
      c2: 'eCuraC-2: all others (VM1, Ly/V1, SM2+, size out of range, etc.)',
      fig6UndiffSize:
        'Fig. 6 exception: differentiated-dominant with undifferentiated mapping sum >2 cm → eCuraC-2',
      fig6UndiffSm: 'Fig. 6 exception: undifferentiated component in SM-invasive part → eCuraC-2',
    },
    inputSection: 'Pathology inputs',
    tableHint: 'Complete all items to highlight the matching cell',
  },
};
