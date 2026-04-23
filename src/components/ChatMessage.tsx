import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { borderRadius, colors, spacing, typography } from '../theme';
import UserAvatar from './UserAvatar';
import type { Message } from '../store/chatStore';

interface Props {
  message: Message;
  isOwn: boolean;
}

export default function ChatMessage({ message, isOwn }: Props) {
  const time = message.timestamp.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  if (isOwn) {
    return (
      <View style={styles.ownRow}>
        <View style={styles.ownBubble}>
          <Text style={styles.ownText}>{message.content}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.row}>
      <UserAvatar uri={message.avatarUrl} name={message.username} size={32} />
      <View style={styles.group}>
        <Text style={styles.username}>{message.username}</Text>
        <View style={styles.bubble}>
          <Text style={styles.text}>{message.content}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  ownRow: {
    alignItems: 'flex-end',
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  group: {
    flex: 1,
    maxWidth: '75%',
  },
  username: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  bubble: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: borderRadius.md,
    borderBottomLeftRadius: borderRadius.sm,
    padding: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  text: {
    ...typography.body,
    color: colors.text,
  },
  ownBubble: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    borderBottomRightRadius: borderRadius.sm,
    padding: spacing.sm,
    paddingHorizontal: spacing.md,
    maxWidth: '75%',
  },
  ownText: {
    ...typography.body,
    color: colors.text,
  },
  time: {
    ...typography.caption,
    color: 'rgba(255,255,255,0.5)',
    marginTop: 2,
    textAlign: 'right',
  },
});
