export type NomogramSex = 'male' | 'female';
export type NomogramLocation = 'transverse' | 'acd' | 'srb' | 'rsra';
export type NomogramGrade = 'g1' | 'g2' | 'g3';
export type NomogramLvi = 'negative' | 'positive';
export type NomogramSmDepth = 'lt1000' | 'sm1000to1999' | 'sm2000plus';
export type NomogramBudding = 'bd1' | 'bd23';

export type NomogramInput = {
  sex: NomogramSex;
  location: NomogramLocation;
  grade: NomogramGrade;
  lvi: NomogramLvi;
  smDepth: NomogramSmDepth;
  budding: NomogramBudding;
};

export type NomogramResult = {
  points: number;
  probability: number;
};

/**
 * Kajiwara 2023 Table 2 の多変量 OR。
 * 公式計算機は OR をそのまま logit に載せず、rms ノモグラムの整数点に変換する。
 */
export const PUBLISHED_ODDS_RATIOS = {
  sexFemale: 1.55,
  locationAcD: 1.74,
  locationSRb: 2.18,
  locationRsRa: 2.59,
  gradeG2: 1.73,
  gradeG3: 3.6,
  lviPositive: 3.05,
  sm1000to1999: 3.0,
  sm2000plus: 4.33,
  buddingBd23: 1.93,
} as const;

/**
 * 公式 JSCCR 計算機（https://nomogram.jsccr.jp/nomograms/lnm）の整数点。
 * 参照カテゴリ: 男性 / 横行結腸 / G1 / LVI− / SM<1000μm / BD1 = 0 点。
 * SM≥2000μm を 100 点とする。
 */
export const POINTS = {
  sexFemale: 28,
  locationAcD: 38,
  locationSRb: 53,
  locationRsRa: 65,
  gradeG2: 36,
  gradeG3: 86,
  lviPositive: 75,
  sm1000to1999: 75,
  sm2000plus: 100,
  buddingBd23: 45,
} as const;

/**
 * 公式サイトが表示する点数→確率（%）。73 点以下は 1.0% 表示下限。
 * 2026-09 に全 186 通りの到達可能点数を公式 GET /nomograms/lnm_result で照合した。
 */
export const OFFICIAL_PROBABILITY_BY_POINTS: Readonly<Record<number, number>> = {
  0: 1.0,
  28: 1.0,
  36: 1.0,
  38: 1.0,
  45: 1.0,
  53: 1.0,
  64: 1.0,
  65: 1.0,
  66: 1.0,
  73: 1.0,
  74: 1.1,
  75: 1.1,
  81: 1.3,
  83: 1.4,
  86: 1.5,
  89: 1.6,
  93: 1.7,
  98: 1.9,
  100: 2.0,
  101: 2.0,
  102: 2.1,
  103: 2.1,
  109: 2.3,
  110: 2.3,
  111: 2.4,
  113: 2.5,
  114: 2.5,
  117: 2.6,
  119: 2.7,
  120: 2.7,
  124: 2.8,
  126: 2.9,
  128: 3.0,
  129: 3.0,
  131: 3.1,
  134: 3.2,
  136: 3.3,
  138: 3.3,
  139: 3.4,
  140: 3.4,
  141: 3.4,
  145: 3.6,
  146: 3.6,
  147: 3.7,
  148: 3.7,
  149: 3.7,
  150: 3.8,
  151: 3.8,
  152: 3.8,
  153: 3.9,
  156: 4.0,
  158: 4.0,
  159: 4.1,
  161: 4.2,
  162: 4.2,
  164: 4.3,
  165: 4.3,
  166: 4.3,
  167: 4.4,
  168: 4.4,
  169: 4.4,
  173: 4.6,
  174: 4.6,
  175: 4.6,
  176: 4.7,
  177: 4.7,
  178: 4.8,
  179: 4.8,
  181: 4.9,
  183: 4.9,
  184: 5.0,
  185: 5.0,
  186: 5.1,
  188: 5.3,
  189: 5.4,
  192: 5.7,
  193: 5.8,
  194: 5.9,
  195: 6.0,
  196: 6.1,
  197: 6.2,
  198: 6.3,
  199: 6.4,
  201: 6.6,
  202: 6.7,
  203: 6.8,
  204: 6.9,
  206: 7.1,
  209: 7.4,
  210: 7.5,
  211: 7.6,
  212: 7.7,
  213: 7.8,
  214: 7.9,
  215: 8.0,
  216: 8.1,
  217: 8.2,
  219: 8.4,
  220: 8.5,
  221: 8.6,
  222: 8.7,
  223: 8.8,
  224: 8.9,
  226: 9.1,
  227: 9.2,
  228: 9.3,
  229: 9.4,
  231: 9.6,
  233: 9.8,
  234: 9.9,
  236: 10.2,
  237: 10.4,
  238: 10.5,
  239: 10.7,
  240: 10.9,
  241: 11.1,
  242: 11.3,
  243: 11.4,
  244: 11.6,
  246: 12.0,
  247: 12.1,
  248: 12.3,
  249: 12.5,
  251: 12.9,
  252: 13.0,
  254: 13.4,
  256: 13.8,
  258: 14.1,
  259: 14.3,
  260: 14.5,
  261: 14.6,
  262: 14.8,
  264: 15.2,
  267: 15.7,
  268: 15.9,
  269: 16.1,
  271: 16.4,
  272: 16.6,
  273: 16.8,
  274: 17.0,
  276: 17.3,
  277: 17.5,
  279: 17.9,
  281: 18.2,
  284: 18.8,
  285: 18.9,
  286: 19.1,
  287: 19.3,
  288: 19.5,
  289: 19.6,
  292: 20.3,
  294: 20.8,
  296: 21.4,
  297: 21.7,
  299: 22.2,
  301: 22.8,
  302: 23.1,
  304: 23.6,
  306: 24.2,
  309: 25.0,
  312: 25.8,
  313: 26.1,
  314: 26.4,
  317: 27.2,
  319: 27.8,
  321: 28.3,
  322: 28.6,
  324: 29.2,
  326: 29.7,
  327: 30.0,
  329: 30.7,
  334: 32.3,
  337: 33.3,
  342: 35.0,
  344: 35.7,
  346: 36.3,
  347: 36.7,
  349: 37.3,
  354: 39.0,
  359: 40.7,
  362: 41.8,
  371: 45.0,
  372: 45.4,
  374: 46.1,
  387: 50.7,
  399: 54.8,
};

