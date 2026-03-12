import { useState } from "react";

// ─── PALETTE ───────────────────────────────────────────────────────────────────
const light = {
  bg: "#ffffff",
  surface: "#fafafa",
  border: "#e5e5e5",
  borderLight: "#f0f0f0",
  text: "#171717",
  textSecondary: "#737373",
  textTertiary: "#a3a3a3",
  accent: "#171717",
  accentSoft: "#f5f5f5",
  logoInvert: "none",
};
const dark = {
  bg: "#0a0a0a",
  surface: "#141414",
  border: "#262626",
  borderLight: "#1a1a1a",
  text: "#e5e5e5",
  textSecondary: "#a3a3a3",
  textTertiary: "#737373",
  accent: "#e5e5e5",
  accentSoft: "#1a1a1a",
  logoInvert: "invert(1)",
};
let C = light;

// ─── ICONS (thin-line SVGs) ────────────────────────────────────────────────────

function CiscoLogo({ width = 80, style = {} }) {
  return <img src="/cisco-logo.svg" alt="Cisco" style={{ width, height: "auto", ...style }} />;
}

function IconCompany({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={C.textTertiary} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2C6.5 2 2 6.5 2 12" strokeDasharray="2 3" />
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="8" />
      <line x1="12" y1="16" x2="12" y2="22" />
      <line x1="2" y1="12" x2="8" y2="12" />
      <line x1="16" y1="12" x2="22" y2="12" />
    </svg>
  );
}

function IconSolution({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={C.textTertiary} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <line x1="10" y1="6.5" x2="14" y2="6.5" strokeDasharray="1.5 1.5" />
      <line x1="10" y1="17.5" x2="14" y2="17.5" strokeDasharray="1.5 1.5" />
      <line x1="6.5" y1="10" x2="6.5" y2="14" strokeDasharray="1.5 1.5" />
      <line x1="17.5" y1="10" x2="17.5" y2="14" strokeDasharray="1.5 1.5" />
    </svg>
  );
}

function IconNetworking({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={C.text} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="2" />
      <circle cx="5" cy="19" r="2" />
      <circle cx="19" cy="19" r="2" />
      <path d="M12 7v4" />
      <path d="M12 11L5 17" />
      <path d="M12 11l7 6" />
      <path d="M8 12a8 8 0 0 1 8 0" strokeDasharray="2 2" />
    </svg>
  );
}

