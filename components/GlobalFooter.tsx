import { Link, usePathname } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text, useThemeColor } from '@/components/Themed';
import { useLocale } from '@/lib/i18n';

type FooterItemProps = {
  href: '/' | '/about';
  icon: string;
  label: string;
  selected: boolean;
};

function FooterItem({ href, icon, label, selected }: FooterItemProps) {
  const tint = useThemeColor({}, 'tint');
  const inactive = useThemeColor({}, 'tabIconDefault');
  const color = selected ? tint : inactive;

  return (
    <Link href={href} asChild>
      <Pressable
        accessibilityRole="tab"
        accessibilityState={{ selected }}
        style={({ pressed }) => [styles.item, { opacity: pressed ? 0.65 : 1 }]}>
        <Text style={[styles.icon, { color }]}>{icon}</Text>
        <Text style={[styles.label, { color }]}>{label}</Text>
      </Pressable>
    </Link>
  );
}

export function GlobalFooter() {
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const surface = useThemeColor({}, 'surface');
  const border = useThemeColor({}, 'border');
  const { t } = useLocale();

  const aboutSelected = pathname === '/about' || pathname === '/citations';
  const homeSelected =
    pathname === '/' || pathname.startsWith('/organ/') || pathname.startsWith('/score/');

  return (
    <View
      accessibilityRole="tablist"
      style={[
        styles.footer,
        {
          backgroundColor: surface,
          borderTopColor: border,
          paddingBottom: Math.max(insets.bottom, 4),
        },
      ]}>
      <FooterItem href="/" icon="☰" label={t.tabs.scores} selected={homeSelected} />
      <FooterItem href="/about" icon="ℹ" label={t.tabs.about} selected={aboutSelected} />
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    minHeight: 52,
  },
  item: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    minHeight: 50,
    paddingHorizontal: 12,
    paddingTop: 6,
  },
  icon: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 20,
  },
  label: {
    fontSize: 10,
    fontWeight: '600',
    lineHeight: 14,
  },
});
