export type ScoreCategory = 't1-colorectal' | 'gastric';

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
  't1-colorectal': '大腸T1癌',
  gastric: '早期胃癌',
};

export const CATEGORY_ORDER: ScoreCategory[] = ['t1-colorectal', 'gastric'];
