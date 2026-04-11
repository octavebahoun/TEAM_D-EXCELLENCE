import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import navbarLogo from "../assets/navbarlogo.png";
import { motion, AnimatePresence } from "framer-motion";

const ObjectNavItems = [
  { name: "About Us", id: "about" },
  { name: "Services", id: "services" },
];

const navItems = ["About Us", "Services", "Works", "Blog"];

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (name) => {
    setIsMenuOpen(false);

    if (name === "Works") {
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
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          const element = document.getElementById(targetItem.id);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else {
        const element = document.getElementById(targetItem.id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
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

        {/* Burger Button (Mobile) */}
        <button
          className={`burger-toggle ${isMenuOpen ? "open" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <div className="burger-line line-1"></div>
          <div className="burger-line line-2"></div>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="mobile-menu-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="mobile-menu-content">
              {navItems.map((item) => (
                <button
                  key={item}
                  className="mobile-nav-item"
                  onClick={() => handleNavClick(item)}
                >
                  {item}
                </button>
              ))}
              <div className="mobile-menu-footer">
                <button
                  className="mobile-cta-btn"
                  onClick={() => {
                    navigate("/");
                    setIsMenuOpen(false);
                  }}
                >
                  Contact Us
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
