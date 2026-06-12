import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AnimatedFAQ from "../components/sections/AnimatedFAQ";
import Footer from "../components/layout/Footer";
import SEO from "../components/layout/SEO";
import blogData from "../data/blog.json";

function BlogPage() {
  const [data, setData] = useState({ featured: null, articles: [] });

  useEffect(() => {
    setData(blogData);
  }, []);

  return (
    <>
      <SEO
        title="Blog & Insights"
        description="Décryptage tech, actualités cybersécurité et guides de transformation digitale. Le journal d'Excellence Team pour rester à la pointe de l'innovation."
      />
      <div className="vignette-blur-bottom" />
      <div className="noise-overlay" />

      <main className="relative bg-bg-ink min-h-screen z-10 pt-28 overflow-hidden">
        {/* Grids and lights */}
        <div className="blueprint-grid opacity-30" />
        <div className="glow-spot top-1/4 left-1/4 opacity-25" />

        {/* Marquee Banner */}
        <div className="w-full bg-surface-dark border-y border-white/5 py-4 overflow-hidden select-none relative z-10">
          <div className="flex gap-20 whitespace-nowrap animate-pulse-slow">
            <div className="flex gap-20 text-xs font-black tracking-widest text-accent-mint uppercase">
              {[1, 2, 3, 4].map((n) => (
                <span key={n}>
                  L'OPINION D'EXCELLENCE • INSIGHTS DIGITAUX • STRATÉGIE TECH • CYBERSÉCURITÉ •
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Page Hero */}
        <section className="py-20 px-4 md:px-8 w-full max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <span className="block text-[0.8rem] font-bold text-accent-mint tracking-widest uppercase mb-4">
              JOURNAL
            </span>
            <motion.h1
              className="font-display font-black text-5xl sm:text-6xl md:text-7xl text-text-bright leading-none tracking-tight"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              Le Journal <br />
              <span className="font-editorial italic font-light text-accent-mint">d'Excellence</span>
            </motion.h1>
          </div>

          {/* Featured Article */}
          {data.featured && (
            <motion.div
              className="glass-panel group border border-white/5 rounded-3xl overflow-hidden bg-surface-card/40 hover:border-accent-mint/20 shadow-soft mb-20"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Link to={`/blog/${data.featured.id}`} className="flex flex-col lg:flex-row items-stretch">
                <div className="w-full lg:w-3/5 aspect-[16/10] lg:aspect-auto overflow-hidden relative min-h-[300px]">
                  <img 
                    src={data.featured.image} 
                    alt={data.featured.title} 
                    className="w-full h-full object-cover block filter brightness-75 group-hover:scale-102 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-bg-ink via-transparent to-transparent opacity-60 pointer-events-none" />
                </div>
                
                <div className="w-full lg:w-2/5 p-8 sm:p-10 flex flex-col justify-between items-start">
                  <div>
                    <span className="px-3 py-1 bg-accent-mint/5 border border-accent-mint/15 rounded-full text-[0.68rem] font-black text-accent-mint tracking-wider uppercase mb-6 inline-block">
                      {data.featured.tag}
                    </span>
                    <h2 className="font-display font-black text-3xl text-text-bright leading-tight tracking-tight mb-4 group-hover:text-accent-mint transition-colors">
                      {data.featured.title}
                    </h2>
                    <p className="text-text-muted text-sm leading-relaxed mb-6">
                      {data.featured.description}
                    </p>
                  </div>
                  
                  <div className="text-xs font-bold text-text-muted/80 tracking-wider">
                    {data.featured.date} • {data.featured.readTime}
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Regular articles grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {data.articles.map((article, i) => (
              <motion.div
                key={article.id}
                className="glass-panel group border border-white/5 rounded-3xl overflow-hidden bg-surface-card/45 hover:border-accent-mint/20 shadow-soft transition-all duration-500 flex flex-col justify-between"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
              >
                <Link to={`/blog/${article.id}`} className="block flex-grow">
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="w-full h-full object-cover block filter brightness-75 group-hover:scale-102 transition-transform duration-700" 
                    />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-bg-ink/80 border border-white/10 rounded-full text-[0.68rem] font-black text-accent-mint tracking-wider uppercase">
                      {article.tag}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="font-display font-bold text-xl text-text-bright mb-3 group-hover:text-accent-mint transition-colors leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-text-muted text-xs sm:text-sm leading-relaxed mb-4">
                      {article.description}
                    </p>
                  </div>
                </Link>

                <div className="px-6 pb-6 pt-2 text-xs font-semibold text-text-muted/70 tracking-wider border-t border-white/5 flex justify-between items-center">
                  <span>{article.date}</span>
                  <span>{article.readTime}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <AnimatedFAQ />
      </main>

      <Footer />
    </>
  );
}

export default BlogPage;
