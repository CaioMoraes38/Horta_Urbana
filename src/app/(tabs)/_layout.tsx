import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import { TabBarIcon } from '@/src/components/navigation/TabBarIcon';
import { Colors } from '@/src/constants/Colors';
import { useColorScheme } from '@/src/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs

      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="horta"
        options={{
          title: 'Horta',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'add-circle-outline' : 'add-circle-outline'} color={color} />
            
          ),
        }}
      />
      <Tabs.Screen
        name="historico"
        options={{
          title: 'Historico',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'analytics-outline' : 'analytics-outline'} color={color} />
            
          ),
        }}
      />      
    </Tabs>
    
  );
}
