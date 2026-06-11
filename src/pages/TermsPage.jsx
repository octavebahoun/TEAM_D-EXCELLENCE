import { motion } from "framer-motion";
import Footer from "../components/layout/Footer";
import SEO from "../components/layout/SEO";

function TermsPage() {
  return (
    <>
      <SEO
        title="Conditions Générales d'Utilisation"
        description="Consultez les conditions générales d'utilisation du site officiel d'Excellence Team."
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
              className="block text-[0.8rem] font-bold text-accent-gold tracking-widest uppercase mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              JURIDIQUE
            </motion.span>
            <motion.h1
              className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-text-bright leading-none tracking-tight mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Conditions Générales <br />
              <span className="font-editorial italic font-light text-accent-mint">d'Utilisation</span>
            </motion.h1>
            <p className="text-xs font-semibold text-text-muted">Dernière mise à jour : 12 Avril 2026</p>
          </header>

          <section className="prose prose-invert max-w-none flex flex-col gap-8 text-text-muted text-base sm:text-lg leading-relaxed font-medium">
            <div>
              <h2 className="font-display font-bold text-xl sm:text-2xl text-text-bright mb-3">1. Présentation du site</h2>
              <p>
                Le site excellence-team.com est la plateforme officielle d'Excellence Team, une entreprise spécialisée dans les services numériques (Ingénierie, Cybersécurité, Infrastructure).
              </p>
            </div>

            <div>
              <h2 className="font-display font-bold text-xl sm:text-2xl text-text-bright mb-3">2. Propriété intellectuelle</h2>
              <p>
                L’ensemble du contenu présent sur ce site, incluant les textes, images, logos et codes, est la propriété exclusive d'Excellence Team, sauf mention contraire. Toute reproduction ou distribution sans autorisation préalable est strictement interdite.
              </p>
            </div>

            <div>
              <h2 className="font-display font-bold text-xl sm:text-2xl text-text-bright mb-3">3. Services proposés</h2>
              <p>
                Excellence Team propose des services de développement de logiciels, d'audit de sécurité, de branding et de maintenance d'infrastructure. Les détails des prestations sont définis dans les contrats spécifiques conclus avec nos clients.
              </p>
            </div>

            <div>
              <h2 className="font-display font-bold text-xl sm:text-2xl text-text-bright mb-3">4. Responsabilité</h2>
              <p>
                Bien que nous nous efforcions de fournir des informations précises, Excellence Team ne saurait être tenue responsable des erreurs ou omissions, ni des dommages directs ou indirects résultant de l'utilisation du site.
              </p>
            </div>

            <div>
              <h2 className="font-display font-bold text-xl sm:text-2xl text-text-bright mb-3">5. Droit applicable</h2>
              <p>
                Les présentes conditions sont régies par les lois en vigueur en République du Bénin. Tout litige relatif à l'utilisation du site sera soumis à la compétence exclusive des tribunaux de Cotonou.
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default TermsPage;
