import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  bio: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loadSession: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => void;
}

// Mock user for demo
const MOCK_USER: User = {
  id: '1',
  username: 'romiche_fan',
  displayName: 'RomicheFan',
  avatarUrl: 'https://i.pravatar.cc/150?u=romiche',
  bio: 'Fan de RomicheTV depuis le début',
  followersCount: 142,
  followingCount: 38,
  postsCount: 27,
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: true,

  loadSession: async () => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      const userJson = await AsyncStorage.getItem('auth_user');
      if (token && userJson) {
        set({ user: JSON.parse(userJson), token, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch {
      set({ isLoading: false });
    }
  },

  login: async (email: string, _password: string) => {
    // Mock login – replace with real API call
    const user = { ...MOCK_USER, username: email.split('@')[0] };
    const token = 'mock_token_' + Date.now();
    await AsyncStorage.setItem('auth_token', token);
    await AsyncStorage.setItem('auth_user', JSON.stringify(user));
    set({ user, token });
  },

  register: async (username: string, _email: string, _password: string) => {
    // Mock register – replace with real API call
    const user = { ...MOCK_USER, username, displayName: username };
    const token = 'mock_token_' + Date.now();
    await AsyncStorage.setItem('auth_token', token);
    await AsyncStorage.setItem('auth_user', JSON.stringify(user));
    set({ user, token });
  },

  logout: async () => {
    await AsyncStorage.removeItem('auth_token');
    await AsyncStorage.removeItem('auth_user');
    set({ user: null, token: null });
  },

  updateProfile: (updates) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : null,
    })),
}));
