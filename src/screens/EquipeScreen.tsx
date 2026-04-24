import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { borderRadius, colors, spacing, typography } from '../theme';

const JOUEURS = [
  { id: '1', nom: 'Marc Dubois', numero: 1, poste: 'Gardien', avatar: 'https://i.pravatar.cc/150?u=p1' },
  { id: '2', nom: 'Théo Lambert', numero: 2, poste: 'Défenseur', avatar: 'https://i.pravatar.cc/150?u=p2' },
  { id: '3', nom: 'Lucas Moreau', numero: 4, poste: 'Défenseur', avatar: 'https://i.pravatar.cc/150?u=p3', capitaine: true },
  { id: '4', nom: 'Axel Petit', numero: 5, poste: 'Défenseur', avatar: 'https://i.pravatar.cc/150?u=p4' },
  { id: '5', nom: 'Rayan Benali', numero: 3, poste: 'Défenseur', avatar: 'https://i.pravatar.cc/150?u=p5' },
  { id: '6', nom: 'Noah Girard', numero: 6, poste: 'Milieu', avatar: 'https://i.pravatar.cc/150?u=p6' },
  { id: '7', nom: 'Karim Diallo', numero: 8, poste: 'Milieu', avatar: 'https://i.pravatar.cc/150?u=p7' },
  { id: '8', nom: 'Tom Richard', numero: 10, poste: 'Milieu', avatar: 'https://i.pravatar.cc/150?u=p8' },
  { id: '9', nom: 'Enzo Faure', numero: 9, poste: 'Attaquant', avatar: 'https://i.pravatar.cc/150?u=p9' },
  { id: '10', nom: 'Hugo Bernard', numero: 11, poste: 'Attaquant', avatar: 'https://i.pravatar.cc/150?u=p10' },
  { id: '11', nom: 'Dylan Mercier', numero: 17, poste: 'Attaquant', avatar: 'https://i.pravatar.cc/150?u=p11' },
] as const;

const POSTES = ['Gardien', 'Défenseur', 'Milieu', 'Attaquant'] as const;

export default function EquipeScreen() {
  const sections = POSTES.map((p) => ({ poste: p, joueurs: JOUEURS.filter((j) => j.poste === p) }));

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Équipe 1ère</Text>
        <Text style={styles.sub}>{JOUEURS.length} joueurs · Saison 2025-26</Text>
      </View>
      <FlatList
        data={sections}
        keyExtractor={(s) => s.poste}
        renderItem={({ item: s }) => (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{s.poste}s</Text>
            {s.joueurs.map((j) => (
              <View key={j.id} style={styles.row}>
                <Text style={styles.numero}>{j.numero}</Text>
                <Image source={{ uri: j.avatar }} style={styles.avatar} />
                <View style={styles.info}>
                  <View style={styles.nameRow}>
                    <Text style={styles.nom}>{j.nom}</Text>
                    {'capitaine' in j && j.capitaine && (
                      <View style={styles.cap}><Text style={styles.capText}>C</Text></View>
                    )}
                  </View>
                  <Text style={styles.poste}>{j.poste}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: spacing.md, paddingVertical: spacing.lg, backgroundColor: colors.dark, gap: 4 },
  title: { ...typography.h2, color: '#FFF' },
  sub: { ...typography.caption, color: colors.gold },
  list: { padding: spacing.md, paddingBottom: 80 },
  section: { marginBottom: spacing.lg },
  sectionTitle: { ...typography.label, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: spacing.sm },
  row: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: borderRadius.md, padding: spacing.sm, marginBottom: spacing.xs, borderWidth: 1, borderColor: colors.border, gap: spacing.sm },
  numero: { width: 28, fontSize: 17, fontWeight: '800', color: colors.primary, textAlign: 'center' },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.surfaceElevated },
  info: { flex: 1 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  nom: { ...typography.label, color: colors.text, fontWeight: '600' },
  cap: { width: 18, height: 18, borderRadius: 9, backgroundColor: colors.gold, alignItems: 'center', justifyContent: 'center' },
  capText: { fontSize: 10, fontWeight: '800', color: '#fff' },
  poste: { ...typography.caption, color: colors.textSecondary },
});
