import { useMemo, useState } from 'react';

import { ColorectalEsdCurabilityTable } from '@/components/calculator/ColorectalEsdCurabilityTable';
import { EsdCurabilityScreenLayout } from '@/components/calculator/EsdCurabilityScreenLayout';
import { ScoreFieldSelector } from '@/components/calculator/ScoreFieldSelector';
import { COLORECTAL_ESD_CURABILITY_TABLE } from '@/lib/i18n/colorectalEsdCurabilityTable';
import { useLocale } from '@/lib/i18n';
import {
  getColorectalEsdCurabilityRequiredFields,
  isColorectalEsdCurabilityComplete,
  resolveColorectalEsdCurabilityHighlight,
} from '@/lib/scores/colorectal-esd-curability';
import type { CalculatorDefinition } from '@/types/score';

type Props = { score: CalculatorDefinition };

function visibleFields(score: CalculatorDefinition, values: Record<string, number | undefined>) {
  return score.fields.filter((field) => {
    if (field.id === 'histology' || field.id === 'smDepth' || field.id === 'lyv' || field.id === 'budding') {
      return values.depth === 1;
    }
    return true;
  });
}

export function ColorectalEsdCurabilityScreen({ score }: Props) {
  const [values, setValues] = useState<Record<string, number | undefined>>({});
  const { locale } = useLocale();
  const tableCopy = COLORECTAL_ESD_CURABILITY_TABLE[locale];

  const allFieldsFilled = isColorectalEsdCurabilityComplete(values);
  const highlight = useMemo(() => resolveColorectalEsdCurabilityHighlight(values), [values]);
  const required = getColorectalEsdCurabilityRequiredFields(values);
  const filledCount = required.filter((id) => values[id] !== undefined).length;
  const fieldsToShow = visibleFields(score, values);

  const result = useMemo(() => {
    if (!allFieldsFilled) return undefined;
    const filled = Object.fromEntries(
      Object.entries(values).filter(([, v]) => v !== undefined),
    ) as Record<string, number>;
    return score.compute(filled);
  }, [allFieldsFilled, score, values]);

  const handleSelect = (fieldId: string, value: number) => {
    setValues((current) => {
      const next = { ...current, [fieldId]: value };
      if (fieldId === 'depth' && value !== 1) {
        delete next.histology;
        delete next.smDepth;
        delete next.lyv;
        delete next.budding;
      }
      return next;
    });
  };

  return (
    <EsdCurabilityScreenLayout
      score={score}
      table={
        <ColorectalEsdCurabilityTable
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
