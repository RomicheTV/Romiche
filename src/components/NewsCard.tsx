import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { borderRadius, colors, spacing, typography } from '../theme';
import type { NewsItem } from '../store/newsStore';

const CAT_COLOR = { resultat: colors.win, evenement: '#7C3AED', club: colors.gold };
const CAT_LABEL = { resultat: 'Résultat', evenement: 'Événement', club: 'Club' };

export default function NewsCard({ item }: { item: NewsItem }) {
  const days = Math.floor((Date.now() - item.date.getTime()) / 86400000);
  const label = days === 0 ? "Aujourd'hui" : days === 1 ? 'Hier' : `Il y a ${days}j`;
  const color = CAT_COLOR[item.categorie];

  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <View style={[styles.badge, { backgroundColor: color + '20' }]}>
          <Text style={[styles.badgeText, { color }]}>{CAT_LABEL[item.categorie]}</Text>
        </View>
        <Text style={styles.date}>{label}</Text>
      </View>
      <Text style={styles.titre}>{item.titre}</Text>
      <Text style={styles.contenu} numberOfLines={2}>{item.contenu}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: borderRadius.md, padding: spacing.md, marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border, gap: spacing.xs },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  badge: { paddingHorizontal: spacing.sm, paddingVertical: 3, borderRadius: borderRadius.full },
  badgeText: { fontSize: 11, fontWeight: '700', textTransform: 'uppercase' },
  date: { ...typography.caption, color: colors.textMuted },
  titre: { ...typography.h3, color: colors.text, fontSize: 16 },
  contenu: { ...typography.body, color: colors.textSecondary, lineHeight: 21 },
});
