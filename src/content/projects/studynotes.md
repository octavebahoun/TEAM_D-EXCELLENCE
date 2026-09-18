# StudyNotes

StudyNotes est un carnet de notes intelligent pour étudiants, en PWA: calcul des moyennes avec une formule personnalisée par matière, révisions assistées par IA et suivi des contrôles.

| Champ | Info |
| --- | --- |
| Type | Produit d'Excellence Team, application pour étudiants (PWA) |
| Année | À préciser |
| Statut | Fonctionnel, déployable avec Docker Compose sur un VPS |
| Rôle d'Oktav | Dépôt sur son compte GitHub, rôle exact à préciser |
| Liens | [Site](https://study.excellenceteam.site/), [GitHub](https://github.com/octavebahoun/Study) |

## Ce que ça fait

- Inscription et connexion par e-mail et mot de passe
- Onboarding: semestres, matières et formule de calcul de chaque matière
- Tableau de bord: moyenne globale, progression, prochains contrôles, message de l'IA
- Notes: saisie selon la formule, calcul automatique, retour de l'IA
- Matières: notions à réviser et suivi des contrôles
- Révisions: flashcards, quiz, résumé, podcast audio, RAG, roadmap, visualiseur
- Calendrier des contrôles avec un code couleur selon l'urgence
- Profil: thèmes, préférences IA, badges, progression
- PWA installable, cache hors ligne, notifications push

Chaque matière a sa formule, par exemple `(i1 + i2) * 0.4 + 0.6 * d1`. Les variables sont détectées automatiquement et deviennent les champs de saisie.

L'application propose aussi quatre thèmes (Bleu Indigo, Vert forêt, Orange vif, Dark Neon), cinq badges (Première note, Perfection, Objectif atteint, Semestre validé, En feu) et des exports: bulletin PDF par semestre, flashcards et résumés en PDF ou TXT.

## Stack

- Front: React 18, Vite, Tailwind, Zustand, React Router 6, VitePWA (Workbox)
- Back: Node.js, Express, Mongoose, MongoDB Atlas
- IA: OpenRouter pour les notes et le tableau de bord, Groq (LLaMA 3, Mixtral, Gemma) pour les révisions
- Audio: microservice Flask avec gTTS
- Déploiement: Docker Compose et Nginx
- Sécurité: mots de passe bcrypt (12 rounds), JWT, limitation de débit, Helmet, CORS restreint au client

## À compléter

- Année de démarrage et nombre d'utilisateurs
- Rôle d'Oktav et équipe
