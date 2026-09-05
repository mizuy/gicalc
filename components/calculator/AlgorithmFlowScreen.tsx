import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ScorePageShell } from '@/components/calculator/ScorePageShell';
import { Text, useThemeColor } from '@/components/Themed';
import { SeverityColors } from '@/constants/Colors';
import { useLocale } from '@/lib/i18n';
import {
  applyAlgorithmAnswer,
  buildAlgorithmNodeFlags,
  findEntryForResult,
  outcomeFeedIds,
  walkAlgorithmFlow,
  type AlgorithmNodeFlags,
} from '@/lib/scores/algorithmFlow';
import {
  type AlgorithmFlow,
  type AlgorithmMapNode,
  type AlgorithmMapOutcomeRow,
  type ClassificationDefinition,
  type ClassificationEntry,
} from '@/types/score';

type Props = {
  score: ClassificationDefinition & { flow: AlgorithmFlow };
};

function EntryCard({
  entry,
  emphasized,
  dimmed,
}: {
  entry: ClassificationEntry;
  emphasized?: boolean;
  dimmed?: boolean;
}) {
  const textSecondary = useThemeColor({}, 'textSecondary');
  const surface = useThemeColor({}, 'surface');
  const border = useThemeColor({}, 'border');
  const tint = useThemeColor({}, 'tint');
  const { t } = useLocale();
  const accent = SeverityColors[entry.severity ?? 'none'];

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: surface,
          borderColor: emphasized ? tint : border,
          borderLeftColor: accent,
          opacity: dimmed ? 0.45 : 1,
        },
      ]}>
      <View style={styles.cardHeader}>
        <Text style={styles.entryLabel}>{entry.label}</Text>
        <View style={[styles.badge, { backgroundColor: accent }]}>
          <Text style={styles.badgeText}>{entry.meaning}</Text>
        </View>
      </View>
      {entry.rows.map((row) => (
        <View key={`${entry.label}-${row.heading}`} style={styles.row}>
          <Text style={[styles.rowHeading, { color: textSecondary }]}>{row.heading}</Text>
          <Text style={styles.rowText}>{row.text}</Text>
        </View>
      ))}
      {entry.comment ? (
        <Text style={[styles.comment, { color: textSecondary }]}>
          {t.note}: {entry.comment}
        </Text>
      ) : null}
    </View>
  );
}

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

type OutcomeContext = {
  row: AlgorithmMapOutcomeRow;
  feedIds: Set<string>;
};

