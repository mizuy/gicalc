import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { CitationLink } from '@/components/calculator/CitationLink';
import { ScoreFieldSelector } from '@/components/calculator/ScoreFieldSelector';
import { ScoreResultPanel } from '@/components/calculator/ScoreResultPanel';
import { Text, useThemeColor } from '@/components/Themed';
import type { CalculatorDefinition } from '@/types/score';

type Props = {
  score: CalculatorDefinition;
};

export function ScoreCalculatorScreen({ score }: Props) {
  const [values, setValues] = useState<Record<string, number>>({});
  const background = useThemeColor({}, 'background');
  const textSecondary = useThemeColor({}, 'textSecondary');
  const tint = useThemeColor({}, 'tint');
  const accent = useThemeColor({}, 'accent');
  const surface = useThemeColor({}, 'surface');
  const border = useThemeColor({}, 'border');

  const allFieldsFilled = score.fields.every((field) => field.id in values);
  const result = useMemo(() => {
    if (!allFieldsFilled) return undefined;
    return score.compute(values);
  }, [allFieldsFilled, score, values]);

  const handleSelect = (fieldId: string, value: number) => {
    setValues((current) => ({ ...current, [fieldId]: value }));
  };

  return (
    <ScrollView
      style={[styles.scroll, { backgroundColor: background }]}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>{score.name}</Text>
      <Text style={[styles.description, { color: textSecondary }]}>{score.description}</Text>
      {score.reference ? (
        <View style={styles.reference}>
          <CitationLink label={`文献: ${score.reference}`} pubmed={score.pubmed} />
        </View>
      ) : null}

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
        onPress={() => setValues({})}
        style={({ pressed }) => [
          styles.reset,
          {
            backgroundColor: surface,
            borderColor: border,
            opacity: pressed ? 0.85 : 1,
          },
        ]}>
        <Text style={[styles.resetText, { color: accent }]}>リセット</Text>
      </Pressable>

      <View style={[styles.footnoteBox, { borderColor: border }]}>
        <Text style={[styles.footnote, { color: textSecondary }]}>
          診断支援です。最新ガイドラインと施設プロトコルに従って判断してください。
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
  description: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 8,
  },
  reference: {
    marginBottom: 20,
  },
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
  footnoteBox: {
    marginTop: 20,
    borderTopWidth: 1,
    paddingTop: 16,
  },
  footnote: {
    fontSize: 12,
    lineHeight: 18,
  },
});