function IconSecurity({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={C.text} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l8 4v6c0 5.25-3.5 9.74-8 11-4.5-1.26-8-5.75-8-11V6l8-4z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function IconCollaboration({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={C.text} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="7" r="3" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
      <path d="M17 11.5a3 3 0 0 1 3 3V17" />
    </svg>
  );
}

function IconInitiative({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={C.textTertiary} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
  );
}

function IconUseCase({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={C.textTertiary} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 11 12 14 22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  );
}

const productIcons = {
  networking: IconNetworking,
  security: IconSecurity,
  collaboration: IconCollaboration,
};

// ─── FRAMEWORK DATA ────────────────────────────────────────────────────────────
const fw = {
  company: {
    headline: "One Cisco",
    tagline: "One platform for the Agentic AI era.",
    description: "Cisco uniquely combines networking, security, observability, and collaboration with AI embedded throughout — delivering compounding value as one unified platform. Under a single product organization led by the CPO, Cisco's portfolio breadth becomes its greatest differentiator. When customers combine two or three parts of Cisco, the result is unbeatable — no point-solution vendor can replicate it.",
  },
  solutionCategory: {
    headline: "Future-Proofed Workplaces",
    tagline: "Modernize everywhere people work and connect.",
    vision: "Cisco helps organizations create intelligent, secure, AI-ready work environments — with networking, security, observability, and collaboration unified on a single platform. Reduce costs, improve sustainability, attract the best talent, and prepare for a future where human workers and AI agents operate side by side.",
    solution: "The AI-Ready Secure Network Architecture transforms campus, branch, and collaboration infrastructure through three pillars: AgenticOps that automate IT operations, security fused directly into the network fabric, and next-generation devices purpose-built for AI workloads.",
    pillars: [
      { label: "AgenticOps for Operational Simplicity" },
      { label: "Security Fused into the Network" },
      { label: "Devices Ready for AI" },
    ],
  },
  products: [
    {
      id: "networking",
      name: "Cisco Networking",
      subtitle: "Campus & Branch",
      tagline: "The cloud-first foundation for your entire network.",
      description: "Cisco unifies Meraki and Catalyst into a single networking platform — one hardware lineup, one licensing model, your choice of cloud or on-prem management. AI-native assurance from ThousandEyes, agentic operations via AI Canvas, and enterprise-grade Wi-Fi 7 deliver the infrastructure for the AI era.",
      initiatives: [
        {
          id: "n1",
          name: "Meraki + Catalyst Unification",
          tagline: "One network. One interface. Your choice of management.",
          description: "Cisco converges its Meraki and Catalyst platforms — unified hardware (Smart Switches), unified licensing (Cisco Networking Subscription), and unified visibility (Global Overview dashboard). Deploy cloud-managed, on-prem, or hybrid with no compromise.",
          projects: [
            { name: "Smart Switches (C9350/C9610)", detail: "Silicon One-powered switches manageable via Meraki Dashboard or Catalyst Center — same hardware, customer chooses" },
            { name: "Global Overview Dashboard", detail: "Single cloud dashboard with direct visibility into both Meraki and Catalyst Center-managed networks" },
            { name: "Cloud-Managed Fabric", detail: "Scalable, secure campus architecture with adaptive segmentation, simplified provisioning, and centralized management" },
          ],
        },
        {
          id: "n2",
          name: "AI-Powered Network Operations",
          tagline: "From reactive monitoring to autonomous action.",
          description: "AgenticOps transforms IT operations with AI Canvas — the industry's first generative UI for cross-domain troubleshooting. The Cisco AI Assistant automates workflows across Meraki, Catalyst, SD-WAN, ISE, and Nexus — powered by the Deep Network Model trained on 40M+ tokens of CCIE-level expertise.",
          projects: [
            { name: "AI Canvas", detail: "Multiplayer generative workspace unifying NetOps, SecOps, and DevOps with real-time telemetry from Meraki, ThousandEyes, and Splunk" },
            { name: "Cisco AI Assistant", detail: "Natural language automation for switch migration, Wi-Fi setup, device onboarding, and troubleshooting directly in the Meraki Dashboard" },
            { name: "Workflows Engine", detail: "Low/no-code cross-domain automation spanning Meraki, Catalyst Center, SD-WAN Manager, ISE, Nexus, and third-party apps" },
          ],
        },
        {
          id: "n3",
          name: "Wi-Fi 7 & Next-Gen Infrastructure",
          tagline: "Enterprise-grade wireless for the AI era.",
          description: "Cisco's Wi-Fi 7 portfolio delivers the bandwidth, latency, and reliability demanded by AI workloads, IoT devices, and hybrid workers — from flagship campus APs to distributed branch and industrial environments, all with embedded ThousandEyes synthetic testing.",
          projects: [
            { name: "Cisco Wireless 9179F Series", detail: "Flagship Wi-Fi 7 APs for stadiums, large venues, and high-density campus environments" },
            { name: "Cisco Wireless 9172 Series", detail: "Enterprise Wi-Fi 7 for branches, stores, and clinics with built-in ThousandEyes active testing" },
            { name: "Campus Gateway", detail: "Cloud-managed roaming and seamless connectivity across large campus deployments" },
          ],
        },
      ],
    },
    {
      id: "security",
      name: "Cisco Security",
      subtitle: "Secure Connectivity & Zero Trust",
      tagline: "Security fused into the network. Not bolted on.",
      description: "Cisco embeds multilayered security directly into the network fabric — every switch, router, and access point becomes an active enforcement point. Combined with SASE, Zero Trust, AI Defense, and post-quantum cryptography, Cisco delivers continuous, context-aware protection from edge to cloud for people, devices, and AI agents.",
      initiatives: [
        {
          id: "se1",
          name: "Hybrid Mesh Firewall",
          tagline: "Firewall enforcement everywhere — not just at the perimeter.",
          description: "Cisco extends firewall policy to switches, routers, workloads, and dedicated appliances. Security Cloud Control provides unified management with intent-based policy that works across Cisco and multi-vendor environments including Palo Alto, Fortinet, and Juniper.",
          projects: [
            { name: "Secure Firewall 200 Series", detail: "Branch-optimized NGFW with integrated SD-WAN at 3x price-performance in a compact form factor" },
            { name: "Secure Firewall 6100 Series", detail: "Data center firewall delivering 200 Gbps/RU performance for AI workloads" },
            { name: "Intent-Based Policy Management", detail: "Mesh Policy Engine in Security Cloud Control supporting multi-vendor firewall policy from a single console" },
          ],
        },
        {
          id: "se2",
          name: "SASE & Secure Access",
          tagline: "Network and security converged. Cloud-delivered.",
          description: "Cisco's SASE architecture pairs Catalyst or Meraki SD-WAN with Cisco Secure Access (SSE) — delivering ZTNA, SWG, CASB, and FWaaS. Now AI-aware with MCP visibility and intent-aware inspection of agentic workflows, plus post-quantum cryptography across the WAN.",
          projects: [
            { name: "Cisco Secure Access (SSE)", detail: "Cloud-delivered ZTNA, SWG, CASB, and FWaaS mapping to the CISA Zero Trust Maturity Model" },
            { name: "AI-Aware SASE", detail: "Industry-first AI traffic detection, MCP protocol visibility, and intent-aware inspection for agentic workflows" },
            { name: "Cisco 8000 Secure Routers", detail: "Single-box branch WAN with native SD-WAN, L7 NGFW, and post-quantum cryptography at 3x prior throughput" },
          ],
        },
        {
          id: "se3",
          name: "Zero Trust & Identity",
          tagline: "Verify everything. Trust nothing. Protect everyone.",
          description: "Cisco's Zero Trust framework spans user and device security, network and cloud security, and application and data security — with Duo IAM handling identity brokering and passwordless authentication, and ISE providing network access control for people, devices, and AI agents.",
          projects: [
            { name: "Duo IAM", detail: "Full identity and access management with passwordless auth, identity routing engine, and proximity-based phishing resistance" },
            { name: "Cisco ISE 3.5", detail: "Network access control bedrock supporting cloud-hosted deployments and zero trust segmentation across IT/OT" },
            { name: "AI Defense", detail: "AI BOM for supply chain governance, MCP Catalog for agent risk, and runtime guardrails for agentic tool use" },
          ],
        },
      ],
    },
    {
      id: "collaboration",
      name: "Collaboration",
      subtitle: "Webex & Intelligent Workspaces",
      tagline: "Connected Intelligence — where people and AI work better together.",
      description: "Cisco's Collaboration portfolio encompasses Webex Suite, Webex Calling, Webex Contact Center, purpose-built devices on RoomOS, and Cisco Spaces. The Connected Intelligence vision connects people to people, people to AI, and AI to AI — all secured on Cisco infrastructure and managed through Control Hub with full Meraki network correlation.",
      initiatives: [
        {
          id: "c1",
          name: "AI-Powered Meetings & Calling",
          tagline: "Every interaction smarter. Every call more productive.",
          description: "Webex embeds AI across every interaction — summaries, translations, action items, and agentic capabilities including Task Agent, Polling Agent, and Meeting Scheduler. As the only vendor supporting cloud, on-prem, and hybrid calling with full feature parity, Cisco gives organizations a future-proof path at any stage of their cloud journey.",
          projects: [
            { name: "AI Assistant for Webex", detail: "Real-time transcription, meeting summaries, action items, and catch-me-up in 50+ languages across meetings, calling, and messaging" },
            { name: "Webex Calling", detail: "18M+ users across 190+ markets with 99.999% SLA — cloud, on-prem, or the industry-first Hybrid model" },
            { name: "AI Receptionist", detail: "Always-on virtual receptionist powered by Webex AI Agent for automated call handling and scheduling" },
          ],
        },
        {
          id: "c2",
          name: "Intelligent Workspaces & Devices",
          tagline: "Bring people back to the office — on purpose.",
          description: "Cisco collaboration devices run RoomOS 26 with NVIDIA GPUs — transforming rooms into AI-powered environments with Director Agent for cinematic camera views, Audio Zones for precision capture, and Notetaker Agent for in-room transcription. Named market leader in Omdia's 2025 Smart Collaboration Devices universe.",
          projects: [
            { name: "Room Bar Pro & Room Vision PTZ", detail: "Dual 48MP AI cameras with motorized tilt and cinematic multi-camera tracking for immersive meeting experiences" },
            { name: "Ceiling Microphone Pro", detail: "64 mic elements, eight adaptive AI beams, 3.5m pickup radius with Audio Zones for digital sound boundaries" },
            { name: "Cisco Spaces", detail: "Smart workspace platform with occupancy sensing, desk booking, space optimization, and automated sustainability controls" },
          ],
        },
        {
          id: "c3",
          name: "Contact Center & Customer Experience",
          tagline: "Transform every customer interaction with AI.",
          description: "Webex Contact Center infuses AI across the customer journey — from Webex AI Agent for autonomous self-service to real-time agent assist and AI-powered quality management. Multi-agent collaboration via A2A and MCP protocols enables next-generation CX workflows.",
          projects: [
            { name: "Webex AI Agent", detail: "Autonomous and guided self-service with natural language understanding, intent routing, and multi-agent orchestration" },
            { name: "AI Assistant for Contact Center", detail: "Suggested responses, real-time transcription, mid-call summaries, and automated wrap-up for agents" },
            { name: "Webex Contact Center for Salesforce", detail: "Native CRM integration with multi-agent collaboration via A2A and MCP protocols" },
          ],
        },
      ],
    },
  ],
};

// ─── COMPONENTS ────────────────────────────────────────────────────────────────

function Connector() {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "6px 0" }}>
      <div style={{ width: 1, height: 32, background: C.border }} />
    </div>
  );
}

