import { useState, useEffect } from "react";
import { C, setTheme } from "./theme";
import { CiscoLogo } from "./components/icons/CiscoLogo";
import { NavIconMessaging, NavIconBuyers, NavIconStories, NavIconCoAuthor, NavIconDeck, NavIconCompetitive } from "./components/icons/NavIcons";
import { Placeholder } from "./components/shared/Placeholder";
import { MessagingPage } from "./pages/MessagingPage";
import { BuyersPage } from "./pages/BuyersPage";
import { StoriesPage } from "./pages/StoriesPage";
import { DeckBuilderPage } from "./pages/DeckBuilderPage";
import { CoAuthorPage } from "./pages/CoAuthorPage";
import { CompetitivePage } from "./pages/CompetitivePage";

// ─── NAV CONFIG ────────────────────────────────────────────────────────────────

const navItems = [
  { id: "messaging", label: "Messaging", icon: NavIconMessaging },
  { id: "buyers", label: "Buyers", icon: NavIconBuyers },
  { id: "deck", label: "Deck Builder", icon: NavIconDeck },
  { id: "coauthor", label: "Co-Author", icon: NavIconCoAuthor },
  { id: "stories", label: "Stories", icon: NavIconStories },
  { id: "competitive", label: "Competitive", icon: NavIconCompetitive },
];

// ─── APP ───────────────────────────────────────────────────────────────────────

export default function App({ embedded = false }) {
  const [isDark, setIsDark] = useState(embedded);
  setTheme(isDark);
  const [activePage, setActivePage] = useState("messaging");
  const [selectedIds, setSelectedIds] = useState([]);
  const [userDecks, setUserDecks] = useState([]);

  // ── 3D tilt tracking for .card elements ──
  useEffect(() => {
    const onMove = (e) => {
      const card = e.target.closest(".card");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      card.style.setProperty("--rx", `${(y - 0.5) * -4}deg`);
      card.style.setProperty("--ry", `${(x - 0.5) * 4}deg`);
      card.style.setProperty("--mx", `${x * 100}%`);
      card.style.setProperty("--my", `${y * 100}%`);
    };
    const onLeave = (e) => {
      if (e.target.classList?.contains("card")) {
        e.target.style.setProperty("--rx", "0deg");
        e.target.style.setProperty("--ry", "0deg");
      }
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave, true);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave, true);
    };
  }, []);

  const renderPage = () => {
    switch (activePage) {
      case "messaging": return <MessagingPage />;
      case "buyers": return <BuyersPage />;
      case "stories": return <StoriesPage selectedIds={selectedIds} setSelectedIds={setSelectedIds} />;
      case "coauthor": return <CoAuthorPage setActivePage={setActivePage} userDecks={userDecks} setUserDecks={setUserDecks} />;
      case "deck": return <DeckBuilderPage selectedIds={selectedIds} setSelectedIds={setSelectedIds} />;
      case "competitive": return <CompetitivePage />;
      default: return <MessagingPage />;
    }
  };

  return (
    <div style={{
      fontFamily: "'Inter', -apple-system, 'Helvetica Neue', Helvetica, Arial, sans-serif",
      background: C.bg, minHeight: "100vh", color: C.text,
      WebkitFontSmoothing: "antialiased",
      display: "flex",
    }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .card {
          cursor: pointer;
          position: relative;
          transform-style: preserve-3d;
          transform: perspective(800px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
          transition: transform 0.2s ease, background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .card:hover { background: ${C.accentSoft} !important; }
        .card::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: radial-gradient(
            ellipse at var(--mx, 50%) var(--my, 50%),
            rgba(255,255,255,0.07) 0%,
            transparent 65%
          );
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.25s ease;
          z-index: 1;
        }
        .card:hover::after { opacity: 1; }
        .tab { transition: all 0.15s ease; cursor: pointer; border: none; outline: none; background: none; }
        .tab:hover { color: ${C.text} !important; }
        .nav-item { transition: all 0.15s ease; cursor: pointer; border: none; outline: none; background: none; display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 14px 0; width: 100%; }
        .nav-item:hover { background: ${C.accentSoft}; }
        .faded-tile { transition: opacity 0.3s ease; }
        .faded-tile:hover { opacity: 0.6 !important; }
      `}</style>

      {/* ── SIDEBAR ── */}
      <nav style={{
        width: 72, minHeight: "100vh",
        background: C.sidebarBg,
        borderRight: `1px solid ${C.border}`,
        display: "flex", flexDirection: "column",
        alignItems: "center",
        paddingTop: 20,
        flexShrink: 0,
        position: "sticky", top: 0, height: "100vh",
        overflow: "auto",
      }}>
        <div style={{ marginBottom: 24 }}>
          <CiscoLogo width={56} style={{ filter: C.logoFilter }} />
        </div>

        <div style={{ flex: 1, width: "100%" }}>
          {navItems.map(item => {
            const isActive = activePage === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className="nav-item"
                onClick={() => setActivePage(item.id)}
                style={{
                  color: isActive ? C.text : C.textTertiary,
                  background: isActive ? C.accentSoft : "none",
                  borderLeft: isActive ? `2px solid ${C.text}` : "2px solid transparent",
                }}
              >
                <span style={{ position: "relative", display: "inline-flex" }}>
                  <Icon size={18} color={isActive ? C.text : C.textTertiary} />
                  {item.id === "competitive" && (
                    <span style={{
                      position: "absolute", top: -2, right: -4,
                      width: 7, height: 7, borderRadius: "50%",
                      background: "#e74c3c", border: `1.5px solid ${C.sidebarBg}`,
                    }} />
                  )}
                </span>
                <span style={{ fontSize: 9, fontWeight: isActive ? 500 : 400, letterSpacing: 0.5 }}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dark mode toggle at bottom */}
        <div style={{ paddingBottom: 20 }}>
          <button
            onClick={() => setIsDark(d => !d)}
            aria-label="Toggle dark mode"
            style={{
              background: "none", border: `1px solid ${C.border}`, borderRadius: 20,
              width: 36, height: 20, position: "relative", cursor: "pointer",
              transition: "border-color 0.3s",
            }}
          >
            <span style={{
              position: "absolute", top: 3, left: isDark ? 18 : 3,
              width: 12, height: 12, borderRadius: "50%",
              background: C.text, transition: "left 0.3s ease",
            }} />
          </button>
        </div>
      </nav>

      {/* ── MAIN CONTENT ── key on isDark forces full re-render on theme toggle */}
      <div key={String(isDark)} style={{ display: "contents" }}>{renderPage()}</div>
    </div>
  );
}
