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
    width: 18,
    height: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#D0D0D0',
  },
  flagTitle: {
    width: 27,
    height: 18,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#D0D0D0',
  },
});
