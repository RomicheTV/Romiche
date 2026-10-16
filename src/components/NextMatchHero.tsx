import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { borderRadius, colors, shadow, spacing, typography } from '../theme';
import type { Match } from '../store/matchStore';

function initials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 3)
    .toUpperCase();
}

export default function NextMatchHero({ match }: { match: Match }) {
  const date = match.date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
  const heure = match.date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

  return (
    <View style={styles.card}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{match.competition.toUpperCase()}</Text>
      </View>

      <Text style={styles.date}>{date} · {heure}</Text>

      <View style={styles.teamsRow}>
        <View style={styles.team}>
          <Image source={require('../../assets/logo.png')} style={styles.crest} />
          <Text style={styles.teamName} numberOfLines={1}>S.O. Londais</Text>
        </View>

        <Text style={styles.vs}>VS</Text>

        <View style={styles.team}>
          <View style={styles.crestFallback}>
            <Text style={styles.crestFallbackText}>{initials(match.adversaire)}</Text>
          </View>
          <Text style={styles.teamName} numberOfLines={1}>{match.adversaire}</Text>
        </View>
      </View>

      <View style={styles.lieuBadge}>
        <Text style={styles.lieuText}>{match.lieu === 'domicile' ? 'À domicile' : 'À l\'extérieur'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    gap: spacing.sm,
    ...shadow,
  },
  badge: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
    borderColor: colors.gold,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
  },
  badgeText: { ...typography.caption, color: colors.gold, fontWeight: '800', letterSpacing: 0.5 },
  date: { ...typography.label, color: '#FFFFFFCC', marginTop: spacing.xs, textTransform: 'capitalize' },
  teamsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.lg, width: '100%', marginVertical: spacing.sm },
  team: { alignItems: 'center', flex: 1, gap: spacing.xs },
  crest: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#FFF' },
  crestFallback: { width: 56, height: 56, borderRadius: 28, backgroundColor: 'rgba(255,255,255,0.15)', borderWidth: 2, borderColor: '#FFFFFF55', alignItems: 'center', justifyContent: 'center' },
  crestFallbackText: { ...typography.label, color: '#FFF', fontWeight: '800' },
  teamName: { ...typography.label, color: '#FFF', fontWeight: '700', textAlign: 'center' },
  vs: { ...typography.h3, color: colors.gold, fontWeight: '800' },
  lieuBadge: { backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: borderRadius.full, paddingHorizontal: spacing.md, paddingVertical: 4, marginTop: spacing.xs },
  lieuText: { ...typography.caption, color: '#FFF', fontWeight: '600' },
});
