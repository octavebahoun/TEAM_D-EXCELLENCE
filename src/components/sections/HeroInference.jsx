import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import heroData from "../../data/hero.json";

export default function HeroInference() {
  const containerRef = useRef(null);
  const glowRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 1.5 }); // Delay to wait for preloader

    // Animate glow (spotlight rays expansion)
    tl.fromTo(
      glowRef.current,
      { scaleY: 0, opacity: 0, transformOrigin: "top center" },
      { scaleY: 1, opacity: 0.8, duration: 2, ease: "power3.out" },
      0
    );

    // Text Masking Reveal
    tl.fromTo(
      [line1Ref.current, line2Ref.current, line3Ref.current],
      { y: "100%" },
      {
        y: "0%",
        stagger: 0.15,
        duration: 0.8,
        ease: "power4.out",
      },
      0.2
    );

    // Subtitle and Buttons fade in
    tl.fromTo(
      [subtitleRef.current, buttonsRef.current],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.2, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    );

    // Continuous smooth swaying of the spotlight beams
    gsap.fromTo(
      glowRef.current,
      { rotation: -2 },
      {
        rotation: 2,
        duration: 16,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: "top center"
      }
    );
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden z-10"
    >
      {/* Top Spotlight Light Effect */}
      <div className="absolute top-0 left-0 right-0 h-full pointer-events-none overflow-hidden z-0">
        {/* Spotlight source glow */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-accent-mint/20 to-transparent blur-[80px] rounded-full"
        />
        
        {/* Spotlight rays */}
        <div 
          ref={glowRef}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[200vw] h-[100vh] origin-top opacity-0"
          style={{
            background: "conic-gradient(from 160deg at 50% 0%, transparent 0deg, rgba(0, 255, 157, 0.03) 5deg, transparent 8deg, rgba(0, 255, 157, 0.08) 12deg, transparent 15deg, rgba(0, 255, 157, 0.12) 19deg, rgba(0, 255, 157, 0.12) 21deg, transparent 25deg, rgba(0, 255, 157, 0.06) 29deg, transparent 33deg, rgba(0, 255, 157, 0.03) 36deg, transparent 40deg)",
            maskImage: "radial-gradient(circle at 50% 0%, black 0%, transparent 60%)",
            WebkitMaskImage: "radial-gradient(circle at 50% 0%, black 0%, transparent 60%)",
          }}
        />

        {/* Source light beam line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-accent-mint/60 to-transparent shadow-[0_0_20px_2px_rgba(0,255,157,0.4)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 w-full flex flex-col items-center text-center relative z-10">
        <h1 className="font-display font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-text-bright leading-[0.9] tracking-tighter mb-8 flex flex-col gap-2">
          <div className="overflow-hidden">
            <div ref={line1Ref}>{heroData.titleLine1}</div>
          </div>
          <div className="overflow-hidden">
            <div ref={line2Ref} className="text-accent-mint italic font-editorial font-light">{heroData.titleLine2}</div>
          </div>
          <div className="overflow-hidden">
            <div ref={line3Ref}>{heroData.titleLine3}</div>
          </div>
        </h1>

        <div ref={subtitleRef} className="opacity-0">
          <p className="text-text-muted text-base sm:text-lg md:text-xl font-medium max-w-2xl leading-relaxed mb-8 mx-auto">
            {heroData.subtitle}
          </p>
        </div>

        <div ref={buttonsRef} className="flex flex-wrap gap-4 items-center justify-center opacity-0">
          <Link to="/contact">
            <button className="px-8 py-4 bg-accent-mint hover:bg-emerald-400 text-bg-ink font-bold tracking-widest uppercase rounded-full cursor-pointer transition-all duration-300 shadow-glow-mint">
              {heroData.ctaText}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
