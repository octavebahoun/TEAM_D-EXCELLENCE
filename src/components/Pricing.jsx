import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Pricing.css";

const tiers = [
  {
    name: "Starter",
    price: 999,
    description:
      "Perfect for small teams exploring creative and general support.",
    features: [
      "Manage up to 3 brand assets",
      "Access to basic design templates",
      "Standard project comments",
      "Community discussions",
    ],
    cta: "Let's Collab!",
    accent: false,
  },
  {
    name: "Studio",
    price: 1999,
    description:
      "Designed for growing brands that need consistent creative output.",
    features: [
      "Unlimited brand assets",
      "Collaboration with up to 5 team members",
      "Reusable component library",
      "Priority design reviews",
    ],
    cta: "Let's Collab!",
    accent: true,
  },
  {
    name: "Agency",
    price: 2999,
    description: "End-to-end creative partnership for scaling businesses.",
    features: [
      "Unlimited team members",
      "White-label client dashboards",
      "Advanced workflow automation",
      "Dedicated account specialist",
    ],
    cta: "Let's Collab!",
    accent: false,
  },
];

function Pricing() {
  const [billing, setBilling] = useState("monthly");

  return (
    <section className="pricing-section">
      <div className="pricing-container">
        <motion.span
          className="section-label-light"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          PRICING
        </motion.span>

        <motion.h2
          className="pricing-header"
          initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1 }}
        >
          Affordable Plans
          <br />
          For Everyone.
        </motion.h2>

        <div className="pricing-toggle">
          <span
            className={billing === "monthly" ? "active" : ""}
            onClick={() => setBilling("monthly")}
          >
            Monthly
          </span>
          <div
            className={`pricing-switch ${billing}`}
            onClick={() =>
              setBilling((b) => (b === "monthly" ? "yearly" : "monthly"))
            }
          >
            <motion.div className="switch-thumb" layout />
          </div>
          <span
            className={billing === "yearly" ? "active" : ""}
            onClick={() => setBilling("yearly")}
          >
            Yearly
          </span>
        </div>

        <div className="pricing-grid">
          {tiers.map((tier, i) => (
            <motion.div
              key={i}
              className={`pricing-card ${tier.accent ? "accent" : ""}`}
              initial={{ opacity: 0, scale: 0.9, y: 40, filter: "blur(15px)" }}
              whileInView={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              whileHover={{ y: -10 }}
            >
              <h3 className="tier-name">{tier.name}</h3>
              <p className="tier-desc">{tier.description}</p>

              <div className="tier-price">
                <span className="currency">$</span>
                <span className="amount">{tier.price}</span>
                <span className="period">/month</span>
              </div>

              <div className="tier-features">
                {tier.features.map((feature, j) => (
                  <div key={j} className="feature-item">
                    <span className="check">✓</span>
                    <span className="feature-text">{feature}</span>
                  </div>
                ))}
              </div>

              <button className="tier-cta btn-roulette" data-text={tier.cta}>
                <span className="btn-text">{tier.cta}</span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pricing;
