import { useMemo, useState } from 'react';

import { EsdCurabilityScreenLayout } from '@/components/calculator/EsdCurabilityScreenLayout';
import { GastricEsdCurabilityTable } from '@/components/calculator/GastricEsdCurabilityTable';
import { ScoreFieldSelector } from '@/components/calculator/ScoreFieldSelector';
import { GASTRIC_ESD_CURABILITY_TABLE } from '@/lib/i18n/gastricEsdCurabilityTable';
import { useLocale } from '@/lib/i18n';
import {
  getGastricEsdCurabilityRequiredFields,
  isGastricEsdCurabilityComplete,
  resolveGastricEsdCurabilityHighlight,
} from '@/lib/scores/gastric-esd-curability';
import type { CalculatorDefinition } from '@/types/score';

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
  const { locale } = useLocale();
  const tableCopy = GASTRIC_ESD_CURABILITY_TABLE[locale];

  const allFieldsFilled = isGastricEsdCurabilityComplete(values);
  const highlight = useMemo(() => resolveGastricEsdCurabilityHighlight(values), [values]);

  const result = useMemo(() => {
    if (!allFieldsFilled) return undefined;
    const filled = Object.fromEntries(
      Object.entries(values).filter(([, value]) => value !== undefined),
    ) as Record<string, number>;
    return score.compute(filled);
  }, [allFieldsFilled, score, values]);

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

  const requiredFields = useMemo(() => getGastricEsdCurabilityRequiredFields(values), [values]);
  const requiredCount = requiredFields.length;
  const filledCount = requiredFields.filter((id) => values[id] !== undefined).length;

  return (
    <EsdCurabilityScreenLayout
      score={score}
      table={
        <GastricEsdCurabilityTable
          highlightedCells={highlight.cells}
          partial={highlight.partial}
          complete={highlight.complete}
        />
      }
      inputTitle={tableCopy.inputSection}
      filledCount={filledCount}
      requiredCount={requiredCount}
      allFieldsFilled={allFieldsFilled}
      result={result}
      onReset={() => setValues({})}
      fields={fieldsToShow.map((field) => (
        <ScoreFieldSelector
          key={field.id}
          field={field}
          selectedValue={values[field.id]}
          onSelect={handleSelect}
        />
      ))}
    />
  );
}
