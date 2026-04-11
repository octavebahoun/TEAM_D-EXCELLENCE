import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import "./Works.css";

const initialWorks = [
  {
    category: "INGÉNIERIE DIGITAL",
    title: "Web Development",
    description: "A high-performance brand crafted for a new era of electric sports cars, fast and emotionally charged.",
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200",
    side: "left",
  },
  {
    category: "FEV 2025 • BRANDING",
    title: "Lumen Atelier",
    description: "A high-performance brand crafted for a new era of electric sports cars, fast and emotionally charged.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
    side: "right",
  },
];

const listProjects = [
  {
    id: "nimble",
    title: "Nimble Apparel",
    date: "Aug 2024",
    category: "ILLUSTRATION",
    description: "Redefining urban style with sustainable materials and modular design patterns.",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=60&w=800",
  },
  {
    id: "heritage",
    title: "Heritage Motor",
    date: "Oct 2025",
    category: "BRANDING",
    description: "Honoring automotive history through a modern, digital-first brand experience.",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=60&w=800",
  },
  {
    id: "root",
    title: "Root & Rise",
    date: "Nov 2023",
    category: "BRANDING",
    description: "An organic identity for a future-facing wellness collective focused on growth.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=60&w=800",
  },
];

function Works() {
  const [expandedId, setExpandedId] = useState(null);

  const toggleProject = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="works-section">
      <div className="works-container">
        <motion.span
          className="section-label-light"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          SELECTED WORKS
        </motion.span>

        <motion.h2
          className="works-main-title"
          initial={{ opacity: 0, y: 40, filter: "blur(15px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1 }}
        >
          Our Brightest Creations
        </motion.h2>

        <div className="works-list">
          {initialWorks.map((work, index) => (
            <div key={index} className={`work-item ${work.side}`}>
              <motion.div
                className="work-info"
                initial={{ opacity: 0, x: work.side === "left" ? -50 : 50, filter: "blur(15px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="work-category">{work.category}</span>
                <h3 className="work-title">{work.title}</h3>
                <p className="work-desc">{work.description}</p>
                <button className="work-btn">See Project ↗</button>
              </motion.div>

              <motion.div
                className="work-image"
                initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
                whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                <img src={work.image} alt={work.title} />
              </motion.div>
            </div>
          ))}
        </div>

        <div className="small-works-list">
          <LayoutGroup>
            {listProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                className={`small-work-wrapper ${expandedId === project.id ? "expanded" : ""}`}
                onClick={() => toggleProject(project.id)}
              >
                {expandedId !== project.id ? (
                  // Closed State: Row
                  <motion.div 
                    className="small-work-row"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    layout
                  >
                    <h4 className="row-title">{project.title}</h4>
                    <div className="row-meta">
                      <span>{project.date}</span>
                      <span>{project.category}</span>
                    </div>
                  </motion.div>
                ) : (
                  // Open State: Card (based on your screenshot)
                  <motion.div 
                    className="expanded-project-card"
                    initial={{ opacity: 0, filter: "blur(20px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    layout
                  >
                    <div className="expanded-image">
                       <img src={project.image} alt={project.title} />
                    </div>
                    <div className="expanded-content">
                      <span className="expanded-label">{project.date} • {project.category}</span>
                      <h3 className="expanded-title">{project.title}</h3>
                      <p className="expanded-desc">{project.description}</p>
                      <button className="expanded-btn">See Project ↗</button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </LayoutGroup>
        </div>

        <motion.div 
            className="discover-more-wrap"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
        >
            <button className="discover-btn">Discover More</button>
        </motion.div>
      </div>
    </section>
  );
}

export default Works;
