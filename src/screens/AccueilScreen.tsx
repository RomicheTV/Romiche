import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import MatchCard from '../components/MatchCard';
import NewsCard from '../components/NewsCard';
import NextMatchHero from '../components/NextMatchHero';
import { useMatchStore } from '../store/matchStore';
import { useNewsStore } from '../store/newsStore';
import { borderRadius, colors, spacing, typography } from '../theme';

const VALEURS = ['Jeu', 'Plaisir', 'Solidarité', 'Convivialité'];

export default function AccueilScreen() {
  const news = useNewsStore((s) => s.items);
  const matches = useMatchStore((s) => s.matches);
  const prochainMatch = matches.find((m) => !m.joue);
  const dernierResultat = matches.filter((m) => m.joue)[0];

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Valeurs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.valeursRow}>
          {VALEURS.map((v) => (
            <View key={v} style={styles.valeurChip}>
              <Text style={styles.valeurText}>{v}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Prochain match */}
        {prochainMatch && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Prochain match</Text>
            <NextMatchHero match={prochainMatch} />
          </View>
        )}

        {/* Dernier résultat */}
        {dernierResultat && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Dernier résultat</Text>
            <MatchCard match={dernierResultat} />
          </View>
        )}

        {/* Actualités */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actualités</Text>
          {news.map((item) => <NewsCard key={item.id} item={item} />)}
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  valeursRow: { paddingHorizontal: spacing.md, paddingVertical: spacing.md, gap: spacing.sm },
  valeurChip: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm, backgroundColor: colors.primary, borderRadius: borderRadius.full, borderWidth: 1, borderColor: colors.gold },
  valeurText: { ...typography.label, color: '#FFF', fontWeight: '700' },
  section: { paddingHorizontal: spacing.md, marginBottom: spacing.sm },
  sectionTitle: { ...typography.h3, color: colors.text, fontWeight: '800', marginBottom: spacing.sm, marginTop: spacing.md },
});
