import { useState, useEffect } from "react";
import { C } from "../theme";
import { fw } from "../data/framework";
import { verticals } from "../data/verticals";
import { allSlides, slideStacks, coreDecks, layerMeta } from "../data/slides";
import { IconCompany, IconSolution, IconNetworking, IconInitiative, productIcons, pillarIcons } from "../components/icons/PageIcons";
import { SlideCard } from "../components/slides/SlideCard";
import { SlidePreview } from "../components/slides/SlidePreview";
import { SlideLightbox } from "../components/slides/SlideLightbox";
import { DeckTray } from "../components/shared/DeckTray";
import { UploadModal } from "../components/shared/UploadModal";

const LAYER_ORDER = ["core", "technical", "evidence", "alternative"];

export function DeckBuilderPage({ selectedIds, setSelectedIds }) {
  const [vertical, setVertical] = useState("all");
  const [activeFilter, setActiveFilter] = useState(null);
  const [lightboxSlide, setLightboxSlide] = useState(null);
  const [expandedNodes, setExpandedNodes] = useState({ company: true, solution: true, networking: true, collaboration: true });
  const [previewMode, setPreviewMode] = useState(false);
  const [panelWidth, setPanelWidth] = useState(280);
  const [isDragging, setIsDragging] = useState(false);
  const [activeProduct, setActiveProduct] = useState("networking");
  const [expandedInit, setExpandedInit] = useState({});
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [apiSlides, setApiSlides] = useState([]);
  const [downloading, setDownloading] = useState(false);
  const [expandedLayers, setExpandedLayers] = useState({ core: true, technical: true, evidence: true, alternative: false });
  const [stackViewKey, setStackViewKey] = useState(0);
  const [coreDeckPulse, setCoreDeckPulse] = useState(false);

  const PANEL_MIN = 200, PANEL_MAX = 720, WIDE_THRESHOLD = 420;
  const isWide = panelWidth >= WIDE_THRESHOLD;

  // Drag handler
  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e) => { const x = e.clientX - 72; setPanelWidth(Math.max(PANEL_MIN, Math.min(PANEL_MAX, x))); };
    const onUp = () => setIsDragging(false);
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isDragging]);

  // Fetch API slides
  const fetchApiSlides = async () => {
    try { const res = await fetch("/api/slides"); if (res.ok) setApiSlides(await res.json()); } catch { console.log("Backend not available, mock slides only"); }
  };
  useEffect(() => { fetchApiSlides(); }, []);

  // Vertical merge
  const getProducts = (v) => {
    if (v === "all" || v === "general" || !verticals[v]?.products) return fw.products;
    return fw.products.map(base => { const overlay = verticals[v].products.find(vp => vp.id === base.id); return overlay ? { ...base, ...overlay } : base; });
  };

  const normalizedApiSlides = apiSlides.map(s => ({
    ...s, type: s.tags?.type || "uploaded", productId: s.tags?.product || null,
    initiativeId: s.tags?.initiative || null, verticals: s.tags?.vertical ? s.tags.vertical.split(",") : ["general"],
    subtitle: s.title || `Slide ${s.slide_index + 1}`, thumbnail_url: s.thumbnail_url, _source: "api",
  }));

  const combinedSlides = [...allSlides, ...normalizedApiSlides];
  const filteredSlides = combinedSlides.filter(s => vertical === "all" ? true : s.verticals.includes(vertical) || s.verticals.includes("general"));

  // For stack view: get slides for a specific node
  const getStackSlides = (filter) => {
    if (!filter) return [];
    return filteredSlides.filter(s => {
      if (filter.type === "company") return s.type === "company";
      if (filter.type === "solution") return s.type === "solution";
      if (filter.type === "product") return s.productId === filter.productId && (s.type === "product");
      if (filter.type === "initiative") return s.initiativeId === filter.initiativeId;
      return false;
    });
  };

  const visibleSlides = activeFilter
    ? filteredSlides.filter(s => {
        if (activeFilter.type === "company") return s.type === "company";
        if (activeFilter.type === "solution") return s.type === "solution";
        if (activeFilter.type === "product") return s.productId === activeFilter.productId && (s.type === "product" || s.type === "initiative" || s.type === "useCase" || s.type === "story");
        if (activeFilter.type === "initiative") return s.initiativeId === activeFilter.initiativeId || (s.type === "story" && s.initiativeId === activeFilter.initiativeId);
        return true;
      })
    : filteredSlides;

  // Stack view: group by layer
  const stackByLayer = (slides) => {
    const grouped = {};
    LAYER_ORDER.forEach(l => { grouped[l] = []; });
    slides.forEach(s => { if (s.layer && grouped[s.layer]) grouped[s.layer].push(s); else if (!s.layer) { /* untagged */ } });
    return grouped;
  };

  // Group slides for "all" view
  const groupSlides = () => {
    const groups = [];
    const companySlides = visibleSlides.filter(s => s.type === "company");
    const solutionSlides = visibleSlides.filter(s => s.type === "solution");
    if (companySlides.length) groups.push({ label: "Company", slides: companySlides });
    if (solutionSlides.length) groups.push({ label: "Solution Category", slides: solutionSlides });
    ["networking", "collaboration"].forEach(pid => {
      const prodSlides = visibleSlides.filter(s => s.productId === pid && s.type !== "story" && s.type !== "company" && s.type !== "solution");
      if (prodSlides.length) groups.push({ label: pid === "networking" ? "Cisco Networking" : "Collaboration", slides: prodSlides });
    });
    const storySlides = visibleSlides.filter(s => s.type === "story");
    if (storySlides.length) groups.push({ label: "Customer Stories", slides: storySlides });
    const untaggedUploaded = visibleSlides.filter(s => s._source === "api" && !s.productId && (!s.type || s.type === "uploaded"));
    if (untaggedUploaded.length) groups.push({ label: "UNTAGGED UPLOADS", slides: untaggedUploaded });
    return groups;
  };
  const groups = activeFilter ? [] : groupSlides();

  const toggleSlide = (id) => setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const toggleNode = (key) => setExpandedNodes(prev => ({ ...prev, [key]: !prev[key] }));
  const toggleInit = (id) => setExpandedInit(prev => ({ ...prev, [id]: !prev[id] }));
  const selectedSlides = selectedIds.map(id => combinedSlides.find(s => s.id === id)).filter(Boolean);

  // Count slides per node for badges
  const countForNode = (filter) => getStackSlides(filter).length;

  const handleDownload = async () => {
    const downloadableIds = selectedIds.filter(id => { const s = combinedSlides.find(sl => sl.id === id); return s && s._source === "api"; });
    if (downloadableIds.length === 0) { alert("No uploaded slides selected. Upload slide decks first, then select those slides."); return; }
    setDownloading(true);
    try {
      const res = await fetch("/api/decks/assemble", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ slide_ids: downloadableIds, filename: "StoryOS-Deck.pptx" }) });
      if (!res.ok) { const err = await res.json().catch(() => ({ detail: "Download failed" })); throw new Error(err.detail || `Server error ${res.status}`); }
      const blob = await res.blob(); const url = URL.createObjectURL(blob);
      const a = document.createElement("a"); a.href = url; a.download = "StoryOS-Deck.pptx"; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
    } catch (err) { alert(`Download failed: ${err.message}`); } finally { setDownloading(false); }
  };

  const handleSetFilter = (filter) => {
    if (activeFilter && JSON.stringify(activeFilter) === JSON.stringify(filter)) { setActiveFilter(null); }
    else { setActiveFilter(filter); setStackViewKey(k => k + 1); }
  };

  const handleStartCoreDeck = () => {
    const vKey = vertical === "all" ? "general" : vertical;
    const deck = coreDecks[vKey] || coreDecks.general;
    setSelectedIds(deck.slideIds);
    setCoreDeckPulse(true);
    setTimeout(() => setCoreDeckPulse(false), 500);
  };

  const verticalOptions = [["all", "All Verticals"], ...Object.entries(verticals).map(([k, v]) => [k, v.label])];
  const products = getProducts(vertical === "all" ? "general" : vertical);
  const vData = vertical !== "all" && vertical !== "general" ? verticals[vertical] : null;
  const product = products.find(p => p.id === activeProduct);
  const isFilterMatch = (filter) => activeFilter && JSON.stringify(activeFilter) === JSON.stringify(filter);

  const selectStyle = {
    appearance: "none", WebkitAppearance: "none", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 2,
    padding: "6px 28px 6px 10px", fontSize: 12, fontWeight: 400, fontFamily: "inherit", color: C.text, cursor: "pointer",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23999' fill='none' stroke-width='1.2'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center",
  };

  const countBadge = (count) => count > 0 ? <span style={{ fontSize: 9, color: C.textTertiary, marginLeft: 4 }}>({count})</span> : null;

  const treeItemStyle = (depth, isActive) => ({
    display: "flex", alignItems: "center", gap: 6,
    padding: `5px 10px 5px ${12 + depth * 14}px`,
    fontSize: 11, fontWeight: isActive ? 500 : 400, color: isActive ? C.text : C.textSecondary,
    cursor: "pointer", borderRadius: 2, transition: "background 0.1s",
    background: isActive ? C.accentSoft : "transparent",
    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
  });
  const chevron = (expanded) => <span style={{ fontSize: 8, transition: "transform 0.15s", display: "inline-block", transform: expanded ? "rotate(90deg)" : "rotate(0deg)", color: C.textTertiary, flexShrink: 0 }}>&#9654;</span>;

  // ── Mini card (wide panel diagram view) ──
  const MiniCard = ({ label, title, subtitle, onClick, isActive, children }) => (
    <div onClick={onClick} style={{ padding: "14px 16px", border: `1px solid ${isActive ? C.text : C.border}`, borderRadius: 2, background: isActive ? C.accentSoft : C.bg, cursor: "pointer", transition: "all 0.15s ease" }}
      onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = C.accentSoft; }} onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = isActive ? C.accentSoft : C.bg; }}>
      {label && <p style={{ fontSize: 8, fontWeight: 500, letterSpacing: 1.5, textTransform: "uppercase", color: C.textTertiary, marginBottom: 4 }}>{label}</p>}
      <p style={{ fontSize: 13, fontWeight: 400, color: C.text, marginBottom: subtitle ? 2 : 0 }}>{title}</p>
      {subtitle && <p style={{ fontSize: 11, color: C.textTertiary, fontWeight: 300 }}>{subtitle}</p>}
      {children}
    </div>
  );
  const MiniConnector = () => <div style={{ display: "flex", justifyContent: "center", padding: "4px 0" }}><div style={{ width: 1, height: 16, background: C.border }} /></div>;
  const MiniSplitConnector = () => <svg width="100%" height="24" viewBox="0 0 400 24" preserveAspectRatio="none" style={{ display: "block" }}><line x1="200" y1="0" x2="200" y2="8" stroke={C.border} strokeWidth="1" /><line x1="100" y1="8" x2="300" y2="8" stroke={C.border} strokeWidth="1" /><line x1="100" y1="8" x2="100" y2="24" stroke={C.border} strokeWidth="1" /><line x1="300" y1="8" x2="300" y2="24" stroke={C.border} strokeWidth="1" /></svg>;

  // ── Compact tree view (narrow panel) ──
  const renderTreeView = () => (
    <div style={{ flex: 1, overflowY: "auto", padding: "8px 0" }}>
      <div onClick={() => handleSetFilter({ type: "company" })} style={treeItemStyle(0, isFilterMatch({ type: "company" }))} onMouseEnter={e => { if (!isFilterMatch({ type: "company" })) e.currentTarget.style.background = C.accentSoft; }} onMouseLeave={e => { if (!isFilterMatch({ type: "company" })) e.currentTarget.style.background = "transparent"; }}>
        <IconCompany size={12} /> <span>One Cisco</span>{countBadge(countForNode({ type: "company" }))}
      </div>
      <div onClick={() => handleSetFilter({ type: "solution" })} style={treeItemStyle(0, isFilterMatch({ type: "solution" }))} onMouseEnter={e => { if (!isFilterMatch({ type: "solution" })) e.currentTarget.style.background = C.accentSoft; }} onMouseLeave={e => { if (!isFilterMatch({ type: "solution" })) e.currentTarget.style.background = "transparent"; }}>
        <IconSolution size={12} /> <span>Futureproof Workplace</span>{countBadge(countForNode({ type: "solution" }))}
      </div>
      {products.map(prod => {
        const PIcon = productIcons[prod.id] || IconNetworking;
        const isExpanded = expandedNodes[prod.id];
        const prodFilter = { type: "product", productId: prod.id };
        return (
          <div key={prod.id}>
            <div style={treeItemStyle(0, isFilterMatch(prodFilter))} onMouseEnter={e => { if (!isFilterMatch(prodFilter)) e.currentTarget.style.background = C.accentSoft; }} onMouseLeave={e => { if (!isFilterMatch(prodFilter)) e.currentTarget.style.background = "transparent"; }}>
              <span onClick={() => toggleNode(prod.id)}>{chevron(isExpanded)}</span>
              <span onClick={() => handleSetFilter(prodFilter)} style={{ display: "flex", alignItems: "center", gap: 6, flex: 1 }}>
                <PIcon size={12} /> {prod.name}
              </span>
            </div>
            {isExpanded && prod.initiatives.map(init => {
              const initFilter = { type: "initiative", initiativeId: init.id };
              const initCount = countForNode(initFilter);
              return (
                <div key={init.id} onClick={() => handleSetFilter(initFilter)} style={treeItemStyle(1, isFilterMatch(initFilter))} onMouseEnter={e => { if (!isFilterMatch(initFilter)) e.currentTarget.style.background = C.accentSoft; }} onMouseLeave={e => { if (!isFilterMatch(initFilter)) e.currentTarget.style.background = "transparent"; }}>
                  <IconInitiative size={10} /> <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{init.name}</span>{countBadge(initCount)}
                </div>
              );
            })}
          </div>
        );
      })}
      {activeFilter && (
        <div onClick={() => setActiveFilter(null)} style={{ ...treeItemStyle(0, false), marginTop: 8, fontSize: 10, color: C.textTertiary, justifyContent: "center" }} onMouseEnter={e => e.currentTarget.style.background = C.accentSoft} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
          Show all slides
        </div>
      )}
    </div>
  );

  // ── Diagram view (wide panel) ──
  const renderDiagramView = () => (
    <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px" }}>
      <div style={{ marginBottom: 4 }}><p style={{ fontSize: 8, fontWeight: 500, letterSpacing: 1.5, textTransform: "uppercase", color: C.textTertiary, marginBottom: 4 }}><IconCompany size={10} /> Company</p></div>
      <MiniCard title={fw.company.headline} subtitle={fw.company.tagline} onClick={() => handleSetFilter({ type: "company" })} isActive={isFilterMatch({ type: "company" })} />
      <MiniConnector />
      <div style={{ marginBottom: 4 }}><p style={{ fontSize: 8, fontWeight: 500, letterSpacing: 1.5, textTransform: "uppercase", color: C.textTertiary, marginBottom: 4 }}><IconSolution size={10} /> Solution Category</p></div>
      <MiniCard title={fw.solutionCategory.headline} subtitle={vData?.solutionTagline || fw.solutionCategory.tagline} onClick={() => handleSetFilter({ type: "solution" })} isActive={isFilterMatch({ type: "solution" })}>
        <div style={{ display: "flex", gap: 4, marginTop: 8, flexWrap: "wrap" }}>
          {fw.solutionCategory.pillars.map((p, i) => { const Icon = pillarIcons[p.label]; return <span key={i} style={{ fontSize: 8, color: C.textTertiary, padding: "2px 8px", border: `1px solid ${C.border}`, borderRadius: 100, display: "inline-flex", alignItems: "center", gap: 3 }}>{Icon && <Icon size={9} />}{p.label}</span>; })}
        </div>
      </MiniCard>
      <MiniSplitConnector />
      <div style={{ marginBottom: 4 }}><p style={{ fontSize: 8, fontWeight: 500, letterSpacing: 1.5, textTransform: "uppercase", color: C.textTertiary }}>Product</p></div>
      <div style={{ display: "flex", gap: 0, borderBottom: `1px solid ${C.border}`, marginBottom: 0 }}>
        {products.map(p => { const isActive = activeProduct === p.id; const Icon = productIcons[p.id]; return (
          <button key={p.id} className="tab" onClick={() => setActiveProduct(p.id)} style={{ flex: 1, padding: "8px 12px", fontSize: 11, fontWeight: isActive ? 500 : 300, color: isActive ? C.text : C.textTertiary, borderBottom: isActive ? `2px solid ${C.text}` : "2px solid transparent", marginBottom: -1, fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <Icon size={12} /> {p.name}
          </button>
        ); })}
      </div>
      {product && (
        <div style={{ border: `1px solid ${C.border}`, borderTop: "none", borderRadius: "0 0 2px 2px", background: C.bg }}>
          <div style={{ padding: "12px 16px" }}>
            <p style={{ fontSize: 11, color: C.textSecondary, fontStyle: "italic", fontWeight: 300, marginBottom: 4 }}>{product.tagline}</p>
            <p style={{ fontSize: 10, color: C.textTertiary, lineHeight: 1.6, fontWeight: 300, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{product.description}</p>
          </div>
          <div style={{ height: 1, background: C.borderLight, margin: "0 16px" }} />
          <div style={{ padding: "12px 16px" }}>
            <p style={{ fontSize: 8, fontWeight: 500, letterSpacing: 1.5, textTransform: "uppercase", color: C.textTertiary, marginBottom: 8 }}><IconInitiative size={10} /> Initiatives</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 1, background: C.border, border: `1px solid ${C.border}`, borderRadius: 2, overflow: "hidden" }}>
              {product.initiatives.map(init => {
                const isOpen = !!expandedInit[init.id];
                const initFilter = { type: "initiative", initiativeId: init.id };
                const isActive = isFilterMatch(initFilter);
                const initCount = countForNode(initFilter);
                return (
                  <div key={init.id} style={{ background: C.bg }}>
                    <div style={{ padding: "10px 12px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "flex-start", background: isActive ? C.accentSoft : C.bg, transition: "background 0.1s" }}
                      onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = C.accentSoft; }} onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = isActive ? C.accentSoft : C.bg; }}>
                      <div style={{ flex: 1 }} onClick={() => handleSetFilter(initFilter)}>
                        <p style={{ fontSize: 11, fontWeight: 500, color: C.text, marginBottom: 2, lineHeight: 1.3 }}>{init.name}{countBadge(initCount)}</p>
                        <p style={{ fontSize: 9, color: C.textTertiary, fontWeight: 300 }}>{init.tagline}</p>
                      </div>
                      <span onClick={(e) => { e.stopPropagation(); toggleInit(init.id); }} style={{ fontSize: 14, color: C.textTertiary, fontWeight: 200, marginLeft: 6, cursor: "pointer", transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s", display: "inline-block", flexShrink: 0 }}>&#8964;</span>
                    </div>
                    {isOpen && (
                      <div style={{ padding: "0 12px 10px" }}>
                        <p style={{ fontSize: 8, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase", color: C.textTertiary, marginBottom: 6 }}>Projects</p>
                        {init.projects.map((proj, i) => (
                          <div key={i} style={{ padding: "4px 0", borderTop: i > 0 ? `1px solid ${C.borderLight}` : "none" }}>
                            <p style={{ fontSize: 10, fontWeight: 400, color: C.text }}>{proj.name}</p>
                            <p style={{ fontSize: 9, color: C.textTertiary, fontWeight: 300, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{proj.detail}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {activeFilter && (
        <div onClick={() => setActiveFilter(null)} style={{ marginTop: 12, padding: "6px 0", fontSize: 10, color: C.textTertiary, textAlign: "center", cursor: "pointer" }} onMouseEnter={e => e.currentTarget.style.color = C.text} onMouseLeave={e => e.currentTarget.style.color = C.textTertiary}>
          Clear filter &times;
        </div>
      )}
    </div>
  );

  // ── Stack View (when a node is selected) ──
  const renderStackView = () => {
    const stackSlides = getStackSlides(activeFilter);
    const layers = stackByLayer(stackSlides);
    const nodeTitle = activeFilter.type === "company" ? fw.company.headline
      : activeFilter.type === "solution" ? fw.solutionCategory.headline
      : activeFilter.type === "product" ? (products.find(p => p.id === activeFilter.productId)?.name || "Product")
      : (fw.products.flatMap(p => p.initiatives).find(i => i.id === activeFilter.initiativeId)?.name || "Initiative");
    const nodeTagline = activeFilter.type === "company" ? fw.company.tagline
      : activeFilter.type === "solution" ? fw.solutionCategory.tagline
      : activeFilter.type === "product" ? (products.find(p => p.id === activeFilter.productId)?.tagline || "")
      : (fw.products.flatMap(p => p.initiatives).find(i => i.id === activeFilter.initiativeId)?.tagline || "");

    return (
      <div key={stackViewKey} className="stack-enter" style={{ padding: "24px 32px" }}>
        {/* Back */}
        <span onClick={() => setActiveFilter(null)} style={{ fontSize: 11, color: C.textTertiary, cursor: "pointer", transition: "color 0.15s" }}
          onMouseEnter={e => e.currentTarget.style.color = C.text} onMouseLeave={e => e.currentTarget.style.color = C.textTertiary}>
          ← All Slides
        </span>
        {/* Header */}
        <h2 style={{ fontSize: 20, fontWeight: 300, color: C.text, margin: "16px 0 4px", letterSpacing: "-0.3px" }}>{nodeTitle}</h2>
        <p style={{ fontSize: 13, color: C.textTertiary, fontStyle: "italic", fontWeight: 300, marginBottom: 24 }}>{nodeTagline}</p>

        {/* Layers */}
        {LAYER_ORDER.map((layerKey, layerIdx) => {
          const slides = layers[layerKey];
          if (!slides || slides.length === 0) return null;
          const lm = layerMeta[layerKey];
          const isCore = layerKey === "core";
          const isExpanded = isCore || expandedLayers[layerKey];

          return (
            <div key={layerKey} className={`layer-stagger layer-stagger-${layerIdx}`} style={{ marginBottom: 24 }}>
              {/* Layer header */}
              <div
                onClick={isCore ? undefined : () => setExpandedLayers(prev => ({ ...prev, [layerKey]: !prev[layerKey] }))}
                style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: isExpanded ? 12 : 0, cursor: isCore ? "default" : "pointer" }}
              >
                <span style={{ fontSize: 10, color: C.textTertiary }}>{lm.icon}</span>
                <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: 1.5, textTransform: "uppercase", color: C.textTertiary }}>{lm.label}</span>
                <span style={{ fontSize: 9, color: C.textTertiary }}>({slides.length})</span>
                <div style={{ flex: 1, height: 1, background: C.borderLight, marginLeft: 8 }} />
                {!isCore && <span style={{ fontSize: 12, color: C.textTertiary, transform: isExpanded ? "rotate(180deg)" : "none", transition: "transform 0.2s", display: "inline-block" }}>&#8964;</span>}
              </div>
              {/* Layer content */}
              <div style={{
                maxHeight: isExpanded ? 2000 : 0, overflow: "hidden",
                transition: "max-height 0.25s ease-out, opacity 0.2s ease-out 0.05s",
                opacity: isExpanded ? 1 : 0,
              }}>
                {isCore ? (
                  /* Core: large prominent cards */
                  <div style={{ display: "flex", gap: 12, overflowX: "auto" }}>
                    {slides.map(slide => (
                      <div key={slide.id} className="card" style={{ width: 380, minWidth: 380, borderRadius: 2, border: `1px solid ${selectedIds.includes(slide.id) ? C.text : C.border}`, overflow: "hidden", background: C.bg, boxShadow: selectedIds.includes(slide.id) ? `0 0 0 1px ${C.text}` : "none" }}>
                        <div style={{ position: "relative", aspectRatio: "16/9", cursor: "pointer" }} onClick={() => setLightboxSlide(slide)}>
                          <SlidePreview slide={slide} width={320} height={180} responsive />
                          <div style={{ position: "absolute", bottom: 4, right: 4, fontSize: 7, padding: "1px 5px", borderRadius: 3, background: "rgba(0,0,0,0.55)", color: "#fff", fontWeight: 500, display: "flex", alignItems: "center", gap: 2 }}><span style={{ fontSize: 6 }}>◆</span> Core</div>
                        </div>
                        <div style={{ padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <span style={{ fontSize: 12, fontWeight: 400, color: C.text }}>{slide.title}</span>
                          <button onClick={() => toggleSlide(slide.id)} style={{
                            fontSize: 10, padding: "3px 10px", borderRadius: 2, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s",
                            background: selectedIds.includes(slide.id) ? C.text : "none", color: selectedIds.includes(slide.id) ? C.bg : C.text,
                            border: `1px solid ${C.text}`,
                          }}>{selectedIds.includes(slide.id) ? "Remove" : "Add to Deck"}</button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Other layers: standard grid */
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>
                    {slides.map(slide => (
                      <SlideCard key={slide.id} slide={slide} isSelected={selectedIds.includes(slide.id)} onToggle={() => toggleSlide(slide.id)} onPreview={() => setLightboxSlide(slide)} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // ── Core Deck Launcher ──
  const vKey = vertical === "all" ? "general" : vertical;
  const coreDeck = coreDecks[vKey] || coreDecks.general;

  return (
    <div style={{ display: "flex", flex: 1, height: "100vh", overflow: "hidden" }}>
      <style>{`
        @keyframes stackEnter { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .stack-enter { animation: stackEnter 0.2s ease-out; }
        .layer-stagger-0 { animation: stackEnter 0.15s ease-out; }
        .layer-stagger-1 { animation: stackEnter 0.2s ease-out 0.1s both; }
        .layer-stagger-2 { animation: stackEnter 0.2s ease-out 0.2s both; }
        .layer-stagger-3 { animation: stackEnter 0.2s ease-out 0.3s both; }
        @keyframes corePulse { 0% { box-shadow: 0 0 0 0 rgba(0,0,0,0.15); } 50% { box-shadow: 0 0 0 4px rgba(0,0,0,0.08); } 100% { box-shadow: 0 0 0 0 transparent; } }
        .core-pulse { animation: corePulse 0.5s ease-out; }
        @media (prefers-reduced-motion: reduce) {
          .stack-enter, .layer-stagger-0, .layer-stagger-1, .layer-stagger-2, .layer-stagger-3 { animation: none !important; }
          .core-pulse { animation: none !important; }
        }
      `}</style>

      {/* ── LEFT PANEL ── */}
      <div style={{ width: panelWidth, borderRight: `1px solid ${C.border}`, background: C.surface, display: "flex", flexDirection: "column", flexShrink: 0, position: "relative" }}>
        <div style={{ padding: "20px 16px 16px", borderBottom: `1px solid ${C.border}` }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <h2 style={{ fontSize: 15, fontWeight: 500, letterSpacing: "-0.3px", color: C.text, margin: 0 }}>Deck Builder</h2>
            <button onClick={() => setShowUploadModal(true)} title="Upload .pptx" style={{ background: "none", border: `1px solid ${C.border}`, borderRadius: 2, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: C.textTertiary, transition: "all 0.15s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.text; e.currentTarget.style.color = C.text; }} onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textTertiary; }}>
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
            </button>
          </div>
          <select value={vertical} onChange={e => { setVertical(e.target.value); setActiveFilter(null); setExpandedInit({}); }} style={{ ...selectStyle, width: "100%" }}>
            {verticalOptions.map(([k, label]) => <option key={k} value={k}>{label}</option>)}
          </select>
        </div>
        {isWide ? renderDiagramView() : renderTreeView()}
        <div style={{ padding: "12px 16px", borderTop: `1px solid ${C.border}`, fontSize: 11, color: C.textTertiary }}>
          {selectedIds.length} slide{selectedIds.length !== 1 ? "s" : ""} in deck &middot; {visibleSlides.length} visible
        </div>
      </div>

      {/* ── DRAG HANDLE ── */}
      <div onMouseDown={() => setIsDragging(true)} style={{ width: 6, cursor: "col-resize", background: isDragging ? C.border : "transparent", transition: "background 0.15s", flexShrink: 0, position: "relative", zIndex: 10, marginLeft: -3, marginRight: -3 }}
        onMouseEnter={e => e.currentTarget.style.background = C.border} onMouseLeave={e => { if (!isDragging) e.currentTarget.style.background = "transparent"; }} />

      {/* ── RIGHT PANEL ── */}
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: selectedIds.length > 0 ? 60 : 0 }}>
        {activeFilter ? renderStackView() : (
          <div style={{ padding: "24px 32px" }}>
            {/* Core Deck Launcher */}
            <div className={coreDeckPulse ? "core-pulse" : ""} style={{
              padding: 24, border: `1px solid ${C.border}`, borderRadius: 2, background: C.bg, marginBottom: 32,
              transition: "box-shadow 0.3s",
            }}>
              <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: 1.5, textTransform: "uppercase", color: C.textTertiary, marginBottom: 8, display: "flex", alignItems: "center", gap: 4 }}>
                <span>◆</span> Core Deck
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 300, color: C.text, marginBottom: 4 }}>{coreDeck.name}</h3>
              <p style={{ fontSize: 12, color: C.textTertiary, marginBottom: 12 }}>{coreDeck.slideIds.length} slides · {vertical === "all" ? "General" : verticals[vertical]?.label}</p>
              <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                <button onClick={handleStartCoreDeck} style={{ padding: "7px 16px", fontSize: 11, fontWeight: 500, background: C.text, color: C.bg, border: "none", borderRadius: 2, cursor: "pointer", fontFamily: "inherit" }}>Start with Core Deck</button>
                <button onClick={() => { handleStartCoreDeck(); if (selectedSlides.length > 0) { setLightboxSlide(selectedSlides[0]); setPreviewMode(true); } }} style={{ padding: "7px 16px", fontSize: 11, fontWeight: 400, background: "none", color: C.text, border: `1px solid ${C.border}`, borderRadius: 2, cursor: "pointer", fontFamily: "inherit" }}>Preview</button>
              </div>
              <p style={{ fontSize: 12, color: C.textTertiary, fontWeight: 300, lineHeight: 1.6 }}>{coreDeck.description}. One-click starting point — customize from here.</p>
            </div>

            {/* Grouped slides */}
            {groups.length === 0 && (
              <div style={{ textAlign: "center", padding: "80px 0", color: C.textTertiary, fontSize: 13 }}>No slides match the current filter.</div>
            )}
            {groups.map(group => (
              <div key={group.label} style={{ marginBottom: 32 }}>
                <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: 2, textTransform: "uppercase", color: C.textTertiary, marginBottom: 12 }}>{group.label}</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>
                  {group.slides.map(slide => (
                    <SlideCard key={slide.id} slide={slide} isSelected={selectedIds.includes(slide.id)} onToggle={() => toggleSlide(slide.id)} onPreview={() => setLightboxSlide(slide)} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── DECK TRAY ── */}
      <DeckTray count={selectedIds.length} onClear={() => setSelectedIds([])} onPreview={() => { if (selectedSlides.length > 0) { setLightboxSlide(selectedSlides[0]); setPreviewMode(true); } }} onDownload={handleDownload} downloading={downloading} />

      {/* ── LIGHTBOX ── */}
      {lightboxSlide && <SlideLightbox slide={lightboxSlide} allFilteredSlides={previewMode ? selectedSlides : visibleSlides} onClose={() => { setLightboxSlide(null); setPreviewMode(false); }} isSelected={(id) => selectedIds.includes(id)} onToggle={toggleSlide} />}

      {/* ── UPLOAD MODAL ── */}
      {showUploadModal && <UploadModal onClose={() => setShowUploadModal(false)} onUploadComplete={() => fetchApiSlides()} />}
    </div>
  );
}
