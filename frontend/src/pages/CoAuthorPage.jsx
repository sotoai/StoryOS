import { useState, useRef, useEffect } from "react";
import { C } from "../theme";
import { fw } from "../data/framework";
import { verticals } from "../data/verticals";
import { tagsDef } from "../data/tags";
import { allSlides } from "../data/slides";
import { coAuthorDrafts, coAuthorQueue, coAuthorGaps, coAuthorAngles } from "../data/coauthor";
import { moments, EVENT_TYPES } from "../data/moments";
import { SlidePreview } from "../components/slides/SlidePreview";
import { IconCollaboration } from "../components/icons/PageIcons";

// ── Helpers ──
const fmtDate = (d) => new Date(d + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
const fmtDateShort = (d) => new Date(d + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" });
const wordCount = (text) => text.split(/\s+/).filter(Boolean).length;

const contentTypes = [
  { id: "Blog Post", label: "Blog" },
  { id: "Slide Narrative", label: "Slides" },
  { id: "Demo Script", label: "Demo Script" },
  { id: "Customer Brief", label: "Brief" },
  { id: "Internal Memo", label: "Memo" },
  { id: "Social Post", label: "Social" },
  { id: "Email Sequence", label: "Email" },
];
const toneOptions = ["Executive", "Technical", "Blog", "Social", "Field"];
const defaultToneMap = { "Blog Post": "Blog", "Social Post": "Social", "Customer Brief": "Executive", "Demo Script": "Technical", "Slide Narrative": "Executive", "Internal Memo": "Executive", "Email Sequence": "Field" };
const primaryAudiences = ["cio", "ciso", "nb1", "nb3", "cb1"];
const allAudienceEntries = Object.entries(tagsDef.buyerRoles);

function PinIcon({ size = 12, filled = false, color }) {
  const c = color || C.textTertiary;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? c : "none"} stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 17v5" /><path d="M5 17h14" /><path d="M7.5 7L6 17h12l-1.5-10" /><path d="M9 3h6v4H9z" />
    </svg>
  );
}

