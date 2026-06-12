import { useState } from "react";
import { motion } from "framer-motion";
import Footer from "../components/layout/Footer";
import SEO from "../components/layout/SEO";
import contactData from "../data/contact.json";

function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", project: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <>
      <SEO title={contactData.seo.title} description={contactData.seo.description} />
      <div className="vignette-blur-bottom" />
      <div className="noise-overlay" />

      <main className="relative bg-bg-ink min-h-screen z-10 pt-28 overflow-hidden">
        {/* Grids and lights */}
        <div className="blueprint-grid opacity-30" />
        <div className="glow-spot top-1/4 left-1/4 opacity-25" />

        <section className="py-20 md:py-28 px-4 md:px-8 w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Info Column */}
            <div className="lg:col-span-5">
              <span className="block text-[0.8rem] font-bold text-accent-mint tracking-widest uppercase mb-4">
                {contactData.sectionTitle}
              </span>
              <motion.h1 
                className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-text-bright leading-none tracking-tight mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {contactData.titleLine1} <br />
                <span className="font-editorial italic font-light text-accent-mint">{contactData.titleLine2}</span>
              </motion.h1>
              <p className="text-text-muted text-base sm:text-lg font-medium leading-relaxed max-w-md">
                {contactData.description}
              </p>
            </div>

            {/* Right Form Column */}
            <motion.div 
              className="lg:col-span-7 glass-panel p-8 sm:p-10 border border-white/5 rounded-3xl bg-surface-card/40 hover:border-accent-mint/10 shadow-soft"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <form className="flex flex-col gap-6" onSubmit={(e) => { e.preventDefault(); console.log(formData); }}>
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs font-bold text-text-bright uppercase tracking-wider">
                    {contactData.form.nameLabel}
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder={contactData.form.namePlaceholder} 
                    required 
                    className="w-full bg-bg-ink/80 border border-white/10 rounded-xl px-5 py-4 text-text-bright placeholder:text-text-muted/40 focus:border-accent-mint focus:shadow-glow-mint transition-all duration-300 outline-none"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs font-bold text-text-bright uppercase tracking-wider">
                    {contactData.form.emailLabel}
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder={contactData.form.emailPlaceholder} 
                    required 
                    className="w-full bg-bg-ink/80 border border-white/10 rounded-xl px-5 py-4 text-text-bright placeholder:text-text-muted/40 focus:border-accent-mint focus:shadow-glow-mint transition-all duration-300 outline-none"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="project" className="text-xs font-bold text-text-bright uppercase tracking-wider">
                    {contactData.form.messageLabel}
                  </label>
                  <textarea 
                    id="project" 
                    rows="5" 
                    value={formData.project} 
                    onChange={handleChange} 
                    placeholder={contactData.form.messagePlaceholder} 
                    required 
                    className="w-full bg-bg-ink/80 border border-white/10 rounded-xl px-5 py-4 text-text-bright placeholder:text-text-muted/40 focus:border-accent-mint focus:shadow-glow-mint transition-all duration-300 outline-none resize-none"
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full py-4 bg-accent-mint text-bg-ink font-bold tracking-widest text-xs uppercase rounded-full cursor-pointer hover:bg-emerald-400 transition-colors shadow-glow-mint"
                >
                  {contactData.form.submitText}
                </button>
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