import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet } from 'react-native';
import AccueilScreen from '../screens/AccueilScreen';
import ClubScreen from '../screens/ClubScreen';
import EquipeScreen from '../screens/EquipeScreen';
import MatchsScreen from '../screens/MatchsScreen';
import SolTvScreen from '../screens/SolTvScreen';
import { colors } from '../theme';

const Tab = createBottomTabNavigator();

type IoniconName = keyof typeof Ionicons.glyphMap;

const icon = (name: IoniconName, focused: boolean) => (
  <Ionicons name={name} size={22} color={focused ? colors.gold : colors.textMuted} />
);

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.bar,
        tabBarActiveTintColor: colors.gold,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: styles.label,
      }}
    >
      <Tab.Screen name="Accueil" component={AccueilScreen} options={{ tabBarIcon: ({ focused }) => icon('home', focused) }} />
      <Tab.Screen name="Matchs" component={MatchsScreen} options={{ tabBarIcon: ({ focused }) => icon('football', focused) }} />
      <Tab.Screen name="SOL TV" component={SolTvScreen} options={{ tabBarIcon: ({ focused }) => icon('play-circle', focused) }} />
      <Tab.Screen name="Équipe" component={EquipeScreen} options={{ tabBarIcon: ({ focused }) => icon('people', focused) }} />
      <Tab.Screen name="Club" component={ClubScreen} options={{ tabBarIcon: ({ focused }) => icon('trophy', focused) }} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  bar: { backgroundColor: colors.surface, borderTopColor: colors.border, borderTopWidth: 1, height: 60, paddingBottom: 8 },
  label: { fontSize: 11, fontWeight: '600' },
});
