import type { Locale } from './types';

export type GastricEsdCurabilityGradeCell = {
  grade: string;
  pattern?: string;
  size?: string;
};

export type GastricEsdCurabilityTableCopy = {
  title: string;
  subtitle: string;
  caption: string;
  footnoteStar: string;
  headers: {
    depthUlceration: string;
    differentiated: string;
    undifferentiated: string;
  };
  depth: {
    pt1a: string;
    pt1b: string;
  };
  ulceration: {
    ul0: string;
    ul1: string;
  };
  cells: Record<
    | 'cell-diff-pt1a-ul0'
    | 'cell-undiff-pt1a-ul0'
    | 'cell-diff-pt1a-ul1'
    | 'cell-undiff-pt1a-ul1'
    | 'cell-diff-pt1b-sm1'
    | 'cell-undiff-pt1b-sm1',
    GastricEsdCurabilityGradeCell
  >;
  notes: {
    c1: string;
    c2: string;
    fig6UndiffSize: string;
    fig6UndiffSm: string;
  };
  inputSection: string;
  tableHint: string;
};

export const GASTRIC_ESD_CURABILITY_TABLE: Record<Locale, GastricEsdCurabilityTableCopy> = {
  ja: {
    title: 'Fig. 2 腫瘍関連因子による根治度評価',
    subtitle: 'JGES 胃癌 ESD/EMR ガイドライン第2版（2020）',
    caption:
      'pT1a (M)＝粘膜内癌（病理）、pT1b (SM)＝粘膜下浸潤癌（病理）。UL0＝潰瘍・潰瘍瘢痕なし、UL1＝潰瘍・潰瘍瘢痕あり。',
    footnoteStar: '* eCuraA・eCuraB は一括切除かつ HM0、VM0、Ly0、V0 に限定',
    headers: {
      depthUlceration: '深達度\n潰瘍',
      differentiated: '分化型優位',
      undifferentiated: '未分化型優位',
    },
    depth: {
      pt1a: 'pT1a (M)',
      pt1b: 'pT1b (SM1)',
    },
    ulceration: {
      ul0: 'UL0',
      ul1: 'UL1',
    },
    cells: {
      'cell-diff-pt1a-ul0': { grade: 'eCuraA', pattern: '(i)', size: '長径不問' },
      'cell-undiff-pt1a-ul0': { grade: 'eCuraA', pattern: '(ii)', size: '≤2 cm' },
      'cell-diff-pt1a-ul1': { grade: 'eCuraA', pattern: '(iii)', size: '≤3 cm' },
      'cell-undiff-pt1a-ul1': { grade: 'eCuraC-2' },
      'cell-diff-pt1b-sm1': { grade: 'eCuraB', pattern: '*', size: '≤3 cm' },
      'cell-undiff-pt1b-sm1': { grade: 'eCuraC-2' },
    },
    notes: {
      c1: 'eCuraC-1：eCuraA/B の条件を満たすが、分割切除または水平断端陽性（HM1）',
      c2: 'eCuraC-2：上記以外（垂直断端・脈管侵襲・SM2 以深、サイズ超過など）',
      fig6UndiffSize:
        'Fig. 6 例外：分化型優位＋未分化成分の mapping 上長径合計 >2 cm → eCuraC-2',
      fig6UndiffSm: 'Fig. 6 例外：SM 浸潤部に未分化型成分 → eCuraC-2（eCuraB 不可）',
    },
    inputSection: '病理所見の入力',
    tableHint: 'すべての項目を入力すると、該当セルがハイライトされます',
  },
  en: {
    title: 'Fig. 2 Evaluation of curability according to tumor-related factors',
    subtitle: 'JGES gastric ESD/EMR guideline 2nd ed. (2020)',
    caption:
      'pT1a (M), intramucosal cancer (pathology); pT1b (SM), submucosally invasive cancer (pathology). UL0, no ulcer/scar; UL1, ulcer/scar present.',
    footnoteStar: '* eCuraA/B require en bloc resection and HM0, VM0, Ly0, V0',
    headers: {
      depthUlceration: 'Depth\nUlceration',
      differentiated: 'Differentiated-dominant',
      undifferentiated: 'Undifferentiated-dominant',
    },
    depth: {
      pt1a: 'pT1a (M)',
      pt1b: 'pT1b (SM1)',
    },
    ulceration: {
      ul0: 'UL0',
      ul1: 'UL1',
    },
    cells: {
      'cell-diff-pt1a-ul0': { grade: 'eCuraA', pattern: '(i)', size: 'any size' },
      'cell-undiff-pt1a-ul0': { grade: 'eCuraA', pattern: '(ii)', size: '≤2 cm' },
      'cell-diff-pt1a-ul1': { grade: 'eCuraA', pattern: '(iii)', size: '≤3 cm' },
      'cell-undiff-pt1a-ul1': { grade: 'eCuraC-2' },
      'cell-diff-pt1b-sm1': { grade: 'eCuraB', pattern: '*', size: '≤3 cm' },
      'cell-undiff-pt1b-sm1': { grade: 'eCuraC-2' },
    },
    notes: {
      c1: 'eCuraC-1: meets eCuraA/B criteria but piecemeal resection or HM1',
      c2: 'eCuraC-2: all others (VM1, Ly/V1, SM2+, size out of range, etc.)',
      fig6UndiffSize:
        'Fig. 6 exception: differentiated-dominant with undifferentiated mapping sum >2 cm → eCuraC-2',
      fig6UndiffSm:
        'Fig. 6 exception: undifferentiated component in SM-invasive part → eCuraC-2 (not eCuraB)',
    },
    inputSection: 'Pathology inputs',
    tableHint: 'Complete all items to highlight the matching cell',
  },
};
