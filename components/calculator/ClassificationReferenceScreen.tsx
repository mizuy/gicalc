import { ScrollView, StyleSheet, View } from 'react-native';

import { ClassificationFigure } from '@/components/calculator/ClassificationFigure';
import { CitationLink } from '@/components/calculator/CitationLink';
import { JapanMark } from '@/components/calculator/JapanMark';
import { ToolKindBadge } from '@/components/calculator/ToolKindBadge';
import { Text, useThemeColor } from '@/components/Themed';
import { SeverityColors } from '@/constants/Colors';
import { useLocale } from '@/lib/i18n';
import {
  figureKey,
  getToolKind,
  isJapanDeveloped,
  type ClassificationDefinition,
  type ClassificationEntry,
} from '@/types/score';

type Props = {
  score: ClassificationDefinition;
};

type EntryGroup = {
  key: string;
  label?: string;
  entries: ClassificationEntry[];
};

function groupEntries(entries: ClassificationEntry[]): EntryGroup[] {
  const groups: EntryGroup[] = [];
  for (const entry of entries) {
    const key = entry.group ?? '';
    const last = groups[groups.length - 1];
    if (!last || last.key !== key) {
      groups.push({ key, label: entry.group, entries: [entry] });
    } else {
      last.entries.push(entry);
    }
  }
  return groups;
}

export function ClassificationReferenceScreen({ score }: Props) {
  const background = useThemeColor({}, 'background');
  const textSecondary = useThemeColor({}, 'textSecondary');
  const tint = useThemeColor({}, 'tint');
  const surface = useThemeColor({}, 'surface');
  const border = useThemeColor({}, 'border');
  const { t } = useLocale();
  const groups = groupEntries(score.entries);

  return (
    <ScrollView
      style={[styles.scroll, { backgroundColor: background }]}
      contentContainerStyle={styles.content}>
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
          {score.officialUrl ? (
            <CitationLink label={score.officialLinkLabel ?? score.officialUrl} href={score.officialUrl} />
          ) : null}
          {score.note ? (
            <Text style={[styles.comment, { color: textSecondary }]}>{score.note}</Text>
          ) : null}
        </View>
      ) : null}

      {score.figures?.map((figure) => (
        <ClassificationFigure key={figureKey(figure)} figure={figure} />
      ))}

      {groups.map((group) => (
        <View key={group.key || 'default'} style={styles.group}>
          {group.label ? (
            <Text style={[styles.groupLabel, { color: tint }]}>{group.label}</Text>
          ) : null}
          {group.entries.map((entry) => {
            const accent = SeverityColors[entry.severity ?? 'none'];
            return (
              <View
                key={entry.label}
                style={[styles.card, { backgroundColor: surface, borderColor: border, borderLeftColor: accent }]}>
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
          })}
        </View>
      ))}

      <View style={[styles.footnoteBox, { borderColor: border }]}>
        <Text style={[styles.footnote, { color: textSecondary }]}>
          {t.footnote}
        </Text>
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
  group: {
    marginBottom: 8,
  },
  groupLabel: {
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 8,
    letterSpacing: 0.3,
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
    fontSize: 20,
    fontWeight: '800',
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
