import type {
  AlgorithmFlow,
  AlgorithmMapNode,
  CalculatorDefinition,
  ClassificationDefinition,
  ScoreDefinition,
  ScoreField,
  ScoreResult,
} from '../../types/score';
import { isClassification } from '../../types/score';
import { localizeResult as localizeComputedResult } from './results';
import { SCORE_EN, type FlowCopy } from './scoreCopy';
import { UI } from './ui';
import type { Locale } from './types';

function localizeMapNode(node: AlgorithmMapNode, labels?: Record<string, string>): AlgorithmMapNode {
  return {
    ...node,
    label: labels?.[node.id] ?? node.label,
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
        figures: entry.figures?.map((figure, index) => ({
          ...figure,
          note: copy.entryFigureNotes?.[entry.label]?.[index] ?? figure.note,
        })),
      })),
      figures: score.figures?.map((figure, index) => ({
        ...figure,
        note: copy.figureNotes?.[index] ?? figure.note,
      })),
      flow: score.flow ? localizeFlow(score.flow, copy.flow) : score.flow,
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
    figures: calculator.figures?.map((figure, index) => ({
      ...figure,
      note: copy.figureNotes?.[index] ?? figure.note,
    })),
  };
  return localized as T;
}
