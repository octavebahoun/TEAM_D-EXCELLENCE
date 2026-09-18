# Pipevideo (Content Factory)

Pipevideo est un pipeline de production vidéo piloté par un agent IA: à partir d'un storyboard JSON, il génère des vidéos complètes (shorts 9:16 ou essais 16:9) avec voix off, sous-titres, transitions et sound design.

| Champ | Info |
| --- | --- |
| Type | Outil de production vidéo (paquet content-factory 1.0.0) |
| Statut | À préciser |
| Rôle d'Oktav | Dépôt sur son compte GitHub, rôle exact à préciser |
| Liens | [GitHub](https://github.com/octavebahoun/pipevideo) |

## Ce que ça fait

Le flux de travail:

1. `npm run new-video` crée un storyboard vierge et archive l'ancien projet
2. L'agent IA remplit `storyboard.json`: scènes, narration, médias, effets
3. `npm run tts` génère les voix off ElevenLabs avec les timings mot à mot
4. `npm run sounds` régénère le catalogue de sons
5. Les médias (images, vidéos) sont déposés dans `public/`
6. `npm run render` lance le rendu local
7. `npm run render:lambda` lance le rendu distribué sur AWS Lambda

- Storyboard validé par Zod. Par scène: narration, média, zoom Ken Burns, transition (fondu, glissement, volet, noir), tremblement de caméra, sons, texte incrusté, écran de fin
- Sous-titres karaoké (mots surlignés au fil de la voix, pour les shorts) ou cinematic (phrase centrée, pour les documentaires 16:9)
- Voix ElevenLabs: george par défaut, liam, antoni, anais, rachel
- Bibliothèque de sons (bruitages, ambiances, musiques) décrite par des fichiers Markdown: humeur, durée, tonalité, BPM, pics d'impact
- Rendu Lambda: seuls les assets référencés par le storyboard sont envoyés, quota de concurrence réglable avec `RENDER_MAX_LAMBDAS`

## Stack

- Remotion 4 (bundler, CLI, renderer, transitions, Lambda), React 18, TypeScript, Zod
- ElevenLabs et edge-tts pour la voix
- AWS Lambda pour le rendu distribué
- Pilotage par un agent avec des skills (Remotion, ElevenLabs, vidéo)
- Même socle de rendu que Gentube: Remotion, AWS Lambda, ElevenLabs

## À compléter

- Année, statut, vidéos produites pour de vrais clients
- Rôle d'Oktav, lien éventuel avec l'origine de Gentube
