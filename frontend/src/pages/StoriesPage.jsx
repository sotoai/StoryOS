import { useState, useEffect } from "react";
import { C } from "../theme";
import { fw } from "../data/framework";
import { verticals } from "../data/verticals";
import { tagsDef } from "../data/tags";
import { stories, StoryThumbnail } from "../data/stories";
import { allSlides } from "../data/slides";
import { IconCompany, IconSolution, IconNetworking, IconCollaboration, IconInitiative, productIcons, pillarIcons } from "../components/icons/PageIcons";
import { TierLabel } from "../components/shared/TierLabel";
import { TagPill } from "../components/shared/TagPill";
import { DeckTray } from "../components/shared/DeckTray";
import { SlidePreview } from "../components/slides/SlidePreview";
import { SlideLightbox } from "../components/slides/SlideLightbox";

function StoryCard({ story, onClick, selectedIds, onAddToDeck }) {
  const prodLabels = story.tags.products.map(p => tagsDef.products[p]);
  const industryLabel = tagsDef.verticals[story.industry] || story.industry;
  const slideIds = story.storySlideIds || [];
  const allInDeck = slideIds.length > 0 && slideIds.every(id => selectedIds.includes(id));
  const someInDeck = slideIds.some(id => selectedIds.includes(id));
  return (
    <div
      onClick={onClick}
      style={{
        border: `1px solid ${C.border}`, borderRadius: 2, background: C.bg, cursor: "pointer",
        transition: "all 0.2s ease", display: "flex", flexDirection: "column", overflow: "hidden",
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = C.textTertiary; e.currentTarget.style.background = C.accentSoft; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.bg; }}
    >
      {/* Thumbnail */}
      <div style={{ aspectRatio: "16/9", overflow: "hidden", position: "relative" }}>
        <StoryThumbnail storyId={story.id} />
        <div style={{ position: "absolute", bottom: 8, left: 8, display: "flex", gap: 4 }}>
          <TagPill label={industryLabel} small />
          {prodLabels.map(p => <TagPill key={p} label={p} small />)}
        </div>
        {/* Add to deck button */}
        <div
          onClick={e => { e.stopPropagation(); onAddToDeck(slideIds, allInDeck); }}
          style={{
            position: "absolute", top: 8, right: 8, width: 28, height: 28, borderRadius: 2,
            background: allInDeck ? C.text : "rgba(255,255,255,0.9)", border: `1.5px solid ${allInDeck ? C.text : "rgba(150,150,150,0.5)"}`,
            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
            transition: "all 0.15s", backdropFilter: allInDeck ? "none" : "blur(4px)",
          }}
          title={allInDeck ? "Remove from deck" : "Add slides to deck"}
        >
          {allInDeck ? (
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={C.bg} strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
          ) : someInDeck ? (
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12" /></svg>
          ) : (
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          )}
        </div>
      </div>
      {/* Content */}
      <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 500, color: C.text, marginBottom: 4 }}>{story.customer}</div>
          <div style={{ fontSize: 12, color: C.textSecondary, fontWeight: 300, lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{story.summary}</div>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: "auto" }}>
          {story.metrics.map((m, i) => (
            <div key={i} style={{ fontSize: 11, color: C.textTertiary }}>
              <span style={{ fontWeight: 600, color: C.text, marginRight: 3 }}>{m.value}</span>{m.label}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12, fontSize: 10, color: C.textTertiary }}>
          {story.videoUrl !== null && <span>▶ Video</span>}
          <span>◻ {slideIds.length} slides</span>
          <span style={{ marginLeft: "auto" }}>{story.date}</span>
        </div>
      </div>
    </div>
  );
}

