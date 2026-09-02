import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { useLocale } from '@/lib/i18n';

export default function NotFoundScreen() {
  const { t } = useLocale();

  return (
    <>
      <Stack.Screen options={{ title: t.notFoundTitle }} />
      <View style={styles.container}>
        <Text style={styles.title}>{t.notFoundBody}</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>{t.notFoundLink}</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#0D7377',
  },
});
