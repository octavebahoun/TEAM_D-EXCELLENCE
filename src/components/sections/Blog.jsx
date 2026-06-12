import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import blogData from "../../data/blog.json";
import { ArrowUpRight } from "lucide-react";

function Blog() {
  // Take the first 2 articles to display as previews on landing page
  const posts = blogData.articles.slice(0, 2);

  return (
    <section className="relative py-28 md:py-36 bg-bg-ink overflow-hidden z-10 border-b border-white/5">
      {/* Grid backdrop */}
      <div className="blueprint-grid opacity-30" />
      <div className="glow-spot top-1/4 left-1/4 opacity-20" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-16">
          <div>
            <span className="block text-[0.8rem] font-bold text-accent-mint tracking-widest uppercase mb-4">
              BLOG
            </span>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-text-bright leading-none tracking-tight">
              Le Journal <span className="font-editorial italic font-light text-accent-mint">Digital</span>
            </h2>
          </div>
          
          <Link to="/blog">
            <button className="px-6 py-3.5 border border-white/10 hover:border-accent-mint text-text-bright hover:text-bg-ink hover:bg-accent-mint text-[0.85rem] font-bold tracking-widest uppercase rounded-full cursor-pointer transition-all duration-300 flex items-center justify-center gap-1.5">
              <span>Voir tout</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        {/* Blog grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <motion.div 
              key={post.id} 
              className="glass-panel group border border-white/5 rounded-3xl overflow-hidden bg-surface-card/40 hover:border-accent-mint/30 shadow-soft transition-all duration-500"
              whileHover={{ y: -10 }}
            >
              <Link to={`/blog/${post.id}`} className="block">
                {/* Image block */}
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover block filter brightness-75 group-hover:scale-103 group-hover:brightness-90 transition-all duration-700" 
                  />
                  {/* Floating Tag */}
                  <span className="absolute top-4 left-4 px-3 py-1 bg-bg-ink/80 border border-white/10 rounded-full text-[0.68rem] font-black text-accent-mint tracking-wider uppercase">
                    {post.tag}
                  </span>
                </div>

                {/* Details info */}
                <div className="p-8 sm:p-10">
                  <h3 className="font-display font-black text-2xl text-text-bright mb-3 group-hover:text-accent-mint transition-colors tracking-tight">
                    {post.title}
                  </h3>
                  <p className="text-text-muted text-sm font-medium leading-relaxed mb-6">
                    {post.description}
                  </p>
                  <span className="text-xs font-black tracking-widest text-text-bright group-hover:text-accent-mint border-b border-white/20 group-hover:border-accent-mint pb-1 uppercase transition-all duration-300 inline-flex items-center gap-1">
                    <span>Lire l'article</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Blog;
