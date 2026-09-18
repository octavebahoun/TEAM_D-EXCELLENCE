# codetovecto

codetovecto est un outil en ligne de commande, publié sur npm, qui transforme le code d'un projet en base de connaissances vectorielle locale pour alimenter un chatbot IA. Il dépasse 1 500 téléchargements organiques.

| Champ | Info |
| --- | --- |
| Type | Paquet npm open source (licence MIT), RAG sur du code |
| Version | 2.0.8 |
| Auteur | Oktav |
| Statut | Publié |
| Téléchargements | Plus de 1 500, organiques |
| Liens | [GitHub](https://github.com/octavebahoun/Code-to-vector) |

## Ce que ça fait

Le scan lit le code source, le découpe par fonction ou par composant grâce à l'AST, génère un embedding pour chaque morceau et stocke le tout dans LanceDB, une base vectorielle embarquée. Aucun serveur n'est requis. La fonction `search` renvoie les cinq morceaux les plus proches d'une question, prêts à être injectés dans le prompt d'un LLM.

- Commandes: `init` (génère la configuration et un exemple de RAG) et `scan` (`--frontend`, `--backend`, `--fullstack` par défaut, `--output`, `--lancedb`)
- Sorties: `codetovecto-output.json`, portable, et un dossier `codetovecto-lancedb/`
- Cache MD5 par fichier: seuls les fichiers modifiés appellent l'API, moins de 3 secondes pour un scan sans changement
- Fichiers pris en charge: JS, JSX, TS, TSX et HTML; PHP et Python sont prévus
- Taille minimale des morceaux réglable, 5 lignes et 120 caractères par défaut

## Stack

- Node.js (CommonJS), commander, chalk
- Babel parser pour JS et TS, node-html-parser pour HTML
- Embeddings via OpenRouter, modèle gratuit `nvidia/llama-nemotron-embed-vl-1b-v2`
- LanceDB, recherche par similarité cosinus

## Usages

- Couche RAG de Jarvis, l'assistant IA agentique personnel d'Oktav, et d'autres projets
- Candidature envisagée au Nebius x NVIDIA Global AI Hackathon (Devpost, échéance du 30 octobre 2026, piste Personal AI), via Jarvis

## À compléter

- Date de première publication sur npm et téléchargements actuels
- Liste des projets qui l'utilisent
