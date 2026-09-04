import type { Locale } from './types';

export type EsophagusEsdCurabilityTableCopy = {
  title: string;
  subtitle: string;
  footnoteStar: string;
  headers: { depth: string; v0: string; v1: string };
  rows: {
    epLpm: { label: string; v0: string; v1: string };
    mm: { label: string; v0: string; v1: string };
    sm: { label: string; text: string };
  };
  notes: { margin: string; jcog: string };
  inputSection: string;
  tableHint: string;
};

export const ESOPHAGUS_ESD_CURABILITY_TABLE: Record<Locale, EsophagusEsdCurabilityTableCopy> = {
  ja: {
    title: 'Fig. 5 根治度評価と追加治療（扁平上皮癌）',
    subtitle: 'JGES 食道 ESD/EMR ガイドライン（2020）・食道癌取扱い規約',
    footnoteStar: '* 断端陰性（R0）が前提。断端陽性 → 非治癒切除',
    headers: { depth: '深達度', v0: '脈管侵襲(-)', v1: '脈管侵襲(+)' },
    rows: {
      epLpm: {
        label: 'pEP/LPM',
        v0: '治癒切除\n追加治療不要',
        v1: '追加治療\n強く推奨',
      },
      mm: {
        label: 'pT1a-MM',
        v0: '追加治療\n要個別判断\n(CQ6)',
        v1: '追加治療\n強く推奨',
      },
      sm: {
        label: 'pT1b-SM',
        text: '追加治療強く推奨（CQ7）',
      },
    },
    notes: {
      margin: '断端陽性：非治癒切除 → 確定的 CRT または追加外科（JCOG0508）',
      jcog: 'JCOG0508：pMM・脈管(-)・断端(-) は経過観察 arm。MDT で個別判断',
    },
    inputSection: '病理所見の入力',
    tableHint: 'すべての項目を入力すると、該当セルがハイライトされます',
  },
  en: {
    title: 'Fig. 5 Curability and additional treatment (SCC)',
    subtitle: 'JGES esophageal ESD/EMR guideline (2020) · JES practice guidelines',
    footnoteStar: '* Assumes negative margins (R0). Positive margin → non-curative',
    headers: { depth: 'Depth', v0: 'Ly/V (-)', v1: 'Ly/V (+)' },
    rows: {
      epLpm: {
        label: 'pEP/LPM',
        v0: 'Curative\nno add-on therapy',
        v1: 'Additional therapy\nstrongly recommended',
      },
      mm: {
        label: 'pT1a-MM',
        v0: 'Individual decision\n(CQ6)',
        v1: 'Additional therapy\nstrongly recommended',
      },
      sm: {
        label: 'pT1b-SM',
        text: 'Additional therapy strongly recommended (CQ7)',
      },
    },
    notes: {
      margin: 'Positive margin: non-curative → definitive CRT or surgery (JCOG0508)',
      jcog: 'JCOG0508: pMM, Ly/V (-), margin (-) in observation arm. Decide in MDT',
    },
    inputSection: 'Pathology inputs',
    tableHint: 'Complete all items to highlight the matching cell',
  },
};
