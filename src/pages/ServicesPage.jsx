import Star from '../components/Star'
import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Link } from 'react-router-dom'

const EASE = [0.22, 1, 0.36, 1]

const services = [
  {
    n: '01',
    slug: 'web-saas',
    title: 'Web & SaaS',
    accent: 'SaaS',
    lead:
      'Applications web complètes pensées pour votre métier. Du prototype fonctionnel jusqu’à la mise en production, avec formation et remise des clés.',
    sub: [
      {
        title: 'Prototype cliquable',
        copy: '[Une version navigable en 2 semaines pour valider les parcours clés avant d’industrialiser. On teste, on ajuste, on ne code pas ce qui ne sert pas.]',
      },
      {
        title: 'Frontend React & Next.js',
        copy: '[Interfaces sobres, rapides et responsives. Tests d’accessibilité, animations mesurées, SEO-ready dès la première release.]',
      },
      {
        title: 'Backend Node.js & API',
        copy: '[API REST ou GraphQL, base PostgreSQL, jobs asynchrones, rate limiting, authentification robuste, documentation OpenAPI.]',
      },
      {
        title: 'Paiement mobile money & Stripe',
        copy: '[Intégrations MTN, Moov, Orange Money et Stripe. Réconciliation automatique, webhooks fiables, tableau de bord finance.]',
      },
    ],
    stack: ['React 19', 'Next.js', 'Node.js', 'PostgreSQL', 'Vercel'],
    caseStudy: {
      client: 'Contravo',
      pitch: 'Plateforme B2B multi-tenant — devis, factures, contrats, paiement mobile money.',
    },
    illu: '/service-01-web-saas.svg',
  },
  {
    n: '02',
    slug: 'ia-data',
    title: 'IA & Data',
    accent: 'IA',
    lead:
      'Des LLMs en production, pas en démonstration. RAG, fine-tuning, agents connectés à vos données. Chaque sortie du modèle est mesurée.',
    sub: [
      {
        title: 'Cadrage cas d’usage',
        copy: '[On évalue la valeur avant d’écrire une ligne. Jeu de tests, coût par requête estimé, seuil de qualité fixé avec vous.]',
      },
      {
        title: 'RAG sur vos données',
        copy: '[Ingestion, chunking, embeddings, base vectorielle. Réponses sourcées, citations vérifiables, garde-fous.]',
      },
      {
        title: 'Fine-tuning & évaluation',
        copy: '[Fine-tune ciblé sur vos données propriétaires quand le RAG ne suffit pas. Évaluation continue, comparaison de modèles.]',
      },
      {
        title: 'Agents & automatisations n8n',
        copy: '[Workflows d’enrichissement, tri, résumé, réponses automatiques. Human-in-the-loop où c’est critique.]',
      },
    ],
    stack: ['Python', 'LangChain', 'pgvector', 'OpenAI / Anthropic', 'n8n'],
    caseStudy: {
      client: 'Gentube',
      pitch: 'SaaS de génération vidéo par IA avec système de crédits et mobile money.',
    },
    illu: '/service-02-ia-data.svg',
  },
  {
    n: '03',
    slug: 'plateformes-metier',
    title: 'Plateformes métier',
    accent: 'métier',
    lead:
      'Outils de gestion sur mesure pour établissements, associations, communautés. On lit vos processus avant d’écrire la première ligne.',
    sub: [
      {
        title: 'Cartographie des processus',
        copy: '[Ateliers utilisateurs, cartographie des flux existants, identification des points de friction et opportunités de simplification.]',
      },
      {
        title: 'Modélisation & admin interne',
        copy: '[Schéma de données pensé pour votre métier, panneau d’administration lisible pour les gens qui vont l’utiliser vraiment.]',
      },
      {
        title: 'Rôles & permissions',
        copy: '[Comptes multi-niveaux, permissions granulaires, journal d’audit, RGPD-friendly.]',
      },
      {
        title: 'Rapports & exports',
        copy: '[Tableaux de bord adaptés, exports CSV/PDF, envois planifiés par mail, connecteurs vers Sheets ou Notion.]',
      },
    ],
    stack: ['React', 'Node.js', 'PostgreSQL', 'Supabase / Clerk', 'Admin custom'],
    caseStudy: {
      client: 'Fieri',
      pitch: 'Gestion de la recherche académique — veille, réseau, valorisation de l’innovation.',
    },
    illu: '/service-03-plateformes-metier.svg',
  },
  {
    n: '04',
    slug: 'cloud-architecture',
    title: 'Cloud & Architecture',
    accent: 'Cloud',
    lead:
      'Infrastructure pensée pour durer. Composants open source, déploiement continu, API-first pour s’intégrer à l’existant.',
    sub: [
      {
        title: 'Architecture cible',
        copy: '[Schéma d’architecture, choix de composants, plan de migration si legacy. Documenté et challengé avec vos équipes.]',
      },
      {
        title: 'CI/CD & Infrastructure as Code',
        copy: '[Pipelines reproductibles, environnements preview par PR, déploiements atomiques, rollbacks en un clic.]',
      },
      {
        title: 'Observabilité',
        copy: '[Logs centralisés, métriques temps réel, alertes qui réveillent au bon moment. Grafana, Sentry, Better Stack.]',
      },
      {
        title: 'Sécurité & audits récurrents',
        copy: '[Audits OWASP, chiffrement au repos et en transit, gestion des secrets, plan de reprise testé.]',
      },
    ],
    stack: ['Docker', 'Terraform', 'GitHub Actions', 'AWS / Vercel / Fly.io', 'Grafana'],
    caseStudy: {
      client: '[Client à confirmer]',
      pitch: '[Cas d’usage cloud à décrire — migration, refonte infra, mise en conformité…]',
    },
    illu: '/service-04-cloud-architecture.svg',
  },
]

