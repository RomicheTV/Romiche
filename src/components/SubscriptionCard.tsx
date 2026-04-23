import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { borderRadius, colors, spacing, typography } from '../theme';
import UserAvatar from './UserAvatar';

export interface Streamer {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  category: string;
  isLive: boolean;
  viewersCount?: number;
  subscribedSince: string;
}

interface Props {
  streamer: Streamer;
  onPress?: () => void;
  onUnsubscribe?: () => void;
}

export default function SubscriptionCard({ streamer, onPress, onUnsubscribe }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <UserAvatar
        uri={streamer.avatarUrl}
        name={streamer.displayName}
        size={52}
        showOnline
        isOnline={streamer.isLive}
      />

      <View style={styles.info}>
        <View style={styles.nameRow}>
          <Text style={styles.displayName}>{streamer.displayName}</Text>
          {streamer.isLive && (
            <View style={styles.liveBadge}>
              <Text style={styles.liveText}>EN DIRECT</Text>
            </View>
          )}
        </View>
        <Text style={styles.category}>{streamer.category}</Text>
        {streamer.isLive && streamer.viewersCount != null && (
          <Text style={styles.viewers}>{streamer.viewersCount.toLocaleString('fr-FR')} spectateurs</Text>
        )}
        {!streamer.isLive && (
          <Text style={styles.since}>Abonné depuis {streamer.subscribedSince}</Text>
        )}
      </View>

      <TouchableOpacity style={styles.unsub} onPress={onUnsubscribe}>
        <Text style={styles.unsubText}>−</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  info: {
    flex: 1,
    gap: 3,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  displayName: {
    ...typography.label,
    color: colors.text,
    fontWeight: '600',
  },
  liveBadge: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.sm,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  liveText: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: 0.5,
  },
  category: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  viewers: {
    ...typography.caption,
    color: colors.primary,
  },
  since: {
    ...typography.caption,
    color: colors.textMuted,
  },
  unsub: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unsubText: {
    color: colors.textSecondary,
    fontSize: 20,
    lineHeight: 22,
  },
});
