import { motion } from 'motion/react'

const EASE = [0.22, 1, 0.36, 1]

const testimonials = [
  {
    project: 'Contravo',
    quote: 'Un accompagnement carré, du prototype à la mise en prod. Les délais ont été tenus.',
    author: '[Prénom Nom]',
    role: '[Rôle client] · Contravo',
  },
  {
    project: 'Gentube',
    quote: 'L’équipe a compris notre marché et livré une plateforme qui tient la charge dès le lancement.',
    author: '[Prénom Nom]',
    role: '[Rôle client] · Gentube',
  },
  {
    project: 'Waaloge',
    quote: 'Le chatbot IA a changé la façon dont nos étudiants trouvent un logement. Simple, rapide.',
    author: '[Prénom Nom]',
    role: '[Rôle client] · Waaloge',
  },
  {
    project: 'Fieri',
    quote: 'Une plateforme sérieuse, pensée pour la recherche. On sent que le code est fait pour durer.',
    author: '[Prénom Nom]',
    role: '[Rôle client] · Fieri',
  },
  {
    project: 'Mecano',
    quote: 'Ils ont transformé un besoin flou en un outil que toute mon équipe utilise chaque jour.',
    author: '[Prénom Nom]',
    role: '[Rôle client] · Mecano',
  },
  {
    project: 'Excellence Link',
    quote: 'Communication claire, décisions rapides. Le genre de partenaire qu’on garde.',
    author: '[Prénom Nom]',
    role: '[Rôle client] · Excellence Link',
  },
  {
    project: 'Now Study',
    quote: 'Design soigné, performances au rendez-vous. Nos utilisateurs le sentent.',
    author: '[Prénom Nom]',
    role: '[Rôle client] · Now Study',
  },
  {
    project: 'Codetovecto',
    quote: 'Ils ont livré ce qu’ils avaient promis, ni plus, ni moins. C’est déjà rare.',
    author: '[Prénom Nom]',
    role: '[Rôle client] · Codetovecto',
  },
]

function Avatar({ name }) {
  const initials = name
    .replace(/\[|\]/g, '')
    .split(' ')
    .map((w) => w[0] || '')
    .slice(0, 2)
    .join('')
    .toUpperCase() || '?'
  return (
    <span
      aria-hidden="true"
      className="inline-flex size-11 items-center justify-center rounded-full bg-ink text-white text-xs font-bold shrink-0"
    >
      {initials}
    </span>
  )
}

function Card({ t }) {
  return (
    <article className="w-[360px] shrink-0 rounded-[20px] bg-white p-6 shadow-soft">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] uppercase text-primary">
        <span className="size-1.5 rounded-full bg-primary" />
        {t.project}
      </span>
      <p className="mt-4 text-[15px] leading-relaxed text-ink italic">
        « {t.quote} »
      </p>
      <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
        <Avatar name={t.author} />
        <div className="min-w-0">
          <div className="text-sm font-bold text-ink truncate">{t.author}</div>
          <div className="text-xs text-text-muted truncate">{t.role}</div>
        </div>
      </div>
    </article>
  )
}

function Row({ items, direction = 'left', duration = 60 }) {
  const anim = direction === 'left' ? 'marquee-left' : 'marquee-right'
  return (
    <div className="group relative overflow-hidden mask-fade">
      <div
        className="flex gap-5 w-max"
        style={{ animation: `${anim} ${duration}s linear infinite` }}
      >
        {[...items, ...items].map((t, i) => (
          <Card key={`${t.project}-${i}`} t={t} />
        ))}
      </div>
    </div>
  )
}

export default function Testimonials() {
  const row1 = testimonials.slice(0, 4)
  const row2 = testimonials.slice(4, 8)

  return (
    <section className="py-24 sm:py-32">
      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        .mask-fade {
          -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 8%, #000 92%, transparent 100%);
                  mask-image: linear-gradient(90deg, transparent 0, #000 8%, #000 92%, transparent 100%);
        }
        .group:hover [style*="marquee-"] { animation-play-state: paused; }
      `}</style>

      <div className="mx-auto max-w-[77.5rem] px-6">
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 text-xs tracking-[0.14em] uppercase text-primary font-semibold">
            <span className="h-px w-8 bg-primary" />
            — Ils en parlent
            <span className="h-px w-8 bg-primary" />
          </div>
          <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05] text-ink max-w-3xl mx-auto">
            Ce que disent ceux qui nous ont <span className="italic-accent">confié</span> un projet. <span className="text-primary">✦</span>
          </h2>
          <p className="mt-4 text-sm text-text-light max-w-md mx-auto">
            Témoignages placeholders — remplacés par les vrais dès qu’ils arrivent.
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: EASE }}
        className="flex flex-col gap-5"
      >
        <Row items={row1} direction="left" duration={60} />
        <Row items={row2} direction="right" duration={70} />
      </motion.div>
    </section>
  )
}
