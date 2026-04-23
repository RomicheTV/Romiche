import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { borderRadius, colors, spacing, typography } from '../theme';
import UserAvatar from './UserAvatar';

export interface Post {
  id: string;
  userId: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  content: string;
  imageUrl?: string;
  likesCount: number;
  commentsCount: number;
  timestamp: Date;
  isLiked?: boolean;
}

interface Props {
  post: Post;
  onPress?: () => void;
}

export default function PostCard({ post, onPress }: Props) {
  const [liked, setLiked] = useState(post.isLiked ?? false);
  const [likesCount, setLikesCount] = useState(post.likesCount);

  const toggleLike = () => {
    setLiked((v) => {
      setLikesCount((c) => (v ? c - 1 : c + 1));
      return !v;
    });
  };

  const timeAgo = formatTimeAgo(post.timestamp);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.header}>
        <UserAvatar uri={post.avatarUrl} name={post.displayName} size={42} />
        <View style={styles.headerText}>
          <Text style={styles.displayName}>{post.displayName}</Text>
          <Text style={styles.meta}>
            @{post.username} · {timeAgo}
          </Text>
        </View>
      </View>

      <Text style={styles.content}>{post.content}</Text>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.action} onPress={toggleLike}>
          <Text style={[styles.actionIcon, liked && styles.actionIconActive]}>
            {liked ? '♥' : '♡'}
          </Text>
          <Text style={[styles.actionCount, liked && styles.actionCountActive]}>
            {likesCount}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.action} onPress={onPress}>
          <Text style={styles.actionIcon}>💬</Text>
          <Text style={styles.actionCount}>{post.commentsCount}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.action}>
          <Text style={styles.actionIcon}>↗</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}min`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
  return `${Math.floor(seconds / 86400)}j`;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  headerText: {
    marginLeft: spacing.sm,
    flex: 1,
  },
  displayName: {
    ...typography.label,
    color: colors.text,
    fontWeight: '600',
  },
  meta: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  content: {
    ...typography.body,
    color: colors.text,
    lineHeight: 22,
    marginBottom: spacing.md,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  actionIcon: {
    fontSize: 18,
    color: colors.textSecondary,
  },
  actionIconActive: {
    color: colors.primary,
  },
  actionCount: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  actionCountActive: {
    color: colors.primary,
  },
});