const process = [
  { n: '01', title: 'Écoute', copy: 'Premier échange pour comprendre le besoin, le contexte, la contrainte principale.' },
  { n: '02', title: 'Cadrage', copy: 'Note de cadrage : périmètre, jalons, prix, équipe. Signature.' },
  { n: '03', title: 'Prototype', copy: 'Version cliquable en 2-3 semaines. On teste, on ajuste avant d’industrialiser.' },
  { n: '04', title: 'Livraison', copy: 'Mise en production, formation, remise des clés. Suivi post-livraison inclus.' },
]

const pricing = [
  {
    name: 'Forfait projet',
    price: 'à partir de [400 000 FCFA]',
    for: 'Périmètre défini · livraison en une seule mission',
    features: [
      'Devis fermé après cadrage',
      'Jalons planifiés à la semaine',
      '2 rounds de retours inclus',
      'Formation équipe à la livraison',
    ],
    highlight: false,
  },
  {
    name: 'Régie mensuelle',
    price: 'à partir de [X FCFA / mois]',
    for: 'Roadmap évolutive · sprints continus',
    features: [
      'Équipe dédiée (dev + design)',
      'Sprint hebdo, démo à chaque fin',
      'Backlog partagé (Linear)',
      'Résiliable au mois',
    ],
    highlight: true,
  },
  {
    name: 'Maintenance',
    price: 'à partir de [Y FCFA / mois]',
    for: 'Site ou app déjà en prod',
    features: [
      'Correctifs et mises à jour',
      'Monitoring + alertes',
      'Support < 24h ouvré',
      'Rapport mensuel',
    ],
    highlight: false,
  },
]

