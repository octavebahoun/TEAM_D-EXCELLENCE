import { motion } from "framer-motion";
import Footer from "../components/layout/Footer";
import SEO from "../components/layout/SEO";
import privacyData from "../data/privacy.json";

function PrivacyPage() {
  return (
    <>
      <SEO
        title={privacyData.seo.title}
        description={privacyData.seo.description}
      />
      <div className="vignette-blur-bottom" />
      <div className="noise-overlay" />

      <main className="relative bg-bg-ink min-h-screen z-10 pt-28 overflow-hidden">
        {/* Grids and lights */}
        <div className="blueprint-grid opacity-30" />
        <div className="glow-spot top-1/4 right-1/4 opacity-25" />

        <div className="max-w-4xl mx-auto px-4 md:px-8 py-16">
          <header className="mb-12 border-b border-white/5 pb-8">
            <motion.span
              className="block text-[0.8rem] font-bold text-accent-mint tracking-widest uppercase mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {privacyData.tag}
            </motion.span>
            <motion.h1
              className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-text-bright leading-none tracking-tight mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {privacyData.titleLine1} <br />
              <span className="font-editorial italic font-light text-accent-mint">{privacyData.titleLine2}</span>
            </motion.h1>
            <p className="text-xs font-semibold text-text-muted">{privacyData.lastUpdated}</p>
          </header>

          <section className="prose prose-invert max-w-none flex flex-col gap-8 text-text-muted text-base sm:text-lg leading-relaxed font-medium">
            {privacyData.sections.map((section, idx) => (
              <div key={idx}>
                <h2 className="font-display font-bold text-xl sm:text-2xl text-text-bright mb-3">{section.title}</h2>
                <p>{section.content}</p>
              </div>
            ))}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default PrivacyPage;
