export type ScoreCategory =
  | 'screening'
  | 'classification'
  | 't1-colorectal'
  | 'prep'
  | 'gastric'
  | 'gastritis'
  | 'bleeding';

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
  displayMode?: 'points' | 'probability' | 'classification';
  probability?: number;
  classificationLabel?: string;
};

export type ScoreDefinition = {
  id: string;
  name: string;
  shortName: string;
  category: ScoreCategory;
  categoryLabel: string;
  description: string;
  fields: ScoreField[];
  compute: (values: Record<string, number>) => ScoreResult;
  reference?: string;
};

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
