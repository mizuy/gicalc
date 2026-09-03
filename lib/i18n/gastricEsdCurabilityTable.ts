import type { Locale } from './types';

export type GastricEsdCurabilityTableCopy = {
  title: string;
  subtitle: string;
  footnoteStar: string;
  headers: {
    histology: string;
    pt1aUl0: string;
    pt1aUl1: string;
    pt1bSm1: string;
  };
  rows: {
    diff: {
      label: string;
      pt1aUl0: string;
      pt1aUl1: string;
      pt1bSm1: string;
    };
    undiff: {
      label: string;
      pt1aUl0: string;
      pt1aUl1: string;
      pt1bSm1: string;
    };
  };
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
    footnoteStar: '* eCuraA・eCuraB は一括切除かつ HM0、VM0、Ly0、V0 に限定',
    headers: {
      histology: '組織型',
      pt1aUl0: 'pT1a UL0',
      pt1aUl1: 'pT1a UL1',
      pt1bSm1: 'pT1b（SM1）',
    },
    rows: {
      diff: {
        label: '分化型優位',
        pt1aUl0: 'eCuraA (i)\n長径不問',
        pt1aUl1: 'eCuraA (iii)\n≤3 cm',
        pt1bSm1: 'eCuraB*\n≤3 cm',
      },
      undiff: {
        label: '未分化型優位',
        pt1aUl0: 'eCuraA (ii)\n≤2 cm',
        pt1aUl1: 'eCuraC-2',
        pt1bSm1: 'eCuraC-2',
      },
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
    title: 'Fig. 2 Curability by tumor-related factors',
    subtitle: 'JGES gastric ESD/EMR guideline 2nd ed. (2020)',
    footnoteStar: '* eCuraA/B require en bloc resection and HM0, VM0, Ly0, V0',
    headers: {
      histology: 'Histology',
      pt1aUl0: 'pT1a UL0',
      pt1aUl1: 'pT1a UL1',
      pt1bSm1: 'pT1b (SM1)',
    },
    rows: {
      diff: {
        label: 'Differentiated-dominant',
        pt1aUl0: 'eCuraA (i)\nany size',
        pt1aUl1: 'eCuraA (iii)\n≤3 cm',
        pt1bSm1: 'eCuraB*\n≤3 cm',
      },
      undiff: {
        label: 'Undifferentiated-dominant',
        pt1aUl0: 'eCuraA (ii)\n≤2 cm',
        pt1aUl1: 'eCuraC-2',
        pt1bSm1: 'eCuraC-2',
      },
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
