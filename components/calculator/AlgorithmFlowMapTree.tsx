import { Pressable, StyleSheet, View } from 'react-native';

import { Text, useThemeColor } from '@/components/Themed';
import { outcomeFeedIds, type AlgorithmNodeFlags } from '@/lib/scores/algorithmFlow';
import {
  type AlgorithmFlow,
  type AlgorithmMapNode,
  type AlgorithmMapOutcomeRow,
} from '@/types/score';

export type AlgorithmFlowMapProps = {
  flow: AlgorithmFlow;
  nodeFlags: Map<string, AlgorithmNodeFlags>;
  onChoose: (stepId: string, optionId: string) => void;
};

function FlowNodeChip({
  node,
  onPath,
  current,
  isResult,
  onPress,
  compact,
  wide,
}: {
  node: Pick<AlgorithmMapNode, 'label'>;
  onPath: boolean;
  current: boolean;
  isResult: boolean;
  onPress?: () => void;
  compact?: boolean;
  wide?: boolean;
}) {
  const tint = useThemeColor({}, 'tint');
  const border = useThemeColor({}, 'border');
  const surface = useThemeColor({}, 'surface');
  const textSecondary = useThemeColor({}, 'textSecondary');
  const selected = onPath || isResult;
  const pressable = Boolean(onPress);

  const content = (
    <View
      style={[
        styles.chip,
        compact ? styles.chipCompact : null,
        wide ? styles.chipWide : null,
        {
          backgroundColor: selected ? `${tint}18` : surface,
          borderColor: current ? tint : selected ? tint : border,
          borderWidth: current || selected ? 2 : 1,
        },
      ]}>
      <Text
        style={[
          styles.chipText,
          compact ? styles.chipTextCompact : null,
          { color: selected || current ? tint : textSecondary, fontWeight: selected || current ? '800' : '600' },
        ]}>
        {node.label}
      </Text>
    </View>
  );

  if (!pressable) return content;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}>
      {content}
    </Pressable>
  );
}

function FlowOutcomeConnectors({
  outcomeRow,
  nodeFlags,
  compact,
}: {
  outcomeRow: AlgorithmMapOutcomeRow;
  nodeFlags: Map<string, AlgorithmNodeFlags>;
  compact?: boolean;
}) {
  const tint = useThemeColor({}, 'tint');
  const connector = '#6B8A8C';
  const noncancer = outcomeRow.outcomes.find((outcome) => outcome.resultId === 'noncancer');
  const egc = outcomeRow.outcomes.find((outcome) => outcome.resultId === 'egc');
  if (!noncancer || !egc) return null;

  const absentOnPath = nodeFlags.get('absent')?.onPath ?? false;
  const regularOnPath = nodeFlags.get('regular')?.onPath ?? false;
  const irregularOnPath = nodeFlags.get('irregular')?.onPath ?? false;
  const ncFlags = nodeFlags.get(noncancer.id) ?? { onPath: false, isResult: false };
  const egcFlags = nodeFlags.get(egc.id) ?? { onPath: false, isResult: false };
  const ncActive = absentOnPath || regularOnPath || ncFlags.onPath;
  const egcActive = irregularOnPath || egcFlags.onPath;
  const ncColor = ncActive ? tint : connector;
  const egcColor = egcActive ? tint : connector;

  return (
    <View style={styles.outcomeConnectors}>
      <View style={styles.outcomeMergeRow}>
        <View style={[styles.outcomeHalf, styles.outcomeMergeHalf]}>
          <View style={[styles.mergeBarSegment, styles.mergeBarRight, { backgroundColor: ncColor }]} />
        </View>
        <View style={[styles.outcomeHalf, styles.outcomeNested]}>
          <View style={styles.outcomeQuarter}>
            <View style={[styles.mergeBarSegment, styles.mergeBarLeft, { backgroundColor: ncColor }]} />
          </View>
          <View style={styles.outcomeQuarter} />
        </View>
      </View>

      <View style={styles.outcomeChipRow}>
        <View style={[styles.outcomeNcAnchor, compact ? styles.outcomeNcAnchorCompact : null]}>
          <View style={[styles.stem, compact ? styles.stemCompact : null, { backgroundColor: ncColor }]} />
          <FlowNodeChip
            node={{ label: noncancer.label }}
            onPath={ncFlags.onPath}
            current={false}
            isResult={ncFlags.isResult}
            compact={compact}
            wide
          />
        </View>
        <View style={styles.outcomeChipSpacer} />
        <View style={styles.outcomeEgcCol}>
          <View style={[styles.stem, compact ? styles.stemCompact : null, { backgroundColor: egcColor }]} />
          <FlowNodeChip
            node={{ label: egc.label }}
            onPath={egcFlags.onPath}
            current={false}
            isResult={egcFlags.isResult}
            compact={compact}
          />
        </View>
      </View>
    </View>
  );
}

