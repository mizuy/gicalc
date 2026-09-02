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
  reference?: string;
  /** PubMed PMID、または PubMed 上の URL（未収載論文は検索 URL） */
  pubmed?: string;
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

export type ClassificationFigure = {
  src: string;
  alt: string;
  caption: string;
  source: string;
  doi?: string;
  pubmed?: string;
  note: string;
  aspectRatio: number;
};

export type ClassificationDefinition = ToolBase & {
  kind: 'classification';
  /** 原著の定義文。画面では日本語コメントの前に出す */
  originalLead?: string;
  entries: ClassificationEntry[];
  figures?: ClassificationFigure[];
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
