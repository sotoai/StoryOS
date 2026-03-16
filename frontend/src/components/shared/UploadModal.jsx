import { useState, useRef } from "react";
import { C } from "../../theme";

export function UploadModal({ onClose, onUploadComplete }) {
  // Phase 1 state
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef(null);

  // Phase 2 state
  const [phase, setPhase] = useState(1); // 1 = upload, 2 = picker
  const [deckData, setDeckData] = useState(null); // DeckResponse from API
  const [slideSelections, setSlideSelections] = useState({}); // {slideId: {selected, product, type}}
  const [batchProduct, setBatchProduct] = useState("");
  const [batchType, setBatchType] = useState("");
  const [importing, setImporting] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f && f.name.toLowerCase().endsWith(".pptx")) {
      setFile(f);
      setErrorMsg("");
    } else {
      setErrorMsg("Only .pptx files are accepted.");
    }
  };

  const handleFileSelect = (e) => {
    const f = e.target.files[0];
    if (f) {
      setFile(f);
      setErrorMsg("");
    }
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setStatus("uploading");
    setErrorMsg("");

    try {
      const timer1 = setTimeout(() => setStatus("extracting"), 1500);
      const timer2 = setTimeout(() => setStatus("thumbnails"), 4000);

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/decks/upload", {
        method: "POST",
        body: formData,
      });

      clearTimeout(timer1);
      clearTimeout(timer2);

      if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: "Upload failed" }));
        throw new Error(err.detail || `Server error ${res.status}`);
      }

      const data = await res.json();
      setDeckData(data);

      // Initialize selections — all selected by default, no tags
      const selections = {};
      (data.slides || []).forEach(s => {
        selections[s.id] = { selected: true, product: "", type: "" };
      });
      setSlideSelections(selections);

      // Transition to phase 2
      setPhase(2);
      setUploading(false);
      setStatus("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Upload failed. Is the backend running?");
      setUploading(false);
    }
  };

  const statusText = {
    uploading: "Uploading...",
    extracting: "Extracting slides...",
    thumbnails: "Generating thumbnails...",
    done: "Done!",
  };

  // Phase 2 helpers
  const slides = deckData?.slides || [];
  const selectedCount = Object.values(slideSelections).filter(s => s.selected).length;
  const allSelected = selectedCount === slides.length && slides.length > 0;

  const toggleSlide = (id) => {
    setSlideSelections(prev => ({
      ...prev,
      [id]: { ...prev[id], selected: !prev[id].selected },
    }));
  };

  const toggleAll = () => {
    const newVal = !allSelected;
    setSlideSelections(prev => {
      const next = { ...prev };
      Object.keys(next).forEach(id => { next[id] = { ...next[id], selected: newVal }; });
      return next;
    });
  };

  const updateSlideTag = (id, field, value) => {
    setSlideSelections(prev => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const applyBatchTags = () => {
    setSlideSelections(prev => {
      const next = { ...prev };
      Object.keys(next).forEach(id => {
        if (next[id].selected) {
          if (batchProduct) next[id] = { ...next[id], product: batchProduct };
          if (batchType) next[id] = { ...next[id], type: batchType };
        }
      });
      return next;
    });
  };

  const handleImport = async () => {
    setImporting(true);
    try {
      // PATCH tags for selected slides that have tags set
      const patchPromises = [];
      Object.entries(slideSelections).forEach(([id, sel]) => {
        if (sel.selected && (sel.product || sel.type)) {
          patchPromises.push(
            fetch(`/api/slides/${id}/tags`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                product: sel.product || null,
                type: sel.type || null,
              }),
            })
          );
        }
      });
      await Promise.all(patchPromises);
      onUploadComplete(deckData);
      onClose();
    } catch (err) {
      setErrorMsg(`Import failed: ${err.message}`);
      setImporting(false);
    }
  };

  const selectStyle = {
    fontSize: 11, fontFamily: "inherit", padding: "3px 6px",
    border: `1px solid ${C.border}`, borderRadius: 2,
    background: C.bg, color: C.text, cursor: "pointer",
    outline: "none", width: "100%",
  };

  // ── RENDER ──

  if (phase === 2) {
    return (
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)",
          zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center",
          padding: 20,
        }}
      >
        <div
          onClick={e => e.stopPropagation()}
          style={{
            width: "100%", maxWidth: 900, maxHeight: "90vh", background: C.bg,
            borderRadius: 2, border: `1px solid ${C.border}`,
            display: "flex", flexDirection: "column", overflow: "hidden",
          }}
        >
          {/* Header */}
          <div style={{
            padding: "16px 24px", borderBottom: `1px solid ${C.border}`,
            display: "flex", justifyContent: "space-between", alignItems: "center",
            flexShrink: 0,
          }}>
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 500, color: C.text, margin: 0 }}>Select & Tag Slides</h3>
              <p style={{ fontSize: 11, color: C.textTertiary, margin: "4px 0 0" }}>
                {deckData?.filename} · {slides.length} slide{slides.length !== 1 ? "s" : ""} extracted
              </p>
            </div>
            <button
              onClick={onClose}
              style={{ background: "none", border: "none", cursor: "pointer", color: C.textTertiary, fontSize: 18, lineHeight: 1 }}
            >&times;</button>
          </div>

          {/* Batch tagging bar */}
          <div style={{
            padding: "12px 24px", borderBottom: `1px solid ${C.border}`,
            display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap",
            flexShrink: 0,
          }}>
            <span style={{ fontSize: 11, color: C.textSecondary, fontWeight: 500, letterSpacing: 0.5, textTransform: "uppercase" }}>
              Apply to all selected:
            </span>
            <select value={batchProduct} onChange={e => setBatchProduct(e.target.value)} style={{ ...selectStyle, width: 120 }}>
              <option value="">Product —</option>
              <option value="networking">Networking</option>
              <option value="collaboration">Collaboration</option>
            </select>
            <select value={batchType} onChange={e => setBatchType(e.target.value)} style={{ ...selectStyle, width: 120 }}>
              <option value="">Type —</option>
              <option value="company">Company</option>
              <option value="solution">Solution</option>
              <option value="product">Product</option>
              <option value="initiative">Initiative</option>
              <option value="useCase">Use Case</option>
              <option value="story">Story</option>
            </select>
            <button
              onClick={applyBatchTags}
              disabled={!batchProduct && !batchType}
              style={{
                fontSize: 11, fontFamily: "inherit", fontWeight: 500,
                padding: "4px 12px", border: `1px solid ${C.border}`, borderRadius: 2,
                background: (batchProduct || batchType) ? C.text : C.surface,
                color: (batchProduct || batchType) ? C.bg : C.textTertiary,
                cursor: (batchProduct || batchType) ? "pointer" : "default",
              }}
            >Apply</button>

            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
              <button
                onClick={toggleAll}
                style={{
                  fontSize: 11, fontFamily: "inherit", color: C.textSecondary,
                  background: "none", border: "none", cursor: "pointer", textDecoration: "underline",
                }}
              >
                {allSelected ? "Deselect All" : "Select All"}
              </button>
              <span style={{ fontSize: 11, color: C.textTertiary }}>
                {selectedCount} of {slides.length} selected
              </span>
            </div>
          </div>

          {/* Slide grid */}
          <div style={{
            flex: 1, overflow: "auto", padding: 24,
          }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 12,
            }}>
              {slides.map(slide => {
                const sel = slideSelections[slide.id] || { selected: false, product: "", type: "" };
                return (
                  <div
                    key={slide.id}
                    style={{
                      border: `1px solid ${sel.selected ? C.text : C.border}`,
                      borderRadius: 2,
                      background: C.bg,
                      overflow: "hidden",
                      opacity: sel.selected ? 1 : 0.4,
                      transition: "all 0.15s",
                    }}
                  >
                    {/* Thumbnail */}
                    <div
                      onClick={() => toggleSlide(slide.id)}
                      style={{
                        aspectRatio: "16/9", overflow: "hidden", cursor: "pointer",
                        background: "#f0f0f0", position: "relative",
                        filter: sel.selected ? "none" : "grayscale(100%)",
                      }}
                    >
                      {slide.thumbnail_url ? (
                        <img
                          src={slide.thumbnail_url}
                          alt={slide.title || `Slide ${slide.slide_index + 1}`}
                          style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
                        />
                      ) : (
                        <div style={{
                          width: "100%", height: "100%", display: "flex",
                          alignItems: "center", justifyContent: "center",
                          color: "#999", fontSize: 13,
                        }}>
                          Slide {slide.slide_index + 1}
                        </div>
                      )}
                    </div>

                    {/* Info + tags */}
                    <div style={{ padding: "8px 10px" }}>
                      <label style={{
                        display: "flex", alignItems: "center", gap: 6,
                        cursor: "pointer", marginBottom: 8,
                      }}>
                        <input
                          type="checkbox"
                          checked={sel.selected}
                          onChange={() => toggleSlide(slide.id)}
                          style={{ margin: 0 }}
                        />
                        <span style={{
                          fontSize: 11, fontWeight: 500, color: C.text,
                          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                        }}>
                          {slide.title || `Slide ${slide.slide_index + 1}`}
                        </span>
                      </label>

                      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <span style={{ fontSize: 10, color: C.textTertiary, width: 42, flexShrink: 0 }}>Product</span>
                          <select
                            value={sel.product}
                            onChange={e => updateSlideTag(slide.id, "product", e.target.value)}
                            style={selectStyle}
                          >
                            <option value="">—</option>
                            <option value="networking">Networking</option>
                            <option value="collaboration">Collaboration</option>
                          </select>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <span style={{ fontSize: 10, color: C.textTertiary, width: 42, flexShrink: 0 }}>Type</span>
                          <select
                            value={sel.type}
                            onChange={e => updateSlideTag(slide.id, "type", e.target.value)}
                            style={selectStyle}
                          >
                            <option value="">—</option>
                            <option value="company">Company</option>
                            <option value="solution">Solution</option>
                            <option value="product">Product</option>
                            <option value="initiative">Initiative</option>
                            <option value="useCase">Use Case</option>
                            <option value="story">Story</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div style={{
            padding: "12px 24px", borderTop: `1px solid ${C.border}`,
            display: "flex", justifyContent: "space-between", alignItems: "center",
            flexShrink: 0,
          }}>
            {errorMsg && (
              <p style={{ fontSize: 12, color: "#e74c3c", margin: 0 }}>{errorMsg}</p>
            )}
            <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
              <button
                onClick={onClose}
                style={{
                  fontSize: 12, fontFamily: "inherit", fontWeight: 400,
                  padding: "8px 20px", border: `1px solid ${C.border}`, borderRadius: 2,
                  background: "none", color: C.textSecondary, cursor: "pointer",
                }}
              >Cancel</button>
              <button
                onClick={handleImport}
                disabled={selectedCount === 0 || importing}
                style={{
                  fontSize: 12, fontFamily: "inherit", fontWeight: 500,
                  padding: "8px 20px", border: "none", borderRadius: 2,
                  background: selectedCount > 0 ? C.text : C.border,
                  color: selectedCount > 0 ? C.bg : C.textTertiary,
                  cursor: selectedCount > 0 && !importing ? "pointer" : "default",
                  opacity: importing ? 0.6 : 1,
                }}
              >
                {importing ? "Importing..." : `Import ${selectedCount} Slide${selectedCount !== 1 ? "s" : ""}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Phase 1: Upload
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
          width: "100%", maxWidth: 520, background: C.bg, borderRadius: 2,
          border: `1px solid ${C.border}`, overflow: "hidden",
        }}
      >
        {/* Header */}
        <div style={{
          padding: "20px 24px", borderBottom: `1px solid ${C.border}`,
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <h3 style={{ fontSize: 15, fontWeight: 500, color: C.text, margin: 0 }}>Upload Slide Deck</h3>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", cursor: "pointer", color: C.textTertiary, fontSize: 18, lineHeight: 1 }}
          >&times;</button>
        </div>

        {/* Body */}
        <div style={{ padding: "24px" }}>
          {!uploading ? (
            <>
              {/* Drop zone */}
              <div
                onClick={() => inputRef.current?.click()}
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                style={{
                  border: `2px dashed ${dragOver ? C.text : C.border}`,
                  borderRadius: 2, padding: "48px 24px", textAlign: "center",
                  cursor: "pointer", transition: "all 0.15s",
                  background: dragOver ? C.accentSoft : "transparent",
                }}
              >
                <svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke={C.textTertiary} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 12 }}>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                <p style={{ fontSize: 13, color: C.textSecondary, fontWeight: 300, margin: 0 }}>
                  Drop a .pptx file here or click to browse
                </p>
                <input
                  ref={inputRef}
                  type="file"
                  accept=".pptx"
                  onChange={handleFileSelect}
                  style={{ display: "none" }}
                />
              </div>

              {/* File info */}
              {file && (
                <div style={{
                  marginTop: 16, padding: "12px 16px", background: C.accentSoft,
                  borderRadius: 2, display: "flex", justifyContent: "space-between", alignItems: "center",
                }}>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 500, color: C.text, margin: 0 }}>{file.name}</p>
                    <p style={{ fontSize: 11, color: C.textTertiary, margin: 0, marginTop: 2 }}>{formatSize(file.size)}</p>
                  </div>
                  <button
                    onClick={() => setFile(null)}
                    style={{ background: "none", border: "none", cursor: "pointer", color: C.textTertiary, fontSize: 14 }}
                  >&times;</button>
                </div>
              )}

              {/* Error */}
              {errorMsg && (
                <p style={{ fontSize: 12, color: "#e74c3c", marginTop: 12, margin: "12px 0 0" }}>{errorMsg}</p>
              )}

              {/* Upload button */}
              <button
                onClick={handleUpload}
                disabled={!file}
                style={{
                  width: "100%", marginTop: 20, padding: "10px 0",
                  fontSize: 13, fontWeight: 500, fontFamily: "inherit",
                  background: file ? C.text : C.border, color: file ? C.bg : C.textTertiary,
                  border: "none", borderRadius: 2, cursor: file ? "pointer" : "default",
                  transition: "all 0.15s",
                }}
              >
                Upload &amp; Extract Slides
              </button>
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "32px 0" }}>
              {status !== "done" && status !== "error" && (
                <div style={{
                  width: 32, height: 32, border: `2px solid ${C.border}`, borderTopColor: C.text,
                  borderRadius: "50%", margin: "0 auto 16px",
                  animation: "spin 0.8s linear infinite",
                }} />
              )}
              <p style={{ fontSize: 14, color: C.text, fontWeight: 400, margin: 0 }}>
                {statusText[status] || "Processing..."}
              </p>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
