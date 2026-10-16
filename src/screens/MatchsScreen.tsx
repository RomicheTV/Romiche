import React, { useState } from 'react';
import { SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
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
      <Header title="Matchs" />

      <View style={styles.bilan}>
        {[{ v: wins, l: 'Victoires', c: colors.win }, { v: draws, l: 'Nuls', c: colors.draw }, { v: losses, l: 'Défaites', c: colors.loss }].map(({ v, l, c }) => (
          <View key={l} style={styles.bilanItem}>
            <Text style={[styles.bilanVal, { color: c }]}>{v}</Text>
            <Text style={styles.bilanLabel}>{l}</Text>
          </View>
        ))}
      </View>

      <View style={styles.tabs}>
        {(['avenir', 'passes'] as const).map((t) => (
          <TouchableOpacity key={t} style={[styles.tab, tab === t && styles.tabActive]} onPress={() => setTab(t)}>
            <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>
              {t === 'avenir' ? `À venir (${avenir.length})` : `Passés (${passes.length})`}
            </Text>
          </TouchableOpacity>
        ))}
      </View>


      <SectionList
        sections={[{ title: '', data }]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MatchCard match={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text style={styles.empty}>Aucun match</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  bilan: { flexDirection: 'row', backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border },
  bilanItem: { flex: 1, alignItems: 'center', paddingVertical: spacing.md, gap: 2 },
  bilanVal: { fontSize: 26, fontWeight: '800' },
  bilanLabel: { ...typography.caption, color: colors.textSecondary },
  tabs: { flexDirection: 'row', backgroundColor: colors.surface, padding: spacing.sm, gap: spacing.sm },
  tab: { flex: 1, paddingVertical: spacing.sm, alignItems: 'center', borderRadius: borderRadius.full, backgroundColor: colors.surfaceElevated },
  tabActive: { backgroundColor: colors.primary },
  tabText: { ...typography.label, color: colors.textSecondary, fontWeight: '600' },
  tabTextActive: { color: '#FFF', fontWeight: '700' },
  list: { padding: spacing.md, paddingBottom: 80 },
  empty: { ...typography.body, color: colors.textMuted, textAlign: 'center', marginTop: spacing.xl },
});
