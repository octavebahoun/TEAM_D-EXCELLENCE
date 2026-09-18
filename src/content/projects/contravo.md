# Contravo

Contravo est un SaaS multi-tenant B2B pour freelances et petites entreprises du Bénin: devis, factures, contrats et paiements par mobile money. Il est en bêta et utilisable.

| Champ        | Info                                                                                                            |
| ------------ | --------------------------------------------------------------------------------------------------------------- |
| Type         | SaaS interne d'Excellence Team, produit principal d'Oktav                                                       |
| Cible        | Freelances et petites entreprises, Bénin et Afrique de l'Ouest francophone                                      |
| Année        | 2026                                                                                                            |
| Statut       | Bêta utilisable; enregistrement légal en cours au 18 août                                                       |
| Rôle d'Oktav | Responsable architecture, développeur fullstack et IA. A codé tous les modules IA et toute l'automatisation n8n |
| Équipe       | Quatre personnes au hackathon: IA et matching, backend, frontend, cybersécurité                                 |
| Liens        | [Site](https://contravo.excellenceteam.site/), [GitHub](https://github.com/octavebahoun/contravo)               |

## Ce que ça fait

Fonctions décrites dans la spec MVP du 13 août et dans les documents de pitch:

- Devis, factures et contrats. Le client signe par lien, sans créer de compte; le PDF final est scellé avec une preuve cryptographique
- Paiement des factures par mobile money via GeniusPay (Wave, Orange Money, MTN, carte)
- Portail client, avis clients validés, dépenses et livrables
- API publique v1 avec clés d'API à portée limitée et webhooks signés HMAC
- Contravo Connect: bot WhatsApp Business en option (API Cloud, connexion Meta embedded signup). Les messages passent d'abord par un filtre à mots-clés, puis par un LLM pour les cas ambigus
- Couche IA: agent conversationnel de matching, recherche sémantique pgvector, anonymisation Presidio, démo d'un bot WhatsApp

## Stack

- Next.js 15, TypeScript, Tailwind, shadcn/ui, Zod
- PostgreSQL avec Drizzle ORM; isolation multi-tenant par le wrapper `tenantDb()` et Row-Level Security
- Cloudflare R2 pour les fichiers, n8n pour les emails, relances et notifications
- GeniusPay pour les paiements
- IA: LangChain, pgvector, Presidio
- Sécurité: chiffrement AES-256-GCM, vérification de signature des webhooks, horodatage légal SHA-256

## Plan MVP en six étapes

1. Fondations multi-tenant: organisations et rôles
2. API publique et trois canaux d'authentification (session, clé d'API, jeton public)
3. Cœur métier en huit modules et paiement des factures via GeniusPay
4. Stockage R2, génération de PDF, signature cryptographique
5. Orchestration n8n, qui passe uniquement par l'API publique, jamais par la base
6. Facturation SaaS (plans Free, Pro, Business) via le compte GeniusPay d'Excellence

Deux comptes GeniusPay restent séparés: celui de chaque organisation pour ses factures clients, celui d'Excellence pour les abonnements. Charge estimée: 40 à 55 jours-homme sur cinq développeurs.

## Résultats et démarches

- Hackathon des 9 et 10 septembre: 2e place avec Contravo. Pitch prévu le 27
- Soumis à plusieurs appels à projets
- Étude de marché par formulaire Tally Freelance: 110 réponses, surtout du Bénin. La plupart ne paient aucun logiciel de facturation; le prix acceptable se situe entre 5 000 et 15 000 XOF par mois
