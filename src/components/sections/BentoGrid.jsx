import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shield, Server, Activity, Database, Cpu, Cloud } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  { id: 1, title: "Développement Sur-Mesure", icon: Server, colSpan: "md:col-span-2", rowSpan: "", desc: "Applications web et mobiles hautement performantes, conçues avec des architectures modernes pour s'adapter parfaitement à vos processus métiers." },
  { id: 2, title: "Cybersécurité Avancée", icon: Shield, colSpan: "", rowSpan: "md:row-span-2", desc: "Audits complets (pentests) et sécurisation de vos infrastructures. Nous anticipons les menaces pour protéger vos données les plus sensibles." },
  { id: 3, title: "Maintenance & DevOps", icon: Activity, colSpan: "", rowSpan: "", desc: "Intégration continue et supervision en temps réel pour garantir la haute disponibilité de vos plateformes sans aucune interruption de service." },
  { id: 4, title: "UI/UX Design", icon: Cpu, colSpan: "", rowSpan: "", desc: "Des interfaces premium et intuitives, pensées pour offrir une expérience utilisateur mémorable et maximiser votre taux de conversion." },
  { id: 5, title: "Infrastructures Cloud", icon: Cloud, colSpan: "md:col-span-2", rowSpan: "", desc: "Déploiement, migration et gestion de vos serveurs sur le cloud. Nous optimisons vos coûts tout en assurant flexibilité et scalabilité." },
];

export default function BentoGrid() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    // 1. Apparition au scroll
    gsap.from(gridRef.current.children, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
      opacity: 0,
      y: 60,
      stagger: 0.1,
      duration: 0.7,
      ease: "power2.out",
    });

    // 2. Lignes SVG Dynamiques
    gsap.to(".flowing-line", {
      strokeDashoffset: -100,
      repeat: -1,
      ease: "none",
      duration: 2,
    });
  }, []);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden bg-bg-ink z-10">
      
      {/* Decorative SVG flowing lines in background */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" aria-hidden="true">
        <path
          className="flowing-line"
          d="M 100 0 C 100 300, 500 300, 500 800"
          stroke="var(--color-accent-mint)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="20 20"
        />
        <path
          className="flowing-line"
          d="M 800 0 C 800 400, 200 400, 200 800"
          stroke="var(--color-accent-mint)"
          strokeWidth="1"
          fill="none"
          strokeDasharray="15 30"
          style={{ animationDelay: "1s" }}
        />
      </svg>

      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-text-bright mb-4">
            Infrastructure & Services
          </h2>
          <p className="text-text-muted">Des solutions taillées pour la performance absolue.</p>
        </div>

        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#0f0f0f] p-8 rounded-3xl border border-neutral-800/50"
        >
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className={`bento-card relative overflow-hidden rounded-2xl bg-[#161616] border border-neutral-800 p-8 group transition-colors hover:border-neutral-700 ${card.colSpan} ${card.rowSpan}`}
                onMouseMove={handleMouseMove}
                style={{
                  "--mouse-x": "50%",
                  "--mouse-y": "50%"
                }}
              >
                {/* Spotlight Gradient Layer */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: "radial-gradient(circle 150px at var(--mouse-x) var(--mouse-y), rgba(0,255,157,0.1), transparent)"
                  }}
                />
                
                <div className="relative z-10 h-full flex flex-col justify-between min-h-[160px]">
                  <div className="w-12 h-12 rounded-xl bg-bg-ink border border-neutral-800 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-accent-mint" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text-bright mb-2">{card.title}</h3>
                    <p className="text-sm text-text-muted">
                      {card.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
