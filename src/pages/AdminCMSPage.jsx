import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Configuration for editable JSON files with human-readable labels
const CMS_FILES = [
  { file: "hero.json", label: "Page d'Accueil : Hero", category: "Accueil" },
  { file: "about.json", label: "Page d'Accueil : À Propos", category: "Accueil" },
  { file: "services.json", label: "Page d'Accueil : Services", category: "Accueil" },
  { file: "works_section.json", label: "Page d'Accueil : Réalisations", category: "Accueil" },
  { file: "testimonials.json", label: "Page d'Accueil : Témoignages", category: "Accueil" },
  { file: "pricing.json", label: "Page d'Accueil : Tarifs", category: "Accueil" },
  { file: "faq.json", label: "Page d'Accueil : FAQ", category: "Accueil" },
  { file: "team.json", label: "Page d'Accueil : Équipe", category: "Accueil" },
  { file: "blog.json", label: "Articles de Blog (BlogPage)", category: "Contenu" },
  { file: "works.json", label: "Portfolio Complet (WorksPage)", category: "Contenu" },
  { file: "contact.json", label: "Page de Contact", category: "Pages" },
  { file: "terms.json", label: "Mentions & CGU", category: "Légal" },
  { file: "privacy.json", label: "Politique de Confidentialité", category: "Légal" }
];

