import * as Linking from 'expo-linking';
import { Image, Pressable, StyleSheet, View } from 'react-native';

import { Text, useThemeColor } from '@/components/Themed';
import { publicPath } from '@/lib/web/baseUrl';
import type { ClassificationFigure as Figure } from '@/types/score';

type Props = {
  figure: Figure;
};

export function ClassificationFigure({ figure }: Props) {
  const surface = useThemeColor({}, 'surface');
  const border = useThemeColor({}, 'border');
  const textSecondary = useThemeColor({}, 'textSecondary');
  const tint = useThemeColor({}, 'tint');

  return (
    <View style={[styles.box, { backgroundColor: surface, borderColor: border }]}>
      <Image
        accessibilityLabel={figure.alt}
        source={{ uri: publicPath(figure.src) }}
        style={[styles.image, { aspectRatio: figure.aspectRatio }]}
        resizeMode="contain"
      />
      <Text style={styles.caption}>{figure.caption}</Text>
      {figure.doi ? (
        <Pressable
          accessibilityRole="link"
          onPress={() => {
            void Linking.openURL(figure.doi!);
          }}>
          <Text style={[styles.source, { color: tint }]}>出典: {figure.source}</Text>
        </Pressable>
      ) : (
        <Text style={[styles.source, { color: textSecondary }]}>出典: {figure.source}</Text>
      )}
      <Text style={[styles.note, { color: textSecondary }]}>{figure.note}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
    marginBottom: 16,
  },
  image: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
  caption: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 10,
    lineHeight: 20,
  },
  source: {
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4,
    textDecorationLine: 'underline',
  },
  note: {
    fontSize: 11,
    lineHeight: 16,
    marginTop: 4,
  },
});
