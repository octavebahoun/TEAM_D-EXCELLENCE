import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import teamData from "../data/team.json";
import "./Team.css";

function Team() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);

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
        </div>

        <div className="team-carousel-outer">
          <button
            className="team-nav-btn prev"
            onClick={prev}
            disabled={currentIndex === 0}
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
                <div
                  key={member.id}
                  className="team-card"
                  style={{ minWidth: `${100 / itemsToShow}%` }}
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
                    <a
                      href={member.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="member-portfolio-link"
                    >
                      Portfolio ↗
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            className="team-nav-btn next"
            onClick={next}
            disabled={currentIndex >= teamData.length - itemsToShow}
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Team;
