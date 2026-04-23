import React from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
        {/* Hero */}
        <View style={styles.hero}>
          <View style={styles.logo}>
            <Text style={styles.logoEmoji}>⚽</Text>
          </View>
          <Text style={styles.clubName}>Stade Olympique Londais</Text>
          <Text style={styles.founded}>Fondé en 1927</Text>
        </View>

        {/* Nos valeurs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nos valeurs</Text>
          {VALEURS.map((v) => (
            <View key={v.titre} style={styles.valeurCard}>
              <Text style={styles.valeurEmoji}>{v.emoji}</Text>
              <View style={styles.valeurContent}>
                <Text style={styles.valeurTitre}>{v.titre}</Text>
                <Text style={styles.valeurDesc}>{v.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Histoire */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notre histoire</Text>
          <View style={styles.card}>
            <Text style={styles.cardText}>
              Fondé en 1927, le Stade Olympique Londais est l'un des clubs les plus anciens du département.
              {'\n\n'}
              Depuis près d'un siècle, le club forme et rassemble des générations de joueurs autour d'un football populaire, accessible et convivial.
              {'\n\n'}
              Du baby-foot à l'équipe première, l'esprit Londais reste le même : jouer avec le sourire, progresser ensemble, et s'accueillir comme une famille.
            </Text>
          </View>
        </View>

        {/* Équipes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nos équipes</Text>
          {[
            { label: 'Équipe 1ère', cat: 'Division 3 · Seniors' },
            { label: 'Équipe Réserve', cat: 'Division 5 · Seniors' },
            { label: 'U18', cat: 'Championnat jeunes' },
            { label: 'U15', cat: 'Championnat jeunes' },
            { label: 'U13', cat: 'Championnat jeunes' },
          ].map((e) => (
            <View key={e.label} style={styles.equipeRow}>
              <Text style={styles.equipeLabel}>{e.label}</Text>
              <Text style={styles.equipeCat}>{e.cat}</Text>
            </View>
          ))}
        </View>

        {/* Contact */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact</Text>
          <View style={styles.card}>
            <InfoRow label="Email" value="contact@solondais.fr" />
            <InfoRow label="Terrain" value="Stade Municipal de Lond" />
            <InfoRow label="Entraînements" value="Mar & Jeu 19h30 · Sam 10h" />
          </View>
        </View>

        <View style={{ height: spacing.xxl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  hero: {
    backgroundColor: colors.dark,
    alignItems: 'center',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    borderWidth: 3,
    borderColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoEmoji: { fontSize: 38 },
  clubName: { ...typography.h2, color: '#FFFFFF', textAlign: 'center' },
  founded: { ...typography.body, color: colors.gold },
  section: {
    paddingHorizontal: spacing.md,
    marginTop: spacing.lg,
  },
  sectionTitle: {
    ...typography.label,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: spacing.sm,
  },
  valeurCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
    alignItems: 'flex-start',
  },
  valeurEmoji: { fontSize: 28, marginTop: 2 },
  valeurContent: { flex: 1, gap: 4 },
  valeurTitre: { ...typography.h3, color: colors.primary, fontSize: 16 },
  valeurDesc: { ...typography.body, color: colors.textSecondary, lineHeight: 21 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  cardText: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 23,
  },
  equipeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
  },
  equipeLabel: { ...typography.label, color: colors.text, fontWeight: '600' },
  equipeCat: { ...typography.caption, color: colors.textSecondary },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.md,
  },
  infoLabel: { ...typography.label, color: colors.textSecondary },
  infoValue: { ...typography.label, color: colors.text, flex: 1, textAlign: 'right' },
});
