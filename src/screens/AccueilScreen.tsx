import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MatchCard from '../components/MatchCard';
import NewsCard from '../components/NewsCard';
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
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.nom}>S.O. Londais</Text>
            <Text style={styles.sous}>Stade Olympique · depuis 1927</Text>
          </View>
          <Image source={require('../../assets/logo.png')} style={styles.badge} />
        </View>

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
            <MatchCard match={prochainMatch} />
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
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.dark, paddingHorizontal: spacing.md, paddingVertical: spacing.lg },
  nom: { ...typography.h2, color: '#FFF' },
  sous: { ...typography.caption, color: colors.gold, marginTop: 2 },
  badge: { width: 52, height: 52, borderRadius: 26 },
  valeursRow: { paddingHorizontal: spacing.md, paddingVertical: spacing.md, gap: spacing.sm },
  valeurChip: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm, backgroundColor: colors.primary, borderRadius: borderRadius.full, borderWidth: 1, borderColor: colors.gold },
  valeurText: { ...typography.label, color: '#FFF', fontWeight: '700' },
  section: { paddingHorizontal: spacing.md, marginBottom: spacing.sm },
  sectionTitle: { ...typography.label, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: spacing.sm, marginTop: spacing.md },
});
