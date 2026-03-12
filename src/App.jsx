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
  sidebarBg: "#fafafa",
  logoFilter: "none",
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
  sidebarBg: "#0f0f0f",
  logoFilter: "none",
};
let C = light;

// ─── ICONS ─────────────────────────────────────────────────────────────────────

function CiscoLogo({ width = 80, style = {} }) {
  return <img src="/cisco-logo.svg" alt="Cisco" style={{ width, height: "auto", ...style }} />;
}

// Sidebar nav icons
function NavIconMessaging({ size = 20, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <line x1="8" y1="8" x2="16" y2="8" />
      <line x1="8" y1="12" x2="13" y2="12" />
    </svg>
  );
}

function NavIconBuyers({ size = 20, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function NavIconPitch({ size = 20, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function NavIconStories({ size = 20, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <line x1="8" y1="7" x2="16" y2="7" />
      <line x1="8" y1="11" x2="13" y2="11" />
    </svg>
  );
}

function NavIconDeck({ size = 20, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

function NavIconExec({ size = 20, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function NavIconCompetitive({ size = 20, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

// Messaging page icons
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
    <svg width={size} height={size} viewBox="0 0 24 24" fill={C.text} xmlns="http://www.w3.org/2000/svg">
      <path d="M21.78 7.376c0.512 1.181 0.032 2.644 -1.11 3.106 -2.157 0.888 -3 -1.295 -3 -1.295 -0.236 -0.55 -0.727 -1.496 -1.335 -1.496 -0.204 0 -0.503 0 -0.94 0.844 -0.229 0.443 -0.434 1.185 -0.616 1.84l-0.09 0.32c-0.373 -1.587 -0.821 -3.454 -1.536 -4.816 -0.195 -0.38 -0.42 -0.74 -0.673 -1.08a5.135 5.135 0 0 1 1.743 -1.337 4.891 4.891 0 0 1 2.112 -0.463c1.045 0 2.765 0.338 4.227 2.227 0.167 0.206 0.317 0.424 0.448 0.654 0.278 0.441 0.52 0.904 0.726 1.383l0.043 0.113zM0.02 8.4C-0.15 7.105 0.8 5.845 1.953 5.755c1.794 -0.157 2.36 1.385 2.455 1.89l0.022 0.137c0.07 0.44 0.29 1.838 0.48 2.744 0.078 0.4 0.244 1.013 0.353 1.416l0.006 0.022 0.026 0.092c0.11 0.4 0.232 0.799 0.362 1.193 0.185 0.548 0.399 1.085 0.641 1.61 0.47 0.955 0.93 1.45 1.367 1.45 0.203 0 0.512 0 0.96 -0.878 0.283 -0.59 0.512 -1.208 0.684 -1.845 0.373 1.598 0.811 3.128 1.495 4.456 0.205 0.406 0.444 0.794 0.715 1.16a5.124 5.124 0 0 1 -1.742 1.338 4.88 4.88 0 0 1 -2.112 0.461c-1.548 0 -3.727 -0.698 -5.339 -4.005a22.407 22.407 0 0 1 -1.078 -2.824 26.848 26.848 0 0 1 -0.693 -2.656 48.56 48.56 0 0 1 -0.215 -1.114C0.191 9.603 0.074 8.872 0.02 8.4zm22.047 -2.645 -0.202 -0.022h-0.052c0.222 0.392 0.421 0.797 0.597 1.215l0.053 0.113c0.322 0.76 0.346 1.614 0.068 2.391a3.079 3.079 0 0 1 -1.552 1.749 2.93 2.93 0 0 1 -1.228 0.28 3.115 3.115 0 0 1 -0.854 -0.135c-0.299 1.182 -0.768 2.634 -1.195 3.511 -0.427 0.877 -0.93 1.451 -1.378 1.451 -0.192 0 -0.501 0 -0.95 -0.877a10.746 10.746 0 0 1 -0.683 -1.845 38.722 38.722 0 0 1 -0.396 -1.575 12.67 12.67 0 0 1 -0.136 -0.598l-0.002 -0.01c-0.406 -1.778 -0.865 -3.645 -1.655 -5.142A8.263 8.263 0 0 0 11.52 4.8a5.136 5.136 0 0 0 -1.748 -1.34A4.892 4.892 0 0 0 7.654 3C6.618 3 4.9 3.338 3.437 5.228c0.466 0.223 0.867 0.562 1.164 0.984 0.305 0.433 0.499 0.933 0.565 1.458 0.076 0.563 0.256 1.654 0.47 2.688l0.001 0.007c0.021 0.11 0.042 0.221 0.073 0.342 0.126 -0.34 0.25 -0.642 0.38 -0.955l0.112 -0.271 0.128 -0.293c0.235 -0.55 0.726 -1.496 1.324 -1.496 0.213 0 0.513 0 0.95 0.844 0.296 0.606 0.532 1.239 0.706 1.89 0.138 0.507 0.276 1.047 0.394 1.587 0.04 0.148 0.07 0.296 0.101 0.444l0.006 0.028c0.427 1.879 0.875 3.69 1.644 5.187 0.159 0.317 0.34 0.622 0.545 0.911 0.15 0.215 0.31 0.422 0.48 0.62 1.27 1.45 2.733 1.8 3.843 1.8 1.548 0 3.738 -0.698 5.35 -4.006 0.822 -1.7 1.515 -4.208 1.772 -5.48 0.256 -1.27 0.449 -2.419 0.534 -3.115 0.04 -0.307 0.023 -0.618 -0.051 -0.918 -0.075 -0.299 -0.205 -0.579 -0.382 -0.825a2.247 2.247 0 0 0 -0.653 -0.607 2.143 2.143 0 0 0 -0.826 -0.296z" />
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
  collaboration: IconCollaboration,
};

// ─── FRAMEWORK DATA ────────────────────────────────────────────────────────────
const fw = {
  company: {
    headline: "One Cisco",
    tagline: "One platform for the Agentic AI era.",
    description: "Cisco uniquely combines networking, security, observability, and collaboration into a single platform where each capability compounds the value of every other. Under one product organization, Cisco's breadth becomes its greatest differentiator — when customers combine networking and collaboration on Cisco, the integrated experience is unmatched by any point-solution vendor. Platforms, not products, deliver at the pace the AI era demands.",
  },
  solutionCategory: {
    headline: "Futureproof Workplace",
    tagline: "Modernize everywhere people work and connect.",
    vision: "Cisco helps organizations build intelligent, secure, AI-ready work environments — reducing costs, improving sustainability, attracting the best talent, and preparing for a future where human workers and AI agents operate side by side. Analyst frameworks from Gartner, Forrester, and IDC all converge on the same insight: workplace modernization is no longer optional.",
    solution: "The Secure Network Architecture transforms campus, branch, and collaboration infrastructure through three pillars: AgenticOps that automate IT operations, security fused directly into the network fabric, and next-generation devices purpose-built for AI workloads.",
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
      tagline: "One network. Your choice of management. Built for AI.",
      description: "Cisco unifies Meraki and Catalyst into a single networking platform — one hardware lineup, one licensing model, your choice of cloud or on-prem management. AI-native assurance from ThousandEyes, agentic operations via AI Canvas, enterprise-grade Wi-Fi 7, and zero-trust security embedded at every layer deliver the infrastructure for the AI era. Recognized as a Leader in the IDC MarketScape for Enterprise WLAN and a five-time Gartner Magic Quadrant Leader for SD-WAN.",
      initiatives: [
        {
          id: "n1",
          name: "Meraki + Catalyst Unification",
          tagline: "One platform. Pick how you deploy.",
          description: "Cisco converges Meraki and Catalyst into a single architecture — unified hardware on Silicon One ASICs, unified licensing via Cisco Networking Subscription, and a single Global Overview dashboard. New Wi-Fi 7 APs ship as one SKU that boots into Meraki cloud or Catalyst controller mode. No more either/or — deploy cloud-managed, on-prem, or hybrid, and switch at any time.",
          projects: [
            { name: "Smart Switches (C9350/C9610)", detail: "Silicon One-powered switches manageable via Meraki Dashboard or Catalyst Center — same hardware, customer chooses management mode" },
            { name: "Global Overview Dashboard", detail: "Single cloud dashboard providing unified visibility into both Meraki and Catalyst Center-managed networks — beta November 2025" },
            { name: "Cisco Networking Subscription", detail: "One license covering Wireless, Switching, and WAN across Essentials and Advantage tiers — portable across management modes, 36-84 month terms" },
          ],
        },
        {
          id: "n2",
          name: "AgenticOps & AI-Powered Network Operations",
          tagline: "From reactive alerts to autonomous action.",
          description: "AgenticOps transforms IT with AI Canvas — the industry's first generative UI for cross-domain troubleshooting, powered by the Deep Network Model trained on 40M+ tokens of CCIE-level expertise. AI agents continuously monitor telemetry, correlate anomalies, test fixes against digital twins, and only escalate to humans when necessary. Gartner's 2025 Hype Cycle calls Agent-Native I&O the biggest disruption since cloud.",
          projects: [
            { name: "AI Canvas", detail: "Multiplayer generative workspace unifying NetOps, SecOps, and DevOps with real-time telemetry from Meraki, ThousandEyes, and Splunk — GA October 2025" },
            { name: "Cisco AI Assistant", detail: "Natural language automation for switch migration, Wi-Fi setup, device onboarding, and root-cause analysis directly in the Meraki Dashboard" },
            { name: "Workflows Engine", detail: "Low/no-code cross-domain automation spanning Meraki, Catalyst Center, SD-WAN Manager, ISE, Nexus, and third-party apps" },
          ],
        },
        {
          id: "n3",
          name: "Wi-Fi 7 & Secure Infrastructure",
          tagline: "Enterprise-grade wireless with security built in.",
          description: "Cisco's Wi-Fi 7 portfolio delivers the bandwidth, latency, and reliability demanded by AI workloads and hybrid workers. Single-SKU, dual-mode APs eliminate region-specific ordering. Every device embeds ThousandEyes synthetic testing and zero-trust security — from post-quantum cryptography on Secure Routers to LiveProtect on switches. Dell'Oro forecasts Wi-Fi 7 will drive double-digit WLAN growth through 2026.",
          projects: [
            { name: "CW9172I Series", detail: "Industry's first Wi-Fi 7 certified high-density AP for branches, stores, and clinics — with built-in ThousandEyes active testing" },
            { name: "CW9179F Series", detail: "Flagship Wi-Fi 7 APs for stadiums, large venues, and high-density campus environments" },
            { name: "Cisco 8000 Secure Routers", detail: "Single-box branch WAN with native SD-WAN, L7 NGFW, and post-quantum cryptography at 3x prior throughput" },
          ],
        },
      ],
    },
    {
      id: "collaboration",
      name: "Collaboration",
      subtitle: "Webex & Intelligent Workspaces",
      tagline: "Connected Intelligence — where people and AI work better together.",
      description: "Cisco's Collaboration portfolio encompasses Webex Suite, Webex Calling, Webex Contact Center, AI-powered devices on RoomOS, and Cisco Spaces. The Connected Intelligence vision connects people to people, people to AI, and AI to AI — all secured on Cisco infrastructure. Gartner Magic Quadrant Leader for UCaaS (7 consecutive years) and Meeting Solutions (12 consecutive years). Omdia named Cisco best-in-class for Smart Collaboration Devices 2025.",
      initiatives: [
        {
          id: "c1",
          name: "AI-Powered Meetings & Calling",
          tagline: "Every interaction smarter. Migrate at your own pace.",
          description: "Webex embeds AI across every interaction — summaries, real-time translation in 50+ languages, action items, and agentic capabilities including Task Agent, Polling Agent, Meeting Scheduler, and Translator Agent. As the only vendor supporting cloud, on-prem, and hybrid calling with full feature parity, Cisco gives organizations a path forward at any stage of their cloud journey. 18M+ Webex Calling users across 190+ markets.",
          projects: [
            { name: "AI Assistant for Webex", detail: "Real-time transcription, meeting summaries, action items, and catch-me-up in 50+ languages — plus Ask AI Assistant to search across all prior calls, meetings, and messages" },
            { name: "Webex Calling (Cloud / Hybrid / On-Prem)", detail: "99.999% SLA — industry-first Hybrid model lets UCM customers keep on-prem infrastructure while gaining cloud AI features incrementally" },
            { name: "AI Receptionist", detail: "Always-on virtual receptionist for Webex Calling — automates routine queries, transfers calls, and schedules appointments" },
          ],
        },
        {
          id: "c2",
          name: "Intelligent Workspaces & Devices",
          tagline: "Bring people back to the office — on purpose.",
          description: "Cisco collaboration devices run RoomOS 26 powered by NVIDIA — transforming rooms into AI-powered environments with Notetaker Agent for in-room transcription, Director Agent for cinematic camera views, and Audio Zones for precision capture. Devices run Webex, Microsoft Teams, Zoom, and Google Meet natively — an open-ecosystem approach analysts are actively tracking as a strategic differentiator.",
          projects: [
            { name: "Room Bar Pro & Board Pro G2", detail: "Dual 48MP AI cameras, multi-platform support (Cisco Rooms + MTR/Zoom/Google Meet), edge-based AI processing" },
            { name: "Ceiling Microphone Pro", detail: "64 mic elements, eight adaptive AI beams, directional voice detection with Audio Zones for digital sound boundaries" },
            { name: "Cisco Spaces", detail: "Smart workspace platform leveraging the Meraki network as a sensor — occupancy, desk booking, sustainability controls, UWB asset tracking, and AI-powered indoor navigation" },
          ],
        },
        {
          id: "c3",
          name: "Contact Center & Customer Experience",
          tagline: "AI-powered CX from self-service to agent assist.",
          description: "Webex Contact Center infuses AI across the customer journey — from autonomous self-service to real-time agent assist and AI-powered quality management. Multi-agent collaboration via industry-standard A2A and MCP protocols enables interoperability with third-party AI agents. IDC MarketScape Leader for CCaaS. Native integrations with Salesforce, ServiceNow, and Epic.",
          projects: [
            { name: "Webex AI Agent", detail: "Autonomous and guided self-service with natural language understanding across 50+ languages, intent routing, and multi-agent orchestration" },
            { name: "AI Assistant for Contact Center", detail: "Suggested responses, real-time transcription, mid-call summaries, automated wrap-up, and AI quality management for agent coaching" },
            { name: "Salesforce & Epic Integrations", detail: "Bring Your Own Contact Center for Salesforce (GA Q1 2026) and Epic healthcare integration for vertical-specific CX workflows" },
          ],
        },
      ],
    },
  ],
};

// ─── BUYERS DATA ───────────────────────────────────────────────────────────────
const buyers = {
  company: {
    headline: "Enterprise Leadership",
    tagline: "C-suite stakeholders who approve budget and set vendor strategy.",
    roles: [
      { title: "CIO / CTO", focus: "Digital transformation, AI strategy, platform consolidation", priority: "Future-proof investment, reduce vendor sprawl, accelerate AI readiness — safety of decision matters as much as value" },
      { title: "CISO", focus: "Security posture, zero trust, compliance (PCI, HIPAA, SOX)", priority: "Embedded security over bolt-on, reduced attack surface, post-quantum readiness — increasingly influential in networking decisions" },
      { title: "CFO / Procurement", focus: "TCO, ROI, subscription economics, capital allocation", priority: "CapEx-to-OpEx shift, consolidated vendor spend, measurable outcomes — use Forrester TEI studies at the validation stage" },
    ],
  },
  solutionCategory: {
    headline: "Workplace Decision Makers",
    tagline: "Directors and VPs who own the evaluation and shortlist.",
    roles: [
      { title: "VP of IT / Infrastructure", focus: "Network and UC modernization, cloud strategy, operational simplicity", priority: "Unified management, AI-driven operations, reduced MTTR — builds the business case for the CIO" },
      { title: "VP of Security", focus: "Zero trust architecture, SASE, compliance", priority: "Security fused into the fabric, not layered on top — veto power on networking and collaboration purchases" },
      { title: "VP of Workplace / Facilities", focus: "Employee experience, hybrid enablement, sustainability", priority: "Smart spaces, occupancy analytics, energy efficiency — emerging influencer in both networking and collaboration decisions" },
    ],
  },
  products: [
    {
      id: "networking",
      name: "Network Buyers",
      tagline: "Teams evaluating campus refresh, branch modernization, and Wi-Fi upgrades.",
      roles: [
        {
          id: "nb1",
          title: "Network Architect",
          focus: "Network design, capacity planning, technology selection — builds the shortlist and runs PoC",
          priorities: ["Meraki + Catalyst unification path and management flexibility", "Wi-Fi 7 readiness and single-SKU dual-mode APs", "Integration with existing security and observability stack"],
          engagementTips: ["Lead with architecture simplification — one platform, pick your management", "Show Global Overview dashboard and Smart Switch flexibility", "Address the Gartner MQ — IDC MarketScape named Cisco Leader for WLAN"],
        },
        {
          id: "nb2",
          title: "Network Operations Manager",
          focus: "Day-to-day management, troubleshooting, uptime — cares about reducing alert fatigue",
          priorities: ["AI Canvas for cross-domain troubleshooting", "Workflows Engine for automation", "ThousandEyes integration for end-to-end visibility"],
          engagementTips: ["Demo AI Canvas with real telemetry — show autonomous root-cause analysis", "Highlight AgenticOps: AI agents that fix before humans escalate", "Show cross-domain correlation: network + security + observability in one view"],
        },
        {
          id: "nb3",
          title: "IT Director (Branch/Campus)",
          focus: "Site deployments, user experience, budget — owns the refresh cycle (5-7 year cadence)",
          priorities: ["Simplified branch deployments with Cisco Unified Branch", "Single licensing model portable across management modes", "Cost-effective Wi-Fi 7 migration path"],
          engagementTips: ["Emphasize Cisco Networking Subscription — one license, 36-84 month terms", "Show zero-touch provisioning and cloud-managed fabric", "Present embedded security: post-quantum crypto and LiveProtect built in"],
        },
      ],
    },
    {
      id: "collaboration",
      name: "Collaboration Buyers",
      tagline: "Teams evaluating UCaaS migration, room modernization, and contact center transformation.",
      roles: [
        {
          id: "cb1",
          title: "UC / Collaboration Director",
          focus: "Unified communications strategy, vendor consolidation, PBX-to-cloud migration",
          priorities: ["Cloud/hybrid/on-prem calling flexibility — migrate at your own pace", "AI-powered meeting experiences and agentic capabilities", "Platform consolidation ROI across meetings, calling, and messaging"],
          engagementTips: ["Lead with hybrid calling — only vendor with cloud, on-prem, and hybrid with full parity", "Show AI Assistant: transcription, summaries, Task Agent, Translator Agent", "Reference Gartner UCaaS Leader (7 years) and 99.999% SLA across 190+ markets"],
        },
        {
          id: "cb2",
          title: "Workplace Experience Manager",
          focus: "Employee experience, space utilization, hybrid work enablement, sustainability",
          priorities: ["Smart room technology with RoomOS 26 and NVIDIA AI", "Space optimization data from Cisco Spaces", "Multi-platform device support — Webex, Teams, Zoom, Google Meet"],
          engagementTips: ["Demo Cisco Spaces: occupancy, desk booking, sustainability controls", "Show Room Bar Pro running Teams and Webex natively — open ecosystem", "Reference Omdia Leader for Smart Collaboration Devices 2025"],
        },
        {
          id: "cb3",
          title: "Contact Center / CX Director",
          focus: "Customer experience, agent productivity, self-service, CRM integration",
          priorities: ["AI-powered self-service with Webex AI Agent", "Agent assist, quality management, and automated wrap-up", "Native Salesforce, ServiceNow, and Epic integrations"],
          engagementTips: ["Demo Webex AI Agent for autonomous self-service in 50+ languages", "Show multi-agent collaboration via A2A and MCP protocols", "Reference IDC MarketScape Leader for CCaaS and 75%+ YoY agent license growth"],
        },
      ],
    },
  ],
};

// ─── SHARED COMPONENTS ─────────────────────────────────────────────────────────

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
        <line x1="25%" y1="14" x2="75%" y2="14" stroke={C.border} strokeWidth="1" />
        {[25, 75].map((p, i) => (
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

function PageShell({ title, subtitle, children }) {
  return (
    <div style={{ flex: 1, minHeight: "100vh", overflow: "auto" }}>
      <header style={{
        padding: "52px 64px 44px",
        maxWidth: 1200, margin: "0 auto",
        borderBottom: `1px solid ${C.border}`,
      }}>
        <TierLabel>{subtitle}</TierLabel>
        <h1 style={{
          fontSize: 48, fontWeight: 300, letterSpacing: "-1.5px",
          color: C.text, margin: "12px 0 0", lineHeight: 1.1,
        }}>
          {title}
        </h1>
      </header>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 64px 96px" }}>
        {children}
      </div>
    </div>
  );
}

function Placeholder({ title, description }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      minHeight: "60vh", flexDirection: "column", gap: 12,
    }}>
      <p style={{ fontSize: 20, fontWeight: 300, color: C.text }}>{title}</p>
      <p style={{ fontSize: 14, fontWeight: 300, color: C.textTertiary }}>{description}</p>
    </div>
  );
}

// ─── MESSAGING PAGE ────────────────────────────────────────────────────────────

function MessagingPage() {
  const [expandCompany, setExpandCompany] = useState(false);
  const [expandSolution, setExpandSolution] = useState(false);
  const [activeProduct, setActiveProduct] = useState("networking");
  const [expandedInit, setExpandedInit] = useState({});

  const product = fw.products.find(p => p.id === activeProduct);
  const toggleInit = (id) => setExpandedInit(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <PageShell title="Futureproof Workplace" subtitle="Corporate Messaging Framework">
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
          </div>

          <div style={{ height: 1, background: C.borderLight, margin: "0 32px" }} />

          <div style={{ padding: "28px 32px 36px" }}>
            <div style={{ marginBottom: 20 }}>
              <TierLabel icon={<IconInitiative size={14} />}>Initiatives</TierLabel>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: C.border, border: `1px solid ${C.border}`, borderRadius: 2, overflow: "hidden" }}>
              {product.initiatives.map(init => {
                const isOpen = !!expandedInit[init.id];
                return (
                  <div key={init.id} style={{ background: C.bg, display: "flex", flexDirection: "column" }}>
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

      <div style={{ marginTop: 48, paddingTop: 24, borderTop: `1px solid ${C.borderLight}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{ fontSize: 12, color: C.textTertiary, fontWeight: 300, lineHeight: 1.6 }}>
          Company &rarr; Solution Category &rarr; Product &times;2 &rarr; Initiative &times;3 &rarr; Use Case &times;3
        </p>
        <CiscoLogo width={48} style={{ filter: C.logoFilter }} />
      </div>
    </PageShell>
  );
}

// ─── BUYERS PAGE ───────────────────────────────────────────────────────────────

function BuyersPage() {
  const [activeProduct, setActiveProduct] = useState("networking");
  const [expandCompany, setExpandCompany] = useState(false);
  const [expandSolution, setExpandSolution] = useState(false);
  const [expandedRole, setExpandedRole] = useState({});

  const product = buyers.products.find(p => p.id === activeProduct);
  const toggleRole = (id) => setExpandedRole(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <PageShell title="Buyer Personas" subtitle="Audience & Stakeholder Map">
      {/* ── TIER 1: ENTERPRISE LEADERSHIP ── */}
      <div style={{ marginBottom: 6 }}>
        <TierLabel icon={<IconCompany size={16} />}>Company-Level Stakeholders</TierLabel>
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
              {buyers.company.headline}
            </h2>
            <p style={{ fontSize: 14, color: C.textSecondary, fontWeight: 300 }}>
              {buyers.company.tagline}
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
            {buyers.company.roles.map((r, i) => (
              <div key={i} style={{ marginBottom: i < buyers.company.roles.length - 1 ? 16 : 0 }}>
                <p style={{ fontSize: 14, fontWeight: 500, color: C.text, marginBottom: 4 }}>{r.title}</p>
                <p style={{ fontSize: 13, color: C.textSecondary, fontWeight: 300, lineHeight: 1.6 }}>
                  <span style={{ color: C.textTertiary }}>Focus:</span> {r.focus}
                </p>
                <p style={{ fontSize: 13, color: C.textSecondary, fontWeight: 300, lineHeight: 1.6 }}>
                  <span style={{ color: C.textTertiary }}>Priority:</span> {r.priority}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <Connector />

      {/* ── TIER 2: WORKPLACE DECISION MAKERS ── */}
      <div style={{ marginBottom: 6 }}>
        <TierLabel icon={<IconSolution size={16} />}>Solution-Level Stakeholders</TierLabel>
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
              {buyers.solutionCategory.headline}
            </h2>
            <p style={{ fontSize: 14, color: C.textSecondary, fontWeight: 300 }}>
              {buyers.solutionCategory.tagline}
            </p>
          </div>
          <span style={{
            fontSize: 20, color: C.textTertiary, fontWeight: 200,
            transform: expandSolution ? "rotate(180deg)" : "none",
            transition: "transform 0.3s", display: "inline-block", flexShrink: 0,
          }}>&#8964;</span>
        </div>
        {expandSolution && (
          <div style={{ marginTop: 20, paddingTop: 20, borderTop: `1px solid ${C.borderLight}` }}>
            {buyers.solutionCategory.roles.map((r, i) => (
              <div key={i} style={{ marginBottom: i < buyers.solutionCategory.roles.length - 1 ? 16 : 0 }}>
                <p style={{ fontSize: 14, fontWeight: 500, color: C.text, marginBottom: 4 }}>{r.title}</p>
                <p style={{ fontSize: 13, color: C.textSecondary, fontWeight: 300, lineHeight: 1.6 }}>
                  <span style={{ color: C.textTertiary }}>Focus:</span> {r.focus}
                </p>
                <p style={{ fontSize: 13, color: C.textSecondary, fontWeight: 300, lineHeight: 1.6 }}>
                  <span style={{ color: C.textTertiary }}>Priority:</span> {r.priority}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <SplitConnector />

      {/* ── TIER 3: PRODUCT-LEVEL BUYERS ── */}
      <div style={{ marginBottom: 8 }}>
        <TierLabel>Product-Level Buyers</TierLabel>
      </div>

      <div style={{
        display: "flex", gap: 0,
        borderBottom: `1px solid ${C.border}`,
        marginBottom: 0,
      }}>
        {buyers.products.map(p => {
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
            <p style={{ fontSize: 15, color: C.textSecondary, fontStyle: "italic", fontWeight: 300 }}>
              {product.tagline}
            </p>
          </div>

          <div style={{ height: 1, background: C.borderLight, margin: "0 32px" }} />

          <div style={{ padding: "28px 32px 36px" }}>
            <div style={{ marginBottom: 20 }}>
              <TierLabel icon={<IconInitiative size={14} />}>Key Personas</TierLabel>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: C.border, border: `1px solid ${C.border}`, borderRadius: 2, overflow: "hidden" }}>
              {product.roles.map(role => {
                const isOpen = !!expandedRole[role.id];
                return (
                  <div key={role.id} style={{ background: C.bg, display: "flex", flexDirection: "column" }}>
                    <div
                      className="card"
                      onClick={() => toggleRole(role.id)}
                      style={{
                        padding: "20px 20px 16px",
                        background: C.bg,
                        borderRadius: 0,
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontSize: 14, fontWeight: 500, color: C.text, marginBottom: 4, lineHeight: 1.35 }}>
                            {role.title}
                          </p>
                          <p style={{ fontSize: 12, color: C.textTertiary, fontWeight: 300 }}>
                            {role.focus}
                          </p>
                        </div>
                        <span style={{
                          fontSize: 16, color: C.textTertiary, fontWeight: 200, marginLeft: 8,
                          transform: isOpen ? "rotate(180deg)" : "none",
                          transition: "transform 0.2s", display: "inline-block", flexShrink: 0,
                        }}>&#8964;</span>
                      </div>
                      {isOpen && (
                        <div style={{
                          marginTop: 12, paddingTop: 12, borderTop: `1px solid ${C.borderLight}`,
                        }}>
                          <p style={{ fontSize: 10, letterSpacing: 2, fontWeight: 500, color: C.textTertiary, textTransform: "uppercase", marginBottom: 6 }}>Priorities</p>
                          {role.priorities.map((p, i) => (
                            <p key={i} style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.7, fontWeight: 300, paddingLeft: 12, position: "relative" }}>
                              <span style={{ position: "absolute", left: 0, color: C.textTertiary }}>·</span>
                              {p}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>

                    <div style={{ borderTop: `1px solid ${C.borderLight}`, flex: 1 }}>
                      <div style={{ padding: "8px 20px 4px", display: "flex", alignItems: "center", gap: 5 }}>
                        <IconUseCase size={11} />
                        <span style={{ fontSize: 9, letterSpacing: 2, fontWeight: 500, color: C.textTertiary, textTransform: "uppercase" }}>
                          Engagement Tips
                        </span>
                      </div>
                      {role.engagementTips.map((tip, i) => (
                        <div key={i} style={{
                          padding: "10px 20px",
                          borderTop: i > 0 ? `1px solid ${C.borderLight}` : "none",
                        }}>
                          <p style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.5, fontWeight: 300 }}>{tip}</p>
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
          Enterprise Leadership &rarr; Workplace Decision Makers &rarr; Product Buyers &times;2 &rarr; Persona &times;3
        </p>
        <CiscoLogo width={48} style={{ filter: C.logoFilter }} />
      </div>
    </PageShell>
  );
}

// ─── NAV CONFIG ────────────────────────────────────────────────────────────────

const navItems = [
  { id: "messaging", label: "Messaging", icon: NavIconMessaging },
  { id: "buyers", label: "Buyers", icon: NavIconBuyers },
  { id: "pitch", label: "Pitch", icon: NavIconPitch },
  { id: "stories", label: "Stories", icon: NavIconStories },
  { id: "deck", label: "Deck Builder", icon: NavIconDeck },
  { id: "exec", label: "Exec", icon: NavIconExec },
  { id: "competitive", label: "Competitive", icon: NavIconCompetitive },
];

// ─── APP ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [isDark, setIsDark] = useState(false);
  C = isDark ? dark : light;
  const [activePage, setActivePage] = useState("messaging");

  const renderPage = () => {
    switch (activePage) {
      case "messaging": return <MessagingPage />;
      case "buyers": return <BuyersPage />;
      case "pitch": return <Placeholder title="Pitch" description="Pitch frameworks and talk tracks — coming soon." />;
      case "stories": return <Placeholder title="Customer Stories" description="Reference accounts and success narratives — coming soon." />;
      case "deck": return <Placeholder title="Deck Builder" description="Assemble slide decks from modular content — coming soon." />;
      case "exec": return <Placeholder title="Exec Thought Leadership" description="Executive positioning and keynote themes — coming soon." />;
      case "competitive": return <Placeholder title="Competitive" description="Competitive positioning and battlecards — coming soon." />;
      default: return <MessagingPage />;
    }
  };

  return (
    <div style={{
      fontFamily: "-apple-system, 'Helvetica Neue', Helvetica, Arial, sans-serif",
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
          <CiscoLogo width={36} style={{ filter: C.logoFilter }} />
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
