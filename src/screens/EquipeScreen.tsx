import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import UserAvatar from '../components/UserAvatar';
import { borderRadius, colors, spacing, typography } from '../theme';

interface Player {
  id: string;
  name: string;
  numero: number;
  poste: string;
  avatarUrl: string;
  capitaine?: boolean;
}

const PLAYERS: Player[] = [
  { id: '1', name: 'Marc Dubois', numero: 1, poste: 'Gardien', avatarUrl: 'https://i.pravatar.cc/150?u=p1' },
  { id: '2', name: 'Théo Lambert', numero: 2, poste: 'Défenseur', avatarUrl: 'https://i.pravatar.cc/150?u=p2' },
  { id: '3', name: 'Lucas Moreau', numero: 4, poste: 'Défenseur', avatarUrl: 'https://i.pravatar.cc/150?u=p3', capitaine: true },
  { id: '4', name: 'Axel Petit', numero: 5, poste: 'Défenseur', avatarUrl: 'https://i.pravatar.cc/150?u=p4' },
  { id: '5', name: 'Rayan Benali', numero: 3, poste: 'Défenseur', avatarUrl: 'https://i.pravatar.cc/150?u=p5' },
  { id: '6', name: 'Noah Girard', numero: 6, poste: 'Milieu', avatarUrl: 'https://i.pravatar.cc/150?u=p6' },
  { id: '7', name: 'Karim Diallo', numero: 8, poste: 'Milieu', avatarUrl: 'https://i.pravatar.cc/150?u=p7' },
  { id: '8', name: 'Tom Richard', numero: 10, poste: 'Milieu', avatarUrl: 'https://i.pravatar.cc/150?u=p8' },
  { id: '9', name: 'Samir Okafor', numero: 7, poste: 'Milieu', avatarUrl: 'https://i.pravatar.cc/150?u=p9' },
  { id: '10', name: 'Enzo Faure', numero: 9, poste: 'Attaquant', avatarUrl: 'https://i.pravatar.cc/150?u=p10' },
  { id: '11', name: 'Hugo Bernard', numero: 11, poste: 'Attaquant', avatarUrl: 'https://i.pravatar.cc/150?u=p11' },
  { id: '12', name: 'Mathis Colin', numero: 16, poste: 'Gardien', avatarUrl: 'https://i.pravatar.cc/150?u=p12' },
  { id: '13', name: 'Julien Roux', numero: 14, poste: 'Milieu', avatarUrl: 'https://i.pravatar.cc/150?u=p13' },
  { id: '14', name: 'Dylan Mercier', numero: 17, poste: 'Attaquant', avatarUrl: 'https://i.pravatar.cc/150?u=p14' },
];

const POSTE_ORDER = ['Gardien', 'Défenseur', 'Milieu', 'Attaquant'];

export default function EquipeScreen() {
  const grouped = POSTE_ORDER.map((poste) => ({
    poste,
    players: PLAYERS.filter((p) => p.poste === poste),
  }));

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Équipe 1ère</Text>
        <Text style={styles.sub}>{PLAYERS.length} joueurs · Saison 2025-26</Text>
      </View>

      <FlatList
        data={grouped}
        keyExtractor={(item) => item.poste}
        renderItem={({ item }) => (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{item.poste}s</Text>
            {item.players.map((player) => (
              <PlayerRow key={player.id} player={player} />
            ))}
          </View>
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

function PlayerRow({ player }: { player: Player }) {
  return (
    <View style={styles.playerRow}>
      <View style={styles.numero}>
        <Text style={styles.numeroText}>{player.numero}</Text>
      </View>
      <UserAvatar uri={player.avatarUrl} name={player.name} size={44} />
      <View style={styles.playerInfo}>
        <View style={styles.nameRow}>
          <Text style={styles.playerName}>{player.name}</Text>
          {player.capitaine && (
            <View style={styles.capBadge}>
              <Text style={styles.capText}>C</Text>
            </View>
          )}
        </View>
        <Text style={styles.poste}>{player.poste}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  header: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
    backgroundColor: colors.dark,
    gap: 4,
  },
  title: { ...typography.h2, color: '#FFFFFF' },
  sub: { ...typography.caption, color: colors.gold },
  list: { padding: spacing.md, paddingBottom: spacing.xxl },
  section: { marginBottom: spacing.lg },
  sectionTitle: {
    ...typography.label,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: spacing.sm,
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    marginBottom: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  numero: {
    width: 32,
    alignItems: 'center',
  },
  numeroText: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.primary,
  },
  playerInfo: { flex: 1 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  playerName: { ...typography.label, color: colors.text, fontWeight: '600' },
  capBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  capText: { fontSize: 10, fontWeight: '800', color: '#fff' },
  poste: { ...typography.caption, color: colors.textSecondary, marginTop: 1 },
});
