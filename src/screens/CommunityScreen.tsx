import React, { useState } from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PostCard, { Post } from '../components/PostCard';
import UserAvatar from '../components/UserAvatar';
import { useAuthStore } from '../store/authStore';
import { borderRadius, colors, spacing, typography } from '../theme';

const MOCK_POSTS: Post[] = [
  {
    id: '1',
    userId: 'romiche',
    username: 'romichetv',
    displayName: 'RomicheTV',
    avatarUrl: 'https://i.pravatar.cc/150?u=romichetv',
    content: 'Stream ce soir à 20h ! On va se faire GTA RP avec toute la team, ça va être chaud 🔥 Soyez là !',
    likesCount: 284,
    commentsCount: 47,
    timestamp: new Date(Date.now() - 3600000),
    isLiked: false,
  },
  {
    id: '2',
    userId: '2',
    username: 'streamfan42',
    displayName: 'StreamFan42',
    avatarUrl: 'https://i.pravatar.cc/150?u=streamfan42',
    content: 'Quelqu\'un a regardé le VOD d\'hier ? Le moment avec le ban c\'était trop drôle 😂',
    likesCount: 63,
    commentsCount: 12,
    timestamp: new Date(Date.now() - 7200000),
    isLiked: true,
  },
  {
    id: '3',
    userId: '3',
    username: 'nyx_gg',
    displayName: 'Nyx_GG',
    avatarUrl: 'https://i.pravatar.cc/150?u=nyx_gg',
    content: 'Fan depuis 3 ans, jamais déçu par les streams. Meilleure communauté ever ❤️',
    likesCount: 158,
    commentsCount: 23,
    timestamp: new Date(Date.now() - 10800000),
    isLiked: false,
  },
  {
    id: '4',
    userId: '4',
    username: 'zephyrtv',
    displayName: 'ZephyrTV',
    avatarUrl: 'https://i.pravatar.cc/150?u=zephyrtv',
    content: 'CLIP DE FOLIE dans le dernier stream, le gars s\'est fait ban direct lmao. Quelqu\'un peut faire le montage ?',
    likesCount: 92,
    commentsCount: 31,
    timestamp: new Date(Date.now() - 18000000),
    isLiked: false,
  },
  {
    id: '5',
    userId: '5',
    username: 'hannastreams',
    displayName: 'HannaStreams',
    avatarUrl: 'https://i.pravatar.cc/150?u=hannastreams',
    content: 'Nouveau perso RP créé hier avec Romiche, trop content de comment ça se passe. Le RP c\'est vraiment une autre dimension.',
    likesCount: 44,
    commentsCount: 8,
    timestamp: new Date(Date.now() - 86400000),
    isLiked: false,
  },
];

export default function CommunityScreen() {
  const user = useAuthStore((s) => s.user);
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [modalVisible, setModalVisible] = useState(false);
  const [newPostText, setNewPostText] = useState('');

  const submitPost = () => {
    if (!newPostText.trim() || !user) return;
    const post: Post = {
      id: Date.now().toString(),
      userId: user.id,
      username: user.username,
      displayName: user.displayName,
      avatarUrl: user.avatarUrl,
      content: newPostText.trim(),
      likesCount: 0,
      commentsCount: 0,
      timestamp: new Date(),
      isLiked: false,
    };
    setPosts((prev) => [post, ...prev]);
    setNewPostText('');
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Communauté</Text>
        <TouchableOpacity style={styles.newPostBtn} onPress={() => setModalVisible(true)}>
          <Text style={styles.newPostBtnText}>+ Post</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostCard post={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <Text style={styles.modalTitle}>Nouveau post</Text>
            <View style={styles.modalInputRow}>
              <UserAvatar uri={user?.avatarUrl} name={user?.displayName} size={38} />
              <TextInput
                style={styles.modalInput}
                placeholder="Quoi de neuf ?"
                placeholderTextColor={colors.textMuted}
                multiline
                value={newPostText}
                onChangeText={setNewPostText}
                autoFocus
              />
            </View>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelBtnText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.submitBtn, !newPostText.trim() && styles.submitBtnDisabled]}
                onPress={submitPost}
                disabled={!newPostText.trim()}
              >
                <Text style={styles.submitBtnText}>Publier</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    ...typography.h2,
    color: colors.text,
  },
  newPostBtn: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  newPostBtnText: {
    ...typography.label,
    color: colors.text,
    fontWeight: '700',
  },
  list: {
    padding: spacing.md,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: borderRadius.lg,
    borderTopRightRadius: borderRadius.lg,
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
    gap: spacing.md,
  },
  modalTitle: {
    ...typography.h3,
    color: colors.text,
  },
  modalInputRow: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'flex-start',
  },
  modalInput: {
    flex: 1,
    ...typography.body,
    color: colors.text,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.sm,
  },
  cancelBtn: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cancelBtnText: {
    ...typography.label,
    color: colors.textSecondary,
  },
  submitBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  submitBtnDisabled: { opacity: 0.4 },
  submitBtnText: {
    ...typography.label,
    color: colors.text,
    fontWeight: '700',
  },
});
