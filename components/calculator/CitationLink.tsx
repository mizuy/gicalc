import * as Linking from 'expo-linking';
import { Platform, Pressable, StyleSheet } from 'react-native';

import { Text, useThemeColor } from '@/components/Themed';
import { pubmedUrl } from '@/lib/pubmed';

type Props = {
  label: string;
  pubmed?: string;
  href?: string;
};

type WebLinkProps = {
  href: string;
  hrefAttrs: { target: string; rel: string };
};

export function CitationLink({ label, pubmed, href }: Props) {
  const tint = useThemeColor({}, 'tint');
  const textSecondary = useThemeColor({}, 'textSecondary');

  const url = href ?? (pubmed ? pubmedUrl(pubmed) : undefined);
  if (!url) {
    return <Text style={[styles.text, { color: textSecondary }]}>{label}</Text>;
  }

  if (Platform.OS === 'web') {
    const webProps: WebLinkProps = {
      href: url,
      hrefAttrs: { target: '_blank', rel: 'noopener noreferrer' },
    };
    return (
      <Text
        accessibilityRole="link"
        style={[styles.text, { color: tint }]}
        {...webProps}>
        {label}
      </Text>
    );
  }

  return (
    <Pressable
      accessibilityRole="link"
      onPress={() => {
        void Linking.openURL(url);
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
