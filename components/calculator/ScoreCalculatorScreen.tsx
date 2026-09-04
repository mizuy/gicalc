import { useMemo, useState, type ReactNode } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { ScoreFieldSelector } from '@/components/calculator/ScoreFieldSelector';
import { ScorePageShell } from '@/components/calculator/ScorePageShell';
import { ScoreResultPanel } from '@/components/calculator/ScoreResultPanel';
import { Text, useThemeColor } from '@/components/Themed';
import { localizeResult, useLocale } from '@/lib/i18n';
import { lowestFieldValues } from '@/lib/scores/initialValues';
import type { CalculatorDefinition } from '@/types/score';

type Props = {
  score: CalculatorDefinition;
  header?: ReactNode;
};

export function ScoreCalculatorScreen({ score, header }: Props) {
  const [values, setValues] = useState<Record<string, number>>(() => lowestFieldValues(score.fields));
  const accent = useThemeColor({}, 'accent');
  const surface = useThemeColor({}, 'surface');
  const border = useThemeColor({}, 'border');
  const { locale, t } = useLocale();

  const allFieldsFilled = score.fields.every((field) => field.id in values);
  const result = useMemo(() => {
    if (!allFieldsFilled) return undefined;
    return localizeResult(score.compute(values), locale);
  }, [allFieldsFilled, locale, score, values]);

  const handleSelect = (fieldId: string, value: number) => {
    setValues((current) => ({ ...current, [fieldId]: value }));
  };

  return (
    <ScorePageShell score={score} headerExtra={header} keyboardShouldPersistTaps="handled">
      <ScoreResultPanel result={result} ready={allFieldsFilled} />

      {score.fields.map((field) => (
        <ScoreFieldSelector
          key={field.id}
          field={field}
          selectedValue={values[field.id]}
          onSelect={handleSelect}
        />
      ))}

      <Pressable
        accessibilityRole="button"
        onPress={() => setValues(lowestFieldValues(score.fields))}
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
  reset: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  resetText: {
    fontSize: 16,
    fontWeight: '700',
  },
});
