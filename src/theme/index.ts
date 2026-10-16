// Couleurs du logo S.O. Londais : bleu, blanc, or, noir
export const colors = {
  primary: '#2E5FE0',       // bleu vif du logo
  primaryDark: '#1F47B8',
  gold: '#D9A94A',          // anneau or du logo
  background: '#F4F6FB',
  surface: '#FFFFFF',
  surfaceElevated: '#EEF1F8',
  dark: '#0A1628',          // fond écran de démarrage
  text: '#111827',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  textOnPrimary: '#FFFFFF',
  border: '#E5E7EB',
  win: '#16A34A',
  draw: '#6B7280',
  loss: '#DC2626',
};

export const spacing = {
  xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48,
};

export const borderRadius = {
  sm: 8, md: 14, lg: 20, full: 9999,
};

export const shadow = {
  shadowColor: '#0A1628',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.08,
  shadowRadius: 12,
  elevation: 3,
};

export const fonts = {
  title: 'Oswald_700Bold',
  titleSemiBold: 'Oswald_600SemiBold',
};

export const typography = {
  h1: { fontSize: 28, fontFamily: fonts.title },
  h2: { fontSize: 22, fontFamily: fonts.title },
  h3: { fontSize: 18, fontFamily: fonts.titleSemiBold },
  body: { fontSize: 15, fontWeight: '400' as const },
  caption: { fontSize: 12, fontWeight: '400' as const },
  label: { fontSize: 13, fontWeight: '500' as const },
};
