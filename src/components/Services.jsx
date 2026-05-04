import { motion } from "framer-motion";
import { useAccessibleMotion } from "../lib/animations";
import { Link } from "react-router-dom";
import "./Services.css";

const services = [
  {
    title: "Ingénierie Digitale",
    list: [
      "Développement web",
      "Sites vitrines, plateformes et e-commerce",
      "Applications mobile iOS & Android",
      "Logiciels sur-mesure et outils internes",
      "Intégration IA & automatisation",
      "UX/UI Design & prototypage",
      "API REST, GraphQL & architectures backend",
    ],
    result: "Objectif: un produit digital stable, rapide et evolutif.",
    description:
      "Du cahier des charges à la mise en production, nous concevons et développons des solutions numériques robustes, performantes et évolutives — web, mobile, logiciel, IA — parfaitement adaptées à vos besoins spécifiques.",
    image:
      "https://res.cloudinary.com/dla8wr5qj/image/upload/v1775956049/ingi%C3%A9nerie_ylf4x3.webp",
  },
  {
    title: "Audience & Création",
    list: [
      "Motion design & animations",
      "Production vidéo",
      "Clips, presentations et social content",
      "Identité visuelle complète",
      "Logo, charte et guidelines",
      "Stratégie & gestion social media",
      "Photographie produit & corporate",
      "Illustration & direction artistique",
    ],
    result:
      "Objectif: renforcer la memorisation de marque et la conversion.",
    description:
      "Nous créons les contenus visuels, les identités de marque et les stratégies digitales qui permettent à vos produits et services de se démarquer dans un environnement de plus en plus saturé.",
    image:
      "https://res.cloudinary.com/dla8wr5qj/image/upload/v1775956474/motion_qg16k4.avif",
  },
  {
    title: "Cybersécurité",
    list: [
      "Audit de sécurité & tests d'intrusion (pentest)",
      "Analyse des vulnérabilités",
      "Conformité RGPD & réglementation",
      "Formation & sensibilisation des équipes",
      "Analyse forensique & investigation",
      "Réponse aux incidents & plan de reprise",
    ],
    result:
      "Objectif: reduire les risques et proteger vos actifs strategiques.",
    description:
      "La sécurité de vos systèmes d'information est un enjeu stratégique. Notre équipe certifiée évalue vos vulnérabilités, renforce vos défenses et forme vos collaborateurs aux bonnes pratiques de sécurité.",
    image:
      "https://res.cloudinary.com/dla8wr5qj/image/upload/v1775956328/cybers%C3%A9curit%C3%A9_kao6kb.avif",
  },
  {
    title: "Infra & Maintenance",
    list: [
      "Installation & configuration réseaux locaux",
      "Cloud & hébergement (AWS, DigitalOcean, etc.)",
      "Domotique & smart building",
      "Gestion & maintenance du parc informatique",
      "Maintenance préventive et corrective",
      "Supervision, monitoring & alerting 24/7",
    ],
    result: "Objectif: assurer disponibilite, continuite et performance.",
    description:
      "Une infrastructure digitale fiable est le socle de toute activité moderne. Nous concevons, déployons et maintenons des environnements techniques hautement disponibles — du réseau local au cloud.",
    image:
      "https://res.cloudinary.com/dla8wr5qj/image/upload/v1775956409/reseau_eiltf5.webp",
  },
];

const MotionDiv = motion.div;

function Services() {
  const reduce = useAccessibleMotion();
  return (
    <section id="services" className="services-section">
      <div className="services-header">
        <motion.span
          className="section-label"
          {...(reduce ? { initial: { opacity: 1, y: 0 }, whileInView: { opacity: 1, y: 0 } } : { initial: { opacity: 0, y: 10 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } })}
        >
          NOS SERVICES
        </motion.span>
        <div className="services-title-row">
          <motion.h2 className="services-main-title" {...(reduce ? { initial: { opacity: 1, x: 0 }, whileInView: { opacity: 1, x: 0 } } : { initial: { opacity: 0, x: -30, filter: "blur(10px)" }, whileInView: { opacity: 1, x: 0, filter: "blur(0px)" }, viewport: { once: true }, transition: { duration: 0.8 } })}>
            Decouvrez
            <br />
            Des offres pensees
            <br />
            pour des resultats concrets
          </motion.h2>
          <Link to="/contact">
            <motion.button
              className="start-project-btn btn-roulette"
              data-text="Parler a un expert ↗"
              {...(reduce
                ? { initial: { opacity: 1, x: 0 }, whileInView: { opacity: 1, x: 0 } }
                : { initial: { opacity: 0, x: 20 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, whileHover: { scale: 1.05 } })}
            >
              <span className="btn-text">Parler a un expert ↗</span>
            </motion.button>
          </Link>
        </div>
        <p className="services-intro">
          Nous intervenons sur tout le cycle de vie digital: cadrage,
          conception, implementation, securisation et maintenance.
        </p>
      </div>

      <div className="services-grid">
        {services.map((service, index) => (
          <MotionDiv
            key={index}
            className="service-card"
            {...(reduce
              ? { initial: { opacity: 1, y: 0 }, whileInView: { opacity: 1, y: 0 } }
              : { initial: { opacity: 0, y: 40, filter: "blur(15px)" }, whileInView: { opacity: 1, y: 0, filter: "blur(0px)" }, viewport: { once: true, amount: 0.2 }, transition: { duration: 0.8, delay: index * 0.15 }, whileHover: { y: -10 } })}
          >
            <div className="service-image">
              <img src={service.image} alt={service.title} />
            </div>
            <div className="service-info">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <span className="service-result">{service.result}</span>
              <ul>
                {service.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link to="/contact" className="service-contact-link">
                Demander un cadrage ↗
              </Link>
            </div>
          </MotionDiv>
        ))}
      </div>
    </section>
  );
}

export default Services;
