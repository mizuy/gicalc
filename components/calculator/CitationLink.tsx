import * as Linking from 'expo-linking';
import { Pressable, StyleSheet } from 'react-native';

import { Text, useThemeColor } from '@/components/Themed';
import { pubmedUrl } from '@/lib/pubmed';

type Props = {
  label: string;
  pubmed?: string;
};

export function CitationLink({ label, pubmed }: Props) {
  const tint = useThemeColor({}, 'tint');
  const textSecondary = useThemeColor({}, 'textSecondary');

  if (!pubmed) {
    return <Text style={[styles.text, { color: textSecondary }]}>{label}</Text>;
  }

  return (
    <Pressable
      accessibilityRole="link"
      onPress={() => {
        void Linking.openURL(pubmedUrl(pubmed));
      }}>
      <Text style={[styles.text, { color: tint }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4,
    textDecorationLine: 'underline',
  },
});
