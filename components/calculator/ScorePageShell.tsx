import { type ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { CitationLink } from '@/components/calculator/CitationLink';
import { ClassificationFigure } from '@/components/calculator/ClassificationFigure';
import { JapanMark } from '@/components/calculator/JapanMark';
import { RelatedScoresPanel } from '@/components/calculator/RelatedScoresPanel';
import { ToolKindBadge } from '@/components/calculator/ToolKindBadge';
import { ReportIssueButton } from '@/components/ReportIssueButton';
import { Text, useThemeColor } from '@/components/Themed';
import { useLocale } from '@/lib/i18n';
import {
  figureKey,
  getToolCitations,
  getToolKind,
  isClassification,
  isJapanDeveloped,
} from '@/types/score';
import type { ClassificationFigure as ClassificationFigureData, ScoreDefinition } from '@/types/score';

function pageLevelFigures(score: ScoreDefinition): ClassificationFigureData[] {
  const figures = score.figures ?? [];
  if (!isClassification(score)) return figures;
  const hasCrops = score.entries.some((entry) => entry.figures?.some((figure) => figure.src));
  if (!hasCrops) return figures;
  return figures.map((figure) => {
    if (!figure.src) return figure;
    const href = figure.href ?? figure.doi;
    return {
      ...figure,
      src: undefined,
      href,
      hrefLabel: figure.hrefLabel ?? figure.caption,
    };
  });
}

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
  const citations = getToolCitations(score);
  const hasSources = Boolean(citations.length || score.officialUrl);

  return (
    <View style={[styles.footer, { borderColor: border }]}>
      {pageLevelFigures(score).map((figure) => (
        <ClassificationFigure key={figureKey(figure)} figure={figure} />
      ))}

      {hasSources ? (
        <View style={styles.reference}>
          {citations.length ? (
            <View style={styles.citationList}>
              <Text style={[styles.referenceTitle, { color: textSecondary }]}>{t.reference}</Text>
              {citations.map((citation) => (
                <View
                  key={`${citation.role}:${citation.pubmed ?? citation.href ?? citation.text}`}
                  style={styles.citationRow}>
                  <Text style={[styles.citationRole, { borderColor: tint, color: tint }]}>
                    {t.citationRole[citation.role]}
                  </Text>
                  <View style={styles.citationLink}>
                    <CitationLink
                      label={citation.text}
                      pubmed={citation.pubmed}
                      href={citation.href}
                    />
                  </View>
                </View>
              ))}
            </View>
          ) : null}
          {score.officialUrl ? (
            <View style={styles.citationRow}>
              <Text style={[styles.citationRole, { borderColor: tint, color: tint }]}>
                {t.citationRole[score.officialLinkRole ?? 'official']}
              </Text>
              <View style={styles.citationLink}>
                <CitationLink
                  label={score.officialLinkLabel ?? score.officialUrl}
                  href={score.officialUrl}
                />
              </View>
            </View>
          ) : null}
        </View>
      ) : null}

      <RelatedScoresPanel scoreId={score.id} style={styles.related} />

      <ReportIssueButton pageTitle={score.name} />

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
  reference: {
    gap: 4,
  },
  referenceTitle: {
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 2,
  },
  citationList: {
    gap: 6,
  },
  citationRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 8,
  },
  citationRole: {
    borderRadius: 999,
    borderWidth: 1,
    flexShrink: 0,
    fontSize: 10,
    fontWeight: '800',
    lineHeight: 16,
    marginTop: 4,
    overflow: 'hidden',
    paddingHorizontal: 7,
  },
  citationLink: {
    flex: 1,
    minWidth: 0,
  },
  related: {
    marginBottom: 0,
  },
  footnote: {
    fontSize: 12,
    lineHeight: 18,
  },
});
