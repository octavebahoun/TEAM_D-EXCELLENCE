import { motion } from "framer-motion";
import { useAccessibleMotion } from "../../lib/animations";
import { Link } from "react-router-dom";

const services = [
  {
    title: "Ingénierie Digitale",
    gridClass: "lg:col-span-8",
    list: [
      "Développement web",
      "Sites vitrines, plateformes et e-commerce",
      "Applications mobile iOS & Android",
      "Logiciels sur-mesure",
      "Intégration IA & API REST/GraphQL",
      "UX/UI Design & prototypage",
    ],
    result: "Objectif : un produit digital stable, rapide et évolutif.",
    description:
      "Du cahier des charges à la mise en production, nous concevons et développons des solutions numériques robustes, performantes et évolutives — web, mobile, logiciel, IA — parfaitement adaptées à vos besoins spécifiques.",
    image:
      "https://res.cloudinary.com/dla8wr5qj/image/upload/v1775956049/ingi%C3%A9nerie_ylf4x3.webp",
  },
  {
    title: "Audience & Création",
    gridClass: "lg:col-span-4",
    list: [
      "Motion design & animations",
      "Identité visuelle complète",
      "Stratégie & gestion social media",
      "Photographie & direction artistique",
    ],
    result:
      "Objectif : renforcer la mémorisation de marque.",
    description:
      "Nous créons les contenus visuels, les identités de marque et les stratégies digitales qui permettent à vos produits et services de se démarquer.",
    image:
      "https://res.cloudinary.com/dla8wr5qj/image/upload/v1775956474/motion_qg16k4.avif",
  },
  {
    title: "Cybersécurité",
    gridClass: "lg:col-span-4",
    list: [
      "Audit de sécurité & tests d'intrusion (pentest)",
      "Analyse des vulnérabilités",
      "Conformité RGPD & réponse aux incidents",
      "Sensibilisation & formation des équipes",
    ],
    result:
      "Objectif : réduire les risques et protéger vos actifs.",
    description:
      "La sécurité de vos systèmes d'information est un enjeu stratégique. Notre équipe certifiée évalue vos vulnérabilités et renforce vos défenses.",
    image:
      "https://res.cloudinary.com/dla8wr5qj/image/upload/v1775956328/cybers%C3%A9curit%C3%A9_kao6kb.avif",
  },
  {
    title: "Infra & Maintenance",
    gridClass: "lg:col-span-8",
    list: [
      "Cloud & hébergement (AWS, DigitalOcean, etc.)",
      "Installation & configuration réseaux locaux",
      "Supervision, monitoring & alerting 24/7",
      "Maintenance préventive et corrective",
      "Domotique & smart building",
    ],
    result: "Objectif : assurer disponibilité et performance.",
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
    <section id="services" className="relative py-28 md:py-36 bg-surface-dark border-t border-white/5 overflow-hidden z-10">
      {/* Decorative grids */}
      <div className="blueprint-grid opacity-30" />
      <div className="glow-spot top-10 right-1/4 opacity-20" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.span
              className="block text-[0.8rem] font-bold text-accent-mint tracking-widest uppercase mb-4"
              {...(reduce ? { initial: { opacity: 1, y: 0 }, whileInView: { opacity: 1, y: 0 } } : { initial: { opacity: 0, y: 10 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } })}
            >
              NOS SERVICES
            </motion.span>
            <motion.h2 
              className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-text-bright leading-none tracking-tight"
              {...(reduce ? { initial: { opacity: 1 }, whileInView: { opacity: 1 } } : { initial: { opacity: 0, x: -20 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.6 } })}
            >
              Des offres pensées<br />
              pour des <span className="font-editorial italic font-light text-accent-gold">résultats concrets</span>
            </motion.h2>
            <p className="text-text-muted mt-6 text-base font-medium max-w-xl">
              Nous intervenons sur tout le cycle de vie digital : cadrage, conception, implémentation, sécurisation et maintenance.
            </p>
          </div>

          <Link to="/contact" className="self-start md:self-auto">
            <motion.button
              className="px-6 py-3.5 border border-white/10 hover:border-accent-mint text-text-bright hover:text-bg-ink hover:bg-accent-mint text-[0.85rem] font-bold tracking-widest uppercase rounded-full cursor-pointer transition-all duration-300"
              {...(reduce
                ? { initial: { opacity: 1, x: 0 }, whileInView: { opacity: 1, x: 0 } }
                : { initial: { opacity: 0, x: 15 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, whileHover: { scale: 1.03 } })}
            >
              Parler à un expert ↗
            </motion.button>
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {services.map((service, index) => (
            <MotionDiv
              key={index}
              className={`glass-panel group relative flex flex-col md:flex-row rounded-3xl overflow-hidden border border-white/5 bg-surface-card/50 hover:border-accent-mint/30 shadow-soft transition-all duration-500 ${service.gridClass}`}
              {...(reduce
                ? { initial: { opacity: 1, y: 0 }, whileInView: { opacity: 1, y: 0 } }
                : { 
                    initial: { opacity: 0, y: 20 }, 
                    whileInView: { opacity: 1, y: 0 }, 
                    viewport: { once: true, amount: 0.15 }, 
                    transition: { duration: 0.6, delay: index * 0.1 }, 
                    whileHover: { y: -6 } 
                  })}
            >
              {/* Service image block */}
              <div className="w-full md:w-2/5 aspect-[16/10] md:aspect-auto relative overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover block filter brightness-75 group-hover:scale-105 group-hover:brightness-90 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-bg-ink via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>

              {/* Service info content */}
              <div className="w-full md:w-3/5 p-8 sm:p-10 flex flex-col justify-between items-start">
                <div>
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-text-bright mb-4 group-hover:text-accent-mint transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed mb-6 border-b border-white/5 pb-6">
                    {service.description}
                  </p>
                  
                  {/* Objective text styled with editorial font */}
                  <span className="font-editorial italic font-light text-accent-gold text-base block mb-6">
                    {service.result}
                  </span>

                  {/* High-end list arrows */}
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 w-full">
                    {service.list.map((item) => (
                      <li key={item} className="relative pl-5 text-xs font-semibold tracking-wide text-text-muted/90 leading-tight">
                        <span className="absolute left-0 text-accent-mint font-bold">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link to="/contact" className="text-xs font-black tracking-widest text-text-bright group-hover:text-accent-mint border-b border-white/20 group-hover:border-accent-mint pb-1.5 uppercase transition-all duration-300">
                  Demander un cadrage ↗
                </Link>
              </div>

            </MotionDiv>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Services;
