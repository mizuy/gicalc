import type {
  AlgorithmFlow,
  AlgorithmMapNode,
  CalculatorDefinition,
  ClassificationDefinition,
  OriginalLocale,
  ScoreDefinition,
  ScoreField,
  ScoreResult,
} from '../../types/score';
import { isClassification } from '../../types/score';
import { localizeResult as localizeComputedResult } from './results';
import { SCORE_EN, type FlowCopy, type ScoreCopy } from './scoreCopy';
import { UI } from './ui';
import type { Locale } from './types';

const localizeScoreCache = new Map<string, ScoreDefinition>();

function localizeMapNode(node: AlgorithmMapNode, labels?: Record<string, string>): AlgorithmMapNode {
  return {
    ...node,
    label: labels?.[node.id] ?? node.label,
    outcomeRow: node.outcomeRow
      ? {
          outcomes: node.outcomeRow.outcomes.map((outcome) => ({
            ...outcome,
            label: labels?.[outcome.id] ?? outcome.label,
          })),
        }
      : undefined,
    children: node.children?.map((child) => localizeMapNode(child, labels)),
  };
}

function localizeFlow(flow: AlgorithmFlow, copy?: FlowCopy): AlgorithmFlow {
  if (!copy) return flow;
  return {
    ...flow,
    title: copy.title,
    steps: Object.fromEntries(
      Object.entries(flow.steps).map(([id, step]) => {
        const stepCopy = copy.steps[id];
        return [
          id,
          {
            ...step,
            prompt: stepCopy?.prompt ?? step.prompt,
            hint: stepCopy?.hint ?? step.hint,
            options: step.options.map((option) => ({
              ...option,
              label: stepCopy?.options[option.id] ?? option.label,
            })),
          },
        ];
      }),
    ),
    map: localizeMapNode(flow.map, copy.map),
  };
}

export function classificationOriginalLocale(score: ClassificationDefinition): OriginalLocale {
  return score.originalLocale ?? 'en';
}

function applyEnglishClassificationBody(
  score: ClassificationDefinition,
  copy: ScoreCopy | undefined,
  options: { translateComments: boolean },
): Pick<ClassificationDefinition, 'description' | 'entries' | 'flow'> {
  if (!copy) {
    return {
      description: score.description,
      entries: score.entries,
      flow: score.flow,
    };
  }

  return {
    description: copy.description,
    entries: score.entries.map((entry) => ({
      ...entry,
      meaning: copy.meanings?.[entry.label] ?? entry.meaning,
      group: entry.group ? (copy.groups?.[entry.group] ?? entry.group) : entry.group,
      comment:
        options.translateComments && entry.comment
          ? (copy.comments?.[entry.label] ?? entry.comment)
          : entry.comment,
      figures: entry.figures?.map((figure, index) => ({
        ...figure,
        note: options.translateComments
          ? (copy.entryFigureNotes?.[entry.label]?.[index] ?? figure.note)
          : figure.note,
      })),
    })),
    flow: score.flow ? localizeFlow(score.flow, copy.flow) : score.flow,
  };
}

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

function localizeClassificationDefinition(
  score: ClassificationDefinition,
  locale: Locale,
): ClassificationDefinition {
  const categoryLabel = UI[locale].category[score.category];
  const copy = SCORE_EN[score.id];
  const useJapaneseOriginal = locale === 'ja' && classificationOriginalLocale(score) === 'ja';

  if (useJapaneseOriginal) {
    return { ...score, categoryLabel };
  }

  const englishBody = applyEnglishClassificationBody(score, copy, {
    translateComments: !useJapaneseOriginal && locale === 'en',
  });

  if (locale === 'ja') {
    return {
      ...score,
      ...englishBody,
      categoryLabel,
    };
  }

  return {
    ...score,
    name: copy?.name ?? score.name,
    shortName: copy?.shortName ?? score.shortName,
    description: englishBody.description,
    categoryLabel,
    officialLinkLabel: copy?.officialLinkLabel ?? score.officialLinkLabel,
    note: copy?.note ?? score.note,
    entries: englishBody.entries,
    figures: score.figures?.map((figure, index) => ({
      ...figure,
      note: copy?.figureNotes?.[index] ?? figure.note,
    })),
    flow: englishBody.flow,
  };
}

function localizeScoreUncached<T extends ScoreDefinition>(score: T, locale: Locale): T {
  if (isClassification(score)) {
    return localizeClassificationDefinition(score, locale) as T;
  }

  const categoryLabel = UI[locale].category[score.category];
  if (locale === 'ja') {
    return { ...score, categoryLabel } as T;
  }

  const copy = SCORE_EN[score.id];
  if (!copy) {
    return { ...score, categoryLabel } as T;
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
    figures: calculator.figures?.map((figure, index) => ({
      ...figure,
      note: copy.figureNotes?.[index] ?? figure.note,
    })),
  };
  return localized as T;
}

export function localizeScore<T extends ScoreDefinition>(score: T, locale: Locale): T {
  const cacheKey = `${score.id}:${locale}`;
  const cached = localizeScoreCache.get(cacheKey);
  if (cached) return cached as T;

  const localized = localizeScoreUncached(score, locale);
  localizeScoreCache.set(cacheKey, localized);
  return localized;
}