export default function AdminCMSPage() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(CMS_FILES[0]);
  const [jsonData, setJsonData] = useState(null);
  const [rawText, setRawText] = useState("");
  const [editMode, setEditMode] = useState("form"); // "form" | "json"
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null); // "success" | "download"
  const [isModified, setIsModified] = useState(false);

  // Load JSON file contents
  const loadFile = async (fileObj) => {
    setLoading(true);
    try {
      // Fetch from API (Vite Dev Server API custom plugin)
      const res = await fetch(`/api/cms?file=${fileObj.file}`);
      if (res.ok) {
        const data = await res.json();
        setJsonData(data);
        setRawText(JSON.stringify(data, null, 2));
      } else {
        // Fallback for production (read static imports from memory or fetch public directory)
        // Since we import json in standard code, in prod we can load default static mock values
        const fallbackRes = await fetch(`/src/data/${fileObj.file}`);
        if (fallbackRes.ok) {
          const data = await fallbackRes.json();
          setJsonData(data);
          setRawText(JSON.stringify(data, null, 2));
        } else {
          showToast("Erreur lors du chargement du fichier JSON.", "error");
        }
      }
    } catch (err) {
      // In prod/standalone, try to fetch static paths
      try {
        const fallbackRes = await fetch(`/src/data/${fileObj.file}`);
        if (fallbackRes.ok) {
          const data = await fallbackRes.json();
          setJsonData(data);
          setRawText(JSON.stringify(data, null, 2));
        } else {
          showToast("Impossible de contacter le serveur de développement local.", "error");
        }
      } catch (e) {
        showToast("Erreur de chargement. Lancez le serveur local en mode développement.", "error");
      }
    } finally {
      setLoading(false);
      setIsModified(false);
    }
  };

  useEffect(() => {
    loadFile(selectedFile);
  }, [selectedFile]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Synchronize dynamic form edits back to the rawText string
  const updateJsonDataState = (newData) => {
    setJsonData(newData);
    setRawText(JSON.stringify(newData, null, 2));
    setIsModified(true);
  };

  // Save changes to disk or show fallback modal
  const handleSave = async () => {
    let parsedData = null;
    if (editMode === "json") {
      try {
        parsedData = JSON.parse(rawText);
        setJsonData(parsedData);
      } catch (err) {
        showToast("Format JSON invalide. Veuillez corriger les erreurs de syntaxe.", "error");
        return;
      }
    } else {
      parsedData = jsonData;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/cms?file=${selectedFile.file}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedData, null, 2)
      });

      if (res.ok) {
        showToast("Fichier enregistré directement sur le disque local !", "success");
        setIsModified(false);
      } else {
        // Dev server failed or read-only (production deployment)
        setModalType("download");
        setShowModal(true);
      }
    } catch (err) {
      // Fail -> Production/offline fallback
      setModalType("download");
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  // Download modified JSON
  const handleDownload = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(jsonData || JSON.parse(rawText), null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", selectedFile.file);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("Téléchargement lancé.", "success");
  };

  // Copy to clipboard
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(rawText);
    showToast("Contenu JSON copié dans le presse-papiers !", "success");
  };

  // Reset/revert changes
  const handleReset = () => {
    if (window.confirm("Êtes-vous sûr de vouloir annuler vos modifications non enregistrées ?")) {
      loadFile(selectedFile);
    }
  };

  // Filtered file list
  const filteredFiles = CMS_FILES.filter(
    f => f.label.toLowerCase().includes(searchTerm.toLowerCase()) || 
         f.file.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Dynamic Form Field Renderer
  const renderField = (key, value, path = "") => {
    const fieldId = path ? `${path}.${key}` : key;
    const isImage = typeof value === "string" && (value.startsWith("http") || value.endsWith(".png") || value.endsWith(".jpg") || value.endsWith(".webp") || value.endsWith(".avif"));
    const isLongText = typeof value === "string" && (value.length > 70 || value.includes("\n"));

    const handleFieldChange = (newValue) => {
      const updated = { ...jsonData };
      
      // Navigate to correct nested field path
      const pathParts = fieldId.split(".");
      let current = updated;
      for (let i = 0; i < pathParts.length - 1; i++) {
        current = current[pathParts[i]];
      }
      current[pathParts[pathParts.length - 1]] = newValue;
      
      updateJsonDataState(updated);
    };

    if (value === null) return null;

    if (typeof value === "object" && !Array.isArray(value)) {
      // Nested Object
      return (
        <div key={fieldId} className="border border-white/5 bg-[#0e1110] rounded-2xl p-6 mb-6">
          <span className="text-xs font-bold text-accent-mint uppercase tracking-widest block mb-4">
            Groupe : {key.toUpperCase()}
          </span>
          <div className="flex flex-col gap-4">
            {Object.keys(value).map(subKey => renderField(subKey, value[subKey], fieldId))}
          </div>
        </div>
      );
    }

    if (Array.isArray(value)) {
      // Array Editor
      return (
        <div key={fieldId} className="border border-white/5 bg-[#0a0c0b] rounded-2xl p-6 mb-6">
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/5">
            <span className="text-sm font-black text-text-bright uppercase tracking-wider">
              {key} ({value.length} éléments)
            </span>
            <button
              onClick={() => {
                const updated = { ...jsonData };
                const pathParts = fieldId.split(".");
                let current = updated;
                for (let i = 0; i < pathParts.length - 1; i++) {
                  current = current[pathParts[i]];
                }
                const arr = current[pathParts[pathParts.length - 1]];
                
                // Construct structure template based on first item
                let template = "";
                if (arr.length > 0) {
                  const first = arr[0];
                  if (typeof first === "object" && first !== null) {
                    template = JSON.parse(JSON.stringify(first)); // deep clone
                    // Clear values
                    Object.keys(template).forEach(tk => {
                      if (typeof template[tk] === "string") template[tk] = "Nouveau texte";
                      else if (typeof template[tk] === "number") template[tk] = 0;
                      else if (Array.isArray(template[tk])) template[tk] = [];
                    });
                    if (template.id) template.id = `item_${Date.now()}`;
                  } else {
                    template = "Nouvel élément";
                  }
                } else {
                  template = "Nouvel élément";
                }
                current[pathParts[pathParts.length - 1]] = [...arr, template];
                updateJsonDataState(updated);
              }}
              className="px-3 py-1.5 bg-accent-mint/10 hover:bg-accent-mint text-accent-mint hover:text-bg-ink text-[0.7rem] font-bold tracking-widest uppercase rounded-lg transition-all"
            >
              + Ajouter
            </button>
          </div>

          <div className="flex flex-col gap-6">
            {value.map((item, idx) => {
              const itemPath = `${fieldId}.${idx}`;
              return (
                <div key={idx} className="relative p-5 bg-[#0e1110] border border-white/5 rounded-xl group/arr">
                  <div className="absolute top-4 right-4 flex gap-2 opacity-30 group-hover/arr:opacity-100 transition-opacity">
                    <button
                      onClick={() => {
                        const updated = { ...jsonData };
                        const pathParts = fieldId.split(".");
                        let current = updated;
                        for (let i = 0; i < pathParts.length - 1; i++) {
                          current = current[pathParts[i]];
                        }
                        const arr = current[pathParts[pathParts.length - 1]];
                        const nextArr = [...arr];
                        nextArr.splice(idx, 1);
                        current[pathParts[pathParts.length - 1]] = nextArr;
                        updateJsonDataState(updated);
                      }}
                      className="px-2 py-1 bg-red-950/40 hover:bg-red-900 border border-red-500/20 text-red-400 rounded-md text-[0.62rem] font-bold tracking-wider uppercase transition-all"
                    >
                      Supprimer
                    </button>
                  </div>
                  
                  <span className="block text-xs font-semibold text-text-muted mb-3 uppercase tracking-wider">
                    Élément #{idx + 1}
                  </span>

                  {typeof item === "object" && item !== null ? (
                    <div className="flex flex-col gap-4 mt-2">
                      {Object.keys(item).map(subKey => renderField(subKey, item[subKey], itemPath))}
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => {
                          const updated = { ...jsonData };
                          const pathParts = fieldId.split(".");
                          let current = updated;
                          for (let i = 0; i < pathParts.length - 1; i++) {
                            current = current[pathParts[i]];
                          }
                          current[pathParts[pathParts.length - 1]][idx] = e.target.value;
                          updateJsonDataState(updated);
                        }}
                        className="w-full px-4 py-2.5 bg-bg-ink border border-white/10 rounded-lg text-text-bright text-sm focus:border-accent-mint/50 focus:outline-none transition-colors"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    // Single Primitive Inputs
    return (
      <div key={fieldId} className="flex flex-col gap-2 mb-4 w-full">
        <label className="text-xs font-bold text-text-bright uppercase tracking-wider">
          {key.replace(/([A-Z])/g, " $1")}
        </label>
        
        {isLongText ? (
          <textarea
            value={value}
            rows={4}
            onChange={(e) => handleFieldChange(e.target.value)}
            className="w-full px-4 py-3 bg-bg-ink border border-white/10 rounded-xl text-text-bright text-sm focus:border-accent-mint/50 focus:outline-none transition-colors leading-relaxed"
          />
        ) : typeof value === "boolean" ? (
          <label className="flex items-center gap-3 cursor-pointer py-1">
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => handleFieldChange(e.target.checked)}
              className="accent-accent-mint w-4 h-4"
            />
            <span className="text-sm text-text-muted">Activé</span>
          </label>
        ) : typeof value === "number" ? (
          <input
            type="number"
            value={value}
            onChange={(e) => handleFieldChange(Number(e.target.value))}
            className="w-full max-w-[200px] px-4 py-2.5 bg-bg-ink border border-white/10 rounded-lg text-text-bright text-sm focus:border-accent-mint/50 focus:outline-none transition-colors"
          />
        ) : (
          <div className="flex flex-col gap-2 w-full">
            <input
              type="text"
              value={value}
              onChange={(e) => handleFieldChange(e.target.value)}
              className="w-full px-4 py-2.5 bg-bg-ink border border-white/10 rounded-lg text-text-bright text-sm focus:border-accent-mint/50 focus:outline-none transition-colors"
            />
            {isImage && (
              <div className="mt-2 flex items-center gap-4">
                <div className="w-16 h-12 rounded-lg border border-white/10 overflow-hidden bg-black flex-shrink-0">
                  <img src={value} alt="Preview" className="w-full h-full object-cover" />
                </div>
                <span className="text-[0.65rem] text-text-muted font-mono truncate max-w-md">{value}</span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="vignette-blur-bottom" />
      <div className="noise-overlay opacity-30" />

      <main className="relative bg-bg-ink min-h-screen text-text-muted z-10 font-sans flex flex-col">
        {/* Cyberpunk Top Bar */}
        <header className="h-16 border-b border-white/5 bg-[#0a0c0b]/90 backdrop-blur-md flex items-center justify-between px-6 z-20">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-text-bright hover:text-accent-mint transition-colors">
              <span className="text-lg">←</span>
              <span className="font-display font-black tracking-widest text-xs uppercase">Retour au Site</span>
            </Link>
            <span className="h-4 w-[1px] bg-white/10" />
            <h1 className="font-display font-black text-sm text-text-bright tracking-wider uppercase">
              Excellence CMS <span className="font-editorial text-accent-gold text-xs italic lowercase">backoffice</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              disabled={!isModified || loading}
              className="px-4 py-2 border border-white/5 hover:border-white/20 hover:bg-white/5 text-text-bright text-xs font-bold tracking-widest uppercase rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              Annuler
            </button>
            
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-5 py-2 bg-accent-mint hover:bg-emerald-400 text-bg-ink text-xs font-bold tracking-widest uppercase rounded-lg shadow-glow-mint disabled:opacity-50 transition-all flex items-center gap-2"
            >
              {loading ? (
                <div className="w-3.5 h-3.5 border-2 border-bg-ink border-t-transparent rounded-full animate-spin" />
              ) : null}
              <span>Enregistrer</span>
            </button>
          </div>
        </header>

        {/* CMS Workspace */}
        <div className="flex flex-1 overflow-hidden h-[calc(100vh-64px)]">
          {/* Sidebar */}
          <aside className="w-80 bg-[#0a0c0b]/50 border-r border-white/5 flex flex-col p-6 gap-6 z-10">
            <div>
              <label className="text-[0.62rem] font-bold text-accent-mint tracking-[0.2em] uppercase block mb-2">
                Rechercher une section
              </label>
              <input
                type="text"
                placeholder="Filtrer les pages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-bg-ink border border-white/10 rounded-lg text-text-bright text-xs focus:border-accent-mint/50 focus:outline-none transition-colors"
              />
            </div>

            <div className="flex-1 overflow-y-auto flex flex-col gap-6 pr-1 custom-scrollbar">
              {["Accueil", "Contenu", "Pages", "Légal"].map(category => {
                const catFiles = filteredFiles.filter(f => f.category === category);
                if (catFiles.length === 0) return null;
                return (
                  <div key={category} className="flex flex-col gap-2">
                    <span className="text-[0.65rem] font-bold text-text-muted/60 tracking-widest uppercase block mb-1">
                      {category}
                    </span>
                    <div className="flex flex-col gap-1">
                      {catFiles.map(fileObj => (
                        <button
                          key={fileObj.file}
                          onClick={() => setSelectedFile(fileObj)}
                          className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold tracking-wide border transition-all ${
                            selectedFile.file === fileObj.file
                              ? "bg-accent-mint/10 border-accent-mint/30 text-accent-mint shadow-soft"
                              : "bg-transparent border-transparent text-text-muted hover:bg-white/5 hover:text-text-bright"
                          }`}
                        >
                          {fileObj.label}
                          <span className="block text-[0.62rem] font-mono text-text-muted/40 mt-1 uppercase">
                            {fileObj.file}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>

          {/* Main workspace */}
          <section className="flex-1 flex flex-col bg-[#070908]/90 overflow-hidden relative">
            <div className="absolute inset-0 blueprint-grid opacity-5 pointer-events-none" />

            {/* Toggle Editor Mode */}
            <div className="h-14 border-b border-white/5 flex items-center justify-between px-8 bg-[#0a0c0b]/30 z-10">
              <div className="flex items-center gap-3">
                <span className="text-xs font-black text-text-bright uppercase tracking-wider">
                  {selectedFile.label}
                </span>
                <span className="text-[0.68rem] font-mono bg-white/5 text-text-muted/80 px-2 py-0.5 rounded border border-white/5">
                  src/data/{selectedFile.file}
                </span>
              </div>

              <div className="flex bg-[#0a0c0b] p-0.5 border border-white/10 rounded-lg">
                <button
                  onClick={() => setEditMode("form")}
                  className={`px-3 py-1.5 rounded-md text-[0.68rem] font-bold tracking-wider uppercase transition-all ${
                    editMode === "form"
                      ? "bg-accent-mint text-bg-ink"
                      : "text-text-muted hover:text-text-bright"
                  }`}
                >
                  Formulaire
                </button>
                <button
                  onClick={() => setEditMode("json")}
                  className={`px-3 py-1.5 rounded-md text-[0.68rem] font-bold tracking-wider uppercase transition-all ${
                    editMode === "json"
                      ? "bg-accent-mint text-bg-ink"
                      : "text-text-muted hover:text-text-bright"
                  }`}
                >
                  Code JSON
                </button>
              </div>
            </div>

            {/* Editor Container */}
            <div className="flex-1 overflow-y-auto p-8 relative z-10 custom-scrollbar">
              {loading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-bg-ink/80">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-accent-mint border-t-transparent rounded-full animate-spin shadow-glow-mint" />
                    <span className="text-xs font-bold text-accent-mint tracking-widest uppercase">Chargement...</span>
                  </div>
                </div>
              ) : editMode === "form" ? (
                <div className="max-w-3xl mx-auto flex flex-col">
                  {jsonData && Object.keys(jsonData).map(key => renderField(key, jsonData[key]))}
                </div>
              ) : (
                <div className="max-w-4xl mx-auto h-full flex flex-col gap-4">
                  <div className="flex justify-between items-center bg-[#0a0c0b] p-3 border border-white/5 rounded-t-xl">
                    <span className="text-[0.65rem] font-bold text-accent-mint tracking-wider uppercase">
                      Éditeur JSON Interactif
                    </span>
                    <button
                      onClick={handleCopyToClipboard}
                      className="px-2.5 py-1 hover:bg-white/5 border border-white/10 hover:border-white/20 text-[0.65rem] font-bold tracking-wide uppercase rounded text-text-bright transition-all"
                    >
                      Copier
                    </button>
                  </div>
                  <textarea
                    value={rawText}
                    onChange={(e) => {
                      setRawText(e.target.value);
                      setIsModified(true);
                    }}
                    className="w-full flex-1 min-h-[500px] p-6 bg-black border-x border-b border-white/5 rounded-b-xl text-accent-mint font-mono text-xs focus:outline-none focus:border-accent-mint/30 leading-relaxed custom-scrollbar"
                    style={{ tabSize: 2, resize: "none" }}
                  />
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      {/* Dynamic Fallback Modal for production deployment */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
            />
            
            <motion.div
              className="relative bg-surface-card border border-white/10 p-8 rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              {/* Glow light effect inside modal */}
              <div className="absolute -top-20 -left-20 w-48 h-48 bg-accent-gold/10 blur-[80px] rounded-full" />
              
              <h3 className="font-display font-black text-2xl text-text-bright mb-4 flex items-center gap-3">
                <span className="text-accent-gold">⚠</span> 
                {modalType === "download" ? "Enregistrement non-direct" : "Opération réussie"}
              </h3>
              
              <p className="text-sm text-text-muted leading-relaxed mb-6">
                Le site est actuellement hébergé sur un serveur distant (ou en mode production). L'accès en écriture directe au disque local n'est pas possible.
                <br /><br />
                Veuillez télécharger le fichier JSON mis à jour ou le copier pour écraser manuellement le fichier <span className="font-mono bg-white/5 text-accent-mint px-1.5 py-0.5 rounded text-xs">src/data/{selectedFile.file}</span> dans votre projet local.
              </p>

              <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 border border-white/5 hover:border-white/15 hover:bg-white/5 text-text-bright text-xs font-bold tracking-widest uppercase rounded-lg transition-all"
                >
                  Fermer
                </button>
                <button
                  onClick={() => {
                    handleCopyToClipboard();
                    setShowModal(false);
                  }}
                  className="px-5 py-2.5 bg-accent-mint/10 border border-accent-mint/20 hover:bg-accent-mint text-accent-mint hover:text-bg-ink text-xs font-bold tracking-widest uppercase rounded-lg transition-all"
                >
                  Copier le code
                </button>
                <button
                  onClick={() => {
                    handleDownload();
                    setShowModal(false);
                  }}
                  className="px-5 py-2.5 bg-accent-mint hover:bg-emerald-400 text-bg-ink text-xs font-bold tracking-widest uppercase rounded-lg shadow-glow-mint transition-all"
                >
                  Télécharger le JSON
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Global CSS Toast Notifications */}
      <AnimatePresence>
        {toast && (
          <motion.div
            className={`fixed bottom-6 right-6 z-[110] px-5 py-3.5 rounded-xl border shadow-lg text-xs font-bold tracking-widest uppercase flex items-center gap-3 ${
              toast.type === "error"
                ? "bg-red-950/90 border-red-500/30 text-red-300"
                : "bg-surface-card/90 border-accent-mint/30 text-accent-mint"
            }`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
          >
            <span>{toast.type === "error" ? "✕" : "✓"}</span>
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
