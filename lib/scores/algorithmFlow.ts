import type {
  AlgorithmFlow,
  AlgorithmMapNode,
  AlgorithmResult,
  AlgorithmStep,
  ClassificationEntry,
} from '../../types/score';

export type AlgorithmWalk = {
  currentStep: AlgorithmStep | null;
  result: AlgorithmResult | null;
  path: Array<{ stepId: string; optionId: string }>;
};

export function walkAlgorithmFlow(
  flow: AlgorithmFlow,
  answers: Record<string, string>,
): AlgorithmWalk {
  const path: AlgorithmWalk['path'] = [];
  let id = flow.start;
  const seen = new Set<string>();

  while (id && flow.steps[id]) {
    if (seen.has(id)) {
      return { currentStep: flow.steps[id], result: null, path };
    }
    seen.add(id);
    const step = flow.steps[id];
    const optionId = answers[id];
    if (!optionId) {
      return { currentStep: step, result: null, path };
    }
    const option = step.options.find((item) => item.id === optionId);
    if (!option) {
      return { currentStep: step, result: null, path };
    }
    path.push({ stepId: id, optionId });
    id = option.next;
  }

  return {
    currentStep: null,
    result: flow.results[id] ?? null,
    path,
  };
}

export function applyAlgorithmAnswer(
  flow: AlgorithmFlow,
  answers: Record<string, string>,
  stepId: string,
  optionId: string,
): Record<string, string> {
  const next = { ...answers, [stepId]: optionId };
  const kept: Record<string, string> = {};
  let id = flow.start;
  const seen = new Set<string>();

  while (id && flow.steps[id] && next[id] && !seen.has(id)) {
    seen.add(id);
    const step = flow.steps[id];
    const chosen = step.options.find((item) => item.id === next[id]);
    if (!chosen) break;
    kept[id] = chosen.id;
    id = chosen.next;
  }

  return kept;
}

export function isMapNodeOnPath(
  node: AlgorithmMapNode,
  walk: AlgorithmWalk,
  answers: Record<string, string>,
): boolean {
  if (node.resultId) {
    return walk.result?.id === node.resultId;
  }
  if (node.stepId && node.optionId) {
    return answers[node.stepId] === node.optionId;
  }
  if (node.stepId && walk.currentStep?.id === node.stepId) {
    return true;
  }
  return (node.children ?? []).some((child) => isMapNodeOnPath(child, walk, answers));
}

export function isMapNodeCurrent(node: AlgorithmMapNode, walk: AlgorithmWalk): boolean {
  return Boolean(node.stepId && walk.currentStep?.id === node.stepId && node.optionId);
}

export function findEntryForResult(
  entries: ClassificationEntry[],
  result: AlgorithmResult | null,
): ClassificationEntry | undefined {
  if (!result) return undefined;
  return entries.find((entry) => entry.label === result.entryLabel);
}