function PageHeader() {
  return (
    <section className="mx-auto max-w-[77.5rem] px-6 pt-20 pb-12 sm:pt-28 sm:pb-16 text-center">
      <div className="inline-flex items-center gap-3 text-xs tracking-[0.14em] uppercase text-primary font-semibold">
        <span className="h-px w-8 bg-primary" />
        — Services
        <span className="h-px w-8 bg-primary" />
      </div>
      <h1 className="mt-6 text-5xl sm:text-7xl font-extrabold tracking-tight leading-[1.02] text-ink">
        Quatre terrains. Un <span className="italic-accent">seul</span> standard.
        <Star className="ml-3" />
      </h1>
      <p className="mt-6 text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
        On conçoit, on développe, on met en production. Chaque mission suit le même process : écoute, cadrage écrit, prototype, livraison, transfert.
      </p>
    </section>
  )
}

function AnchorNav() {
  return (
    <div className="mx-auto max-w-[77.5rem] px-6 mb-16 flex justify-center">
      <div className="rounded-full bg-white border border-border shadow-soft overflow-x-auto max-w-full">
        <ul className="flex items-center gap-1 p-1 min-w-max">
          {services.map((s) => (
            <li key={s.slug}>
              <a
                href={`#${s.slug}`}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-ink hover:bg-bg-soft transition-colors whitespace-nowrap"
              >
                <span className="text-[11px] tabular-nums text-text-light">{s.n}</span>
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function AccordionItem({ item, isOpen, onToggle }) {
  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 py-4 text-left"
      >
        <span className="text-[15px] font-semibold text-ink">{item.title}</span>
        <span
          className={`shrink-0 inline-flex size-7 items-center justify-center rounded-full transition-colors ${
            isOpen ? 'bg-primary text-white' : 'bg-bg-soft text-ink'
          }`}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            {isOpen ? <path d="M6 12h12" /> : <path d="M12 6v12M6 12h12" />}
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="pb-4 pr-8 text-sm leading-relaxed text-text-muted">{item.copy}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function ServiceBlock({ service: s, reverse }) {
  const [open, setOpen] = useState(0)

  return (
    <section id={s.slug} className="mx-auto max-w-[77.5rem] px-6 py-16 sm:py-24 scroll-mt-8">
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
        {/* Illustration side */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="rounded-[28px] bg-bg-card p-8 sm:p-12 flex items-center justify-center min-h-[360px]"
        >
          <img src={s.illu} alt="" aria-hidden="true" className="w-full max-w-md" />
        </motion.div>

        {/* Content side */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
        >
          <div className="text-[13px] tracking-[0.18em] uppercase text-text-light font-semibold tabular-nums">
            Service {s.n}
          </div>
          <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05] text-ink">
            {s.title.split(s.accent)[0]}
            <span className="italic-accent">{s.accent}</span>
            {s.title.split(s.accent)[1]}
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-text-muted max-w-lg">{s.lead}</p>

          <div className="mt-8">
            {s.sub.map((item, i) => (
              <AccordionItem
                key={item.title}
                item={item}
                isOpen={open === i}
                onToggle={() => setOpen(open === i ? -1 : i)}
              />
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            {s.stack.map((t) => (
              <span key={t} className="rounded-full bg-bg-soft border border-border px-3 py-1.5 text-xs font-medium text-ink">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-6 rounded-2xl bg-ink text-white p-5 flex items-start gap-4">
            <span className="text-primary font-bold text-xs tracking-[0.18em] uppercase shrink-0 mt-0.5">
              Cas
            </span>
            <div className="flex-1">
              <div className="text-sm font-bold">{s.caseStudy.client}</div>
              <div className="mt-1 text-[13px] text-white/70 leading-relaxed">{s.caseStudy.pitch}</div>
            </div>
          </div>

          <div className="mt-6">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white hover:bg-primary-hover transition-colors"
            >
              En parler
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function ProcessSection() {
  return (
    <section className="mx-auto max-w-[77.5rem] px-6 py-24 sm:py-32">
      <div className="flex items-center gap-3 text-xs tracking-[0.14em] uppercase text-primary font-semibold">
        <span className="h-px w-8 bg-primary" />
        — Notre process
      </div>
      <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05] text-ink max-w-2xl">
        Quatre étapes, <span className="italic-accent">écrites</span> avant le premier commit.
      </h2>

      <ol className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {process.map((p, i) => (
          <motion.li
            key={p.n}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
            className="rounded-[20px] bg-white border border-border p-6"
          >
            <div className="text-5xl font-extrabold text-primary leading-none tabular-nums">{p.n}</div>
            <div className="mt-4 text-lg font-bold text-ink">{p.title}</div>
            <p className="mt-2 text-sm text-text-muted leading-relaxed">{p.copy}</p>
          </motion.li>
        ))}
      </ol>
    </section>
  )
}

function PricingSection() {
  return (
    <section className="mx-auto max-w-[77.5rem] px-6 py-24 sm:py-32">
      <div className="flex items-center gap-3 text-xs tracking-[0.14em] uppercase text-primary font-semibold">
        <span className="h-px w-8 bg-primary" />
        — Modèles d’engagement
      </div>
      <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05] text-ink max-w-2xl">
        Trois façons de <span className="italic-accent">travailler</span> avec nous.
      </h2>
      <p className="mt-4 text-[15px] text-text-muted max-w-lg">
        Prix indicatifs. Chaque projet est chiffré au périmètre après un premier échange.
      </p>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
        {pricing.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
            className={`rounded-[24px] p-8 flex flex-col ${
              p.highlight
                ? 'bg-ink text-white shadow-lift'
                : 'bg-white border border-border text-ink'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className={`text-xs tracking-[0.14em] uppercase font-semibold ${p.highlight ? 'text-primary' : 'text-text-light'}`}>
                {p.name}
              </div>
              {p.highlight && (
                <span className="rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold text-white tracking-wider uppercase">
                  Populaire
                </span>
              )}
            </div>
            <div className={`mt-4 text-2xl font-extrabold ${p.highlight ? 'text-white' : 'text-ink'}`}>
              {p.price}
            </div>
            <div className={`mt-2 text-sm ${p.highlight ? 'text-white/70' : 'text-text-muted'}`}>
              {p.for}
            </div>

            <ul className="mt-6 flex-1 flex flex-col gap-3">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="shrink-0 mt-0.5 text-primary" aria-hidden="true">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <span className={p.highlight ? 'text-white/90' : 'text-ink'}>{f}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/contact"
              className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors ${
                p.highlight
                  ? 'bg-primary text-white hover:bg-primary-hover'
                  : 'bg-ink text-white hover:bg-primary'
              }`}
            >
              Démarrer
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function CtaFinal() {
  return (
    <section className="mx-auto max-w-[77.5rem] px-6 pb-24 sm:pb-32">
      <div className="rounded-[32px] bg-ink text-white p-10 sm:p-16 flex flex-col sm:flex-row items-start sm:items-end gap-8 justify-between">
        <div className="max-w-xl">
          <div className="flex items-center gap-3 text-xs tracking-[0.14em] uppercase text-primary font-semibold">
            <span className="h-px w-8 bg-primary" />
            — Passons à la suite
          </div>
          <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
            Un <span className="italic-accent">brief</span>, on vous répond sous 48h.
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white hover:bg-primary-hover transition-colors"
          >
            Nous écrire
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
          <a
            href="https://cal.com/excellence-team-baw7ji"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white hover:bg-white hover:text-ink transition-colors"
          >
            Prendre RDV
          </a>
        </div>
      </div>
    </section>
  )
}

export default function ServicesPage() {
  return (
    <>
      <PageHeader />
      <AnchorNav />
      {services.map((s, i) => (
        <ServiceBlock key={s.slug} service={s} reverse={i % 2 === 1} />
      ))}
      <ProcessSection />
      <PricingSection />
      <CtaFinal />
    </>
  )
}
