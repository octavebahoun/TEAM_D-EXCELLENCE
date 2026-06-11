import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useAccessibleMotion } from "../../lib/animations";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const initialWorks = [
  {
    category: "INGÉNIERIE DIGITALE",
    title: "Academix",
    num: "01",
    description:
      "Plateforme SaaS de gestion académique complète — bulletins automatisés, messagerie parents-école, tableau de bord en temps réel.",
    image:
      "https://res.cloudinary.com/dla8wr5qj/image/upload/v1775955345/academix_fn4oat.png",
    side: "left",
    url: "https://team-d-excellence-hackbyifri-2026.vercel.app/",
  },
  {
    category: "CYBERSÉCURITÉ",
    title: "Pentest PME",
    num: "02",
    description:
      "Mission complète de pentest sur l'infrastructure réseau d'une PME béninoise — 14 vulnérabilités identifiées, rapport de remédiation livré.",
    image:
      "https://res.cloudinary.com/dla8wr5qj/image/upload/v1775956588/pentest_rytrll.webp",
    side: "right",
    url: "#",
  },
];

const listProjects = [
  {
    id: "twin",
    title: "Le TWIN",
    num: "03",
    date: "Août 2024",
    category: "INGÉNIERIE DIGITALE",
    description:
      "Le TWIN est une marque de mode urbaine haut de gamme originaire du Bénin, axée sur une esthétique streetwear minimaliste et sombre, conçue pour la génération Z. Voici l'application officielle, offrant une expérience d'achat fluide et haut de gamme.",
    image:
      "https://res.cloudinary.com/dla8wr5qj/image/upload/v1773366626/WhatsApp_Image_2026-02-07_at_13.55.04_jb8uve.jpg",
    url: "https://le-twin.vercel.app/",
  },
  {
    id: "fieri",
    title: "Fieri Research",
    num: "04",
    date: "Mars 2026",
    category: "INGÉNIERIE DIGITALE",
    description:
      "FIERI Research est une plateforme web dédiée à la recherche scientifique, à l'innovation, aux clubs étudiants et chercheurs, aux événements et à l'espace membre. Voici le site officiel, offrant une expérience utilisateur fluide et moderne.",
    image:
      "https://res.cloudinary.com/dla8wr5qj/image/upload/v1775955620/fieri_pjxyof.webp",
    url: "https://fieri-research.org",
  },
  {
    id: "nuitdecoeur",
    title: "La Nuit de Cœur",
    num: "05",
    date: "Nov 2023",
    category: "BRANDING",
    description:
      "La Nuit du Cœur est un évènement culturel et artistique majeur organisé à Lokossa. Notre mission est simple mais puissante : célébrer l'amour sous toutes ses formes, valoriser les talents locaux et encourager la créativité. Voici le site officiel, offrant une expérience utilisateur fluide et moderne.",
    image:
      "https://res.cloudinary.com/dla8wr5qj/image/upload/v1775955767/nuit_de_coeur_jx18zr.avif",
    url: "https://nightheart.rf.gd",
  },
];

