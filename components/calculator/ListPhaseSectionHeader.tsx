import { Image, StyleSheet, View } from 'react-native';

import { Text, useThemeColor } from '@/components/Themed';
import { LIST_PHASE_ICONS } from '@/lib/listPhaseIcons';
import type { ListClinicalPhase } from '@/types/score';

type Props = {
  phase: ListClinicalPhase;
  label: string;
};

export function ListPhaseSectionHeader({ phase, label }: Props) {
  const textSecondary = useThemeColor({}, 'textSecondary');

  return (
    <View style={styles.row}>
      <Image
        accessibilityIgnoresInvertColors
        source={LIST_PHASE_ICONS[phase]}
        style={styles.icon}
        resizeMode="contain"
      />
      <Text style={[styles.label, { color: textSecondary }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  label: {
    flex: 1,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
});
