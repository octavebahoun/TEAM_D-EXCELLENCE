import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import navbarLogo from "../assets/navbarlogo.png";
import { motion, AnimatePresence } from "framer-motion";

const ObjectNavItems = [
  { name: "À propos", id: "about" },
  { name: "Services", id: "services" },
];

const navItems = ["À propos", "Services", "Réalisations", "Blog"];

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
          const offset = 80; // Adjust for fixed header height
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
        }, 300); // Increased timeout for page load
      } else {
        // Even if on home page, a small delay helps on mobile to let the menu close
        setTimeout(() => {
          scrollToElement(targetItem.id);
        }, 100);
      }
    }
  };

  // Close menu on resize if screen becomes desktop-sized
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
    <header className="top-nav-wrap">
      <nav
        className={`top-nav ${isMenuOpen ? "menu-is-open" : ""}`}
        aria-label="Navigation principale"
      >
        <button
          className="nav-logo"
          aria-label="Accueil"
          onClick={() => {
            navigate("/");
            window.scrollTo(0, 0);
            setIsMenuOpen(false);
          }}
        >
          <img src={navbarLogo} alt="Excellence" />
        </button>

        {/* Desktop Nav Items */}
        <div className="desktop-nav-items">
          {navItems.map((item) => (
            <button
              key={item}
              className="nav-item btn-roulette"
              data-text={item}
              onClick={() => handleNavClick(item)}
            >
              <span className="btn-text">{item}</span>
            </button>
          ))}
        </div>

        {/* Burger Button (Mobile) - Hidden when menu is open */}
        {!isMenuOpen && (
          <button
            className="burger-toggle"
            onClick={toggleMenu}
            aria-label="Open menu"
          >
            <div className="burger-line line-1"></div>
            <div className="burger-line line-2"></div>
          </button>
        )}

        {/* Expanded Mobile Menu - Matches the provided box design */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="mobile-menu-box"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mobile-menu-header">
                {/* Logo and close button on the same line */}
                <button
                  className="nav-logo mobile-box-logo"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <img src={navbarLogo} alt="Excellence" />
                </button>
                <button
                  className="close-x-btn"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              <div className="mobile-menu-list">
                {navItems.map((item) => (
                  <button
                    key={item}
                    className="mobile-pill-btn"
                    onClick={() => handleNavClick(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

export default Navbar;
