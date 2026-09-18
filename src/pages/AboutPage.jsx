import Seo from '../components/Seo'
import Star from '../components/Star'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { members } from '../data/members.js'

const EASE = [0.22, 1, 0.36, 1]

const values = [
  { title: 'Excellence', copy: 'On ne livre que ce dont on est fier. Standard élevé, non négociable.' },
  { title: 'Responsabilité', copy: 'Chaque mission a un responsable clairement identifié. Pas d’écran de fumée.' },
  { title: 'Innovation', copy: 'On explore le neuf pour créer de la valeur, pas pour faire joli.' },
  { title: 'Esprit d’équipe', copy: 'Onze cerveaux valent mieux qu’un. Décisions écrites, débats francs.' },
  { title: 'Intégrité', copy: 'On dit ce qu’on fait, on fait ce qu’on dit. Aucun engagement pris à la légère.' },
  { title: 'Professionnalisme', copy: 'Contrats, jalons, factures, rapports. Rien de laissé au hasard.' },
]

const stats = [
  { value: '11', label: 'Personnes' },
  { value: '6', label: 'Co-fondateurs' },
  { value: '12', label: 'Projets livrés' },
  { value: '2000+', label: 'Utilisateurs' },
]

const directions = [
  { key: 'Administration', label: 'Administration' },
  { key: 'Technique', label: 'Technique' },
  { key: 'Projets & Opérations', label: 'Projets & Opérations' },
  { key: 'Commercial', label: 'Commercial' },
  { key: 'Marketing', label: 'Marketing' },
]

function ManifestoHero() {
  return (
    <section className="mx-auto max-w-[77.5rem] px-6 pt-20 pb-16 sm:pt-28 sm:pb-24 text-center">
      <div className="inline-flex items-center gap-3 text-xs tracking-[0.14em] uppercase text-primary font-semibold">
        <span className="h-px w-8 bg-primary" />
        — À propos
        <span className="h-px w-8 bg-primary" />
      </div>
      <h1 className="mt-6 text-5xl sm:text-7xl font-extrabold tracking-tight leading-[1.02] text-ink">
        On construit, <span className="italic-accent">on livre</span>,<br />
        on <span className="italic-accent">publie</span>. <Star />
      </h1>
      <p className="mt-6 text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
        Excellence Team est un collectif d’ingénieurs et de designers basé à Lokossa, au Bénin. Onze personnes, six co-fondateurs, une gouvernance écrite. On conçoit et livre des logiciels utiles, sobres et documentés.
      </p>
    </section>
  )
}

