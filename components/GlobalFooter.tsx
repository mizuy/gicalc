import { usePathname, useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text, useThemeColor } from '@/components/Themed';
import { useLocale } from '@/lib/i18n';

type FooterItemProps = {
  href: '/' | '/about';
  icon: 'menu' | 'info';
  label: string;
  selected: boolean;
};

function FooterIcon({ icon, color }: Pick<FooterItemProps, 'icon'> & { color: string }) {
  if (icon === 'menu') {
    return (
      <View style={styles.iconFrame}>
        <View style={styles.menuIcon}>
          <View style={[styles.menuBar, { backgroundColor: color }]} />
          <View style={[styles.menuBar, { backgroundColor: color }]} />
          <View style={[styles.menuBar, { backgroundColor: color }]} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.iconFrame}>
      <View style={[styles.infoIcon, { borderColor: color }]}>
        <View style={[styles.infoDot, { backgroundColor: color }]} />
        <View style={[styles.infoStem, { backgroundColor: color }]} />
      </View>
    </View>
  );
}

function FooterItem({ href, icon, label, selected }: FooterItemProps) {
  const router = useRouter();
  const tint = useThemeColor({}, 'tint');
  const inactive = useThemeColor({}, 'tabIconDefault');
  const color = selected ? tint : inactive;

  return (
    <Pressable
      accessibilityRole="tab"
      accessibilityState={{ selected }}
      onPress={() => router.navigate(href)}
      style={({ pressed }) => [styles.item, { opacity: pressed ? 0.65 : 1 }]}>
      <FooterIcon icon={icon} color={color} />
      <Text style={[styles.label, { color }]}>{label}</Text>
    </Pressable>
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
      <FooterItem href="/" icon="menu" label={t.tabs.scores} selected={homeSelected} />
      <FooterItem href="/about" icon="info" label={t.tabs.about} selected={aboutSelected} />
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    minHeight: 52,
    width: '100%',
  },
  item: {
    alignItems: 'center',
    flex: 1,
    flexBasis: 0,
    justifyContent: 'center',
    minHeight: 50,
    paddingHorizontal: 12,
    paddingTop: 6,
  },
  iconFrame: {
    alignItems: 'center',
    height: 20,
    justifyContent: 'center',
    width: 24,
  },
  menuIcon: {
    gap: 3,
    width: 18,
  },
  menuBar: {
    borderRadius: 1,
    height: 2,
    width: 18,
  },
  infoIcon: {
    alignItems: 'center',
    borderRadius: 9,
    borderWidth: 2,
    height: 18,
    justifyContent: 'center',
    width: 18,
  },
  infoDot: {
    borderRadius: 1,
    height: 2,
    marginBottom: 2,
    width: 2,
  },
  infoStem: {
    borderRadius: 1,
    height: 7,
    width: 2,
  },
  label: {
    fontSize: 10,
    fontWeight: '600',
    lineHeight: 14,
    textAlign: 'center',
    width: '100%',
  },
});
