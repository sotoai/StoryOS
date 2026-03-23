// ─── CANONICAL MOMENTS ───────────────────────────────────────────────────────
// Living record of how the Futureproof Workplace narrative has evolved.
// Each moment captures: what happened, who was there, what was said authoritatively,
// and the associated artifacts (decks, transcripts, Webex Spaces).

export const EVENT_TYPES = {
  ANALYST_INQUIRY: { label: "Analyst Inquiry", color: "#6C5CE7", abbrev: "AI" },
  GCAB: { label: "GCAB", color: "#00B894", abbrev: "GCAB" },
  CISCO_LIVE: { label: "Cisco Live", color: "#049FD9", abbrev: "CL" },
  PARTNER_SUMMIT: { label: "Partner Summit", color: "#E17055", abbrev: "PS" },
  WEBEX_ONE: { label: "Webex One", color: "#FDCB6E", abbrev: "WX1" },
  INTERNAL_QBR: { label: "Internal QBR", color: "#636E72", abbrev: "QBR" },
  PRODUCT_LAUNCH: { label: "Product Launch", color: "#E84393", abbrev: "PL" },
  EXECUTIVE_BRIEF: { label: "Executive Briefing", color: "#0984E3", abbrev: "EB" },
};

export const moments = [
  {
    id: "cl-us-2025",
    type: "CISCO_LIVE",
    title: "Cisco Live US 2025",
    subtitle: "Las Vegas — Futureproof Workplace Keynote",
    date: "2025-06-10",
    dateEnd: "2025-06-12",
    speakers: ["Anurag Dhingra", "Jeetu Patel"],
    products: ["networking", "collaboration"],
    initiatives: ["agenticops", "ai-ready-devices"],
    narrative: "Introduced the Futureproof Workplace vision publicly for the first time. Positioned Cisco as the only vendor unifying networking and collaboration under a single AI-native management plane. Keynote centered on three pillars: AgenticOps for autonomous network operations, Security-First Architecture as a differentiator against Arista/Juniper, and AI-Ready Infrastructure as the physical foundation.",
    decks: [
      { id: "deck-cl-us-keynote", title: "FPW Keynote — Cisco Live US", type: "keynote", pages: 42 },
      { id: "deck-cl-us-breakout", title: "Campus Networking Deep Dive — Breakout", type: "breakout", pages: 28 },
      { id: "deck-cl-us-demo", title: "Meraki + Catalyst Unified Demo Deck", type: "demo", pages: 16 },
    ],
    transcripts: [
      { id: "tx-cl-us-keynote", title: "Keynote Recording Transcript", duration: "48 min", speaker: "Anurag Dhingra" },
      { id: "tx-cl-us-breakout", title: "Breakout Session Q&A Transcript", duration: "32 min", speaker: "Multiple" },
    ],
    spaces: [
      { id: "space-cl-us-prep", title: "CL US 2025 — FPW Prep", members: 14 },
      { id: "space-cl-us-followup", title: "CL US 2025 — Post-Event Actions", members: 8 },
    ],
    tags: ["public", "keynote", "first-reveal"],
  },
  {
    id: "wxone-2025",
    type: "WEBEX_ONE",
    title: "Webex One 2025",
    subtitle: "San Jose — Collaboration + AI Showcase",
    date: "2025-10-15",
    dateEnd: "2025-10-16",
    speakers: ["Jeetu Patel", "Anurag Dhingra"],
    products: ["collaboration"],
    initiatives: ["ai-ready-devices"],
    narrative: "Collaboration-led event but included FPW crossover messaging around AI-Ready Devices. Positioned Cisco Room devices and Webex platform as the 'AI endpoint' for the workplace. Key message: the network and the collaboration endpoint are converging — the device is an AI sensor, the network is the AI backbone. First public mention of 'workspace intelligence' concept.",
    decks: [
      { id: "deck-wxone-keynote", title: "Webex One Keynote — AI Workplace", type: "keynote", pages: 38 },
      { id: "deck-wxone-fpw", title: "FPW Crossover: Network Meets Endpoint", type: "breakout", pages: 20 },
    ],
    transcripts: [
      { id: "tx-wxone-keynote", title: "Keynote Transcript", duration: "52 min", speaker: "Jeetu Patel" },
    ],
    spaces: [
      { id: "space-wxone-fpw", title: "Webex One 2025 — FPW Content", members: 6 },
    ],
    tags: ["public", "collaboration", "AI-devices"],
  },
  {
    id: "qbr-q4-2025",
    type: "INTERNAL_QBR",
    title: "FPW Quarterly Business Review — Q4 2025",
    subtitle: "Internal — Leadership Alignment",
    date: "2025-12-12",
    speakers: ["Anurag Dhingra", "Jeff McLaughlin", "Craig Huegen"],
    products: ["networking", "collaboration"],
    initiatives: ["agenticops", "security-first", "ai-ready-devices"],
    narrative: "Internal alignment session. Key decision: 'Futureproof Workplace' becomes the official solution category name replacing the previous 'Cisco Networking & Collaboration' umbrella. Anurag mandated three messaging pillars in priority order: AgenticOps first, Security-First second, AI-Ready Devices third. Collaboration team pushed back on being third but accepted the prioritization for external-facing narrative.",
    decks: [
      { id: "deck-qbr-q4", title: "Q4 QBR — FPW Strategy Alignment", type: "internal", pages: 48 },
    ],
    transcripts: [
      { id: "tx-qbr-q4", title: "QBR Full Session Transcript", duration: "1h 40min", speaker: "Multiple" },
    ],
    spaces: [
      { id: "space-qbr-q4", title: "FPW QBR Q4 2025", members: 18 },
    ],
    tags: ["internal", "strategy", "pillar-prioritization"],
  },
  {
    id: "ai-gartner-q1-2026",
    type: "ANALYST_INQUIRY",
    title: "Gartner Analyst Inquiry — Q1 2026",
    subtitle: "Enterprise Networking MQ Prep + Inquiry",
    date: "2026-01-22",
    speakers: ["Anurag Dhingra", "Jeff McLaughlin"],
    products: ["networking"],
    initiatives: ["agenticops", "security-first"],
    narrative: "Defended Cisco's position in the Enterprise Networking MQ. Analyst pushed on Arista's CloudVision single-pane narrative vs. Cisco's multi-dashboard reality (Meraki Dashboard + Catalyst Center). Team responded with the unified management roadmap and AgenticOps as the leap past single-pane. Key analyst feedback: 'You need to ship the unification, not just talk about it.'",
    decks: [
      { id: "deck-gartner-q1-brief", title: "Gartner MQ Briefing Deck", type: "analyst-brief", pages: 24 },
      { id: "deck-gartner-q1-roadmap", title: "Confidential Roadmap Appendix", type: "roadmap", pages: 12 },
    ],
    transcripts: [
      { id: "tx-gartner-q1", title: "Gartner Inquiry Call Transcript", duration: "55 min", speaker: "Anurag Dhingra" },
      { id: "tx-gartner-q1-debrief", title: "Internal Debrief Notes", duration: "20 min", speaker: "Jeff McLaughlin" },
    ],
    spaces: [
      { id: "space-gartner-q1-prep", title: "Gartner MQ 2026 — Prep Room", members: 11 },
    ],
    tags: ["confidential", "analyst", "MQ-prep"],
  },
  {
    id: "gcab-emea-2026",
    type: "GCAB",
    title: "GCAB EMEA — Q1 2026",
    subtitle: "London — Enterprise Networking Advisory Board",
    date: "2026-02-05",
    dateEnd: "2026-02-06",
    speakers: ["Anurag Dhingra", "Craig Huegen"],
    products: ["networking"],
    initiatives: ["agenticops", "ai-ready-devices"],
    narrative: "Customer advisory board with 18 enterprise customers across EMEA. Key theme: customers want AI-driven operations but don't trust 'autonomous' anything yet. Strong signal that 'AI-assisted' resonates more than 'AI-native' with this audience. Three customers specifically asked about Arista CloudVision competitive comparison. Healthcare vertical customers flagged compliance concerns with cloud-managed networking.",
    decks: [
      { id: "deck-gcab-emea", title: "GCAB EMEA — FPW Strategy Update", type: "advisory", pages: 36 },
      { id: "deck-gcab-emea-vertical", title: "Vertical Deep Dive: Healthcare + Education", type: "advisory", pages: 18 },
    ],
    transcripts: [
      { id: "tx-gcab-emea-day1", title: "Day 1 Session Transcript", duration: "3h 20min", speaker: "Multiple" },
      { id: "tx-gcab-emea-day2", title: "Day 2 Roundtable Transcript", duration: "2h 10min", speaker: "Multiple" },
    ],
    spaces: [
      { id: "space-gcab-emea", title: "GCAB EMEA 2026 — Working Room", members: 22 },
    ],
    tags: ["confidential", "customer-voice", "EMEA"],
  },
  {
    id: "ai-forrester-q1-2026",
    type: "ANALYST_INQUIRY",
    title: "Forrester Inquiry — Network Automation Wave",
    subtitle: "Prep for Forrester Wave: Network Automation",
    date: "2026-02-18",
    speakers: ["Anurag Dhingra"],
    products: ["networking"],
    initiatives: ["agenticops"],
    narrative: "Positioned AgenticOps as next-generation network automation beyond traditional AIOps. Forrester analyst was receptive to the 'agentic' framing but wanted proof points on autonomous remediation in production. Committed to three customer reference stories by Q2. Analyst noted Juniper Mist is the strongest competitor in this specific wave.",
    decks: [
      { id: "deck-forrester-wave", title: "Forrester Wave Briefing — Network Automation", type: "analyst-brief", pages: 20 },
    ],
    transcripts: [
      { id: "tx-forrester-wave", title: "Forrester Inquiry Transcript", duration: "45 min", speaker: "Anurag Dhingra" },
    ],
    spaces: [
      { id: "space-forrester-wave", title: "Forrester Wave Prep — NetAuto", members: 7 },
    ],
    tags: ["confidential", "analyst", "wave-prep"],
  },
  {
    id: "ps-americas-2026",
    type: "PARTNER_SUMMIT",
    title: "Partner Summit Americas 2026",
    subtitle: "Orlando — Channel Partner Enablement",
    date: "2026-03-04",
    dateEnd: "2026-03-06",
    speakers: ["Jeff McLaughlin", "Craig Huegen"],
    products: ["networking", "collaboration"],
    initiatives: ["agenticops", "security-first", "ai-ready-devices"],
    narrative: "Partner-facing event focused on enablement. Messaging was adapted from Cisco Live US but simplified for channel consumption. Key adjustment: partners don't care about 'vision' — they care about 'what can I sell this quarter.' Shifted language from 'Futureproof Workplace transformation' to 'campus refresh with AI upside.' Partner feedback was strong on Meraki simplicity story but skeptical on Catalyst migration path.",
    decks: [
      { id: "deck-ps-keynote", title: "Partner Summit Keynote — FPW", type: "keynote", pages: 30 },
      { id: "deck-ps-enablement", title: "Partner Enablement: Sell the Refresh", type: "enablement", pages: 22 },
    ],
    transcripts: [
      { id: "tx-ps-keynote", title: "Partner Keynote Transcript", duration: "35 min", speaker: "Jeff McLaughlin" },
    ],
    spaces: [
      { id: "space-ps-2026", title: "Partner Summit 2026 — FPW Track", members: 9 },
    ],
    tags: ["partner-facing", "enablement", "channel"],
  },
  {
    id: "eb-pqc-2026",
    type: "EXECUTIVE_BRIEF",
    title: "Executive Briefing — Post-Quantum Cryptography",
    subtitle: "Customer Executive Briefing Center, San Jose",
    date: "2026-03-11",
    speakers: ["Craig Huegen"],
    products: ["networking"],
    initiatives: ["security-first"],
    narrative: "Targeted executive briefing for three Fortune 100 CISOs on Cisco's PQC readiness roadmap within campus networking. Positioned Security-First Architecture as the differentiated layer — Arista and Juniper have no comparable PQC migration story for campus switches. Strong customer reception. One CISO committed to a joint case study.",
    decks: [
      { id: "deck-eb-pqc", title: "PQC Readiness — Executive Briefing", type: "executive-brief", pages: 16 },
    ],
    transcripts: [
      { id: "tx-eb-pqc", title: "Briefing Session Notes", duration: "1h 15min", speaker: "Craig Huegen" },
    ],
    spaces: [
      { id: "space-eb-pqc", title: "PQC Exec Briefing — Mar 2026", members: 5 },
    ],
    tags: ["confidential", "customer-facing", "PQC", "security"],
  },
];
