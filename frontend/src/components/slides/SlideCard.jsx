import { C } from "../../theme";
import { SlidePreview } from "./SlidePreview";
import { layerMeta } from "../../data/slides";

export function SlideCard({ slide, isSelected, onToggle, onPreview }) {
  const lm = slide.layer ? layerMeta[slide.layer] : null;
  return (
    <div
      className="card"
      onClick={onPreview}
      style={{
        position: "relative", border: `1px solid ${isSelected ? C.text : C.border}`,
        borderRadius: 2, background: C.bg, cursor: "pointer", overflow: "hidden",
        boxShadow: isSelected ? `0 0 0 1px ${C.text}` : "none",
      }}
      onMouseEnter={e => { if (!isSelected) e.currentTarget.style.borderColor = C.textTertiary; }}
      onMouseLeave={e => { if (!isSelected) e.currentTarget.style.borderColor = C.border; }}
    >
      {/* Slide preview image – 16:9 aspect ratio */}
      <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
        {slide.thumbnail_url ? (
          <img
            src={slide.thumbnail_url}
            alt={slide.title || "Slide"}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : (
          <SlidePreview slide={slide} width={320} height={180} responsive />
        )}
        {/* Checkbox overlay */}
        <div
          onClick={e => { e.stopPropagation(); onToggle(); }}
          style={{
            position: "absolute", top: 6, left: 6, width: 16, height: 16,
            border: `1.5px solid ${isSelected ? C.text : "rgba(150,150,150,0.7)"}`,
            borderRadius: 2, background: isSelected ? C.text : "rgba(255,255,255,0.85)",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.15s ease", cursor: "pointer",
          }}
        >
          {isSelected && (
            <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </div>
        {/* Layer badge */}
        {lm && (
          <div style={{ position: "absolute", bottom: 4, right: 4, fontSize: 7, padding: "1px 5px", borderRadius: 3, background: "rgba(0,0,0,0.55)", color: "#fff", fontWeight: 500, letterSpacing: 0.3, display: "flex", alignItems: "center", gap: 2, pointerEvents: "none" }}>
            <span style={{ fontSize: 6 }}>{lm.icon}</span> {lm.label}
          </div>
        )}
      </div>
      {/* Bottom accent bar */}
      <div style={{ height: 2, background: isSelected ? C.text : C.border, transition: "background 0.2s ease" }} />
    </div>
  );
}
