# Feedzy — Démo commerciale

Démo 100 % simulée, à présenter sur téléphone, du parcours client Feedzy :

1. **WhatsApp** : le Marathon de Paris envoie le message avec le lien « Laisser mon avis ».
2. **App Feedzy** : le participant appuie sur le micro et sa transcription s'affiche en direct.
3. **L'IA rédige l'avis** : l'avis peut être modifié avant envoi.
4. **Envoi** de l'avis à l'organisateur (confirmation simulée).

Rien n'est réellement enregistré ni envoyé. Le micro n'est pas utilisé.

## Lancer

```bash
npm install
npm run build
npx next start -H 0.0.0.0 -p 3000
```

Ouvrez ensuite `http://<IP-du-PC>:3000` sur le téléphone (même Wi-Fi).
Pour un vrai plein écran, ajoutez la page à l'écran d'accueil (Safari : Partager → « Sur l'écran d'accueil »).

## Modifier les textes

Tous les textes (nom de l'établissement, message WhatsApp, transcription, avis généré, avis existants)
sont dans `src/lib/content.ts`.
