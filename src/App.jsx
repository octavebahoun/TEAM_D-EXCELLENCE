import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import SEO from "./components/layout/SEO";
import { Analytics } from "@vercel/analytics/react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Services from "./components/sections/Services";
import Works from "./components/sections/Works";
import Testimonials from "./components/sections/Testimonials";
import Pricing from "./components/sections/Pricing";
import Blog from "./components/sections/Blog";
import Team from "./components/sections/Team";
import FAQ from "./components/sections/FAQ";
import teamData from "./data/team.json";

import Footer from "./components/layout/Footer";
import WorksPage from "./pages/WorksPage";
import BlogPage from "./pages/BlogPage";
import ArticlePage from "./pages/ArticlePage";
import ContactPage from "./pages/ContactPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/works" element={<WorksPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<ArticlePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
      </Routes>
      <Analytics />
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

      <Hero />
      <About />
      <Services />
      <Works />
      <Testimonials />
      <Pricing />
      <Team />
      <Blog />
      <FAQ />
      <Footer />
    </>
  );
}

export default App;
