import { useState, useRef, useEffect } from "react";
import { C } from "../theme";
import { fw } from "../data/framework";
import { verticals } from "../data/verticals";
import { tagsDef } from "../data/tags";
import { allSlides } from "../data/slides";
import { coAuthorDrafts, coAuthorQueue, coAuthorGaps, coAuthorAngles } from "../data/coauthor";
import { moments, EVENT_TYPES } from "../data/moments";
import { NavIconCoAuthor, NavIconDeck } from "../components/icons/NavIcons";
import { TierLabel } from "../components/shared/TierLabel";
import { SlidePreview } from "../components/slides/SlidePreview";
import { SlideLightbox } from "../components/slides/SlideLightbox";

const contentTypes = ["Blog Post", "Slide Narrative", "Demo Script", "Customer Brief", "Internal Memo", "Social Post", "Email Sequence"];
const tones = ["Executive Summary", "Formal / Technical", "Conversational / Blog", "Social-Optimized"];
const urgencies = ["Standard", "Fast Track", "Critical"];

// Pin icon SVG
function PinIcon({ size = 12, filled = false, color }) {
  const c = color || C.textTertiary;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? c : "none"} stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 17v5" /><path d="M5 17h14" /><path d="M7.5 7L6 17h12l-1.5-10" /><path d="M9 3h6v4H9z" />
    </svg>
  );
}

