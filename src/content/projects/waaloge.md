# Waaloge

Waaloge est une PWA qui permet aux étudiants de chercher, visualiser et réserver une visite de logement à distance, avec un assistant IA intégré. C'est un projet client livré en 2026.

| Champ | Info |
| --- | --- |
| Type | Projet client externe, réalisé via Excellence Team |
| Contexte | Logement étudiant; les maquettes utilisent des quartiers de Cotonou et d'Abomey-Calavi (UAC) |
| Année | 2026 |
| Statut | Livré. Au 12 août: MVP en développement, délai de deux semaines |
| Rôle d'Oktav | Responsable de l'architecture |
| Liens | [Site](https://waaloge.excellenceteam.site/) |

## Ce que ça fait

Côté étudiant:

- Parcourir les logements sans compte, avec filtres par prix, quartier et type
- Voir les détails, photos, distance à la fac et avis
- Réserver un créneau de visite, sans doublon possible
- Payer avant ou pendant la visite, en mobile money ou en main propre
- Gérer ses favoris et recevoir des notifications
- Poser ses questions à un assistant IA, qui renvoie vers un humain (lien WhatsApp ou formulaire) dès qu'une négociation de prix commence

Côté admin:

- Publier et gérer les logements (photos, vidéos, description), les propriétaires et les quartiers
- Valider les paiements et le statut des visites (venu ou raté)
- Suivre le chiffre d'affaires et les statistiques, gérer les créneaux

Les propriétaires existent en base mais n'ont aucune interface: tout passe par l'admin.

## Architecture

- Un seul backend REST, deux clients React: la PWA étudiante et le back-office admin
- Authentification par jeton Bearer (Sanctum dans l'architecture initiale)
- PostgreSQL hébergé sur Neon, dix tables: Logement, Utilisateur, Propriétaire, Quartier, Asset, Réservation, Paiement, Avis, Favori, Notification
- Contraintes: installation PWA obligatoire, mode hors ligne si possible, français et anglais, pas de paiement en ligne intégré
- Documents produits: README, spécification d'API, modèle relationnel

## Design

Maquette mobile dans Figma: fond blanc chaud `#FAF9F7`, bleu `#2B6CE5` pour les boutons et liens, marine `#1A2540` pour le texte. Quatre écrans prévus: Recherche, Détail d'un logement, Réservation et contact, Profil. L'écran Recherche est fait.

## À vérifier

- Back-end: Laravel (architecture du 12 août) ou Node.js (indiqué le 17 septembre) ?
- Nom du client, date de livraison exacte, nombre d'utilisateurs
- Équipe et rôle de chaque membre
