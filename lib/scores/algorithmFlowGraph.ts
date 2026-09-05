import dagre from '@dagrejs/dagre';

import type { AlgorithmMapNode } from '../../types/score';

export type FlowGraphNode = {
  id: string;
  label: string;
  mapNodeId: string;
  stepId?: string;
  optionId?: string;
  resultId?: string;
  /** map ツリー上の深さ（同一 level = 同一 y） */
  level: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type FlowGraphEdge = {
  id: string;
  source: string;
  target: string;
};

const NODE_HEIGHT = 44;
const MIN_NODE_WIDTH = 72;
const MAX_NODE_WIDTH = 220;

function estimateNodeWidth(label: string, compact?: boolean): number {
  const charWidth = compact ? 6.5 : 7.2;
  return Math.min(MAX_NODE_WIDTH, Math.max(MIN_NODE_WIDTH, Math.ceil(label.length * charWidth) + 24));
}

function layoutWithDagre(
  nodes: Omit<FlowGraphNode, 'x' | 'y' | 'width' | 'height'>[],
  edges: FlowGraphEdge[],
  compact?: boolean,
): FlowGraphNode[] {
  const graph = new dagre.graphlib.Graph();
  graph.setDefaultEdgeLabel(() => ({}));
  const ranksep = compact ? 44 : 56;
  graph.setGraph({
    rankdir: 'TB',
    nodesep: compact ? 20 : 28,
    ranksep,
    marginx: compact ? 8 : 16,
    marginy: compact ? 12 : 16,
    ranker: 'tight-tree',
  });

  for (const node of nodes) {
    const width = estimateNodeWidth(node.label, compact);
    graph.setNode(node.id, {
      width,
      height: NODE_HEIGHT,
      rank: node.level,
    });
  }
  for (const edge of edges) {
    graph.setEdge(edge.source, edge.target);
  }

  dagre.layout(graph);

  return nodes.map((node) => {
    const box = graph.node(node.id);
    const width = estimateNodeWidth(node.label, compact);
    return {
      ...node,
      width,
      height: NODE_HEIGHT,
      x: box.x - width / 2,
      y: node.level * (NODE_HEIGHT + ranksep),
    };
  });
}

/** AlgorithmMapNode をノード/エッジに変換し dagre で自動レイアウトする */
export function buildAlgorithmFlowGraph(
  root: AlgorithmMapNode,
  compact?: boolean,
): { nodes: FlowGraphNode[]; edges: FlowGraphEdge[] } {
  const nodeById = new Map<string, Omit<FlowGraphNode, 'x' | 'y' | 'width' | 'height'>>();
  const levels = new Map<string, number>();
  const edges: FlowGraphEdge[] = [];

  const addNode = (id: string, data: Omit<FlowGraphNode, 'x' | 'y' | 'width' | 'height'>) => {
    if (nodeById.has(id)) return;
    nodeById.set(id, data);
  };

  const addEdge = (source: string, target: string) => {
    const edgeId = `${source}->${target}`;
    if (edges.some((edge) => edge.id === edgeId)) return;
    edges.push({ id: edgeId, source, target });
  };

  function walk(node: AlgorithmMapNode, parentId: string | undefined, depth: number) {
    levels.set(node.id, depth);
    addNode(node.id, {
      id: node.id,
      label: node.label,
      mapNodeId: node.id,
      stepId: node.stepId,
      optionId: node.optionId,
      resultId: node.resultId,
      level: depth,
    });
    if (parentId) addEdge(parentId, node.id);

    for (const child of node.children ?? []) {
      walk(child, node.id, depth + 1);
    }

    if (node.outcomeRow) {
      for (const outcome of node.outcomeRow.outcomes) {
        const feedLevel = Math.max(...outcome.feedFrom.map((feedId) => levels.get(feedId) ?? 0));
        const outcomeLevel = feedLevel + 1;
        levels.set(outcome.id, outcomeLevel);
        addNode(outcome.id, {
          id: outcome.id,
          label: outcome.label,
          mapNodeId: outcome.id,
          resultId: outcome.resultId,
          level: outcomeLevel,
        });
        for (const feedId of outcome.feedFrom) {
          addEdge(feedId, outcome.id);
        }
      }
    }
  }

  walk(root, undefined, 0);
  return {
    nodes: layoutWithDagre([...nodeById.values()], edges, compact),
    edges,
  };
}

export function graphDimensions(nodes: FlowGraphNode[]): { width: number; height: number } {
  if (nodes.length === 0) return { width: 320, height: 360 };

  let maxX = 0;
  let maxY = 0;
  for (const node of nodes) {
    maxX = Math.max(maxX, node.x + node.width);
    maxY = Math.max(maxY, node.y + node.height);
  }
  return { width: Math.ceil(maxX + 24), height: Math.ceil(maxY + 24) };
}

/** ツリー用の直交エッジ（smoothstep 風） */
export function buildEdgePath(source: FlowGraphNode, target: FlowGraphNode): string {
  const sx = source.x + source.width / 2;
  const sy = source.y + source.height;
  const tx = target.x + target.width / 2;
  const ty = target.y;
  const midY = sy + Math.max(12, (ty - sy) / 2);
  return `M ${sx} ${sy} L ${sx} ${midY} L ${tx} ${midY} L ${tx} ${ty}`;
}
