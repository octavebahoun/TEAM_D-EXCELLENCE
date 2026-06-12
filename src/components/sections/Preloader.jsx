import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Preloader() {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const counterRef = useRef(null);
  const brandRef = useRef(null);
  const ringOuterRef = useRef(null);
  const ringMiddleRef = useRef(null);
  const ringInnerRef = useRef(null);
  const taglineRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Ensure scroll is enabled if we disabled it
        document.body.style.overflow = "";
      }
    });

    // Disable scroll during preloader
    document.body.style.overflow = "hidden";

    // 1. Initial State Settings
    gsap.set([brandRef.current, taglineRef.current], { opacity: 0, y: 20 });
    
    // 2. Infinite Rotations for Cyber Rings
    gsap.to(ringOuterRef.current, {
      rotation: 360,
      duration: 10,
      repeat: -1,
      ease: "none"
    });
    gsap.to(ringMiddleRef.current, {
      rotation: -360,
      duration: 6,
      repeat: -1,
      ease: "none"
    });
    gsap.to(ringInnerRef.current, {
      rotation: 360,
      duration: 3,
      repeat: -1,
      ease: "none"
    });

    // 3. Staggered Entrance of Brand elements
    tl.to(contentRef.current, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.out"
    })
    .to(brandRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.2")
    .to(taglineRef.current, {
      opacity: 0.6,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.6");

    // 4. Smooth Counter progress (000 to 100)
    const counterObj = { value: 0 };
    tl.to(counterObj, {
      value: 100,
      duration: 2.0,
      ease: "power2.out",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.innerText = Math.floor(counterObj.value)
            .toString()
            .padStart(3, "0");
        }
      }
    }, 0.2);

    // 5. Outro animation: Parallax exit + scale down content
    tl.to(contentRef.current, {
      scale: 0.9,
      opacity: 0,
      yPercent: 30,
      duration: 0.8,
      ease: "power3.inOut"
    }, "+=0.2")
    .to(containerRef.current, {
      yPercent: -100,
      duration: 1.0,
      ease: "power4.inOut"
    }, "-=0.6");

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030605] text-text-bright overflow-hidden"
    >
      {/* High-tech matrix/cyber pattern backdrop */}
      <div className="absolute inset-0 blueprint-grid opacity-15" />
      <div className="absolute inset-0 bg-radial-gradient(circle, rgba(0, 255, 157, 0.03) 0%, transparent 80%) pointer-events-none" />

      {/* Cyber/Neumorphic scanning line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-accent-mint/50 to-transparent animate-[bounce_4s_infinite]" />

      <div ref={contentRef} className="relative flex flex-col items-center opacity-0 z-10">
        
        {/* Concentric Cyber Rings */}
        <div className="relative w-36 h-36 mb-8 flex items-center justify-center">
          
          {/* Glowing pulse behind */}
          <div className="absolute w-24 h-24 rounded-full bg-accent-mint/10 blur-xl animate-pulse" />

          <svg className="absolute w-full h-full" viewBox="0 0 100 100">
            {/* Outer Ring */}
            <circle
              ref={ringOuterRef}
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="rgba(0, 255, 157, 0.15)"
              strokeWidth="1"
              strokeDasharray="6 6"
              className="origin-center"
            />
            {/* Middle Ring */}
            <circle
              ref={ringMiddleRef}
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke="var(--color-accent-mint)"
              strokeWidth="2"
              strokeDasharray="30 20 10 20"
              strokeLinecap="round"
              className="origin-center"
            />
            {/* Inner Ring */}
            <circle
              ref={ringInnerRef}
              cx="50"
              cy="50"
              r="30"
              fill="none"
              stroke="var(--color-accent-mint)"
              strokeWidth="1.5"
              strokeDasharray="4 8"
              className="origin-center"
            />
            {/* Center Core dot */}
            <circle
              cx="50"
              cy="50"
              r="4"
              fill="var(--color-accent-mint)"
              className="animate-ping"
              style={{ transformOrigin: "50% 50%" }}
            />
          </svg>

          {/* Core Counter in the very center */}
          <span className="font-mono text-xs font-black tracking-widest text-accent-mint z-10 mt-1">
            SYS
          </span>
        </div>

        {/* Brand Display */}
        <div className="overflow-hidden mb-2">
          <h1
            ref={brandRef}
            className="text-4xl sm:text-5xl font-display font-black tracking-[0.2em] uppercase text-text-bright flex items-center gap-1.5"
          >
            EXCELLENCE<span className="text-accent-mint italic font-editorial font-light lowercase tracking-normal text-3xl">team</span>
          </h1>
        </div>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="text-[0.65rem] sm:text-[0.72rem] font-bold tracking-[0.3em] uppercase text-text-muted mb-8"
        >
          L'Ingénierie Digitale d'Exception
        </p>

        {/* Dynamic Percentage Meter */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-baseline gap-1 font-mono">
            <span
              ref={counterRef}
              className="text-3xl sm:text-4xl font-extrabold text-accent-mint"
            >
              000
            </span>
            <span className="text-xs text-text-muted font-bold">%</span>
          </div>
          {/* Mini progress line */}
          <div className="w-24 h-[1px] bg-white/10 relative rounded-full overflow-hidden">
            <div className="absolute top-0 left-0 h-full bg-accent-mint animate-[pulse_1.5s_infinite]" style={{ width: "100%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