function FlowOutcomeSection({
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
    <View style={styles.outcomeSection}>
      <View style={[styles.treeRow, compact ? styles.treeRowCompact : null, styles.outcomeResultRow]}>
        <View style={[styles.treeBranch, compact ? styles.treeBranchCompact : null, styles.outcomeNcPane]}>
          <View style={styles.outcomeNcMergeTrack}>
            <View
              collapsable={false}
              style={[styles.outcomeNcMergeBar, { backgroundColor: ncColor, borderTopColor: ncColor }]}
            />
          </View>
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
        <View style={[styles.treeBranch, compact ? styles.treeBranchCompact : null, styles.outcomeEgcPane]}>
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

function FlowTree({
  node,
  nodeFlags,
  onChoose,
  compact,
  outcomeContext,
}: {
  node: AlgorithmMapNode;
  nodeFlags: Map<string, AlgorithmNodeFlags>;
  onChoose: (stepId: string, optionId: string) => void;
  compact?: boolean;
  outcomeContext?: OutcomeContext;
}) {
  const flags = nodeFlags.get(node.id) ?? { onPath: false, current: false, isResult: false };
  const { onPath, current, isResult } = flags;
  const canPress = Boolean(node.stepId && node.optionId);
  const tint = useThemeColor({}, 'tint');
  const connector = '#6B8A8C';
  const childOutcomeContext: OutcomeContext | undefined = node.outcomeRow
    ? { row: node.outcomeRow, feedIds: outcomeFeedIds(node.outcomeRow) }
    : outcomeContext;
  const hasChildren = Boolean(node.children?.length);
  const isOutcomeFeed = Boolean(outcomeContext?.feedIds.has(node.id) && !hasChildren);

  return (
    <View style={[styles.tree, compact ? styles.treeCompact : null, isOutcomeFeed ? styles.treeOutcomeFeed : null]}>
      <FlowNodeChip
        node={node}
        onPath={onPath}
        current={current}
        isResult={isResult}
        compact={compact}
        onPress={canPress ? () => onChoose(node.stepId!, node.optionId!) : undefined}
      />
      {hasChildren ? (
        <View style={styles.treeChildren}>
          <View style={[styles.stem, compact ? styles.stemCompact : null, { backgroundColor: onPath ? tint : connector }]} />
          {node.children!.length > 1 ? (
            <View style={styles.treeHBarTrack}>
              <View
                collapsable={false}
                style={[
                  styles.treeHBar,
                  {
                    backgroundColor: connector,
                    borderTopColor: connector,
                    width: `${((node.children!.length - 1) / node.children!.length) * 100}%`,
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
                  <View style={[styles.stem, compact ? styles.stemCompact : null, { backgroundColor: childOnPath ? tint : connector }]} />
                  <FlowTree
                    node={child}
                    nodeFlags={nodeFlags}
                    onChoose={onChoose}
                    compact={compact}
                    outcomeContext={childOutcomeContext}
                  />
                </View>
              );
            })}
          </View>
          {node.outcomeRow ? (
            <FlowOutcomeSection outcomeRow={node.outcomeRow} nodeFlags={nodeFlags} compact={compact} />
          ) : null}
        </View>
      ) : null}
      {isOutcomeFeed ? (
        <View style={[styles.outcomeDownStem, { backgroundColor: onPath ? tint : connector }]} />
      ) : null}
    </View>
  );
}

export function AlgorithmFlowScreen({ score }: Props) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const background = useThemeColor({}, 'background');
  const textSecondary = useThemeColor({}, 'textSecondary');
  const tint = useThemeColor({}, 'tint');
  const accent = useThemeColor({}, 'accent');
  const surface = useThemeColor({}, 'surface');
  const border = useThemeColor({}, 'border');
  const { t } = useLocale();
  const flow = score.flow;
  const mapCompact = flow.mapLayout === 'compact';
  const walk = useMemo(() => walkAlgorithmFlow(flow, answers), [answers, flow]);
  const nodeFlags = useMemo(
    () => buildAlgorithmNodeFlags(flow.map, walk, answers),
    [answers, flow.map, walk],
  );
  const diagnosis = findEntryForResult(score.entries, walk.result);
  const currentStep = walk.currentStep;

  const choose = (stepId: string, optionId: string) => {
    setAnswers((current) => applyAlgorithmAnswer(flow, current, stepId, optionId));
  };

  return (
    <ScorePageShell score={score} keyboardShouldPersistTaps="handled">
      <Text style={[styles.section, { color: tint }]}>{flow.title}</Text>
      <Text style={[styles.hint, { color: textSecondary }]}>{t.algorithmHint}</Text>

      <View style={[styles.mapBox, { backgroundColor: surface, borderColor: border }]}>
        {mapCompact ? (
          <View style={[styles.mapInner, styles.mapInnerCompact]}>
            <FlowTree node={flow.map} nodeFlags={nodeFlags} onChoose={choose} compact />
          </View>
        ) : (
          <ScrollView horizontal nestedScrollEnabled showsHorizontalScrollIndicator={false}>
            <View style={styles.mapInner}>
              <FlowTree node={flow.map} nodeFlags={nodeFlags} onChoose={choose} />
            </View>
          </ScrollView>
        )}
      </View>

      {currentStep ? (
        <View style={[styles.stepBox, { backgroundColor: surface, borderColor: tint }]}>
          <Text style={[styles.stepKicker, { color: tint }]}>
            {walk.path.length === 0 ? flow.title : t.algorithmNext}
          </Text>
          <Text style={styles.stepPrompt}>{currentStep.prompt}</Text>
          {currentStep.hint ? (
            <Text style={[styles.stepHint, { color: textSecondary }]}>{currentStep.hint}</Text>
          ) : null}
          <View style={styles.options}>
            {currentStep.options.map((option) => {
              const selected = answers[currentStep.id] === option.id;
              return (
                <Pressable
                  key={option.id}
                  accessibilityRole="button"
                  accessibilityState={{ selected }}
                  onPress={() => choose(currentStep.id, option.id)}
                  style={({ pressed }) => [
                    styles.option,
                    {
                      backgroundColor: selected ? `${tint}14` : background,
                      borderColor: selected ? tint : border,
                      opacity: pressed ? 0.85 : 1,
                    },
                  ]}>
                  <Text style={[styles.optionLabel, selected && { color: tint }]}>{option.label}</Text>
                  {selected ? <Text style={[styles.check, { color: tint }]}>✓</Text> : null}
                </Pressable>
              );
            })}
          </View>
        </View>
      ) : null}

      <View style={[styles.diagnosisBox, { backgroundColor: surface, borderColor: diagnosis ? tint : border }]}>
        <Text style={[styles.stepKicker, { color: tint }]}>{t.algorithmDiagnosis}</Text>
        {diagnosis ? (
          <>
            <View style={[styles.diagnosisBadge, { backgroundColor: SeverityColors[diagnosis.severity ?? 'none'] }]}>
              <Text style={styles.badgeText}>{diagnosis.meaning}</Text>
            </View>
            <Text style={[styles.diagnosisPath, { color: textSecondary }]}>{diagnosis.label}</Text>
            {diagnosis.rows.map((row) => (
              <View key={`${diagnosis.label}-${row.heading}`} style={styles.row}>
                <Text style={[styles.rowHeading, { color: textSecondary }]}>{row.heading}</Text>
                <Text style={styles.rowText}>{row.text}</Text>
              </View>
            ))}
            {diagnosis.comment ? (
              <Text style={[styles.comment, { color: textSecondary }]}>
                {t.note}: {diagnosis.comment}
              </Text>
            ) : null}
          </>
        ) : (
          <Text style={[styles.placeholder, { color: textSecondary }]}>{t.resultPlaceholder}</Text>
        )}
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={() => setAnswers({})}
        style={({ pressed }) => [
          styles.reset,
          { backgroundColor: surface, borderColor: border, opacity: pressed ? 0.85 : 1 },
        ]}>
        <Text style={[styles.resetText, { color: accent }]}>{t.reset}</Text>
      </Pressable>

      {score.entries.map((entry) => (
        <EntryCard
          key={entry.label}
          entry={entry}
          emphasized={diagnosis?.label === entry.label}
          dimmed={Boolean(diagnosis && diagnosis.label !== entry.label)}
        />
      ))}
    </ScorePageShell>
  );
}

const styles = StyleSheet.create({
  section: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.3,
    marginBottom: 6,
  },
  hint: {
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 10,
  },
  mapBox: {
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  mapInner: {
    minWidth: 560,
    width: '100%',
    paddingHorizontal: 12,
    alignItems: 'stretch',
  },
  mapInnerCompact: {
    minWidth: 0,
    paddingHorizontal: 4,
  },
  tree: {
    alignItems: 'center',
    width: '100%',
  },
  treeCompact: {
    alignItems: 'stretch',
  },
  treeOutcomeFeed: {
    flex: 1,
    width: '100%',
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
  treeHBarTrack: {
    width: '100%',
    height: 3,
    alignItems: 'center',
    justifyContent: 'center',
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
  outcomeDownStem: {
    width: 3,
    flex: 1,
    alignSelf: 'center',
    minHeight: 8,
  },
  outcomeSection: {
    width: '100%',
  },
  outcomeResultRow: {
    alignItems: 'flex-start',
  },
  outcomeNcPane: {
    flex: 1.5,
  },
  outcomeEgcPane: {
    flex: 1,
    alignItems: 'center',
  },
  outcomeNcMergeTrack: {
    width: '100%',
    height: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outcomeNcMergeBar: {
    width: '72%',
    height: 3,
    minHeight: 3,
    borderTopWidth: 3,
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
  stepBox: {
    borderWidth: 2,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  stepKicker: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.4,
    marginBottom: 6,
  },
  stepPrompt: {
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 8,
  },
  stepHint: {
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 12,
  },
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  option: {
    minWidth: 120,
    flexGrow: 1,
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  optionLabel: {
    fontSize: 15,
    fontWeight: '700',
    flexShrink: 1,
  },
  check: {
    fontSize: 16,
    fontWeight: '700',
  },
  diagnosisBox: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  diagnosisBadge: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 8,
  },
  diagnosisPath: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 10,
  },
  placeholder: {
    fontSize: 14,
    lineHeight: 22,
  },
  reset: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 20,
  },
  resetText: {
    fontSize: 16,
    fontWeight: '700',
  },
  card: {
    borderWidth: 1,
    borderLeftWidth: 5,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  entryLabel: {
    fontSize: 18,
    fontWeight: '800',
    flexShrink: 1,
  },
  badge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 6,
  },
  rowHeading: {
    width: 88,
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 20,
  },
  rowText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  comment: {
    fontSize: 12,
    lineHeight: 18,
    marginTop: 8,
  },
});
