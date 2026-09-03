import { Image, StyleSheet, View } from 'react-native';

import { useLocale } from '@/lib/i18n';

type Props = {
  compact?: boolean;
};

export function JapanMark({ compact = false }: Props) {
  const { t } = useLocale();

  return (
    <View style={compact ? styles.compact : undefined}>
      <Image
        accessibilityLabel={t.japanDeveloped}
        source={require('../../assets/images/japan-flag.png')}
        style={compact ? styles.flagCompact : styles.flagTitle}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  compact: {
    marginTop: 2,
  },
  flagCompact: {
    width: 24,
    height: 16,
    borderWidth: 1,
    borderColor: '#C8C8C8',
  },
  flagTitle: {
    width: 36,
    height: 24,
    borderWidth: 1,
    borderColor: '#C8C8C8',
  },
});
