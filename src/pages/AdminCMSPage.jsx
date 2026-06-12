import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Folder, 
  Search, 
  Trash2, 
  Plus, 
  RotateCcw, 
  Save, 
  Check, 
  ExternalLink, 
  FileJson, 
  User, 
  Calendar, 
  Link as LinkIcon, 
  Image as ImageIcon, 
  Eye, 
  Layout, 
  ChevronRight, 
  ArrowLeft,
  Grid,
  Settings,
  ShieldAlert,
  AlignLeft,
  X,
  Sparkles,
  Info,
  CheckCircle,
  FileText
} from "lucide-react";

// List of available files in the CMS
const CMS_FILES = [
  { file: "hero.json", label: "Page d'Accueil : Hero", category: "Accueil", description: "Titre principal, accroche et lueur d'ambiance de la page d'accueil." },
  { file: "about.json", label: "Page d'Accueil : À Propos", category: "Accueil", description: "Texte de présentation générale d'Excellence Team." },
  { file: "services.json", label: "Page d'Accueil : Services", category: "Accueil", description: "Liste des expertises, checklists et mockups associés." },
  { file: "works_section.json", label: "Page d'Accueil : Réalisations", category: "Accueil", description: "Projets mis en avant et accordéons de la page d'accueil." },
  { file: "testimonials.json", label: "Page d'Accueil : Témoignages", category: "Accueil", description: "Citations de nos partenaires et images de profil." },
  { file: "pricing.json", label: "Page d'Accueil : Tarifs", category: "Accueil", description: "Grilles tarifaires pour nos prestations clés." },
  { file: "faq.json", label: "Page d'Accueil : FAQ", category: "Accueil", description: "Questions fréquemment posées de la section FAQ." },
  { file: "team.json", label: "Page d'Accueil : Équipe", category: "Accueil", description: "Membres de l'équipe, rôles, citations et liens." },
  { file: "blog.json", label: "Articles de Blog", category: "Contenu", description: "Liste complète des articles de blog publiées." },
  { file: "works.json", label: "Portfolio Complet", category: "Contenu", description: "Projets complets affichés sur la page Nos Réalisations." },
  { file: "contact.json", label: "Page de Contact", category: "Pages", description: "Coordonnées de l'agence, adresses et liens sociaux." },
  { file: "terms.json", label: "Mentions & CGU", category: "Légal", description: "Mentions légales et conditions d'utilisation." },
  { file: "privacy.json", label: "Confidentialité", category: "Légal", description: "Politique de confidentialité de l'agence." }
];

// Local assets catalog for the media selector
const MEDIA_ASSETS = [
  { name: "Academix Mockup", path: "https://res.cloudinary.com/dla8wr5qj/image/upload/v1775955345/academix_fn4oat.png", type: "mockup" },
  { name: "Le TWIN Mockup", path: "https://res.cloudinary.com/dla8wr5qj/image/upload/v1773366626/WhatsApp_Image_2026-02-07_at_13.55.04_jb8uve.jpg", type: "mockup" },
  { name: "Fieri Research Mockup", path: "https://res.cloudinary.com/dla8wr5qj/image/upload/v1775955620/fieri_pjxyof.webp", type: "mockup" },
  { name: "La Nuit du Cœur Mockup", path: "https://res.cloudinary.com/dla8wr5qj/image/upload/v1775955767/nuit_de_coeur_jx18zr.avif", type: "mockup" },
  { name: "Mourchid FOLARIN (Équipe)", path: "https://res.cloudinary.com/dla8wr5qj/image/upload/v1781228322/224025435_j7qhdz_szccjx.webp", type: "portrait" },
  { name: "Octave BAHOUN-HOUTOUKPE (Équipe)", path: "https://res.cloudinary.com/dla8wr5qj/image/upload/v1781010145/octave_j928uo.webp", type: "portrait" },
  { name: "Ezechiel TADAGBE (Équipe)", path: "https://res.cloudinary.com/dla8wr5qj/image/upload/v1781228322/ezedev_ycavef_ztuq1a.webp", type: "portrait" },
  { name: "Wasfade TONOUKOIN (Équipe)", path: "https://res.cloudinary.com/dla8wr5qj/image/upload/v1781228322/wafade_iajqor_hmdpsn.webp", type: "portrait" },
  { name: "Cosme MISSIKPODE (Équipe)", path: "https://res.cloudinary.com/dla8wr5qj/image/upload/v1781228322/cosme_csvugm_yf4nvs.webp", type: "portrait" },
  { name: "Mechack HOUNKPATIN (TWIN)", path: "https://res.cloudinary.com/dla8wr5qj/image/upload/v1781228469/mechak_ae5grq.webp", type: "portrait" },
  { name: "Bespoke Butcher Mockup", path: "https://res.cloudinary.com/dla8wr5qj/image/upload/v1775956049/ingi%C3%A9nerie_ylf4x3.webp", type: "mockup" },
  { name: "Cybersécurité Concept", path: "https://res.cloudinary.com/dla8wr5qj/image/upload/v1775956328/cybers%C3%A9curit%C3%A9_kao6kb.avif", type: "concept" },
  { name: "Réseau & DevOps Concept", path: "https://res.cloudinary.com/dla8wr5qj/image/upload/v1775956409/reseau_eiltf5.webp", type: "concept" },
  { name: "Design & Motion Concept", path: "https://res.cloudinary.com/dla8wr5qj/image/upload/v1775956474/motion_qg16k4.avif", type: "concept" }
];

