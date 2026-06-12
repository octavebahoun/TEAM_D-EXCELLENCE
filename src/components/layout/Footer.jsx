import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Instagram, Linkedin, Twitter, Youtube, ArrowUpRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-surface-dark border-t border-white/5 pt-28 pb-12 overflow-hidden z-10">
      {/* Decorative Aurora Glow */}
      <div className="glow-spot -bottom-20 -right-20 opacity-30" />
      <div className="blueprint-grid opacity-30" />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Massive interactive CTA */}
        <Link to="/contact" className="group block mb-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-white/5 pb-16">
            <div className="max-w-2xl">
              <span className="font-editorial text-accent-mint text-xl italic tracking-widest block mb-4">
                Prêt pour l'exceptionnel ?
              </span>
              <h2 className="font-display font-black text-5xl sm:text-6xl md:text-7xl text-text-bright group-hover:text-accent-mint leading-none transition-colors duration-500 tracking-tighter">
                CRÉONS L'AVENIR <br />
                ENSEMBLE 
              </h2>
            </div>
            
            <div className="flex items-center gap-6 self-end md:self-auto">
              {/* Stacked decorative cards */}
              <div className="relative w-36 h-24 hidden sm:block">
                <div className="absolute inset-0 bg-accent-mint/20 border border-accent-mint/30 rounded-2xl rotate-[12deg] translate-x-4 translate-y-2" />
                <div className="absolute inset-0 bg-accent-mint/10 border border-accent-mint/20 rounded-2xl rotate-6 translate-x-2 translate-y-1" />
                <div className="absolute inset-0 bg-surface-card border border-white/10 rounded-2xl overflow-hidden -rotate-6">
                  <img
                    src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop"
                    alt="Creative digital team work"
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>
              </div>

              {/* Glowing Arrow Button */}
              <div className="w-16 h-16 rounded-full bg-accent-mint text-bg-ink flex items-center justify-center group-hover:bg-accent-mint group-hover:scale-110 shadow-glow-mint group-hover:shadow-glow-mint transition-all duration-500">
                <ArrowUpRight className="w-8 h-8 stroke-[2.5]" />
              </div>
            </div>
          </div>
        </Link>

        {/* Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-16 border-b border-white/5">
          <div>
            <span className="block text-[0.8rem] font-bold text-accent-mint tracking-widest uppercase mb-4">
              NOUS RENDRE VISITE
            </span>
            <p className="text-text-muted font-medium text-base">
              Lokossa , Bénin
              <br />
              Agnivedji
            </p>
          </div>

          <div>
            <span className="block text-[0.8rem] font-bold text-accent-mint tracking-widest uppercase mb-4">
              NOUS CONTACTER
            </span>
            <p className="text-text-muted font-medium text-base">
              <a href="mailto:excellenceteam@gmail.com" className="hover:text-text-bright transition-colors">
                excellenceteam@gmail.com
              </a>
              <br />
              <a href="tel:+2290147797082" className="hover:text-text-bright transition-colors">
                +229 01 47 79 70 82
              </a>
            </p>
          </div>

          <div>
            <span className="block text-[0.8rem] font-bold text-accent-mint tracking-widest uppercase mb-4">
              REJOINDRE LE FLUX
            </span>
            <div className="flex gap-3 mt-4">
              {[
                { icon: <Instagram size={18} />, label: "Instagram" },
                { icon: <Youtube size={18} />, label: "Youtube" },
                { icon: <Linkedin size={18} />, label: "Linkedin" },
                { icon: <Twitter size={18} />, label: "Twitter" },
              ].map((item, index) => (
                <a
                  key={index}
                  href="#"
                  aria-label={item.label}
                  className="w-10 h-10 rounded-full border border-white/10 hover:border-accent-mint text-text-muted hover:text-bg-ink hover:bg-accent-mint flex items-center justify-center transition-all duration-300"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-semibold tracking-wider text-text-muted uppercase">
          <div>
            © 2026 Excellence Team - Tous droits réservés
          </div>
          <div className="flex gap-6">
            <Link to="/terms" className="hover:text-text-bright transition-colors">
              Conditions Générales
            </Link>
            <Link to="/privacy" className="hover:text-text-bright transition-colors">
              Politique de Confidentialité
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
