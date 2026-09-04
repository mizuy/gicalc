import { type ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { CitationLink } from '@/components/calculator/CitationLink';
import { ClassificationFigure } from '@/components/calculator/ClassificationFigure';
import { JapanMark } from '@/components/calculator/JapanMark';
import { RelatedScoresPanel } from '@/components/calculator/RelatedScoresPanel';
import { ToolKindBadge } from '@/components/calculator/ToolKindBadge';
import { Text, useThemeColor } from '@/components/Themed';
import { useLocale } from '@/lib/i18n';
import {
  figureKey,
  getToolKind,
  isClassification,
  isJapanDeveloped,
  type ScoreDefinition,
} from '@/types/score';

type Props = {
  score: ScoreDefinition;
  headerExtra?: ReactNode;
  children: ReactNode;
  keyboardShouldPersistTaps?: boolean | 'always' | 'never' | 'handled';
};

export function ScorePageShell({ score, headerExtra, children, keyboardShouldPersistTaps }: Props) {
  const background = useThemeColor({}, 'background');

  return (
    <ScrollView
      style={[styles.scroll, { backgroundColor: background }]}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}>
      {headerExtra}
      <ScorePageHeader score={score} />
      {children}
      <ScorePageFooter score={score} />
    </ScrollView>
  );
}

function ScorePageHeader({ score }: { score: ScoreDefinition }) {
  const textSecondary = useThemeColor({}, 'textSecondary');

  return (
    <View style={styles.header}>
      <View style={styles.tagRow}>
        <ToolKindBadge kind={getToolKind(score)} />
        <Text style={[styles.tag, { color: textSecondary }]} numberOfLines={1}>
          {score.categoryLabel}
        </Text>
        {isJapanDeveloped(score) ? <JapanMark compact /> : null}
      </View>
      <Text style={styles.title}>{score.name}</Text>
      {score.description ? (
        <Text style={[styles.description, { color: textSecondary }]}>{score.description}</Text>
      ) : null}
    </View>
  );
}

function ScorePageFooter({ score }: { score: ScoreDefinition }) {
  const textSecondary = useThemeColor({}, 'textSecondary');
  const tint = useThemeColor({}, 'tint');
  const border = useThemeColor({}, 'border');
  const { t } = useLocale();
  const originalLead = isClassification(score) ? score.originalLead : undefined;
  const hasSources = Boolean(score.reference || score.license || score.officialUrl || score.note);

  return (
    <View style={[styles.footer, { borderColor: border }]}>
      {score.figures?.map((figure) => (
        <ClassificationFigure key={figureKey(figure)} figure={figure} />
      ))}

      {originalLead ? (
        <View style={styles.originalBlock}>
          <Text style={[styles.originalLabel, { color: tint }]}>{t.original}</Text>
          <Text style={[styles.originalLead, { color: textSecondary }]}>{originalLead}</Text>
        </View>
      ) : null}

      {hasSources ? (
        <View style={styles.reference}>
          {score.reference ? (
            <CitationLink label={`${t.reference}: ${score.reference}`} pubmed={score.pubmed} />
          ) : null}
          {score.license ? (
            <CitationLink label={`${t.license}: ${score.license}`} href={score.licenseUrl} />
          ) : null}
          {score.officialUrl ? (
            <CitationLink label={score.officialLinkLabel ?? score.officialUrl} href={score.officialUrl} />
          ) : null}
          {score.note ? <Text style={[styles.note, { color: textSecondary }]}>{score.note}</Text> : null}
        </View>
      ) : null}

      <RelatedScoresPanel scoreId={score.id} style={styles.related} />

      <Text style={[styles.footnote, { color: textSecondary }]}>{t.footnote}</Text>
    </View>
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
  header: {
    gap: 6,
    marginBottom: 16,
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    fontSize: 11,
    fontWeight: '600',
    flexShrink: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    flexShrink: 1,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  footer: {
    marginTop: 20,
    borderTopWidth: 1,
    paddingTop: 16,
    gap: 12,
  },
  originalBlock: {
    gap: 4,
  },
  originalLabel: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  originalLead: {
    fontSize: 13,
    lineHeight: 20,
  },
  reference: {
    gap: 4,
  },
  note: {
    fontSize: 13,
    lineHeight: 20,
    marginTop: 4,
  },
  related: {
    marginBottom: 0,
  },
  footnote: {
    fontSize: 12,
    lineHeight: 18,
  },
});