export default function AdminCMSPage() {
  const [selectedFile, setSelectedFile] = useState(CMS_FILES[0]);
  const [jsonData, setJsonData] = useState(null);
  const [rawText, setRawText] = useState("");
  const [editMode, setEditMode] = useState("form"); // "form" | "json"
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null); // "success" | "download" | "media"
  const [isModified, setIsModified] = useState(false);
  const [currentMediaField, setCurrentMediaField] = useState(null); // tracking active field for media selection
  
  // Track active sub-elements for arrays to focus editing
  const [activeArrayIndexes, setActiveArrayIndexes] = useState({}); // { fieldPath: activeIndex }

  // Load JSON file
  const loadFile = async (fileObj) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/cms?file=${fileObj.file}`);
      if (res.ok) {
        const data = await res.json();
        setJsonData(data);
        setRawText(JSON.stringify(data, null, 2));
      } else {
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
      try {
        const fallbackRes = await fetch(`/src/data/${fileObj.file}`);
        if (fallbackRes.ok) {
          const data = await fallbackRes.json();
          setJsonData(data);
          setRawText(JSON.stringify(data, null, 2));
        } else {
          showToast("Impossible de charger les données locales.", "error");
        }
      } catch (e) {
        showToast("Erreur. Veuillez lancer en mode dev.", "error");
      }
    } finally {
      setLoading(false);
      setIsModified(false);
      setActiveArrayIndexes({}); // reset array focus tabs
    }
  };

  useEffect(() => {
    loadFile(selectedFile);
  }, [selectedFile]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const updateJsonDataState = (newData) => {
    setJsonData(newData);
    setRawText(JSON.stringify(newData, null, 2));
    setIsModified(true);
  };

  const handleSave = async () => {
    let parsedData = null;
    if (editMode === "json") {
      try {
        parsedData = JSON.parse(rawText);
        setJsonData(parsedData);
      } catch (err) {
        showToast("Format JSON invalide.", "error");
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
        showToast("Modifications enregistrées avec succès !", "success");
        setIsModified(false);
      } else {
        setModalType("download");
        setShowModal(true);
      }
    } catch (err) {
      setModalType("download");
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(jsonData || JSON.parse(rawText), null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", selectedFile.file);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("Fichier téléchargé.", "success");
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(rawText);
    showToast("JSON copié !", "success");
  };

  const handleReset = () => {
    if (window.confirm("Annuler toutes les modifications non sauvegardées ?")) {
      loadFile(selectedFile);
    }
  };

  // Open Media Library Drawer
  const openMediaLibrary = (fieldPath) => {
    setCurrentMediaField(fieldPath);
    setModalType("media");
    setShowModal(true);
  };

  // Select Media
  const handleSelectMedia = (path) => {
    if (!currentMediaField) return;
    
    const updated = { ...jsonData };
    const pathParts = currentMediaField.split(".");
    let current = updated;
    
    for (let i = 0; i < pathParts.length - 1; i++) {
      current = current[pathParts[i]];
    }
    current[pathParts[pathParts.length - 1]] = path;
    
    updateJsonDataState(updated);
    setShowModal(false);
    setCurrentMediaField(null);
    showToast("Image mise à jour depuis la médiathèque !");
  };

  // Filtered files list
  const filteredFiles = CMS_FILES.filter(
    f => f.label.toLowerCase().includes(searchTerm.toLowerCase()) || 
         f.file.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Advanced Accessible Form Fields Renderer
  const renderField = (key, value, path = "") => {
    const fieldId = path ? `${path}.${key}` : key;
    const isImage = typeof value === "string" && (value.startsWith("http") || value.endsWith(".png") || value.endsWith(".jpg") || value.endsWith(".webp") || value.endsWith(".avif"));
    const isLongText = typeof value === "string" && (value.length > 75 || value.includes("\n"));
    const isUrl = typeof value === "string" && (value.startsWith("http") || value.startsWith("/") || value.startsWith("#")) && !isImage;

    const handleFieldChange = (newValue) => {
      const updated = { ...jsonData };
      const pathParts = fieldId.split(".");
      let current = updated;
      for (let i = 0; i < pathParts.length - 1; i++) {
        current = current[pathParts[i]];
      }
      current[pathParts[pathParts.length - 1]] = newValue;
      updateJsonDataState(updated);
    };

    if (value === null) return null;

    // 1. NESTED OBJECT LAYOUT (Sub-groups like intro, categories)
    if (typeof value === "object" && !Array.isArray(value)) {
      return (
        <div key={fieldId} className="border border-white/5 bg-[#0e1110]/80 rounded-2xl p-6 mb-8 hover:border-white/10 transition-colors">
          <div className="flex items-center gap-2 mb-4">
            <span className="p-1.5 bg-accent-mint/10 rounded-lg text-accent-mint">
              <Layout className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold text-accent-mint uppercase tracking-widest block">
              SECTION : {key.toUpperCase().replace(/_/g, " ")}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(value).map(subKey => (
              <div key={subKey} className="col-span-2 md:col-span-2">
                {renderField(subKey, value[subKey], fieldId)}
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 2. NESTED ARRAY LAYOUT (Lists like testimonials, team members, services, etc.)
    if (Array.isArray(value)) {
      const activeIdx = activeArrayIndexes[fieldId] || 0;
      
      const handleAddArrayItem = () => {
        const updated = { ...jsonData };
        const pathParts = fieldId.split(".");
        let current = updated;
        for (let i = 0; i < pathParts.length - 1; i++) {
          current = current[pathParts[i]];
        }
        const arr = current[pathParts[pathParts.length - 1]];
        
        let template = "";
        if (arr.length > 0) {
          template = JSON.parse(JSON.stringify(arr[0])); // deep clone structure
          Object.keys(template).forEach(tk => {
            if (typeof template[tk] === "string") template[tk] = "";
            else if (typeof template[tk] === "number") template[tk] = 0;
            else if (Array.isArray(template[tk])) template[tk] = [];
          });
          if (template.id) template.id = `item_${Date.now()}`;
          if (template.num) template.num = String(arr.length + 1).padStart(2, "0");
        } else {
          template = { title: "Nouveau titre", description: "Nouvelle description" };
        }
        
        current[pathParts[pathParts.length - 1]] = [...arr, template];
        updateJsonDataState(updated);
        
        // Select newly added item tab
        setActiveArrayIndexes({
          ...activeArrayIndexes,
          [fieldId]: arr.length
        });
      };

      const handleRemoveArrayItem = (idx) => {
        if (!window.confirm("Voulez-vous vraiment supprimer cet élément ?")) return;
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
        
        // Adjust focus tab index
        const nextIdx = Math.max(0, activeIdx - 1);
        setActiveArrayIndexes({
          ...activeArrayIndexes,
          [fieldId]: nextIdx
        });
      };

      return (
        <div key={fieldId} className="border border-white/5 bg-[#0a0c0b] rounded-2xl p-6 mb-8 hover:border-white/10 transition-all">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6 pb-4 border-b border-white/5">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-accent-mint/10 rounded-lg text-accent-mint">
                <Grid className="w-4 h-4" />
              </span>
              <span className="text-sm font-black text-text-bright uppercase tracking-wider">
                {key.replace(/_/g, " ")} ({value.length} éléments)
              </span>
            </div>
            <button
              onClick={handleAddArrayItem}
              className="self-start px-3 py-1.5 bg-accent-mint/10 hover:bg-accent-mint text-accent-mint hover:text-bg-ink text-[0.7rem] font-bold tracking-widest uppercase rounded-lg transition-all flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              Ajouter un élément
            </button>
          </div>

          {value.length === 0 ? (
            <div className="py-8 text-center text-xs text-text-muted/50 font-mono">
              Aucun élément dans cette liste. Cliquez sur "Ajouter" pour commencer.
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Tab selector bar */}
              <div className="w-full lg:w-1/4 flex lg:flex-col overflow-x-auto lg:overflow-x-visible gap-1 pb-2 lg:pb-0 border-b lg:border-b-0 lg:border-r border-white/5 pr-0 lg:pr-4">
                {value.map((item, idx) => {
                  const label = item?.title || item?.name || item?.question || `Élément #${idx + 1}`;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveArrayIndexes({ ...activeArrayIndexes, [fieldId]: idx })}
                      className={`px-4 py-2.5 rounded-xl text-left text-xs font-bold tracking-wide transition-all truncate border flex-shrink-0 flex items-center justify-between gap-2 ${
                        activeIdx === idx
                          ? "bg-accent-mint/10 border-accent-mint/20 text-accent-mint shadow-inner"
                          : "bg-transparent border-transparent text-text-muted hover:bg-white/5 hover:text-text-bright"
                      }`}
                    >
                      <span className="truncate flex items-center gap-2">
                        <span className="font-mono text-[0.65rem] text-accent-mint/50">{(idx + 1).toString().padStart(2, "0")}</span>
                        {label}
                      </span>
                      <ChevronRight className={`w-3 h-3 text-accent-mint/40 hidden lg:block transition-transform ${activeIdx === idx ? "translate-x-0.5" : ""}`} />
                    </button>
                  );
                })}
              </div>

              {/* Form focused array element */}
              <div className="w-full lg:w-3/4 bg-[#0e1110]/50 rounded-2xl p-6 relative border border-white/5">
                <div className="absolute top-4 right-4 z-10">
                  <button
                    onClick={() => handleRemoveArrayItem(activeIdx)}
                    className="px-2.5 py-1.5 bg-red-950/40 hover:bg-red-900 border border-red-500/10 text-red-400 rounded-lg text-[0.62rem] font-bold tracking-widest uppercase transition-all flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Supprimer
                  </button>
                </div>
                
                <span className="block text-xs font-mono font-bold text-accent-mint/50 uppercase tracking-widest mb-4">
                  Détail de l'élément #{activeIdx + 1}
                </span>

                <div className="flex flex-col gap-4 mt-2">
                  {typeof value[activeIdx] === "object" && value[activeIdx] !== null ? (
                    Object.keys(value[activeIdx]).map(subKey => renderField(subKey, value[activeIdx][subKey], `${fieldId}.${activeIdx}`))
                  ) : (
                    <div className="flex flex-col gap-2">
                      <input
                        type="text"
                        value={value[activeIdx]}
                        onChange={(e) => {
                          const updated = { ...jsonData };
                          const pathParts = fieldId.split(".");
                          let current = updated;
                          for (let i = 0; i < pathParts.length - 1; i++) {
                            current = current[pathParts[i]];
                          }
                          current[pathParts[pathParts.length - 1]][activeIdx] = e.target.value;
                          updateJsonDataState(updated);
                        }}
                        className="w-full px-4 py-3 bg-[#070908] border border-white/10 rounded-xl text-text-bright text-sm focus:border-accent-mint/50 focus:outline-none transition-all"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    // 3. PRIMITIVE FIELD WIDGETS
    return (
      <div key={fieldId} className="flex flex-col gap-2.5 mb-5 w-full">
        <label className="text-[0.68rem] font-bold text-text-bright uppercase tracking-wider flex items-center gap-1.5">
          <span>{key.replace(/([A-Z])/g, " $1").replace(/_/g, " ")}</span>
          <span className="text-[0.62rem] font-mono text-text-muted/40 font-normal">({fieldId})</span>
        </label>
        
        {/* A. Long text descriptions (Textarea) */}
        {isLongText ? (
          <div className="relative w-full">
            <textarea
              value={value}
              rows={4}
              onChange={(e) => handleFieldChange(e.target.value)}
              className="w-full px-4 py-3 bg-bg-ink/80 border border-white/10 rounded-xl text-text-bright text-sm focus:border-accent-mint/50 focus:outline-none transition-colors leading-relaxed font-sans"
            />
            <div className="absolute bottom-2 right-3 text-[0.62rem] font-mono text-text-muted/40">
              {value.length} caractères
            </div>
          </div>
        ) : typeof value === "boolean" ? (
          /* B. Boolean/Switch Toggles */
          <label className="flex items-center gap-3 cursor-pointer py-1.5">
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => handleFieldChange(e.target.checked)}
              className="accent-accent-mint w-4.5 h-4.5 rounded cursor-pointer"
            />
            <span className="text-xs font-semibold text-text-muted">Activé dans l'affichage</span>
          </label>
        ) : typeof value === "number" ? (
          /* C. Number selectors */
          <input
            type="number"
            value={value}
            onChange={(e) => handleFieldChange(Number(e.target.value))}
            className="w-full max-w-[200px] px-4 py-2.5 bg-bg-ink/80 border border-white/10 rounded-xl text-text-bright text-sm focus:border-accent-mint/50 focus:outline-none transition-colors"
          />
        ) : isImage ? (
          /* D. Advanced Image Uploader & Media Catalog Selector */
          <div className="flex flex-col gap-3 w-full">
            <div className="flex gap-2 w-full">
              <input
                type="text"
                value={value}
                onChange={(e) => handleFieldChange(e.target.value)}
                placeholder="Entrez l'URL de l'image ou choisissez en un..."
                className="flex-1 px-4 py-2.5 bg-bg-ink/80 border border-white/10 rounded-xl text-text-bright text-xs font-mono focus:border-accent-mint/50 focus:outline-none transition-colors"
              />
              <button
                onClick={() => openMediaLibrary(fieldId)}
                className="px-4 py-2.5 bg-accent-mint/10 hover:bg-accent-mint text-accent-mint hover:text-bg-ink text-[0.7rem] font-bold tracking-widest uppercase rounded-xl transition-all border border-accent-mint/20 hover:border-transparent flex items-center gap-1.5 flex-shrink-0"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                Médiathèque
              </button>
            </div>
            
            {/* Visual thumbnail preview card inside form */}
            {value && (
              <div className="flex items-center gap-4 p-3 bg-bg-ink/40 border border-white/5 rounded-xl max-w-lg">
                <div className="w-16 h-16 rounded-lg overflow-hidden border border-white/10 bg-black flex-shrink-0 relative group">
                  <img src={value} alt="Aperçu" className="w-full h-full object-cover" />
                  <a 
                    href={value} 
                    target="_blank" 
                    rel="noreferrer"
                    className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-[0.62rem]"
                  >
                    Voir
                  </a>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block text-[0.65rem] text-text-muted/80 font-mono truncate">{value}</span>
                  <span className="block text-[0.6rem] text-accent-mint/60 uppercase font-bold tracking-wider mt-1">Image valide</span>
                </div>
              </div>
            )}
          </div>
        ) : isUrl ? (
          /* E. Link inputs with direct navigation tests */
          <div className="flex gap-2 w-full">
            <input
              type="text"
              value={value}
              onChange={(e) => handleFieldChange(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-bg-ink/80 border border-white/10 rounded-xl text-text-bright text-xs font-mono focus:border-accent-mint/50 focus:outline-none transition-colors"
            />
            {value.startsWith("http") && (
              <a
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-text-bright transition-colors flex items-center justify-center"
                title="Tester le lien dans un nouvel onglet"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        ) : (
          /* F. Default Text field */
          <input
            type="text"
            value={value}
            onChange={(e) => handleFieldChange(e.target.value)}
            className="w-full px-4 py-2.5 bg-bg-ink/80 border border-white/10 rounded-xl text-text-bright text-sm focus:border-accent-mint/50 focus:outline-none transition-colors"
          />
        )}
      </div>
    );
  };

  // Preview panel content matching current selection
  const renderPreview = () => {
    if (!jsonData) return null;

    if (selectedFile.file === "team.json") {
      const activeIdx = activeArrayIndexes["members"] || 0;
      const member = jsonData.members?.[activeIdx];
      if (!member) return null;
      return (
        <div className="p-6 bg-surface-card/40 border border-white/5 rounded-3xl relative overflow-hidden max-w-sm mx-auto">
          <div className="w-32 h-32 rounded-full overflow-hidden mx-auto border border-accent-mint/20 shadow-lg mb-6">
            <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
          </div>
          <h4 className="text-center font-display font-black text-xl text-text-bright">{member.name || "Nouveau membre"}</h4>
          <p className="text-center text-xs text-accent-mint font-semibold uppercase tracking-wider mt-1">{member.role || "Rôle"}</p>
          <span className="block text-center text-[0.65rem] text-text-muted/60 mt-2 font-mono uppercase tracking-wide bg-white/5 py-1 px-3 rounded-full border border-white/5 w-max mx-auto">
            {member.specialty || "Spécialité"}
          </span>
          <p className="text-center text-xs italic text-text-muted mt-6 border-t border-white/5 pt-4">
            "{member.quote || "Citation"}"
          </p>
        </div>
      );
    }

    if (selectedFile.file === "testimonials.json") {
      const activeIdx = activeArrayIndexes["testimonials"] || 0;
      const item = jsonData.testimonials?.[activeIdx];
      if (!item) return null;
      return (
        <div className="p-6 bg-surface-card/40 border border-white/5 rounded-3xl max-w-md mx-auto">
          <span className="text-[0.62rem] font-bold text-accent-mint tracking-widest uppercase bg-white/5 px-3 py-1 rounded-full border border-white/5">
            {item.company || "Partenaire"}
          </span>
          <p className="font-editorial italic text-base text-text-bright mt-4 leading-relaxed">
            "{item.quote || "Votre témoignage ici..."}"
          </p>
          <div className="flex items-center gap-4 mt-6 border-t border-white/5 pt-4">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10">
              <img src={item.image} alt={item.author} className="w-full h-full object-cover" />
            </div>
            <div>
              <strong className="block text-text-bright text-xs">{item.author || "Auteur"}</strong>
              <span className="text-[0.62rem] text-text-muted font-mono uppercase tracking-wider block mt-0.5">{item.role || "Rôle"}</span>
            </div>
          </div>
        </div>
      );
    }

    if (selectedFile.file === "services.json") {
      const activeIdx = activeArrayIndexes["services"] || 0;
      const s = jsonData.services?.[activeIdx];
      if (!s) return null;
      return (
        <div className="p-6 bg-surface-card/30 border border-white/5 rounded-3xl max-w-sm mx-auto overflow-hidden">
          <div className="h-40 relative rounded-2xl overflow-hidden mb-4 border border-white/5">
            <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
            <div className="absolute top-3 left-3 bg-[#0d0f0e]/80 border border-white/5 text-accent-mint text-xs font-bold font-mono px-2 py-0.5 rounded">
              {s.num || "01"}
            </div>
          </div>
          <h4 className="font-display font-black text-lg text-text-bright flex items-center gap-2">
            {s.title || "Titre du service"}
          </h4>
          <p className="text-xs text-text-muted mt-2 leading-relaxed">{s.description || "Description..."}</p>
          <p className="text-xs italic text-accent-mint mt-3 font-editorial">{s.result || "Objectif..."}</p>
        </div>
      );
    }

    // Default general help description for other sections
    return (
      <div className="p-6 border border-white/5 bg-[#0e1110]/20 rounded-3xl text-center max-w-sm mx-auto">
        <Info className="w-8 h-8 text-accent-mint/55 mx-auto mb-3" />
        <h4 className="text-xs font-bold text-text-bright uppercase tracking-wider mb-2">Guide d'édition</h4>
        <p className="text-[0.68rem] text-text-muted leading-relaxed">
          Modifiez le formulaire à gauche. Les changements sont sauvegardés en mémoire temporaire. Cliquez sur le bouton <span className="text-accent-mint font-bold uppercase">Enregistrer</span> en haut à droite pour écrire les données directement dans les fichiers du projet.
        </p>
      </div>
    );
  };

  return (
    <>
      <div className="vignette-blur-bottom" />
      <div className="noise-overlay opacity-30" />

      <main className="relative bg-bg-ink min-h-screen text-text-muted z-10 font-sans flex flex-col">
        {/* Navigation Admin Top Header */}
        <header className="h-16 border-b border-white/5 bg-[#090b0a]/95 backdrop-blur-md flex items-center justify-between px-6 z-20">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-text-bright hover:text-accent-mint transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="font-display font-black tracking-widest text-[0.68rem] uppercase">Retour au Site</span>
            </Link>
            <span className="h-4 w-[1px] bg-white/10" />
            <h1 className="font-display font-black text-xs text-text-bright tracking-wider uppercase flex items-center gap-1.5">
              <span>Excellence CMS</span>
              <span className="font-mono text-[0.55rem] text-[#2cff82] bg-[#2cff82]/5 px-2 py-0.5 rounded border border-[#2cff82]/10 uppercase font-bold tracking-wide">BACKOFFICE ACTIVE</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              disabled={!isModified || loading}
              className="px-4 py-2 border border-white/5 hover:border-white/20 hover:bg-white/5 text-text-bright text-[0.68rem] font-bold tracking-widest uppercase rounded-xl disabled:opacity-20 disabled:cursor-not-allowed transition-all flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Annuler
            </button>
            
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-5 py-2 bg-accent-mint hover:bg-emerald-400 text-bg-ink text-[0.68rem] font-bold tracking-widest uppercase rounded-xl shadow-glow-mint disabled:opacity-50 transition-all flex items-center gap-1.5"
            >
              {loading ? (
                <div className="w-3.5 h-3.5 border-2 border-bg-ink border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save className="w-3.5 h-3.5" />
              )}
              <span>Enregistrer</span>
            </button>
          </div>
        </header>

        {/* CMS Panel Workspace */}
        <div className="flex flex-1 overflow-hidden h-[calc(100vh-64px)]">
          {/* 1. Sidebar Nav Panels */}
          <aside className="w-80 bg-[#080a09]/90 border-r border-white/5 flex flex-col p-5 gap-5 z-10 flex-shrink-0">
            <div>
              <label className="text-[0.6rem] font-bold text-accent-mint tracking-[0.2em] uppercase block mb-2 font-mono">
                Rechercher un Fichier
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 bg-bg-ink border border-white/10 rounded-xl text-text-bright text-xs focus:border-accent-mint/50 focus:outline-none transition-colors"
                />
                <Search className="w-3.5 h-3.5 text-text-muted/40 absolute right-3.5 top-3.5" />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto flex flex-col gap-5 pr-1 custom-scrollbar">
              {["Accueil", "Contenu", "Pages", "Légal"].map(category => {
                const catFiles = filteredFiles.filter(f => f.category === category);
                if (catFiles.length === 0) return null;
                return (
                  <div key={category} className="flex flex-col gap-2">
                    <span className="text-[0.62rem] font-bold text-text-muted/50 tracking-widest uppercase block border-b border-white/5 pb-1">
                      {category}
                    </span>
                    <div className="flex flex-col gap-1">
                      {catFiles.map(fileObj => (
                        <button
                          key={fileObj.file}
                          onClick={() => setSelectedFile(fileObj)}
                          className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold tracking-wide border transition-all ${
                            selectedFile.file === fileObj.file
                              ? "bg-accent-mint/15 border-accent-mint/20 text-accent-mint shadow-inner"
                              : "bg-transparent border-transparent text-text-muted hover:bg-white/5 hover:text-text-bright"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{fileObj.label}</span>
                            {selectedFile.file === fileObj.file && <ChevronRight className="w-3 h-3 text-accent-mint" />}
                          </div>
                          <span className="block text-[0.58rem] font-mono text-text-muted/40 mt-1 uppercase font-semibold">
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

          {/* 2. Central Form Workspace */}
          <section className="flex-1 flex flex-col bg-[#060807]/95 overflow-hidden relative">
            <div className="absolute inset-0 blueprint-grid opacity-5 pointer-events-none" />

            {/* Sub-Header bar */}
            <div className="h-14 border-b border-white/5 flex items-center justify-between px-8 bg-[#0a0c0b]/40 z-10">
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-text-bright uppercase tracking-wider">
                    {selectedFile.label}
                  </span>
                  <span className="text-[0.6rem] font-mono bg-white/5 text-text-muted/70 px-2 py-0.5 rounded border border-white/5">
                    src/data/{selectedFile.file}
                  </span>
                </div>
              </div>

              {/* Mode toggles */}
              <div className="flex bg-[#070908] p-0.5 border border-white/10 rounded-xl">
                <button
                  onClick={() => setEditMode("form")}
                  className={`px-3 py-1.5 rounded-lg text-[0.65rem] font-bold tracking-widest uppercase transition-all flex items-center gap-1 ${
                    editMode === "form"
                      ? "bg-accent-mint text-bg-ink shadow-soft"
                      : "text-text-muted hover:text-text-bright"
                  }`}
                >
                  <Layout className="w-3 h-3" />
                  Formulaire
                </button>
                <button
                  onClick={() => setEditMode("json")}
                  className={`px-3 py-1.5 rounded-lg text-[0.65rem] font-bold tracking-widest uppercase transition-all flex items-center gap-1 ${
                    editMode === "json"
                      ? "bg-accent-mint text-bg-ink shadow-soft"
                      : "text-text-muted hover:text-text-bright"
                  }`}
                >
                  <FileJson className="w-3 h-3" />
                  Code JSON
                </button>
              </div>
            </div>

            {/* Editable Container */}
            <div className="flex-1 overflow-y-auto p-8 relative z-10 custom-scrollbar">
              {loading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-bg-ink/85">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-accent-mint border-t-transparent rounded-full animate-spin shadow-glow-mint" />
                    <span className="text-xs font-bold text-accent-mint tracking-widest uppercase">Chargement des données...</span>
                  </div>
                </div>
              ) : editMode === "form" ? (
                <div className="max-w-3xl mx-auto flex flex-col">
                  {jsonData && Object.keys(jsonData).map(key => renderField(key, jsonData[key]))}
                </div>
              ) : (
                <div className="max-w-4xl mx-auto h-full flex flex-col gap-4">
                  <div className="flex justify-between items-center bg-[#0a0c0b] p-3.5 border border-white/5 rounded-t-2xl">
                    <span className="text-[0.65rem] font-bold text-accent-mint tracking-widest uppercase flex items-center gap-1">
                      <FileJson className="w-3.5 h-3.5" />
                      Éditeur de code brut JSON
                    </span>
                    <button
                      onClick={handleCopyToClipboard}
                      className="px-3 py-1.5 hover:bg-white/5 border border-white/10 hover:border-white/20 text-[0.65rem] font-bold tracking-widest uppercase rounded-lg text-text-bright transition-all"
                    >
                      Copier le code
                    </button>
                  </div>
                  <textarea
                    value={rawText}
                    onChange={(e) => {
                      setRawText(e.target.value);
                      setIsModified(true);
                    }}
                    className="w-full flex-1 min-h-[500px] p-6 bg-black border-x border-b border-white/5 rounded-b-2xl text-accent-mint font-mono text-xs focus:outline-none focus:border-accent-mint/30 leading-relaxed custom-scrollbar"
                    style={{ tabSize: 2, resize: "none" }}
                  />
                </div>
              )}
            </div>
          </section>

          {/* 3. Real-time Visual Preview Panel */}
          <aside className="w-80 bg-[#080a09]/50 border-l border-white/5 flex flex-col p-6 justify-between flex-shrink-0 z-10">
            <div className="flex flex-col gap-5 h-full justify-between">
              <div>
                <span className="text-[0.62rem] font-bold text-accent-mint tracking-[0.2em] uppercase block mb-4 font-mono">
                  Aperçu en temps réel
                </span>
                
                {/* Visual rendering container */}
                <div className="mt-4 flex flex-col justify-center h-full min-h-[250px] relative">
                  {renderPreview()}
                </div>
              </div>
              
              <div className="border-t border-white/5 pt-4">
                <span className="block text-[0.65rem] text-text-muted/50 font-bold uppercase tracking-wider mb-2 font-mono">
                  Description de la section
                </span>
                <p className="text-[0.68rem] text-text-muted/80 leading-relaxed font-sans">
                  {selectedFile.description}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* MODALS CONTROLLER */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Modal backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
            />
            
            {/* Modal Box */}
            <motion.div
              className={`relative bg-[#0d0f0e] border border-white/10 p-8 rounded-3xl shadow-2xl overflow-hidden ${
                modalType === "media" ? "max-w-4xl w-full" : "max-w-lg w-full"
              }`}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              {/* Media library picker layout */}
              {modalType === "media" ? (
                <>
                  <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-3">
                    <h3 className="font-display font-black text-xl text-text-bright flex items-center gap-2">
                      <ImageIcon className="w-5 h-5 text-accent-mint" />
                      Médiathèque Locale d'Excellence
                    </h3>
                    <button 
                      onClick={() => setShowModal(false)}
                      className="p-1 bg-white/5 hover:bg-white/15 text-text-bright rounded-lg transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-text-muted mb-6 leading-relaxed">
                    Sélectionnez une image ci-dessous pour la lier automatiquement à la propriété de formulaire sélectionnée.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 overflow-y-auto max-h-[380px] pr-2 custom-scrollbar">
                    {MEDIA_ASSETS.map((asset, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelectMedia(asset.path)}
                        className="flex flex-col bg-[#070908] border border-white/5 hover:border-accent-mint/30 rounded-2xl p-3 text-left transition-all group hover:scale-[1.01]"
                      >
                        <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-black border border-white/5 mb-3">
                          <img src={asset.path} alt={asset.name} className="w-full h-full object-cover group-hover:scale-102 transition-transform" />
                        </div>
                        <span className="block text-[0.68rem] font-bold text-text-bright truncate w-full group-hover:text-accent-mint transition-colors">
                          {asset.name}
                        </span>
                        <span className="block text-[0.55rem] font-mono text-text-muted/40 uppercase mt-0.5 tracking-wider font-semibold">
                          {asset.type}
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                /* Save Fallback Drawer (Prod Mode/Local Write Blocked) */
                <>
                  <div className="absolute -top-20 -left-20 w-48 h-48 bg-accent-gold/10 blur-[80px] rounded-full" />
                  
                  <h3 className="font-display font-black text-xl text-text-bright mb-4 flex items-center gap-3">
                    <ShieldAlert className="w-6 h-6 text-accent-gold" /> 
                    <span>Enregistrement Indirect</span>
                  </h3>
                  
                  <p className="text-xs text-text-muted leading-relaxed mb-6 font-medium">
                    Le CMS est actuellement exécuté sur un serveur de production ou de démonstration sans accès direct en écriture sur le disque de développement.
                    <br /><br />
                    Veuillez télécharger le fichier JSON configuré ou copier son contenu pour remplacer manuellement le fichier local :
                    <span className="block font-mono bg-black text-[#2cff82] px-3 py-1.5 rounded-lg text-xs mt-3 border border-white/5">
                      src/data/{selectedFile.file}
                    </span>
                  </p>

                  <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8">
                    <button
                      onClick={() => setShowModal(false)}
                      className="px-5 py-2.5 border border-white/5 hover:border-white/15 hover:bg-white/5 text-text-bright text-xs font-bold tracking-widest uppercase rounded-xl transition-all"
                    >
                      Fermer
                    </button>
                    <button
                      onClick={() => {
                        handleCopyToClipboard();
                        setShowModal(false);
                      }}
                      className="px-5 py-2.5 bg-accent-mint/10 border border-accent-mint/20 hover:bg-accent-mint text-accent-mint hover:text-bg-ink text-xs font-bold tracking-widest uppercase rounded-xl transition-all"
                    >
                      Copier le code
                    </button>
                    <button
                      onClick={() => {
                        handleDownload();
                        setShowModal(false);
                      }}
                      className="px-5 py-2.5 bg-accent-mint hover:bg-emerald-400 text-bg-ink text-xs font-bold tracking-widest uppercase rounded-xl shadow-glow-mint transition-all"
                    >
                      Télécharger JSON
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Global CSS Toast Alerts */}
      <AnimatePresence>
        {toast && (
          <motion.div
            className={`fixed bottom-6 right-6 z-[110] px-5 py-3.5 rounded-2xl border shadow-2xl text-[0.68rem] font-bold tracking-widest uppercase flex items-center gap-2.5 ${
              toast.type === "error"
                ? "bg-red-950/95 border-red-500/20 text-red-300 shadow-red-900/10"
                : "bg-surface-card/95 border-accent-mint/20 text-accent-mint shadow-emerald-950/20"
            }`}
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 25, opacity: 0 }}
          >
            {toast.type === "error" ? <X className="w-3.5 h-3.5 text-red-400" /> : <CheckCircle className="w-3.5 h-3.5 text-[#2cff82]" />}
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
