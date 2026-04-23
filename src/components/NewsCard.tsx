import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { borderRadius, colors, spacing, typography } from '../theme';
import type { NewsItem } from '../store/newsStore';

const CATEGORY_LABELS: Record<NewsItem['category'], string> = {
  match: 'Match',
  club: 'Club',
  evenement: 'Événement',
  resultat: 'Résultat',
};

const CATEGORY_COLORS: Record<NewsItem['category'], string> = {
  match: colors.primary,
  club: colors.gold,
  evenement: '#7C3AED',
  resultat: colors.success,
};

interface Props {
  item: NewsItem;
  onPress?: () => void;
}

export default function NewsCard({ item, onPress }: Props) {
  const daysSince = Math.floor((Date.now() - item.date.getTime()) / 86400000);
  const timeLabel = daysSince === 0 ? "Aujourd'hui" : daysSince === 1 ? 'Hier' : `Il y a ${daysSince} jours`;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.top}>
        <View style={[styles.badge, { backgroundColor: CATEGORY_COLORS[item.category] + '20' }]}>
          <Text style={[styles.badgeText, { color: CATEGORY_COLORS[item.category] }]}>
            {CATEGORY_LABELS[item.category]}
          </Text>
        </View>
        <Text style={styles.date}>{timeLabel}</Text>
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.content} numberOfLines={2}>{item.content}</Text>
    </TouchableOpacity>
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
    gap: spacing.xs,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: borderRadius.full,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  date: {
    ...typography.caption,
    color: colors.textMuted,
  },
  title: {
    ...typography.h3,
    color: colors.text,
    fontSize: 16,
  },
  content: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 21,
  },
});
