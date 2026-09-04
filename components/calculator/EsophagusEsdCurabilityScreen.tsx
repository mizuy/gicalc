import { useMemo, useState } from 'react';

import { EsdCurabilityScreenLayout } from '@/components/calculator/EsdCurabilityScreenLayout';
import { EsophagusEsdCurabilityTable } from '@/components/calculator/EsophagusEsdCurabilityTable';
import { ScoreFieldSelector } from '@/components/calculator/ScoreFieldSelector';
import { ESOPHAGUS_ESD_CURABILITY_TABLE } from '@/lib/i18n/esophagusEsdCurabilityTable';
import { useLocale } from '@/lib/i18n';
import {
  getEsophagusEsdCurabilityRequiredFields,
  isEsophagusEsdCurabilityComplete,
  resolveEsophagusEsdCurabilityHighlight,
} from '@/lib/scores/esophagus-esd-curability';
import type { CalculatorDefinition } from '@/types/score';

type Props = { score: CalculatorDefinition };

export function EsophagusEsdCurabilityScreen({ score }: Props) {
  const [values, setValues] = useState<Record<string, number | undefined>>({});
  const { locale } = useLocale();
  const tableCopy = ESOPHAGUS_ESD_CURABILITY_TABLE[locale];

  const allFieldsFilled = isEsophagusEsdCurabilityComplete(values);
  const highlight = useMemo(() => resolveEsophagusEsdCurabilityHighlight(values), [values]);
  const required = getEsophagusEsdCurabilityRequiredFields(values);
  const filledCount = required.filter((id) => values[id] !== undefined).length;

  const result = useMemo(() => {
    if (!allFieldsFilled) return undefined;
    const filled = Object.fromEntries(
      Object.entries(values).filter(([, v]) => v !== undefined),
    ) as Record<string, number>;
    return score.compute(filled);
  }, [allFieldsFilled, score, values]);

  return (
    <EsdCurabilityScreenLayout
      score={score}
      table={
        <EsophagusEsdCurabilityTable
          highlightedCells={highlight.cells}
          partial={highlight.partial}
          complete={highlight.complete}
        />
      }
      inputTitle={tableCopy.inputSection}
      filledCount={filledCount}
      requiredCount={required.length}
      allFieldsFilled={allFieldsFilled}
      result={result}
      onReset={() => setValues({})}
      fields={score.fields.map((field) => (
        <ScoreFieldSelector
          key={field.id}
          field={field}
          selectedValue={values[field.id]}
          onSelect={(id, value) => setValues((c) => ({ ...c, [id]: value }))}
        />
      ))}
    />
  );
}
