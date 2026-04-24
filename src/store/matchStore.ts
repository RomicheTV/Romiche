import { create } from 'zustand';

export interface Match {
  id: string;
  competition: string;
  adversaire: string;
  date: Date;
  lieu: 'domicile' | 'extérieur';
  scoreNous?: number;
  scoreEux?: number;
  joue: boolean;
}

export const useMatchStore = create<{ matches: Match[] }>(() => ({
  matches: [
    { id: '1', competition: 'Championnat D3', adversaire: 'ES Longjumeau', date: new Date(Date.now() - 86400000), lieu: 'domicile', scoreNous: 3, scoreEux: 1, joue: true },
    { id: '2', competition: 'Championnat D3', adversaire: 'FC Wissous', date: new Date(Date.now() - 8 * 86400000), lieu: 'extérieur', scoreNous: 1, scoreEux: 1, joue: true },
    { id: '3', competition: 'Coupe de district', adversaire: 'AS Massy', date: new Date(Date.now() - 15 * 86400000), lieu: 'domicile', scoreNous: 0, scoreEux: 2, joue: true },
    { id: '4', competition: 'Championnat D3', adversaire: 'US Épinay', date: new Date(Date.now() + 5 * 86400000), lieu: 'extérieur', joue: false },
    { id: '5', competition: 'Championnat D3', adversaire: 'CS Brétigny', date: new Date(Date.now() + 12 * 86400000), lieu: 'domicile', joue: false },
    { id: '6', competition: 'Championnat D3', adversaire: 'FC Sainte-Geneviève', date: new Date(Date.now() + 19 * 86400000), lieu: 'extérieur', joue: false },
  ],
}));
