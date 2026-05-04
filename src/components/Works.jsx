import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useAccessibleMotion } from "../lib/animations";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import "./Works.css";

const initialWorks = [
  {
    category: "INGÉNIERIE DIGITAL",
    title: "Academix",
    description:
      "Plateforme SaaS de gestion académique complète — bulletins automatisés, messagerie parents-école, tableau de bord en temps réel.",
    image:
      "https://res.cloudinary.com/dla8wr5qj/image/upload/v1775955345/academix_fn4oat.png",
    side: "left",
    url: "https://team-d-excellence-hackbyifri-2026.vercel.app/",
  },
  {
    category: "CYBERSECURITE",
    title: "Pentest PME",
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
    date: "Aug 2024",
    category: "INGÉNIERIE DIGITAL",
    description:
      "Le TWIN est une marque de mode urbaine haut de gamme originaire du Bénin, axée sur une esthétique streetwear minimaliste et sombre, conçue pour la génération Z. Voici l'application officielle, offrant une expérience d'achat fluide et haut de gamme.",
    image:
      "https://res.cloudinary.com/dla8wr5qj/image/upload/v1773366626/WhatsApp_Image_2026-02-07_at_13.55.04_jb8uve.jpg",
    url: "https://le-twin.vercel.app/",
  },
  {
    id: "fieri",
    title: "Fieri Research",
    date: "Mars 2026",
    category: "INGÉNIERIE DIGITAL",
    description:
      "FIERI Research est une plateforme web dédiée à la recherche scientifique, à l'innovation, aux clubs étudiants et chercheurs, aux événements et à l'espace membre. Voici le site officiel, offrant une expérience utilisateur fluide et moderne.",
    image:
      "https://res.cloudinary.com/dla8wr5qj/image/upload/v1775955620/fieri_pjxyof.webp",
    url: "https://fieri-research.org",
  },
  {
    id: "nuitdecoeur",
    title: "La Nuit de Coeur",
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
    <section className="works-section">
      <div className="works-container">
        <motion.span className="section-label-light" {...(reduce ? { initial: { opacity: 1 }, whileInView: { opacity: 1 } } : { initial: { opacity: 0 }, whileInView: { opacity: 1 } })}>
          SELECTED WORKS
        </motion.span>

        <motion.h2 className="works-main-title" {...(reduce ? { initial: { opacity: 1, y: 0 }, whileInView: { opacity: 1, y: 0 } } : { initial: { opacity: 0, y: 40, filter: "blur(15px)" }, whileInView: { opacity: 1, y: 0, filter: "blur(0px)" }, transition: { duration: 1 } })}>
          Nos Brillantes Réalisations
        </motion.h2>
        <div className="works-list">
          {initialWorks.map((work, index) => (
            <div key={index} className={`work-item ${work.side}`}>
              <motion.div
                className="work-info"
                {...(reduce
                  ? { initial: { opacity: 1, x: 0 }, whileInView: { opacity: 1, x: 0 } }
                  : { initial: { opacity: 0, x: work.side === "left" ? -50 : 50, filter: "blur(15px)" }, whileInView: { opacity: 1, x: 0, filter: "blur(0px)" }, viewport: { once: true }, transition: { duration: 0.8 } })}
              >
                <span className="work-category">{work.category}</span>
                <h3 className="work-title">{work.title}</h3>
                <p className="work-desc">{work.description}</p>
                <a
                  href={work.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="work-external-link"
                >
                  <button
                    className="work-btn btn-roulette"
                    data-text="Découvrir le projet ↗"
                  >
                    <span className="btn-text">Découvrir le projet ↗</span>
                  </button>
                </a>
              </motion.div>

              <motion.div className="work-image" {...(reduce ? { initial: { opacity: 1, scale: 1 }, whileInView: { opacity: 1, scale: 1 } } : { initial: { opacity: 0, scale: 0.9, filter: "blur(20px)" }, whileInView: { opacity: 1, scale: 1, filter: "blur(0px)" }, viewport: { once: true }, transition: { duration: 1 } })}>
                <img src={work.image} alt={work.title} />
              </motion.div>
            </div>
          ))}
        </div>

        <div className="small-works-list">
          <LayoutGroup>
            {listProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                className={`small-work-wrapper ${expandedId === project.id ? "expanded" : ""}`}
                onClick={() => toggleProject(project.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    toggleProject(project.id);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-expanded={expandedId === project.id}
                aria-label={`Afficher le projet ${project.title}`}
              >
                {expandedId !== project.id ? (
                  // Closed State: Row
                  <motion.div
                    className="small-work-row"
                    {...(reduce ? { initial: { opacity: 1 }, animate: { opacity: 1 }, exit: { opacity: 1 } } : { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } })}
                    layout
                  >
                    <h4 className="row-title">{project.title}</h4>
                    <div className="row-meta">
                      <span>{project.date}</span>
                      <span>{project.category}</span>
                    </div>
                  </motion.div>
                ) : (
                  // Open State: Card (based on your screenshot)
                  <motion.div className="expanded-project-card" {...(reduce ? { initial: { opacity: 1 }, animate: { opacity: 1 } } : { initial: { opacity: 0, filter: "blur(20px)" }, animate: { opacity: 1, filter: "blur(0px)" }, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } })} layout>
                    <div className="expanded-image">
                      <img src={project.image} alt={project.title} />
                    </div>
                    <div className="expanded-content">
                      <span className="expanded-label">
                        {project.date} • {project.category}
                      </span>
                      <h3 className="expanded-title">{project.title}</h3>
                      <p className="expanded-desc">{project.description}</p>
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="work-external-link"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          className="expanded-btn btn-roulette"
                          data-text="Voir le site ↗"
                        >
                          <span className="btn-text">Voir le site ↗</span>
                        </button>
                      </a>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </LayoutGroup>
        </div>

        <motion.div
          className="discover-more-wrap"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <Link to="/works">
            <button
              className="discover-btn btn-roulette"
              data-text="Voir tout le portfolio"
            >
              <span className="btn-text">Voir tout le portfolio</span>
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default Works;