export function AlgorithmFlowMapTree({
  node,
  nodeFlags,
  onChoose,
  compact,
  feedIds,
}: {
  node: AlgorithmMapNode;
  nodeFlags: Map<string, AlgorithmNodeFlags>;
  onChoose: (stepId: string, optionId: string) => void;
  compact?: boolean;
  feedIds?: Set<string>;
}) {
  const flags = nodeFlags.get(node.id) ?? { onPath: false, current: false, isResult: false };
  const { onPath, current, isResult } = flags;
  const canPress = Boolean(node.stepId && node.optionId);
  const tint = useThemeColor({}, 'tint');
  const connector = '#6B8A8C';
  const hasChildren = Boolean(node.children?.length);
  const childFeedIds = node.outcomeRow ? outcomeFeedIds(node.outcomeRow) : feedIds;
  const isFeedNode = Boolean(!hasChildren && childFeedIds?.has(node.id));

  return (
    <View style={[styles.tree, compact ? styles.treeCompact : null, isFeedNode ? styles.treeFeedNode : null]}>
      <FlowNodeChip
        node={node}
        onPath={onPath}
        current={current}
        isResult={isResult}
        compact={compact}
        onPress={canPress ? () => onChoose(node.stepId!, node.optionId!) : undefined}
      />
      {isFeedNode ? (
        <View style={[styles.feedOutcomeStem, { backgroundColor: onPath ? tint : connector }]} />
      ) : null}
      {hasChildren ? (
        <View style={styles.treeChildren}>
          <View style={[styles.stem, compact ? styles.stemCompact : null, { backgroundColor: onPath ? tint : connector }]} />
          {node.children!.length > 1 ? (
            <View style={[styles.treeHBarTrack, compact ? styles.treeHBarTrackCompact : null]}>
              <View
                collapsable={false}
                style={[
                  styles.treeHBar,
                  {
                    backgroundColor: connector,
                    borderTopColor: connector,
                    width: node.outcomeRow ? '100%' : `${((node.children!.length - 1) / node.children!.length) * 100}%`,
                  },
                ]}
              />
            </View>
          ) : null}
          <View
            style={[
              styles.treeRow,
              compact ? styles.treeRowCompact : null,
              node.outcomeRow ? styles.treeRowOutcome : null,
            ]}>
            {node.children!.map((child) => {
              const childOnPath = nodeFlags.get(child.id)?.onPath ?? false;
              return (
                <View
                  key={child.id}
                  style={[
                    styles.treeBranch,
                    compact ? styles.treeBranchCompact : null,
                    node.outcomeRow ? styles.treeBranchOutcome : null,
                  ]}>
                  {node.outcomeRow ? <View style={styles.treeBranchSpacer} /> : null}
                  <View
                    style={[styles.stem, compact ? styles.stemCompact : null, { backgroundColor: childOnPath ? tint : connector }]}
                  />
                  <AlgorithmFlowMapTree
                    node={child}
                    nodeFlags={nodeFlags}
                    onChoose={onChoose}
                    compact={compact}
                    feedIds={childFeedIds}
                  />
                </View>
              );
            })}
          </View>
          {node.outcomeRow ? (
            <FlowOutcomeConnectors outcomeRow={node.outcomeRow} nodeFlags={nodeFlags} compact={compact} />
          ) : null}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  tree: {
    alignItems: 'center',
    width: '100%',
  },
  treeCompact: {
    alignItems: 'stretch',
  },
  treeFeedNode: {
    width: '100%',
    alignItems: 'center',
  },
  feedOutcomeStem: {
    width: 3,
    height: 12,
    alignSelf: 'center',
  },
  treeChildren: {
    alignItems: 'center',
    width: '100%',
  },
  treeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
  },
  treeRowCompact: {
    gap: 4,
  },
  treeRowOutcome: {
    alignItems: 'stretch',
    gap: 0,
  },
  treeBranch: {
    flex: 1,
    alignItems: 'center',
    minWidth: 96,
  },
  treeBranchCompact: {
    minWidth: 0,
    alignItems: 'stretch',
  },
  treeBranchOutcome: {
    alignItems: 'stretch',
  },
  treeBranchSpacer: {
    flex: 1,
    minHeight: 0,
  },
  treeHBarTrack: {
    width: '100%',
    height: 3,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  treeHBarTrackCompact: {
    paddingHorizontal: 0,
  },
  treeHBar: {
    height: 3,
    minHeight: 3,
    borderTopWidth: 3,
  },
  stem: {
    width: 3,
    height: 16,
  },
  stemCompact: {
    alignSelf: 'center',
    height: 12,
  },
  outcomeConnectors: {
    width: '100%',
  },
  outcomeHalf: {
    flex: 1,
  },
  outcomeNested: {
    flexDirection: 'row',
  },
  outcomeQuarter: {
    flex: 1,
  },
  outcomeMergeRow: {
    flexDirection: 'row',
    width: '100%',
    height: 3,
  },
  outcomeMergeHalf: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  mergeBarSegment: {
    height: 3,
    minHeight: 3,
  },
  mergeBarRight: {
    width: '50%',
  },
  mergeBarLeft: {
    width: '50%',
  },
  outcomeChipRow: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'flex-start',
  },
  outcomeNcAnchor: {
    width: '37.5%',
    marginLeft: '25%',
    alignItems: 'center',
  },
  outcomeNcAnchorCompact: {
    width: '38%',
    marginLeft: '24%',
  },
  outcomeChipSpacer: {
    flex: 1,
  },
  outcomeEgcCol: {
    width: '25%',
    alignItems: 'center',
  },
  chip: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    minWidth: 72,
    alignItems: 'center',
  },
  chipCompact: {
    minWidth: 0,
    width: '100%',
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderRadius: 8,
  },
  chipWide: {
    width: '100%',
    minWidth: 0,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  chipText: {
    fontSize: 12,
    textAlign: 'center',
  },
  chipTextCompact: {
    fontSize: 10,
    lineHeight: 13,
  },
});
