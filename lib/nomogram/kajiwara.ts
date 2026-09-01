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

/**
 * Kajiwara 2023 多変量ロジスティックの切片と係数。
 * 論文 Table 2 は丸めた OR のみ。切片は本文になく、モデル係数を使う。
 * 参照カテゴリ: 男性, 横行結腸 T, G1, LVI−, SM<1000μm, BD1。
 * G3 は低分化・粘液癌・印環細胞癌。簇出は BD2/3 をひとまとめ。
 */
export const INTERCEPT = -5.656011847;

export const COEFFICIENTS = {
  sexFemale: 0.43559126,
  locationAcD: 0.553854589,
  locationSRb: 0.777513285,
  locationRsRa: 0.951804316,
  gradeG2: 0.548365808,
  gradeG3: 1.282145115,
  lviPositive: 1.113736937,
  sm1000to1999: 1.099572355,
  sm2000plus: 1.466372175,
  buddingBd23: 0.659015203,
} as const;

export function nomogramLogit(input: NomogramInput): number {
  let logit = INTERCEPT;

  if (input.sex === 'female') logit += COEFFICIENTS.sexFemale;

  if (input.location === 'acd') logit += COEFFICIENTS.locationAcD;
  else if (input.location === 'srb') logit += COEFFICIENTS.locationSRb;
  else if (input.location === 'rsra') logit += COEFFICIENTS.locationRsRa;

  if (input.grade === 'g2') logit += COEFFICIENTS.gradeG2;
  else if (input.grade === 'g3') logit += COEFFICIENTS.gradeG3;

  if (input.lvi === 'positive') logit += COEFFICIENTS.lviPositive;

  if (input.smDepth === 'sm1000to1999') logit += COEFFICIENTS.sm1000to1999;
  else if (input.smDepth === 'sm2000plus') logit += COEFFICIENTS.sm2000plus;

  if (input.budding === 'bd23') logit += COEFFICIENTS.buddingBd23;

  return logit;
}

/**
 * Kajiwara / JSCCR 大腸T1 LNM予測ノモグラム。
 * 戻り値はパーセント（小数第1位、例: 12.3）。
 */
export function predictLnmProbability(input: NomogramInput): number {
  const probability = 1 / (1 + Math.exp(-nomogramLogit(input)));
  return Math.round(probability * 1000) / 10;
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
