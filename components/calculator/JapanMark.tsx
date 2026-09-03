import { Image, StyleSheet, View } from 'react-native';

import { useLocale } from '@/lib/i18n';

type Props = {
  compact?: boolean;
};

export function JapanMark({ compact = false }: Props) {
  const { t } = useLocale();

  return (
    <View
      accessibilityLabel={t.japanDeveloped}
      style={[styles.frame, compact ? styles.frameCompact : styles.frameTitle]}>
      <Image
        accessibilityIgnoresInvertColors
        source={require('../../assets/images/japan-flag.png')}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#8A8A8A',
    overflow: 'hidden',
  },
  frameCompact: {
    width: 26,
    height: 17,
    marginTop: 1,
  },
  frameTitle: {
    width: 38,
    height: 25,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