export function nomogramPoints(input: NomogramInput): number {
  let points = 0;
  if (input.sex === 'female') points += POINTS.sexFemale;
  if (input.location === 'acd') points += POINTS.locationAcD;
  else if (input.location === 'srb') points += POINTS.locationSRb;
  else if (input.location === 'rsra') points += POINTS.locationRsRa;
  if (input.grade === 'g2') points += POINTS.gradeG2;
  else if (input.grade === 'g3') points += POINTS.gradeG3;
  if (input.lvi === 'positive') points += POINTS.lviPositive;
  if (input.smDepth === 'sm1000to1999') points += POINTS.sm1000to1999;
  else if (input.smDepth === 'sm2000plus') points += POINTS.sm2000plus;
  if (input.budding === 'bd23') points += POINTS.buddingBd23;
  return points;
}

export function probabilityFromPoints(points: number): number {
  const exact = OFFICIAL_PROBABILITY_BY_POINTS[points];
  if (exact != null) return exact;

  const keys = Object.keys(OFFICIAL_PROBABILITY_BY_POINTS).map(Number).sort((a, b) => a - b);
  if (points <= keys[0]) return OFFICIAL_PROBABILITY_BY_POINTS[keys[0]];
  if (points >= keys[keys.length - 1]) return OFFICIAL_PROBABILITY_BY_POINTS[keys[keys.length - 1]];

  let lower = keys[0];
  let upper = keys[keys.length - 1];
  for (const key of keys) {
    if (key < points) lower = key;
    if (key > points) {
      upper = key;
      break;
    }
  }
  const lo = OFFICIAL_PROBABILITY_BY_POINTS[lower];
  const hi = OFFICIAL_PROBABILITY_BY_POINTS[upper];
  const t = (points - lower) / (upper - lower);
  return Math.round((lo + (hi - lo) * t) * 10) / 10;
}

/**
 * Kajiwara / JSCCR 大腸T1 LNM予測ノモグラム。
 * 公式計算機と同じ整数点と確率表を使う。戻り値はパーセント（小数第1位）。
 */
export function predictLnmProbability(input: NomogramInput): number {
  return probabilityFromPoints(nomogramPoints(input));
}

export function computeKajiwara(input: NomogramInput): NomogramResult {
  const points = nomogramPoints(input);
  return {
    points,
    probability: probabilityFromPoints(points),
  };
}

export function interpretLnmProbability(probability: number): {
  interpretation: string;
  severity: 'none' | 'moderate' | 'severe';
  details: string[];
} {
  if (probability < 5) {
    return {
      interpretation: '低リスク',
      severity: 'none',
      details: ['リンパ節転移リスクは 5% 未満です。', '経過観察も選択肢です。'],
    };
  }
  if (probability < 15) {
    return {
      interpretation: '中等度リスク',
      severity: 'moderate',
      details: ['リンパ節転移リスクは 5–15% です。', '追加外科切除を慎重に検討してください。'],
    };
  }
  return {
    interpretation: '高リスク',
    severity: 'severe',
    details: ['リンパ節転移リスクは 15% 以上です。', '追加腸切除＋リンパ節郭清を強く検討してください。'],
  };
}

const SEX_BY_VALUE: NomogramSex[] = ['male', 'female'];
const LOCATION_BY_VALUE: NomogramLocation[] = ['transverse', 'acd', 'srb', 'rsra'];
const GRADE_BY_VALUE: NomogramGrade[] = ['g1', 'g2', 'g3'];
const LVI_BY_VALUE: NomogramLvi[] = ['negative', 'positive'];
const SM_BY_VALUE: NomogramSmDepth[] = ['lt1000', 'sm1000to1999', 'sm2000plus'];
const BUDDING_BY_VALUE: NomogramBudding[] = ['bd1', 'bd23'];

export function valuesToNomogramInput(values: Record<string, number>): NomogramInput {
  return {
    sex: SEX_BY_VALUE[values.sex] ?? 'male',
    location: LOCATION_BY_VALUE[values.location] ?? 'transverse',
    grade: GRADE_BY_VALUE[values.grade] ?? 'g1',
    lvi: LVI_BY_VALUE[values.lvi] ?? 'negative',
    smDepth: SM_BY_VALUE[values.smDepth] ?? 'lt1000',
    budding: BUDDING_BY_VALUE[values.budding] ?? 'bd1',
  };
}
