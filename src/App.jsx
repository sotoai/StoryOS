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
  return <img src={`${import.meta.env.BASE_URL}cisco-logo.svg`} alt="Cisco" style={{ width, height: "auto", ...style }} />;
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

// ─── VERTICAL OVERLAYS ────────────────────────────────────────────────────────
const verticals = {
  general: { label: "General", solutionTagline: null, products: null },
  healthcare: {
    label: "Healthcare",
    solutionTagline: "Modernize clinical environments and connect care everywhere.",
    products: [
      {
        id: "networking",
        tagline: "Clinical-grade networks that protect patients and power AI diagnostics.",
        description: "Cisco delivers HIPAA-ready campus and clinical networks — clinical-grade Wi-Fi 7 for real-time telemetry, IoMT device segmentation via Cisco Cyber Vision, and AI-native assurance across hospitals, clinics, and ambulatory sites. Recognized in the KLAS Research Best in KLAS for Networking and Gartner as a Leader for Healthcare Networking Infrastructure.",
        initiatives: [
          { id: "hn1", name: "Clinical Network Modernization", tagline: "One resilient network from OR to outpatient.", projects: [
            { name: "Clinical-Grade Wi-Fi 7", detail: "CW9172I APs with dedicated IoMT SSID, low-latency roaming for mobile nurses, and real-time location services for asset tracking" },
            { name: "IoMT Device Segmentation", detail: "Cisco Cyber Vision + ISE auto-classify and micro-segment infusion pumps, monitors, and imaging systems — zero trust for medical devices" },
            { name: "Meraki Health Cloud", detail: "Cloud-managed networking purpose-built for multi-site health systems — unified dashboard across hospitals, clinics, and telehealth hubs" },
          ]},
          { id: "hn2", name: "AI-Powered Clinical Operations", tagline: "From alarm fatigue to autonomous triage.", projects: [
            { name: "AI Canvas for Health IT", detail: "Cross-domain troubleshooting correlating network, security, and clinical application telemetry — MTTR reduction for EHR connectivity issues" },
            { name: "ThousandEyes for Epic/Cerner", detail: "Synthetic monitoring of EHR application paths from nurse station to data center — proactive alerting before clinicians notice degradation" },
            { name: "Automated Compliance Reporting", detail: "Catalyst Center compliance audit for HIPAA, HITECH, and Joint Commission requirements — continuous posture validation" },
          ]},
          { id: "hn3", name: "Secure Healthcare Infrastructure", tagline: "Embedded security for connected care.", projects: [
            { name: "Medical Device Visibility", detail: "Full inventory and risk scoring of 10,000+ IoMT device types — integrates with Medigate, Claroty, and Cisco Vulnerability Management" },
            { name: "Ransomware Defense for Hospitals", detail: "Hybrid Mesh Firewall with network segmentation isolating clinical, guest, and IoMT zones — microsegmentation at the switch port level" },
            { name: "Post-Quantum Secure Telehealth", detail: "Cisco 8000 Secure Routers with post-quantum cryptography protecting PHI across site-to-site and remote care connections" },
          ]},
        ],
      },
      {
        id: "collaboration",
        tagline: "Connected care — from virtual visits to clinical team coordination.",
        description: "Webex powers telehealth, clinical collaboration, and patient engagement across the care continuum. Epic-integrated contact center workflows, HIPAA-compliant video visits, and AI-powered clinical communication reduce clinician burnout and improve patient outcomes. Frost & Sullivan recognized Webex as a Leader in Telehealth Platforms.",
        initiatives: [
          { id: "hc1", name: "Virtual Care & Telehealth", tagline: "Extend the exam room to any screen.", projects: [
            { name: "Webex for Telehealth", detail: "HIPAA-compliant virtual visits with AI noise removal, real-time translation for 50+ languages, and Epic MyChart integration for patient scheduling" },
            { name: "AI Clinical Summaries", detail: "Automatic visit documentation and structured SOAP notes from Webex AI Assistant — reducing after-hours charting burden for physicians" },
            { name: "Remote Patient Monitoring Hub", detail: "Webex Desk devices as bedside communication hubs — nurse call, entertainment, care team rounding, and patient education in one endpoint" },
          ]},
          { id: "hc2", name: "Clinical Team Collaboration", tagline: "Break down silos between care teams.", projects: [
            { name: "Webex Messaging for Care Teams", detail: "HIPAA-compliant messaging with role-based channels — instant consult requests, lab result notifications, and shift handoff summaries" },
            { name: "Expert on Demand (XoD)", detail: "AR-assisted remote expert guidance for surgical teams, radiology consults, and medical device technicians using RealWear smart glasses" },
            { name: "Cisco Spaces for Hospitals", detail: "Real-time wayfinding for patients, asset tracking for wheelchairs and equipment, and occupancy analytics for waiting rooms and common areas" },
          ]},
          { id: "hc3", name: "Patient Experience & Contact Center", tagline: "AI-powered patient access and engagement.", projects: [
            { name: "Webex AI Agent for Patient Access", detail: "Autonomous appointment scheduling, prescription refill requests, and insurance verification — 24/7 self-service in 50+ languages" },
            { name: "Epic-Integrated Contact Center", detail: "Native Epic integration surfaces patient context, visit history, and care gaps directly in the agent workspace — reducing handle time by 30%" },
            { name: "AI Quality Management for Healthcare", detail: "Automated compliance monitoring for patient interactions — HCAHPS-aligned scoring and coaching recommendations for access center staff" },
          ]},
        ],
      },
    ],
  },
  education: {
    label: "Education",
    solutionTagline: "Modernize campuses and classrooms for the AI-powered learning era.",
    products: [
      {
        id: "networking",
        tagline: "Secure, high-performance campus networks built for digital learning.",
        description: "Cisco provides E-Rate eligible, CIPA-compliant campus networks powering hybrid learning, campus safety, and student success. Meraki cloud management simplifies operations across distributed K-12 districts, while Catalyst supports research-grade connectivity for higher education. Named a Leader in the IDC MarketScape for Education Networking.",
        initiatives: [
          { id: "en1", name: "Connected Campus & Hybrid Learning", tagline: "Seamless connectivity from lecture hall to dorm.", projects: [
            { name: "Wi-Fi 7 for High-Density Campuses", detail: "CW9179F APs supporting 1,000+ concurrent students in lecture halls, stadiums, and student unions with seamless roaming" },
            { name: "Meraki for K-12 Districts", detail: "Cloud-managed networking across hundreds of sites — centralized content filtering (CIPA), E-Rate eligible, with zero-touch deployment" },
            { name: "SD-WAN for Multi-Campus Districts", detail: "Secure, resilient WAN connecting campuses to cloud-hosted SIS, LMS, and assessment platforms with application-aware routing" },
          ]},
          { id: "en2", name: "Campus Safety & Security", tagline: "Protect students, staff, and visitors.", projects: [
            { name: "Meraki Smart Cameras", detail: "AI-powered video analytics for campus perimeter monitoring, vaping detection, and occupancy alerts — no NVR required" },
            { name: "Emergency Notification Integration", detail: "Network-triggered lockdown protocols with IoT sensor integration — automated door locks, PA announcements, and first responder alerts" },
            { name: "Zero Trust for Student Data", detail: "ISE-based identity services protecting FERPA-regulated student data — role-based access for faculty, students, guests, and IoT devices" },
          ]},
          { id: "en3", name: "AI-Powered IT Operations for Education", tagline: "Do more with smaller IT teams.", projects: [
            { name: "AI Assistant for Education IT", detail: "Natural language troubleshooting for campus Wi-Fi issues — 'Why can't students connect in Building 4?' resolved in seconds" },
            { name: "ThousandEyes for SaaS Learning Platforms", detail: "End-to-end visibility into Canvas, Google Workspace, and Zoom performance — isolate ISP vs. campus network vs. cloud provider issues" },
            { name: "Automated Device Onboarding", detail: "Zero-touch enrollment for Chromebooks, iPads, and BYOD — 10,000+ devices provisioned per district in hours, not weeks" },
          ]},
        ],
      },
      {
        id: "collaboration",
        tagline: "Engage every learner — in the classroom, at home, or on campus.",
        description: "Webex powers hybrid classrooms, virtual office hours, and student services across K-12 and higher education. AI-powered transcription and translation support diverse learners, while Webex Contact Center transforms enrollment and student support. Cisco is a founding partner of the Digital Equity Initiative reaching 500M+ learners.",
        initiatives: [
          { id: "ec1", name: "Hybrid & Flexible Learning", tagline: "Every seat in every classroom is a front row seat.", projects: [
            { name: "Webex Classroom", detail: "AI-powered hybrid teaching with automatic camera framing, whiteboard capture, and real-time transcription for in-person and remote students" },
            { name: "Lecture Capture & AI Notes", detail: "Automatic recording with AI-generated summaries, chapter markers, and searchable transcripts — integrated with LMS platforms" },
            { name: "Real-Time Translation for ESL Students", detail: "Live translation in 50+ languages supporting multilingual classrooms — closing the comprehension gap for English language learners" },
          ]},
          { id: "ec2", name: "Smart Campus Spaces", tagline: "Data-driven campus experiences.", projects: [
            { name: "Cisco Spaces for Campus", detail: "Occupancy analytics for libraries, labs, and study spaces — students find available rooms via mobile app, facilities optimize HVAC" },
            { name: "Digital Signage & Wayfinding", detail: "Webex-powered digital signage for campus announcements, event schedules, and interactive wayfinding for visitors and new students" },
            { name: "Room Devices for Faculty Offices", detail: "Desk Pro for virtual office hours and advising sessions — AI noise removal ensures clear audio even in open-plan faculty areas" },
          ]},
          { id: "ec3", name: "Student Services & Enrollment", tagline: "AI-powered student support at scale.", projects: [
            { name: "Webex AI Agent for Admissions", detail: "24/7 autonomous enrollment support — application status, financial aid guidance, and campus tour scheduling in 50+ languages" },
            { name: "Student Help Desk Contact Center", detail: "Webex Contact Center for IT support, housing, and financial services — AI routing based on student profile and issue complexity" },
            { name: "Alumni Engagement Platform", detail: "Webex Events for virtual commencement, alumni reunions, and donor cultivation — scalable to 100,000+ concurrent attendees" },
          ]},
        ],
      },
    ],
  },
  government: {
    label: "Government",
    solutionTagline: "Modernize mission-critical infrastructure for secure, citizen-centric services.",
    products: [
      {
        id: "networking",
        tagline: "FedRAMP-authorized networks securing the mission from campus to edge.",
        description: "Cisco Meraki for Government achieved FedRAMP Moderate authorization in 2025, bringing cloud-managed simplicity to federal, state, and local agencies. Combined with Catalyst's IL5-capable infrastructure and Security Cloud Control's FedRAMP-authorized firewall management, Cisco provides the compliance-first networking stack government demands.",
        initiatives: [
          { id: "gn1", name: "Compliant Cloud-Managed Networking", tagline: "FedRAMP simplicity for government IT.", projects: [
            { name: "Meraki for Government (FedRAMP)", detail: "FedRAMP Moderate + StateRAMP Moderate authorized — cloud-managed wireless, switching, SD-WAN, and security for federal, state, and local agencies" },
            { name: "Catalyst for Classified Networks", detail: "On-prem management via Catalyst Center for IL4/IL5 environments — air-gapped deployments with full automation capability" },
            { name: "Security Cloud Control (FedRAMP)", detail: "Centralized firewall management achieving FedRAMP authorization — Hybrid Mesh Firewall with zero-touch provisioning for branch offices" },
          ]},
          { id: "gn2", name: "Zero Trust & Cybersecurity Mandates", tagline: "Meeting EO 14028 and CISA directives.", projects: [
            { name: "Universal ZTNA for Government", detail: "Identity-driven access for users, devices, and AI agents — aligning to CISA Zero Trust Maturity Model and OMB M-22-09" },
            { name: "FIPS 140-2/3 Validated Encryption", detail: "End-to-end encryption across all Cisco networking platforms — validated for CJIS, IRS 1075, and FISMA compliance" },
            { name: "Post-Quantum Cryptography", detail: "Cisco 8000 Secure Routers with CNSA 2.0 algorithms protecting classified and sensitive traffic against future quantum threats" },
          ]},
          { id: "gn3", name: "Smart Cities & IoT Infrastructure", tagline: "Connected communities from public safety to transit.", projects: [
            { name: "City-Wide Wi-Fi & Wireless Backhaul", detail: "Cisco Ultra-Reliable Wireless Backhaul for public safety cameras, traffic signals, and digital equity initiatives" },
            { name: "IoT for Public Safety", detail: "Meraki Smart Cameras with AI analytics for gunshot detection, license plate recognition, and crowd monitoring — no NVR required" },
            { name: "Emergency Vehicle Preemption (EVP)", detail: "C-V2X connected vehicle infrastructure enabling emergency vehicle priority at intersections — reducing response times" },
          ]},
        ],
      },
      {
        id: "collaboration",
        tagline: "Secure collaboration for government workforce and citizen services.",
        description: "Webex for Government delivers FedRAMP High authorized collaboration across meetings, messaging, calling, and contact center. IL5-capable deployments serve DoD and intelligence community requirements. Webex powers secure hybrid work for 2M+ government users while transforming citizen engagement through AI-powered contact centers.",
        initiatives: [
          { id: "gc1", name: "Secure Government Collaboration", tagline: "FedRAMP High. IL5 capable. Zero compromise.", projects: [
            { name: "Webex for Government (FedRAMP High)", detail: "End-to-end encrypted meetings, messaging, and calling authorized at FedRAMP High — serving civilian and defense agencies" },
            { name: "Secure Hybrid Work for Government", detail: "Webex Calling with E911 for teleworking federal employees — maintaining continuity of operations (COOP) in any scenario" },
            { name: "Cross-Agency Collaboration", detail: "Federated messaging and meetings across agency boundaries — interoperable with Microsoft Teams GCC and Zoom for Government" },
          ]},
          { id: "gc2", name: "Mission-Ready Workspaces", tagline: "Classified to unclassified — devices for every clearance level.", projects: [
            { name: "Room Devices for SCIFs", detail: "Cisco Room Kit with air-gapped deployment options — camera privacy shutters, hardware mute, and TEMPEST-aligned configurations" },
            { name: "Desk Pro for Federal Offices", detail: "Hot desking for federal hybrid workers — CAC/PIV card authentication integration, persistent personal settings across locations" },
            { name: "Cisco Spaces for Government Buildings", detail: "Occupancy analytics and space optimization for GSA-managed buildings — energy efficiency reporting aligned to sustainability mandates" },
          ]},
          { id: "gc3", name: "Citizen Services & Contact Center", tagline: "AI-powered citizen engagement at government scale.", projects: [
            { name: "Webex AI Agent for Citizen Services", detail: "24/7 autonomous support for benefits inquiries, permit applications, and appointment scheduling — multilingual support for diverse populations" },
            { name: "311/211 Contact Center Modernization", detail: "Webex Contact Center replacing legacy ACD with AI routing, real-time transcription, and automated case creation in CRM" },
            { name: "Accessible Communications (Section 508)", detail: "Real-time captioning, screen reader compatibility, and TTY/RTT support meeting Section 508 and ADA requirements" },
          ]},
        ],
      },
    ],
  },
  manufacturing: {
    label: "Manufacturing",
    solutionTagline: "Connect and protect the smart factory — from shop floor to top floor.",
    products: [
      {
        id: "networking",
        tagline: "Industrial networking that converges IT and OT for Industry 4.0.",
        description: "Cisco's industrial networking portfolio connects 52,000+ manufacturing customers across 139 countries. Purpose-built ruggedized switches, Ultra-Reliable Wireless Backhaul (URWB) for AGVs and robotics, and Cyber Vision for OT security deliver the converged IT/OT infrastructure that smart manufacturing demands. Winner of IoT Breakthrough Awards for Industrial Wireless and OT Security.",
        initiatives: [
          { id: "mn1", name: "IT/OT Network Convergence", tagline: "One network from ERP to PLC.", projects: [
            { name: "Industrial Ethernet Switches (IE3500/IE9300)", detail: "Ruggedized switches for factory floors — operating in -40°C to 75°C, DIN-rail mount, with Catalyst Center or Meraki management" },
            { name: "URWB for AGVs & Robotics", detail: "Ultra-Reliable Wireless Backhaul with <10ms latency and zero-packet-loss handoffs — 50% fewer APs than standard Wi-Fi for mobile automation" },
            { name: "Unified IT/OT Dashboard", detail: "Single management plane spanning enterprise campus and factory floor networks — correlated views across Catalyst Center and Cyber Vision" },
          ]},
          { id: "mn2", name: "OT Security & Cyber Vision", tagline: "See every asset. Protect every process.", projects: [
            { name: "Cisco Cyber Vision", detail: "Passive OT asset discovery and vulnerability assessment — identifies PLCs, HMIs, and SCADA systems without disrupting production" },
            { name: "Industrial Microsegmentation", detail: "Hybrid Mesh Firewall extending zero-trust segmentation to OT zones — isolating production cells without recabling" },
            { name: "Secure Remote Access for OT", detail: "Cisco Secure Equipment Access for third-party vendor maintenance — audited, time-limited access to specific industrial assets" },
          ]},
          { id: "mn3", name: "AI-Powered Industrial Operations", tagline: "Predictive, autonomous, and always-on.", projects: [
            { name: "ThousandEyes for Industrial Networks", detail: "Enterprise Agents on IE switches and IR routers — end-to-end visibility from MES to cloud across the industrial DMZ" },
            { name: "Edge AI with Cisco + NVIDIA", detail: "AI inference at the factory edge for quality inspection, predictive maintenance, and safety zone enforcement" },
            { name: "Industrial Wireless Design Validated", detail: "Cisco Validated Designs for automotive, pharma, and food/beverage manufacturing — pre-tested architectures reducing deployment risk" },
          ]},
        ],
      },
      {
        id: "collaboration",
        tagline: "Connect frontline workers and bridge the shop floor to the boardroom.",
        description: "Webex enables manufacturing collaboration from the executive suite to the factory floor. Expert on Demand with AR-assisted guidance reduces equipment downtime, while Webex Contact Center powers customer service and dealer support. Digital signage and kiosk solutions deliver real-time production dashboards and safety messaging to every worker.",
        initiatives: [
          { id: "mc1", name: "Frontline Worker Communication", tagline: "Every worker connected. Every shift informed.", projects: [
            { name: "Expert on Demand (XoD)", detail: "AR-assisted remote guidance for equipment repair and quality checks — technicians see expert annotations overlaid on live camera via RealWear" },
            { name: "Webex for Frontline Workers", detail: "Push-to-talk, shift handoff messaging, and safety alerts on ruggedized devices — no email or desk required" },
            { name: "Digital Signage for Production Floors", detail: "Real-time OEE dashboards, safety metrics, and shift schedules displayed on Cisco Board devices across factory zones" },
          ]},
          { id: "mc2", name: "Smart Factory Collaboration Spaces", tagline: "Hybrid meetings that include the factory.", projects: [
            { name: "Room Kit for Control Rooms", detail: "Noise-canceling room systems for factory control rooms and war rooms — industrial-grade audio in high-ambient-noise environments" },
            { name: "Cisco Spaces for Facilities", detail: "Occupancy and environmental monitoring across manufacturing facilities — temperature, humidity, and air quality dashboards" },
            { name: "Cross-Site Engineering Collaboration", detail: "Webex Meetings with AI translation enabling global R&D teams to co-design across time zones and languages" },
          ]},
          { id: "mc3", name: "Customer & Dealer Support", tagline: "AI-powered service from order to aftermarket.", projects: [
            { name: "Webex AI Agent for Dealer Support", detail: "Autonomous order status, parts availability, and warranty claim processing for dealer networks — 24/7 self-service" },
            { name: "Contact Center for Field Service", detail: "AI-routed dispatch for field service technicians — skill-based routing with real-time parts inventory integration" },
            { name: "Remote Commissioning & Training", detail: "Webex Events for virtual product launches, dealer training, and customer commissioning sessions at global scale" },
          ]},
        ],
      },
    ],
  },
  retail: {
    label: "Retail",
    solutionTagline: "Connect and protect retail in the AI era — digital resilience at the core.",
    products: [
      {
        id: "networking",
        tagline: "Cloud-managed store networks with built-in intelligence and security.",
        description: "Cisco Meraki powers tens of thousands of retail locations worldwide with cloud-managed networking that combines Wi-Fi, security, smart cameras, and IoT sensors in a single dashboard. Cisco Spaces transforms the network into a customer analytics platform — delivering online-level insights to physical stores. Cisco's retail positioning for 2025 centers on Digital Resilience.",
        initiatives: [
          { id: "rn1", name: "Connected Store Infrastructure", tagline: "One dashboard from flagship to pop-up.", projects: [
            { name: "Meraki for Retail Stores", detail: "Cloud-managed Wi-Fi, switching, security, and cameras across thousands of locations — zero-touch deployment for new store openings" },
            { name: "Guest Wi-Fi & Customer Analytics", detail: "Branded captive portal with Cisco Spaces analytics — dwell time, visit frequency, and customer journey mapping across the sales floor" },
            { name: "SD-WAN for Distributed Retail", detail: "Application-aware routing prioritizing POS, inventory, and surveillance traffic — cellular failover ensuring every transaction completes" },
          ]},
          { id: "rn2", name: "Store Intelligence & Analytics", tagline: "Online-level insights for physical stores.", projects: [
            { name: "Cisco Spaces Location Analytics", detail: "Foot traffic heatmaps, conversion funnels, and A/B testing for store layouts — leveraging existing Meraki APs as sensors" },
            { name: "Meraki Smart Cameras for Loss Prevention", detail: "AI-powered video analytics for shrinkage detection, people counting, and queue management — cloud-stored with no NVR" },
            { name: "ThousandEyes for E-Commerce", detail: "End-to-end monitoring of online storefront performance — detect CDN, payment gateway, and third-party API degradation before customers notice" },
          ]},
          { id: "rn3", name: "Secure Retail & PCI Compliance", tagline: "Protect every transaction. Every endpoint.", projects: [
            { name: "PCI DSS Network Segmentation", detail: "Meraki auto-segments POS, back-office, guest, and IoT networks — simplified PCI scope reduction with centralized policy management" },
            { name: "Ransomware Protection for Retail", detail: "Hybrid Mesh Firewall protecting distributed store networks — automated threat containment preventing lateral movement across locations" },
            { name: "IoT Security for Smart Stores", detail: "Automated profiling and policy enforcement for digital price tags, smart shelves, self-checkout kiosks, and environmental sensors" },
          ]},
        ],
      },
      {
        id: "collaboration",
        tagline: "Empower associates, engage customers, and transform the shopping experience.",
        description: "Webex powers retail from corporate collaboration to store-level customer engagement. AI-powered contact center transforms omnichannel customer service, while digital signage and Webex devices enable immersive in-store experiences. Cisco showcased the future of retail at NRF 2025 with the Cisco Store concept demonstrating digital-first, scalable solutions.",
        initiatives: [
          { id: "rc1", name: "Omnichannel Customer Engagement", tagline: "Every channel. One seamless experience.", projects: [
            { name: "Webex AI Agent for Retail", detail: "Autonomous order tracking, returns processing, and product recommendations — conversational AI across voice, chat, and social channels" },
            { name: "Contact Center for Retail", detail: "AI-routed customer service with real-time sentiment analysis — escalation to store associates for high-value interactions" },
            { name: "Proactive Customer Outreach", detail: "AI-triggered notifications for delivery updates, loyalty rewards, and personalized promotions via Webex Connect CPaaS" },
          ]},
          { id: "rc2", name: "Store Associate Enablement", tagline: "Informed associates. Better experiences.", projects: [
            { name: "Webex for Frontline Retail", detail: "Task management, shift scheduling, and instant communication for store teams — accessible on personal or shared devices" },
            { name: "Expert on Demand for Retail", detail: "AR-guided remote support for visual merchandising, equipment maintenance, and new store setup — corporate experts assist any location" },
            { name: "Digital Signage & Kiosks", detail: "Webex-powered interactive displays for product information, wayfinding, and self-service checkout — dynamic content from corporate HQ" },
          ]},
          { id: "rc3", name: "Corporate Retail Collaboration", tagline: "Connect HQ to every store, every market.", projects: [
            { name: "Webex Suite for Retail HQ", detail: "Unified meetings, messaging, and calling for merchandising, marketing, and supply chain teams — AI summaries for every meeting" },
            { name: "Town Halls & Training at Scale", detail: "Webex Events for seasonal training, product launches, and all-hands — reaching 100,000+ associates simultaneously" },
            { name: "Cisco Spaces for Retail HQ", detail: "Hot desking and space optimization for corporate offices — sustainability reporting aligned to ESG commitments" },
          ]},
        ],
      },
    ],
  },
  financial: {
    label: "Financial Services",
    solutionTagline: "Modernize branches, secure transactions, and transform financial experiences.",
    products: [
      {
        id: "networking",
        tagline: "Compliant, resilient branch networks built for financial-grade security.",
        description: "Cisco delivers PCI DSS, SOX, and FINRA-compliant networking for banks, insurers, and capital markets firms. Meraki SD-WAN has driven 40% cost savings across financial services branch networks while delivering 20x more bandwidth. Zero-trust segmentation, post-quantum cryptography, and AI-powered operations meet the stringent demands of financial regulators.",
        initiatives: [
          { id: "fn1", name: "Branch Network Transformation", tagline: "From costly MPLS to intelligent SD-WAN.", projects: [
            { name: "Meraki SD-WAN for Branches", detail: "Replace MPLS with broadband + cellular — 40% cost savings across branch networks with 4G/5G failover ensuring every transaction completes" },
            { name: "Wi-Fi 7 for Modern Branches", detail: "High-density, low-latency wireless for advisor workstations, customer Wi-Fi, and IoT devices — dual-band supporting legacy ATM/kiosk connectivity" },
            { name: "Zero-Touch Branch Deployment", detail: "Cloud-managed provisioning for new branch openings — router, switch, AP, and firewall configured remotely in minutes, not weeks" },
          ]},
          { id: "fn2", name: "Financial-Grade Security & Compliance", tagline: "Meet every regulation. Reduce every risk.", projects: [
            { name: "PCI DSS Network Segmentation", detail: "Automated cardholder data environment isolation — Meraki auto-segments POS, ATM, and teller networks from general corporate traffic" },
            { name: "Zero Trust for Financial Data", detail: "Universal ZTNA with ISE identity services — role-based access for tellers, advisors, auditors, and third-party vendors" },
            { name: "Catalyst Center Compliance Audit", detail: "Continuous compliance posture validation across SOX, PCI, and FINRA requirements — automated remediation for configuration drift" },
          ]},
          { id: "fn3", name: "Resilient Trading & Operations", tagline: "Zero downtime for markets that never sleep.", projects: [
            { name: "Low-Latency Campus Networks", detail: "Catalyst 9000 fabric with <1ms switching for trading floors — deterministic performance for algorithmic and high-frequency trading" },
            { name: "ThousandEyes for SaaS Banking", detail: "End-to-end monitoring of core banking SaaS, payment gateways, and market data feeds — proactive detection of third-party degradation" },
            { name: "Post-Quantum Cryptography", detail: "Cisco 8000 Secure Routers protecting inter-branch and data center traffic with CNSA 2.0 algorithms — future-proofing against quantum threats" },
          ]},
        ],
      },
      {
        id: "collaboration",
        tagline: "Compliant collaboration that transforms client engagement and employee productivity.",
        description: "Webex powers secure financial services collaboration with end-to-end encryption, archiving compliance, and AI-powered client engagement. Umpqua Bank migrated to Webex Contact Center in five months, achieving significant improvements in client satisfaction. NatWest, Royal Bank of Canada, and First Horizon Bank are recognized Webex CX award winners.",
        initiatives: [
          { id: "fc1", name: "Compliant Communications", tagline: "Every conversation captured. Every regulation met.", projects: [
            { name: "Webex with Archiving Compliance", detail: "Integration with Smarsh, Global Relay, and Veritas for FINRA, MiFID II, and Dodd-Frank communication archiving requirements" },
            { name: "Webex Calling for Financial Advisors", detail: "99.999% SLA with E911 for remote advisors — call recording, transcription, and AI summaries for compliance and coaching" },
            { name: "End-to-End Encryption", detail: "Zero-trust security model with customer-managed encryption keys — ensuring financial data never transits unencrypted channels" },
          ]},
          { id: "fc2", name: "Client Engagement & Virtual Banking", tagline: "Premium experiences for every client interaction.", projects: [
            { name: "Virtual Financial Advisor", detail: "Webex video meetings for wealth management consultations — screen sharing for portfolio reviews, document co-browsing for applications" },
            { name: "Desk Pro for Branch Modernization", detail: "Video banking kiosks connecting branch visitors with remote specialists — extending expert availability to every location" },
            { name: "Webex Events for Investor Relations", detail: "Secure, compliant webcasting for earnings calls, shareholder meetings, and client seminars — scalable to 100,000+ attendees" },
          ]},
          { id: "fc3", name: "AI-Powered Financial CX", tagline: "Intelligent service from self-service to advisor.", projects: [
            { name: "Webex AI Agent for Banking", detail: "Autonomous balance inquiries, transaction disputes, and card activation — 8% reduction in call abandonment, 22% reduction in handle time" },
            { name: "AI Agent for Fraud Detection", detail: "Real-time fraud pattern recognition with guided agent workflows — automated card blocking and customer notification" },
            { name: "Webex Contact Center for Insurance", detail: "AI-routed claims processing with real-time transcription — automated FNOL capture and adjuster assignment based on claim complexity" },
          ]},
        ],
      },
    ],
  },
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
  const [vertical, setVertical] = useState("general");

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
              {vertical !== "general" && v.solutionTagline ? v.solutionTagline : fw.solutionCategory.tagline}
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
        <CiscoLogo width={72} style={{ filter: C.logoFilter }} />
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
        <CiscoLogo width={72} style={{ filter: C.logoFilter }} />
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
