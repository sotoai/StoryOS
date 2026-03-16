import { C } from "../../theme";

export function DeckTray({ count, onClear, onPreview, onDownload, downloading }) {
  if (count === 0) return null;
  return (
    <div style={{
      position: "fixed", bottom: 0, left: 72, right: 0, height: 52,
      background: C.surface, borderTop: `1px solid ${C.border}`, zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px",
      animation: "traySlideUp 0.2s ease",
    }}>
      <span style={{ fontSize: 13, fontWeight: 400, color: C.text }}>{count} slide{count !== 1 ? "s" : ""} selected</span>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={onClear} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 11, color: C.textTertiary, padding: "6px 12px" }}>Clear</button>
        <button onClick={onPreview} style={{ background: "none", border: `1px solid ${C.border}`, borderRadius: 2, padding: "6px 16px", cursor: "pointer", fontSize: 11, fontWeight: 500, color: C.text }}>Preview Deck</button>
        <button
          onClick={onDownload}
          disabled={downloading}
          style={{
            background: C.text, color: C.bg, border: "none", borderRadius: 2, padding: "6px 16px",
            cursor: downloading ? "default" : "pointer", fontSize: 11, fontWeight: 500,
            opacity: downloading ? 0.6 : 1,
          }}
        >
          {downloading ? "Assembling..." : "Download"}
        </button>
      </div>
    </div>
  );
}
