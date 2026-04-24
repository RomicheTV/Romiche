import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import AccueilScreen from '../screens/AccueilScreen';
import ClubScreen from '../screens/ClubScreen';
import EquipeScreen from '../screens/EquipeScreen';
import MatchsScreen from '../screens/MatchsScreen';
import { colors } from '../theme';

const Tab = createBottomTabNavigator();

const icon = (emoji: string, focused: boolean) => (
  <Text style={{ fontSize: 22, opacity: focused ? 1 : 0.45 }}>{emoji}</Text>
);

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.bar,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: styles.label,
      }}
    >
      <Tab.Screen name="Accueil" component={AccueilScreen} options={{ tabBarIcon: ({ focused }) => icon('🏠', focused) }} />
      <Tab.Screen name="Matchs" component={MatchsScreen} options={{ tabBarIcon: ({ focused }) => icon('⚽', focused) }} />
      <Tab.Screen name="Équipe" component={EquipeScreen} options={{ tabBarIcon: ({ focused }) => icon('👥', focused) }} />
      <Tab.Screen name="Club" component={ClubScreen} options={{ tabBarIcon: ({ focused }) => icon('🏆', focused) }} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  bar: { backgroundColor: colors.surface, borderTopColor: colors.border, borderTopWidth: 1, height: 60, paddingBottom: 8 },
  label: { fontSize: 11, fontWeight: '600' },
});
