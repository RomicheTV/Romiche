import { create } from 'zustand';

export interface NewsItem {
  id: string;
  titre: string;
  contenu: string;
  categorie: 'resultat' | 'evenement' | 'club';
  date: Date;
}

export const useNewsStore = create<{ items: NewsItem[] }>(() => ({
  items: [
    { id: '1', titre: 'Victoire 3-1 contre l\'ES Longjumeau !', contenu: 'Belle performance collective ce samedi. Buts de Karim (2) et Théo. Bravo à tous !', categorie: 'resultat', date: new Date(Date.now() - 86400000) },
    { id: '2', titre: 'Journée portes ouvertes — 10 mai', contenu: 'Venez découvrir nos équipes et notre esprit de convivialité. Inscriptions libres sur place.', categorie: 'evenement', date: new Date(Date.now() - 3 * 86400000) },
    { id: '3', titre: 'Bienvenue à nos 3 nouvelles recrues', contenu: 'Le club est fier d\'accueillir trois nouveaux joueurs cette semaine. Bienvenue dans la famille Londaise !', categorie: 'club', date: new Date(Date.now() - 5 * 86400000) },
    { id: '4', titre: 'Repas annuel du club — 25 mai', contenu: 'Le traditionnel repas de fin de saison aura lieu le 25 mai. Réservez votre place auprès du bureau.', categorie: 'evenement', date: new Date(Date.now() - 7 * 86400000) },
  ],
}));
