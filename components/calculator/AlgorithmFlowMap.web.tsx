import { useMemo } from 'react';

import { useThemeColor } from '@/components/Themed';
import {
  buildAlgorithmFlowGraph,
  buildEdgePath,
  graphDimensions,
  type FlowGraphNode,
} from '@/lib/scores/algorithmFlowGraph';
import type { AlgorithmNodeFlags } from '@/lib/scores/algorithmFlow';
import type { AlgorithmFlowMapProps } from '@/components/calculator/AlgorithmFlowMapTree';

/** Web: dagre 自動レイアウト + SVG エッジ（React Flow 不要） */
export function AlgorithmFlowMap({ flow, nodeFlags, onChoose }: AlgorithmFlowMapProps) {
  const tint = useThemeColor({}, 'tint');
  const border = useThemeColor({}, 'border');
  const surface = useThemeColor({}, 'surface');
  const textSecondary = useThemeColor({}, 'textSecondary');
  const connector = '#6B8A8C';
  const compact = flow.mapLayout === 'compact';

  const graph = useMemo(() => {
    const built = buildAlgorithmFlowGraph(flow.map, compact);
    const size = graphDimensions(built.nodes);
    const nodeById = new Map(built.nodes.map((node) => [node.id, node]));
    return { ...built, nodeById, size };
  }, [compact, flow.map]);

  if (graph.nodes.length === 0) return null;

  return (
    <div
      style={{
        width: '100%',
        overflowX: compact ? 'hidden' : 'auto',
        overflowY: 'hidden',
      }}>
      <svg
        width={compact ? '100%' : graph.size.width}
        height={graph.size.height}
        viewBox={`0 0 ${graph.size.width} ${graph.size.height}`}
        style={{ display: 'block', maxWidth: '100%' }}
        role="img"
        aria-label={flow.title}>
        {graph.edges.map((edge) => {
          const source = graph.nodeById.get(edge.source);
          const target = graph.nodeById.get(edge.target);
          if (!source || !target) return null;
          const sourceOnPath = nodeFlags.get(edge.source)?.onPath ?? false;
          const targetOnPath = nodeFlags.get(edge.target)?.onPath ?? false;
          const active = sourceOnPath && targetOnPath;
          return (
            <path
              key={edge.id}
              d={buildEdgePath(source, target)}
              fill="none"
              stroke={active ? tint : connector}
              strokeWidth={active ? 2.5 : 2}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          );
        })}

        {graph.nodes.map((node) => (
          <FlowGraphNodeView
            key={node.id}
            node={node}
            nodeFlags={nodeFlags}
            onChoose={onChoose}
            tint={tint}
            border={border}
            surface={surface}
            textSecondary={textSecondary}
            compact={compact}
          />
        ))}
      </svg>
    </div>
  );
}

function FlowGraphNodeView({
  node,
  nodeFlags,
  onChoose,
  tint,
  border,
  surface,
  textSecondary,
  compact,
}: {
  node: FlowGraphNode;
  nodeFlags: Map<string, AlgorithmNodeFlags>;
  onChoose: (stepId: string, optionId: string) => void;
  tint: string;
  border: string;
  surface: string;
  textSecondary: string;
  compact: boolean;
}) {
  const flags = nodeFlags.get(node.id) ?? { onPath: false, current: false, isResult: false };
  const selected = flags.onPath || flags.isResult;
  const canPress = Boolean(node.stepId && node.optionId);

  return (
    <foreignObject x={node.x} y={node.y} width={node.width} height={node.height}>
      <div
        style={{
          boxSizing: 'border-box',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <div
          role={canPress ? 'button' : undefined}
          tabIndex={canPress ? 0 : undefined}
          onClick={canPress ? () => onChoose(node.stepId!, node.optionId!) : undefined}
          onKeyDown={
            canPress
              ? (event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    onChoose(node.stepId!, node.optionId!);
                  }
                }
              : undefined
          }
          style={{
            boxSizing: 'border-box',
            borderRadius: compact ? 8 : 10,
            padding: compact ? '6px 8px' : '8px 10px',
            width: '100%',
            textAlign: 'center',
            backgroundColor: selected ? `${tint}18` : surface,
            border: `${flags.current || selected ? 2 : 1}px solid ${flags.current ? tint : selected ? tint : border}`,
            cursor: canPress ? 'pointer' : 'default',
            fontSize: compact ? 10 : 12,
            lineHeight: compact ? '13px' : '16px',
            fontWeight: selected || flags.current ? 800 : 600,
            color: selected || flags.current ? tint : textSecondary,
          }}>
          {node.label}
        </div>
      </div>
    </foreignObject>
  );
}
