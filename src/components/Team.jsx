import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAccessibleMotion, fadeIn } from "../lib/animations";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import teamData from "../data/team.json";
import "./Team.css";

function Team() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);
  const reduce = useAccessibleMotion();

  // Ajuste le nombre de cartes selon l'écran
  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth <= 600) setItemsToShow(1);
      else if (window.innerWidth <= 900) setItemsToShow(2);
      else setItemsToShow(3);
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const next = () =>
    currentIndex < teamData.length - itemsToShow &&
    setCurrentIndex(currentIndex + 1);
  const prev = () => currentIndex > 0 && setCurrentIndex(currentIndex - 1);

  return (
    <section className="team-section">
      <div className="team-container">
        <div className="team-header">
          <span className="team-label">Expertise</span>
          <h2 className="team-main-title">Notre Équipe</h2>
          <p className="team-subtitle">
            Une equipe pluridisciplinaire qui combine vision produit,
            developpement, cloud et securite pour livrer des projets fiables.
          </p>
        </div>

        <div className="team-carousel-outer">
          <button
            className="team-nav-btn prev"
            onClick={prev}
            disabled={currentIndex === 0}
            aria-label="Membres precedents"
          >
            <ChevronLeft />
          </button>

          <div className="team-carousel-wrap">
            <div
              className="team-slider"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
              }}
            >
              {teamData.map((member) => (
                <motion.div
                  key={member.id}
                  className="team-card"
                  style={{ minWidth: `${100 / itemsToShow}%` }}
                  {...(reduce ? { initial: { opacity: 1 }, whileInView: { opacity: 1 } } : fadeIn(0, 0.6))}
                >
                  <div className="member-image-wrap">
                    <div className="member-image-inner">
                      <img src={member.image} alt={member.name} />
                    </div>
                  </div>
                  <div className="member-info">
                    <h3 className="member-name">{member.name}</h3>
                    <span className="member-role">{member.role}</span>
                    <p className="member-quote">{member.quote}</p>
                    {member.portfolio && member.portfolio !== "#" ? (
                      <a
                        href={member.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="member-portfolio-link"
                      >
                        Voir le profil ↗
                      </a>
                    ) : (
                      <span className="member-portfolio-soon">Profil a venir</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <button
            className="team-nav-btn next"
            onClick={next}
            disabled={currentIndex >= teamData.length - itemsToShow}
            aria-label="Membres suivants"
          >
            <ChevronRight />
          </button>
        </div>

        <div className="team-cta-band">
          <p>Un projet sensible ou strategique a lancer ?</p>
          <Link to="/contact" className="team-cta-link">
            Echanger avec l'equipe ↗
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Team;
