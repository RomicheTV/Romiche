# S.O. Londais

App mobile (Expo / React Native) du club de football Stade Olympique Londais.

## Stack

- Expo SDK 51 (React Native 0.74, React 18)
- React Navigation (stack + bottom tabs)
- Zustand pour l'état (matchs, actus)
- TypeScript strict

## Démarrer en local

```bash
npm install
npm start
```

Puis scanner le QR code avec l'app **Expo Go** (iOS/Android), ou appuyer sur
`i` pour lancer le simulateur iOS (nécessite un Mac avec Xcode installé).

Scripts utiles :

- `npm run ios` / `npm run android` — démarre Metro et ouvre la plateforme visée
- `npm run typecheck` — vérifie les types TypeScript sans build

## Tester/builder réellement sur iOS

Ce repo est géré en **workflow managé** : les dossiers natifs `ios/` et
`android/` ne sont pas commités, ils se régénèrent avec `expo prebuild`.

### Sans Mac — via EAS Build (recommandé)

[EAS Build](https://docs.expo.dev/build/introduction/) compile l'app iOS dans
le cloud, pas besoin de Mac/Xcode en local.

```bash
npm install -g eas-cli
eas login
eas build --platform ios --profile preview   # build installable sur simulateur/TestFlight interne
```

Le profil `development` (voir `eas.json`) génère un client de dev pour
itérer avec le hot-reload ; `production` prépare un build pour l'App Store
(nécessite un compte Apple Developer pour la soumission via `eas submit`).

### Avec un Mac — build local

```bash
npx expo prebuild --platform ios   # génère le dossier ios/
npx expo run:ios                   # build + lance sur le simulateur
```

## Configuration

- `app.json` — nom de l'app, version, `ios.bundleIdentifier`
  (`fr.solondais.app`) et `android.package` correspondant.
- Aucune icône/splash screen personnalisée n'est encore définie — Expo utilise
  les valeurs par défaut. À ajouter dans `app.json` (`icon`, `splash`) avant
  une soumission App Store.
