import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./FAQ.css";

const faqData = [
  {
    question: "Combien coûte un projet avec Excellence Team ?",
    answer:
      "Nous ne publions pas de tarifs fixes car chaque projet est différent. Ce qui détermine le prix : la complexité technique, le délai souhaité, et le niveau d'accompagnement. Tout commence par un audit gratuit pour comprendre votre besoin avant de chiffrer.",
  },
  {
    question: "Combien de temps prend un projet ?",
    answer:
      "Un site vitrine : 2 à 4 semaines. Une application sur-mesure : 1 à 3 mois. Un audit cybersécurité : 1 à 2 semaines. Nous vous donnons un planning précis dès la validation du devis — et nous le respectons.",
  },
  {
    question: "Travaillez-vous uniquement à Cotonou ?",
    answer:
      "Non. Nous intervenons dans tout le Bénin — Cotonou, Abomey-Calavi, Lokossa, Porto-Novo — et nous travaillons à distance pour les projets digitaux, partout en Afrique et au-delà.",
  },
  {
    question: "Comment se passe le paiement ?",
    answer:
      "40% à la signature du devis, 40% à mi-parcours ou à la validation des livrables intermédiaires, 20% à la livraison finale. Nous acceptons Mobile Money, virement bancaire et espèces.",
  },
  {
    question: "Est-ce que vous assurez la maintenance après livraison ?",
    answer:
      "Oui. Nous proposons des contrats de maintenance mensuelle ou annuelle selon vos besoins — mises à jour, corrections, sauvegardes, monitoring. C'est optionnel mais fortement recommandé.",
  },
  {
    question: "Vous avez une expertise sur quelle technologies ?",
    answer:
      "React, Next.js, Node.js, Laravel, Vue.js, React Native, Three.js, Python, MongoDB, MySQL, Docker, AWS, Kali Linux — et bien d'autres. Si votre besoin nécessite une stack spécifique, on s'adaptte.",
  },
  {
    question: "Comment démarrer avec Excellence Team ?",
    answer:
      "Remplissez le formulaire de contact ou envoyez-nous un message WhatsApp. On vous répond sous 24h pour fixer un premier appel de 30 minutes — gratuit, sans engagement — pendant lequel on définit ensemble si on peut vous aider.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="faq-section">
      <div className="faq-container">
        <div className="faq-grid">
          <div className="faq-left">
            <span className="section-label">FAQ</span>
            <h2 className="faq-title">Questions ?</h2>
            <p className="faq-desc">
              Tout ce que vous devez savoir sur notre collaboration. Si vous
              avez d'autres questions, discutons-en.
            </p>
          </div>

          <div className="faq-list">
            {faqData.map((item, index) => (
              <div
                key={index}
                className={`faq-item ${openIndex === index ? "active" : ""}`}
              >
                <button
                  className="faq-trigger"
                  onClick={() => setOpenIndex(index)}
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-panel-${index}`}
                >
                  <div className="faq-question">
                    <h3>{item.question}</h3>
                    <span className="faq-icon" aria-hidden="true">
                      {openIndex === index ? "−" : "+"}
                    </span>
                  </div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      id={`faq-panel-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="faq-answer">
                        <p>{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
