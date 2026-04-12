import { useState } from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import "./ContactPage.css";

function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", project: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <>
      <SEO title="Contactez-nous | Excellence Team" description="Discutons de vos projets digitaux et cybersécurité." />
      <main className="contact-main" style={{ backgroundColor: "#f4f3ed", minHeight: "100vh" }}>
        <section className="contact-section">
          <div className="contact-container">
            <div className="contact-left">
              <motion.h1 className="contact-title" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                Parlons de votre <br /> prochain projet.
              </motion.h1>
              <p className="contact-subtitle">
                Une idée, un besoin technique ou une question ? Notre équipe vous répond sous 24h.
              </p>
            </div>

            <motion.div className="contact-right" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <form className="contact-form" onSubmit={(e) => { e.preventDefault(); console.log(formData); }}>
                <div className="form-group">
                  <label htmlFor="name">Nom complet</label>
                  <input type="text" id="name" value={formData.name} onChange={handleChange} placeholder="Jean Dupont" required />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Adresse Email</label>
                  <input type="email" id="email" value={formData.email} onChange={handleChange} placeholder="jean@entreprise.com" required />
                </div>

                <div className="form-group">
                  <label htmlFor="project">Votre message</label>
                  <textarea id="project" rows="5" value={formData.project} onChange={handleChange} placeholder="Détaillez votre besoin ici..." required />
                </div>

                <button type="submit" className="submit-btn">Envoyer le message</button>
              </form>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default ContactPage;