import React, { useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ChatMessage from '../components/ChatMessage';
import UserAvatar from '../components/UserAvatar';
import { useAuthStore } from '../store/authStore';
import { useChatStore, type ChatRoom } from '../store/chatStore';
import { borderRadius, colors, spacing, typography } from '../theme';

export default function ChatScreen() {
  const [activeRoom, setActiveRoom] = useState<ChatRoom | null>(null);

  if (activeRoom) {
    return (
      <RoomView room={activeRoom} onBack={() => setActiveRoom(null)} />
    );
  }

  return <RoomList onSelectRoom={setActiveRoom} />;
}

function RoomList({ onSelectRoom }: { onSelectRoom: (r: ChatRoom) => void }) {
  const rooms = useChatStore((s) => s.rooms);

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Chat</Text>
      </View>
      <FlatList
        data={rooms}
        keyExtractor={(r) => r.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.roomRow}
            onPress={() => onSelectRoom(item)}
            activeOpacity={0.8}
          >
            <UserAvatar
              uri={item.avatarUrl}
              name={item.name}
              size={48}
              showOnline
              isOnline={item.isLive}
            />
            <View style={styles.roomInfo}>
              <View style={styles.roomTop}>
                <Text style={styles.roomName}>{item.name}</Text>
                <Text style={styles.roomTime}>{formatTime(item.lastMessageTime)}</Text>
              </View>
              <View style={styles.roomBottom}>
                <Text style={styles.roomLast} numberOfLines={1}>
                  {item.lastMessage}
                </Text>
                {item.unreadCount > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.unreadCount}</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={{ paddingBottom: spacing.md }}
      />
    </SafeAreaView>
  );
}

function RoomView({ room, onBack }: { room: ChatRoom; onBack: () => void }) {
  const user = useAuthStore((s) => s.user);
  const messages = useChatStore((s) => s.messages[room.id] ?? []);
  const sendMessage = useChatStore((s) => s.sendMessage);
  const [text, setText] = useState('');
  const listRef = useRef<FlatList>(null);

  const handleSend = () => {
    if (!text.trim() || !user) return;
    sendMessage(room.id, text.trim(), user.id, user.username, user.avatarUrl);
    setText('');
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 50);
  };

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <View style={styles.roomHeader}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <UserAvatar uri={room.avatarUrl} name={room.name} size={34} showOnline isOnline={room.isLive} />
        <View style={styles.roomHeaderText}>
          <Text style={styles.roomHeaderName}>{room.name}</Text>
          <Text style={styles.roomHeaderStatus}>
            {room.isLive ? '● En direct' : 'Hors ligne'}
          </Text>
        </View>
      </View>

      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(m) => m.id}
        renderItem={({ item }) => (
          <ChatMessage message={item} isOwn={item.userId === user?.id} />
        )}
        onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: false })}
        contentContainerStyle={{ paddingVertical: spacing.md }}
        showsVerticalScrollIndicator={false}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.inputBar}>
          <TextInput
            style={styles.chatInput}
            placeholder="Envoyer un message..."
            placeholderTextColor={colors.textMuted}
            value={text}
            onChangeText={setText}
            multiline
            returnKeyType="send"
            onSubmitEditing={handleSend}
          />
          <TouchableOpacity
            style={[styles.sendBtn, !text.trim() && styles.sendBtnDisabled]}
            onPress={handleSend}
            disabled={!text.trim()}
          >
            <Text style={styles.sendIcon}>➤</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function formatTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  if (diff < 60000) return 'maintenant';
  if (diff < 3600000) return `${Math.floor(diff / 60000)}min`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h`;
  return `${Math.floor(diff / 86400000)}j`;
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    ...typography.h2,
    color: colors.text,
  },
  roomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  roomInfo: {
    flex: 1,
    gap: 4,
  },
  roomTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  roomName: {
    ...typography.label,
    color: colors.text,
    fontWeight: '600',
  },
  roomTime: {
    ...typography.caption,
    color: colors.textMuted,
  },
  roomBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  roomLast: {
    ...typography.caption,
    color: colors.textSecondary,
    flex: 1,
    marginRight: spacing.sm,
  },
  badge: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.full,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.text,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: 80,
  },
  roomHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.sm,
  },
  backBtn: {
    padding: spacing.xs,
  },
  backText: {
    fontSize: 22,
    color: colors.text,
  },
  roomHeaderText: {
    flex: 1,
  },
  roomHeaderName: {
    ...typography.label,
    color: colors.text,
    fontWeight: '600',
  },
  roomHeaderStatus: {
    ...typography.caption,
    color: colors.online,
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: spacing.sm,
    backgroundColor: colors.background,
  },
  chatInput: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    color: colors.text,
    ...typography.body,
    maxHeight: 100,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnDisabled: {
    backgroundColor: colors.surfaceElevated,
  },
  sendIcon: {
    color: colors.text,
    fontSize: 16,
  },
});
