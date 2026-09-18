# Video Remix Studio

Video Remix Studio est une table de montage qui retrouve les plans d'un utilisateur au lieu d'en générer: on tape une phrase, et un MP4 calé sur les beats de la musique sort en 10 à 40 secondes. Il fonctionne de bout en bout.

| Champ        | Info                                                                                                     |
| ------------ | -------------------------------------------------------------------------------------------------------- |
| Type         | Outil de montage vidéo agentique (le dépôt vr-std contient le site de démonstration)                     |
| Statut       | Fonctionnel et testable de bout en bout; étude V1 publiée le 26 août 2026 (sprints 1 à 10)               |
| Rôle d'Oktav | Dépôt sur son compte GitHub, rôle exact à préciser                                                       |
| Liens        | [Démo en ligne](https://octavebahoun.github.io/vr-std), [GitHub](https://github.com/octavebahoun/vr-std) |

## Ce que ça fait

Aucune image n'est générée. Le studio interroge une base de plans déjà indexés, note chaque plan et assemble le montage avec FFmpeg. Cibles: monteurs Shorts et TikTok, AMV et fan edits, archivistes.

| Critère        | Génératif        | Video Remix Studio        |
| -------------- | ---------------- | ------------------------- |
| Coût par vidéo | 0,20 à 2 $ (GPU) | Environ 0 $               |
| Temps          | 2 à 10 minutes   | 10 à 40 secondes          |
| Fidélité       | Aléatoire        | Fidèle à la source        |
| Droits         | Flous            | Fichiers de l'utilisateur |

Le coût est d'environ 0 $ en repli local et d'environ 0,02 $ en tout cloud. La base LanceDB locale peut indexer 100 000 plans.

## Indexation hors ligne

Elle se lance une fois, en local, et ne retraite jamais deux fois le même fichier:

1. Découpe des plans avec PySceneDetect (seuil 27, minimum 0,6 s) et FFmpeg
2. Analyse audio avec Librosa: BPM, beats, drops, énergie, sections
3. Couleurs et mouvement avec OpenCV: HSV, flux optique (statique, pan, zoom, shake)
4. Vision avec YOLO11 puis Florence-2, jamais ensemble en mémoire
5. Embeddings SigLIP en 768 dimensions, stockés dans LanceDB

## Studio en ligne: six agents LangGraph

1. Intent: traduit la phrase en intention (humeur, personnage, couleur, effets, BPM, durée)
2. Retriever: 50 candidats par recherche hybride dans LanceDB
3. Analyzer: note les plans et en garde 15
4. Planner: construit la timeline calée sur les beats (1,8 s en passage calme, 0,5 s sur un drop)
5. Editor: une seule commande FFmpeg `filter_complex` produit le MP4
6. Validator: score sur 100; sous 70, retour au Planner, trois tentatives au maximum

## Trois modes

| Mode               | Option                       | Contenu                          |
| ------------------ | ---------------------------- | -------------------------------- |
| Léger (recommandé) | `--no-caption`               | YOLO et SigLIP, sans Florence    |
| Complet            | aucune                       | YOLO, Florence-2 et SigLIP       |
| 100 % hors ligne   | `--no-vision` et `--offline` | Aucun modèle, repli déterministe |

Matériel: 4 Go de RAM au minimum en hors ligne, 8 Go recommandés en mode léger, 16 Go pour le mode complet (Florence demande 8 à 12 Go libres).

## Stack

- Python 3.12, LangGraph (un agent, une clé de modèle), LanceDB, FFmpeg
- Vision: YOLO11, Florence-2, SigLIP. Audio: Librosa. Découpe: PySceneDetect. Images: OpenCV
- Modèles de langage: Llama 70B et 8B (Intent, Retriever, Analyzer, Validator), Claude 3.5 (Planner, avec repli déterministe), DeepSeek (Editor)
- Mémoire de style en JSON et CLI Typer et Rich
- Site de démonstration: HTML, CSS et JavaScript statiques sur GitHub Pages

## À vérifier
