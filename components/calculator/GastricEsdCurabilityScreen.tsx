import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { CitationLink } from '@/components/calculator/CitationLink';
import { GastricEsdCurabilityTable } from '@/components/calculator/GastricEsdCurabilityTable';
import { ClassificationFigure } from '@/components/calculator/ClassificationFigure';
import { ScoreFieldSelector } from '@/components/calculator/ScoreFieldSelector';
import { ScoreResultPanel } from '@/components/calculator/ScoreResultPanel';
import { JapanMark } from '@/components/calculator/JapanMark';
import { ToolKindBadge } from '@/components/calculator/ToolKindBadge';
import { Text, useThemeColor } from '@/components/Themed';
import { GASTRIC_ESD_CURABILITY_TABLE } from '@/lib/i18n/gastricEsdCurabilityTable';
import { localizeResult, useLocale } from '@/lib/i18n';
import {
  getGastricEsdCurabilityRequiredFields,
  isGastricEsdCurabilityComplete,
  resolveGastricEsdCurabilityHighlight,
} from '@/lib/scores/gastric-esd-curability';
import { figureKey, getToolKind, isJapanDeveloped, type CalculatorDefinition } from '@/types/score';

type Props = {
  score: CalculatorDefinition;
};

function visibleFields(score: CalculatorDefinition, values: Record<string, number | undefined>) {
  return score.fields.filter((field) => {
    if (field.id === 'undiffSize') return values.histology === 1;
    if (field.id === 'undiffInSm') return values.histology === 1 && values.depth === 1;
    return true;
  });
}

export function GastricEsdCurabilityScreen({ score }: Props) {
  const [values, setValues] = useState<Record<string, number | undefined>>({});
  const background = useThemeColor({}, 'background');
  const textSecondary = useThemeColor({}, 'textSecondary');
  const accent = useThemeColor({}, 'accent');
  const surface = useThemeColor({}, 'surface');
  const border = useThemeColor({}, 'border');
  const { locale, t } = useLocale();
  const tableCopy = GASTRIC_ESD_CURABILITY_TABLE[locale];

  const allFieldsFilled = isGastricEsdCurabilityComplete(values);
  const highlight = useMemo(() => resolveGastricEsdCurabilityHighlight(values), [values]);

  const result = useMemo(() => {
    if (!allFieldsFilled) return undefined;
    const filled = Object.fromEntries(
      Object.entries(values).filter(([, value]) => value !== undefined),
    ) as Record<string, number>;
    return localizeResult(score.compute(filled), locale);
  }, [allFieldsFilled, locale, score, values]);

  const fieldsToShow = visibleFields(score, values);

  const handleSelect = (fieldId: string, value: number) => {
    setValues((current) => {
      const next = { ...current, [fieldId]: value };
      if (fieldId === 'histology' && value !== 1) {
        delete next.undiffSize;
        delete next.undiffInSm;
      }
      if (fieldId === 'depth' && value !== 1) {
        delete next.undiffInSm;
      }
      return next;
    });
  };

  const handleReset = () => setValues({});

  const requiredFields = useMemo(() => getGastricEsdCurabilityRequiredFields(values), [values]);
  const requiredCount = requiredFields.length;
  const filledCount = requiredFields.filter((id) => values[id] !== undefined).length;

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

      <GastricEsdCurabilityTable
        highlightedCells={highlight.cells}
        partial={highlight.partial}
        complete={highlight.complete}
      />

      <View style={styles.inputHeader}>
        <Text style={styles.inputTitle}>{tableCopy.inputSection}</Text>
        <Text style={[styles.inputProgress, { color: textSecondary }]}>
          {filledCount} / {requiredCount}
        </Text>
      </View>

      {fieldsToShow.map((field) => (
        <ScoreFieldSelector
          key={field.id}
          field={field}
          selectedValue={values[field.id]}
          onSelect={handleSelect}
        />
      ))}

      <ScoreResultPanel result={result} ready={allFieldsFilled} />

      {score.figures?.map((figure) => (
        <ClassificationFigure key={figureKey(figure)} figure={figure} />
      ))}

      <Pressable
        accessibilityRole="button"
        onPress={handleReset}
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
        <Text style={[styles.footnote, { color: textSecondary }]}>{t.footnote}</Text>
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
  inputHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 12,
  },
  inputTitle: {
    fontSize: 18,
    fontWeight: '800',
    flexShrink: 1,
  },
  inputProgress: {
    fontSize: 14,
    fontWeight: '600',
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
