import { Tabs } from 'expo-router';
import { Text } from 'react-native';

import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

export default function TabLayout() {
  const colorScheme = useColorScheme();

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
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'スコア一覧',
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 18, fontWeight: '700' }}>☰</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 18, fontWeight: '700' }}>ℹ</Text>
          ),
        }}
      />
    </Tabs>
  );
}
