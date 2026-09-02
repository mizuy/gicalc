import { Tabs } from 'expo-router';
import { Text } from 'react-native';

import { LanguageToggle } from '@/components/LanguageToggle';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { useLocale } from '@/lib/i18n';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { t } = useLocale();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarInactiveTintColor: Colors[colorScheme].tabIconDefault,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme].surface,
          borderTopColor: Colors[colorScheme].border,
        },
        headerStyle: {
          backgroundColor: Colors[colorScheme].surface,
        },
        headerTitleStyle: {
          fontWeight: '700',
        },
        headerShown: useClientOnlyValue(false, true),
        headerRight: () => <LanguageToggle />,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: t.tabs.scores,
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 18, fontWeight: '700' }}>☰</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: t.tabs.about,
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 18, fontWeight: '700' }}>ℹ</Text>
          ),
        }}
      />
    </Tabs>
  );
}
