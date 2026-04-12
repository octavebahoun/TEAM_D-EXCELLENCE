import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import "./Pricing.css";

const tiers = [
  {
    name: "Starter",
    target: "Entrepreneurs, auto-entrepreneurs, petits commerces",
    description:
      "Vous lancez votre activité et avez besoin d'une présence digitale professionnelle qui inspire confiance dès le premier clic.",
    features: [
      "Site vitrine 1 à 5 pages",
      "Landing page conversion",
      "Identité visuelle de base",
      "Configuration hébergement",
    ],
    cta: "Démarrer →",
    accent: false,
  },
  {
    name: "Growth",
    target: "PME, startups, associations, institutions",
    description:
      "Votre activité tourne. Vous avez besoin d'outils qui structurent, automatisent et vous donnent un avantage sur vos concurrents.",
    features: [
      "Plateformes web & métiers",
      "SaaS & outils sur-mesure",
      "Audits de sécurité & cyber",
      "Stratégies digitales & contenu",
    ],
    cta: "Discuter du projet →",
    accent: true,
  },
  {
    name: "Enterprise",
    target: "Grandes entreprises, groupes, institutions",
    description:
      "Vous pilotez une organisation d'envergure. On devient votre partenaire tech de confiance sur le long terme.",
    features: [
      "Systèmes d'information complexes",
      "Infrastructure cloud enterprise",
      "Transformation digitale",
      "SLA garanti & équipe dédiée",
    ],
    cta: "Nous contacter →",
    accent: false,
  },
];

function Pricing() {
  return (
    <section className="pricing-section">
      <div className="pricing-container">
        <motion.span
          className="section-label-light"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          POUR QUI ON TRAVAILLE
        </motion.span>

        <motion.h2
          className="pricing-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          Un partenaire pour chaque étape
          <br />
          de votre croissance.
        </motion.h2>

        <div className="pricing-grid">
          {tiers.map((tier, i) => (
            <motion.div
              key={i}
              className={`pricing-card ${tier.accent ? "accent" : ""}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <h3 className="tier-name">{tier.name}</h3>
              <p className="tier-target">{tier.target}</p>
              <p className="tier-desc">{tier.description}</p>

              <div className="tier-features">
                {tier.features.map((feature, j) => (
                  <div key={j} className="feature-item">
                    <span className="check">✓</span>
                    <span className="feature-text">{feature}</span>
                  </div>
                ))}
              </div>

              <Link to="/contact">
                <button className="tier-cta btn-roulette" data-text={tier.cta}>
                  <span className="btn-text">{tier.cta}</span>
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pricing;
