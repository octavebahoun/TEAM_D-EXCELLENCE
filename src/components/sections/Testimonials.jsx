import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import testimonialsData from "../../data/testimonials.json";

gsap.registerPlugin(ScrollTrigger);

function Testimonials() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null); // The inner container that gets pinned
  const scrollTrackRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = scrollTrackRef.current;
      if (!track) return;

      // On desktop, we run the custom horizontal scrolling experience
      if (window.innerWidth >= 1024) {
        // Calculate exact horizontal scroll amount
        const totalWidth = track.scrollWidth - window.innerWidth;

        gsap.to(track, {
          x: -totalWidth,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current, // Start when section reaches viewport
            pin: containerRef.current,   // Pin the inner wrapper
            scrub: 0.8,
            start: "top top",
            end: () => `+=${track.scrollWidth}`,
            invalidateOnRefresh: true,
            id: "testimonials-pin-trigger",
          },
        });
      } else {
        // On mobile, we use standard vertical reveal animations
        const mobileCards = track.querySelectorAll(".testimonial-slide-mobile");
        mobileCards.forEach((card, index) => {
          gsap.from(card, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              id: `testimonials-mobile-trigger-${index}`,
            },
          });
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getById("testimonials-pin-trigger")?.kill(true);
      ScrollTrigger.refresh();
    };
  }, []);

  const { intro, testimonials } = testimonialsData;

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative bg-[#070908] border-t border-white/5 overflow-hidden z-10"
    >
      {/* Pinned inner wrapper */}
      <div
        ref={containerRef}
        className="w-full lg:h-screen lg:flex lg:items-center relative"
      >
        {/* Decorative backdrop elements */}
        <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-mint/5 blur-[120px] rounded-full pointer-events-none" />

        {/* HORIZONTAL SCROLL TRACK (Desktop) */}
        <div
          ref={scrollTrackRef}
          className="hidden lg:flex flex-row items-center gap-16 px-[10vw] w-max h-full"
        >
          {/* Intro Slide */}
          <div className="w-[30vw] flex flex-col justify-center items-start shrink-0 pr-12 border-r border-white/5">
            <span className="text-xs font-bold text-accent-mint tracking-[0.3em] uppercase mb-4">
              {intro.sectionTitle}
            </span>
            <h2 className="font-display font-black text-5xl xl:text-6xl text-text-bright leading-none mb-6">
              {intro.title.split('\n')[0]}<br />
              {intro.title.split('\n')[1]}
            </h2>
            <Link to="/contact">
              <button className="px-6 py-3 bg-accent-mint text-bg-ink font-bold text-xs tracking-widest uppercase rounded-full cursor-pointer hover:bg-emerald-400 transition-colors shadow-glow-mint">
                {intro.ctaText}
              </button>
            </Link>
          </div>

          {/* Testimonial Slides */}
          {testimonials.map((t, index) => {
            return (
              <div
                key={index}
                className="testimonial-slide w-[75vw] max-w-[850px] h-[55vh] flex rounded-3xl overflow-hidden border border-white/5 bg-[#0d0f0e]/60 backdrop-blur-md hover:border-accent-mint/30 shadow-2xl shrink-0 transition-colors duration-500 relative group"
              >
                {/* Tech grid style line decoration inside card */}
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <div className="absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />

                {/* Left Column: Quote content */}
                <div className="w-[60%] p-12 flex flex-col justify-between items-start">
                  <span className="text-xs font-bold text-accent-mint tracking-widest uppercase mb-4 bg-white/5 px-4 py-1.5 rounded-full border border-white/5">
                    {t.company}
                  </span>
                  <p className="font-editorial italic font-light text-xl xl:text-2xl text-text-bright leading-relaxed">
                    "{t.quote}"
                  </p>
                  <div className="mt-6 flex flex-col">
                    <strong className="text-text-bright text-base font-bold">{t.author}</strong>
                    <span className="text-text-muted text-xs font-semibold uppercase tracking-wider mt-1">{t.role}</span>
                  </div>
                </div>

                {/* Right Column: Author Image */}
                <div className="w-[40%] h-full relative overflow-hidden bg-[#070908]/90 flex items-center justify-center border-l border-white/5">
                  <img
                    src={t.image}
                    alt={`${t.author} - ${t.role} ${t.company}`}
                    className="absolute inset-0 w-full h-full object-cover filter brightness-75 group-hover:scale-105 group-hover:brightness-90 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent to-bg-ink/80 opacity-60 pointer-events-none" />
                </div>
              </div>
            );
          })}
        </div>

        {/* MOBILE LIST (Under 1024px) */}
        <div className="lg:hidden w-full px-6 py-20 flex flex-col gap-12">
          <div className="mb-8">
            <span className="text-xs font-bold text-accent-mint tracking-[0.3em] uppercase mb-3 block">
              {intro.sectionTitle}
            </span>
            <h2 className="font-display font-black text-4xl text-text-bright leading-none">
              {intro.title.replace('\n', ' ')}
            </h2>
          </div>

          <div className="flex flex-col gap-8">
            {testimonials.map((t, index) => {
              return (
                <div
                  key={index}
                  className="testimonial-slide-mobile flex flex-col rounded-3xl overflow-hidden border border-white/5 bg-[#0d0f0e]/50 backdrop-blur-sm"
                >
                  {/* Image header on mobile */}
                  <div className="h-48 relative overflow-hidden border-b border-white/5">
                    <img
                      src={t.image}
                      alt={`${t.author} - ${t.role} ${t.company}`}
                      className="w-full h-full object-cover filter brightness-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-ink/80 to-transparent pointer-events-none" />

                    <div className="absolute top-4 left-4 font-mono text-accent-mint font-bold text-xs tracking-widest bg-[#0d0f0e]/90 px-2.5 py-1.5 rounded-md border border-white/5 z-10">
                      {t.company}
                    </div>
                  </div>

                  <div className="p-8 flex flex-col justify-between items-start gap-6">
                    <p className="font-editorial italic font-light text-lg text-text-bright leading-relaxed">
                      "{t.quote}"
                    </p>
                    <div className="flex flex-col">
                      <strong className="text-text-bright text-sm font-bold">{t.author}</strong>
                      <span className="text-accent-mint text-[0.7rem] font-semibold uppercase tracking-wider mt-1">{t.role}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center mt-6">
            <Link to="/contact" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 py-4 bg-accent-mint text-bg-ink font-bold text-xs tracking-widest uppercase rounded-full cursor-pointer hover:bg-emerald-400 transition-colors shadow-glow-mint">
                {intro.ctaText}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
