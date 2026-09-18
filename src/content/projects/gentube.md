# Gentube

Gentube est un SaaS multi-tenant de génération vidéo par IA pour les créateurs d'Afrique de l'Ouest francophone: un thème en entrée, une vidéo prête pour YouTube en sortie. Il est au stade MVP.

| Champ        | Info                                                                                                                     |
| ------------ | ------------------------------------------------------------------------------------------------------------------------ |
| Type         | SaaS interne d'Excellence Team                                                                                           |
| Cible        | Créateurs et petites entreprises d'Afrique de l'Ouest francophone, paiement en mobile money                              |
| Année        | 2026                                                                                                                     |
| Statut       | MVP1, pas encore testable. Au 25 août, le rendu complet d'une vidéo de bout en bout restait à finir; 252 tests passaient |
| Rôle d'Oktav | Responsable architecture, développeur fullstack et IA                                                                    |
| Liens        | [Site en développement](https://gentube-nine.vercel.app/), [GitHub](https://github.com/octavebahoun/gentube)             |

## Ce que ça fait

Un projet définit un style, une voix et une chaîne YouTube. Chaque vidéo suit cinq étapes:

1. Storyboard: un LLM découpe le thème en scènes (narration et prompt visuel), éditables en kanban et validées par l'utilisateur
2. Voix off: la durée mesurée de l'audio fixe la durée de chaque scène
3. Visuels: images générées par IA, clips image-vers-vidéo
4. Montage: rendu automatique avec sous-titres mot à mot, transitions et sound design
5. Publication: envoi direct sur la chaîne YouTube du client

Le prix exact en crédits s'affiche avant la génération, calculé sur la seconde d'audio mesurée. Un LLM enrichit le prompt entre l'utilisateur et le modèle vidéo. Un agent conversationnel avec appels de fonctions (`create_project`, `generate_storyboard`, `update_shot`, `launch_generation`) est prévu en P2.

## Stack

- Next.js 15 et Vite React, shadcn/ui, base issue du template Vercel SaaS Starter (Stripe remplacé par GeniusPay)
- Drizzle ORM et Supabase, multi-tenant via le wrapper `tenantDb()`
- Cloudflare R2 (fichiers préfixés par `tenant_id`)
- n8n sur AWS Lightsail 4 Go
- Replicate (modèles Wan 2.2), Cloudflare Workers AI (Flux), ElevenLabs pour la voix
- Remotion et AWS Lambda pour le rendu, API YouTube Data pour la publication
- GeniusPay pour le mobile money

## Modèle économique

| Offre    | Prix par mois                       | Contenu                             |
| -------- | ----------------------------------- | ----------------------------------- |
| Starter  | 15 000 FCFA                         | Environ 26 minutes de vidéo en 480p |
| Pro      | 30 000 FCFA                         | Environ 60 minutes de vidéo en 480p |
| Business | Sur devis, non affiché publiquement | À définir                           |

- 1 crédit = 1 seconde de vidéo en 480p; la 720p coûte 2 crédits par seconde
- Recharge: 5 000 FCFA pour 3 000 crédits sans expiration
- Coût Replicate retenu: 0,05 $ par clip en 480p et 0,10 $ en 720p (variantes rapides, tarifs de juillet 2025 à revérifier)

## Historique

- Point de départ: un workflow n8n pour un seul client (Remotion, AWS Lambda, Cloudflare R2, Novita AI, API YouTube), transformé en SaaS multi-tenant
- Étude de marché des fournisseurs d'API: Atlas Cloud comparé à Replicate
- Architecture de modèles à trois niveaux et documentation destinée aux investisseurs préparées
