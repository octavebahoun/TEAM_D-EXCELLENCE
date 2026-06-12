import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import aboutImage from "../../assets/hero2.avif";
import aboutData from "../../data/about.json";

gsap.registerPlugin(ScrollTrigger);

function About() {
  const sectionRef = useRef(null);
  const elementsRef = useRef([]);
  elementsRef.current = []; // Reset on every render

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Apparition au scroll
      gsap.from(elementsRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        opacity: 0,
        y: 60,
        stagger: 0.15,
        duration: 0.7,
        ease: "power2.out",
      });

      // 2. Lignes SVG Dynamiques
      gsap.to(".about-flowing-line", {
        strokeDashoffset: -100,
        repeat: -1,
        ease: "none",
        duration: 2,
      });
    }, sectionRef); // Scope GSAP to this section

    return () => ctx.revert();
  }, []);

  const addToRefs = (el) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-28 md:py-36 overflow-hidden z-10 bg-bg-ink"
    >
      {/* Decorative SVG flowing lines in background */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" aria-hidden="true">
        <path
          className="about-flowing-line"
          d="M 100 0 C 100 300, 500 300, 500 800"
          stroke="var(--color-accent-mint)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="20 20"
        />
        <path
          className="about-flowing-line"
          d="M 800 0 C 800 400, 200 400, 200 800"
          stroke="var(--color-accent-mint)"
          strokeWidth="1"
          fill="none"
          strokeDasharray="15 30"
          style={{ animationDelay: "1s" }}
        />
      </svg>

      {/* Blueprint grid line backdrop */}
      <div className="blueprint-grid opacity-30" />
      <div className="glow-spot top-1/3 right-1/4 opacity-30" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Text Block */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div
              ref={addToRefs}
              className="font-editorial text-accent-mint text-xl italic tracking-widest mb-6"
            >
              {aboutData.sectionTitle}
            </div>

            <div
              ref={addToRefs}
              className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-text-bright leading-tight tracking-tight mb-8"
            >
              {aboutData.titleLine1}<br />
              <span className="font-editorial italic font-light text-accent-mint">{aboutData.titleLine2}</span>
            </div>

            <div
              ref={addToRefs}
              className="text-text-muted text-lg sm:text-xl font-medium leading-relaxed max-w-2xl"
            >
              {aboutData.description}
            </div>
          </div>

          {/* Right Image Block with Asymmetric Border Styling */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div
              ref={addToRefs}
              className="relative w-full max-w-[420px] aspect-[4/5] rounded-asym-1 overflow-hidden border border-white/10 hover:border-accent-mint/30 shadow-soft transition-colors duration-500"
            >
              <img 
                src={aboutImage} 
                alt="Excellence Team Cotonou Office" 
                className="w-full h-full object-cover block filter brightness-90 hover:brightness-100 transition-all duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-ink via-transparent to-transparent opacity-40 pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default About;