function Works() {
  const reduce = useAccessibleMotion();
  const [expandedId, setExpandedId] = useState(null);

  const toggleProject = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="relative py-28 md:py-36 bg-bg-ink overflow-hidden z-10">
      {/* Decorative grids */}
      <div className="blueprint-grid opacity-30" />
      <div className="glow-spot bottom-1/3 left-10 opacity-20" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            className="block text-[0.8rem] font-bold text-accent-gold tracking-widest uppercase mb-4"
            {...(reduce ? { initial: { opacity: 1 }, whileInView: { opacity: 1 } } : { initial: { opacity: 0 }, whileInView: { opacity: 1 } })}
          >
            SELECTED WORKS
          </motion.span>
          <motion.h2
            className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-text-bright leading-none tracking-tight"
            {...(reduce ? { initial: { opacity: 1, y: 0 }, whileInView: { opacity: 1, y: 0 } } : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.6 } })}
          >
            Nos Brillantes <span className="font-editorial italic font-light text-accent-mint">Réalisations</span>
          </motion.h2>
        </div>

        {/* Feature Projects List */}
        <div className="flex flex-col gap-24 md:gap-32 mb-28">
          {initialWorks.map((work, index) => (
            <div
              key={index}
              className={`flex flex-col lg:flex-row gap-12 items-center justify-between ${work.side === "right" ? "lg:flex-row-reverse" : ""
                }`}
            >
              {/* Info Block */}
              <motion.div
                className="w-full lg:w-1/2 p-8 sm:p-10 border border-white/5 rounded-3xl bg-surface-card/40 hover:border-accent-mint/20 shadow-soft relative"
                {...(reduce
                  ? { initial: { opacity: 1, x: 0 }, whileInView: { opacity: 1, x: 0 } }
                  : {
                    initial: { opacity: 0, x: work.side === "left" ? -30 : 30 },
                    whileInView: { opacity: 1, x: 0 },
                    viewport: { once: true },
                    transition: { duration: 0.6 }
                  })}
              >
                {/* Large serial number overlay */}
                <span className="absolute top-6 right-8 font-display font-black text-6xl text-white/5 pointer-events-none">
                  {work.num}
                </span>

                <span className="block text-xs font-bold text-accent-gold tracking-widest uppercase mb-4">
                  {work.category}
                </span>
                <h3 className="font-display font-black text-3xl sm:text-4xl text-text-bright mb-6">
                  {work.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed mb-8 max-w-xl">
                  {work.description}
                </p>
                <a
                  href={work.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <button className="px-6 py-3 bg-accent-mint text-bg-ink font-bold text-[0.85rem] tracking-widest uppercase rounded-full cursor-pointer hover:bg-emerald-400 transition-all duration-300 shadow-glow-mint">
                    Découvrir le projet ↗
                  </button>
                </a>
              </motion.div>

              {/* Asymmetric image block with border tilt */}
              <motion.div
                className="w-full lg:w-1/2 aspect-[16/10] rounded-asym-2 overflow-hidden border border-white/10 hover:border-accent-mint/30 shadow-soft transition-colors duration-500"
                {...(reduce ? { initial: { opacity: 1, scale: 1 }, whileInView: { opacity: 1, scale: 1 } } : { initial: { opacity: 0, scale: 0.95 }, whileInView: { opacity: 1, scale: 1 }, viewport: { once: true }, transition: { duration: 0.7 } })}
              >
                <img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-full object-cover block filter brightness-90 hover:brightness-100 transition-all duration-750"
                />
              </motion.div>
            </div>
          ))}
        </div>

        {/* Dynamic Accordion list for standard projects */}
        <div className="border-t border-white/10 mb-20">
          <LayoutGroup>
            {listProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                className="border-b border-white/10 cursor-pointer overflow-hidden transition-colors"
                onClick={() => toggleProject(project.id)}
                role="button"
                tabIndex={0}
                aria-expanded={expandedId === project.id}
                aria-label={`Afficher le projet ${project.title}`}
              >
                {expandedId !== project.id ? (
                  // Closed State: Elegant minimalist row
                  <motion.div
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-8 px-4 hover:bg-white/2 transition-colors w-full gap-4"
                    {...(reduce ? { initial: { opacity: 1 }, animate: { opacity: 1 }, exit: { opacity: 1 } } : { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } })}
                    layout
                  >
                    <div className="flex items-center gap-6">
                      <span className="font-display font-black text-xl text-accent-gold">
                        {project.num}
                      </span>
                      <h4 className="font-display font-extrabold text-2xl text-text-bright tracking-tight">
                        {project.title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-12 text-sm text-text-muted font-bold tracking-widest uppercase">
                      <span>{project.date}</span>
                      <span className="px-3 py-1 bg-surface-card border border-white/5 rounded-full text-xs text-text-bright/80">
                        {project.category}
                      </span>
                      <ArrowUpRight className="w-5 h-5 text-accent-mint" />
                    </div>
                  </motion.div>
                ) : (
                  // Open State: Dynamic details card
                  <motion.div
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-12 px-6 bg-surface-dark border-x border-white/5"
                    {...(reduce ? { initial: { opacity: 1 }, animate: { opacity: 1 } } : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } })}
                    layout
                  >
                    <div className="lg:col-span-5 aspect-[16/10] rounded-2xl overflow-hidden border border-white/10">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover block" />
                    </div>
                    <div className="lg:col-span-7 flex flex-col items-start p-4">
                      <span className="text-xs font-bold text-accent-mint tracking-widest uppercase mb-3">
                        {project.date} • {project.category}
                      </span>
                      <h3 className="font-display font-black text-3xl sm:text-4xl text-text-bright mb-4">
                        {project.title}
                      </h3>
                      <p className="text-text-muted text-sm sm:text-base leading-relaxed mb-6 max-w-xl">
                        {project.description}
                      </p>
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button className="px-6 py-3 bg-accent-gold text-bg-ink font-bold text-xs tracking-widest uppercase rounded-full cursor-pointer hover:bg-amber-400 transition-colors shadow-glow-gold">
                          Voir le site ↗
                        </button>
                      </a>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </LayoutGroup>
        </div>

        {/* View all button */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <Link to="/works">
            <button className="px-10 py-5 bg-accent-gold hover:bg-amber-400 text-bg-ink text-sm font-bold tracking-widest uppercase rounded-full cursor-pointer transition-all duration-300 shadow-glow-gold">
              Voir tout le portfolio
            </button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}

export default Works;
