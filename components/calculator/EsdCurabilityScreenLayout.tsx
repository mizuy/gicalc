import { type ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ScorePageShell } from '@/components/calculator/ScorePageShell';
import { ScoreResultPanel } from '@/components/calculator/ScoreResultPanel';
import { Text, useThemeColor } from '@/components/Themed';
import { localizeResult, useLocale } from '@/lib/i18n';
import type { CalculatorDefinition, ScoreResult } from '@/types/score';

type Props = {
  score: CalculatorDefinition;
  table: ReactNode;
  inputTitle: string;
  filledCount: number;
  requiredCount: number;
  fields: ReactNode;
  allFieldsFilled: boolean;
  result?: ScoreResult;
  onReset: () => void;
};

export function EsdCurabilityScreenLayout({
  score,
  table,
  inputTitle,
  filledCount,
  requiredCount,
  fields,
  allFieldsFilled,
  result,
  onReset,
}: Props) {
  const textSecondary = useThemeColor({}, 'textSecondary');
  const accent = useThemeColor({}, 'accent');
  const surface = useThemeColor({}, 'surface');
  const border = useThemeColor({}, 'border');
  const { locale, t } = useLocale();

  const localizedResult = result ? localizeResult(result, locale) : undefined;

  return (
    <ScorePageShell score={score} keyboardShouldPersistTaps="handled">
      {table}

      <View style={styles.inputHeader}>
        <Text style={styles.inputTitle}>{inputTitle}</Text>
        <Text style={[styles.inputProgress, { color: textSecondary }]}>
          {filledCount} / {requiredCount}
        </Text>
      </View>

      {fields}

      <ScoreResultPanel result={localizedResult} ready={allFieldsFilled} />

      <Pressable
        accessibilityRole="button"
        onPress={onReset}
        style={({ pressed }) => [
          styles.reset,
          {
            backgroundColor: surface,
            borderColor: border,
            opacity: pressed ? 0.85 : 1,
          },
        ]}>
        <Text style={[styles.resetText, { color: accent }]}>{t.reset}</Text>
      </Pressable>
    </ScorePageShell>
  );
}

const styles = StyleSheet.create({
  inputHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 12,
  },
  inputTitle: { fontSize: 18, fontWeight: '800', flexShrink: 1 },
  inputProgress: { fontSize: 14, fontWeight: '600' },
  reset: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  resetText: { fontSize: 16, fontWeight: '700' },
});
