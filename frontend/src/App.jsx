import { useState } from "react";
import { C, setTheme } from "./theme";
import { CiscoLogo } from "./components/icons/CiscoLogo";
import { NavIconMessaging, NavIconBuyers, NavIconStories, NavIconCoAuthor, NavIconDeck, NavIconCompetitive } from "./components/icons/NavIcons";
import { Placeholder } from "./components/shared/Placeholder";
import { MessagingPage } from "./pages/MessagingPage";
import { BuyersPage } from "./pages/BuyersPage";
import { StoriesPage } from "./pages/StoriesPage";
import { DeckBuilderPage } from "./pages/DeckBuilderPage";
import { CoAuthorPage } from "./pages/CoAuthorPage";

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

  const renderPage = () => {
    switch (activePage) {
      case "messaging": return <MessagingPage />;
      case "buyers": return <BuyersPage />;
      case "stories": return <StoriesPage selectedIds={selectedIds} setSelectedIds={setSelectedIds} />;
      case "coauthor": return <CoAuthorPage setActivePage={setActivePage} />;
      case "deck": return <DeckBuilderPage selectedIds={selectedIds} setSelectedIds={setSelectedIds} />;
      case "competitive": return <Placeholder title="Competitive" description="Competitive positioning and battlecards — coming soon." />;
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
        .card { transition: all 0.2s ease; cursor: pointer; }
        .card:hover { background: ${C.accentSoft} !important; }
        .tab { transition: all 0.15s ease; cursor: pointer; border: none; outline: none; background: none; }
        .tab:hover { color: ${C.text} !important; }
        .nav-item { transition: all 0.15s ease; cursor: pointer; border: none; outline: none; background: none; display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 14px 0; width: 100%; }
        .nav-item:hover { background: ${C.accentSoft}; }
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
                <Icon size={18} color={isActive ? C.text : C.textTertiary} />
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

      {/* ── MAIN CONTENT ── */}
      {renderPage()}
    </div>
  );
}
