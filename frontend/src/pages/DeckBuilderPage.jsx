import { useState, useEffect } from "react";
import { C } from "../theme";
import { fw } from "../data/framework";
import { verticals } from "../data/verticals";
import { allSlides } from "../data/slides";
import { IconCompany, IconSolution, IconNetworking, IconInitiative, productIcons } from "../components/icons/PageIcons";
import { SlideCard } from "../components/slides/SlideCard";
import { SlideLightbox } from "../components/slides/SlideLightbox";
import { DeckTray } from "../components/shared/DeckTray";
import { UploadModal } from "../components/shared/UploadModal";

const TYPE_LABELS = { company: "Company", solution: "Solution", product: "Product", initiative: "Initiative", useCase: "Use Case" };


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

  const PANEL_MIN = 200;
  const PANEL_MAX = 720;
  const WIDE_THRESHOLD = 420;
  const isWide = panelWidth >= WIDE_THRESHOLD;

  // Drag handler
  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e) => {
      const x = e.clientX - 72; // offset for sidebar
      setPanelWidth(Math.max(PANEL_MIN, Math.min(PANEL_MAX, x)));
    };
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

  const fetchApiSlides = async () => {
    try {
      const res = await fetch("/api/slides");
      if (res.ok) {
        const data = await res.json();
        setApiSlides(data);
      }
    } catch (err) {
      console.log("Backend not available, showing mock slides only");
    }
  };

  useEffect(() => {
    fetchApiSlides();
  }, []);

  // Merge products for current vertical
  const getProducts = (v) => {
    if (v === "all" || v === "general" || !verticals[v]?.products) return fw.products;
    return fw.products.map(base => {
      const overlay = verticals[v].products.find(vp => vp.id === base.id);
      if (!overlay) return base;
      return { ...base, ...overlay };
    });
  };

  const normalizedApiSlides = apiSlides.map(s => ({
    ...s,
    type: s.tags?.type || "uploaded",
    productId: s.tags?.product || null,
    initiativeId: s.tags?.initiative || null,
    verticals: s.tags?.vertical ? s.tags.vertical.split(",") : ["general"],
    subtitle: s.title || `Slide ${s.slide_index + 1}`,
    thumbnail_url: s.thumbnail_url,
    _source: "api",
  }));

  const combinedSlides = [...allSlides, ...normalizedApiSlides];

  const filteredSlides = combinedSlides.filter(s => {
    if (vertical === "all") return true;
    return s.verticals.includes(vertical) || s.verticals.includes("general");
  });

  const visibleSlides = activeFilter
    ? filteredSlides.filter(s => {
        if (activeFilter.type === "company") return s.type === "company";
        if (activeFilter.type === "solution") return s.type === "solution";
        if (activeFilter.type === "product") return s.productId === activeFilter.productId && (s.type === "product" || s.type === "initiative" || s.type === "useCase" || s.type === "story");
        if (activeFilter.type === "initiative") return s.initiativeId === activeFilter.initiativeId || (s.type === "story" && s.initiativeId === activeFilter.initiativeId);
        return true;
      })
    : filteredSlides;

  const groupSlides = () => {
    const groups = [];
    const companySlides = visibleSlides.filter(s => s.type === "company");
    const solutionSlides = visibleSlides.filter(s => s.type === "solution");
    if (companySlides.length) groups.push({ label: "Company", slides: companySlides });
    if (solutionSlides.length) groups.push({ label: "Solution Category", slides: solutionSlides });
    ["networking", "collaboration"].forEach(pid => {
      const prodSlides = visibleSlides.filter(s =>
        s.productId === pid &&
        s.type !== "story" && s.type !== "company" && s.type !== "solution"
      );
      if (prodSlides.length) {
        const prodName = pid === "networking" ? "Cisco Networking" : "Collaboration";
        groups.push({ label: prodName, slides: prodSlides });
      }
    });
    const storySlides = visibleSlides.filter(s => s.type === "story");
    if (storySlides.length) groups.push({ label: "Customer Stories", slides: storySlides });
    const untaggedUploaded = visibleSlides.filter(s =>
      s._source === "api" &&
      !s.productId &&
      (!s.type || s.type === "uploaded")
    );
    if (untaggedUploaded.length) groups.push({ label: "UNTAGGED UPLOADS", slides: untaggedUploaded });
    return groups;
  };
  const groups = groupSlides();

  const toggleSlide = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };
  const toggleNode = (key) => setExpandedNodes(prev => ({ ...prev, [key]: !prev[key] }));
  const toggleInit = (id) => setExpandedInit(prev => ({ ...prev, [id]: !prev[id] }));
  const selectedSlides = selectedIds.map(id => combinedSlides.find(s => s.id === id)).filter(Boolean);

  const handleDownload = async () => {
    // Filter to only API slides (uploaded slides with real .pptx source)
    const downloadableIds = selectedIds.filter(id => {
      const slide = combinedSlides.find(s => s.id === id);
      return slide && slide._source === "api";
    });

    if (downloadableIds.length === 0) {
      alert("No uploaded slides selected. Only real .pptx slides can be included in the download. Upload slide decks first, then select those slides.");
      return;
    }

    setDownloading(true);

    try {
      const res = await fetch("/api/decks/assemble", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slide_ids: downloadableIds,
          filename: "StoryOS-Deck.pptx",
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: "Download failed" }));
        throw new Error(err.detail || `Server error ${res.status}`);
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "StoryOS-Deck.pptx";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      alert(`Download failed: ${err.message}`);
    } finally {
      setDownloading(false);
    }
  };

  const verticalOptions = [["all", "All Verticals"], ...Object.entries(verticals).map(([k, v]) => [k, v.label])];
  const products = getProducts(vertical === "all" ? "general" : vertical);
  const vData = vertical !== "all" && vertical !== "general" ? verticals[vertical] : null;
  const product = products.find(p => p.id === activeProduct);

  const selectStyle = {
    appearance: "none", WebkitAppearance: "none",
    background: C.surface, border: `1px solid ${C.border}`, borderRadius: 2,
    padding: "6px 28px 6px 10px", fontSize: 12, fontWeight: 400, fontFamily: "inherit", color: C.text, cursor: "pointer",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23999' fill='none' stroke-width='1.2'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center",
  };

  const treeItemStyle = (depth, isActive) => ({
    display: "flex", alignItems: "center", gap: 6,
    padding: `5px 10px 5px ${12 + depth * 14}px`,
    fontSize: 11, fontWeight: isActive ? 500 : 400, color: isActive ? C.text : C.textSecondary,
    cursor: "pointer", borderRadius: 2, transition: "background 0.1s",
    background: isActive ? C.accentSoft : "transparent",
    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
  });

  const chevron = (expanded) => (
    <span style={{ fontSize: 8, transition: "transform 0.15s", display: "inline-block", transform: expanded ? "rotate(90deg)" : "rotate(0deg)", color: C.textTertiary, flexShrink: 0 }}>&#9654;</span>
  );

  const isFilterMatch = (filter) => {
    if (!activeFilter || !filter) return false;
    return JSON.stringify(activeFilter) === JSON.stringify(filter);
  };

  // ── Mini card used in wide messaging diagram ──
  const MiniCard = ({ label, title, subtitle, onClick, isActive, children }) => (
    <div
      onClick={onClick}
      style={{
        padding: "14px 16px", border: `1px solid ${isActive ? C.text : C.border}`, borderRadius: 2,
        background: isActive ? C.accentSoft : C.bg, cursor: "pointer", transition: "all 0.15s ease",
      }}
      onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = C.accentSoft; }}
      onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = isActive ? C.accentSoft : C.bg; }}
    >
      {label && <p style={{ fontSize: 8, fontWeight: 500, letterSpacing: 1.5, textTransform: "uppercase", color: C.textTertiary, marginBottom: 4 }}>{label}</p>}
      <p style={{ fontSize: 13, fontWeight: 400, color: C.text, marginBottom: subtitle ? 2 : 0 }}>{title}</p>
      {subtitle && <p style={{ fontSize: 11, color: C.textTertiary, fontWeight: 300 }}>{subtitle}</p>}
      {children}
    </div>
  );

  const MiniConnector = () => (
    <div style={{ display: "flex", justifyContent: "center", padding: "4px 0" }}>
      <div style={{ width: 1, height: 16, background: C.border }} />
    </div>
  );

  const MiniSplitConnector = () => (
    <svg width="100%" height="24" viewBox="0 0 400 24" preserveAspectRatio="none" style={{ display: "block" }}>
      <line x1="200" y1="0" x2="200" y2="8" stroke={C.border} strokeWidth="1" />
      <line x1="100" y1="8" x2="300" y2="8" stroke={C.border} strokeWidth="1" />
      <line x1="100" y1="8" x2="100" y2="24" stroke={C.border} strokeWidth="1" />
      <line x1="300" y1="8" x2="300" y2="24" stroke={C.border} strokeWidth="1" />
    </svg>
  );

  // ── Render compact tree view (narrow panel) ──
  const renderTreeView = () => (
    <div style={{ flex: 1, overflowY: "auto", padding: "8px 0" }}>
      <div onClick={() => setActiveFilter(isFilterMatch({ type: "company" }) ? null : { type: "company" })} style={treeItemStyle(0, isFilterMatch({ type: "company" }))} onMouseEnter={e => { if (!isFilterMatch({ type: "company" })) e.currentTarget.style.background = C.accentSoft; }} onMouseLeave={e => { if (!isFilterMatch({ type: "company" })) e.currentTarget.style.background = "transparent"; }}>
        <IconCompany size={12} /> <span>One Cisco</span>
      </div>
      <div onClick={() => setActiveFilter(isFilterMatch({ type: "solution" }) ? null : { type: "solution" })} style={treeItemStyle(0, isFilterMatch({ type: "solution" }))} onMouseEnter={e => { if (!isFilterMatch({ type: "solution" })) e.currentTarget.style.background = C.accentSoft; }} onMouseLeave={e => { if (!isFilterMatch({ type: "solution" })) e.currentTarget.style.background = "transparent"; }}>
        <IconSolution size={12} /> <span>Futureproof Workplace</span>
      </div>
      {products.map(prod => {
        const PIcon = productIcons[prod.id] || IconNetworking;
        const isExpanded = expandedNodes[prod.id];
        const prodFilter = { type: "product", productId: prod.id };
        return (
          <div key={prod.id}>
            <div style={treeItemStyle(0, isFilterMatch(prodFilter))} onMouseEnter={e => { if (!isFilterMatch(prodFilter)) e.currentTarget.style.background = C.accentSoft; }} onMouseLeave={e => { if (!isFilterMatch(prodFilter)) e.currentTarget.style.background = "transparent"; }}>
              <span onClick={() => toggleNode(prod.id)}>{chevron(isExpanded)}</span>
              <span onClick={() => setActiveFilter(isFilterMatch(prodFilter) ? null : prodFilter)} style={{ display: "flex", alignItems: "center", gap: 6, flex: 1 }}>
                <PIcon size={12} /> {prod.name}
              </span>
            </div>
            {isExpanded && prod.initiatives.map(init => {
              const initFilter = { type: "initiative", initiativeId: init.id };
              return (
                <div key={init.id} onClick={() => setActiveFilter(isFilterMatch(initFilter) ? null : initFilter)} style={treeItemStyle(1, isFilterMatch(initFilter))} onMouseEnter={e => { if (!isFilterMatch(initFilter)) e.currentTarget.style.background = C.accentSoft; }} onMouseLeave={e => { if (!isFilterMatch(initFilter)) e.currentTarget.style.background = "transparent"; }}>
                  <IconInitiative size={10} /> <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{init.name}</span>
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

  // ── Render messaging diagram view (wide panel) ──
  const renderDiagramView = () => (
    <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px" }}>
      {/* Company */}
      <div style={{ marginBottom: 4 }}>
        <p style={{ fontSize: 8, fontWeight: 500, letterSpacing: 1.5, textTransform: "uppercase", color: C.textTertiary, marginBottom: 4 }}>
          <IconCompany size={10} /> Company
        </p>
      </div>
      <MiniCard
        title={fw.company.headline}
        subtitle={fw.company.tagline}
        onClick={() => setActiveFilter(isFilterMatch({ type: "company" }) ? null : { type: "company" })}
        isActive={isFilterMatch({ type: "company" })}
      />

      <MiniConnector />

      {/* Solution Category */}
      <div style={{ marginBottom: 4 }}>
        <p style={{ fontSize: 8, fontWeight: 500, letterSpacing: 1.5, textTransform: "uppercase", color: C.textTertiary, marginBottom: 4 }}>
          <IconSolution size={10} /> Solution Category
        </p>
      </div>
      <MiniCard
        title={fw.solutionCategory.headline}
        subtitle={vData?.solutionTagline || fw.solutionCategory.tagline}
        onClick={() => setActiveFilter(isFilterMatch({ type: "solution" }) ? null : { type: "solution" })}
        isActive={isFilterMatch({ type: "solution" })}
      >
        <div style={{ display: "flex", gap: 4, marginTop: 8 }}>
          {fw.solutionCategory.pillars.map((p, i) => (
            <span key={i} style={{ fontSize: 8, color: C.textTertiary, padding: "2px 8px", border: `1px solid ${C.border}`, borderRadius: 100 }}>{p.label}</span>
          ))}
        </div>
      </MiniCard>

      <MiniSplitConnector />

      {/* Product Tabs */}
      <div style={{ marginBottom: 4 }}>
        <p style={{ fontSize: 8, fontWeight: 500, letterSpacing: 1.5, textTransform: "uppercase", color: C.textTertiary }}>Product</p>
      </div>
      <div style={{ display: "flex", gap: 0, borderBottom: `1px solid ${C.border}`, marginBottom: 0 }}>
        {products.map(p => {
          const isActive = activeProduct === p.id;
          const Icon = productIcons[p.id];
          return (
            <button key={p.id} className="tab" onClick={() => setActiveProduct(p.id)} style={{
              flex: 1, padding: "8px 12px", fontSize: 11, fontWeight: isActive ? 500 : 300,
              color: isActive ? C.text : C.textTertiary,
              borderBottom: isActive ? `2px solid ${C.text}` : "2px solid transparent",
              marginBottom: -1, fontFamily: "inherit",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            }}>
              <Icon size={12} /> {p.name}
            </button>
          );
        })}
      </div>

      {/* Product Detail */}
      {product && (
        <div style={{ border: `1px solid ${C.border}`, borderTop: "none", borderRadius: "0 0 2px 2px", background: C.bg }}>
          <div style={{ padding: "12px 16px" }}>
            <p style={{ fontSize: 11, color: C.textSecondary, fontStyle: "italic", fontWeight: 300, marginBottom: 4 }}>{product.tagline}</p>
            <p style={{ fontSize: 10, color: C.textTertiary, lineHeight: 1.6, fontWeight: 300, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{product.description}</p>
          </div>

          <div style={{ height: 1, background: C.borderLight, margin: "0 16px" }} />

          {/* Initiatives */}
          <div style={{ padding: "12px 16px" }}>
            <p style={{ fontSize: 8, fontWeight: 500, letterSpacing: 1.5, textTransform: "uppercase", color: C.textTertiary, marginBottom: 8 }}>
              <IconInitiative size={10} /> Initiatives
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 1, background: C.border, border: `1px solid ${C.border}`, borderRadius: 2, overflow: "hidden" }}>
              {product.initiatives.map(init => {
                const isOpen = !!expandedInit[init.id];
                const initFilter = { type: "initiative", initiativeId: init.id };
                const isActive = isFilterMatch(initFilter);
                return (
                  <div key={init.id} style={{ background: C.bg }}>
                    <div
                      style={{
                        padding: "10px 12px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "flex-start",
                        background: isActive ? C.accentSoft : C.bg, transition: "background 0.1s",
                      }}
                      onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = C.accentSoft; }}
                      onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = isActive ? C.accentSoft : C.bg; }}
                    >
                      <div style={{ flex: 1 }} onClick={() => setActiveFilter(isActive ? null : initFilter)}>
                        <p style={{ fontSize: 11, fontWeight: 500, color: C.text, marginBottom: 2, lineHeight: 1.3 }}>{init.name}</p>
                        <p style={{ fontSize: 9, color: C.textTertiary, fontWeight: 300 }}>{init.tagline}</p>
                      </div>
                      <span
                        onClick={(e) => { e.stopPropagation(); toggleInit(init.id); }}
                        style={{
                          fontSize: 14, color: C.textTertiary, fontWeight: 200, marginLeft: 6, cursor: "pointer",
                          transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s", display: "inline-block", flexShrink: 0,
                        }}
                      >&#8964;</span>
                    </div>
                    {isOpen && (
                      <div style={{ padding: "0 12px 10px" }}>
                        <p style={{ fontSize: 8, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase", color: C.textTertiary, marginBottom: 6 }}>Use Cases</p>
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

      {/* Clear filter indicator */}
      {activeFilter && (
        <div
          onClick={() => setActiveFilter(null)}
          style={{ marginTop: 12, padding: "6px 0", fontSize: 10, color: C.textTertiary, textAlign: "center", cursor: "pointer" }}
          onMouseEnter={e => e.currentTarget.style.color = C.text}
          onMouseLeave={e => e.currentTarget.style.color = C.textTertiary}
        >
          Clear filter &times;
        </div>
      )}
    </div>
  );

  return (
    <div style={{ display: "flex", flex: 1, height: "100vh", overflow: "hidden" }}>
      {/* ── LEFT PANEL ── */}
      <div style={{ width: panelWidth, borderRight: `1px solid ${C.border}`, background: C.surface, display: "flex", flexDirection: "column", flexShrink: 0, position: "relative" }}>
        {/* Header */}
        <div style={{ padding: "20px 16px 16px", borderBottom: `1px solid ${C.border}` }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <h2 style={{ fontSize: 15, fontWeight: 500, letterSpacing: "-0.3px", color: C.text, margin: 0 }}>Deck Builder</h2>
            <button
              onClick={() => setShowUploadModal(true)}
              title="Upload .pptx"
              style={{
                background: "none", border: `1px solid ${C.border}`, borderRadius: 2,
                width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: C.textTertiary, transition: "all 0.15s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.text; e.currentTarget.style.color = C.text; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textTertiary; }}
            >
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </button>
          </div>
          <select value={vertical} onChange={e => { setVertical(e.target.value); setActiveFilter(null); setExpandedInit({}); }} style={{ ...selectStyle, width: "100%" }}>
            {verticalOptions.map(([k, label]) => <option key={k} value={k}>{label}</option>)}
          </select>
        </div>

        {/* Content — tree or diagram depending on width */}
        {isWide ? renderDiagramView() : renderTreeView()}

        {/* Selection summary */}
        <div style={{ padding: "12px 16px", borderTop: `1px solid ${C.border}`, fontSize: 11, color: C.textTertiary }}>
          {selectedIds.length} slide{selectedIds.length !== 1 ? "s" : ""} in deck &middot; {visibleSlides.length} visible
        </div>
      </div>

      {/* ── DRAG HANDLE ── */}
      <div
        onMouseDown={() => setIsDragging(true)}
        style={{
          width: 6, cursor: "col-resize", background: isDragging ? C.border : "transparent",
          transition: "background 0.15s", flexShrink: 0, position: "relative", zIndex: 10,
          marginLeft: -3, marginRight: -3,
        }}
        onMouseEnter={e => e.currentTarget.style.background = C.border}
        onMouseLeave={e => { if (!isDragging) e.currentTarget.style.background = "transparent"; }}
      />

      {/* ── RIGHT PANEL: Slide Catalogue ── */}
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: selectedIds.length > 0 ? 60 : 0 }}>
        <div style={{ padding: "24px 32px" }}>
          {groups.length === 0 && (
            <div style={{ textAlign: "center", padding: "80px 0", color: C.textTertiary, fontSize: 13 }}>No slides match the current filter.</div>
          )}
          {groups.map(group => (
            <div key={group.label} style={{ marginBottom: 32 }}>
              <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: 2, textTransform: "uppercase", color: C.textTertiary, marginBottom: 12 }}>{group.label}</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>
                {group.slides.map(slide => (
                  <SlideCard
                    key={slide.id}
                    slide={slide}
                    isSelected={selectedIds.includes(slide.id)}
                    onToggle={() => toggleSlide(slide.id)}
                    onPreview={() => setLightboxSlide(slide)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── DECK TRAY ── */}
      <DeckTray
        count={selectedIds.length}
        onClear={() => setSelectedIds([])}
        onPreview={() => { if (selectedSlides.length > 0) { setLightboxSlide(selectedSlides[0]); setPreviewMode(true); } }}
        onDownload={handleDownload}
        downloading={downloading}
      />

      {/* ── LIGHTBOX ── */}
      {lightboxSlide && (
        <SlideLightbox
          slide={lightboxSlide}
          allFilteredSlides={previewMode ? selectedSlides : visibleSlides}
          onClose={() => { setLightboxSlide(null); setPreviewMode(false); }}
          isSelected={(id) => selectedIds.includes(id)}
          onToggle={toggleSlide}
        />
      )}

      {/* ── UPLOAD MODAL ── */}
      {showUploadModal && (
        <UploadModal
          onClose={() => setShowUploadModal(false)}
          onUploadComplete={(deck) => {
            fetchApiSlides();
          }}
        />
      )}
    </div>
  );
}