function StoryDetail({ story, onBack, selectedIds, setSelectedIds }) {
  const sectionLabel = { fontSize: 10, letterSpacing: 2, fontWeight: 500, color: C.textTertiary, textTransform: "uppercase", marginBottom: 8 };
  const bodyText = { fontSize: 14, color: C.textSecondary, lineHeight: 1.8, fontWeight: 300 };
  const industryLabel = tagsDef.verticals[story.industry] || story.industry;
  const prodLabels = story.tags.products.map(p => tagsDef.products[p]);
  const initLabels = story.tags.initiatives.map(i => tagsDef.initiatives[i]).filter(Boolean);
  const roleLabels = story.tags.buyerRoles.map(r => tagsDef.buyerRoles[r]).filter(Boolean);
  const slideIds = story.storySlideIds || [];
  const storySlides = slideIds.map(id => allSlides.find(s => s.id === id)).filter(Boolean);
  const allInDeck = slideIds.length > 0 && slideIds.every(id => selectedIds.includes(id));
  const toggleSlide = (id) => setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const addAllSlides = () => {
    if (allInDeck) setSelectedIds(prev => prev.filter(id => !slideIds.includes(id)));
    else setSelectedIds(prev => [...prev, ...slideIds.filter(id => !prev.includes(id))]);
  };
  const [lightboxSlide, setLightboxSlide] = useState(null);

  return (
    <div style={{ padding: "24px 32px", maxWidth: 800 }}>
      {/* Back button */}
      <div
        onClick={onBack}
        style={{ fontSize: 12, color: C.textTertiary, cursor: "pointer", marginBottom: 24, display: "inline-flex", alignItems: "center", gap: 6 }}
        onMouseEnter={e => e.currentTarget.style.color = C.text}
        onMouseLeave={e => e.currentTarget.style.color = C.textTertiary}
      >
        ← All Stories
      </div>

      {/* Hero thumbnail */}
      <div style={{ aspectRatio: "16/7", overflow: "hidden", borderRadius: 2, marginBottom: 24, border: `1px solid ${C.border}` }}>
        <StoryThumbnail storyId={story.id} width={640} height={280} />
      </div>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
          <TagPill label={industryLabel} />
          {prodLabels.map(p => <TagPill key={p} label={p} />)}
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 300, color: C.text, margin: 0, marginBottom: 8 }}>{story.customer}</h1>
        <p style={{ fontSize: 15, color: C.textSecondary, fontWeight: 300, lineHeight: 1.6, margin: 0 }}>{story.summary}</p>
      </div>

      {/* Metrics */}
      <div style={{ display: "flex", gap: 24, marginBottom: 40, padding: "20px 0", borderTop: `1px solid ${C.borderLight}`, borderBottom: `1px solid ${C.borderLight}` }}>
        {story.metrics.map((m, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 24, fontWeight: 300, color: C.text }}>{m.value}</div>
            <div style={{ fontSize: 11, color: C.textTertiary, marginTop: 4 }}>{m.label}</div>
          </div>
        ))}
      </div>

      {/* Problem */}
      <div style={{ marginBottom: 32 }}>
        <p style={sectionLabel}>Problem</p>
        <p style={bodyText}>{story.problem}</p>
      </div>

      {/* Solution */}
      <div style={{ marginBottom: 32 }}>
        <p style={sectionLabel}>Solution</p>
        <p style={bodyText}>{story.solution}</p>
      </div>

      {/* Outcome */}
      <div style={{ marginBottom: 40 }}>
        <p style={sectionLabel}>Outcome</p>
        <p style={bodyText}>{story.outcome}</p>
      </div>

      {/* Video placeholder */}
      <div style={{ marginBottom: 40 }}>
        <p style={sectionLabel}>Video</p>
        <div style={{
          aspectRatio: "16/9", maxWidth: 560, background: C.accentSoft, borderRadius: 2,
          border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{ width: 48, height: 48, borderRadius: "50%", border: `2px solid ${C.textTertiary}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width={18} height={18} viewBox="0 0 24 24" fill={C.textTertiary}><polygon points="8,5 20,12 8,19" /></svg>
          </div>
        </div>
        <div style={{ fontSize: 11, color: C.textTertiary, marginTop: 8 }}>Video coming soon</div>
      </div>

      {/* Story Slides */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <p style={{ ...sectionLabel, marginBottom: 0 }}>Story Slides ({storySlides.length})</p>
          <button
            onClick={addAllSlides}
            style={{
              background: allInDeck ? C.text : "none", color: allInDeck ? C.bg : C.text,
              border: `1px solid ${C.text}`, borderRadius: 2, padding: "5px 14px", cursor: "pointer",
              fontSize: 11, fontWeight: 500, transition: "all 0.15s", fontFamily: "inherit",
            }}
          >
            {allInDeck ? "Remove All from Deck" : "Add All to Deck"}
          </button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10 }}>
          {storySlides.map(slide => {
            const isInDeck = selectedIds.includes(slide.id);
            return (
              <div
                key={slide.id}
                onClick={() => setLightboxSlide(slide)}
                style={{
                  position: "relative", border: `1px solid ${isInDeck ? C.text : C.border}`, borderRadius: 2, overflow: "hidden",
                  transition: "all 0.2s", boxShadow: isInDeck ? `0 0 0 1px ${C.text}` : "none", cursor: "pointer",
                }}
                onMouseEnter={e => { if (!isInDeck) e.currentTarget.style.borderColor = C.textTertiary; }}
                onMouseLeave={e => { if (!isInDeck) e.currentTarget.style.borderColor = C.border; }}
              >
                <div style={{ aspectRatio: "16/9" }}>
                  <SlidePreview slide={slide} width={320} height={180} responsive />
                </div>
                {/* Checkbox */}
                <div
                  onClick={e => { e.stopPropagation(); toggleSlide(slide.id); }}
                  style={{
                    position: "absolute", top: 6, left: 6, width: 18, height: 18,
                    border: `1.5px solid ${isInDeck ? C.text : "rgba(150,150,150,0.7)"}`,
                    borderRadius: 2, background: isInDeck ? C.text : "rgba(255,255,255,0.85)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", transition: "all 0.15s",
                  }}
                >
                  {isInDeck && <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>}
                </div>
                <div style={{ height: 2, background: isInDeck ? C.text : C.border }} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Slide Lightbox */}
      {lightboxSlide && (
        <SlideLightbox
          slide={lightboxSlide}
          allFilteredSlides={storySlides}
          onClose={() => setLightboxSlide(null)}
          isSelected={(id) => selectedIds.includes(id)}
          onToggle={(id) => setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])}
        />
      )}

      {/* Tags */}
      <div style={{ borderTop: `1px solid ${C.borderLight}`, paddingTop: 24 }}>
        <p style={sectionLabel}>Tags</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontSize: 10, color: C.textTertiary, width: 70, flexShrink: 0 }}>Products</span>
            {prodLabels.map(p => <TagPill key={p} label={p} small />)}
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontSize: 10, color: C.textTertiary, width: 70, flexShrink: 0 }}>Initiatives</span>
            {initLabels.map(l => <TagPill key={l} label={l} small />)}
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontSize: 10, color: C.textTertiary, width: 70, flexShrink: 0 }}>Buyers</span>
            {roleLabels.map(l => <TagPill key={l} label={l} small />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export function StoriesPage({ selectedIds, setSelectedIds }) {
  const [vertical, setVertical] = useState("all");
  const [activeFilter, setActiveFilter] = useState(null);
  const [sortBy, setSortBy] = useState("date");
  const [selectedStory, setSelectedStory] = useState(null);
  const [expandedNodes, setExpandedNodes] = useState({ networking: true, collaboration: true });
  const [activeProduct, setActiveProduct] = useState("networking");
  const [expandedInit, setExpandedInit] = useState({});
  const [panelWidth, setPanelWidth] = useState(280);
  const [isDragging, setIsDragging] = useState(false);

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

  const toggleNode = (key) => setExpandedNodes(prev => ({ ...prev, [key]: !prev[key] }));

  const isFilterMatch = (filter) => {
    if (!activeFilter || !filter) return false;
    return JSON.stringify(activeFilter) === JSON.stringify(filter);
  };

  const setFilter = (filter) => setActiveFilter(isFilterMatch(filter) ? null : filter);

  // Count stories matching a filter
  const countFor = (filterFn) => stories.filter(s => {
    if (vertical !== "all" && s.industry !== vertical) return false;
    return filterFn(s);
  }).length;

  const filtered = stories.filter(s => {
    if (vertical !== "all" && s.industry !== vertical) return false;
    if (!activeFilter) return true;
    if (activeFilter.type === "product") return s.tags.products.includes(activeFilter.productId);
    if (activeFilter.type === "initiative") return s.tags.initiatives.includes(activeFilter.initiativeId);
    if (activeFilter.type === "buyerRole") return s.tags.buyerRoles.includes(activeFilter.roleId);
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "date") return b.date.localeCompare(a.date);
    if (sortBy === "industry") return a.industry.localeCompare(b.industry);
    if (sortBy === "product") return (a.tags.products[0] || "").localeCompare(b.tags.products[0] || "");
    return 0;
  });

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

  const countBadge = (n) => (
    <span style={{ fontSize: 9, color: C.textTertiary, marginLeft: "auto", flexShrink: 0 }}>{n}</span>
  );

  const buyerRoles = Object.entries(tagsDef.buyerRoles);
  const products = fw.products;
  const product = products.find(p => p.id === activeProduct);
  const vData = vertical !== "all" && vertical !== "general" ? verticals[vertical] : null;
  const verticalOptions = [["all", "All Verticals"], ...Object.entries(verticals).map(([k, v]) => [k, v.label])];
  const toggleInit = (id) => setExpandedInit(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <div style={{ display: "flex", height: "100%", overflow: "hidden" }}>
      {/* ── LEFT PANEL ── */}
      <div style={{ width: panelWidth, borderRight: `1px solid ${C.border}`, background: C.surface, display: "flex", flexDirection: "column", flexShrink: 0 }}>
        {/* Header */}
        <div style={{ padding: "20px 16px 16px", borderBottom: `1px solid ${C.border}` }}>
          <h2 style={{ fontSize: 15, fontWeight: 500, letterSpacing: "-0.3px", color: C.text, marginBottom: 12 }}>Stories</h2>
          <select value={vertical} onChange={e => { setVertical(e.target.value); setActiveFilter(null); }} style={{ ...selectStyle, width: "100%" }}>
            {verticalOptions.map(([k, label]) => <option key={k} value={k}>{label}</option>)}
          </select>
        </div>

        {/* Content — tree or diagram depending on width */}
        <div style={{ flex: 1, overflowY: "auto", padding: isWide ? "16px 20px" : "8px 0" }}>
          {isWide ? (
            /* ── WIDE: Diagram View (matches Deck Builder) ── */
            <>
              {/* Company */}
              <div style={{ marginBottom: 4 }}>
                <p style={{ fontSize: 8, fontWeight: 500, letterSpacing: 1.5, textTransform: "uppercase", color: C.textTertiary, marginBottom: 4 }}>
                  <IconCompany size={10} /> Company
                </p>
              </div>
              <div
                onClick={() => setFilter({ type: "company" })}
                style={{
                  padding: "14px 16px", border: `1px solid ${isFilterMatch({ type: "company" }) ? C.text : C.border}`, borderRadius: 2,
                  background: isFilterMatch({ type: "company" }) ? C.accentSoft : C.bg, cursor: "pointer", transition: "all 0.15s ease",
                }}
                onMouseEnter={e => { if (!isFilterMatch({ type: "company" })) e.currentTarget.style.background = C.accentSoft; }}
                onMouseLeave={e => { if (!isFilterMatch({ type: "company" })) e.currentTarget.style.background = isFilterMatch({ type: "company" }) ? C.accentSoft : C.bg; }}
              >
                <p style={{ fontSize: 13, fontWeight: 400, color: C.text, marginBottom: 2 }}>{fw.company.headline}</p>
                <p style={{ fontSize: 11, color: C.textTertiary, fontWeight: 300 }}>{fw.company.tagline}</p>
              </div>

              {/* Connector */}
              <div style={{ display: "flex", justifyContent: "center", padding: "4px 0" }}><div style={{ width: 1, height: 16, background: C.border }} /></div>

              {/* Solution Category */}
              <div style={{ marginBottom: 4 }}>
                <p style={{ fontSize: 8, fontWeight: 500, letterSpacing: 1.5, textTransform: "uppercase", color: C.textTertiary, marginBottom: 4 }}>
                  <IconSolution size={10} /> Solution Category
                </p>
              </div>
              <div
                onClick={() => setFilter({ type: "solution" })}
                style={{
                  padding: "14px 16px", border: `1px solid ${isFilterMatch({ type: "solution" }) ? C.text : C.border}`, borderRadius: 2,
                  background: isFilterMatch({ type: "solution" }) ? C.accentSoft : C.bg, cursor: "pointer", transition: "all 0.15s ease",
                }}
                onMouseEnter={e => { if (!isFilterMatch({ type: "solution" })) e.currentTarget.style.background = C.accentSoft; }}
                onMouseLeave={e => { if (!isFilterMatch({ type: "solution" })) e.currentTarget.style.background = isFilterMatch({ type: "solution" }) ? C.accentSoft : C.bg; }}
              >
                <p style={{ fontSize: 13, fontWeight: 400, color: C.text, marginBottom: 2 }}>{fw.solutionCategory.headline}</p>
                <p style={{ fontSize: 11, color: C.textTertiary, fontWeight: 300 }}>{vData?.solutionTagline || fw.solutionCategory.tagline}</p>
                <div style={{ display: "flex", gap: 4, marginTop: 8, flexWrap: "wrap" }}>
                  {fw.solutionCategory.pillars.map((p, i) => {
                    const Icon = pillarIcons[p.label];
                    return (
                      <span key={i} style={{ fontSize: 8, color: C.textTertiary, padding: "2px 8px", border: `1px solid ${C.border}`, borderRadius: 100, display: "inline-flex", alignItems: "center", gap: 3 }}>
                        {Icon && <Icon size={9} />}
                        {p.label}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Split Connector */}
              <svg width="100%" height="24" viewBox="0 0 400 24" preserveAspectRatio="none" style={{ display: "block" }}>
                <line x1="200" y1="0" x2="200" y2="8" stroke={C.border} strokeWidth="1" />
                <line x1="100" y1="8" x2="300" y2="8" stroke={C.border} strokeWidth="1" />
                <line x1="100" y1="8" x2="100" y2="24" stroke={C.border} strokeWidth="1" />
                <line x1="300" y1="8" x2="300" y2="24" stroke={C.border} strokeWidth="1" />
              </svg>

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
                        const initCount = countFor(s => s.tags.initiatives.includes(init.id));
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
                              <div style={{ flex: 1 }} onClick={() => setFilter(initFilter)}>
                                <p style={{ fontSize: 11, fontWeight: 500, color: C.text, marginBottom: 2, lineHeight: 1.3 }}>{init.name}</p>
                                <p style={{ fontSize: 9, color: C.textTertiary, fontWeight: 300 }}>{init.tagline}</p>
                              </div>
                              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                <span style={{ fontSize: 9, color: C.textTertiary }}>{initCount}</span>
                                <span
                                  onClick={(e) => { e.stopPropagation(); toggleInit(init.id); }}
                                  style={{
                                    fontSize: 14, color: C.textTertiary, fontWeight: 200, cursor: "pointer",
                                    transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s", display: "inline-block", flexShrink: 0,
                                  }}
                                >&#8964;</span>
                              </div>
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

              {/* Divider */}
              <div style={{ height: 1, background: C.borderLight, margin: "16px 0" }} />

              {/* Sort */}
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 9, letterSpacing: 1.5, fontWeight: 500, color: C.textTertiary, textTransform: "uppercase", marginBottom: 6 }}>Sort By</div>
                <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ ...selectStyle, width: "100%" }}>
                  <option value="date">Most Recent</option>
                  <option value="industry">Industry</option>
                  <option value="product">Product</option>
                </select>
              </div>

              {/* Buyer Roles */}
              <div style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 9, letterSpacing: 1.5, fontWeight: 500, color: C.textTertiary, textTransform: "uppercase", marginBottom: 8 }}>Buyer Roles</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {buyerRoles.map(([key, label]) => {
                    const roleFilter = { type: "buyerRole", roleId: key };
                    const isActive = isFilterMatch(roleFilter);
                    const roleCount = countFor(s => s.tags.buyerRoles.includes(key));
                    if (roleCount === 0) return null;
                    return (
                      <div
                        key={key}
                        onClick={() => setFilter(roleFilter)}
                        style={{
                          padding: "3px 8px", fontSize: 10, borderRadius: 2, cursor: "pointer",
                          border: `1px solid ${isActive ? C.text : C.border}`,
                          background: isActive ? C.accentSoft : "transparent",
                          color: isActive ? C.text : C.textSecondary,
                          fontWeight: isActive ? 500 : 400,
                          transition: "all 0.15s",
                        }}
                      >
                        {label} <span style={{ fontSize: 9, color: C.textTertiary }}>{roleCount}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Clear filter */}
              {activeFilter && (
                <div
                  onClick={() => setActiveFilter(null)}
                  style={{ padding: "6px 0", fontSize: 10, color: C.textTertiary, cursor: "pointer", textAlign: "center" }}
                  onMouseEnter={e => e.currentTarget.style.color = C.text}
                  onMouseLeave={e => e.currentTarget.style.color = C.textTertiary}
                >
                  Show all stories
                </div>
              )}
            </>
          ) : (
            /* ── NARROW: Compact Tree View ── */
            <>
              {/* Company */}
              <div onClick={() => setFilter({ type: "company" })} style={treeItemStyle(0, isFilterMatch({ type: "company" }))} onMouseEnter={e => { if (!isFilterMatch({ type: "company" })) e.currentTarget.style.background = C.accentSoft; }} onMouseLeave={e => { if (!isFilterMatch({ type: "company" })) e.currentTarget.style.background = isFilterMatch({ type: "company" }) ? C.accentSoft : "transparent"; }}>
                <IconCompany size={12} /> <span>One Cisco</span>
              </div>
              {/* Solution Category */}
              <div onClick={() => setFilter({ type: "solution" })} style={treeItemStyle(0, isFilterMatch({ type: "solution" }))} onMouseEnter={e => { if (!isFilterMatch({ type: "solution" })) e.currentTarget.style.background = C.accentSoft; }} onMouseLeave={e => { if (!isFilterMatch({ type: "solution" })) e.currentTarget.style.background = isFilterMatch({ type: "solution" }) ? C.accentSoft : "transparent"; }}>
                <IconSolution size={12} /> <span>Futureproof Workplace</span>
              </div>
              {/* Products → Initiatives tree */}
              {products.map(prod => {
                const PIcon = prod.id === "networking" ? IconNetworking : IconCollaboration;
                const isExpanded = expandedNodes[prod.id];
                const prodFilter = { type: "product", productId: prod.id };
                const prodCount = countFor(s => s.tags.products.includes(prod.id));
                return (
                  <div key={prod.id}>
                    <div
                      style={treeItemStyle(0, isFilterMatch(prodFilter))}
                      onMouseEnter={e => { if (!isFilterMatch(prodFilter)) e.currentTarget.style.background = C.accentSoft; }}
                      onMouseLeave={e => { if (!isFilterMatch(prodFilter)) e.currentTarget.style.background = isFilterMatch(prodFilter) ? C.accentSoft : "transparent"; }}
                    >
                      <span onClick={() => toggleNode(prod.id)}>{chevron(isExpanded)}</span>
                      <span onClick={() => setFilter(prodFilter)} style={{ display: "flex", alignItems: "center", gap: 6, flex: 1, overflow: "hidden" }}>
                        <PIcon size={12} /> {prod.name}
                      </span>
                      {countBadge(prodCount)}
                    </div>
                    {isExpanded && prod.initiatives.map(init => {
                      const initFilter = { type: "initiative", initiativeId: init.id };
                      const initCount = countFor(s => s.tags.initiatives.includes(init.id));
                      return (
                        <div
                          key={init.id}
                          onClick={() => setFilter(initFilter)}
                          style={treeItemStyle(1, isFilterMatch(initFilter))}
                          onMouseEnter={e => { if (!isFilterMatch(initFilter)) e.currentTarget.style.background = C.accentSoft; }}
                          onMouseLeave={e => { if (!isFilterMatch(initFilter)) e.currentTarget.style.background = isFilterMatch(initFilter) ? C.accentSoft : "transparent"; }}
                        >
                          <IconInitiative size={10} />
                          <span style={{ overflow: "hidden", textOverflow: "ellipsis", flex: 1 }}>{init.name}</span>
                          {countBadge(initCount)}
                        </div>
                      );
                    })}
                  </div>
                );
              })}

              {/* Divider */}
              <div style={{ height: 1, background: C.borderLight, margin: "8px 16px" }} />

              {/* Sort */}
              <div style={{ padding: "4px 16px 8px" }}>
                <div style={{ fontSize: 9, letterSpacing: 1.5, fontWeight: 500, color: C.textTertiary, textTransform: "uppercase", marginBottom: 6 }}>Sort By</div>
                <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ ...selectStyle, width: "100%" }}>
                  <option value="date">Most Recent</option>
                  <option value="industry">Industry</option>
                  <option value="product">Product</option>
                </select>
              </div>

              {/* Buyer Roles */}
              <div style={{ height: 1, background: C.borderLight, margin: "8px 16px" }} />
              <div style={{ padding: "4px 16px 8px" }}>
                <div style={{ fontSize: 9, letterSpacing: 1.5, fontWeight: 500, color: C.textTertiary, textTransform: "uppercase", marginBottom: 6 }}>Buyer Roles</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {buyerRoles.map(([key, label]) => {
                    const roleFilter = { type: "buyerRole", roleId: key };
                    const isActive = isFilterMatch(roleFilter);
                    const roleCount = countFor(s => s.tags.buyerRoles.includes(key));
                    if (roleCount === 0) return null;
                    return (
                      <div
                        key={key}
                        onClick={() => setFilter(roleFilter)}
                        style={{
                          padding: "3px 8px", fontSize: 10, borderRadius: 2, cursor: "pointer",
                          border: `1px solid ${isActive ? C.text : C.border}`,
                          background: isActive ? C.accentSoft : "transparent",
                          color: isActive ? C.text : C.textSecondary,
                          fontWeight: isActive ? 500 : 400,
                          transition: "all 0.15s",
                        }}
                      >
                        {label} <span style={{ fontSize: 9, color: C.textTertiary }}>{roleCount}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Clear filter link */}
              {activeFilter && (
                <div
                  onClick={() => setActiveFilter(null)}
                  style={{ ...treeItemStyle(0, false), marginTop: 4, fontSize: 10, color: C.textTertiary, justifyContent: "center" }}
                  onMouseEnter={e => e.currentTarget.style.background = C.accentSoft}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  Show all stories
                </div>
              )}
            </>
          )}
        </div>

        {/* Summary footer */}
        <div style={{ padding: "12px 16px", borderTop: `1px solid ${C.border}`, fontSize: 11, color: C.textTertiary }}>
          {sorted.length} stor{sorted.length === 1 ? "y" : "ies"} · {stories.length} total
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
        onMouseEnter={e => { if (!isDragging) e.currentTarget.style.background = C.borderLight; }}
        onMouseLeave={e => { if (!isDragging) e.currentTarget.style.background = "transparent"; }}
      />

      {/* ── RIGHT PANEL ── */}
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: selectedIds.length > 0 ? 52 : 0 }}>
        {selectedStory ? (
          <StoryDetail story={selectedStory} onBack={() => setSelectedStory(null)} selectedIds={selectedIds} setSelectedIds={setSelectedIds} />
        ) : (
          <div style={{ padding: "24px 32px" }}>
            {sorted.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 0", color: C.textTertiary, fontSize: 13 }}>No stories match the current filter.</div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
                {sorted.map(s => (
                  <StoryCard
                    key={s.id}
                    story={s}
                    onClick={() => setSelectedStory(s)}
                    selectedIds={selectedIds}
                    onAddToDeck={(ids, allIn) => {
                      if (allIn) setSelectedIds(prev => prev.filter(id => !ids.includes(id)));
                      else setSelectedIds(prev => [...prev, ...ids.filter(id => !prev.includes(id))]);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── DECK TRAY ── */}
      <DeckTray
        count={selectedIds.length}
        onClear={() => setSelectedIds([])}
        onPreview={() => {}}
        onDownload={() => alert("Switch to Deck Builder to download slides.")}
      />
    </div>
  );
}

