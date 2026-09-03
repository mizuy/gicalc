import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { CitationLink } from '@/components/calculator/CitationLink';
import { ClassificationFigure } from '@/components/calculator/ClassificationFigure';
import { ScoreFieldSelector } from '@/components/calculator/ScoreFieldSelector';
import { ScoreResultPanel } from '@/components/calculator/ScoreResultPanel';
import { JapanMark } from '@/components/calculator/JapanMark';
import { ToolKindBadge } from '@/components/calculator/ToolKindBadge';
import { Text, useThemeColor } from '@/components/Themed';
import { localizeResult, useLocale } from '@/lib/i18n';
import { lowestFieldValues } from '@/lib/scores/initialValues';
import { getToolKind, isJapanDeveloped, type CalculatorDefinition } from '@/types/score';

type Props = {
  score: CalculatorDefinition;
};

export function ScoreCalculatorScreen({ score }: Props) {
  const [values, setValues] = useState<Record<string, number>>(() => lowestFieldValues(score.fields));
  const background = useThemeColor({}, 'background');
  const textSecondary = useThemeColor({}, 'textSecondary');
  const tint = useThemeColor({}, 'tint');
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
      <Text style={[styles.description, { color: textSecondary }]}>{score.description}</Text>
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
            <Text style={[styles.note, { color: textSecondary }]}>{score.note}</Text>
          ) : null}
        </View>
      ) : null}

      {score.figures?.map((figure) => (
        <ClassificationFigure key={figure.src} figure={figure} />
      ))}

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
  description: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 8,
  },
  reference: {
    marginBottom: 20,
  },
  note: {
    fontSize: 12,
    lineHeight: 18,
    marginTop: 8,
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
