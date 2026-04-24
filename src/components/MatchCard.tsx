import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { borderRadius, colors, spacing, typography } from '../theme';
import type { Match } from '../store/matchStore';

export default function MatchCard({ match }: { match: Match }) {
  const date = match.date.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' });
  const heure = match.date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

  const result = match.joue && match.scoreNous != null && match.scoreEux != null
    ? match.scoreNous > match.scoreEux ? 'win' : match.scoreNous < match.scoreEux ? 'loss' : 'draw'
    : null;

  const resultColor = result ? colors[result] : colors.primary;

  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <Text style={styles.competition}>{match.competition}</Text>
        <View style={[styles.lieuBadge, match.lieu === 'domicile' && styles.lieuHome]}>
          <Text style={styles.lieuText}>{match.lieu === 'domicile' ? 'DOM' : 'EXT'}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <Text style={styles.team}>S.O. Londais</Text>
        {match.joue ? (
          <View style={[styles.scoreBox, { borderColor: resultColor }]}>
            <Text style={[styles.score, { color: resultColor }]}>
              {match.scoreNous} - {match.scoreEux}
            </Text>
          </View>
        ) : (
          <View style={styles.vsBox}>
            <Text style={styles.vs}>VS</Text>
            <Text style={styles.heure}>{heure}</Text>
          </View>
        )}
        <Text style={[styles.team, { textAlign: 'right' }]}>{match.adversaire}</Text>
      </View>

      <Text style={styles.date}>{date}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: borderRadius.md, padding: spacing.md, marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border, gap: spacing.sm },
  top: { flexDirection: 'row', justifyContent: 'space-between' },
  competition: { ...typography.caption, color: colors.textMuted, fontWeight: '600', textTransform: 'uppercase' },
  lieuBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: borderRadius.full, backgroundColor: colors.surfaceElevated },
  lieuHome: { backgroundColor: colors.primary + '20' },
  lieuText: { fontSize: 10, fontWeight: '700', color: colors.primary },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.sm },
  team: { ...typography.label, color: colors.text, fontWeight: '700', flex: 1 },
  scoreBox: { borderWidth: 1.5, borderRadius: borderRadius.sm, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs },
  score: { fontSize: 18, fontWeight: '800' },
  vsBox: { alignItems: 'center', paddingHorizontal: spacing.md },
  vs: { ...typography.label, color: colors.textMuted, fontWeight: '700' },
  heure: { ...typography.caption, color: colors.primary, fontWeight: '600' },
  date: { ...typography.caption, color: colors.textSecondary, textAlign: 'center' },
});
