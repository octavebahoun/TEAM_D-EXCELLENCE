import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import SEO from "../components/SEO";

import "../components/Works.css"; // We will duplicate Works.css into WorksPage.css
import "./WorksPage.css";
import worksData from "../data/works.json";

function WorksPage() {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    // Simulating API fetch
    setWorks(worksData);
  }, []);

  return (
    <>
      <SEO
        title="Nos Réalisations"
        description="Explorez le portfolio d'Excellence Team : plateformes E-commerce, solutions SaaS, audits de cybersécurité et infrastructures IT au Bénin."
      />
      <div className="vignette-blur-bottom" />

      <main
        className="workspage-main"
        style={{ backgroundColor: "#f4f3ed", minHeight: "100vh" }}
      >
        <section
          className="workspage-section"
          style={{
            paddingTop: "clamp(100px, 15vw, 180px)",
            paddingBottom: "clamp(60px, 10vw, 120px)",
          }}
        >
          <div className="workspage-container">
            <div className="workspage-header">
              <motion.h2
                className="workspage-main-title"
                initial={{ opacity: 0, y: 40, filter: "blur(15px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1 }}
              >
                Nos Brillantes <br />
                Réalisations
              </motion.h2>
              <motion.p
                className="workspage-subtitle"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Une sélection de nos projets récents, alliant <br />
                design réfléchi, stratégie claire et résultats d'impact.
              </motion.p>
            </div>

            <div className="workspage-list">
              {works.map((work) => (
                <div key={work.id} className={`workspage-item ${work.side}`}>
                  <motion.div
                    className="workspage-info"
                    initial={{
                      opacity: 0,
                      x: work.side === "left" ? -50 : 50,
                      filter: "blur(15px)",
                    }}
                    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className="workspage-info-content">
                      <span className="workspage-category">
                        {work.topLabel}
                      </span>
                      <h3 className="workspage-title">{work.title}</h3>
                    </div>

                    <div className="workspage-desc-wrap">
                      <p className="workspage-desc">{work.description}</p>
                      <a
                        href={work.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="workspage-external-link"
                      >
                        <button
                          className="workspage-btn btn-roulette"
                          data-text="Visiter le site ↗"
                        >
                          <span className="btn-text">Visiter le site ↗</span>
                        </button>
                      </a>
                    </div>
                  </motion.div>

                  <motion.div
                    className="workspage-visuals"
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(20px)" }}
                    whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 1 }}
                  >
                    <div className="workspage-main-image">
                      <img src={work.mainImage} alt={work.title} />
                    </div>
                    <div className="workspage-thumbnails">
                      <div className="workspage-thumb-img">
                        <img src={work.thumb1} alt={`${work.title} detail 1`} />
                      </div>
                      <div className="workspage-thumb-img">
                        <img src={work.thumb2} alt={`${work.title} detail 2`} />
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Adding FAQ section requested here */}
        <FAQ />
      </main>
      <Footer />
    </>
  );
}

export default WorksPage;
