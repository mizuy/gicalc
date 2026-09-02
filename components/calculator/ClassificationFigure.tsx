import { Image, StyleSheet, View } from 'react-native';

import { CitationLink } from '@/components/calculator/CitationLink';
import { Text, useThemeColor } from '@/components/Themed';
import { useLocale } from '@/lib/i18n';
import { publicPath } from '@/lib/web/baseUrl';
import type { ClassificationFigure as Figure } from '@/types/score';

type Props = {
  figure: Figure;
};

export function ClassificationFigure({ figure }: Props) {
  const surface = useThemeColor({}, 'surface');
  const border = useThemeColor({}, 'border');
  const textSecondary = useThemeColor({}, 'textSecondary');
  const { t } = useLocale();

  return (
    <View style={[styles.box, { backgroundColor: surface, borderColor: border }]}>
      <Image
        accessibilityLabel={figure.alt}
        source={{ uri: publicPath(figure.src) }}
        style={[styles.image, { aspectRatio: figure.aspectRatio }]}
        resizeMode="contain"
      />
      <Text style={styles.caption}>{figure.caption}</Text>
      <CitationLink label={`${t.source}: ${figure.source}`} pubmed={figure.pubmed} />
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
  note: {
    fontSize: 11,
    lineHeight: 16,
    marginTop: 4,
  },
});
