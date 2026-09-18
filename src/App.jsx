import { Route, Routes } from 'react-router-dom'
import FaqContact from './components/FaqContact'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Projects from './components/Projects'
import Services from './components/Services'
import StarMascot from './components/StarMascot'
import Team from './components/Team'
import Testimonials from './components/Testimonials'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import JournalPage from './pages/JournalPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import ProjectsPage from './pages/ProjectsPage'
import ServicesPage from './pages/ServicesPage'

function Placeholder({ title }) {
  return (
    <section className="mx-auto max-w-[77.5rem] px-6 py-24">
      <p className="text-xs tracking-[0.14em] uppercase text-primary font-semibold">— Page en construction</p>
      <h1 className="mt-4 text-5xl sm:text-6xl font-extrabold tracking-tight text-ink">
        {title}
      </h1>
    </section>
  )
}

function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Projects />
      <Team />
      <Testimonials />
      <FaqContact />
    </>
  )
}

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projets/:id" element={<ProjectDetailPage />} />
        <Route path="/projets" element={<ProjectsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/a-propos" element={<AboutPage />} />
        <Route path="/journal" element={<JournalPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<Placeholder title="404" />} />
      </Routes>
      <Footer />
      <StarMascot />
    </>
  )
}