export function CoAuthorPage({ setActivePage }) {
  // Tab
  const [activeTab, setActiveTab] = useState("draft");

  // Intake
  const [contentType, setContentType] = useState(null);
  const [objective, setObjective] = useState("");
  const [selectedAudiences, setSelectedAudiences] = useState([]);
  const [showMoreAudiences, setShowMoreAudiences] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showSources, setShowSources] = useState(false);

  // Secondary fields
  const [vertical, setVertical] = useState("general");
  const [productScope, setProductScope] = useState(["networking", "collaboration"]);
  const [initiativeScope, setInitiativeScope] = useState([]);
  const [tone, setTone] = useState("Executive");
  const [urgency, setUrgency] = useState("Standard");
  const [refMaterials, setRefMaterials] = useState("");

  // Pinning (shared across tabs)
  const [pinnedItems, setPinnedItems] = useState([]);

  // Draft
  const [draftGenerated, setDraftGenerated] = useState(false);
  const [showRelated, setShowRelated] = useState(false);

  // Moments
  const [selectedMoment, setSelectedMoment] = useState(null);
  const [momentTypeFilter, setMomentTypeFilter] = useState([]);
  const [momentProductFilter, setMomentProductFilter] = useState("all");
  const timelineRef = useRef(null);

  // Queue
  const [queueFilter, setQueueFilter] = useState("all");

  // ── Derived ──
  const availableInits = fw.products
    .filter(p => productScope.includes(p.id))
    .flatMap(p => p.initiatives);

  const relevantSlides = allSlides.filter(s => {
    if (!productScope.includes(s.productId)) return false;
    if (s.type === "story") return false;
    return s.verticals.includes("general") || s.verticals.includes(vertical);
  }).slice(0, 6);

  const draft = coAuthorDrafts[contentType] || coAuthorDrafts["Blog Post"];
  const activeDraft = pinnedItems.length > 0 ? {
    ...draft,
    sections: [
      { heading: null, body: `Building on the narrative established at ${[...new Set(pinnedItems.map(p => p.momentTitle))].join(" and ")}, this draft synthesizes the authoritative positioning for the Futureproof Workplace.` },
      ...draft.sections,
    ],
  } : draft;
  const totalWords = activeDraft.sections.reduce((sum, s) => sum + wordCount(s.body || "") + wordCount(s.heading || ""), 0);

  const toggleAudience = (id) => setSelectedAudiences(prev => prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]);
  const isPinned = (id) => pinnedItems.some(p => p.id === id);
  const togglePin = (item) => setPinnedItems(prev => prev.some(p => p.id === item.id) ? prev.filter(p => p.id !== item.id) : [...prev, item]);

  const hasNonDefaultOptions = vertical !== "general" || productScope.length < 2 || tone !== (defaultToneMap[contentType] || "Executive") || urgency !== "Standard";
  const optionsSummary = [
    vertical !== "general" && verticals[vertical]?.label,
    productScope.length === 1 && (productScope[0] === "networking" ? "Networking" : "Collaboration"),
    tone !== (defaultToneMap[contentType] || "Executive") && `${tone} tone`,
    urgency !== "Standard" && urgency,
  ].filter(Boolean).join(" · ");

  // Auto-set tone when content type changes
  const handleContentType = (id) => {
    setContentType(id);
    setTone(defaultToneMap[id] || "Executive");
    setDraftGenerated(false);
  };

  // ── Moments timeline ──
  const filteredMoments = moments.filter(m => {
    if (momentTypeFilter.length > 0 && !momentTypeFilter.includes(m.type)) return false;
    if (momentProductFilter !== "all" && !m.products.includes(momentProductFilter)) return false;
    return true;
  }).sort((a, b) => new Date(a.date) - new Date(b.date));

  const timelineDates = filteredMoments.map(m => new Date(m.date + "T00:00:00"));
  const minDate = timelineDates.length > 0 ? new Date(Math.min(...timelineDates) - 25 * 86400000) : new Date("2025-05-01");
  const maxDate = timelineDates.length > 0 ? new Date(Math.max(...timelineDates) + 25 * 86400000) : new Date("2026-04-01");
  const totalDays = (maxDate - minDate) / 86400000;
  const timelineWidth = Math.max(totalDays * 6, 1200);
  const getX = (dateStr) => ((new Date(dateStr + "T00:00:00") - minDate) / 86400000 / totalDays) * timelineWidth;

  const monthLabels = [];
  const cur = new Date(minDate); cur.setDate(1); cur.setMonth(cur.getMonth() + 1);
  while (cur < maxDate) {
    monthLabels.push({ date: new Date(cur), label: cur.toLocaleDateString("en-US", { month: "short", year: "numeric" }) });
    cur.setMonth(cur.getMonth() + 1);
  }

  useEffect(() => {
    if (timelineRef.current && activeTab === "moments") timelineRef.current.scrollLeft = timelineRef.current.scrollWidth;
  }, [activeTab]);

  // ── Styles ──
  const pill = (active, variant) => ({
    fontSize: 11, padding: "4px 11px", borderRadius: 100, cursor: "pointer", transition: "all 0.15s",
    border: `1px solid ${variant === "critical" && active ? "#c0392b" : active ? C.text : C.border}`,
    background: active ? (variant === "critical" ? "transparent" : C.text) : "transparent",
    color: variant === "critical" && active ? "#c0392b" : active ? C.bg : C.textSecondary,
    fontWeight: 400, whiteSpace: "nowrap", display: "inline-block", fontFamily: "inherit",
  });
  const audiencePill = (active) => ({
    fontSize: 11, padding: "4px 11px", borderRadius: 100, cursor: "pointer", transition: "all 0.15s",
    border: `1px solid ${active ? C.text : C.border}`,
    background: active ? C.accentSoft : "transparent",
    color: active ? C.text : C.textSecondary,
    fontWeight: active ? 500 : 400, whiteSpace: "nowrap", display: "inline-block",
  });
  const selectStyle = {
    appearance: "none", WebkitAppearance: "none", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 2,
    padding: "6px 28px 6px 10px", fontSize: 12, fontWeight: 400, fontFamily: "inherit", color: C.text, cursor: "pointer", width: "100%",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23999' fill='none' stroke-width='1.2'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center",
  };
  const expanderLink = { fontSize: 11, color: C.textTertiary, cursor: "pointer", fontWeight: 400, background: "none", border: "none", padding: 0, fontFamily: "inherit", transition: "color 0.15s" };
  const labelMini = { fontSize: 9, letterSpacing: 1.2, fontWeight: 500, color: C.textTertiary, textTransform: "uppercase", marginBottom: 5 };

  return (
    <div style={{ display: "flex", flex: 1, height: "100vh", overflow: "hidden" }}>
      {/* ═══ LEFT PANEL ═══ */}
      <div style={{ width: 380, borderRight: `1px solid ${C.border}`, background: C.surface, display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <div style={{ padding: "20px 20px 0" }}>
          <h2 style={{ fontSize: 16, fontWeight: 500, color: C.text, margin: 0 }}>Co-Author</h2>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "20px 20px 24px" }}>
          {/* 1. Content Type — pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 16 }}>
            {contentTypes.map(ct => (
              <span key={ct.id} onClick={() => handleContentType(ct.id)} style={pill(contentType === ct.id)}>{ct.label}</span>
            ))}
          </div>

          {/* 2. Objective — clean textarea */}
          <textarea
            value={objective} onChange={e => setObjective(e.target.value)}
            placeholder="What are we trying to accomplish?"
            rows={2}
            style={{ width: "100%", padding: "10px 12px", fontSize: 14, fontFamily: "inherit", fontWeight: 300, lineHeight: 1.6, border: `1px solid ${C.border}`, borderRadius: 2, background: C.bg, color: C.text, resize: "vertical", outline: "none", marginBottom: 16 }}
          />

          {/* 3. Audience — compact chips */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 4 }}>
            {primaryAudiences.map(k => (
              <span key={k} onClick={() => toggleAudience(k)} style={audiencePill(selectedAudiences.includes(k))}>{tagsDef.buyerRoles[k]}</span>
            ))}
            <span onClick={() => setShowMoreAudiences(!showMoreAudiences)} style={{ ...audiencePill(false), color: C.textTertiary, fontSize: 10 }}>
              {showMoreAudiences ? "− Less" : "+ More"}
            </span>
          </div>
          {showMoreAudiences && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 4 }}>
              {allAudienceEntries.filter(([k]) => !primaryAudiences.includes(k)).map(([k, v]) => (
                <span key={k} onClick={() => toggleAudience(k)} style={audiencePill(selectedAudiences.includes(k))}>{v}</span>
              ))}
            </div>
          )}

          {/* Pinned source chips (always visible) */}
          {pinnedItems.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 10, marginBottom: 4 }}>
              {pinnedItems.map(p => (
                <span key={p.id} style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, padding: "2px 8px", border: `1px solid ${C.border}`, borderRadius: 12, color: C.textSecondary }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: EVENT_TYPES[p.eventType]?.color || C.textTertiary }} />
                  {p.title.length > 22 ? p.title.slice(0, 22) + "…" : p.title}
                  <span onClick={() => togglePin(p)} style={{ cursor: "pointer", color: C.textTertiary, fontSize: 13, lineHeight: 1, marginLeft: 2 }}>&times;</span>
                </span>
              ))}
            </div>
          )}

          <div style={{ height: 1, background: C.borderLight, margin: "14px 0" }} />

          {/* + Options expander */}
          <div style={{ marginBottom: 10 }}>
            <span onClick={() => setShowOptions(!showOptions)} style={expanderLink}
              onMouseEnter={e => e.currentTarget.style.color = C.text} onMouseLeave={e => e.currentTarget.style.color = C.textTertiary}
            >{showOptions ? "− Options" : "+ Options"}</span>
            {!showOptions && hasNonDefaultOptions && optionsSummary && (
              <span style={{ fontSize: 10, color: C.textTertiary, marginLeft: 8 }}>{optionsSummary}</span>
            )}
          </div>
          {showOptions && (
            <div style={{ paddingLeft: 0, marginBottom: 14, display: "flex", flexDirection: "column", gap: 10 }}>
              <div>
                <div style={labelMini}>Vertical</div>
                <select value={vertical} onChange={e => setVertical(e.target.value)} style={selectStyle}>
                  <option value="general">All Verticals</option>
                  {Object.entries(verticals).filter(([k]) => k !== "general").map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                </select>
              </div>
              <div>
                <div style={labelMini}>Product Scope</div>
                <div style={{ display: "flex", gap: 5 }}>
                  {[["networking", "Networking"], ["collaboration", "Collaboration"]].map(([k, v]) => (
                    <span key={k} onClick={() => setProductScope(prev => prev.includes(k) ? prev.filter(x => x !== k) : [...prev, k])} style={pill(productScope.includes(k))}>{v}</span>
                  ))}
                </div>
              </div>
              {productScope.length === 1 && (
                <div>
                  <div style={labelMini}>Initiative</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {availableInits.map(init => (
                      <span key={init.id} onClick={() => setInitiativeScope(prev => prev.includes(init.id) ? prev.filter(v => v !== init.id) : [...prev, init.id])} style={pill(initiativeScope.includes(init.id))}>{init.name}</span>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <div style={labelMini}>Tone</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {toneOptions.map(t => <span key={t} onClick={() => setTone(t)} style={pill(tone === t)}>{t}</span>)}
                </div>
              </div>
              <div>
                <div style={labelMini}>Urgency</div>
                <div style={{ display: "flex", gap: 5 }}>
                  {["Standard", "Fast Track", "Critical"].map(u => (
                    <span key={u} onClick={() => setUrgency(u)} style={{ ...pill(urgency === u, u === "Critical" ? "critical" : undefined), display: "inline-flex", alignItems: "center", gap: 4 }}>
                      {u === "Fast Track" && <span style={{ width: 5, height: 5, borderRadius: "50%", background: urgency === u ? C.bg : "#d4a017" }} />}
                      {u === "Critical" && <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#c0392b" }} />}
                      {u}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Attach Sources expander */}
          <div style={{ marginBottom: 16 }}>
            <span onClick={() => setShowSources(!showSources)} style={expanderLink}
              onMouseEnter={e => e.currentTarget.style.color = C.text} onMouseLeave={e => e.currentTarget.style.color = C.textTertiary}
            >{showSources ? "− Attach Sources" : "+ Attach Sources"}</span>
          </div>
          {showSources && (
            <div style={{ marginBottom: 14, display: "flex", flexDirection: "column", gap: 12 }}>
              <textarea
                value={refMaterials} onChange={e => setRefMaterials(e.target.value)}
                placeholder="Paste transcript, analyst quote, or any source material."
                rows={3}
                style={{ width: "100%", padding: 10, fontSize: 13, fontFamily: "inherit", fontWeight: 300, lineHeight: 1.6, border: `1px solid ${C.border}`, borderRadius: 2, background: C.bg, color: C.text, resize: "vertical", outline: "none" }}
              />
              <div>
                <div style={labelMini}>Canonical Moments</div>
                {moments.slice().sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5).map(m => {
                  const et = EVENT_TYPES[m.type];
                  const hasPinned = m.decks.some(d => isPinned(d.id));
                  return (
                    <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 0", borderBottom: `1px solid ${C.borderLight}` }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: et.color, flexShrink: 0 }} />
                      <span style={{ fontSize: 10, color: C.textTertiary, flexShrink: 0, width: 44 }}>{fmtDateShort(m.date)}</span>
                      <span style={{ fontSize: 12, color: C.text, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontWeight: 300 }}>{m.title}</span>
                      <span onClick={() => { if (m.decks[0]) togglePin({ id: m.decks[0].id, type: "deck", title: m.decks[0].title, momentId: m.id, momentTitle: m.title, eventType: m.type }); }}
                        style={{ cursor: "pointer", flexShrink: 0, opacity: hasPinned ? 1 : 0.35, transition: "opacity 0.15s" }}
                        onMouseEnter={e => e.currentTarget.style.opacity = "1"} onMouseLeave={e => { if (!hasPinned) e.currentTarget.style.opacity = "0.35"; }}
                      >
                        <PinIcon size={11} filled={hasPinned} color={hasPinned ? C.text : C.textTertiary} />
                      </span>
                    </div>
                  );
                })}
                <span onClick={() => setActiveTab("moments")} style={{ ...expanderLink, fontSize: 10, display: "inline-block", marginTop: 6 }}
                  onMouseEnter={e => e.currentTarget.style.color = C.text} onMouseLeave={e => e.currentTarget.style.color = C.textTertiary}
                >Browse All →</span>
              </div>
            </div>
          )}

          {/* Generate */}
          <button
            onClick={() => { setDraftGenerated(true); setActiveTab("draft"); }}
            disabled={!contentType}
            style={{
              width: "100%", padding: "10px 0", fontSize: 13, fontWeight: 500, letterSpacing: 0.5,
              background: contentType ? C.text : C.border, color: contentType ? C.bg : C.textTertiary,
              border: "none", borderRadius: 2, cursor: contentType ? "pointer" : "default",
              fontFamily: "inherit", transition: "opacity 0.15s",
            }}
            onMouseEnter={e => { if (contentType) e.currentTarget.style.opacity = "0.85"; }}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            Generate
          </button>
          <div style={{ textAlign: "center", marginTop: 6 }}>
            <span style={{ ...expanderLink, fontSize: 10 }}
              onMouseEnter={e => e.currentTarget.style.color = C.text} onMouseLeave={e => e.currentTarget.style.color = C.textTertiary}
            >Save to Queue</span>
          </div>
        </div>
      </div>

      {/* ═══ RIGHT PANEL ═══ */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Tab bar */}
        <div style={{ display: "flex", gap: 24, padding: "0 32px", borderBottom: `1px solid ${C.border}`, flexShrink: 0 }}>
          {[
            { id: "draft", label: "DRAFT" },
            { id: "queue", label: "QUEUE", badge: coAuthorQueue.length },
            { id: "moments", label: "MOMENTS", pin: pinnedItems.length > 0 },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
              padding: "12px 0", fontSize: 11, letterSpacing: 1.5, fontWeight: 500,
              color: activeTab === tab.id ? C.text : C.textTertiary, background: "none", border: "none",
              borderBottom: activeTab === tab.id ? `2px solid ${C.text}` : "2px solid transparent",
              cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s", marginBottom: -1,
              display: "flex", alignItems: "center", gap: 4,
            }}>
              {tab.label}
              {tab.badge && <span style={{ fontSize: 9, color: C.textTertiary }}>({tab.badge})</span>}
              {tab.pin && <PinIcon size={9} filled color={C.textTertiary} />}
            </button>
          ))}
        </div>

        <div style={{ flex: 1, overflowY: "auto" }}>

          {/* ─── DRAFT TAB ─── */}
          {activeTab === "draft" && (
            !draftGenerated ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "70vh", flexDirection: "column", gap: 12 }}>
                <p style={{ fontSize: 14, fontWeight: 300, color: C.textTertiary }}>Select a content type and describe your objective to get started.</p>
                <span onClick={() => setActiveTab("moments")} style={{ ...expanderLink, fontSize: 12 }}
                  onMouseEnter={e => e.currentTarget.style.color = C.text} onMouseLeave={e => e.currentTarget.style.color = C.textTertiary}
                >Or browse Canonical Moments →</span>
              </div>
            ) : (
              <div style={{ padding: "24px 32px 80px 32px", maxWidth: 760 }}>
                {/* Source chips */}
                {pinnedItems.length > 0 && (
                  <>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 12 }}>
                      {pinnedItems.map(p => (
                        <span key={p.id} style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 10, padding: "2px 8px", border: `1px solid ${C.border}`, borderRadius: 12, color: C.textTertiary }}>
                          <span style={{ width: 5, height: 5, borderRadius: "50%", background: EVENT_TYPES[p.eventType]?.color || C.textTertiary }} />
                          {p.title.length > 28 ? p.title.slice(0, 28) + "…" : p.title}
                        </span>
                      ))}
                    </div>
                    <div style={{ height: 1, background: C.borderLight, marginBottom: 24 }} />
                  </>
                )}

                {/* Content type / tone pills */}
                <div style={{ display: "flex", gap: 6, marginBottom: 16, justifyContent: "flex-end" }}>
                  <span style={{ fontSize: 10, color: C.textTertiary, padding: "2px 8px", border: `1px solid ${C.borderLight}`, borderRadius: 100 }}>
                    {contentTypes.find(c => c.id === contentType)?.label || "Blog"} · {tone}
                  </span>
                </div>

                {/* Draft body */}
                <div style={{ borderLeft: `2px solid ${C.borderLight}`, paddingLeft: 24 }}>
                  {activeDraft.title && <h2 style={{ fontSize: 22, fontWeight: 400, color: C.text, marginBottom: 16, letterSpacing: "-0.3px" }}>{activeDraft.title}</h2>}
                  {activeDraft.sections.map((s, i) => (
                    <div key={i} style={{ marginBottom: 24 }}>
                      {s.heading && <h4 style={{ fontSize: 15, fontWeight: 500, color: C.text, marginBottom: 8 }}>{s.heading}</h4>}
                      <p style={{ fontSize: 15, color: C.text, lineHeight: 1.9, fontWeight: 300, whiteSpace: "pre-wrap", margin: 0 }}>{s.body}</p>
                    </div>
                  ))}
                </div>

                {/* Word count */}
                <div style={{ fontSize: 10, color: C.textTertiary, marginTop: 8, marginBottom: 12 }}>~{totalWords} words</div>

                {/* Action bar */}
                <div style={{ display: "flex", gap: 6, marginBottom: 48 }}>
                  <button style={{ padding: "5px 14px", fontSize: 11, fontWeight: 500, border: `1px solid ${C.border}`, borderRadius: 2, background: "none", color: C.text, cursor: "pointer", fontFamily: "inherit" }}>Copy</button>
                  <button style={{ padding: "5px 14px", fontSize: 11, fontWeight: 400, border: `1px solid ${C.border}`, borderRadius: 2, background: "none", color: C.textTertiary, cursor: "pointer", fontFamily: "inherit" }}>Refine</button>
                </div>

                {/* Related (collapsed) */}
                <span onClick={() => setShowRelated(!showRelated)} style={expanderLink}
                  onMouseEnter={e => e.currentTarget.style.color = C.text} onMouseLeave={e => e.currentTarget.style.color = C.textTertiary}
                >{showRelated ? "− Related" : "+ Related"}</span>

                {showRelated && (
                  <div style={{ marginTop: 16 }}>
                    {/* Matched slides — horizontal scroll */}
                    {relevantSlides.length > 0 && (
                      <div style={{ marginBottom: 24 }}>
                        <div style={labelMini}>Matched Slides</div>
                        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8 }}>
                          {relevantSlides.map(slide => (
                            <div key={slide.id} style={{ width: 120, minWidth: 120, cursor: "pointer" }}>
                              <div style={{ aspectRatio: "16/9", borderRadius: 2, overflow: "hidden", border: `1px solid ${C.border}`, background: C.surface, marginBottom: 4 }}>
                                <SlidePreview slide={slide} width={320} height={180} responsive />
                              </div>
                              <p style={{ fontSize: 10, color: C.text, lineHeight: 1.3, fontWeight: 400, overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{slide.title}</p>
                            </div>
                          ))}
                          <div onClick={() => setActivePage("deck")} style={{ width: 120, minWidth: 120, display: "flex", alignItems: "center", justifyContent: "center", border: `1px dashed ${C.border}`, borderRadius: 2, cursor: "pointer", fontSize: 10, color: C.textTertiary, textAlign: "center", padding: 8 }}
                            onMouseEnter={e => e.currentTarget.style.borderColor = C.textTertiary} onMouseLeave={e => e.currentTarget.style.borderColor = C.border}
                          >Open Deck Builder →</div>
                        </div>
                      </div>
                    )}

                    {/* Gaps & Angles — flat list */}
                    <div style={labelMini}>Gaps & Angles</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {coAuthorGaps.map((g, i) => (
                        <div key={`g${i}`} style={{ padding: "10px 14px", borderLeft: "3px solid #049fd9", borderRadius: 2, background: C.accentSoft }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                            <span style={{ fontSize: 9, padding: "1px 6px", border: `1px solid ${C.border}`, borderRadius: 2, color: C.textTertiary, fontWeight: 500 }}>Gap</span>
                            <span style={{ fontSize: 12, fontWeight: 500, color: C.text }}>{g.title}</span>
                          </div>
                          <p style={{ fontSize: 11, color: C.textSecondary, lineHeight: 1.5, fontWeight: 300 }}>{g.description}</p>
                        </div>
                      ))}
                      {coAuthorAngles.map((a, i) => (
                        <div key={`a${i}`} style={{ padding: "10px 14px", border: `1px solid ${C.border}`, borderRadius: 2 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                            <span style={{ fontSize: 9, padding: "1px 6px", border: `1px solid ${C.border}`, borderRadius: 2, color: C.textTertiary, fontWeight: 500 }}>Angle</span>
                            <span style={{ fontSize: 12, fontWeight: 500, color: C.text }}>{a.title}</span>
                          </div>
                          <p style={{ fontSize: 11, color: C.textSecondary, lineHeight: 1.5, fontWeight: 300 }}>{a.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          )}

          {/* ─── QUEUE TAB ─── */}
          {activeTab === "queue" && (
            <div style={{ padding: "16px 32px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{ fontSize: 11, letterSpacing: 1.5, fontWeight: 500, color: C.textTertiary, textTransform: "uppercase" }}>Content Requests</span>
                <div style={{ display: "flex", gap: 4 }}>
                  {["all", "Draft", "In Review", "Published"].map(f => (
                    <span key={f} onClick={() => setQueueFilter(f)} style={{ fontSize: 10, padding: "2px 8px", borderRadius: 100, cursor: "pointer", border: `1px solid ${queueFilter === f ? C.text : C.border}`, background: queueFilter === f ? C.text : "transparent", color: queueFilter === f ? C.bg : C.textTertiary, transition: "all 0.15s" }}>
                      {f === "all" ? "All" : f}
                    </span>
                  ))}
                </div>
              </div>
              {coAuthorQueue.filter(item => queueFilter === "all" || item.status === queueFilter).map(item => {
                const urgDot = item.urgency === "Critical" ? "#c0392b" : item.urgency === "Fast Track" ? "#d4a017" : null;
                const statusCol = item.status === "Published" ? "#27ae60" : item.status === "In Review" ? "#2980b9" : C.textTertiary;
                return (
                  <div key={item.id} style={{
                    display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: `1px solid ${C.borderLight}`,
                    cursor: "pointer", transition: "background 0.15s", fontSize: 12,
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = C.accentSoft}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  >
                    <span style={{ fontSize: 10, padding: "2px 8px", border: `1px solid ${C.border}`, borderRadius: 100, color: C.textSecondary, whiteSpace: "nowrap", flexShrink: 0 }}>{item.contentType}</span>
                    <span style={{ flex: 1, fontWeight: 300, color: C.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.objective}</span>
                    {urgDot && <span style={{ width: 6, height: 6, borderRadius: "50%", background: urgDot, flexShrink: 0 }} />}
                    <span style={{ fontSize: 10, color: statusCol, fontWeight: 500, flexShrink: 0 }}>{item.status}</span>
                    <span style={{ fontSize: 10, color: C.textTertiary, flexShrink: 0 }}>{item.date}</span>
                  </div>
                );
              })}
            </div>
          )}

          {/* ─── MOMENTS TAB ─── */}
          {activeTab === "moments" && (
            <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
              {/* Filters */}
              <div style={{ padding: "12px 24px 10px", borderBottom: `1px solid ${C.border}`, flexShrink: 0, display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
                {Object.entries(EVENT_TYPES).map(([key, et]) => {
                  const active = momentTypeFilter.includes(key);
                  return (
                    <span key={key} onClick={() => setMomentTypeFilter(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key])} style={{
                      fontSize: 10, padding: "2px 8px", borderRadius: 100, cursor: "pointer", transition: "all 0.15s",
                      border: `1px solid ${active ? et.color : "transparent"}`, color: active ? et.color : C.textTertiary,
                      display: "inline-flex", alignItems: "center", gap: 3,
                    }}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: et.color }} />{et.label}
                    </span>
                  );
                })}
                <span style={{ width: 1, height: 14, background: C.border, margin: "0 4px" }} />
                {["all", "networking", "collaboration"].map(p => (
                  <span key={p} onClick={() => setMomentProductFilter(p)} style={{
                    fontSize: 10, cursor: "pointer", color: momentProductFilter === p ? C.text : C.textTertiary,
                    borderBottom: momentProductFilter === p ? `1px solid ${C.text}` : "1px solid transparent",
                    padding: "0 2px 1px", transition: "all 0.15s",
                  }}>
                    {p === "all" ? "All" : p === "networking" ? "Networking" : "Collaboration"}
                  </span>
                ))}
              </div>

              {/* Timeline */}
              <div ref={timelineRef} style={{ overflowX: "auto", overflowY: "hidden", flexShrink: 0, padding: "14px 24px 10px", scrollBehavior: "smooth" }}>
                <div style={{ position: "relative", width: timelineWidth, height: 120 }}>
                  <div style={{ position: "absolute", top: 50, left: 0, right: 0, height: 1, background: C.border }} />
                  {monthLabels.map((ml, i) => {
                    const x = ((ml.date - minDate) / 86400000 / totalDays) * timelineWidth;
                    return <div key={i} style={{ position: "absolute", left: x, top: 47 }}><div style={{ height: 7, width: 1, background: C.border }} /><div style={{ fontSize: 8, color: C.textTertiary, textTransform: "uppercase", letterSpacing: 1, marginTop: 1, whiteSpace: "nowrap" }}>{ml.label}</div></div>;
                  })}
                  {filteredMoments.map((m, i) => {
                    const et = EVENT_TYPES[m.type];
                    const x = getX(m.date);
                    const above = i % 2 === 0;
                    const isSel = selectedMoment?.id === m.id;
                    return (
                      <div key={m.id} onClick={() => setSelectedMoment(isSel ? null : m)} style={{ position: "absolute", left: x, transform: "translateX(-50%)", width: 120, textAlign: "center", cursor: "pointer", top: above ? 0 : undefined, bottom: above ? undefined : 0 }}>
                        {above && (
                          <div style={{ marginBottom: 4 }}>
                            <div style={{ fontSize: 8, color: C.textTertiary }}>{fmtDateShort(m.date)}</div>
                            <div style={{ fontSize: 10, color: isSel ? C.text : C.textSecondary, fontWeight: isSel ? 500 : 400, lineHeight: 1.25, overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{m.title}</div>
                          </div>
                        )}
                        <div style={{
                          width: 10, height: 10, borderRadius: "50%", margin: "0 auto",
                          background: isSel ? et.color : et.color + "50", border: `2px solid ${et.color}`,
                          transition: "transform 0.15s", position: "absolute", top: 45, left: "50%", marginLeft: -5,
                        }} />
                        {!above && (
                          <div style={{ position: "absolute", top: 58 }}>
                            <div style={{ fontSize: 10, color: isSel ? C.text : C.textSecondary, fontWeight: isSel ? 500 : 400, lineHeight: 1.25, overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{m.title}</div>
                            <div style={{ fontSize: 8, color: C.textTertiary }}>{fmtDateShort(m.date)}</div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Moment detail */}
              <div style={{ flex: 1, overflowY: "auto", borderTop: `1px solid ${C.border}` }}>
                {selectedMoment ? (
                  <div style={{ padding: "20px 32px 48px" }}>
                    {/* Header */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 100, border: `1px solid ${EVENT_TYPES[selectedMoment.type].color}`, color: EVENT_TYPES[selectedMoment.type].color, fontWeight: 500 }}>{EVENT_TYPES[selectedMoment.type].label}</span>
                      <span style={{ fontSize: 16, fontWeight: 400, color: C.text }}>{selectedMoment.title}</span>
                    </div>
                    <div style={{ fontSize: 11, color: C.textTertiary, fontWeight: 300, marginBottom: 16 }}>
                      {fmtDate(selectedMoment.date)}{selectedMoment.dateEnd ? ` — ${fmtDate(selectedMoment.dateEnd)}` : ""} · {selectedMoment.speakers.join(", ")}{selectedMoment.subtitle ? ` · ${selectedMoment.subtitle}` : ""}
                    </div>

                    {/* Narrative */}
                    <div style={{ borderLeft: `2px solid ${C.borderLight}`, paddingLeft: 20, marginBottom: 24 }}>
                      <p style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.7, fontWeight: 300 }}>{selectedMoment.narrative}</p>
                    </div>

                    {/* Flat artifact list */}
                    {[
                      ...selectedMoment.decks.map(d => ({ ...d, _type: "deck", _icon: "pptx" })),
                      ...selectedMoment.transcripts.map(t => ({ ...t, _type: "transcript", _icon: "txt" })),
                      ...(selectedMoment.spaces || []).map(s => ({ ...s, _type: "space", _icon: "webex" })),
                    ].map(item => {
                      const pinned = isPinned(item.id);
                      const iconEl = item._icon === "webex" ? <IconCollaboration size={14} />
                        : item._icon === "pptx" ? (
                          <svg width={14} height={14} viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="14" height="14" rx="1.5" fill="#185ABD" /><text x="8" y="11" textAnchor="middle" fill="#fff" fontSize="6.5" fontWeight="700" fontFamily="Inter, sans-serif">P</text></svg>
                        ) : item._icon === "txt" ? (
                          <svg width={14} height={14} viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="14" height="14" rx="1.5" fill="#6B7280" /><text x="8" y="11" textAnchor="middle" fill="#fff" fontSize="5" fontWeight="700" fontFamily="Inter, sans-serif">TXT</text></svg>
                        ) : <span style={{ fontSize: 13 }}>{item._icon}</span>;
                      return (
                        <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: `1px solid ${C.borderLight}` }}>
                          <span style={{ flexShrink: 0, display: "inline-flex", alignItems: "center" }}>{iconEl}</span>
                          <span style={{ fontSize: 12, color: C.text, fontWeight: 400, flex: 1 }}>{item.title}</span>
                          <span style={{ fontSize: 10, color: C.textTertiary }}>
                            {item.pages && `${item.pages} pages`}{item.duration && item.duration}{item.members && `${item.members} members`}
                          </span>
                          <span onClick={() => togglePin({ id: item.id, type: item._type, title: item.title, momentId: selectedMoment.id, momentTitle: selectedMoment.title, eventType: selectedMoment.type })}
                            style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 3, fontSize: 10, color: pinned ? C.text : C.textTertiary, fontWeight: pinned ? 500 : 400, transition: "all 0.15s" }}>
                            <PinIcon size={10} filled={pinned} color={pinned ? C.text : C.textTertiary} />{pinned ? "Pinned" : "Pin"}
                          </span>
                        </div>
                      );
                    })}

                    {/* Tags */}
                    <div style={{ display: "flex", gap: 4, marginTop: 12, flexWrap: "wrap" }}>
                      {selectedMoment.tags.map(t => (
                        <span key={t} style={{ fontSize: 9, padding: "1px 6px", border: `1px solid ${C.border}`, borderRadius: 100, color: C.textTertiary }}>{t}</span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 160, color: C.textTertiary, fontSize: 13, fontWeight: 300 }}>
                    Select a moment to see its associated materials.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
