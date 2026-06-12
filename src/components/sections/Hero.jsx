import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Activity, Shield, Server, Terminal,
  Cpu, HardDrive
} from "lucide-react";
import { fadeIn, useAccessibleMotion } from "../../lib/animations";

function SystemDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const reduce = useAccessibleMotion();

  // Mock data for interactive chart points
  const points = [
    { x: 30, y: 120, label: "00:00", val: "42 ms" },
    { x: 90, y: 80, label: "04:00", val: "28 ms" },
    { x: 150, y: 130, label: "08:00", val: "45 ms" },
    { x: 210, y: 60, label: "12:00", val: "18 ms" },
    { x: 270, y: 90, label: "16:00", val: "31 ms" },
    { x: 330, y: 40, label: "20:00", val: "14 ms" },
    { x: 390, y: 70, label: "23:59", val: "22 ms" }
  ];

  return (
    <motion.div
      className="w-full max-w-[640px] xl:max-w-[700px] border border-white/10 rounded-2xl bg-[#070c0a]/90 shadow-2xl backdrop-blur-md overflow-hidden flex flex-col text-text-bright font-sans select-none"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.15 }}
    >
      {/* Top OS Window Header */}
      <div className="flex justify-between items-center px-4 py-3 bg-[#0a110e] border-b border-white/5">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-accent-mint/80" />
        </div>
        <div className="flex items-center gap-2 text-[0.62rem] font-bold text-text-muted uppercase tracking-widest bg-bg-ink/50 px-3 py-1 rounded-md border border-white/5">
          <span className="w-1.5 h-1.5 bg-accent-mint rounded-full animate-ping" />
          production-node-bj01
        </div>
        <div className="w-10" />
      </div>

      {/* Main Body */}
      <div className="flex flex-row flex-grow min-h-[360px] sm:min-h-[420px]">
        {/* Left Sidebar */}
        <div className="w-14 sm:w-44 bg-[#080e0c] border-r border-white/5 p-2 flex flex-col justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2.5 px-3 py-2 mb-4">
              <div className="w-6 h-6 rounded-lg bg-accent-mint/10 flex items-center justify-center border border-accent-mint/20">
                <Terminal className="w-3.5 h-3.5 text-accent-mint" />
              </div>
              <span className="hidden sm:inline font-display font-black text-xs uppercase tracking-wider text-text-bright">
                Console
              </span>
            </div>

            {[
              { id: "overview", label: "Overview", icon: Activity },
              { id: "security", label: "Security", icon: Shield },
              { id: "servers", label: "Servers", icon: Server },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-300 text-left cursor-pointer ${isActive
                      ? "bg-accent-mint/10 text-accent-mint border border-accent-mint/10"
                      : "text-text-muted hover:text-text-bright hover:bg-white/2 border border-transparent"
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline text-xs font-semibold">{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="hidden sm:flex flex-col gap-2 p-3 bg-bg-ink/40 rounded-xl border border-white/5">
            <div className="flex items-center justify-between text-[0.62rem] text-text-muted font-bold">
              <span>DISK LOAD</span>
              <span className="text-accent-mint">34%</span>
            </div>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <div className="w-[34%] h-full bg-accent-mint" />
            </div>
          </div>
        </div>

        {/* Workspace Area */}
        <div className="flex-grow p-4 sm:p-6 bg-surface-dark/20 flex flex-col justify-between gap-6">

          {/* Active Tab: Overview */}
          {activeTab === "overview" && (
            <>
              {/* Metric Row */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "SYS LATENCY", val: "18ms", color: "text-accent-mint", icon: Cpu },
                  { label: "SECURITY AUDIT", val: "100%", color: "text-accent-mint", icon: Shield },
                  { label: "NET TRAFFIC", val: "4.2TB", color: "text-accent-mint", icon: HardDrive }
                ].map((m, i) => {
                  const Icon = m.icon;
                  return (
                    <div key={i} className="bg-[#0b1310] border border-white/5 rounded-xl p-3 flex flex-col justify-between hover:border-white/10 transition-colors">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[0.55rem] font-bold text-text-muted uppercase tracking-wider">{m.label}</span>
                        <Icon className="w-3.5 h-3.5 text-text-muted" />
                      </div>
                      <span className={`text-sm sm:text-base font-black ${m.color}`}>{m.val}</span>
                    </div>
                  );
                })}
              </div>

              {/* Chart Card */}
              <div className="bg-[#0b1310] border border-white/5 rounded-xl p-4 flex-grow flex flex-col justify-between">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex flex-col">
                    <span className="text-[0.62rem] font-bold text-text-muted uppercase tracking-wider">Temps de Réponse Global (24h)</span>
                    <span className="text-xs font-black text-text-bright">Moyenne : 22ms</span>
                  </div>
                  <span className="text-[0.62rem] px-2 py-0.5 bg-accent-mint/5 border border-accent-mint/10 rounded-full text-accent-mint font-bold uppercase tracking-widest">
                    Live
                  </span>
                </div>

                {/* SVG Line Chart */}
                <div className="relative w-full h-24 sm:h-32 bg-bg-ink/30 rounded-lg overflow-hidden border border-white/5">
                  <svg className="w-full h-full" viewBox="0 0 420 150" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00ff9d" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#00ff9d" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {/* Gradient Area */}
                    <motion.path
                      d="M 30 150 L 30 120 L 90 80 L 150 130 L 210 60 L 270 90 L 330 40 L 390 70 L 390 150 Z"
                      fill="url(#chartGradient)"
                      initial={reduce ? {} : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8 }}
                    />

                    {/* Glowing Stroke */}
                    <motion.path
                      d="M 30 120 L 90 80 L 150 130 L 210 60 L 270 90 L 330 40 L 390 70"
                      fill="none"
                      stroke="#00ff9d"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      initial={reduce ? {} : { pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                    />

                    {/* Interactive nodes */}
                    {points.map((p, i) => (
                      <g key={i}>
                        <circle
                          cx={p.x}
                          cy={p.y}
                          r="4"
                          className="fill-accent-mint cursor-pointer hover:r-6 hover:fill-accent-mint transition-all"
                          onMouseEnter={() => setHoveredPoint(p)}
                          onMouseLeave={() => setHoveredPoint(null)}
                        />
                      </g>
                    ))}
                  </svg>

                  {/* Dynamic Tooltip */}
                  {hoveredPoint && (
                    <div
                      className="absolute bg-bg-ink border border-white/10 px-2 py-1 rounded-md text-[0.62rem] font-bold text-text-bright shadow-lg pointer-events-none"
                      style={{
                        left: `${(hoveredPoint.x / 420) * 100}%`,
                        top: `${(hoveredPoint.y / 150) * 100 - 30}%`,
                        transform: "translateX(-50%)"
                      }}
                    >
                      {hoveredPoint.label} : {hoveredPoint.val}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Active Tab: Security */}
          {activeTab === "security" && (
            <div className="flex-grow flex flex-col gap-4">
              <div className="bg-[#0b1310] border border-white/5 rounded-xl p-4 flex flex-col gap-3">
                <span className="text-[0.62rem] font-bold text-text-muted uppercase tracking-wider">Derniers Evénements SecOps</span>
                <div className="flex flex-col gap-2">
                  {[
                    { label: "IP Blocked", desc: "192.168.1.105 (Brute Force)", time: "2m ago", status: "border-red-500/30 text-red-400 bg-red-500/5" },
                    { label: "SSL Cert Renewal", desc: "Wildcard cert updated", time: "1h ago", status: "border-accent-mint/30 text-accent-mint bg-accent-mint/5" },
                    { label: "Port Scan Detected", desc: "Block rule applied on WAN", time: "3h ago", status: "border-accent-mint/30 text-accent-mint bg-accent-mint/5" }
                  ].map((evt, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg border border-white/5 bg-bg-ink/30 text-[0.68rem]">
                      <div className="flex flex-col">
                        <span className="font-bold text-text-bright">{evt.label}</span>
                        <span className="text-text-muted mt-0.5">{evt.desc}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[0.55rem] text-text-muted/60 font-semibold">{evt.time}</span>
                        <span className={`px-2 py-0.5 border rounded-full text-[0.55rem] font-bold ${evt.status}`}>Active</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Active Tab: Servers */}
          {activeTab === "servers" && (
            <div className="flex-grow flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "Node BJ-01", type: "Main Gateway", cpu: "12%", ram: "4.2GB", status: "Online" },
                  { name: "Node BJ-02", type: "DB Replica", cpu: "28%", ram: "8.1GB", status: "Online" },
                  { name: "Backup Node", type: "Daily Sync", cpu: "2%", ram: "1.1GB", status: "Idle" },
                  { name: "App Engine", type: "Node Server", cpu: "8%", ram: "2.4GB", status: "Online" },
                ].map((srv, idx) => (
                  <div key={idx} className="bg-[#0b1310] border border-white/5 rounded-xl p-3 flex flex-col justify-between hover:border-white/10 transition-all text-[0.68rem]">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-text-bright">{srv.name}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-mint" />
                    </div>
                    <div className="flex flex-col gap-1 text-text-muted font-semibold">
                      <div className="flex justify-between">
                        <span>CPU</span>
                        <span className="text-text-bright">{srv.cpu}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>RAM</span>
                        <span className="text-text-bright">{srv.ram}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* System logs Console Footer */}
          <div className="bg-bg-ink/80 border border-white/5 rounded-lg p-3 font-mono text-[0.58rem] text-text-muted flex flex-col gap-1">
            <div className="flex items-center gap-2 text-accent-mint font-bold">
              <span>$</span>
              <span>excellence-team --status</span>
            </div>
            <div className="text-text-muted/80">
              BJ-NODE-01: Systems loaded. Database replication complete. Uptime 40d 12h.
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}

function Hero() {
  const reduce = useAccessibleMotion();
  const sectionProps = reduce ? { initial: { opacity: 1 }, whileInView: { opacity: 1 }, transition: { duration: 0 } } : fadeIn(0, 0.6);
  const copyProps = reduce ? { initial: { opacity: 1 }, whileInView: { opacity: 1 }, transition: { duration: 0 } } : fadeIn(0.05, 0.6);

  return (
    <motion.section
      className="relative min-h-[90vh] flex items-center pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden z-10"
      aria-label="Section d'accueil"
      {...sectionProps}
    >
      {/* Mesh gradients & Grid background */}
      <div className="blueprint-grid opacity-50" />
      <div className="glow-spot top-1/4 left-1/4 opacity-40 animate-pulse-slow" />
      <div className="glow-spot bottom-10 right-10 opacity-30" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">

        {/* Left Copy block */}
        <motion.div className="lg:col-span-6 flex flex-col items-start text-left" {...copyProps}>

          {/* Tech badge kicker */}
          <span className="inline-flex items-center gap-2 px-4 py-1.5 border border-accent-mint/20 bg-accent-mint/5 rounded-full text-xs font-bold tracking-widest uppercase text-accent-mint mb-8">
            <span className="w-1.5 h-1.5 bg-accent-mint rounded-full animate-ping" />
            SARL d'ingénierie digitale au Bénin
          </span>

          {/* Massive Display Title */}
          <h1 className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-text-bright leading-[0.9] tracking-tighter mb-8">
            Système robuste.<br />
            <span className="font-editorial italic font-light text-accent-mint pr-3">Design premium.</span><br />
            Impact mesurable.
          </h1>

          {/* Clean Description */}
          <motion.p
            className="text-text-muted text-base sm:text-lg md:text-xl font-medium max-w-2xl leading-relaxed mb-8"
            {...(reduce ? { initial: { opacity: 1 }, whileInView: { opacity: 1 }, transition: { duration: 0 } } : fadeIn(0.12, 0.6))}
          >
            Excellence Team accompagne les entreprises et institutions avec une
            exécution complète : architecture logicielle, cybersécurité,
            infrastructure cloud et expériences web haut de gamme.
          </motion.p>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-2.5 mb-10" aria-label="Éléments de confiance">
            {[
              "Équipe pluridisciplinaire",
              "Exécution de bout en bout",
              "Réponse initiale sous 24h"
            ].map((text, idx) => (
              <span key={idx} className="px-4 py-2 bg-surface-card border border-white/5 rounded-full text-xs font-bold text-text-bright/80 tracking-wide">
                {text}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-4 items-center w-full sm:w-auto">
            <Link to="/contact" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 py-4 bg-accent-mint hover:bg-emerald-400 text-bg-ink font-bold tracking-widest uppercase rounded-full cursor-pointer transition-all duration-300 shadow-glow-mint">
                Démarrer un projet
              </button>
            </Link>
            <Link to="/works" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 py-4 border border-white/10 hover:border-accent-mint bg-transparent hover:bg-accent-mint/5 text-text-bright hover:text-accent-mint font-bold tracking-widest uppercase rounded-full cursor-pointer transition-all duration-300">
                Voir nos réalisations
              </button>
            </Link>
          </div>

        </motion.div>

        {/* Right Dashboard panel */}
        <div className="lg:col-span-6 relative w-full flex items-center justify-center lg:justify-end">
          <SystemDashboard />
        </div>

      </div>
    </motion.section>
  );
}

export default Hero;
