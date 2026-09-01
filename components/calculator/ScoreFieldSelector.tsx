import { Pressable, StyleSheet, View } from 'react-native';

import { Text, useThemeColor } from '@/components/Themed';
import type { ScoreField } from '@/types/score';

type Props = {
  field: ScoreField;
  selectedValue?: number;
  onSelect: (fieldId: string, value: number) => void;
};

export function ScoreFieldSelector({ field, selectedValue, onSelect }: Props) {
  const tint = useThemeColor({}, 'tint');
  const border = useThemeColor({}, 'border');
  const surface = useThemeColor({}, 'surface');
  const textSecondary = useThemeColor({}, 'textSecondary');

  return (
    <View style={styles.block}>
      <Text style={styles.label}>{field.label}</Text>
      {field.description ? (
        <Text style={[styles.fieldDescription, { color: textSecondary }]}>{field.description}</Text>
      ) : null}
      <View style={styles.options}>
        {field.options.map((option) => {
          const selected = selectedValue === option.value;
          return (
            <Pressable
              key={`${field.id}-${option.value}-${option.label}`}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              onPress={() => onSelect(field.id, option.value)}
              style={({ pressed }) => [
                styles.option,
                {
                  backgroundColor: selected ? `${tint}14` : surface,
                  borderColor: selected ? tint : border,
                  opacity: pressed ? 0.85 : 1,
                },
              ]}>
              <View style={styles.optionHeader}>
                <Text style={[styles.optionLabel, selected && { color: tint, fontWeight: '700' }]}>
                  {option.label}
                </Text>
                {selected ? (
                  <Text style={[styles.check, { color: tint }]}>✓</Text>
                ) : null}
              </View>
              {option.description ? (
                <Text style={[styles.optionDescription, { color: textSecondary }]}>
                  {option.description}
                </Text>
              ) : null}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  fieldDescription: {
    fontSize: 13,
    marginBottom: 8,
  },
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  option: {
    minWidth: 108,
    flexGrow: 1,
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  optionLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  check: {
    fontSize: 16,
    fontWeight: '700',
  },
  optionDescription: {
    marginTop: 4,
    fontSize: 12,
  },
});
