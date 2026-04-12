import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import "./LegalPage.css";

function TermsPage() {
  return (
    <>
      <SEO
        title="Conditions Générales d'Utilisation"
        description="Consultez les conditions générales d'utilisation du site officiel d'Excellence Team."
      />
      <Navbar />

      <main className="legal-main">
        <div className="legal-container">
          <header className="legal-header">
            <motion.span
              className="legal-label"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Juridique
            </motion.span>
            <motion.h1
              className="legal-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Conditions Générales <br /> d'Utilisation
            </motion.h1>
            <p className="legal-update">Dernière mise à jour : 12 Avril 2026</p>
          </header>

          <section className="legal-content">
            <h2>1. Présentation du site</h2>
            <p>
              Le site excellence-team.com est la plateforme officielle
              d'Excellence Team, une entreprise spécialisée dans les services
              numériques (Ingénierie, Cybersécurité, Infrastructure).
            </p>

            <h2>2. Propriété intellectuelle</h2>
            <p>
              L’ensemble du contenu présent sur ce site, incluant les textes,
              images, logos et codes, est la propriété exclusive d'Excellence
              Team, sauf mention contraire. Toute reproduction ou distribution
              sans autorisation préalable est strictement interdite.
            </p>

            <h2>3. Services proposés</h2>
            <p>
              Excellence Team propose des services de développement de
              logiciels, d'audit de sécurité, de branding et de maintenance
              d'infrastructure. Les détails des prestations sont définis dans
              les contrats spécifiques conclus avec nos clients.
            </p>

            <h2>4. Responsabilité</h2>
            <p>
              Bien que nous nous efforcions de fournir des informations
              précises, Excellence Team ne saurait être tenue responsable des
              erreurs ou omissions, ni des dommages directs ou indirects
              résultant de l'utilisation du site.
            </p>

            <h2>5. Droit applicable</h2>
            <p>
              Les présentes conditions sont régies par les lois en vigueur en
              République du Bénin. Tout litige relatif à l'utilisation du site
              sera soumis à la compétence exclusive des tribunaux de Cotonou.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default TermsPage;
