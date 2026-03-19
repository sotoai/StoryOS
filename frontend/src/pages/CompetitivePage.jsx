import { useState, useEffect } from "react";
import { C } from "../theme";
import { competitors } from "../data/competitive";
import { IconCompany, IconSolution, IconInitiative, IconUseCase, productIcons } from "../components/icons/PageIcons";
import { TierLabel } from "../components/shared/TierLabel";
import { Connector, SplitConnector } from "../components/shared/Connector";

const PANEL_MIN = 200;
const PANEL_MAX = 720;
const WIDE_THRESHOLD = 420;

function AristaLogo({ size = 20, color }) {
  return (
    <svg width={size} height={size * (1099 / 1527)} viewBox="0 0 1527 1099" fill={color} style={{ display: "block" }}>
      <path d="m874.3 60.8c52.1 84.9 652 1031.4 652 1031.4h-215.2l-547.7-874.7-234.7 378.6h430.4l-110.9 176.3h-430.3l-202.2 326.4h-215.1c0 0 606.4-959.6 652-1031.4 58.7-84.9 163-91.4 221.7-6.6z"/>
    </svg>
  );
}

const categoryColors = { Product: "#049fd9", Analyst: "#8e44ad", Earnings: "#27ae60", Partnership: "#d4a017", Messaging: "#e74c3c" };
const severityConfig = { urgent: { color: "#e74c3c", label: "Urgent" }, respond: { color: "#d4a017", label: "Respond" }, watch: { color: "#27ae60", label: "Watch" } };

