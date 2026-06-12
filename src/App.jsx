import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import SEO from "./components/layout/SEO";
import { Analytics } from "@vercel/analytics/react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import HeroInference from "./components/sections/HeroInference";
import Services from "./components/sections/Services";

import AnimatedFAQ from "./components/sections/AnimatedFAQ";
import Preloader from "./components/sections/Preloader";
import About from "./components/sections/About";
import Works from "./components/sections/Works";
import Testimonials from "./components/sections/Testimonials";
import Pricing from "./components/sections/Pricing";
import Blog from "./components/sections/Blog";
import Team from "./components/sections/Team";
import teamData from "./data/team.json";

import Footer from "./components/layout/Footer";
import WorksPage from "./pages/WorksPage";
import BlogPage from "./pages/BlogPage";
import ArticlePage from "./pages/ArticlePage";
import ContactPage from "./pages/ContactPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import AdminCMSPage from "./pages/AdminCMSPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent({ showPreloader }) {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin") || location.pathname.startsWith("/cms");

  return (
    <>
      {showPreloader && !isAdminPage && <Preloader />}
      {!isAdminPage && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/works" element={<WorksPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<ArticlePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/admin" element={<AdminCMSPage />} />
      </Routes>
      <Analytics />
    </>
  );
}

function App() {
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    // The preloader animation takes ~2.5s total.
    const timer = setTimeout(() => {
      setShowPreloader(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <AppContent showPreloader={showPreloader} />
    </Router>
  );
}

function HomePage() {
  return (
    <>
      <SEO
        title="L'Ingénierie Digitale d'Exception au Bénin"
        description="Experts en développement logiciel, cybersécurité et infrastructure. Excellence Team accompagne les entreprises vers une transformation digitale premium."
        teamMembers={teamData}
      />
      <div className="vignette-blur-bottom" />
      <div className="noise-overlay" />

      <HeroInference />
      <About />
      <Services />
      
      <Works />
      <Testimonials />
      <Pricing />

      <Team />
      <Blog />
      <AnimatedFAQ />
      <Footer />
    </>
  );
}

export default App;
