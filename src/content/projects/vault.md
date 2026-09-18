# Vaut-Bibliothèque (Vault)

Vault est une bibliothèque d'images privée doublée d'un gestionnaire de clés de projet (fichiers .env chiffrés). Chaque utilisateur branche son propre compte Cloudinary.

| Champ        | Info                                                                                                       |
| ------------ | ---------------------------------------------------------------------------------------------------------- |
| Type         | Application web, inscription ouverte                                                                       |
| Version      | 2.0.0                                                                                                      |
| Statut       | Fonctionnel                                                                                                |
| Rôle d'Oktav | Dépôt sur son compte GitHub, rôle exact à préciser                                                         |
| Liens        | [Site](https://vaut-bibliotheque.vercel.app/), [GitHub](https://github.com/octavebahoun/Vaut-Bibliotheque) |

## Ce que ça fait

- Authentification maison: e-mail et mot de passe, hash argon2id, session par cookie HTTP-only, jeton haché en base
- Images: connexion guidée à Cloudinary dans l'app (API secret chiffré), upload signé, compression automatique côté client, galerie, suppression réelle (Cloudinary et base), partage par lien public
- Clés et .env: projets regroupant des variables chiffrées au repos (AES-256-GCM), copie ou téléchargement du .env complet en un clic, import d'un .env collé
- Partage de bibliothèque: invitation d'un autre compte par e-mail pour voir en lecture seule les images marquées partageables, page « Partagé avec moi », e-mail via Resend en option
- Visionneuse plein écran avec navigation au clavier
- Usage: statistiques locales et consommation réelle de Cloudinary (stockage, crédits, bande passante)
- Tableau de bord admin: statistiques, utilisateurs, rôles, suppression. Le premier compte créé devient admin

## Stack

- Next.js 15 (App Router), React 19, TypeScript
- Neon (Postgres) avec Drizzle ORM
- Cloudinary, Resend en option
- Déploiement sur Vercel
