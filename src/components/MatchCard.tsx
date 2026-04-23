import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { borderRadius, colors, spacing, typography } from '../theme';
import type { Match } from '../store/matchStore';

interface Props {
  match: Match;
}

export default function MatchCard({ match }: Props) {
  const date = match.date.toLocaleDateString('fr-FR', {
    weekday: 'short', day: 'numeric', month: 'short',
  });
  const heure = match.date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

  let result: 'win' | 'loss' | 'draw' | null = null;
  if (match.joue && match.scoreNous != null && match.scoreEux != null) {
    if (match.scoreNous > match.scoreEux) result = 'win';
    else if (match.scoreNous < match.scoreEux) result = 'loss';
    else result = 'draw';
  }

  const resultColor = result ? colors[result] : colors.primary;
  const resultLabel = result === 'win' ? 'V' : result === 'loss' ? 'D' : result === 'draw' ? 'N' : '';

  return (
    <View style={styles.card}>
      <View style={styles.meta}>
        <Text style={styles.competition}>{match.competition}</Text>
        <View style={[styles.lieuBadge, match.lieu === 'domicile' && styles.lieuHome]}>
          <Text style={styles.lieuText}>
            {match.lieu === 'domicile' ? 'DOM' : 'EXT'}
          </Text>
        </View>
      </View>

      <View style={styles.scoreRow}>
        <Text style={styles.team} numberOfLines={1}>S.O. Londais</Text>

        {match.joue ? (
          <View style={[styles.scoreBox, { borderColor: resultColor }]}>
            <Text style={[styles.score, { color: resultColor }]}>
              {match.scoreNous} - {match.scoreEux}
            </Text>
            {resultLabel ? (
              <View style={[styles.resultBadge, { backgroundColor: resultColor }]}>
                <Text style={styles.resultLetter}>{resultLabel}</Text>
              </View>
            ) : null}
          </View>
        ) : (
          <View style={styles.vsBox}>
            <Text style={styles.vs}>VS</Text>
            <Text style={styles.heure}>{heure}</Text>
          </View>
        )}

        <Text style={[styles.team, styles.teamRight]} numberOfLines={1}>{match.adversaire}</Text>
      </View>

      <Text style={styles.date}>{date}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  competition: {
    ...typography.caption,
    color: colors.textMuted,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  lieuBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surfaceElevated,
  },
  lieuHome: {
    backgroundColor: colors.primary + '20',
  },
  lieuText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.primary,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  team: {
    ...typography.label,
    color: colors.text,
    fontWeight: '700',
    flex: 1,
  },
  teamRight: {
    textAlign: 'right',
  },
  scoreBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    borderWidth: 1.5,
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  score: {
    fontSize: 18,
    fontWeight: '800',
  },
  resultBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultLetter: {
    fontSize: 10,
    fontWeight: '800',
    color: '#fff',
  },
  vsBox: {
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  vs: {
    ...typography.label,
    color: colors.textMuted,
    fontWeight: '700',
  },
  heure: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
  },
  date: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
