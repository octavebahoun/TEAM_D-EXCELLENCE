import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LightSection({ children }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    // Inverser le thème lumineux dynamique
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        toggleActions: "play reverse play reverse",
        onEnter: () => {
          gsap.to("body", { backgroundColor: "#ffffff", color: "#000000", duration: 0.6, ease: "power2.out" });
          // Optional: You can also target specific navbar elements here if needed by adding classes
          document.body.classList.add("light-mode-active");
        },
        onLeave: () => {
          gsap.to("body", { backgroundColor: "var(--color-bg-ink)", color: "#f3f4f6", duration: 0.6, ease: "power2.out" });
          document.body.classList.remove("light-mode-active");
        },
        onEnterBack: () => {
          gsap.to("body", { backgroundColor: "#ffffff", color: "#000000", duration: 0.6, ease: "power2.out" });
          document.body.classList.add("light-mode-active");
        },
        onLeaveBack: () => {
          gsap.to("body", { backgroundColor: "var(--color-bg-ink)", color: "#f3f4f6", duration: 0.6, ease: "power2.out" });
          document.body.classList.remove("light-mode-active");
        }
      });
    });

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="light-section relative py-24 z-10 transition-colors duration-500"
    >
      {/* 
        This section forces its children to inherit the light theme if they use currentColor.
        If we want the text inside this section to be explicitly black:
      */}
      <div className="max-w-7xl mx-auto px-4 text-black">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Clarté Absolue
          </h2>
          <p className="opacity-70 max-w-2xl mx-auto">
            Une transition fluide vers un thème clair pour mettre en valeur les informations cruciales.
            Le design s'adapte dynamiquement à votre position de défilement.
          </p>
        </div>
        {children}
      </div>
    </section>
  );
}
