/** 関連スコアへの短い説明（任意）。省略時はスコア名のみ表示。 */
export type RelatedScoreHint = {
  ja: string;
  en: string;
};

export type RelatedScoreEntry = {
  /** リンク先スコア id（variant 専用 id 可。URL は pageId に解決） */
  id: string;
  hint?: RelatedScoreHint;
};

/**
 * スコア間の関連リンク。
 * - キー: 表示中スコア id（variant ページは pageId でも可）
 * - 値: リンク先（上から優先順）
 * - 双方向リンクは両方に書く（例: 治癒切除 ↔ nomogram）
 */
export const RELATED_SCORES: Record<string, readonly RelatedScoreEntry[]> = {
  'colorectal-esd-curability': [
    {
      id: 'kajiwara-nomogram',
      hint: {
        ja: '追加切除検討時の LNM 確率',
        en: 'LNM probability when considering additional resection',
      },
    },
  ],
  'kajiwara-nomogram': [
    {
      id: 'colorectal-esd-curability',
      hint: {
        ja: '内視鏡的治癒切除の 5 項目判定',
        en: 'Five-criteria endoscopic curative resection',
      },
    },
  ],
  'gastric-esd-curability': [
    {
      id: 'ecura-hatta',
      hint: { ja: 'LNM リスク層別化（0–7 点）', en: 'LNM risk stratification (0–7 points)' },
    },
    {
      id: 'sekiguchi',
      hint: { ja: 'ESD 後 LNM 予測', en: 'Post-ESD LNM prediction' },
    },
  ],
  'ecura-hatta': [
    {
      id: 'gastric-esd-curability',
      hint: { ja: 'JGES 治癒切除判定', en: 'JGES curative resection criteria' },
    },
    { id: 'sekiguchi', hint: { ja: 'ESD 後 LNM 予測', en: 'Post-ESD LNM prediction' } },
  ],
  'sekiguchi': [
    { id: 'gastric-esd-curability', hint: { ja: '治癒切除判定', en: 'Curative resection assessment' } },
    { id: 'ecura-hatta', hint: { ja: 'LNM リスク層別化', en: 'LNM risk stratification' } },
  ],
  'esophagus-esd-curability': [
    { id: 'jes', hint: { ja: 'Barrett 粘膜分類', en: 'Barrett mucosa classification' } },
    { id: 'siewert', hint: { ja: '胃食管移行部癌の Siewert 分類', en: 'Siewert classification for GEJ cancer' } },
    { id: 'prague', hint: { ja: 'Barrett 長さ（C/M）', en: 'Barrett length (C/M)' } },
  ],
  kyoto: [
    { id: 'kimura-takemoto', hint: { ja: '萎縮境界・胃底腺粘膜', en: 'Atrophic border and fundic mucosa' } },
    { id: 'eggim', hint: { ja: '地图状萎縮の範囲', en: 'Extent of map-like atrophy' } },
  ],
  'kimura-takemoto': [
    { id: 'kyoto', hint: { ja: '京都分類（改変版）', en: 'Kyoto classification (modified)' } },
    { id: 'eggim', hint: { ja: '地图状萎縮の範囲', en: 'Extent of map-like atrophy' } },
  ],
  eggim: [
    { id: 'kyoto', hint: { ja: '京都分類', en: 'Kyoto classification' } },
    { id: 'kimura-takemoto', hint: { ja: '萎縮境界', en: 'Atrophic border' } },
  ],
  spigelman: [
    { id: 'ishii', hint: { ja: 'FAP ポリープの C 分類', en: 'C classification for FAP polyps' } },
    { id: 'kakushima', hint: { ja: 'FAP ポリープの C 分類（改変）', en: 'Modified C classification for FAP' } },
  ],
  nice: [
    { id: 'jnet', hint: { ja: 'NBI 拡大の JNET 分類', en: 'JNET on magnifying NBI' } },
    { id: 'wasp', hint: { ja: 'NBI 拡大の WASP 分類', en: 'WASP on magnifying NBI' } },
    { id: 'colorectal-ec', hint: { ja: '細胞内視鏡 EC 分類', en: 'Endocytoscopy EC classification' } },
  ],
  jnet: [
    { id: 'nice', hint: { ja: '非拡大 NICE', en: 'Non-magnifying NICE' } },
    { id: 'wasp', hint: { ja: 'WASP 分類', en: 'WASP classification' } },
  ],
  wasp: [
    { id: 'jnet', hint: { ja: 'JNET 分類', en: 'JNET classification' } },
    { id: 'mesda-g', hint: { ja: 'MESDA-G アルゴリズム', en: 'MESDA-G algorithm' } },
  ],
  'mesda-g': [
    { id: 'wasp', hint: { ja: 'WASP 分類', en: 'WASP classification' } },
    { id: 'toya', hint: { ja: 'Toya 分類', en: 'Toya classification' } },
  ],
  paris: [
    { id: 'lst', hint: { ja: '側方発育型（LST）', en: 'Lateral spreading tumor (LST)' } },
    { id: 'vienna', hint: { ja: 'Vienna 分類', en: 'Vienna classification' } },
  ],
  lst: [{ id: 'paris', hint: { ja: 'Paris 分類', en: 'Paris classification' } }],
  vienna: [{ id: 'paris', hint: { ja: 'Paris 分類', en: 'Paris classification' } }],
  bbps: [{ id: 'aronchick', hint: { ja: 'Aronchick 分類', en: 'Aronchick classification' } }],
  aronchick: [{ id: 'bbps', hint: { ja: 'BBPS スコア', en: 'BBPS score' } }],
  gbs: [{ id: 'forrest', hint: { ja: 'Forrest 分類', en: 'Forrest classification' } }],
  forrest: [{ id: 'gbs', hint: { ja: 'Glasgow-Blatchford スコア', en: 'Glasgow-Blatchford score' } }],
  'colorectal-ec': [
    { id: 'nice', hint: { ja: 'NICE 分類', en: 'NICE classification' } },
    { id: 'kudo-tsuruta', hint: { ja: 'pit pattern', en: 'Pit pattern (Kudo–Tsuruta)' } },
  ],
};
