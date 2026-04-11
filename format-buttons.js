const fs = require('fs');

function replaceGlobally(path, strToFind, strToReplace) {
    if (fs.existsSync(path)) {
        let content = fs.readFileSync(path, 'utf8');
        content = content.split(strToFind).join(strToReplace);
        fs.writeFileSync(path, content, 'utf8');
    }
}

function replaceRegex(path, regex, replacement) {
    if (fs.existsSync(path)) {
        let content = fs.readFileSync(path, 'utf8');
        content = content.replace(regex, replacement);
        fs.writeFileSync(path, content, 'utf8');
    }
}

// Pricing
replaceRegex('src/components/Pricing.jsx', 
  /<button className="tier-cta">\{tier\.cta\}<\/button>/g, 
  '<button className="tier-cta btn-roulette" data-text={tier.cta}><span className="btn-text">{tier.cta}</span></button>');

// Works
replaceGlobally('src/components/Works.jsx', 
  '<button className="work-btn">See Project ↗</button>', 
  '<button className="work-btn btn-roulette" data-text="See Project ↗"><span className="btn-text">See Project ↗</span></button>');

replaceGlobally('src/components/Works.jsx', 
  '<button className="expanded-btn">See Project ↗</button>', 
  '<button className="expanded-btn btn-roulette" data-text="See Project ↗"><span className="btn-text">See Project ↗</span></button>');

replaceGlobally('src/components/Works.jsx', 
  '<button className="discover-btn">Discover More</button>', 
  '<button className="discover-btn btn-roulette" data-text="Discover More"><span className="btn-text">Discover More</span></button>');

// Navbar desktop
replaceGlobally('src/components/Navbar.jsx', 
  '<button key={item} className="nav-item">', 
  '<button key={item} className="nav-item btn-roulette" data-text={item}>');

// Navbar mobile
replaceGlobally('src/components/Navbar.jsx', 
  'className="mobile-nav-item"', 
  'className="mobile-nav-item btn-roulette" data-text={item}');

// Fixing the item wrappers in navbar
replaceRegex('src/components/Navbar.jsx', 
  /data-text={item}>\n\s*\{item\}\n\s*<\/button>/g, 
  'data-text={item}>\n                <span className="btn-text">{item}</span>\n              </button>');

replaceRegex('src/components/Navbar.jsx', 
  /onClick=\{\(\) => setIsOpen\(false\)\}>\n\s*\{item\}\n\s*<\/motion\.button>/g, 
  'onClick={() => setIsOpen(false)}>\n                  <span className="btn-text">{item}</span>\n                </motion.button>');

// Services and Blog buttons might need the motion prefix
replaceRegex('src/components/Services.jsx', 
  /className="start-project-btn"\n\s*initial=/g, 
  'className="start-project-btn btn-roulette" data-text="Start a Project ↗"\n            initial=');
replaceRegex('src/components/Services.jsx', 
  />\n\s*Start a Project ↗\n\s*<\/motion\.button>/g, 
  '>\n            <span className="btn-text">Start a Project ↗</span>\n          </motion.button>');

replaceRegex('src/components/Blog.jsx', 
  /className="see-all-btn"\n\s*initial=/g, 
  'className="see-all-btn btn-roulette" data-text="See All Posts ↗"\n            initial=');
replaceRegex('src/components/Blog.jsx', 
  />\n\s*See All Posts ↗\n\s*<\/motion\.button>/g, 
  '>\n            <span className="btn-text">See All Posts ↗</span>\n          </motion.button>');
