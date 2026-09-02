import type { ScoreField } from '../../types/score';

/** 各項目で点数が最も低い選択肢。同点なら定義順の先頭。 */
export function lowestFieldValues(fields: ScoreField[]): Record<string, number> {
  const values: Record<string, number> = {};
  for (const field of fields) {
    const lowest = field.options.reduce((current, option) =>
      option.value < current.value ? option : current,
    );
    values[field.id] = lowest.value;
  }
  return values;
}
