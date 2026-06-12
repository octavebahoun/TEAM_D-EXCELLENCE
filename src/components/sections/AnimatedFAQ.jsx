import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ChevronDown } from "lucide-react";
import faqData from "../../data/faq.json";

function AccordionItem({ item, isOpen, onClick }) {
  const answerRef = useRef(null);
  const iconRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Animate open
      gsap.to(answerRef.current, {
        height: "auto",
        duration: 0.4,
        ease: "power3.inOut"
      });
      gsap.to(iconRef.current, {
        rotate: 180,
        duration: 0.4,
        ease: "power3.inOut"
      });
    } else {
      // Animate close
      gsap.to(answerRef.current, {
        height: 0,
        duration: 0.4,
        ease: "power3.inOut"
      });
      gsap.to(iconRef.current, {
        rotate: 0,
        duration: 0.4,
        ease: "power3.inOut"
      });
    }
  }, [isOpen]);

  return (
    <div className="border-b border-neutral-800/50 py-4">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left focus:outline-none group cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-bold text-text-bright group-hover:text-accent-mint transition-colors">
          {item.question}
        </span>
        <div 
          ref={iconRef} 
          className="w-8 h-8 rounded-full border border-neutral-700 flex items-center justify-center shrink-0 group-hover:border-accent-mint transition-colors"
        >
          <ChevronDown className="w-4 h-4 text-text-muted group-hover:text-accent-mint" />
        </div>
      </button>
      
      <div 
        ref={answerRef} 
        className="h-0 overflow-hidden"
      >
        <div className="pt-4 pb-2 text-text-muted text-base leading-relaxed">
          {item.answer}
        </div>
      </div>
    </div>
  );
}

export default function AnimatedFAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-24 relative z-10">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-text-bright mb-4">
            {faqData.title}
          </h2>
          <p className="text-text-muted">
            {faqData.subtitle}
          </p>
        </div>
        
        <div className="flex flex-col gap-2">
          {faqData.faqs.map((item, index) => (
            <AccordionItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
