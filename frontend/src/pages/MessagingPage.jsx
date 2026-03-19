import { useState } from "react";
import { C } from "../theme";
import { fw } from "../data/framework";
import { verticals } from "../data/verticals";
import { CiscoLogo } from "../components/icons/CiscoLogo";
import { IconCompany, IconSolution, IconInitiative, IconUseCase, productIcons, pillarIcons } from "../components/icons/PageIcons";
import { Connector, SplitConnector } from "../components/shared/Connector";
import { TierLabel } from "../components/shared/TierLabel";
import { PageShell } from "../components/shared/PageShell";
import { DetailModal } from "../components/shared/DetailModal";

function InfoTip({ text }) {
  const [show, setShow] = useState(false);
  return (
    <span
      style={{ position: "relative", display: "inline-flex", alignItems: "center", marginLeft: 6 }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <span style={{
        width: 14, height: 14, borderRadius: "50%",
        border: `1px solid ${show ? C.text : C.textTertiary}`,
        color: show ? C.text : C.textTertiary,
        fontSize: 9, fontWeight: 500, fontStyle: "italic",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        cursor: "help", transition: "all 0.15s",
        fontFamily: "Georgia, serif",
      }}>
        i
      </span>
      {show && (
        <span style={{
          position: "absolute", top: 20, left: -4,
          width: 280, padding: "10px 14px",
          background: C.bg, border: `1px solid ${C.border}`, borderRadius: 2,
          fontSize: 12, fontWeight: 300, lineHeight: 1.6, color: C.textSecondary,
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          zIndex: 50, pointerEvents: "none",
        }}>
          {text}
        </span>
      )}
    </span>
  );
}

function MoreButton({ onClick }) {
  return (
    <span
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      style={{
        fontSize: 12, fontWeight: 500, color: C.textTertiary, cursor: "pointer",
        display: "inline-block", marginTop: 12,
      }}
      onMouseEnter={e => e.currentTarget.style.color = C.text}
      onMouseLeave={e => e.currentTarget.style.color = C.textTertiary}
    >
      More ›
    </span>
  );
}

export function MessagingPage() {
  const [expandCompany, setExpandCompany] = useState(false);
  const [expandSolution, setExpandSolution] = useState(false);
  const [activeProduct, setActiveProduct] = useState("networking");
  const [expandedInit, setExpandedInit] = useState({});
  const [vertical, setVertical] = useState("general");
  const [detailModal, setDetailModal] = useState(null);

  const v = verticals[vertical];
  const getProducts = () => {
    if (vertical === "general" || !v.products) return fw.products;
    return fw.products.map(base => {
      const overlay = v.products.find(vp => vp.id === base.id);
      if (!overlay) return base;
      return { ...base, ...overlay };
    });
  };
  const products = getProducts();
  const product = products.find(p => p.id === activeProduct);
  const toggleInit = (id) => setExpandedInit(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <PageShell title="Futureproof Workplace" subtitle="Corporate Messaging Framework">
      {/* ── VERTICAL SELECTOR ── */}
      <div style={{ marginBottom: 32, display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 11, fontWeight: 500, color: C.textTertiary, letterSpacing: 1, textTransform: "uppercase" }}>Vertical</span>
        <select
          value={vertical}
          onChange={(e) => { setVertical(e.target.value); setExpandedInit({}); }}
          style={{
            appearance: "none", WebkitAppearance: "none",
            background: C.surface,
            border: `1px solid ${C.border}`,
            borderRadius: 2,
            padding: "6px 28px 6px 10px",
            fontSize: 13, fontWeight: 400, fontFamily: "inherit",
            color: C.text,
            cursor: "pointer",
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23999' fill='none' stroke-width='1.2'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 10px center",
          }}
        >
          {Object.entries(verticals).map(([k, v]) => (
            <option key={k} value={k}>{v.label}</option>
          ))}
        </select>
      </div>

      {/* ── TIER 1: ONE CISCO ── */}
      <div style={{ marginBottom: 6, display: "flex", alignItems: "center" }}>
        <TierLabel icon={<IconCompany size={16} />}>Company</TierLabel>
        <InfoTip text="Long-term strategic vision. Sets the direction for our customers, encouraging multi-year alignment with Cisco as a platform partner." />
      </div>
      <div
        className="card"
        onClick={() => setExpandCompany(!expandCompany)}
        style={{
          padding: "28px 32px",
          border: `1px solid ${C.border}`,
          borderRadius: 2,
          background: C.bg,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <div>
            <h2 style={{ fontSize: 28, fontWeight: 300, letterSpacing: "-0.5px", marginBottom: 6 }}>
              {fw.company.headline}
            </h2>
            <p style={{ fontSize: 14, color: C.textSecondary, fontWeight: 300 }}>
              {fw.company.tagline}
            </p>
          </div>
          <span style={{
            fontSize: 20, color: C.textTertiary, fontWeight: 200,
            transform: expandCompany ? "rotate(180deg)" : "none",
            transition: "transform 0.3s", display: "inline-block",
          }}>&#8964;</span>
        </div>
        {expandCompany && (
          <div style={{ marginTop: 20, paddingTop: 20, borderTop: `1px solid ${C.borderLight}` }}>
            <p style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.8, fontWeight: 300 }}>
              {fw.company.description}
            </p>

            {/* Design Philosophy Cards */}
            {fw.company.detail && fw.company.detail.sections.length >= 2 && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 20 }}>
                {fw.company.detail.sections.slice(0, 2).map((section, i) => (
                  <div
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      setDetailModal({
                        title: section.title.replace("Design Philosophy: ", ""),
                        tagline: "Design Philosophy",
                        description: section.content,
                        detail: null,
                      });
                    }}
                    style={{
                      padding: 16, border: `1px solid ${C.borderLight}`, borderRadius: 2, background: C.surface,
                      cursor: "pointer", transition: "all 0.15s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.accentSoft; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = C.borderLight; e.currentTarget.style.background = C.surface; }}
                  >
                    <p style={{
                      fontSize: 10, letterSpacing: 2, fontWeight: 500, color: C.textTertiary,
                      textTransform: "uppercase", marginBottom: 8,
                    }}>{section.title.replace("Design Philosophy: ", "")}</p>
                    <p style={{
                      fontSize: 13, color: C.textSecondary, lineHeight: 1.6, fontWeight: 300, margin: 0,
                      display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden",
                    }}>{section.content}</p>
                    <span style={{ fontSize: 12, fontWeight: 500, color: C.textTertiary, display: "inline-block", marginTop: 10 }}>More ›</span>
                  </div>
                ))}
              </div>
            )}

            <MoreButton onClick={() => setDetailModal({
              title: fw.company.headline,
              tagline: fw.company.tagline,
              description: fw.company.description,
              detail: fw.company.detail,
            })} />
          </div>
        )}
      </div>

      <Connector />

      {/* ── TIER 2: SOLUTION CATEGORY ── */}
      <div style={{ marginBottom: 6, display: "flex", alignItems: "center" }}>
        <TierLabel icon={<IconSolution size={16} />}>Solution Category</TierLabel>
        <InfoTip text="Strategic areas of innovation that support company-level priorities. This is how Cisco organizes its response to the market shift." />
      </div>
      <div
        className="card"
        onClick={() => setExpandSolution(!expandSolution)}
        style={{
          padding: "28px 32px",
          border: `1px solid ${C.border}`,
          borderRadius: 2,
          background: C.bg,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <div>
            <h2 style={{ fontSize: 28, fontWeight: 300, letterSpacing: "-0.5px", marginBottom: 6 }}>
              {fw.solutionCategory.headline}
            </h2>
            <p style={{ fontSize: 14, color: C.textSecondary, fontWeight: 300, marginBottom: 16 }}>
              {vertical !== "general" && v.solutionTagline ? v.solutionTagline : fw.solutionCategory.tagline}
            </p>
          </div>
          <span style={{
            fontSize: 20, color: C.textTertiary, fontWeight: 200,
            transform: expandSolution ? "rotate(180deg)" : "none",
            transition: "transform 0.3s", display: "inline-block", flexShrink: 0,
          }}>&#8964;</span>
        </div>
        {expandSolution && (
          <div style={{ marginTop: 24, paddingTop: 24, borderTop: `1px solid ${C.borderLight}` }}>
            <p style={{ fontSize: 10, letterSpacing: 2, fontWeight: 500, color: C.textTertiary, textTransform: "uppercase", marginBottom: 8 }}>Vision</p>
            <p style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.8, fontWeight: 300, marginBottom: 20 }}>{fw.solutionCategory.vision}</p>
            <p style={{ fontSize: 10, letterSpacing: 2, fontWeight: 500, color: C.textTertiary, textTransform: "uppercase", marginBottom: 8 }}>Solution Narrative</p>
            <p style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.8, fontWeight: 300 }}>{fw.solutionCategory.solution}</p>


            {fw.solutionCategory.detail && (
              <MoreButton onClick={() => setDetailModal({
                title: fw.solutionCategory.headline,
                tagline: fw.solutionCategory.tagline,
                description: fw.solutionCategory.vision,
                detail: fw.solutionCategory.detail,
              })} />
            )}
          </div>
        )}
      </div>

      <SplitConnector />

      {/* ── TIER 3: PRODUCTS ── */}
      <div style={{ marginBottom: 8, display: "flex", alignItems: "center" }}>
        <TierLabel>Product</TierLabel>
        <InfoTip text="Specific solution offerings that map to customer needs. Each product has its own market position, competitive landscape, and buyer set." />
      </div>

      <div style={{
        display: "flex", gap: 0,
        borderBottom: `1px solid ${C.border}`,
        marginBottom: 0,
      }}>
        {products.map(p => {
          const isActive = activeProduct === p.id;
          const Icon = productIcons[p.id];
          return (
            <button
              key={p.id}
              className="tab"
              onClick={() => setActiveProduct(p.id)}
              style={{
                flex: 1,
                padding: "14px 28px",
                fontSize: 14, fontWeight: isActive ? 500 : 300,
                color: isActive ? C.text : C.textTertiary,
                borderBottom: isActive ? `2px solid ${C.text}` : "2px solid transparent",
                marginBottom: -1,
                fontFamily: "inherit",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              }}
            >
              <Icon size={16} />
              {p.name}
            </button>
          );
        })}
      </div>

      {product && (
        <div style={{
          border: `1px solid ${C.border}`,
          borderTop: "none",
          borderRadius: "0 0 2px 2px",
          background: C.bg,
        }}>
          <div style={{ padding: "32px 32px 28px" }}>
            <p style={{ fontSize: 15, color: C.textSecondary, fontStyle: "italic", fontWeight: 300, marginBottom: 12 }}>
              {product.tagline}
            </p>
            <p style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.8, fontWeight: 300 }}>
              {product.description}
            </p>

            {product.detail && (
              <MoreButton onClick={() => setDetailModal({
                title: product.name,
                tagline: product.tagline,
                description: product.description,
                detail: product.detail,
              })} />
            )}
          </div>

          <div style={{ height: 1, background: C.borderLight, margin: "0 32px" }} />

          <div style={{ padding: "28px 32px 36px" }}>
            <div style={{ marginBottom: 20, display: "flex", alignItems: "center" }}>
              <TierLabel icon={<IconInitiative size={14} />}>Initiatives</TierLabel>
              <InfoTip text="Customer-relevant priorities that drive engagement. These are the themes customers recognize from their own board-level conversations." />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: C.border, border: `1px solid ${C.border}`, borderRadius: 2, overflow: "hidden" }}>
              {product.initiatives.map(init => {
                const isOpen = !!expandedInit[init.id];
                const InitIcon = init.pillar ? pillarIcons[init.pillar] : null;
                return (
                  <div key={init.id} style={{ background: C.bg, display: "flex", flexDirection: "column" }}>
                    <div
                      className="card"
                      onClick={() => toggleInit(init.id)}
                      style={{
                        padding: "20px 20px 16px",
                        background: C.bg,
                        borderRadius: 0,
                        minHeight: 110,
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                            {InitIcon && <InitIcon size={16} color={C.text} />}
                            <p style={{ fontSize: 14, fontWeight: 500, color: C.text, lineHeight: 1.35, margin: 0 }}>
                              {init.name}
                            </p>
                          </div>
                          <p style={{ fontSize: 12, color: C.textTertiary, fontWeight: 300 }}>
                            {init.tagline}
                          </p>
                        </div>
                        <span style={{
                          fontSize: 16, color: C.textTertiary, fontWeight: 200, marginLeft: 8,
                          transform: isOpen ? "rotate(180deg)" : "none",
                          transition: "transform 0.2s", display: "inline-block", flexShrink: 0,
                        }}>&#8964;</span>
                      </div>
                      {isOpen && (
                        <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${C.borderLight}` }}>
                          <p style={{
                            fontSize: 13, color: C.textSecondary, lineHeight: 1.7, fontWeight: 300,
                          }}>
                            {init.description}
                          </p>

                          {init.detail && (
                            <MoreButton onClick={() => setDetailModal({
                              title: init.name,
                              tagline: init.tagline,
                              description: init.description,
                              detail: init.detail,
                            })} />
                          )}
                        </div>
                      )}
                    </div>

                    <div style={{ borderTop: `1px solid ${C.borderLight}`, flex: 1 }}>
                      <div style={{ padding: "8px 20px 4px", display: "flex", alignItems: "center", gap: 5 }}>
                        <IconUseCase size={11} />
                        <span style={{ fontSize: 9, letterSpacing: 2, fontWeight: 500, color: C.textTertiary, textTransform: "uppercase" }}>
                          Projects
                        </span>
                        <InfoTip text="Funded near-term priorities. These are the specific buying drivers that create urgency and unlock budget today." />
                      </div>
                      {init.projects.map((proj, i) => (
                        <div key={i} style={{
                          padding: "10px 20px",
                          borderTop: i > 0 ? `1px solid ${C.borderLight}` : "none",
                        }}>
                          <p style={{ fontSize: 13, fontWeight: 500, color: C.text, marginBottom: 2 }}>{proj.name}</p>
                          <p style={{ fontSize: 12, color: C.textTertiary, lineHeight: 1.5, fontWeight: 300 }}>{proj.detail}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div style={{ marginTop: 48, paddingTop: 24, borderTop: `1px solid ${C.borderLight}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{ fontSize: 12, color: C.textTertiary, fontWeight: 300, lineHeight: 1.6 }}>
          Company &rarr; Solution Category &rarr; Product &times;2 &rarr; Initiative &times;3 &rarr; Project &times;3
        </p>
        <CiscoLogo width={72} style={{ filter: C.logoFilter }} />
      </div>

      {/* ── DETAIL MODAL ── */}
      {detailModal && (
        <DetailModal
          title={detailModal.title}
          tagline={detailModal.tagline}
          description={detailModal.description}
          detail={detailModal.detail}
          onClose={() => setDetailModal(null)}
        />
      )}
    </PageShell>
  );
}
