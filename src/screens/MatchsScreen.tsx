import React, { useState } from 'react';
import { SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MatchCard from '../components/MatchCard';
import { useMatchStore } from '../store/matchStore';
import { borderRadius, colors, spacing, typography } from '../theme';

export default function MatchsScreen() {
  const matches = useMatchStore((s) => s.matches);
  const [tab, setTab] = useState<'avenir' | 'passes'>('avenir');

  const avenir = matches.filter((m) => !m.joue).sort((a, b) => a.date.getTime() - b.date.getTime());
  const passes = matches.filter((m) => m.joue).sort((a, b) => b.date.getTime() - a.date.getTime());

  const data = tab === 'avenir' ? avenir : passes;

  const wins = passes.filter((m) => m.scoreNous! > m.scoreEux!).length;
  const draws = passes.filter((m) => m.scoreNous! === m.scoreEux!).length;
  const losses = passes.filter((m) => m.scoreNous! < m.scoreEux!).length;

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Matchs</Text>
      </View>

      {/* Bilan */}
      <View style={styles.bilan}>
        <BilanItem value={wins} label="Victoires" color={colors.win} />
        <BilanItem value={draws} label="Nuls" color={colors.draw} />
        <BilanItem value={losses} label="Défaites" color={colors.loss} />
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, tab === 'avenir' && styles.tabActive]}
          onPress={() => setTab('avenir')}
        >
          <Text style={[styles.tabText, tab === 'avenir' && styles.tabTextActive]}>
            À venir ({avenir.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, tab === 'passes' && styles.tabActive]}
          onPress={() => setTab('passes')}
        >
          <Text style={[styles.tabText, tab === 'passes' && styles.tabTextActive]}>
            Passés ({passes.length})
          </Text>
        </TouchableOpacity>
      </View>

      <SectionList
        sections={[{ title: '', data }]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MatchCard match={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.empty}>Aucun match à afficher</Text>
        }
      />
    </SafeAreaView>
  );
}

function BilanItem({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <View style={styles.bilanItem}>
      <Text style={[styles.bilanValue, { color }]}>{value}</Text>
      <Text style={styles.bilanLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  header: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.dark,
  },
  title: { ...typography.h2, color: '#FFFFFF' },
  bilan: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  bilanItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.md,
    gap: 2,
  },
  bilanValue: { fontSize: 26, fontWeight: '800' },
  bilanLabel: { ...typography.caption, color: colors.textSecondary },
  tabs: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: { borderBottomColor: colors.primary },
  tabText: { ...typography.label, color: colors.textSecondary },
  tabTextActive: { color: colors.primary, fontWeight: '700' },
  list: { padding: spacing.md, paddingBottom: spacing.xxl },
  empty: { ...typography.body, color: colors.textMuted, textAlign: 'center', marginTop: spacing.xl },
});