function VisionMission() {
  return (
    <section className="mx-auto max-w-[77.5rem] px-6 py-16 sm:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: EASE }}
          className="rounded-[28px] bg-white border border-border p-10 sm:p-12"
        >
          <div className="text-[11px] font-bold tracking-[0.16em] uppercase text-primary">— Vision</div>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight text-ink">
            Devenir une entreprise technologique de <span className="italic-accent">référence</span> au Bénin.
          </h2>
          <p className="mt-4 text-[15px] text-text-muted leading-relaxed">
            Progressivement en Afrique francophone, reconnue pour la qualité de ses solutions numériques, son professionnalisme et sa capacité d’innovation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.08 }}
          className="rounded-[28px] bg-ink text-white p-10 sm:p-12"
        >
          <div className="text-[11px] font-bold tracking-[0.16em] uppercase text-primary">— Mission</div>
          <ul className="mt-4 flex flex-col gap-4">
            {[
              'Concevoir des solutions numériques répondant à des besoins réels.',
              'Accompagner les entreprises dans leur transformation numérique.',
              'Proposer des services professionnels en dev logiciel, cybersécurité, data.',
              'Développer des produits et revenus récurrents.',
              'Faire progresser des talents et produire une valeur économique durable.',
            ].map((m) => (
              <li key={m} className="flex items-start gap-3 text-[15px] leading-relaxed">
                <span className="mt-2 size-1.5 rounded-full bg-primary shrink-0" />
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}

function Values() {
  return (
    <section className="mx-auto max-w-[77.5rem] px-6 py-24">
      <div className="flex items-center gap-3 text-xs tracking-[0.14em] uppercase text-primary font-semibold">
        <span className="h-px w-8 bg-primary" />
        — Nos valeurs
      </div>
      <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05] text-ink max-w-2xl">
        Six <span className="italic-accent">principes</span> qu’on applique tous les jours.
      </h2>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {values.map((v, i) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: EASE, delay: i * 0.05 }}
            className="rounded-[20px] bg-bg-card p-8"
          >
            <div className="text-3xl font-extrabold text-primary leading-none">
              {String(i + 1).padStart(2, '0')}
            </div>
            <div className="mt-4 text-xl font-bold text-ink">{v.title}</div>
            <p className="mt-2 text-sm text-text-muted leading-relaxed">{v.copy}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function KeyStats() {
  return (
    <section className="mx-auto max-w-[77.5rem] px-6 py-24">
      <div className="rounded-[32px] bg-ink text-white p-10 sm:p-16">
        <div className="flex items-center gap-3 text-xs tracking-[0.14em] uppercase text-primary font-semibold">
          <span className="h-px w-8 bg-primary" />
          — Chiffres
        </div>
        <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight max-w-xl">
          Ce que ça donne, <span className="italic-accent">en clair</span>.
        </h2>

        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.06 }}
              className="border-t border-white/15 pt-5"
            >
              <div className="text-5xl sm:text-6xl font-extrabold text-white tabular-nums leading-none">
                {s.value}
              </div>
              <div className="mt-3 text-xs tracking-[0.14em] uppercase text-white/50 font-semibold">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function MemberCard({ m }) {
  const initials = m.name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
  const isCofounder = m.status === 'cofondateur'
  return (
    <div className="group rounded-[20px] bg-white border border-border overflow-hidden hover:shadow-soft transition-shadow">
      <div className="relative aspect-[4/5] bg-bg-soft overflow-hidden">
        {m.photo ? (
          <img
            src={m.photo}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex h-full w-full items-center justify-center text-ink/25 text-5xl font-extrabold"
            style={{ background: 'radial-gradient(120% 100% at 30% 20%, #EAEAEA 0%, #D8D8D8 100%)' }}
          >
            {initials}
          </div>
        )}
        {isCofounder && (
          <span className="absolute top-3 left-3 rounded-full bg-primary text-white text-[10px] font-bold tracking-[0.14em] uppercase px-2.5 py-1">
            Cofondateur
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="text-[15px] font-bold text-ink leading-tight">{m.name}</div>
        <div className="mt-1 text-xs text-primary font-semibold uppercase tracking-[0.1em]">
          {m.specialty}
        </div>
        <div className="mt-2 text-xs text-text-muted leading-relaxed">
          {m.role}
        </div>
      </div>
    </div>
  )
}

function TeamGrid() {
  return (
    <section className="mx-auto max-w-[77.5rem] px-6 py-24">
      <div className="flex items-center gap-3 text-xs tracking-[0.14em] uppercase text-primary font-semibold">
        <span className="h-px w-8 bg-primary" />
        — Onze visages
      </div>
      <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05] text-ink max-w-2xl">
        L’<span className="italic-accent">équipe</span> au complet.
      </h2>
      <p className="mt-4 text-[15px] text-text-muted max-w-lg">
        Six co-fondateurs, cinq membres recrutés. Chacun a un domaine, tous se relaient sur les projets.
      </p>

      <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {members.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, ease: EASE, delay: (i % 4) * 0.05 }}
          >
            <MemberCard m={m} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function OrgChart() {
  const dg = members.find((m) => m.direction === 'DG')
  const byDir = directions.map((d) => ({
    ...d,
    lead: members.find((m) => m.direction === d.key && m.status === 'cofondateur'),
    team: members.filter((m) => m.direction === d.key && m.status === 'recrute'),
  }))

  return (
    <section className="mx-auto max-w-[77.5rem] px-6 py-24">
      <div className="flex items-center gap-3 text-xs tracking-[0.14em] uppercase text-primary font-semibold">
        <span className="h-px w-8 bg-primary" />
        — Organigramme
      </div>
      <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05] text-ink max-w-2xl">
        Qui décide, qui exécute, qui <span className="italic-accent">livre</span>.
      </h2>
      <p className="mt-4 text-[15px] text-text-muted max-w-lg">
        Une gouvernance écrite : six cofondateurs pour la stratégie, une direction générale pour l’exécution, cinq directions pour les métiers.
      </p>

      <div className="mt-14 flex flex-col items-center">
        {/* Tier 1 — Cofondateurs */}
        <div className="rounded-full border border-border bg-white px-6 py-3 text-sm font-semibold text-ink">
          <Star /> 6 co-fondateurs · organe stratégique
        </div>
        <div className="my-4 h-8 w-px bg-border" />

        {/* Tier 2 — DG */}
        {dg && (
          <div className="rounded-[20px] bg-ink text-white px-6 py-4 shadow-soft text-center">
            <div className="text-[10px] tracking-[0.16em] uppercase text-primary font-bold">Directeur Général</div>
            <div className="mt-1 text-base font-bold">{dg.name}</div>
          </div>
        )}
        <div className="my-4 h-8 w-px bg-border" />

        {/* Tier 3 — 5 Directions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 w-full">
          {byDir.map((d) => (
            <div key={d.key} className="rounded-[20px] bg-white border border-border p-5 flex flex-col">
              <div className="text-[10px] tracking-[0.16em] uppercase text-primary font-bold">
                Direction
              </div>
              <div className="mt-1 text-sm font-bold text-ink">{d.label}</div>
              {d.lead && (
                <div className="mt-3 rounded-xl bg-bg-soft p-3">
                  <div className="text-[10px] uppercase tracking-[0.14em] text-text-light font-semibold">Responsable</div>
                  <div className="mt-1 text-[13px] font-bold text-ink leading-tight">{d.lead.name}</div>
                </div>
              )}
              {d.team.length > 0 && (
                <div className="mt-3">
                  <div className="text-[10px] uppercase tracking-[0.14em] text-text-light font-semibold mb-2">
                    Équipe
                  </div>
                  <ul className="flex flex-col gap-1.5">
                    {d.team.map((t) => (
                      <li key={t.id} className="text-[12px] text-text-muted leading-tight">
                        {t.name} <span className="text-text-light">— {t.specialty}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
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
            — La suite
          </div>
          <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
            On peut vous <span className="italic-accent">aider</span> — ou vous rejoindre.
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
            href="mailto:recrutement@excellenceteam.site"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white hover:bg-white hover:text-ink transition-colors"
          >
            Nous rejoindre
          </a>
        </div>
      </div>
    </section>
  )
}

export default function AboutPage() {
  return (
    <>
      <Seo
        path="/a-propos"
        title="À propos"
        description="Excellence Team, collectif de 11 personnes à Lokossa : vision, mission, valeurs, équipe complète et organigramme officiel."
      />
      <ManifestoHero />
      <VisionMission />
      <Values />
      <KeyStats />
      <TeamGrid />
      <OrgChart />
      <CtaFinal />
    </>
  )
}