export function CompetitivePage() {
  const [competitorId] = useState("arista");
  const [panelWidth, setPanelWidth] = useState(300);
  const [isDragging, setIsDragging] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);
  const [expandedNodes, setExpandedNodes] = useState({ campus: true });
  const [expandCompany, setExpandCompany] = useState(false);
  const [expandSolution, setExpandSolution] = useState(false);
  const [activeProduct, setActiveProduct] = useState("campus");
  const [expandedInit, setExpandedInit] = useState({});

  const isWide = panelWidth >= WIDE_THRESHOLD;
  const comp = competitors[competitorId];

  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e) => { const x = e.clientX - 72; setPanelWidth(Math.max(PANEL_MIN, Math.min(PANEL_MAX, x))); };
    const onUp = () => setIsDragging(false);
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    return () => { document.removeEventListener("mousemove", onMove); document.removeEventListener("mouseup", onUp); document.body.style.cursor = ""; document.body.style.userSelect = ""; };
  }, [isDragging]);

  const selectStyle = {
    appearance: "none", WebkitAppearance: "none",
    background: C.surface, border: `1px solid ${C.border}`, borderRadius: 2,
    padding: "8px 28px 8px 10px", fontSize: 12, fontWeight: 400, fontFamily: "inherit", color: C.text, cursor: "pointer", width: "100%",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23999' fill='none' stroke-width='1.2'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center",
  };

  const toggleNode = (key) => setExpandedNodes(prev => ({ ...prev, [key]: !prev[key] }));
  const toggleInit = (id) => setExpandedInit(prev => ({ ...prev, [id]: !prev[id] }));
  const product = comp.framework.products.find(p => p.id === activeProduct);

  const treeItemStyle = (isActive, depth = 0) => ({
    display: "flex", alignItems: "center", gap: 6, padding: `6px ${16 + depth * 12}px`,
    fontSize: 12, fontWeight: isActive ? 500 : 300, color: isActive ? C.text : C.textSecondary,
    cursor: "pointer", transition: "all 0.15s", borderRadius: 0,
    background: isActive ? C.accentSoft : "transparent",
  });

  const chevron = (isOpen) => (
    <span style={{ fontSize: 10, color: C.textTertiary, transition: "transform 0.2s", transform: isOpen ? "rotate(90deg)" : "none", display: "inline-block", width: 12, flexShrink: 0 }}>&#9656;</span>
  );

  // ── LEFT PANEL ──
  const renderTree = () => (
    <div style={{ padding: "8px 0" }}>
      {/* Company */}
      <div onClick={() => setActiveFilter(null)} style={treeItemStyle(!activeFilter)}>
        <IconCompany size={13} /><span>Overview</span>
      </div>

      {/* Products */}
      {comp.framework.products.map(p => (
        <div key={p.id}>
          <div onClick={() => { toggleNode(p.id); setActiveFilter({ type: "product", productId: p.id }); }} style={treeItemStyle(activeFilter?.productId === p.id, 0)}>
            {chevron(expandedNodes[p.id])}
            <span>{p.name}</span>
          </div>
          {expandedNodes[p.id] && p.initiatives.map(init => (
            <div key={init.id} onClick={() => setActiveFilter({ type: "initiative", initId: init.id })} style={treeItemStyle(activeFilter?.initId === init.id, 1)}>
              <IconInitiative size={11} /><span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{init.name}</span>
            </div>
          ))}
        </div>
      ))}

      <div style={{ height: 1, background: C.borderLight, margin: "8px 16px" }} />

      {/* Section shortcuts */}
      {["Threat Assessment", "Battlecard"].map(label => {
        const sectionId = label.toLowerCase().replace(" ", "-");
        return (
          <div key={label} data-section={sectionId} onClick={() => {
            setActiveFilter({ type: "section", section: sectionId });
            setTimeout(() => {
              const panel = document.getElementById("competitive-right-panel");
              const el = document.getElementById(`section-${sectionId}`);
              if (panel && el) {
                const target = el.getBoundingClientRect().top - panel.getBoundingClientRect().top + panel.scrollTop - 24;
                const start = panel.scrollTop;
                const diff = target - start;
                if (Math.abs(diff) < 2) return;
                const duration = 350;
                const startTime = performance.now();
                const animate = () => {
                  const elapsed = performance.now() - startTime;
                  const progress = Math.min(elapsed / duration, 1);
                  const ease = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
                  panel.scrollTop = start + diff * ease;
                  if (progress < 1) requestAnimationFrame(animate);
                };
                requestAnimationFrame(animate);
              }
            }, 0);
          }} style={treeItemStyle(activeFilter?.section === sectionId)}>
            <span style={{ fontSize: 11 }}>{label}</span>
          </div>
        );
      })}
    </div>
  );

  // ── RIGHT PANEL SECTIONS ──

  const renderAtAGlance = () => (
    <div style={{ marginBottom: 40 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
        <div style={{ width: 36, height: 36, borderRadius: 4, background: C.text, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <AristaLogo size={22} color={C.bg} />
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 300, color: C.text, letterSpacing: "-0.5px", margin: 0 }}>{comp.name}</h1>
      </div>
      <p style={{ fontSize: 14, color: C.textSecondary, fontStyle: "italic", fontWeight: 300, marginBottom: 24 }}>{comp.tagline}</p>

      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        {comp.metrics.map((m, i) => (
          <div key={i} style={{ border: `1px solid ${C.border}`, borderRadius: 2, padding: "16px 20px", minWidth: 140, flex: 1 }}>
            <p style={{ fontSize: 11, color: C.textTertiary, marginBottom: 6 }}>{m.label}</p>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <span style={{ fontSize: 22, fontWeight: 300, color: C.text }}>{m.value}</span>
              {m.direction === "up" && <span style={{ fontSize: 11, color: "#27ae60" }}>&#8593; {m.change}</span>}
              {m.direction === "neutral" && <span style={{ fontSize: 10, color: C.textTertiary }}>{m.change}</span>}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {comp.coreMessages.map((msg, i) => (
          <span key={i} style={{ fontSize: 11, padding: "4px 12px", border: `1px solid ${C.border}`, borderRadius: 100, color: C.textSecondary, fontWeight: 400 }}>{msg}</span>
        ))}
      </div>
    </div>
  );

  const renderTimeline = () => (
    <div style={{ marginBottom: 40 }}>
      <TierLabel>Recent Moves — Last 90 Days</TierLabel>
      <div style={{ display: "flex", flexDirection: "column", gap: 0, marginTop: 16 }}>
        {comp.recentMoves.map((item, i) => (
          <div key={i} style={{ display: "flex", gap: 16, padding: "14px 0", borderBottom: i < comp.recentMoves.length - 1 ? `1px solid ${C.borderLight}` : "none" }}>
            <span style={{ fontSize: 11, color: C.textTertiary, width: 65, flexShrink: 0 }}>{item.date}</span>
            <span style={{ fontSize: 10, padding: "2px 0", width: 76, textAlign: "center", border: `1px solid ${categoryColors[item.category] || C.border}40`, borderRadius: 100, color: categoryColors[item.category] || C.textTertiary, fontWeight: 500, whiteSpace: "nowrap", alignSelf: "flex-start", flexShrink: 0 }}>{item.category}</span>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: 500, color: C.text, marginBottom: 2 }}>{item.title}</p>
              <p style={{ fontSize: 12, fontWeight: 300, color: C.textSecondary, lineHeight: 1.5 }}>{item.description}</p>
              {item.url && (
                <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: C.textTertiary, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4, marginTop: 4 }}
                  onMouseEnter={e => e.currentTarget.style.color = C.text}
                  onMouseLeave={e => e.currentTarget.style.color = C.textTertiary}
                >
                  {item.source || "Source"} <span style={{ fontSize: 10 }}>{"\u2197"}</span>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderFramework = () => (
    <div style={{ marginBottom: 40 }}>
      <TierLabel>Competitor Messaging Framework</TierLabel>
      <div style={{ marginTop: 16 }}>
        {/* Company */}
        <div onClick={() => setExpandCompany(!expandCompany)} className="card" style={{ padding: "20px 24px", border: `1px solid ${C.border}`, borderRadius: 2, background: C.bg, marginBottom: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <div>
              <p style={{ fontSize: 9, letterSpacing: 2, fontWeight: 500, color: C.textTertiary, textTransform: "uppercase", marginBottom: 4 }}>Company</p>
              <h3 style={{ fontSize: 20, fontWeight: 300, color: C.text, marginBottom: 4 }}>{comp.framework.company.headline}</h3>
              <p style={{ fontSize: 13, color: C.textTertiary, fontWeight: 300 }}>{comp.framework.company.tagline}</p>
            </div>
            <span style={{ fontSize: 16, color: C.textTertiary, fontWeight: 200, transform: expandCompany ? "rotate(180deg)" : "none", transition: "transform 0.2s", display: "inline-block" }}>&#8964;</span>
          </div>
          {expandCompany && <p style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${C.borderLight}`, fontSize: 13, color: C.textSecondary, lineHeight: 1.7, fontWeight: 300 }}>{comp.framework.company.description}</p>}
        </div>

        <Connector />

        {/* Solution */}
        <div onClick={() => setExpandSolution(!expandSolution)} className="card" style={{ padding: "20px 24px", border: `1px solid ${C.border}`, borderRadius: 2, background: C.bg, marginBottom: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <div>
              <p style={{ fontSize: 9, letterSpacing: 2, fontWeight: 500, color: C.textTertiary, textTransform: "uppercase", marginBottom: 4 }}>Solution</p>
              <h3 style={{ fontSize: 20, fontWeight: 300, color: C.text, marginBottom: 4 }}>{comp.framework.solution.headline}</h3>
              <p style={{ fontSize: 13, color: C.textTertiary, fontWeight: 300 }}>{comp.framework.solution.tagline}</p>
            </div>
            <span style={{ fontSize: 16, color: C.textTertiary, fontWeight: 200, transform: expandSolution ? "rotate(180deg)" : "none", transition: "transform 0.2s", display: "inline-block" }}>&#8964;</span>
          </div>
          {expandSolution && (
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${C.borderLight}` }}>
              <p style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.7, fontWeight: 300, marginBottom: 12 }}>{comp.framework.solution.description}</p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {comp.framework.solution.pillars.map((p, i) => (
                  <span key={i} style={{ fontSize: 10, padding: "4px 12px", border: `1px solid ${C.border}`, borderRadius: 100, color: C.textSecondary }}>{p}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        <SplitConnector />

        {/* Product tabs */}
        <div style={{ display: "flex", gap: 0, borderBottom: `1px solid ${C.border}` }}>
          {comp.framework.products.map(p => {
            const isActive = activeProduct === p.id;
            return (
              <button key={p.id} onClick={() => setActiveProduct(p.id)} className="tab" style={{
                flex: 1, padding: "12px 20px", fontSize: 13, fontWeight: isActive ? 500 : 300,
                color: isActive ? C.text : C.textTertiary, fontFamily: "inherit",
                borderBottom: isActive ? `2px solid ${C.text}` : "2px solid transparent", marginBottom: -1,
              }}>{p.name}</button>
            );
          })}
        </div>

        {product && (
          <div style={{ border: `1px solid ${C.border}`, borderTop: "none", borderRadius: "0 0 2px 2px" }}>
            <div style={{ padding: "20px 24px" }}>
              <p style={{ fontSize: 13, color: C.textSecondary, fontStyle: "italic", fontWeight: 300, marginBottom: 8 }}>{product.tagline}</p>
              <p style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.7, fontWeight: 300 }}>{product.description}</p>
            </div>

            {/* Initiatives */}
            <div style={{ borderTop: `1px solid ${C.borderLight}`, padding: "16px 24px" }}>
              <div style={{ marginBottom: 12 }}><TierLabel icon={<IconInitiative size={12} />}>Initiatives</TierLabel></div>
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(product.initiatives.length, 3)}, 1fr)`, gap: 1, background: C.border, border: `1px solid ${C.border}`, borderRadius: 2, overflow: "hidden" }}>
                {product.initiatives.map(init => {
                  const isOpen = !!expandedInit[init.id];
                  return (
                    <div key={init.id} style={{ background: C.bg, display: "flex", flexDirection: "column" }}>
                      <div className="card" onClick={() => toggleInit(init.id)} style={{ padding: "16px 16px 12px", background: C.bg, borderRadius: 0, minHeight: 90 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                          <div style={{ flex: 1 }}>
                            <p style={{ fontSize: 13, fontWeight: 500, color: C.text, marginBottom: 4, lineHeight: 1.35 }}>{init.name}</p>
                            <p style={{ fontSize: 11, color: C.textTertiary, fontWeight: 300 }}>{init.tagline}</p>
                          </div>
                          <span style={{ fontSize: 14, color: C.textTertiary, fontWeight: 200, marginLeft: 6, transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s", display: "inline-block", flexShrink: 0 }}>&#8964;</span>
                        </div>
                        {isOpen && <p style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${C.borderLight}`, fontSize: 12, color: C.textSecondary, lineHeight: 1.6, fontWeight: 300 }}>{init.description}</p>}
                      </div>
                      <div style={{ borderTop: `1px solid ${C.borderLight}`, flex: 1 }}>
                        <div style={{ padding: "6px 16px 4px", display: "flex", alignItems: "center", gap: 4 }}>
                          <IconUseCase size={10} />
                          <span style={{ fontSize: 9, letterSpacing: 2, fontWeight: 500, color: C.textTertiary, textTransform: "uppercase" }}>Projects</span>
                        </div>
                        <div style={{ padding: "0 16px 12px" }}>
                          {init.projects.map((proj, pi) => (
                            <div key={pi} style={{ padding: "6px 0", borderBottom: pi < init.projects.length - 1 ? `1px solid ${C.borderLight}` : "none" }}>
                              <p style={{ fontSize: 12, fontWeight: 500, color: C.text, marginBottom: 2 }}>{proj.name}</p>
                              <p style={{ fontSize: 11, color: C.textTertiary, lineHeight: 1.5, fontWeight: 300 }}>{proj.detail}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderThreats = () => (
    <div id="section-threat-assessment" style={{ marginBottom: 40 }}>
      <TierLabel>Threat Assessment</TierLabel>
      <div style={{ marginTop: 16 }}>
        {/* Predictions */}
        <p style={{ fontSize: 10, letterSpacing: 2, fontWeight: 500, color: C.textTertiary, textTransform: "uppercase", marginBottom: 10 }}>Key Predictions</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
          {comp.threats.predictions.map((pred, i) => (
            <div key={i} style={{ padding: "16px 20px", border: `1px solid ${C.border}`, borderRadius: 2 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                <p style={{ fontSize: 13, fontWeight: 500, color: C.text, flex: 1, lineHeight: 1.4 }}>{pred.title}</p>
                <span style={{ fontSize: 9, fontWeight: 500, padding: "2px 8px", borderRadius: 100, whiteSpace: "nowrap", marginLeft: 12,
                  border: `1px solid ${pred.confidence === "High" ? "#27ae60" : pred.confidence === "Medium" ? "#d4a017" : C.border}`,
                  color: pred.confidence === "High" ? "#27ae60" : pred.confidence === "Medium" ? "#d4a017" : C.textTertiary,
                }}>{pred.confidence}</span>
              </div>
              <p style={{ fontSize: 12, color: C.textSecondary, lineHeight: 1.6, fontWeight: 300 }}>{pred.rationale}</p>
            </div>
          ))}
        </div>

        {/* Messaging Conflicts */}
        <p style={{ fontSize: 10, letterSpacing: 2, fontWeight: 500, color: C.textTertiary, textTransform: "uppercase", marginBottom: 10 }}>Messaging Conflicts</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
          {comp.threats.conflicts.map((c, i) => (
            <div key={i} style={{ padding: "16px 20px", borderRadius: 2, background: C.bg, borderLeft: "3px solid #e74c3c", border: `1px solid ${C.border}`, borderLeftWidth: 3, borderLeftColor: "#e74c3c" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <p style={{ fontSize: 13, fontWeight: 500, color: C.text, lineHeight: 1.4, flex: 1 }}>{c.title}</p>
                <div style={{ display: "flex", gap: 4, flexShrink: 0, marginLeft: 12 }}>
                  <span style={{ fontSize: 9, padding: "2px 8px", border: `1px solid ${C.border}`, borderRadius: 2, color: C.textTertiary }}>{c.affectedTier}</span>
                  <span style={{ fontSize: 9, padding: "2px 8px", border: `1px solid ${C.border}`, borderRadius: 100, color: C.textTertiary }}>{c.affectedPersona}</span>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, fontSize: 12, lineHeight: 1.6, fontWeight: 300 }}>
                <div><span style={{ fontSize: 9, letterSpacing: 1, fontWeight: 500, color: "#e74c3c", textTransform: "uppercase" }}>They claim</span><p style={{ color: C.textSecondary, marginTop: 4 }}>{c.theyClaim}</p></div>
                <div><span style={{ fontSize: 9, letterSpacing: 1, fontWeight: 500, color: "#27ae60", textTransform: "uppercase" }}>Our position</span><p style={{ color: C.textSecondary, marginTop: 4 }}>{c.ourPosition}</p></div>
              </div>
            </div>
          ))}
        </div>

        {/* Implication Flags */}
        <p style={{ fontSize: 10, letterSpacing: 2, fontWeight: 500, color: C.textTertiary, textTransform: "uppercase", marginBottom: 10 }}>Implication Flags</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {comp.threats.flags.map((flag, i) => {
            const cfg = severityConfig[flag.severity];
            return (
              <div key={i} style={{ padding: "16px 20px", borderRadius: 2, borderLeft: `3px solid ${cfg.color}`, border: `1px solid ${C.border}`, borderLeftWidth: 3, borderLeftColor: cfg.color }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 9, fontWeight: 500, padding: "2px 8px", borderRadius: 100, border: `1px solid ${cfg.color}40`, color: cfg.color }}>{cfg.label}</span>
                  <p style={{ fontSize: 13, fontWeight: 500, color: C.text }}>{flag.title}</p>
                </div>
                <p style={{ fontSize: 12, color: C.textSecondary, lineHeight: 1.6, fontWeight: 300, marginBottom: 6 }}>{flag.description}</p>
                <p style={{ fontSize: 11, color: C.textTertiary, fontStyle: "italic" }}>Suggested Action: {flag.suggestedAction}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderBattlecard = () => (
    <div id="section-battlecard" style={{ marginBottom: 40 }}>
      <TierLabel>Battlecard — Quick Reference</TierLabel>
      <div style={{ marginTop: 16, border: `1px solid ${C.border}`, borderRadius: 2, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 120px", padding: "10px 16px", background: C.surface, borderBottom: `1px solid ${C.border}`, fontSize: 9, letterSpacing: 1.5, fontWeight: 500, color: C.textTertiary, textTransform: "uppercase" }}>
          <span>When they say...</span><span>We say...</span><span>Audience</span>
        </div>
        {comp.battlecard.map((row, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 120px", padding: "14px 16px", borderBottom: i < comp.battlecard.length - 1 ? `1px solid ${C.borderLight}` : "none", fontSize: 12, lineHeight: 1.6 }}>
            <p style={{ fontWeight: 400, color: C.text, paddingRight: 16 }}>{row.theySay}</p>
            <p style={{ fontWeight: 300, color: C.textSecondary, paddingRight: 16 }}>{row.weSay}</p>
            <span style={{ fontSize: 10, padding: "2px 8px", border: `1px solid ${C.border}`, borderRadius: 100, color: C.textTertiary, alignSelf: "flex-start", whiteSpace: "nowrap" }}>{row.audience}</span>
          </div>
        ))}
        <div style={{ padding: "12px 16px", borderTop: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button style={{ padding: "6px 16px", fontSize: 11, fontWeight: 500, border: `1px solid ${C.border}`, borderRadius: 2, background: "none", color: C.text, cursor: "pointer", fontFamily: "inherit" }}>Export Battlecard</button>
          <span style={{ fontSize: 11, color: C.textTertiary }}>Last Updated: March 2026</span>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ display: "flex", flex: 1, height: "100vh", overflow: "hidden" }}>
      {/* ── LEFT PANEL ── */}
      <div style={{ width: panelWidth, borderRight: `1px solid ${C.border}`, background: C.surface, display: "flex", flexDirection: "column", flexShrink: 0, overflow: "hidden" }}>
        <div style={{ padding: "20px 20px 16px", borderBottom: `1px solid ${C.border}` }}>
          <h2 style={{ fontSize: 15, fontWeight: 500, letterSpacing: "-0.3px", color: C.text, marginBottom: 8 }}>Competitive</h2>
          <div style={{ position: "relative" }}>
            <select value={competitorId} style={{ ...selectStyle, paddingLeft: 36 }} readOnly>
              <option value="arista">Arista Networks</option>
              <option disabled>Juniper / HPE — Coming Soon</option>
              <option disabled>Fortinet — Coming Soon</option>
            </select>
            <div style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", width: 20, height: 20, borderRadius: 3, background: C.text, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
              <AristaLogo size={13} color={C.bg} />
            </div>
          </div>
        </div>
        <div style={{ flex: 1, overflowY: "auto" }}>
          {renderTree()}
        </div>
      </div>

      {/* ── DRAG HANDLE ── */}
      <div
        onMouseDown={() => setIsDragging(true)}
        style={{ width: 6, cursor: "col-resize", background: isDragging ? C.border : "transparent", transition: "background 0.15s", flexShrink: 0, position: "relative", zIndex: 10, marginLeft: -3, marginRight: -3 }}
        onMouseEnter={e => e.currentTarget.style.background = C.border}
        onMouseLeave={e => { if (!isDragging) e.currentTarget.style.background = "transparent"; }}
      />

      {/* ── RIGHT PANEL ── */}
      <div id="competitive-right-panel" style={{ flex: 1, overflowY: "auto" }}>
        <div style={{ padding: "24px 32px 96px", maxWidth: 960 }}>
          {renderAtAGlance()}
          {renderTimeline()}
          {renderFramework()}
          {renderThreats()}
          {renderBattlecard()}
        </div>
      </div>
    </div>
  );
}
