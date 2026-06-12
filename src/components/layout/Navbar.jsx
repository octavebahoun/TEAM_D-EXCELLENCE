import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import navbarLogo from "../../assets/logo.svg";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const ObjectNavItems = [
  { name: "À propos", id: "about" },
  { name: "Services", id: "services" },
];

const navItems = ["À propos", "Services", "Réalisations", "Blog"];

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (name) => {
    setIsMenuOpen(false);

    if (name === "Réalisations") {
      navigate("/works");
      window.scrollTo(0, 0);
      return;
    }

    if (name === "Blog") {
      navigate("/blog");
      window.scrollTo(0, 0);
      return;
    }

    const targetItem = ObjectNavItems.find((item) => item.name === name);
    if (targetItem && targetItem.id) {
      const scrollToElement = (id) => {
        const element = document.getElementById(id);
        if (element) {
          const offset = 100; // Adjust for fixed header height
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      };

      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          scrollToElement(targetItem.id);
        }, 300);
      } else {
        setTimeout(() => {
          scrollToElement(targetItem.id);
        }, 100);
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] w-full px-4 py-4 md:px-8 pointer-events-none transition-all duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center pointer-events-auto">
        
        {/* Logo block with dark cyber border */}
        <button
          className="flex items-center gap-3 px-4 py-2 bg-surface-dark/80 border border-white/5 rounded-full backdrop-blur-md cursor-pointer hover:border-accent-mint/30 transition-colors shadow-soft"
          onClick={() => {
            navigate("/");
            window.scrollTo(0, 0);
            setIsMenuOpen(false);
          }}
        >
          <img src={navbarLogo} alt="Excellence Logo" className="w-8 h-8 object-contain" />
          <span className="font-display font-bold tracking-wider text-sm text-text-bright hidden sm:inline-block">
            EXCELLENCE <span className="text-accent-mint font-normal text-xs uppercase tracking-widest pl-1 font-editorial italic">team</span>
          </span>
        </button>

        {/* Central Menu Container (Floating Panel) */}
        <nav
          className={`hidden md:flex items-center gap-1.5 px-2 py-1.5 bg-surface-dark/75 border border-white/5 rounded-full backdrop-blur-md shadow-soft transition-all duration-300 ${
            scrolled ? "border-white/10 bg-bg-ink/90 scale-95" : ""
          }`}
          aria-label="Navigation principale"
        >
          {navItems.map((item) => (
            <button
              key={item}
              className="relative px-5 py-2 text-[0.85rem] font-bold tracking-wider text-text-muted hover:text-accent-mint transition-colors cursor-pointer rounded-full group uppercase"
              onClick={() => handleNavClick(item)}
            >
              <span className="relative z-10">{item}</span>
              <span className="absolute inset-0 bg-white/5 scale-0 group-hover:scale-100 rounded-full transition-transform duration-300 -z-0" />
            </button>
          ))}
        </nav>

        {/* Contact/CTA floating button */}
        <div className="hidden md:block">
          <button
            onClick={() => navigate("/contact")}
            className="px-6 py-2.5 bg-accent-mint hover:bg-emerald-400 text-bg-ink text-[0.82rem] font-bold tracking-widest uppercase rounded-full cursor-pointer shadow-glow-mint hover:shadow-[0_0_20px_rgba(0,255,157,0.35)] transition-all duration-300"
          >
            S'ENTRETENIR
          </button>
        </div>

        {/* Mobile Burger Button */}
        <button
          className={`flex md:hidden flex-col justify-center items-center w-11 h-11 bg-surface-dark/90 border rounded-full backdrop-blur-md z-[101] cursor-pointer gap-1.5 transition-colors ${
            isMenuOpen ? "border-accent-mint/30 text-accent-mint" : "border-white/5 text-text-bright"
          }`}
          onClick={toggleMenu}
          aria-label="Ouvrir le menu"
          aria-expanded={isMenuOpen}
        >
          <span className={`w-5 h-0.5 bg-current rounded-full transition-transform duration-300 ${isMenuOpen ? "rotate-45 translate-y-[4px]" : ""}`} />
          <span className={`w-5 h-0.5 bg-current rounded-full transition-transform duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-[4px]" : ""}`} />
        </button>

      </div>

      {/* Expanded Mobile Overlay Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-bg-ink/98 z-[90] flex flex-col justify-center px-8 md:hidden"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            {/* Architectural decorative line grid inside menu */}
            <div className="blueprint-grid opacity-30" />
            <div className="glow-spot -top-20 -left-20 opacity-30" />

            <div className="flex flex-col gap-6 relative z-10">
              <span className="font-editorial text-accent-mint text-xl italic tracking-widest border-b border-white/5 pb-4">
                Excellence Menu
              </span>
              <div className="flex flex-col gap-4">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item}
                    className="text-left font-display font-bold text-4xl text-text-bright hover:text-accent-mint uppercase transition-colors tracking-tight cursor-pointer"
                    onClick={() => handleNavClick(item)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item}
                  </motion.button>
                ))}
              </div>
              
              <div className="mt-8 flex flex-col gap-4">
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/contact");
                  }}
                  className="w-full py-4 bg-accent-mint text-bg-ink font-bold tracking-widest text-center uppercase rounded-full cursor-pointer shadow-glow-mint flex items-center justify-center gap-1.5"
                >
                  <span>Démarrer un Projet</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
