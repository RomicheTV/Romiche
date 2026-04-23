import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import AccueilScreen from '../screens/AccueilScreen';
import ClubScreen from '../screens/ClubScreen';
import EquipeScreen from '../screens/EquipeScreen';
import MatchsScreen from '../screens/MatchsScreen';
import { colors } from '../theme';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tab.Screen
        name="Accueil"
        component={AccueilScreen}
        options={{ tabBarIcon: ({ color }) => <Text style={{ fontSize: 22, opacity: color === colors.primary ? 1 : 0.5 }}>🏠</Text> }}
      />
      <Tab.Screen
        name="Matchs"
        component={MatchsScreen}
        options={{ tabBarIcon: ({ color }) => <Text style={{ fontSize: 22, opacity: color === colors.primary ? 1 : 0.5 }}>⚽</Text> }}
      />
      <Tab.Screen
        name="Équipe"
        component={EquipeScreen}
        options={{ tabBarIcon: ({ color }) => <Text style={{ fontSize: 22, opacity: color === colors.primary ? 1 : 0.5 }}>👥</Text> }}
      />
      <Tab.Screen
        name="Club"
        component={ClubScreen}
        options={{ tabBarIcon: ({ color }) => <Text style={{ fontSize: 22, opacity: color === colors.primary ? 1 : 0.5 }}>🏆</Text> }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.surface,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    height: 60,
    paddingBottom: 8,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
});
