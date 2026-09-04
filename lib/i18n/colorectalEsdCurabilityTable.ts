import type { Locale } from './types';

export type ColorectalEsdCurabilityTableCopy = {
  title: string;
  subtitle: string;
  footnoteStar: string;
  rows: {
    tis: { label: string; text: string };
    vm1: { label: string; text: string };
    hm1: { label: string; text: string };
    vm: { label: string; text: string };
    hm: { label: string; text: string };
    histology: { label: string; text: string };
    smDepth: { label: string; text: string };
    ly: { label: string; text: string };
    v: { label: string; text: string };
    budding: { label: string; text: string };
    additional: { label: string; text: string };
  };
  inputSection: string;
  tableHint: string;
};

export const COLORECTAL_ESD_CURABILITY_TABLE: Record<Locale, ColorectalEsdCurabilityTableCopy> = {
  ja: {
    title: 'pT1（SM）癌・内視鏡的治癒切除の 5 項目',
    subtitle: 'JGES 大腸 ESD/EMR ガイドライン第2版 · 大腸癌治療ガイドライン',
    footnoteStar: 'VM1 → 追加手術強く推奨。HM1 → 追加切除要検討。pTis/M は下段を参照',
    rows: {
      tis: { label: 'pTis/M', text: 'VM0・HM0・完全切除 → 経過観察' },
      vm1: { label: 'VM1', text: '内視鏡的不完全切除 → 追加手術強く推奨' },
      hm1: { label: 'HM1', text: '水平断端陽性 → 追加腸切除要検討' },
      vm: { label: '① 垂直断端', text: 'VM0（完全切除）' },
      hm: { label: '水平断端', text: 'HM0（陰性）' },
      histology: { label: '② 組織型', text: '乳頭腺癌・管状腺癌' },
      smDepth: { label: '③ SM 浸潤', text: '<1000 µm' },
      ly: { label: '④ Ly', text: 'Ly0（陰性）' },
      v: { label: '④ V', text: 'V0（陰性）' },
      budding: { label: '⑤ 簇出', text: 'Grade 1' },
      additional: {
        label: '5 項目の不足',
        text: '追加腸切除を低推奨で検討（LNM 率・患者背景を総合判断）',
      },
    },
    inputSection: '病理所見の入力',
    tableHint: 'すべての項目を入力すると、該当行がハイライトされます',
  },
  en: {
    title: 'Five criteria for endoscopic curative resection (pT1 SM)',
    subtitle: 'JGES colorectal ESD/EMR guideline 2nd ed. · JSCCR treatment guideline',
    footnoteStar: 'VM1 → strongly recommend surgery. HM1 → consider additional resection. See pTis/M row',
    rows: {
      tis: { label: 'pTis/M', text: 'VM0, HM0, complete resection → surveillance' },
      vm1: { label: 'VM1', text: 'Incomplete endoscopic resection → strongly recommend surgery' },
      hm1: { label: 'HM1', text: 'Positive horizontal margin → consider additional resection' },
      vm: { label: '① Vertical margin', text: 'VM0 (complete resection)' },
      hm: { label: 'Horizontal margin', text: 'HM0 (negative)' },
      histology: { label: '② Histology', text: 'Papillary or tubular adenocarcinoma' },
      smDepth: { label: '③ SM invasion', text: '<1000 µm' },
      ly: { label: '④ Ly', text: 'Ly0 (absent)' },
      v: { label: '④ V', text: 'V0 (absent)' },
      budding: { label: '⑤ Budding', text: 'Grade 1' },
      additional: {
        label: 'Criteria not met',
        text: 'Consider additional resection (low recommendation); balance LNM risk and patient factors',
      },
    },
    inputSection: 'Pathology inputs',
    tableHint: 'Complete all items to highlight the matching rows',
  },
};
