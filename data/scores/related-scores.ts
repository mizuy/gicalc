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
    {
      id: 'koyama-et2',
      hint: {
        ja: 'T1b vs T2 の内視鏡鑑別（ESD 前）',
        en: 'Endoscopic T1b vs T2 distinction (before ESD)',
      },
    },
    {
      id: 'haggitt',
      hint: {
        ja: '有茎悪性ポリープの浸潤レベル',
        en: 'Invasion level in pedunculated malignant polyps',
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
    {
      id: 'koyama-et2',
      hint: {
        ja: 'T1b vs T2 の内視鏡鑑別',
        en: 'Endoscopic T1b vs T2 distinction',
      },
    },
    {
      id: 'haggitt',
      hint: {
        ja: '有茎悪性ポリープの Level 0–4',
        en: 'Haggitt Level 0–4 for pedunculated malignant polyps',
      },
    },
  ],
  'koyama-et2': [
    {
      id: 'colorectal-esd-curability',
      hint: {
        ja: 'ESD 後の治癒切除判定',
        en: 'Curative resection after ESD',
      },
    },
    {
      id: 'kajiwara-nomogram',
      hint: {
        ja: 'T1 LNM 確率（病理後）',
        en: 'T1 LNM probability (after pathology)',
      },
    },
    {
      id: 'paris',
      hint: {
        ja: 'Paris 肉眼型',
        en: 'Paris macroscopic type',
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
    { id: 'paris', hint: { ja: '表在型の肉眼型（食道・胃・大腸）', en: 'Superficial morphology (esophagus, stomach, colorectum)' } },
    {
      id: 'macro',
      hint: { ja: '規約0型と Paris の差', en: 'Japanese Type 0 vs Paris' },
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
    { id: 'paris', hint: { ja: '表在型の肉眼型（食道・胃・大腸）', en: 'Superficial morphology (esophagus, stomach, colorectum)' } },
    { id: 'macro', hint: { ja: '規約0型と Paris の差', en: 'Japanese Type 0 vs Paris' } },
  ],
  kyoto: [
    { id: 'kimura-takemoto', hint: { ja: '萎縮境界・胃底腺粘膜', en: 'Atrophic border and fundic mucosa' } },
    { id: 'eggim', hint: { ja: '地图状萎縮の範囲', en: 'Extent of map-like atrophy' } },
    { id: 'olga', hint: { ja: '生検萎縮の Stage 0–IV', en: 'Biopsy atrophy Stage 0–IV' } },
    { id: 'olgim', hint: { ja: '生検腸上皮化生の Stage 0–IV', en: 'Biopsy IM Stage 0–IV' } },
  ],
  'kimura-takemoto': [
    { id: 'kyoto', hint: { ja: '京都分類（改変版）', en: 'Kyoto classification (modified)' } },
    { id: 'eggim', hint: { ja: '地图状萎縮の範囲', en: 'Extent of map-like atrophy' } },
    { id: 'olga', hint: { ja: '生検萎縮ステージ', en: 'Biopsy atrophy stage' } },
  ],
  eggim: [
    { id: 'kyoto', hint: { ja: '京都分類', en: 'Kyoto classification' } },
    { id: 'kimura-takemoto', hint: { ja: '萎縮境界', en: 'Atrophic border' } },
    { id: 'olgim', hint: { ja: '生検腸上皮化生ステージ', en: 'Biopsy IM stage' } },
    { id: 'olga', hint: { ja: '生検萎縮ステージ', en: 'Biopsy atrophy stage' } },
  ],
  olga: [
    { id: 'olgim', hint: { ja: '腸上皮化生で同じ表', en: 'Same table using IM' } },
    { id: 'kyoto', hint: { ja: '京都分類（内視鏡）', en: 'Kyoto classification (endoscopic)' } },
    { id: 'eggim', hint: { ja: '内視鏡的腸上皮化生', en: 'Endoscopic IM score' } },
    { id: 'kimura-takemoto', hint: { ja: '内視鏡的萎縮境界', en: 'Endoscopic atrophic border' } },
  ],
  olgim: [
    { id: 'olga', hint: { ja: '萎縮で同じ表', en: 'Same table using atrophy' } },
    { id: 'kyoto', hint: { ja: '京都分類（内視鏡）', en: 'Kyoto classification (endoscopic)' } },
    { id: 'eggim', hint: { ja: '内視鏡的腸上皮化生', en: 'Endoscopic IM score' } },
    { id: 'kimura-takemoto', hint: { ja: '内視鏡的萎縮境界', en: 'Endoscopic atrophic border' } },
  ],
  spigelman: [
    { id: 'ishii', hint: { ja: 'SNADET C3 vs C4/5', en: 'SNADET C3 vs C4/5' } },
    { id: 'uchiyama', hint: { ja: '乳頭部 ME-NBI（別評価）', en: 'Ampullary ME-NBI (assess papilla separately)' } },
  ],
  ishii: [
    { id: 'kikuchi-mebi', hint: { ja: 'ME-NBI アルゴリズム', en: 'ME-NBI algorithm' } },
    { id: 'kakushima', hint: { ja: 'WLI のみスコア', en: 'WLI-only score' } },
    { id: 'toya', hint: { ja: 'ME-CV アルゴリズム', en: 'ME-CV algorithm' } },
    { id: 'vienna', hint: { ja: 'Vienna C3 / C4 / C5', en: 'Vienna C3 / C4 / C5' } },
  ],
  kakushima: [
    { id: 'ishii', hint: { ja: 'NBI 拡大を加えた Ishii', en: 'Ishii with magnifying NBI' } },
    { id: 'kikuchi-mebi', hint: { ja: 'ME-NBI アルゴリズム', en: 'ME-NBI algorithm' } },
    { id: 'vienna', hint: { ja: 'Vienna C3 / C4 / C5', en: 'Vienna C3 / C4 / C5' } },
  ],
  'kikuchi-mebi': [
    { id: 'ishii', hint: { ja: '0–5 点スコア', en: '0–5 point score' } },
    { id: 'toya', hint: { ja: 'ME-CV アルゴリズム', en: 'ME-CV algorithm' } },
    { id: 'vienna', hint: { ja: 'Vienna C3 / C4 / C5', en: 'Vienna C3 / C4 / C5' } },
  ],
  toya: [
    { id: 'kikuchi-mebi', hint: { ja: 'ME-NBI アルゴリズム', en: 'ME-NBI algorithm' } },
    { id: 'ishii', hint: { ja: '0–5 点スコア', en: '0–5 point score' } },
    { id: 'vienna', hint: { ja: 'Vienna C3 / C4 / C5', en: 'Vienna C3 / C4 / C5' } },
  ],
  uchiyama: [
    { id: 'ampullary-macroscopic', hint: { ja: '乳頭部癌肉眼型', en: 'Ampullary macroscopic types' } },
    { id: 'spigelman', hint: { ja: 'FAP 十二指腸腺腫（非乳頭部）', en: 'FAP duodenal adenoma (non-ampullary)' } },
  ],
  'ampullary-macroscopic': [
    { id: 'uchiyama', hint: { ja: '乳頭部 ME-NBI', en: 'Ampullary ME-NBI' } },
    { id: 'spigelman', hint: { ja: 'FAP 腺腫（乳頭部は別評価）', en: 'FAP adenoma (papilla assessed separately)' } },
  ],
  nice: [
    { id: 'jnet', hint: { ja: 'NBI 拡大の JNET 分類', en: 'JNET on magnifying NBI' } },
    { id: 'wasp', hint: { ja: 'NBI 拡大の WASP 分類', en: 'WASP on magnifying NBI' } },
    { id: 'colorectal-ec', hint: { ja: '細胞内視鏡 EC 分類', en: 'Endocytoscopy EC classification' } },
  ],
  jes: [
    { id: 'paris', hint: { ja: '表在型の肉眼型（食道・胃・大腸）', en: 'Superficial morphology (esophagus, stomach, colorectum)' } },
    { id: 'macro', hint: { ja: '規約0型と Paris の差', en: 'Japanese Type 0 vs Paris' } },
    { id: 'barrett', hint: { ja: '日本の Barrett 定義', en: 'Japanese Barrett definition' } },
    { id: 'bing', hint: { ja: 'Barrett NBI（BING）', en: 'Barrett NBI (BING)' } },
  ],
  prague: [
    { id: 'barrett', hint: { ja: '日本の定義と SSBE/LSBE', en: 'Japanese definition and SSBE/LSBE' } },
    { id: 'bing', hint: { ja: 'NBI での異形成予測', en: 'NBI prediction of dysplasia' } },
    { id: 'jes', hint: { ja: '扁平上皮の拡大分類', en: 'Squamous magnifying classification' } },
  ],
  barrett: [
    { id: 'prague', hint: { ja: 'C / M の計測', en: 'C and M measurement' } },
    { id: 'bing', hint: { ja: 'NBI での異形成予測', en: 'NBI prediction of dysplasia' } },
    { id: 'jes', hint: { ja: '扁平上皮の拡大分類', en: 'Squamous magnifying classification' } },
    { id: 'paris', hint: { ja: '表在型の肉眼型', en: 'Superficial morphology' } },
  ],
  bing: [
    { id: 'barrett', hint: { ja: '日本の Barrett 定義', en: 'Japanese Barrett definition' } },
    { id: 'prague', hint: { ja: 'C / M の計測', en: 'C and M measurement' } },
    { id: 'jes', hint: { ja: '扁平上皮の拡大分類', en: 'Squamous magnifying classification' } },
    { id: 'paris', hint: { ja: '表在型の肉眼型', en: 'Superficial morphology' } },
  ],
  jnet: [
    { id: 'nice', hint: { ja: '非拡大 NICE', en: 'Non-magnifying NICE' } },
    { id: 'wasp', hint: { ja: 'WASP 分類', en: 'WASP classification' } },
  ],
  wasp: [
    { id: 'jnet', hint: { ja: 'JNET 分類', en: 'JNET classification' } },
    { id: 'mesda-g', hint: { ja: 'MESDA-G アルゴリズム', en: 'MESDA-G algorithm' } },
    { id: 'who-serrated', hint: { ja: 'WHO 鋸歯状組織型', en: 'WHO serrated histology' } },
  ],
  'mesda-g': [
    { id: 'wasp', hint: { ja: 'WASP 分類', en: 'WASP classification' } },
    { id: 'toya', hint: { ja: 'Toya 分類', en: 'Toya classification' } },
    { id: 'paris', hint: { ja: '表在型の肉眼型（食道・胃・大腸）', en: 'Superficial morphology (esophagus, stomach, colorectum)' } },
  ],
  paris: [
    { id: 'macro', hint: { ja: '規約0型との違い', en: 'Japanese Type 0 vs Paris' } },
    { id: 'lst', hint: { ja: '側方発育型（LST）', en: 'Lateral spreading tumor (LST)' } },
    { id: 'jes', hint: { ja: '食道の JES 分類', en: 'JES classification (esophagus)' } },
    { id: 'mesda-g', hint: { ja: '胃の MESDA-G', en: 'MESDA-G (stomach)' } },
    { id: 'yamada', hint: { ja: '胃隆起の山田分類', en: 'Yamada elevated gastric types' } },
    { id: 'borrmann', hint: { ja: '進行胃癌の肉眼型', en: 'Advanced gastric macroscopic type' } },
    { id: 'vienna', hint: { ja: 'Vienna 分類', en: 'Vienna classification' } },
  ],
  macro: [
    { id: 'paris', hint: { ja: 'Paris 分類（国際表）', en: 'Paris classification' } },
    { id: 'lst', hint: { ja: 'LST は肉眼型ではない', en: 'LST is not a macroscopic type' } },
    { id: 'yamada', hint: { ja: '胃隆起の山田分類', en: 'Yamada elevated gastric types' } },
    { id: 'borrmann', hint: { ja: '進行胃癌 1–5 型', en: 'Advanced gastric types 1–5' } },
  ],
  yamada: [
    { id: 'paris', hint: { ja: 'Paris 表在型', en: 'Paris superficial types' } },
    { id: 'macro', hint: { ja: '規約0型と Paris の差', en: 'Japanese Type 0 vs Paris' } },
    { id: 'borrmann', hint: { ja: '進行胃癌の肉眼型', en: 'Advanced gastric macroscopic type' } },
  ],
  borrmann: [
    { id: 'paris', hint: { ja: '表在型（0 型）', en: 'Superficial Type 0' } },
    { id: 'macro', hint: { ja: '規約0型と Paris の差', en: 'Japanese Type 0 vs Paris' } },
    { id: 'lauren', hint: { ja: '胃癌組織型', en: 'Gastric histology' } },
    { id: 'yamada', hint: { ja: '隆起性病変の山田分類', en: 'Yamada elevated types' } },
  ],
  lst: [
    { id: 'paris', hint: { ja: 'Paris 分類', en: 'Paris classification' } },
    { id: 'macro', hint: { ja: '規約0型と Paris の差', en: 'Japanese Type 0 vs Paris' } },
    {
      id: 'sydney-dmi',
      hint: { ja: '大きな LST の EMR 後の壁損傷', en: 'Post-EMR mural injury after large LST' },
    },
  ],
  'esd-fibrosis': [
    {
      id: 'sydney-dmi',
      hint: { ja: 'EMR/ESD 後の固有筋層損傷', en: 'MP injury after EMR/ESD' },
    },
  ],
  'sydney-dmi': [
    {
      id: 'esd-fibrosis',
      hint: { ja: '線維化は Type II の主因', en: 'Fibrosis is the main cause of Type II' },
    },
    {
      id: 'lst',
      hint: { ja: '対象は ≥20 mm の LST/LSL', en: 'Described for LST/LSL ≥20 mm' },
    },
    { id: 'paris', hint: { ja: 'Paris 肉眼型', en: 'Paris macroscopic type' } },
  ],
  vienna: [
    { id: 'paris', hint: { ja: 'Paris 分類', en: 'Paris classification' } },
    { id: 'who-serrated', hint: { ja: 'WHO 鋸歯状組織型', en: 'WHO serrated histology' } },
  ],
  'who-serrated': [
    { id: 'wasp', hint: { ja: 'WASP 内視鏡分類', en: 'WASP endoscopic classification' } },
    { id: 'vienna', hint: { ja: 'Vienna 分類', en: 'Vienna classification' } },
    { id: 'sps', hint: { ja: 'SPS 診断基準', en: 'SPS diagnostic criteria' } },
  ],
  'itbcg-budding': [
    {
      id: 'kajiwara-nomogram',
      hint: { ja: 'T1 LNM 予測（別因子）', en: 'T1 LNM prediction (separate factor)' },
    },
    { id: 'vienna', hint: { ja: 'Vienna 分類', en: 'Vienna classification' } },
  ],
  'net-grade': [{ id: 'lauren', hint: { ja: 'Lauren 胃癌組織型', en: 'Lauren gastric histology' } }],
  lauren: [
    { id: 'net-grade', hint: { ja: 'NET G1–G3', en: 'NET G1–G3' } },
    { id: 'kyoto', hint: { ja: '萎縮・化生背景', en: 'Atrophy / metaplasia background' } },
    { id: 'borrmann', hint: { ja: '進行胃癌の肉眼型', en: 'Advanced gastric macroscopic type' } },
  ],
  haggitt: [
    {
      id: 'colorectal-esd-curability',
      hint: { ja: '内視鏡的治癒切除の 5 項目', en: 'Five-criteria endoscopic curative resection' },
    },
    {
      id: 'kajiwara-nomogram',
      hint: { ja: 'T1 LNM 確率', en: 'T1 LNM probability' },
    },
    { id: 'paris', hint: { ja: 'Paris 肉眼型', en: 'Paris macroscopic type' } },
  ],
  bbps: [{ id: 'aronchick', hint: { ja: 'Aronchick 分類', en: 'Aronchick classification' } }],
  aronchick: [{ id: 'bbps', hint: { ja: 'BBPS スコア', en: 'BBPS score' } }],
  gbs: [
    { id: 'rockall', hint: { ja: '死亡リスク（complete score）', en: 'Mortality risk (complete score)' } },
    { id: 'forrest', hint: { ja: 'Forrest 分類', en: 'Forrest classification' } },
  ],
  forrest: [
    { id: 'gbs', hint: { ja: 'Glasgow-Blatchford スコア', en: 'Glasgow-Blatchford score' } },
    { id: 'rockall', hint: { ja: 'Rockall 死亡リスク', en: 'Rockall mortality risk' } },
  ],
  rockall: [
    { id: 'gbs', hint: { ja: '介入必要性（GBS）', en: 'Need for intervention (GBS)' } },
    { id: 'forrest', hint: { ja: '潰瘍出血の内視鏡所見', en: 'Ulcer bleeding stigmata' } },
  ],
  'colorectal-ec': [
    { id: 'nice', hint: { ja: 'NICE 分類', en: 'NICE classification' } },
    { id: 'kudo-tsuruta', hint: { ja: 'pit pattern', en: 'Pit pattern (Kudo–Tsuruta)' } },
  ],
};
