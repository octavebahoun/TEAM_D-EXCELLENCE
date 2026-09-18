# AcademiX

AcademiX est une plateforme académique tout-en-un qui combine organisation intelligente, IA générative et collaboration en temps réel pour aider les étudiants à réussir, avec une faible ingérence de l'administration. Elle a remporté la 1re place au HackByIFRI 2026.

| Champ        | Info                                                                                                                                                                       |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Type         | Plateforme web multi-rôles pour l'enseignement supérieur, développée pour un hackathon                                                                                     |
| Événement    | HackByIFRI 2026 (Hackathon IFRI), thème: intégration efficace du numérique dans l'apprentissage universitaire                                                              |
| Année        | 2026                                                                                                                                                                       |
| Statut       | MVP validé le 24 février 2026, démo en ligne avec trois parcours (admin, chef de département, étudiant)                                                                    |
| Résultats    | 1re place au HackByIFRI                                                                                                                                                    |
| Équipe       | Team D'excellence, trois développeurs: frontend et design React (Hanna Biaou), backend Laravel et MySQL (Mourchid Folarin), fullstack Node.js et IA Python (Octave Bahoun) |
| Rôle d'Oktav | Développeur fullstack: service temps réel en Node.js et service IA en Python                                                                                               |
| Liens        | [Démo](https://team-d-excellence-hackbyifri-2026.vercel.app/login), [GitHub](https://github.com/octavebahoun/TEAM_D-EXCELLENCE_HACKBYIFRI)                                 |

## Problème et solution

Les étudiants sont submergés de contenu, peu accompagnés, et leurs outils de révision sont dispersés. AcademiX repose sur trois piliers: organisation intelligente (calendrier, tâches, notes, alertes précoces), apprentissage assisté par IA et collaboration en temps réel. La solution de base est gratuite pour l'étudiant.

## Cinq rôles

- Administrateur: gestion globale de l'établissement, départements et chefs de département
- Chef de département: filières, import des étudiants, des notes et des emplois du temps par CSV, validation des notes, salles, absences, communications, journal d'audit
- Professeur: cours, supports, discussions
- Responsable de classe: relais de toute la communication de la classe, un seul canal clair (le différenciateur du projet)
- Étudiant: tableau de bord, notes, emploi du temps, révisions par IA, sessions collaboratives

## Organisation et suivi

- Import CSV des étudiants, des notes et des emplois du temps, avec des modèles par filière
- Moyennes pondérées par coefficient, notes validées par le chef de département
- Emploi du temps, tâches et absences
- Alertes précoces: baisse de moyenne, échéance proche
- Synchronisation avec Google Calendar et Google Tasks, notifications push (Web Push)

## Portail de révision IA

- Résumés: fiches de révision structurées à partir d'un cours
- Podcasts: les notes transformées en audio (gTTS)
- Quiz: QCM générés depuis les supports
- Exercices: exercices inédits avec corrigés pas à pas
- Professeur IA: tuteur basé sur un RAG, réponses fondées sur la base de connaissance validée

Le code contient aussi une roadmap de révision, un outil d'images et une analyse de la performance de l'étudiant. Les modèles viennent de Groq et d'OpenRouter, choisis selon la fonctionnalité.

## Collaboration en temps réel

- Sessions d'étude en salles virtuelles, connectées par WebSocket
- Chat de groupe en direct
- Tableau blanc partagé, synchronisé en direct
- Éditeur de code collaboratif dans le navigateur (Monaco), à plusieurs comme dans un document partagé
- Discussions, messages privés et notifications instantanées

## Chiffres

4 microservices, 3 bases de données (MySQL, MongoDB, Redis), 5 rôles, 5 modules IA.

## Stack

- Frontend: React 19, Vite 7, Tailwind 4, React Router 7, Recharts, Socket.io, `@monaco-editor/react` 4.7, Remotion Player pour l'intro animée
- API métier: Laravel 12 (PHP 8.2) avec Sanctum, MySQL 8
- Temps réel: Node.js 20, Express 5, Socket.io, MongoDB (Mongoose), Redis
- Service IA: Python 3.11, FastAPI, LangChain, Celery pour les tâches longues, pypdf et WeasyPrint pour les PDF
- Infra: Docker Compose (Laravel, Node, Python, Caddy pour le HTTPS automatique), pensé pour un VPS de 4 Go; frontend sur Vercel

## Modèle économique et perspectives

- Freemium: fonctions de base gratuites, offre Premium avec IA illimitée, podcasts et analytics avancés
- Marketplace de tuteurs avec commission sur les sessions rémunérées, et licences institutionnelles pour les universités
- Cible initiale: les étudiants des universités béninoises, puis l'Afrique de l'Ouest par les universités (B2B2C)
- Prévu après le MVP: matching entre tuteurs et étudiants, planning adaptatif par IA, bibliothèque collaborative, application mobile React Native, intégration LMS (Moodle, Canvas)

## Piste en cours

AcademiX présenter pour les 25 ans de l'INSTI, pour le département de génie électrique et informatique. Une couche de capteurs IoT (présence en cours, suivi d'énergie d'un labo) a été proposée.
