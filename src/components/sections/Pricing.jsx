import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import pricingData from "../../data/pricing.json";

function Pricing() {
  return (
    <section className="relative py-28 md:py-36 bg-bg-ink overflow-hidden z-10">
      {/* Blueprint grid line backdrop */}
      <div className="blueprint-grid opacity-30" />
      <div className="glow-spot top-1/2 left-1/4 opacity-25" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            className="block text-[0.8rem] font-bold text-accent-mint tracking-widest uppercase mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            {pricingData.sectionTitle}
          </motion.span>
          <motion.h2
            className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-text-bright leading-none tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            Un partenaire pour chaque étape<br />
            de votre <span className="font-editorial italic font-light text-accent-mint">croissance</span>
          </motion.h2>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {pricingData.tiers.map((tier, i) => (
            <motion.div
              key={i}
              className={`glass-panel p-8 sm:p-10 flex flex-col justify-between items-start border bg-surface-card/40 hover:border-accent-mint/30 shadow-soft transition-all duration-500 relative ${tier.accent ? "z-20 scale-100 md:scale-105" : "z-10 border-white/5"
                } ${tier.cardShape}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              {/* Highlight ribbon for growth plan */}
              {tier.accent && (
                <span className="absolute -top-3.5 left-8 px-4 py-1.5 bg-accent-mint text-bg-ink text-[0.72rem] font-black tracking-widest uppercase rounded-full shadow-glow-mint">
                  POPULAIRE
                </span>
              )}

              <div className="w-full">
                <h3 className="font-display font-black text-3xl text-text-bright mb-2 group-hover:text-accent-mint">
                  {tier.name}
                </h3>

                {/* Editorial text style for targeting */}
                <p className="font-editorial italic text-accent-mint text-base mb-6 leading-tight">
                  {tier.target}
                </p>

                <p className="text-text-muted text-sm leading-relaxed mb-8 border-b border-white/5 pb-8 min-h-[72px]">
                  {tier.description}
                </p>

                {/* Features List with customized checkmark badges */}
                <div className="flex flex-col gap-4 mb-8">
                  {tier.features.map((feature, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${tier.accent ? "bg-accent-mint text-bg-ink" : "bg-white/5 text-accent-mint"
                        }`}>
                        ✓
                      </span>
                      <span className="text-xs sm:text-sm font-semibold tracking-wide text-text-bright/90">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sweeping CTA Button */}
              <Link to="/contact" className="w-full mt-auto">
                <button className={`w-full py-4 text-xs font-bold tracking-widest uppercase rounded-full cursor-pointer transition-all duration-300 ${tier.accent
                    ? "bg-accent-mint text-bg-ink shadow-glow-mint hover:bg-emerald-400"
                    : "border border-white/10 hover:border-accent-mint text-text-bright hover:bg-accent-mint/5"
                  }`}>
                  {tier.cta}
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
