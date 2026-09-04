import {
  computeGastricEsdCurability,
  JGES_GASTRIC_ESD_2020_PUBMED,
} from '../../lib/scores/gastric-esd-curability';
import type { ScoreDefinition } from '../../types/score';

export const gastricEsdCurabilityScore: ScoreDefinition = {
  id: 'gastric-esd-curability',
  name: '早期胃癌 ESD 後・治癒切除判定（eCura）',
  shortName: '治癒切除',
  developedInJapan: true,
  toolKind: 'algorithm',
  organ: 'stomach',
  category: 'gastric',
  categoryLabel: '早期胃癌',
  description:
    'ESD/EMR 後の病理所見から内視鏡的根治度（eCuraA / C-1 / C-2）を判定します。Fig. 2 表は JGES 胃癌 ESD/EMR ガイドライン第2版、判定ロジックは胃癌治療ガイドライン第7版（2025年3月改訂）に準拠します。',
  reference: 'JGES ESD/EMR for EGC 2nd ed. Dig Endosc 2020;32:303-322',
  pubmed: JGES_GASTRIC_ESD_2020_PUBMED,
  officialUrl: 'https://www.jgca.jp/guideline/seventh/002_02.html',
  officialLinkLabel: '胃癌治療ガイドライン 第7版（内視鏡的切除）',
  note:
    'JGES 胃癌 ESD/EMR ガイドライン第2版（2020）の Fig. 2 相当テーブルを画面上部に表示し、病理所見を入力すると該当セルがハイライトされます。第7版改訂により分化型・pT1b1（SM1）・長径 ≤3 cm は eCuraA です。非治癒切除後の LNM 点数化は別ページの eCura スコア（Hatta 2017）を参照。',
  figures: [
    {
      href: 'https://onlinelibrary.wiley.com/doi/10.1111/den.13883#den13883-fig-0002',
      hrefLabel: 'Fig. 2',
      alt: 'Evaluation of curability according to tumor-related factors (JGES 2020 Fig. 2)',
      caption: 'Fig. 2. Evaluation of curability according to tumor-related factors',
      source:
        'Gotoda T, et al. Guidelines for endoscopic submucosal dissection and endoscopic mucosal resection for early gastric cancer (second edition). Dig Endosc. 2020;32:303-322. Fig. 2.',
      doi: 'https://doi.org/10.1111/den.13883',
      pubmed: JGES_GASTRIC_ESD_2020_PUBMED,
      license: 'CC BY-NC-ND 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-nc-nd/4.0/',
      note: '腫瘍関連因子による根治度評価。画面の項目選択と同じロジック。原著 Fig. 2 へリンク。',
    },
    {
      href: 'https://onlinelibrary.wiley.com/doi/10.1111/den.13883#den13883-fig-0003',
      hrefLabel: 'Fig. 3',
      alt: 'Therapeutic flowchart after gastric ESD or EMR (JGES 2020 Fig. 3)',
      caption: 'Fig. 3. Therapeutic flowchart following ESD or EMR',
      source:
        'Gotoda T, et al. Dig Endosc. 2020;32:303-322. Fig. 3.',
      doi: 'https://doi.org/10.1111/den.13883',
      pubmed: JGES_GASTRIC_ESD_2020_PUBMED,
      license: 'CC BY-NC-ND 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-nc-nd/4.0/',
      note: 'ESD/EMR 後の治療方針フロー。eCuraC-1 で追加外科が原則となる例外条件を含む。',
    },
    {
      href: 'https://onlinelibrary.wiley.com/doi/10.1111/den.13883#den13883-fig-0006',
      hrefLabel: 'Fig. 6',
      alt: 'Measurement of undifferentiated-type carcinoma areas (JGES 2020 Fig. 6)',
      caption: 'Fig. 6. Measurement of undifferentiated-type carcinoma (mapping)',
      source: 'Gotoda T, et al. Dig Endosc. 2020;32:303-322. Fig. 6.',
      doi: 'https://doi.org/10.1111/den.13883',
      pubmed: JGES_GASTRIC_ESD_2020_PUBMED,
      license: 'CC BY-NC-ND 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-nc-nd/4.0/',
      note: '未分化型成分の mapping と長径計測。>2 cm または SM 浸潤部の未分化成分は eCuraC-2。',
    },
  ],
  fields: [
    {
      id: 'enBloc',
      label: '切除方法',
      description: '一括切除（en bloc）か分割切除（piecemeal）か',
      options: [
        { value: 0, label: '一括切除（en bloc）' },
        { value: 1, label: '分割切除（piecemeal）' },
      ],
    },
    {
      id: 'histology',
      label: '組織型（優位型）',
      description: '日本胃癌分類に基づく優位型。tub1/pap 優位＝分化型、por/sig/muc 優位＝未分化型',
      options: [
        { value: 0, label: '分化型優位（未分化成分なし／計測不能）' },
        { value: 1, label: '分化型優位＋未分化成分あり（混在）' },
        { value: 2, label: '未分化型優位' },
      ],
    },
    {
      id: 'size',
      label: '腫瘍長径（再構図上）',
      description: '固定標本の mapping 上の最大径（Figure 5–6）',
      options: [
        { value: 0, label: '≤20 mm' },
        { value: 1, label: '21–30 mm' },
        { value: 2, label: '>30 mm' },
      ],
    },
    {
      id: 'depth',
      label: '深達度',
      options: [
        { value: 0, label: 'pT1a（M）粘膜内癌' },
        { value: 1, label: 'pT1b1（SM1）<500 µm' },
        { value: 2, label: 'pT1b2（SM2）以深' },
      ],
    },
    {
      id: 'ul',
      label: '潰瘍・潰瘍瘢痕（UL）',
      options: [
        { value: 0, label: 'UL0（なし）' },
        { value: 1, label: 'UL1（あり）' },
      ],
    },
    {
      id: 'hm',
      label: '水平断端（HM）',
      options: [
        { value: 0, label: 'HM0（陰性）' },
        { value: 1, label: 'HM1（陽性）' },
      ],
    },
    {
      id: 'vm',
      label: '垂直断端（VM）',
      options: [
        { value: 0, label: 'VM0（陰性）' },
        { value: 1, label: 'VM1（陽性）' },
      ],
    },
    {
      id: 'ly',
      label: 'リンパ管侵襲（Ly）',
      options: [
        { value: 0, label: 'Ly0' },
        { value: 1, label: 'Ly1' },
      ],
    },
    {
      id: 'v',
      label: '静脈侵襲（V）',
      options: [
        { value: 0, label: 'V0' },
        { value: 1, label: 'V1' },
      ],
    },
    {
      id: 'undiffSize',
      label: '未分化型成分の長径合計',
      description: '分化型優位＋未分化成分ありの場合のみ。mapping 上の長径合計（Fig. 6）',
      options: [
        { value: 0, label: '≤20 mm または該当なし' },
        { value: 1, label: '>20 mm' },
      ],
    },
    {
      id: 'undiffInSm',
      label: 'SM 浸潤部の未分化型成分',
      description: '分化型優位＋未分化成分あり、かつ pT1b1（SM1）の場合',
      options: [
        { value: 0, label: 'なし／該当なし' },
        { value: 1, label: 'あり' },
      ],
    },
  ],
  compute: computeGastricEsdCurability,
};
