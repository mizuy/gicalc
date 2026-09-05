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

export type AlgorithmNodeFlags = {
  onPath: boolean;
  current: boolean;
  isResult: boolean;
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

export function buildAlgorithmNodeFlags(
  root: AlgorithmMapNode,
  walk: AlgorithmWalk,
  answers: Record<string, string>,
): Map<string, AlgorithmNodeFlags> {
  const flags = new Map<string, AlgorithmNodeFlags>();

  function visit(node: AlgorithmMapNode): boolean {
    const isResult = Boolean(node.resultId && walk.result?.id === node.resultId);
    const current = isMapNodeCurrent(node, walk);

    let onPath: boolean;
    if (node.resultId) {
      onPath = isResult;
    } else if (node.stepId && node.optionId) {
      onPath = answers[node.stepId] === node.optionId;
    } else if (node.stepId && walk.currentStep?.id === node.stepId) {
      onPath = true;
    } else {
      onPath = false;
    }

    for (const child of node.children ?? []) {
      if (visit(child)) onPath = true;
    }

    if (node.mergeResult) {
      const mergeOnPath = walk.result?.id === node.mergeResult.resultId;
      flags.set(node.mergeResult.id, {
        onPath: mergeOnPath,
        current: false,
        isResult: mergeOnPath,
      });
      if (mergeOnPath) onPath = true;
    }

    flags.set(node.id, { onPath, current, isResult });
    return onPath;
  }

  visit(root);
  return flags;
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

/** mergeResult.feedFrom に含まれる各ノードの、親からの深さ（1 始まり） */
export function mergeFeedDepths(
  node: AlgorithmMapNode,
  feedFrom: string[],
  depth = 0,
): Map<string, number> {
  const depths = new Map<string, number>();
  const walk = (current: AlgorithmMapNode, currentDepth: number) => {
    if (feedFrom.includes(current.id)) {
      depths.set(current.id, currentDepth);
    }
    for (const child of current.children ?? []) {
      walk(child, currentDepth + 1);
    }
  };
  for (const child of node.children ?? []) {
    walk(child, depth + 1);
  }
  return depths;
}
