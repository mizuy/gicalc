export type ScoreOrgan = 'esophagus' | 'stomach' | 'colorectum' | 'bleeding';

export type ScoreCategory =
  | 'screening'
  | 'classification'
  | 't1-colorectal'
  | 'prep'
  | 'gastric'
  | 'gastritis'
  | 'bleeding';

/** ツールの性質。画面の小さなバッジ。JNET と MESDA-G は混ぜない */
export type ToolKind = 'classification' | 'score' | 'prediction' | 'algorithm';

export type ScoreOption = {
  value: number;
  label: string;
  description?: string;
};

export type ScoreField = {
  id: string;
  label: string;
  description?: string;
  options: ScoreOption[];
};

export type ScoreSeverity = 'none' | 'mild' | 'moderate' | 'severe';

export type ScoreResult = {
  total: number;
  maxScore?: number;
  interpretation: string;
  severity?: ScoreSeverity;
  details?: string[];
  displayMode?: 'points' | 'probability';
  probability?: number;
  /** Kajiwara nomogram の合計点（SM≥2000 = 100） */
  nomogramPoints?: number;
};

export type ClassificationFigure = {
  src: string;
  alt: string;
  caption: string;
  source: string;
  doi?: string;
  pubmed?: string;
  /** 図の再利用ライセンス（CC のときだけ書く） */
  license?: string;
  licenseUrl?: string;
  note: string;
  aspectRatio: number;
};

type ToolBase = {
  id: string;
  name: string;
  shortName: string;
  organ: ScoreOrgan;
  category: ScoreCategory;
  categoryLabel: string;
  description: string;
  /** 省略時は分類→classification、計算→score */
  toolKind?: ToolKind;
  /** 日本で考案・策定されたツール。国際分類（Paris / NICE など）には付けない */
  developedInJapan?: boolean;
  reference?: string;
  /** PubMed PMID、または PubMed 上の URL（未収載論文は検索 URL） */
  pubmed?: string;
  /** Creative Commons など、確認できた再利用ライセンス */
  license?: string;
  licenseUrl?: string;
  /** 公式計算機など、PubMed 以外の外部リンク */
  officialUrl?: string;
  officialLinkLabel?: string;
  /** 画面に出す注意。英語は SCORE_EN.note で上書き */
  note?: string;
  figures?: ClassificationFigure[];
};

export type ClassificationRow = {
  heading: string;
  text: string;
};

export type ClassificationEntry = {
  label: string;
  meaning: string;
  /** 原著の定義（英語または原著どおりの文言） */
  rows: ClassificationRow[];
  /** 必要なときだけ付ける日本語コメント */
  comment?: string;
  group?: string;
  severity?: ScoreSeverity;
};

export type CalculatorDefinition = ToolBase & {
  kind?: 'calculator';
  fields: ScoreField[];
  compute: (values: Record<string, number>) => ScoreResult;
};

export type ClassificationDefinition = ToolBase & {
  kind: 'classification';
  /** 原著の定義文。画面では日本語コメントの前に出す */
  originalLead?: string;
  entries: ClassificationEntry[];
};

export type ScoreDefinition = CalculatorDefinition | ClassificationDefinition;

export function isClassification(tool: ScoreDefinition): tool is ClassificationDefinition {
  return tool.kind === 'classification';
}

export function getToolKind(tool: ScoreDefinition): ToolKind {
  if (tool.toolKind) return tool.toolKind;
  if (isClassification(tool)) return 'classification';
  return 'score';
}

export const TOOL_KIND_LABELS: Record<ToolKind, string> = {
  classification: 'CLASSIFICATION',
  score: 'SCORE',
  prediction: 'PREDICTION MODEL',
  algorithm: 'ALGORITHM',
};

export function isJapanDeveloped(tool: ScoreDefinition): boolean {
  return tool.developedInJapan === true;
}

export const ORGAN_LABELS: Record<ScoreOrgan, string> = {
  esophagus: '食道',
  stomach: '胃',
  colorectum: '大腸',
  bleeding: '出血',
};

export const ORGAN_ORDER: ScoreOrgan[] = ['esophagus', 'stomach', 'colorectum', 'bleeding'];

export const CATEGORY_LABELS: Record<ScoreCategory, string> = {
  screening: '大腸がん検診',
  classification: '内視鏡分類',
  't1-colorectal': '大腸T1癌',
  prep: '腸管前処置',
  gastric: '早期胃癌',
  gastritis: '胃炎・胃癌リスク',
  bleeding: '消化管出血',
};

export const CATEGORY_ORDER: ScoreCategory[] = [
  'screening',
  'classification',
  't1-colorectal',
  'prep',
  'gastric',
  'gastritis',
  'bleeding',
];
