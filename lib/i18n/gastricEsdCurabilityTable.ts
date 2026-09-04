import type { Locale } from './types';

export type GastricEsdCurabilityGradeCell = {
  grade: string;
  pattern?: string;
};

export type GastricEsdCurabilityTableRow = {
  depthUl: string;
  baseKey: string;
  cells: [GastricEsdCurabilityGradeCell, GastricEsdCurabilityGradeCell, GastricEsdCurabilityGradeCell];
};

export type GastricEsdCurabilityTableSection = {
  title: string;
  prefix: 'diff' | 'undiff';
  sizeHeaders: [string, string, string];
  rows: GastricEsdCurabilityTableRow[];
};

export type GastricEsdCurabilityTableCopy = {
  title: string;
  subtitle: string;
  caption: string;
  footnoteStar: string;
  headers: {
    depthUlceration: string;
    size: string;
  };
  sections: [GastricEsdCurabilityTableSection, GastricEsdCurabilityTableSection];
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
const B = (): GastricEsdCurabilityGradeCell => ({ grade: 'eCuraB', pattern: '*' });
const C2 = (): GastricEsdCurabilityGradeCell => ({ grade: 'eCuraC-2' });

export const GASTRIC_ESD_CURABILITY_TABLE: Record<Locale, GastricEsdCurabilityTableCopy> = {
  ja: {
    title: 'Fig. 2 腫瘍関連因子による根治度評価',
    subtitle: 'JGES 胃癌 ESD/EMR ガイドライン第2版（2020）',
    caption:
      'pT1a (M)＝粘膜内癌（病理）、pT1b (SM1)＝粘膜下浸潤 <500 µm。UL0/UL1＝潰瘍・潰瘍瘢痕の有無。長径は再構図上の最大径。',
    footnoteStar: '* eCuraA・eCuraB は一括切除かつ HM0、VM0、Ly0、V0 に限定',
    headers: {
      depthUlceration: '深達度\n潰瘍',
      size: '長径（再構図）',
    },
    sections: [
      {
        title: '分化型優位',
        prefix: 'diff',
        sizeHeaders: ['≤20 mm', '21–30 mm', '>30 mm'],
        rows: [
          {
            depthUl: 'pT1a (M)\nUL0',
            baseKey: 'pt1a-ul0',
            cells: [A('(i)'), A('(i)'), A('(i)')],
          },
          {
            depthUl: 'pT1a (M)\nUL1',
            baseKey: 'pt1a-ul1',
            cells: [A('(iii)'), A('(iii)'), C2()],
          },
          {
            depthUl: 'pT1b (SM1)',
            baseKey: 'pt1b-sm1',
            cells: [B(), B(), C2()],
          },
        ],
      },
      {
        title: '未分化型優位',
        prefix: 'undiff',
        sizeHeaders: ['≤20 mm', '21–30 mm', '>30 mm'],
        rows: [
          {
            depthUl: 'pT1a (M)\nUL0',
            baseKey: 'pt1a-ul0',
            cells: [A('(ii)'), C2(), C2()],
          },
          {
            depthUl: 'pT1a (M)\nUL1',
            baseKey: 'pt1a-ul1',
            cells: [C2(), C2(), C2()],
          },
          {
            depthUl: 'pT1b (SM1)',
            baseKey: 'pt1b-sm1',
            cells: [C2(), C2(), C2()],
          },
        ],
      },
    ],
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
      'pT1a (M), intramucosal cancer; pT1b (SM1), SM invasion <500 µm. UL0/UL1, ulcer/scar absent or present. Long diameter on reconstruction.',
    footnoteStar: '* eCuraA/B require en bloc resection and HM0, VM0, Ly0, V0',
    headers: {
      depthUlceration: 'Depth\nUlceration',
      size: 'Long diameter',
    },
    sections: [
      {
        title: 'Differentiated-dominant',
        prefix: 'diff',
        sizeHeaders: ['≤20 mm', '21–30 mm', '>30 mm'],
        rows: [
          {
            depthUl: 'pT1a (M)\nUL0',
            baseKey: 'pt1a-ul0',
            cells: [A('(i)'), A('(i)'), A('(i)')],
          },
          {
            depthUl: 'pT1a (M)\nUL1',
            baseKey: 'pt1a-ul1',
            cells: [A('(iii)'), A('(iii)'), C2()],
          },
          {
            depthUl: 'pT1b (SM1)',
            baseKey: 'pt1b-sm1',
            cells: [B(), B(), C2()],
          },
        ],
      },
      {
        title: 'Undifferentiated-dominant',
        prefix: 'undiff',
        sizeHeaders: ['≤20 mm', '21–30 mm', '>30 mm'],
        rows: [
          {
            depthUl: 'pT1a (M)\nUL0',
            baseKey: 'pt1a-ul0',
            cells: [A('(ii)'), C2(), C2()],
          },
          {
            depthUl: 'pT1a (M)\nUL1',
            baseKey: 'pt1a-ul1',
            cells: [C2(), C2(), C2()],
          },
          {
            depthUl: 'pT1b (SM1)',
            baseKey: 'pt1b-sm1',
            cells: [C2(), C2(), C2()],
          },
        ],
      },
    ],
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
