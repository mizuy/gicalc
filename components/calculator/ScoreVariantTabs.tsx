import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { Text, useThemeColor } from '@/components/Themed';
import type { ScoreVariantGroup } from '@/data/scores/variant-groups';
import { useLocale } from '@/lib/i18n';
import { localizeScore } from '@/lib/i18n';
import { getScoreById } from '@/data/scores';

type Props = {
  group: ScoreVariantGroup;
  activeVariantId: string;
  onSelect: (variantId: string) => void;
};

export function ScoreVariantTabs({ group, activeVariantId, onSelect }: Props) {
  const tint = useThemeColor({}, 'tint');
  const border = useThemeColor({}, 'border');
  const surface = useThemeColor({}, 'surface');
  const textSecondary = useThemeColor({}, 'textSecondary');
  const { locale, t } = useLocale();

  return (
    <View style={[styles.wrap, { borderColor: border, backgroundColor: surface }]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
        keyboardShouldPersistTaps="handled">
        {group.variantIds.map((variantId) => {
          const score = getScoreById(variantId);
          if (!score) return null;
          const localized = localizeScore(score, locale);
          const active = variantId === activeVariantId;
          const isDefault = variantId === group.defaultVariantId;
          const tabLabel = isDefault ? t.variantTabModified : t.variantTabOriginal;
          return (
            <Pressable
              key={variantId}
              accessibilityRole="tab"
              accessibilityState={{ selected: active }}
              onPress={() => onSelect(variantId)}
              style={({ pressed }) => [
                styles.tab,
                {
                  borderColor: active ? tint : border,
                  backgroundColor: active ? `${tint}14` : 'transparent',
                  opacity: pressed ? 0.88 : 1,
                },
              ]}>
              <Text style={[styles.tabKind, { color: active ? tint : textSecondary }]}>{tabLabel}</Text>
              <Text style={[styles.tabName, { color: active ? tint : undefined }]} numberOfLines={2}>
                {localized.shortName}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderWidth: 1,
    borderRadius: 14,
    marginBottom: 16,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    padding: 8,
  },
  tab: {
    minWidth: 120,
    maxWidth: 200,
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 2,
  },
  tabKind: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  tabName: {
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 18,
  },
});
