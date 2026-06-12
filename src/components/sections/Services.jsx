import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import servicesData from "../../data/services.json";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
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
            id: "services-pin-trigger",
          },
        });
      } else {
        // On mobile, we use standard vertical reveal animations
        const mobileCards = track.querySelectorAll(".service-slide-mobile");
        mobileCards.forEach((card, index) => {
          gsap.from(card, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              id: `services-mobile-trigger-${index}`,
            },
          });
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getById("services-pin-trigger")?.kill(true);
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative bg-bg-ink overflow-hidden z-10"
    >
      {/* Pinned inner wrapper */}
      <div
        ref={containerRef}
        className="w-full lg:h-screen lg:flex lg:items-center relative"
      >
        {/* Decorative backdrop elements */}
        <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" />
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-accent-mint/5 blur-[120px] rounded-full pointer-events-none" />

        {/* HORIZONTAL SCROLL TRACK (Desktop) */}
        <div
          ref={scrollTrackRef}
          className="hidden lg:flex flex-row items-center gap-16 px-[10vw] w-max h-full"
        >
          {/* Intro Slide */}
          <div className="w-[30vw] flex flex-col justify-center items-start shrink-0 pr-12 border-r border-white/5">
            <span className="text-xs font-bold text-accent-mint tracking-[0.3em] uppercase mb-4">
              {servicesData.intro.sectionTitle}
            </span>
            <h2 className="font-display font-black text-5xl xl:text-6xl text-text-bright leading-none mb-6">
              {servicesData.intro.title.split('\n')[0]}<br />
              {servicesData.intro.title.split('\n')[1]}
            </h2>
            <p className="text-text-muted text-base leading-relaxed mb-8 max-w-sm">
              {servicesData.intro.description}
            </p>
            <div className="flex items-center gap-3 text-accent-mint font-semibold text-xs tracking-widest uppercase">
              <span>{servicesData.intro.scrollGuide}</span>
              <span className="animate-[ping_1.5s_infinite] w-2 h-2 rounded-full bg-accent-mint" />
              <span className="text-lg animate-[pulse_1s_infinite]">→</span>
            </div>
          </div>

          {/* Services Slides */}
          {servicesData.services.map((service, index) => {
            return (
              <div
                key={index}
                className="service-slide w-[80vw] max-w-[950px] h-[65vh] flex rounded-3xl overflow-hidden border border-white/5 bg-[#0d0f0e]/60 backdrop-blur-md hover:border-accent-mint/30 shadow-2xl shrink-0 transition-colors duration-500 relative group"
              >
                {/* Tech grid style line decoration inside card */}
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <div className="absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />

                {/* Left Column: Image Presentation */}
                <div className="w-[45%] h-full relative overflow-hidden bg-[#070908]/90 flex items-center justify-center border-r border-white/5">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover filter brightness-75 group-hover:scale-105 group-hover:brightness-90 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-bg-ink/80 opacity-60 pointer-events-none" />

                  {/* Giant absolute index number */}
                  <div className="absolute bottom-6 left-6 font-display font-black text-7xl text-white/20 tracking-tighter select-none z-10">
                    {service.num}
                  </div>
                </div>

                {/* Right Column: Detailed info */}
                <div className="w-[55%] p-12 flex flex-col justify-between items-start">
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="font-mono text-accent-mint font-bold text-sm tracking-widest bg-accent-mint/10 px-2.5 py-1 rounded-md">
                        {service.num}
                      </span>
                      <h3 className="font-display font-black text-3xl xl:text-4xl text-text-bright group-hover:text-accent-mint transition-colors duration-300">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-text-muted text-sm leading-relaxed mb-6 border-b border-white/5 pb-6">
                      {service.description}
                    </p>

                    {/* Objective styled beautifully */}
                    <span className="font-editorial italic font-light text-accent-mint text-base block mb-6">
                      {service.result}
                    </span>

                    {/* Cyber/Tech checklist */}
                    <ul className="grid grid-cols-2 gap-x-6 gap-y-3.5 w-full">
                      {service.list.map((item, i) => (
                        <li
                          key={i}
                          className="relative pl-5 text-xs font-semibold tracking-wide text-text-muted/80 leading-normal"
                        >
                          <span className="absolute left-0 text-accent-mint font-bold">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    to="/contact"
                    className="text-xs font-black tracking-widest text-text-bright group-hover:text-accent-mint border-b border-white/20 group-hover:border-accent-mint pb-1.5 uppercase transition-all duration-300 cursor-pointer flex items-center gap-1"
                  >
                    <span>Demander une étude</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* MOBILE LIST (Under 1024px) */}
        <div className="lg:hidden w-full px-6 py-20 flex flex-col gap-12">
          <div className="mb-8">
            <span className="text-xs font-bold text-accent-mint tracking-[0.3em] uppercase mb-3 block">
              {servicesData.intro.sectionTitle}
            </span>
            <h2 className="font-display font-black text-4xl text-text-bright leading-none">
              {servicesData.intro.title.replace('\n', ' ')}
            </h2>
          </div>

          <div className="flex flex-col gap-8">
            {servicesData.services.map((service, index) => {
              return (
                <div
                  key={index}
                  className="service-slide-mobile flex flex-col rounded-3xl overflow-hidden border border-white/5 bg-[#0d0f0e]/50 backdrop-blur-sm"
                >
                  {/* Service image header */}
                  <div className="h-48 relative overflow-hidden border-b border-white/5">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover filter brightness-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-ink/80 to-transparent pointer-events-none" />

                    <div className="absolute top-4 left-4 font-mono text-accent-mint font-bold text-xs tracking-widest bg-[#0d0f0e]/90 px-2.5 py-1.5 rounded-md border border-white/5 z-10">
                      {service.num}
                    </div>
                  </div>

                  <div className="p-8 flex flex-col justify-between items-start gap-6">
                    <div>
                      <h3 className="font-display font-black text-2xl text-text-bright mb-3">
                        {service.title}
                      </h3>
                      <p className="text-text-muted text-xs leading-relaxed mb-4">
                        {service.description}
                      </p>
                      <span className="font-editorial italic font-light text-accent-mint text-sm block mb-4">
                        {service.result}
                      </span>
                      <ul className="flex flex-col gap-2.5">
                        {service.list.map((item, i) => (
                          <li
                            key={i}
                            className="relative pl-5 text-xs font-semibold tracking-wide text-text-muted/80 leading-normal"
                          >
                            <span className="absolute left-0 text-accent-mint font-bold">✓</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      to="/contact"
                      className="text-xs font-black tracking-widest text-text-bright border-b border-white/20 pb-1.5 uppercase transition-all duration-300 flex items-center gap-1"
                    >
                      <span>Demander une étude</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
