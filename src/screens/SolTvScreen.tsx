import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { borderRadius, colors, shadow, spacing, typography } from '../theme';

const VIDEOS = [
  { id: '1', titre: 'Résumé : S.O. Londais 3 - 1 US Épinal', duree: '4:12', date: 'Il y a 3j' },
  { id: '2', titre: "Interview d'avant-match avec le capitaine", duree: '2:48', date: 'Il y a 5j' },
  { id: '3', titre: 'Les coulisses du centre de formation', duree: '6:30', date: 'Il y a 1 semaine' },
];

export default function SolTvScreen() {
  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <Header title="SOL TV" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
        <Text style={styles.intro}>Résumés, interviews et coulisses du club en vidéo.</Text>
        {VIDEOS.map((v) => (
          <View key={v.id} style={styles.card}>
            <View style={styles.thumb}>
              <View style={styles.playButton}>
                <Ionicons name="play" size={22} color={colors.primary} />
              </View>
              <Text style={styles.duree}>{v.duree}</Text>
            </View>
            <Text style={styles.titre}>{v.titre}</Text>
            <Text style={styles.date}>{v.date}</Text>
          </View>
        ))}
        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  list: { padding: spacing.md },
  intro: { ...typography.body, color: colors.textSecondary, marginBottom: spacing.md },
  card: { backgroundColor: colors.surface, borderRadius: borderRadius.lg, marginBottom: spacing.md, overflow: 'hidden', ...shadow },
  thumb: { backgroundColor: colors.primary, aspectRatio: 16 / 9, alignItems: 'center', justifyContent: 'center' },
  playButton: { width: 52, height: 52, borderRadius: borderRadius.full, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
  duree: { position: 'absolute', right: spacing.sm, bottom: spacing.sm, backgroundColor: 'rgba(10,22,40,0.75)', color: '#FFF', fontSize: 11, fontWeight: '700', paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: borderRadius.sm },
  titre: { ...typography.h3, color: colors.text, fontSize: 15, paddingHorizontal: spacing.md, paddingTop: spacing.sm },
  date: { ...typography.caption, color: colors.textMuted, paddingHorizontal: spacing.md, paddingBottom: spacing.md, paddingTop: 2 },
});
