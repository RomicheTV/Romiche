import { create } from 'zustand';

export interface Message {
  id: string;
  roomId: string;
  userId: string;
  username: string;
  avatarUrl: string;
  content: string;
  timestamp: Date;
}

export interface ChatRoom {
  id: string;
  name: string;
  avatarUrl: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  isLive: boolean;
}

interface ChatState {
  rooms: ChatRoom[];
  messages: Record<string, Message[]>;
  sendMessage: (roomId: string, content: string, userId: string, username: string, avatarUrl: string) => void;
}

const MOCK_ROOMS: ChatRoom[] = [
  {
    id: 'general',
    name: 'Chat général',
    avatarUrl: 'https://i.pravatar.cc/150?u=general',
    lastMessage: 'Salut tout le monde !',
    lastMessageTime: new Date(Date.now() - 60000),
    unreadCount: 3,
    isLive: true,
  },
  {
    id: 'romiche',
    name: 'RomicheTV Live',
    avatarUrl: 'https://i.pravatar.cc/150?u=romichetv',
    lastMessage: 'GG le stream !',
    lastMessageTime: new Date(Date.now() - 300000),
    unreadCount: 12,
    isLive: true,
  },
  {
    id: 'clips',
    name: 'Meilleurs clips',
    avatarUrl: 'https://i.pravatar.cc/150?u=clips',
    lastMessage: 'Vous avez vu le clip d\'hier ?',
    lastMessageTime: new Date(Date.now() - 3600000),
    unreadCount: 0,
    isLive: false,
  },
  {
    id: 'hors-sujet',
    name: 'Hors sujet',
    avatarUrl: 'https://i.pravatar.cc/150?u=horssujet',
    lastMessage: 'On mange quoi ce soir ?',
    lastMessageTime: new Date(Date.now() - 7200000),
    unreadCount: 1,
    isLive: false,
  },
];

const MOCK_MESSAGES: Record<string, Message[]> = {
  general: [
    { id: '1', roomId: 'general', userId: '2', username: 'StreamFan42', avatarUrl: 'https://i.pravatar.cc/150?u=2', content: 'Salut tout le monde !', timestamp: new Date(Date.now() - 300000) },
    { id: '2', roomId: 'general', userId: '3', username: 'Nyx_GG', avatarUrl: 'https://i.pravatar.cc/150?u=3', content: 'Hey ! Romiche stream ce soir ?', timestamp: new Date(Date.now() - 240000) },
    { id: '3', roomId: 'general', userId: '4', username: 'LePremierArrive', avatarUrl: 'https://i.pravatar.cc/150?u=4', content: 'Oui à 20h comme d\'hab', timestamp: new Date(Date.now() - 180000) },
    { id: '4', roomId: 'general', userId: '2', username: 'StreamFan42', avatarUrl: 'https://i.pravatar.cc/150?u=2', content: 'PogChamp on y sera !', timestamp: new Date(Date.now() - 120000) },
    { id: '5', roomId: 'general', userId: '5', username: 'ZephyrTV', avatarUrl: 'https://i.pravatar.cc/150?u=5', content: 'Hype max !!', timestamp: new Date(Date.now() - 60000) },
  ],
  romiche: [
    { id: '1', roomId: 'romiche', userId: '3', username: 'Nyx_GG', avatarUrl: 'https://i.pravatar.cc/150?u=3', content: 'Le jeu de ce soir c\'est lequel ?', timestamp: new Date(Date.now() - 600000) },
    { id: '2', roomId: 'romiche', userId: '6', username: 'HannaStreams', avatarUrl: 'https://i.pravatar.cc/150?u=6', content: 'GTA je crois', timestamp: new Date(Date.now() - 540000) },
    { id: '3', roomId: 'romiche', userId: '4', username: 'LePremierArrive', avatarUrl: 'https://i.pravatar.cc/150?u=4', content: 'GG le stream !', timestamp: new Date(Date.now() - 300000) },
  ],
};

export const useChatStore = create<ChatState>((set) => ({
  rooms: MOCK_ROOMS,
  messages: MOCK_MESSAGES,

  sendMessage: (roomId, content, userId, username, avatarUrl) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      roomId,
      userId,
      username,
      avatarUrl,
      content,
      timestamp: new Date(),
    };
    set((state) => ({
      messages: {
        ...state.messages,
        [roomId]: [...(state.messages[roomId] ?? []), newMessage],
      },
      rooms: state.rooms.map((r) =>
        r.id === roomId
          ? { ...r, lastMessage: content, lastMessageTime: new Date(), unreadCount: 0 }
          : r,
      ),
    }));
  },
}));
