import { Link, type Href } from 'expo-router';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { JapanMark } from '@/components/calculator/JapanMark';
import { ToolKindBadge } from '@/components/calculator/ToolKindBadge';
import { Text, useThemeColor } from '@/components/Themed';
import { useLocale } from '@/lib/i18n';
import { getRelatedScores } from '@/lib/scores/relatedScores';
import { getToolKind, isJapanDeveloped } from '@/types/score';

type Props = {
  scoreId: string;
  style?: StyleProp<ViewStyle>;
};

export function RelatedScoresPanel({ scoreId, style }: Props) {
  const { locale, t } = useLocale();
  const tint = useThemeColor({}, 'tint');
  const textSecondary = useThemeColor({}, 'textSecondary');
  const surface = useThemeColor({}, 'surface');
  const border = useThemeColor({}, 'border');

  const related = getRelatedScores(scoreId, locale);
  if (related.length === 0) return null;

  return (
    <View style={[styles.box, { backgroundColor: surface, borderColor: border }, style]}>
      <Text style={[styles.title, { color: tint }]}>{t.relatedScores}</Text>
      {related.map((item, index) => (
        <Link key={item.href} href={item.href as Href} asChild>
          <Pressable
            accessibilityRole="link"
            style={({ pressed }) => [
              styles.row,
              index > 0 ? styles.rowBorder : null,
              { opacity: pressed ? 0.72 : 1 },
            ]}>
            <View style={styles.body}>
              <View style={styles.nameRow}>
                <Text style={styles.name} numberOfLines={2}>
                  {item.name}
                </Text>
                {isJapanDeveloped(item.score) ? <JapanMark compact /> : null}
              </View>
              {item.hint ? (
                <Text style={[styles.hint, { color: textSecondary }]} numberOfLines={2}>
                  {item.hint}
                </Text>
              ) : null}
              <View style={styles.meta}>
                <ToolKindBadge kind={getToolKind(item.score)} />
                <Text style={[styles.shortName, { color: textSecondary }]} numberOfLines={1}>
                  {item.shortName}
                </Text>
              </View>
            </View>
            <Text style={[styles.chevron, { color: tint }]} accessibilityElementsHidden>
              →
            </Text>
          </Pressable>
        </Link>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 4,
    marginBottom: 20,
    gap: 4,
  },
  title: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
  },
  rowBorder: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(128,128,128,0.25)',
  },
  body: {
    flex: 1,
    minWidth: 0,
    gap: 4,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  name: {
    flexShrink: 1,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  hint: {
    fontSize: 12,
    lineHeight: 17,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  shortName: {
    fontSize: 11,
    fontWeight: '600',
  },
  chevron: {
    fontSize: 18,
    fontWeight: '700',
    paddingLeft: 4,
  },
});
