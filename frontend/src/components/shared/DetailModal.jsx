import { useEffect } from "react";
import { C } from "../../theme";
import { pillarIcons } from "../icons/PageIcons";

export function DetailModal({ title, tagline, description, detail, accentColor, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)",
        zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: "100%", maxWidth: 720, maxHeight: "80vh", background: C.bg,
          borderRadius: 2, border: `1px solid ${C.border}`, overflow: "hidden",
          display: "flex", flexDirection: "column",
        }}
      >
        {/* Header */}
        <div style={{
          padding: "28px 32px 20px", borderBottom: `1px solid ${C.border}`,
          borderLeft: accentColor ? `4px solid ${accentColor}` : "none",
          display: "flex", justifyContent: "space-between", alignItems: "flex-start",
          flexShrink: 0,
        }}>
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 300, color: C.text, margin: 0, letterSpacing: "-0.5px" }}>{title}</h2>
            {tagline && <p style={{ fontSize: 13, color: C.textTertiary, fontWeight: 300, margin: "6px 0 0" }}>{tagline}</p>}
          </div>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", cursor: "pointer", color: C.textTertiary, fontSize: 20, lineHeight: 1, flexShrink: 0, marginLeft: 16 }}
          >&times;</button>
        </div>

        {/* Body — scrollable */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 32px 32px" }}>
          {/* Summary description */}
          <p style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.8, fontWeight: 300, margin: 0 }}>
            {description}
          </p>

          {/* Detail sections */}
          {detail && detail.sections && detail.sections.length > 0 && (
            <>
              <div style={{ height: 1, background: C.borderLight, margin: "24px 0" }} />
              {detail.sections.map((section, i) => {
                const PillarIcon = pillarIcons[section.title];
                return (
                <div key={i} style={{ marginBottom: i < detail.sections.length - 1 ? 24 : 0 }}>
                  <p style={{
                    fontSize: 10, letterSpacing: 2, fontWeight: 500,
                    color: C.textTertiary, textTransform: "uppercase", marginBottom: 8,
                    display: "flex", alignItems: "center", gap: 6,
                  }}>
                    {PillarIcon && <PillarIcon size={14} />}
                    {section.title}
                  </p>
                  <p style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.8, fontWeight: 300, margin: 0 }}>
                    {section.content}
                  </p>
                </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
