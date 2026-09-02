import { StyleSheet, View } from 'react-native';

import { Text } from '@/components/Themed';
import { TOOL_KIND_COLORS } from '@/constants/Colors';
import { TOOL_KIND_LABELS, type ToolKind } from '@/types/score';

type Props = {
  kind: ToolKind;
};

export function ToolKindBadge({ kind }: Props) {
  const colors = TOOL_KIND_COLORS[kind];

  return (
    <View
      accessibilityRole="text"
      accessibilityLabel={TOOL_KIND_LABELS[kind]}
      style={[styles.badge, { backgroundColor: colors.background }]}>
      <Text style={[styles.label, { color: colors.text }]} numberOfLines={1}>
        {TOOL_KIND_LABELS[kind]}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  label: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
