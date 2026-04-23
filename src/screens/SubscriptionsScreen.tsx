import React, { useState } from 'react';
import {
  FlatList,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SubscriptionCard, { Streamer } from '../components/SubscriptionCard';
import { colors, spacing, typography } from '../theme';

const LIVE: Streamer[] = [
  {
    id: '1',
    username: 'romichetv',
    displayName: 'RomicheTV',
    avatarUrl: 'https://i.pravatar.cc/150?u=romichetv',
    category: 'GTA V RP',
    isLive: true,
    viewersCount: 4821,
    subscribedSince: 'jan. 2022',
  },
  {
    id: '2',
    username: 'zephyrtv',
    displayName: 'ZephyrTV',
    avatarUrl: 'https://i.pravatar.cc/150?u=zephyrtv',
    category: 'Fortnite',
    isLive: true,
    viewersCount: 1340,
    subscribedSince: 'mars 2023',
  },
];

const OFFLINE: Streamer[] = [
  {
    id: '3',
    username: 'hannastreams',
    displayName: 'HannaStreams',
    avatarUrl: 'https://i.pravatar.cc/150?u=hannastreams',
    category: 'Minecraft',
    isLive: false,
    subscribedSince: 'juin 2023',
  },
  {
    id: '4',
    username: 'nyx_gg',
    displayName: 'Nyx_GG',
    avatarUrl: 'https://i.pravatar.cc/150?u=nyx_gg',
    category: 'Apex Legends',
    isLive: false,
    subscribedSince: 'sept. 2023',
  },
  {
    id: '5',
    username: 'streamfan42',
    displayName: 'StreamFan42',
    avatarUrl: 'https://i.pravatar.cc/150?u=streamfan42',
    category: 'Jeux variés',
    isLive: false,
    subscribedSince: 'nov. 2023',
  },
];

export default function SubscriptionsScreen() {
  const [live, setLive] = useState<Streamer[]>(LIVE);
  const [offline, setOffline] = useState<Streamer[]>(OFFLINE);

  const unsubscribe = (id: string) => {
    setLive((prev) => prev.filter((s) => s.id !== id));
    setOffline((prev) => prev.filter((s) => s.id !== id));
  };

  const sections = [
    ...(live.length > 0
      ? [{ title: `En direct (${live.length})`, data: live }]
      : []),
    ...(offline.length > 0
      ? [{ title: `Hors ligne (${offline.length})`, data: offline }]
      : []),
  ];

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Abonnements</Text>
        <Text style={styles.count}>{live.length + offline.length} suivis</Text>
      </View>

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SubscriptionCard
            streamer={item}
            onUnsubscribe={() => unsubscribe(item.id)}
          />
        )}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
          </View>
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
      />
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
    alignItems: 'baseline',
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
  count: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  list: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  sectionHeader: {
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  sectionTitle: {
    ...typography.label,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
});
