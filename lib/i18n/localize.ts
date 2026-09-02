import type {
  CalculatorDefinition,
  ClassificationDefinition,
  ScoreDefinition,
  ScoreField,
  ScoreResult,
} from '../../types/score';
import { isClassification } from '../../types/score';
import { localizeResult as localizeComputedResult } from './results';
import { SCORE_EN } from './scoreCopy';
import { UI } from './ui';
import type { Locale } from './types';

export function localizeResult(result: ScoreResult, locale: Locale): ScoreResult {
  return localizeComputedResult(result, locale);
}

function localizeFields(score: CalculatorDefinition, locale: Locale): ScoreField[] {
  if (locale === 'ja') return score.fields;
  const copy = SCORE_EN[score.id];
  if (!copy?.fields) return score.fields;

  return score.fields.map((field) => {
    const fieldCopy = copy.fields?.[field.id];
    if (!fieldCopy) return field;
    return {
      ...field,
      label: fieldCopy.label,
      description: fieldCopy.description ?? field.description,
      options: field.options.map((option, index) => {
        const optionCopy = fieldCopy.options[index];
        if (!optionCopy) return option;
        return {
          ...option,
          label: optionCopy.label,
          description: optionCopy.description ?? option.description,
        };
      }),
    };
  });
}

export function localizeScore<T extends ScoreDefinition>(score: T, locale: Locale): T {
  const categoryLabel = UI[locale].category[score.category];
  if (locale === 'ja') {
    return { ...score, categoryLabel };
  }

  const copy = SCORE_EN[score.id];
  if (!copy) {
    return { ...score, categoryLabel };
  }

  if (isClassification(score)) {
    const localized: ClassificationDefinition = {
      ...score,
      name: copy.name,
      shortName: copy.shortName ?? score.shortName,
      description: copy.description,
      categoryLabel,
      officialLinkLabel: copy.officialLinkLabel ?? score.officialLinkLabel,
      note: copy.note ?? score.note,
      entries: score.entries.map((entry) => ({
        ...entry,
        meaning: copy.meanings?.[entry.label] ?? entry.meaning,
        group: entry.group ? (copy.groups?.[entry.group] ?? entry.group) : entry.group,
        comment: entry.comment ? (copy.comments?.[entry.label] ?? entry.comment) : entry.comment,
      })),
      figures: score.figures?.map((figure, index) => ({
        ...figure,
        note: copy.figureNotes?.[index] ?? figure.note,
      })),
    };
    return localized as T;
  }

  const calculator = score as CalculatorDefinition;
  const localized: CalculatorDefinition = {
    ...calculator,
    name: copy.name,
    shortName: copy.shortName ?? calculator.shortName,
    description: copy.description,
    categoryLabel,
    officialLinkLabel: copy.officialLinkLabel ?? calculator.officialLinkLabel,
    note: copy.note ?? calculator.note,
    fields: localizeFields(calculator, locale),
  };
  return localized as T;
}
