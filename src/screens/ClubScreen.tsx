import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { borderRadius, colors, spacing, typography } from '../theme';

const VALEURS = [
  { emoji: '⚽', titre: 'Jeu', desc: 'Un football offensif, technique et spectaculaire, au service du collectif.' },
  { emoji: '😄', titre: 'Plaisir', desc: 'Jouer pour le plaisir avant tout — chaque entraînement, chaque match.' },
  { emoji: '🤝', titre: 'Solidarité', desc: 'On gagne et on perd ensemble. L\'équipe prime sur l\'individu.' },
  { emoji: '🎉', titre: 'Convivialité', desc: 'Un club où on se retrouve, on partage et on crée des liens durables.' },
];

export default function ClubScreen() {
  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.hero}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} />
          <Text style={styles.nom}>Stade Olympique Londais</Text>
          <Text style={styles.since}>Fondé en 1927</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nos valeurs</Text>
          {VALEURS.map((v) => (
            <View key={v.titre} style={styles.valeurCard}>
              <Text style={{ fontSize: 28 }}>{v.emoji}</Text>
              <View style={{ flex: 1, gap: 4 }}>
                <Text style={styles.valeurTitre}>{v.titre}</Text>
                <Text style={styles.valeurDesc}>{v.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notre histoire</Text>
          <View style={styles.card}>
            <Text style={styles.cardText}>
              Fondé en 1927, le Stade Olympique Londais est l'un des clubs les plus anciens du département.{'\n\n'}
              Depuis près d'un siècle, le club forme et rassemble des générations de joueurs autour d'un football populaire, accessible et convivial.{'\n\n'}
              Du baby-foot à l'équipe première, l'esprit Londais reste le même : jouer avec le sourire, progresser ensemble, et s'accueillir comme une famille.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nos équipes</Text>
          {[['Équipe 1ère', 'Division 3 · Seniors'], ['Équipe Réserve', 'Division 5 · Seniors'], ['U18', 'Championnat jeunes'], ['U15', 'Championnat jeunes'], ['U13', 'Championnat jeunes']].map(([label, cat]) => (
            <View key={label} style={styles.equipeRow}>
              <Text style={styles.equipeLabel}>{label}</Text>
              <Text style={styles.equipeCat}>{cat}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact</Text>
          <View style={styles.card}>
            {[['Email', 'contact@solondais.fr'], ['Terrain', 'Stade Municipal de Lond'], ['Entraînements', 'Mar & Jeu 19h30 · Sam 10h']].map(([l, v]) => (
              <View key={l} style={styles.infoRow}>
                <Text style={styles.infoLabel}>{l}</Text>
                <Text style={styles.infoValue}>{v}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ height: 48 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  hero: { backgroundColor: colors.dark, alignItems: 'center', paddingVertical: spacing.xl, gap: spacing.sm },
  logo: { width: 80, height: 80, borderRadius: 40 },
  nom: { ...typography.h2, color: '#FFF', textAlign: 'center' },
  since: { ...typography.body, color: colors.gold },
  section: { paddingHorizontal: spacing.md, marginTop: spacing.lg },
  sectionTitle: { ...typography.label, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: spacing.sm },
  valeurCard: { flexDirection: 'row', backgroundColor: colors.surface, borderRadius: borderRadius.md, padding: spacing.md, marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border, gap: spacing.md, alignItems: 'flex-start' },
  valeurTitre: { ...typography.h3, color: colors.primary, fontSize: 16 },
  valeurDesc: { ...typography.body, color: colors.textSecondary, lineHeight: 21 },
  card: { backgroundColor: colors.surface, borderRadius: borderRadius.md, padding: spacing.md, borderWidth: 1, borderColor: colors.border, gap: spacing.sm },
  cardText: { ...typography.body, color: colors.textSecondary, lineHeight: 23 },
  equipeRow: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.surface, padding: spacing.md, borderRadius: borderRadius.md, marginBottom: spacing.xs, borderWidth: 1, borderColor: colors.border },
  equipeLabel: { ...typography.label, color: colors.text, fontWeight: '600' },
  equipeCat: { ...typography.caption, color: colors.textSecondary },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing.xs, borderBottomWidth: 1, borderBottomColor: colors.border },
  infoLabel: { ...typography.label, color: colors.textSecondary },
  infoValue: { ...typography.label, color: colors.text, textAlign: 'right' },
});