// Format date helpers
const fmtDate = (d) => new Date(d + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
const fmtDateShort = (d) => new Date(d + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" });

export function CoAuthorPage({ setActivePage }) {
  // Form state
  const [contentType, setContentType] = useState("");
  const [objective, setObjective] = useState("");
  const [audience, setAudience] = useState([]);
  const [vertical, setVertical] = useState("general");
  const [productScope, setProductScope] = useState([]);
  const [initiativeScope, setInitiativeScope] = useState([]);
  const [newInfo, setNewInfo] = useState("");
  const [refMaterials, setRefMaterials] = useState("");
  const [tone, setTone] = useState("Executive Summary");
  const [urgency, setUrgency] = useState("Standard");

  // Results state
  const [hasGenerated, setHasGenerated] = useState(false);
  const [activeTab, setActiveTab] = useState("analysis");
  const [lightboxSlide, setLightboxSlide] = useState(null);

  // Moments + Pinning state
  const [pinnedItems, setPinnedItems] = useState([]);
  const [selectedMoment, setSelectedMoment] = useState(null);
  const [momentTypeFilter, setMomentTypeFilter] = useState([]);
  const [momentProductFilter, setMomentProductFilter] = useState("all");
  const [expandedMomentSections, setExpandedMomentSections] = useState({ decks: true, transcripts: false, spaces: false });
  const [showLeftMoments, setShowLeftMoments] = useState(false);
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const timelineRef = useRef(null);

  const selectStyle = {
    appearance: "none", WebkitAppearance: "none",
    background: C.surface, border: `1px solid ${C.border}`, borderRadius: 2,
    padding: "8px 28px 8px 10px", fontSize: 12, fontWeight: 400, fontFamily: "inherit", color: C.text, cursor: "pointer", width: "100%",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23999' fill='none' stroke-width='1.2'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center",
  };
  const labelStyle = { fontSize: 9, letterSpacing: 1.5, fontWeight: 500, color: C.textTertiary, textTransform: "uppercase", marginBottom: 6 };
  const textareaBase = { width: "100%", padding: 10, fontSize: 13, fontFamily: "inherit", border: `1px solid ${C.border}`, borderRadius: 2, background: C.bg, color: C.text, resize: "vertical", lineHeight: 1.6, fontWeight: 300, outline: "none" };

  // Get available initiatives based on product scope
  const availableInits = fw.products
    .filter(p => productScope.length === 0 || productScope.includes(p.id))
    .flatMap(p => p.initiatives);

  const toggleChip = (arr, setArr, val) => setArr(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]);

  // Filter slides based on scope
  const relevantSlides = allSlides.filter(s => {
    if (productScope.length > 0 && !productScope.includes(s.productId)) return false;
    if (initiativeScope.length > 0 && !initiativeScope.includes(s.initiativeId)) return false;
    if (s.type === "story") return false;
    return s.verticals.includes("general") || s.verticals.includes(vertical);
  }).slice(0, 4);

  const draft = coAuthorDrafts[contentType] || coAuthorDrafts["Blog Post"];

  const chipStyle = (isActive, variant) => ({
    display: "inline-block", fontSize: 11, padding: "4px 12px",
    border: `1px solid ${variant === "critical" && isActive ? "#c0392b" : isActive ? C.text : C.border}`, borderRadius: 100,
    background: variant === "critical" && isActive ? "transparent" : isActive ? C.text : "transparent",
    color: variant === "critical" && isActive ? "#c0392b" : isActive ? C.bg : C.textSecondary,
    cursor: "pointer", transition: "all 0.15s ease", whiteSpace: "nowrap", fontWeight: 400,
  });

  // ── Pinning helpers ──
  const isPinned = (id) => pinnedItems.some(p => p.id === id);
  const togglePin = (item) => {
    setPinnedItems(prev => prev.some(p => p.id === item.id) ? prev.filter(p => p.id !== item.id) : [...prev, item]);
  };
  const pinnedDecks = pinnedItems.filter(p => p.type === "deck");
  const pinnedTranscripts = pinnedItems.filter(p => p.type === "transcript");
  const pinnedSpaces = pinnedItems.filter(p => p.type === "space");

  // ── Moments filtering ──
  const filteredMoments = moments.filter(m => {
    if (momentTypeFilter.length > 0 && !momentTypeFilter.includes(m.type)) return false;
    if (momentProductFilter !== "all" && !m.products.includes(momentProductFilter)) return false;
    return true;
  }).sort((a, b) => new Date(a.date) - new Date(b.date));

  // ── Timeline positioning ──
  const timelineDates = filteredMoments.map(m => new Date(m.date + "T00:00:00"));
  const minDate = timelineDates.length > 0 ? new Date(Math.min(...timelineDates) - 30 * 86400000) : new Date("2025-05-01");
  const maxDate = timelineDates.length > 0 ? new Date(Math.max(...timelineDates) + 30 * 86400000) : new Date("2026-04-01");
  const totalDays = (maxDate - minDate) / 86400000;
  const timelineWidth = Math.max(totalDays * 3.5, 800);
  const getX = (dateStr) => {
    const d = new Date(dateStr + "T00:00:00");
    return ((d - minDate) / 86400000 / totalDays) * timelineWidth;
  };

  // Month labels
  const monthLabels = [];
  const cur = new Date(minDate);
  cur.setDate(1);
  cur.setMonth(cur.getMonth() + 1);
  while (cur < maxDate) {
    monthLabels.push({ date: new Date(cur), label: cur.toLocaleDateString("en-US", { month: "short", year: "numeric" }) });
    cur.setMonth(cur.getMonth() + 1);
  }

  // Scroll timeline to end on mount
  useEffect(() => {
    if (timelineRef.current && activeTab === "moments") {
      timelineRef.current.scrollLeft = timelineRef.current.scrollWidth;
    }
  }, [activeTab]);

  // Build draft text that references pinned moments
  const buildDraftWithSources = () => {
    if (pinnedItems.length === 0) return draft;
    const momentNames = [...new Set(pinnedItems.map(p => p.momentTitle))];
    const sourceIntro = `Building on the narrative established at ${momentNames.join(" and ")}, this draft synthesizes the authoritative positioning for the Futureproof Workplace.`;
    return {
      ...draft,
      sections: [
        { heading: null, body: sourceIntro },
        ...draft.sections,
      ],
    };
  };

  const activeDraft = buildDraftWithSources();

  // Tab definitions
  const tabs = [
    { id: "analysis", label: "Draft" },
    { id: "queue", label: "Queue" },
    { id: "moments", label: "Moments" },
  ];

  return (
    <div style={{ display: "flex", flex: 1, height: "100vh", overflow: "hidden" }}>
      {/* ── LEFT PANEL — INTAKE FORM ── */}
      <div style={{ width: 400, borderRight: `1px solid ${C.border}`, background: C.surface, display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <div style={{ padding: "20px 20px 16px", borderBottom: `1px solid ${C.border}` }}>
          <h2 style={{ fontSize: 15, fontWeight: 500, letterSpacing: "-0.3px", color: C.text, marginBottom: 4 }}>Co-Author</h2>
          <p style={{ fontSize: 11, color: C.textTertiary, fontWeight: 300 }}>Structured content intake and AI-assisted drafting.</p>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px 24px" }}>
          {/* Content Type */}
          <div style={{ marginBottom: 14 }}>
            <div style={labelStyle}>Content Type</div>
            <select value={contentType} onChange={e => { setContentType(e.target.value); setHasGenerated(false); }} style={selectStyle}>
              <option value="">Select type...</option>
              {contentTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          {/* Objective */}
          <div style={{ marginBottom: 14 }}>
            <div style={labelStyle}>Objective</div>
            <textarea value={objective} onChange={e => setObjective(e.target.value)} placeholder="What are we trying to accomplish with this content?" rows={2} style={textareaBase} />
          </div>

          {/* Audience */}
          <div style={{ marginBottom: 14 }}>
            <div style={labelStyle}>Audience</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {Object.entries(tagsDef.buyerRoles).map(([k, v]) => (
                <span key={k} onClick={() => toggleChip(audience, setAudience, k)} style={chipStyle(audience.includes(k))}>{v}</span>
              ))}
            </div>
          </div>

          {/* Vertical */}
          <div style={{ marginBottom: 14 }}>
            <div style={labelStyle}>Vertical</div>
            <select value={vertical} onChange={e => setVertical(e.target.value)} style={selectStyle}>
              {Object.entries(verticals).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
          </div>

          {/* Product Scope */}
          <div style={{ marginBottom: 14 }}>
            <div style={labelStyle}>Product Scope</div>
            <div style={{ display: "flex", gap: 6 }}>
              {Object.entries(tagsDef.products).map(([k, v]) => (
                <span key={k} onClick={() => { toggleChip(productScope, setProductScope, k); setInitiativeScope([]); }} style={chipStyle(productScope.includes(k))}>{v}</span>
              ))}
            </div>
          </div>

          {/* Initiative Scope */}
          <div style={{ marginBottom: 14 }}>
            <div style={labelStyle}>Initiative Scope</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {availableInits.map(init => (
                <span key={init.id} onClick={() => toggleChip(initiativeScope, setInitiativeScope, init.id)} style={chipStyle(initiativeScope.includes(init.id))}>{init.name}</span>
              ))}
            </div>
          </div>

          {/* New Information */}
          <div style={{ marginBottom: 14 }}>
            <div style={labelStyle}>New Information</div>
            <textarea value={newInfo} onChange={e => setNewInfo(e.target.value)} placeholder="What's new? Product update, market trend, competitive move, or customer insight that triggers this content." rows={3} style={textareaBase} />
          </div>

          {/* Reference Materials */}
          <div style={{ marginBottom: 14 }}>
            <div style={labelStyle}>Reference Materials</div>
            <textarea value={refMaterials} onChange={e => setRefMaterials(e.target.value)} placeholder="Paste transcripts, analyst quotes, competitive notes, or any source material here..." rows={4} style={textareaBase} />
          </div>

          {/* ── Canonical Moments (compact left-panel) ── */}
          <div style={{ marginBottom: 14, border: `1px solid ${C.border}`, borderRadius: 2 }}>
            <div
              onClick={() => setShowLeftMoments(!showLeftMoments)}
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", cursor: "pointer", transition: "background 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.background = C.accentSoft}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ ...labelStyle, marginBottom: 0, fontSize: 9 }}>Canonical Moments</span>
                {pinnedItems.length > 0 && (
                  <span style={{ fontSize: 9, fontWeight: 500, color: C.text, background: C.accentSoft, padding: "1px 6px", borderRadius: 100 }}>{pinnedItems.length} pinned</span>
                )}
              </span>
              <span style={{ fontSize: 12, color: C.textTertiary, transform: showLeftMoments ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>&#8964;</span>
            </div>
            {showLeftMoments && (
              <div style={{ padding: "0 12px 10px" }}>
                {moments.slice().sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5).map(m => {
                  const et = EVENT_TYPES[m.type];
                  const hasPinnedArtifact = [...m.decks, ...m.transcripts, ...(m.spaces || [])].some(a => isPinned(a.id));
                  return (
                    <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: `1px solid ${C.borderLight}` }}>
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: et.color, flexShrink: 0 }} />
                      <span style={{ fontSize: 10, color: C.textTertiary, flexShrink: 0, width: 50 }}>{fmtDateShort(m.date)}</span>
                      <span style={{ fontSize: 11, color: C.text, fontWeight: 400, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.title}</span>
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          // Quick-pin first deck of this moment
                          if (m.decks.length > 0) {
                            const deck = m.decks[0];
                            togglePin({ id: deck.id, type: "deck", title: deck.title, momentId: m.id, momentTitle: m.title });
                          }
                        }}
                        style={{ cursor: "pointer", flexShrink: 0, opacity: hasPinnedArtifact ? 1 : 0.4, transition: "opacity 0.15s" }}
                        onMouseEnter={e => e.currentTarget.style.opacity = "1"}
                        onMouseLeave={e => { if (!hasPinnedArtifact) e.currentTarget.style.opacity = "0.4"; }}
                      >
                        <PinIcon size={12} filled={hasPinnedArtifact} color={hasPinnedArtifact ? C.text : C.textTertiary} />
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Tone */}
          <div style={{ marginBottom: 14 }}>
            <div style={labelStyle}>Tone</div>
            <select value={tone} onChange={e => setTone(e.target.value)} style={selectStyle}>
              {tones.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          {/* Urgency */}
          <div style={{ marginBottom: 20 }}>
            <div style={labelStyle}>Urgency</div>
            <div style={{ display: "flex", gap: 6 }}>
              {urgencies.map(u => (
                <span key={u} onClick={() => setUrgency(u)} style={chipStyle(urgency === u, u === "Critical" ? "critical" : undefined)}>{u}</span>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={() => { setHasGenerated(true); setActiveTab("analysis"); }}
            disabled={!contentType}
            style={{
              width: "100%", padding: "10px 0", fontSize: 13, fontWeight: 500,
              background: contentType ? C.text : C.border, color: contentType ? C.bg : C.textTertiary,
              border: "none", borderRadius: 2, cursor: contentType ? "pointer" : "default",
              fontFamily: "inherit", transition: "opacity 0.15s",
            }}
            onMouseEnter={e => { if (contentType) e.currentTarget.style.opacity = "0.85"; }}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            Generate Draft
          </button>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Tab bar — always show */}
        <div style={{ display: "flex", borderBottom: `1px solid ${C.border}`, flexShrink: 0 }}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              flex: 1, padding: "12px 0", fontSize: 13, fontWeight: activeTab === tab.id ? 500 : 300,
              color: activeTab === tab.id ? C.text : C.textTertiary, background: "none", border: "none",
              borderBottom: activeTab === tab.id ? `2px solid ${C.text}` : "2px solid transparent",
              cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s",
            }}>
              {tab.label}
              {tab.id === "moments" && pinnedItems.length > 0 && (
                <span style={{ fontSize: 9, fontWeight: 500, background: C.text, color: C.bg, padding: "1px 5px", borderRadius: 100, marginLeft: 6 }}>{pinnedItems.length}</span>
              )}
            </button>
          ))}
        </div>

        <div style={{ flex: 1, overflowY: "auto", position: "relative" }}>
          {/* ═══ MOMENTS TAB ═══ */}
          {activeTab === "moments" ? (
            <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
              {/* Filters */}
              <div style={{ padding: "16px 24px 12px", borderBottom: `1px solid ${C.border}`, flexShrink: 0 }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center", marginBottom: 10 }}>
                  <span style={{ fontSize: 9, letterSpacing: 1.5, fontWeight: 500, color: C.textTertiary, textTransform: "uppercase", marginRight: 4 }}>Type</span>
                  {Object.entries(EVENT_TYPES).map(([key, et]) => {
                    const active = momentTypeFilter.includes(key);
                    return (
                      <span key={key} onClick={() => setMomentTypeFilter(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key])} style={{
                        fontSize: 10, padding: "3px 10px", borderRadius: 100, cursor: "pointer", transition: "all 0.15s",
                        border: `1px solid ${active ? et.color : C.border}`,
                        background: active ? et.color + "18" : "transparent",
                        color: active ? et.color : C.textSecondary,
                        display: "flex", alignItems: "center", gap: 4,
                      }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: et.color }} />
                        {et.label}
                      </span>
                    );
                  })}
                </div>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <span style={{ fontSize: 9, letterSpacing: 1.5, fontWeight: 500, color: C.textTertiary, textTransform: "uppercase", marginRight: 4 }}>Product</span>
                  {["all", "networking", "collaboration"].map(p => (
                    <span key={p} onClick={() => setMomentProductFilter(p)} style={{
                      fontSize: 10, padding: "3px 10px", borderRadius: 100, cursor: "pointer", transition: "all 0.15s",
                      border: `1px solid ${momentProductFilter === p ? C.text : C.border}`,
                      background: momentProductFilter === p ? C.text : "transparent",
                      color: momentProductFilter === p ? C.bg : C.textSecondary,
                    }}>
                      {p === "all" ? "All" : p === "networking" ? "Networking" : "Collaboration"}
                    </span>
                  ))}
                </div>
              </div>

              {/* Horizontal Timeline */}
              <div ref={timelineRef} style={{ overflowX: "auto", overflowY: "hidden", flexShrink: 0, padding: "20px 24px 16px", scrollBehavior: "smooth" }}>
                <div style={{ position: "relative", width: timelineWidth, height: 130 }}>
                  {/* Center line */}
                  <div style={{ position: "absolute", top: 55, left: 0, right: 0, height: 1, background: C.border }} />

                  {/* Month labels */}
                  {monthLabels.map((ml, i) => {
                    const x = ((ml.date - minDate) / 86400000 / totalDays) * timelineWidth;
                    return (
                      <div key={i} style={{ position: "absolute", left: x, top: 52, transform: "translateX(-50%)" }}>
                        <div style={{ height: 8, width: 1, background: C.border, margin: "0 auto" }} />
                        <div style={{ fontSize: 9, color: C.textTertiary, textTransform: "uppercase", letterSpacing: 1, marginTop: 2, whiteSpace: "nowrap" }}>{ml.label}</div>
                      </div>
                    );
                  })}

                  {/* Today marker */}
                  {(() => {
                    const today = new Date();
                    if (today >= minDate && today <= maxDate) {
                      const x = ((today - minDate) / 86400000 / totalDays) * timelineWidth;
                      return <div style={{ position: "absolute", left: x, top: 10, bottom: 10, width: 1, borderLeft: `1px dashed ${C.textTertiary}`, opacity: 0.4 }} />;
                    }
                    return null;
                  })()}

                  {/* Event markers */}
                  {filteredMoments.map((m, i) => {
                    const et = EVENT_TYPES[m.type];
                    const x = getX(m.date);
                    const above = i % 2 === 0;
                    const isSelected = selectedMoment?.id === m.id;
                    const isHovered = hoveredMarker === m.id;
                    const hasMultiDay = !!m.dateEnd;

                    return (
                      <div key={m.id} style={{ position: "absolute", left: x, top: 0, transform: "translateX(-50%)", width: 140, display: "flex", flexDirection: "column", alignItems: "center", zIndex: isHovered ? 10 : 1 }}>
                        {/* Above-line content */}
                        {above && (
                          <div style={{ textAlign: "center", paddingBottom: 4, marginTop: 2 }}>
                            <div style={{ fontSize: 9, color: C.textTertiary }}>{fmtDateShort(m.date)}</div>
                            <div style={{ fontSize: 10, color: isSelected ? C.text : C.textSecondary, fontWeight: isSelected ? 500 : 400, lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{m.title}</div>
                          </div>
                        )}

                        {/* Spacer to center line */}
                        {above && <div style={{ flex: 1 }} />}

                        {/* Dot / multi-day bar */}
                        <div
                          onClick={() => setSelectedMoment(isSelected ? null : m)}
                          onMouseEnter={() => setHoveredMarker(m.id)}
                          onMouseLeave={() => setHoveredMarker(null)}
                          style={{
                            width: hasMultiDay ? 20 : 14, height: 14, borderRadius: hasMultiDay ? 7 : "50%",
                            background: isSelected ? et.color : et.color + "60",
                            border: `2px solid ${et.color}`,
                            cursor: "pointer", transition: "all 0.15s",
                            transform: isHovered ? "scale(1.3)" : "scale(1)",
                            position: "absolute", top: 48, left: "50%", marginLeft: hasMultiDay ? -10 : -7,
                          }}
                        />

                        {/* Below-line content */}
                        {!above && (
                          <div style={{ textAlign: "center", paddingTop: 4, position: "absolute", top: 66 }}>
                            <div style={{ fontSize: 10, color: isSelected ? C.text : C.textSecondary, fontWeight: isSelected ? 500 : 400, lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{m.title}</div>
                            <div style={{ fontSize: 9, color: C.textTertiary }}>{fmtDateShort(m.date)}</div>
                          </div>
                        )}

                        {/* Hover tooltip */}
                        {isHovered && !isSelected && (
                          <div style={{
                            position: "absolute", top: above ? -60 : 110, left: "50%", transform: "translateX(-50%)",
                            background: C.bg, border: `1px solid ${C.border}`, borderRadius: 2, padding: "8px 12px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.15)", zIndex: 50, width: 220, pointerEvents: "none",
                          }}>
                            <div style={{ fontSize: 11, fontWeight: 500, color: C.text, marginBottom: 2 }}>{m.title}</div>
                            <div style={{ fontSize: 10, color: C.textTertiary, marginBottom: 4 }}>{m.subtitle}</div>
                            <div style={{ fontSize: 10, color: C.textSecondary }}>{m.speakers.join(", ")}</div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Selected Moment Detail */}
              <div style={{ flex: 1, overflowY: "auto", borderTop: `1px solid ${C.border}` }}>
                {selectedMoment ? (
                  <div style={{ padding: "24px 32px 96px" }}>
                    {/* Header */}
                    <div style={{ marginBottom: 20 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 10, padding: "3px 10px", borderRadius: 100, border: `1px solid ${EVENT_TYPES[selectedMoment.type].color}`, color: EVENT_TYPES[selectedMoment.type].color, fontWeight: 500 }}>
                          {EVENT_TYPES[selectedMoment.type].label}
                        </span>
                        <span style={{ fontSize: 11, color: C.textTertiary }}>
                          {fmtDate(selectedMoment.date)}{selectedMoment.dateEnd ? ` — ${fmtDate(selectedMoment.dateEnd)}` : ""}
                        </span>
                        {selectedMoment.speakers.map(s => (
                          <span key={s} style={{ fontSize: 10, padding: "2px 8px", border: `1px solid ${C.border}`, borderRadius: 100, color: C.textSecondary }}>{s}</span>
                        ))}
                      </div>
                      <h3 style={{ fontSize: 20, fontWeight: 400, color: C.text, marginBottom: 4 }}>{selectedMoment.title}</h3>
                      <p style={{ fontSize: 13, color: C.textSecondary, fontWeight: 300 }}>{selectedMoment.subtitle}</p>
                      <div style={{ display: "flex", gap: 4, marginTop: 10, flexWrap: "wrap" }}>
                        {selectedMoment.tags.map(t => (
                          <span key={t} style={{ fontSize: 9, padding: "2px 8px", border: `1px solid ${C.border}`, borderRadius: 100, color: C.textTertiary }}>{t}</span>
                        ))}
                      </div>
                    </div>

                    {/* Narrative */}
                    <div style={{ background: C.accentSoft, borderRadius: 2, padding: "20px 24px", marginBottom: 24 }}>
                      <div style={{ fontSize: 9, letterSpacing: 1.5, fontWeight: 500, color: C.textTertiary, textTransform: "uppercase", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
                        <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke={C.textTertiary} strokeWidth="1.5" strokeLinecap="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                        Authoritative Narrative
                      </div>
                      <p style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.8, fontWeight: 300 }}>{selectedMoment.narrative}</p>
                    </div>

                    {/* Collapsible artifact sections */}
                    {[
                      { key: "decks", label: "Associated Decks", items: selectedMoment.decks, type: "deck", icon: "📄" },
                      { key: "transcripts", label: "Associated Transcripts", items: selectedMoment.transcripts, type: "transcript", icon: "🎙" },
                      { key: "spaces", label: "Webex Spaces", items: selectedMoment.spaces || [], type: "space", icon: "💬" },
                    ].map(section => (
                      <div key={section.key} style={{ marginBottom: 16 }}>
                        <div
                          onClick={() => setExpandedMomentSections(prev => ({ ...prev, [section.key]: !prev[section.key] }))}
                          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", padding: "8px 0", borderBottom: `1px solid ${C.borderLight}` }}
                        >
                          <span style={{ fontSize: 11, fontWeight: 500, color: C.text, display: "flex", alignItems: "center", gap: 6 }}>
                            {section.label}
                            <span style={{ fontSize: 10, color: C.textTertiary, fontWeight: 300 }}>({section.items.length})</span>
                          </span>
                          <span style={{ fontSize: 12, color: C.textTertiary, transform: expandedMomentSections[section.key] ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>&#8964;</span>
                        </div>
                        {expandedMomentSections[section.key] && (
                          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
                            {section.items.map(item => {
                              const pinned = isPinned(item.id);
                              return (
                                <div key={item.id} style={{
                                  display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px",
                                  border: `1px solid ${pinned ? C.text : C.border}`, borderRadius: 2, background: C.bg,
                                  transition: "all 0.15s",
                                }}>
                                  <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: 12, fontWeight: 400, color: C.text, marginBottom: 2 }}>{item.title}</div>
                                    <div style={{ display: "flex", gap: 8, fontSize: 10, color: C.textTertiary }}>
                                      {item.type && <span style={{ padding: "1px 6px", border: `1px solid ${C.border}`, borderRadius: 2 }}>{item.type}</span>}
                                      {item.pages && <span>{item.pages} pages</span>}
                                      {item.duration && <span>{item.duration}</span>}
                                      {item.speaker && <span>{item.speaker}</span>}
                                      {item.members && <span>{item.members} members</span>}
                                    </div>
                                  </div>
                                  <button
                                    onClick={() => togglePin({
                                      id: item.id,
                                      type: section.type,
                                      title: item.title,
                                      momentId: selectedMoment.id,
                                      momentTitle: selectedMoment.title,
                                    })}
                                    style={{
                                      display: "flex", alignItems: "center", gap: 4, padding: "4px 10px",
                                      border: `1px solid ${pinned ? C.text : C.border}`, borderRadius: 2,
                                      background: pinned ? C.text : "transparent", color: pinned ? C.bg : C.textSecondary,
                                      fontSize: 10, fontWeight: 500, cursor: "pointer", fontFamily: "inherit",
                                      transition: "all 0.15s", flexShrink: 0, marginLeft: 12,
                                    }}
                                  >
                                    <PinIcon size={10} filled={pinned} color={pinned ? C.bg : C.textSecondary} />
                                    {pinned ? "Pinned" : "Pin"}
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 200, flexDirection: "column", gap: 8 }}>
                    <p style={{ fontSize: 14, fontWeight: 300, color: C.textTertiary }}>Select a moment on the timeline to view details</p>
                    <p style={{ fontSize: 12, fontWeight: 300, color: C.textTertiary, maxWidth: 400, textAlign: "center", lineHeight: 1.5 }}>
                      Pin decks, transcripts, and spaces from canonical moments to ground your Co-Author drafts in authoritative source material.
                    </p>
                  </div>
                )}
              </div>

              {/* Pinned items bar */}
              {pinnedItems.length > 0 && (
                <div style={{
                  borderTop: `1px solid ${C.border}`, padding: "10px 24px",
                  background: C.surface, display: "flex", alignItems: "center", justifyContent: "space-between",
                  flexShrink: 0,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <PinIcon size={14} filled color={C.text} />
                    <span style={{ fontSize: 12, fontWeight: 500, color: C.text }}>{pinnedItems.length} item{pinnedItems.length !== 1 ? "s" : ""} pinned</span>
                    {pinnedDecks.length > 0 && <span style={{ fontSize: 10, color: C.textTertiary }}>📄 {pinnedDecks.length}</span>}
                    {pinnedTranscripts.length > 0 && <span style={{ fontSize: 10, color: C.textTertiary }}>🎙 {pinnedTranscripts.length}</span>}
                    {pinnedSpaces.length > 0 && <span style={{ fontSize: 10, color: C.textTertiary }}>💬 {pinnedSpaces.length}</span>}
                  </div>
                  <button
                    onClick={() => setActiveTab("analysis")}
                    style={{
                      padding: "6px 16px", fontSize: 11, fontWeight: 500,
                      background: C.text, color: C.bg, border: "none", borderRadius: 2,
                      cursor: "pointer", fontFamily: "inherit", transition: "opacity 0.15s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                    onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                  >
                    Use in Draft →
                  </button>
                </div>
              )}
            </div>

          ) : !hasGenerated && activeTab !== "queue" ? (
            /* Empty state */
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "80vh", flexDirection: "column", gap: 16 }}>
              <NavIconCoAuthor size={48} color={C.borderLight} />
              <p style={{ fontSize: 18, fontWeight: 300, color: C.textTertiary }}>Configure your request and click Generate Draft</p>
              <p style={{ fontSize: 13, fontWeight: 300, color: C.textTertiary, maxWidth: 440, textAlign: "center", lineHeight: 1.6 }}>
                Co-Author will produce an aligned draft, find relevant slides, identify messaging gaps, and suggest thought leadership angles.
              </p>
            </div>
          ) : activeTab === "queue" ? (
            /* Queue View */
            <div style={{ padding: "24px 32px" }}>
              <div style={{ border: `1px solid ${C.border}`, borderRadius: 2, overflow: "hidden" }}>
                <div style={{ display: "grid", gridTemplateColumns: "100px 1fr 80px 90px 80px 80px 80px", gap: 0, padding: "10px 16px", background: C.surface, borderBottom: `1px solid ${C.border}`, fontSize: 9, letterSpacing: 1.5, fontWeight: 500, color: C.textTertiary, textTransform: "uppercase" }}>
                  <span>Type</span><span>Objective</span><span>Requester</span><span>Vertical</span><span>Urgency</span><span>Status</span><span>Date</span>
                </div>
                {coAuthorQueue.map(item => {
                  const urgCol = item.urgency === "Critical" ? "#c0392b" : item.urgency === "Fast Track" ? "#d4a017" : C.textTertiary;
                  const statusCol = item.status === "Published" ? "#27ae60" : item.status === "In Review" ? "#2980b9" : C.textTertiary;
                  return (
                    <div key={item.id} style={{
                      display: "grid", gridTemplateColumns: "100px 1fr 80px 90px 80px 80px 80px", gap: 0,
                      padding: "12px 16px", borderBottom: `1px solid ${C.borderLight}`, fontSize: 12, color: C.textSecondary,
                      cursor: "pointer", transition: "background 0.15s",
                    }}
                      onMouseEnter={e => e.currentTarget.style.background = C.accentSoft}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    >
                      <span style={{ fontSize: 10, padding: "2px 8px", border: `1px solid ${C.border}`, borderRadius: 100, alignSelf: "center", justifySelf: "start", whiteSpace: "nowrap", fontWeight: 400, color: C.textSecondary }}>{item.contentType}</span>
                      <span style={{ fontWeight: 300, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", paddingRight: 12 }}>{item.objective}</span>
                      <span style={{ fontWeight: 400, fontSize: 11 }}>{item.requester}</span>
                      <span style={{ fontSize: 10, color: C.textTertiary }}>{item.vertical}</span>
                      <span style={{ fontSize: 10, color: urgCol, fontWeight: 500 }}>{item.urgency}</span>
                      <span style={{ fontSize: 10, color: statusCol, fontWeight: 500 }}>{item.status}</span>
                      <span style={{ fontSize: 10, color: C.textTertiary }}>{item.date}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Analysis View */
            <div style={{ padding: "24px 32px 96px" }}>
              {/* ── Source Authority (pinned items) ── */}
              {pinnedItems.length > 0 && (
                <div style={{ marginBottom: 32 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                    <TierLabel icon={<PinIcon size={14} filled color={C.textTertiary} />}>Pinned Sources</TierLabel>
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
                    {pinnedItems.map(p => (
                      <div key={p.id} style={{
                        display: "flex", alignItems: "center", gap: 8, padding: "6px 12px",
                        border: `1px solid ${C.border}`, borderRadius: 2, background: C.surface, fontSize: 11,
                      }}>
                        <span>{p.type === "deck" ? "📄" : p.type === "transcript" ? "🎙" : "💬"}</span>
                        <span style={{ fontWeight: 400, color: C.text }}>{p.title}</span>
                        <span style={{ fontSize: 9, color: C.textTertiary }}>from {p.momentTitle}</span>
                        <span onClick={() => togglePin(p)} style={{ cursor: "pointer", color: C.textTertiary, fontSize: 14, lineHeight: 1 }}>&times;</span>
                      </div>
                    ))}
                  </div>
                  <p style={{ fontSize: 11, color: C.textTertiary, fontWeight: 300, fontStyle: "italic" }}>Co-Author will ground the draft in these source materials.</p>
                </div>
              )}

              {/* ── Section A: Draft Output ── */}
              <div style={{ marginBottom: 40 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <TierLabel icon={
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={C.textTertiary} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  }>Draft Output</TierLabel>
                </div>

                <div style={{ border: `1px solid ${C.border}`, borderRadius: 2, background: C.surface, padding: 24 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 500, color: C.text, marginBottom: 4 }}>{activeDraft.title}</h3>
                  <p style={{ fontSize: 11, color: C.textTertiary, marginBottom: 20 }}>Reading time: {activeDraft.readingTime}</p>
                  {activeDraft.sections.map((s, i) => (
                    <div key={i} style={{ marginBottom: i < activeDraft.sections.length - 1 ? 20 : 0 }}>
                      {s.heading && <h4 style={{ fontSize: 14, fontWeight: 500, color: C.text, marginBottom: 6 }}>{s.heading}</h4>}
                      <p style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.8, fontWeight: 300, whiteSpace: "pre-wrap" }}>{s.body}</p>
                    </div>
                  ))}
                </div>

                {/* Action buttons */}
                <div style={{ display: "flex", gap: 8, marginTop: 12, alignItems: "center" }}>
                  <button style={{ padding: "6px 16px", fontSize: 11, fontWeight: 500, border: `1px solid ${C.border}`, borderRadius: 2, background: "none", color: C.text, cursor: "pointer", fontFamily: "inherit" }}>Copy to Clipboard</button>
                  <button style={{ padding: "6px 16px", fontSize: 11, fontWeight: 500, border: `1px solid ${C.border}`, borderRadius: 2, background: "none", color: C.text, cursor: "pointer", fontFamily: "inherit" }}>Export as Markdown</button>
                  <button style={{ padding: "6px 16px", fontSize: 11, fontWeight: 400, border: `1px solid ${C.borderLight}`, borderRadius: 2, background: "none", color: C.textTertiary, cursor: "default", fontFamily: "inherit" }}>Open in Editor — coming soon</button>
                  <span style={{ marginLeft: "auto", fontSize: 11, fontWeight: 500, color: "#27ae60", padding: "4px 12px", border: "1px solid #27ae6040", borderRadius: 100, background: "#27ae6010" }}>92% aligned to messaging framework</span>
                </div>
              </div>

              {/* ── Section B: Slides in the Library ── */}
              <div style={{ marginBottom: 40 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <TierLabel icon={<NavIconDeck size={14} color={C.textTertiary} />}>Slides in the Library</TierLabel>
                  <span style={{ fontSize: 10, fontWeight: 500, background: C.accentSoft, color: C.textSecondary, padding: "2px 8px", borderRadius: 100 }}>{relevantSlides.length}</span>
                </div>
                {relevantSlides.length > 0 ? (
                  <>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
                      {relevantSlides.map(slide => (
                        <div key={slide.id} onClick={() => setLightboxSlide(slide)} style={{ border: `1px solid ${C.border}`, borderRadius: 2, background: C.bg, cursor: "pointer", overflow: "hidden", transition: "all 0.2s ease" }}
                          onMouseEnter={e => { e.currentTarget.style.borderColor = C.textTertiary; e.currentTarget.style.background = C.accentSoft; }}
                          onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.bg; }}
                        >
                          <div style={{ aspectRatio: "16/9", overflow: "hidden" }}><SlidePreview slide={slide} width={320} height={180} responsive /></div>
                          <div style={{ padding: "10px 12px" }}>
                            <p style={{ fontSize: 12, fontWeight: 500, color: C.text, marginBottom: 2 }}>{slide.title}</p>
                            <span style={{ fontSize: 9, fontWeight: 500, letterSpacing: 0.5, textTransform: "uppercase", color: C.textTertiary, padding: "1px 6px", border: `1px solid ${C.border}`, borderRadius: 2 }}>{slide.type}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div onClick={() => setActivePage("deck")} style={{ marginTop: 12, fontSize: 12, fontWeight: 400, color: C.textSecondary, cursor: "pointer", display: "inline-block" }}
                      onMouseEnter={e => e.currentTarget.style.color = C.text} onMouseLeave={e => e.currentTarget.style.color = C.textSecondary}
                    >Open in Deck Builder &rarr;</div>
                  </>
                ) : (
                  <p style={{ fontSize: 13, color: C.textTertiary, fontWeight: 300 }}>No matching slides found for this scope.</p>
                )}
              </div>

              {/* ── Section C: Gaps Identified ── */}
              <div style={{ marginBottom: 40 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <TierLabel icon={
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={C.textTertiary} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                  }>Gaps Identified</TierLabel>
                  <span style={{ fontSize: 10, fontWeight: 500, background: C.accentSoft, color: C.textSecondary, padding: "2px 8px", borderRadius: 100 }}>{coAuthorGaps.length}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {coAuthorGaps.map((gap, i) => (
                    <div key={i} style={{ padding: "16px 20px", borderRadius: 2, background: C.accentSoft, borderLeft: "3px solid #049fd9" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                        <p style={{ fontSize: 13, fontWeight: 500, color: C.text, lineHeight: 1.4, flex: 1 }}>{gap.title}</p>
                        <span style={{ fontSize: 9, fontWeight: 500, letterSpacing: 0.5, textTransform: "uppercase", color: C.textTertiary, padding: "2px 8px", border: `1px solid ${C.border}`, borderRadius: 2, whiteSpace: "nowrap", marginLeft: 12 }}>{gap.level}</span>
                      </div>
                      <p style={{ fontSize: 12, color: C.textSecondary, lineHeight: 1.6, fontWeight: 300 }}>{gap.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Section D: Thought Leadership Angles ── */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <TierLabel icon={
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={C.textTertiary} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
                    </svg>
                  }>Thought Leadership Angles</TierLabel>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {coAuthorAngles.map((angle, i) => (
                    <div key={i} style={{ padding: "16px 20px", borderRadius: 2, background: C.bg, border: `1px solid ${C.border}` }}>
                      <p style={{ fontSize: 13, fontWeight: 500, color: C.text, marginBottom: 6, lineHeight: 1.4 }}>{angle.title}</p>
                      <p style={{ fontSize: 12, color: C.textSecondary, lineHeight: 1.6, fontWeight: 300, marginBottom: 10 }}>{angle.description}</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                        {angle.tags.map((tag, ti) => (
                          <span key={ti} style={{ fontSize: 10, padding: "2px 8px", border: `1px solid ${C.border}`, borderRadius: 100, color: C.textTertiary, fontWeight: 400 }}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxSlide && (
        <SlideLightbox slide={lightboxSlide} allFilteredSlides={relevantSlides} onClose={() => setLightboxSlide(null)} isSelected={() => false} onToggle={() => {}} />
      )}
    </div>
  );
}
