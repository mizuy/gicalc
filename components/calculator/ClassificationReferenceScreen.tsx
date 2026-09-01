import { ScrollView, StyleSheet, View } from 'react-native';

import { ClassificationFigure } from '@/components/calculator/ClassificationFigure';
import { CitationLink } from '@/components/calculator/CitationLink';
import { Text, useThemeColor } from '@/components/Themed';
import { SeverityColors } from '@/constants/Colors';
import type { ClassificationDefinition, ClassificationEntry } from '@/types/score';

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
  const groups = groupEntries(score.entries);

  return (
    <ScrollView
      style={[styles.scroll, { backgroundColor: background }]}
      contentContainerStyle={styles.content}>
      <Text style={styles.title}>{score.name}</Text>
      {score.originalLead ? (
        <Text style={[styles.originalLead, { color: tint }]}>{score.originalLead}</Text>
      ) : null}
      <Text style={[styles.description, { color: textSecondary }]}>{score.description}</Text>
      {score.reference ? (
        <View style={styles.reference}>
          <CitationLink label={`文献: ${score.reference}`} pubmed={score.pubmed} />
        </View>
      ) : null}

      {score.figures?.map((figure) => (
        <ClassificationFigure key={figure.src} figure={figure} />
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
              </View>
            );
          })}
        </View>
      ))}

      <View style={[styles.footnoteBox, { borderColor: border }]}>
        <Text style={[styles.footnote, { color: textSecondary }]}>
          本結果は診断支援です。最新ガイドラインと施設プロトコルに従って判断してください。
        </Text>
        <Text style={[styles.footnote, { color: tint, marginTop: 6 }]}>
          各分類は目的も対象疾患も異なります。混同しないでください。
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
  title: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 8,
  },
  originalLead: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 8,
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
    width: 72,
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 20,
  },
  rowText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
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
