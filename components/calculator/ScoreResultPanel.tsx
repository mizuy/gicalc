import { StyleSheet, View } from 'react-native';

import { Text, useThemeColor } from '@/components/Themed';
import { SeverityColors } from '@/constants/Colors';
import type { ScoreResult } from '@/types/score';

type Props = {
  result?: ScoreResult;
  ready: boolean;
};

function formatValue(result: ScoreResult): string {
  if (result.displayMode === 'probability') {
    const value = result.probability ?? result.total;
    return `${value.toFixed(1)} %`;
  }
  if (result.maxScore != null) {
    return `${result.total} / ${result.maxScore}`;
  }
  return String(result.total);
}

export function ScoreResultPanel({ result, ready }: Props) {
  const surface = useThemeColor({}, 'surface');
  const border = useThemeColor({}, 'border');
  const textSecondary = useThemeColor({}, 'textSecondary');
  const tint = useThemeColor({}, 'tint');

  if (!ready || !result) {
    return (
      <View style={[styles.panel, { backgroundColor: surface, borderColor: border }]}>
        <Text style={[styles.placeholder, { color: textSecondary }]}>
          すべての項目を選択すると結果が表示されます
        </Text>
      </View>
    );
  }

  const severity = result.severity ?? 'none';
  const badgeColor = SeverityColors[severity];

  return (
    <View style={[styles.panel, { backgroundColor: surface, borderColor: border }]}>
      <Text style={[styles.value, { color: tint }]}>{formatValue(result)}</Text>
      <View style={[styles.badge, { backgroundColor: badgeColor }]}>
        <Text style={styles.badgeText}>{result.interpretation}</Text>
      </View>
      {result.details?.map((detail) => (
        <Text key={detail} style={[styles.detail, { color: textSecondary }]}>
          ・{detail}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  placeholder: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
  },
  value: {
    fontSize: 36,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 12,
  },
  badge: {
    alignSelf: 'center',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginBottom: 12,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  detail: {
    fontSize: 14,
    lineHeight: 22,
  },
});
