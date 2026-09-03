import { StyleSheet, View } from 'react-native';

import { Text } from '@/components/Themed';
import { useLocale } from '@/lib/i18n';

type Props = {
  compact?: boolean;
};

export function JapanMark({ compact = false }: Props) {
  const { t } = useLocale();

  return (
    <View
      accessibilityRole="text"
      accessibilityLabel={t.japanDeveloped}
      style={compact ? styles.compact : undefined}>
      <Text style={styles.flag}>🇯🇵</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  compact: {
    marginTop: 1,
  },
  flag: {
    fontSize: 14,
    lineHeight: 18,
  },
});
