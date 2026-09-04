import { StyleSheet, View } from 'react-native';

import { useLocale } from '@/lib/i18n';

/** 日の丸（日本開発マーク）。PNG ではなく View で描画し、読み込み遅延を避ける。 */
const FLAG_RED = '#BC002D';

type Props = {
  compact?: boolean;
};

export function JapanMark({ compact = false }: Props) {
  const { t } = useLocale();
  const frame = compact ? styles.frameCompact : styles.frameTitle;
  const disc = compact ? styles.discCompact : styles.discTitle;

  return (
    <View accessibilityLabel={t.japanDeveloped} style={[styles.frame, frame]}>
      <View style={[styles.flag, frame]}>
        <View style={[styles.disc, disc]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#8A8A8A',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
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
  flag: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disc: {
    backgroundColor: FLAG_RED,
  },
  discCompact: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  discTitle: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
});
