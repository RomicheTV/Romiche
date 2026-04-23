import { create } from 'zustand';

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  category: 'match' | 'club' | 'evenement' | 'resultat';
  date: Date;
  imageUrl?: string;
}

interface NewsState {
  items: NewsItem[];
}

export const useNewsStore = create<NewsState>(() => ({
  items: [
    {
      id: '1',
      title: 'Victoire 3-1 contre l\'ES Longjumeau !',
      content: 'Belle performance de l\'équipe première ce samedi. Un match maîtrisé de bout en bout avec des buts de Karim (2) et Théo. Bravo à tous !',
      category: 'resultat',
      date: new Date(Date.now() - 86400000),
    },
    {
      id: '2',
      title: 'Journée portes ouvertes — 10 mai',
      content: 'Le S.O. Londais ouvre ses portes à tous ! Venez découvrir nos équipes, nos valeurs et notre esprit de convivialité. Inscriptions libres sur place.',
      category: 'evenement',
      date: new Date(Date.now() - 172800000),
    },
    {
      id: '3',
      title: 'Bienvenue à nos 3 nouvelles recrues',
      content: 'Le club est fier d\'accueillir cette semaine trois nouveaux joueurs qui rejoignent l\'équipe première. Bienvenue à eux, dans l\'esprit Londais !',
      category: 'club',
      date: new Date(Date.now() - 259200000),
    },
    {
      id: '4',
      title: 'Tournoi Jeu Plaisir — résultats',
      content: '2ème place pour notre équipe U15 lors du tournoi inter-clubs du weekend ! Une belle démonstration de solidarité et de jeu collectif.',
      category: 'resultat',
      date: new Date(Date.now() - 432000000),
    },
    {
      id: '5',
      title: 'Repas annuel du club — 25 mai',
      content: 'Le traditionnel repas de fin de saison aura lieu le 25 mai à la salle des fêtes de Lond. Réservez votre place auprès du bureau.',
      category: 'evenement',
      date: new Date(Date.now() - 604800000),
    },
  ],
}));
