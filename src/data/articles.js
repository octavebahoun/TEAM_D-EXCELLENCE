export const articleCategories = [
  { key: 'ingenierie', label: 'Ingénierie', tone: '#0D0D0D' },
  { key: 'ia',         label: 'IA',         tone: '#FE4619' },
  { key: 'securite',   label: 'Sécurité',   tone: '#7c3aed' },
  { key: 'metier',     label: 'Métier',     tone: '#0ea5e9' },
  { key: 'retex',      label: 'Retex',      tone: '#10b981' },
]

export const articles = [
  {
    slug: 'contravo-refonte-multi-tenant',
    title: '[Retex Contravo — comment on a construit un SaaS multi-tenant en 3 mois]',
    excerpt:
      '[Extrait à venir — les décisions d’architecture, les erreurs, les patterns Postgres qui ont sauvé le projet.]',
    date: '2026-08-14',
    author: 'Mourchid Folarin',
    category: 'retex',
    tags: ['Contravo', 'Multi-tenant', 'Postgres'],
    readMin: 8,
  },
  {
    slug: 'llm-en-production',
    title: '[Faire tourner un LLM en production sans se ruiner]',
    excerpt:
      '[Extrait à venir — caching, prompts optimisés, choix du bon modèle par tâche, monitoring des coûts par requête.]',
    date: '2026-07-22',
    author: 'Octave Bahoun-Houtoukpe',
    category: 'ia',
    tags: ['LLM', 'RAG', 'Coût'],
    readMin: 12,
  },
  {
    slug: 'pentest-owasp-2026',
    title: '[Pentest applicatif — la checklist OWASP qu’on utilise en 2026]',
    excerpt:
      '[Extrait à venir — notre checklist maison mise à jour, les faux positifs à ignorer, les vraies fenêtres d’attaque.]',
    date: '2026-07-03',
    author: 'Cosme Missikpode',
    category: 'securite',
    tags: ['OWASP', 'Pentest', 'Sécurité'],
    readMin: 10,
  },
  {
    slug: 'mobile-money-integration',
    title: '[Intégrer Mobile Money (MTN, Moov, Orange) proprement]',
    excerpt:
      '[Extrait à venir — webhooks, réconciliation, gestion des échecs, dashboard finance. Ce que la doc ne dit pas.]',
    date: '2026-06-18',
    author: 'Wasfade Tonoukoin',
    category: 'ingenierie',
    tags: ['Mobile Money', 'Paiement', 'API'],
    readMin: 7,
  },
  {
    slug: 'chatbot-waaloge',
    title: '[Waaloge — un chatbot IA pour aider les étudiants à trouver un logement]',
    excerpt:
      '[Extrait à venir — comment on a cadré, prototypé et déployé le chatbot en 5 semaines, feedback utilisateurs à l’appui.]',
    date: '2026-05-30',
    author: 'Octave Bahoun-Houtoukpe',
    category: 'retex',
    tags: ['Waaloge', 'Chatbot', 'IA'],
    readMin: 6,
  },
  {
    slug: 'gouvernance-collectif',
    title: '[Onze personnes, une gouvernance — pourquoi on a tout écrit]',
    excerpt:
      '[Extrait à venir — la note d’organisation interne, les niveaux de décision, ce que ça a changé au quotidien.]',
    date: '2026-05-12',
    author: 'Mourchid Folarin',
    category: 'metier',
    tags: ['Collectif', 'Gouvernance', 'Organisation'],
    readMin: 5,
  },
]
