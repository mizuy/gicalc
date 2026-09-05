import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ClassificationFigure } from '@/components/calculator/ClassificationFigure';
import { CitationLink } from '@/components/calculator/CitationLink';
import { JapanMark } from '@/components/calculator/JapanMark';
import { ToolKindBadge } from '@/components/calculator/ToolKindBadge';
import { Text, useThemeColor } from '@/components/Themed';
import { SeverityColors } from '@/constants/Colors';
import { useLocale } from '@/lib/i18n';
import {
  applyAlgorithmAnswer,
  buildAlgorithmNodeFlags,
  findEntryForResult,
  walkAlgorithmFlow,
  type AlgorithmNodeFlags,
} from '@/lib/scores/algorithmFlow';
import {
  figureKey,
  getToolKind,
  isJapanDeveloped,
  type AlgorithmFlow,
  type AlgorithmMapNode,
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
}: {
  node: AlgorithmMapNode;
  onPath: boolean;
  current: boolean;
  isResult: boolean;
  onPress?: () => void;
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
        {
          backgroundColor: selected ? `${tint}18` : surface,
          borderColor: current ? tint : selected ? tint : border,
          borderWidth: current || selected ? 2 : 1,
        },
      ]}>
      <Text
        style={[
          styles.chipText,
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

function FlowTree({
  node,
  nodeFlags,
  onChoose,
}: {
  node: AlgorithmMapNode;
  nodeFlags: Map<string, AlgorithmNodeFlags>;
  onChoose: (stepId: string, optionId: string) => void;
}) {
  const flags = nodeFlags.get(node.id) ?? { onPath: false, current: false, isResult: false };
  const { onPath, current, isResult } = flags;
  const canPress = Boolean(node.stepId && node.optionId);
  const tint = useThemeColor({}, 'tint');
  const connector = '#6B8A8C';

  return (
    <View style={styles.tree}>
      <FlowNodeChip
        node={node}
        onPath={onPath}
        current={current}
        isResult={isResult}
        onPress={canPress ? () => onChoose(node.stepId!, node.optionId!) : undefined}
      />
      {node.children?.length ? (
        <View style={styles.treeChildren}>
          <View style={[styles.stem, { backgroundColor: onPath ? tint : connector }]} />
          {node.children.length > 1 ? (
            <View style={styles.treeHBarTrack}>
              <View
                collapsable={false}
                style={[
                  styles.treeHBar,
                  {
                    backgroundColor: connector,
                    borderTopColor: connector,
                    width: `${((node.children.length - 1) / node.children.length) * 100}%`,
                  },
                ]}
              />
            </View>
          ) : null}
          <View style={styles.treeRow}>
            {node.children.map((child) => {
              const childOnPath = nodeFlags.get(child.id)?.onPath ?? false;
              return (
                <View key={child.id} style={styles.treeBranch}>
                  <View style={[styles.stem, { backgroundColor: childOnPath ? tint : connector }]} />
                  <FlowTree node={child} nodeFlags={nodeFlags} onChoose={onChoose} />
                </View>
              );
            })}
          </View>
        </View>
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
    <ScrollView
      style={[styles.scroll, { backgroundColor: background }]}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled">
      <View style={styles.titleBlock}>
        <ToolKindBadge kind={getToolKind(score)} />
        <View style={styles.titleRow}>
          <Text style={styles.title}>{score.name}</Text>
          {isJapanDeveloped(score) ? <JapanMark /> : null}
        </View>
      </View>
      {score.originalLead ? (
        <View style={styles.originalBlock}>
          <Text style={[styles.originalLabel, { color: tint }]}>{t.original}</Text>
          <Text style={[styles.originalLead, { color: tint }]}>{score.originalLead}</Text>
        </View>
      ) : null}
      {score.description ? (
        <Text style={[styles.description, { color: textSecondary }]}>{score.description}</Text>
      ) : null}
      {score.reference ? (
        <View style={styles.reference}>
          <CitationLink label={`${t.reference}: ${score.reference}`} pubmed={score.pubmed} />
          {score.license ? (
            <CitationLink label={`${t.license}: ${score.license}`} href={score.licenseUrl} />
          ) : null}
        </View>
      ) : null}

      {score.figures?.map((figure) => (
        <ClassificationFigure key={figureKey(figure)} figure={figure} />
      ))}

      <Text style={[styles.section, { color: tint }]}>{flow.title}</Text>
      <Text style={[styles.hint, { color: textSecondary }]}>{t.algorithmHint}</Text>

      <View style={[styles.mapBox, { backgroundColor: surface, borderColor: border }]}>
        <ScrollView horizontal nestedScrollEnabled showsHorizontalScrollIndicator={false}>
          <View style={styles.mapInner}>
            <FlowTree node={flow.map} nodeFlags={nodeFlags} onChoose={choose} />
          </View>
        </ScrollView>
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

      <View style={[styles.footnoteBox, { borderColor: border }]}>
        <Text style={[styles.footnote, { color: textSecondary }]}>{t.footnote}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  content: {
    maxWidth: 720,
    width: '100%',
    alignSelf: 'center',
    padding: 20,
    paddingBottom: 40,
  },
  titleBlock: {
    gap: 8,
    marginBottom: 8,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    flexShrink: 1,
  },
  originalBlock: {
    marginBottom: 8,
  },
  originalLabel: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.4,
    marginBottom: 4,
  },
  originalLead: {
    fontSize: 14,
    lineHeight: 22,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 8,
  },
  reference: {
    marginBottom: 16,
  },
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
  tree: {
    alignItems: 'center',
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
  treeBranch: {
    flex: 1,
    alignItems: 'center',
    minWidth: 96,
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
  chip: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    minWidth: 72,
    alignItems: 'center',
  },
  chipText: {
    fontSize: 12,
    textAlign: 'center',
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
  footnoteBox: {
    marginTop: 12,
    borderTopWidth: 1,
    paddingTop: 16,
  },
  footnote: {
    fontSize: 12,
    lineHeight: 18,
  },
});