function SplitConnector() {
  return (
    <div style={{ position: "relative", height: 40 }}>
      <svg width="100%" height="40" preserveAspectRatio="none">
        <line x1="50%" y1="0" x2="50%" y2="14" stroke={C.border} strokeWidth="1" />
        <line x1="16.7%" y1="14" x2="83.3%" y2="14" stroke={C.border} strokeWidth="1" />
        {[16.7, 50, 83.3].map((p, i) => (
          <line key={i} x1={`${p}%`} y1="14" x2={`${p}%`} y2="40" stroke={C.border} strokeWidth="1" />
        ))}
      </svg>
    </div>
  );
}

function TierLabel({ icon, children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      {icon}
      <span style={{
        fontSize: 10, letterSpacing: 3, fontWeight: 500,
        color: C.textTertiary, textTransform: "uppercase",
      }}>{children}</span>
    </div>
  );
}

export default function App() {
  const [isDark, setIsDark] = useState(false);
  C = isDark ? dark : light;
  const [expandCompany, setExpandCompany] = useState(false);
  const [expandSolution, setExpandSolution] = useState(false);
  const [activeProduct, setActiveProduct] = useState("networking");
  const [expandedInit, setExpandedInit] = useState({});

  const product = fw.products.find(p => p.id === activeProduct);
  const toggleInit = (id) => setExpandedInit(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <div style={{
      fontFamily: "-apple-system, 'Helvetica Neue', Helvetica, Arial, sans-serif",
      background: C.bg, minHeight: "100vh", color: C.text,
      WebkitFontSmoothing: "antialiased",
    }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .card { transition: all 0.2s ease; cursor: pointer; }
        .card:hover { background: ${C.accentSoft} !important; }
        .tab { transition: all 0.15s ease; cursor: pointer; border: none; outline: none; background: none; }
        .tab:hover { color: ${C.text} !important; }
      `}</style>

      {/* ── HEADER ── */}
      <header style={{
        padding: "52px 64px 44px",
        maxWidth: 1200, margin: "0 auto",
        borderBottom: `1px solid ${C.border}`,
      }}>
        <div style={{ marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <CiscoLogo width={90} style={{ filter: C.logoInvert }} />
          <button
            onClick={() => setIsDark(d => !d)}
            aria-label="Toggle dark mode"
            style={{
              background: "none", border: `1px solid ${C.border}`, borderRadius: 20,
              width: 44, height: 24, position: "relative", cursor: "pointer",
              transition: "border-color 0.3s",
            }}
          >
            <span style={{
              position: "absolute", top: 3, left: isDark ? 22 : 3,
              width: 16, height: 16, borderRadius: "50%",
              background: C.text, transition: "left 0.3s ease",
            }} />
          </button>
        </div>
        <TierLabel>Corporate Messaging Framework</TierLabel>
        <h1 style={{
          fontSize: 48, fontWeight: 300, letterSpacing: "-1.5px",
          color: C.text, margin: "12px 0 0", lineHeight: 1.1,
        }}>
          Futureproof Workplace
        </h1>
      </header>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 64px 96px" }}>

        {/* ── TIER 1: ONE CISCO ── */}
        <div style={{ marginBottom: 6 }}>
          <TierLabel icon={<IconCompany size={16} />}>Company</TierLabel>
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
            <p style={{
              fontSize: 14, color: C.textSecondary, lineHeight: 1.8,
              marginTop: 20, paddingTop: 20,
              borderTop: `1px solid ${C.borderLight}`, fontWeight: 300,
            }}>
              {fw.company.description}
            </p>
          )}
        </div>

        <Connector />

        {/* ── TIER 2: SOLUTION CATEGORY ── */}
        <div style={{ marginBottom: 6 }}>
          <TierLabel icon={<IconSolution size={16} />}>Solution Category</TierLabel>
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
                {fw.solutionCategory.tagline}
              </p>
              <div style={{ display: "flex", gap: 6 }}>
                {fw.solutionCategory.pillars.map((p, i) => (
                  <span key={i} style={{
                    fontSize: 11, fontWeight: 400, color: C.textSecondary,
                    padding: "4px 12px", border: `1px solid ${C.border}`,
                    borderRadius: 100,
                  }}>
                    {p.label}
                  </span>
                ))}
              </div>
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
            </div>
          )}
        </div>

        <SplitConnector />

        {/* ── TIER 3: PRODUCTS ── */}
        <div style={{ marginBottom: 8 }}>
          <TierLabel>Product</TierLabel>
        </div>

        {/* Product tabs */}
        <div style={{
          display: "flex", gap: 0,
          borderBottom: `1px solid ${C.border}`,
          marginBottom: 0,
        }}>
          {fw.products.map(p => {
            const isActive = activeProduct === p.id;
            const Icon = productIcons[p.id];
            return (
              <button
                key={p.id}
                className="tab"
                onClick={() => setActiveProduct(p.id)}
                style={{
                  padding: "14px 28px",
                  fontSize: 14, fontWeight: isActive ? 500 : 300,
                  color: isActive ? C.text : C.textTertiary,
                  borderBottom: isActive ? `2px solid ${C.text}` : "2px solid transparent",
                  marginBottom: -1,
                  fontFamily: "inherit",
                  display: "flex", alignItems: "center", gap: 8,
                }}
              >
                <Icon size={16} />
                {p.name}
              </button>
            );
          })}
        </div>

        {/* ── ACTIVE PRODUCT ── */}
        {product && (
          <div style={{
            border: `1px solid ${C.border}`,
            borderTop: "none",
            borderRadius: "0 0 2px 2px",
            background: C.bg,
          }}>
            {/* Product description */}
            <div style={{ padding: "32px 32px 28px" }}>
              <p style={{ fontSize: 15, color: C.textSecondary, fontStyle: "italic", fontWeight: 300, marginBottom: 12 }}>
                {product.tagline}
              </p>
              <p style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.8, fontWeight: 300 }}>
                {product.description}
              </p>
            </div>

            <div style={{ height: 1, background: C.borderLight, margin: "0 32px" }} />

            {/* Initiatives */}
            <div style={{ padding: "28px 32px 36px" }}>
              <div style={{ marginBottom: 20 }}>
                <TierLabel icon={<IconInitiative size={14} />}>Initiatives</TierLabel>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: C.border, border: `1px solid ${C.border}`, borderRadius: 2, overflow: "hidden" }}>
                {product.initiatives.map(init => {
                  const isOpen = !!expandedInit[init.id];
                  return (
                    <div key={init.id} style={{ background: C.bg, display: "flex", flexDirection: "column" }}>
                      {/* Initiative header */}
                      <div
                        className="card"
                        onClick={() => toggleInit(init.id)}
                        style={{
                          padding: "20px 20px 16px",
                          background: C.bg,
                          borderRadius: 0,
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                          <div style={{ flex: 1 }}>
                            <p style={{ fontSize: 14, fontWeight: 500, color: C.text, marginBottom: 4, lineHeight: 1.35 }}>
                              {init.name}
                            </p>
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
                          <p style={{
                            fontSize: 13, color: C.textSecondary, lineHeight: 1.7, fontWeight: 300,
                            marginTop: 12, paddingTop: 12, borderTop: `1px solid ${C.borderLight}`,
                          }}>
                            {init.description}
                          </p>
                        )}
                      </div>

                      {/* Use cases */}
                      <div style={{ borderTop: `1px solid ${C.borderLight}`, flex: 1 }}>
                        <div style={{ padding: "8px 20px 4px", display: "flex", alignItems: "center", gap: 5 }}>
                          <IconUseCase size={11} />
                          <span style={{ fontSize: 9, letterSpacing: 2, fontWeight: 500, color: C.textTertiary, textTransform: "uppercase" }}>
                            Use Cases
                          </span>
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

        {/* ── FOOTER ── */}
        <div style={{ marginTop: 48, paddingTop: 24, borderTop: `1px solid ${C.borderLight}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontSize: 12, color: C.textTertiary, fontWeight: 300, lineHeight: 1.6 }}>
            Company &rarr; Solution Category &rarr; Product &times;3 &rarr; Initiative &times;3 &rarr; Use Case &times;3
          </p>
          <CiscoLogo width={48} style={{ filter: C.logoInvert }} />
        </div>
      </div>
    </div>
  );
}
