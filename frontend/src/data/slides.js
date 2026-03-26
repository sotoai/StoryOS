import { fw } from "./framework";
import { verticals } from "./verticals";
import { stories } from "./stories";

// ─── LAYER META ──────────────────────────────────────────────────────────────
export const layerMeta = {
  core:        { label: "Core",        icon: "◆", description: "Leadership-level canonical slide" },
  technical:   { label: "Technical",   icon: "◇", description: "Architecture & deep dive" },
  evidence:    { label: "Evidence",    icon: "◈", description: "Proof points & validation" },
  alternative: { label: "Alternative", icon: "○", description: "Alternate angle or treatment" },
};

// ─── SLIDE DATA (auto-generated from messaging hierarchy with layers) ────────
function generateMockSlides() {
  const out = [];
  let counter = 0;
  const mid = () => `s-${++counter}`;

  // Company slides (stack)
  out.push({ id: mid(), title: fw.company.headline, type: "company", nodeId: "company", layer: "core", productId: null, initiativeId: null, useCaseIndex: null, verticals: ["general"], subtitle: fw.company.tagline });
  out.push({ id: mid(), title: "One Cisco — Platform Advantage", type: "company", nodeId: "company", layer: "technical", productId: null, initiativeId: null, useCaseIndex: null, verticals: ["general"], subtitle: "Design philosophy: tightly integrated, loosely coupled" });
  out.push({ id: mid(), title: "One Cisco — Market Position", type: "company", nodeId: "company", layer: "evidence", productId: null, initiativeId: null, useCaseIndex: null, verticals: ["general"], subtitle: "Gartner MQ Leader, IDC MarketScape Leader, Forrester Wave Leader" });

  // Solution slides (stack)
  out.push({ id: mid(), title: fw.solutionCategory.headline, type: "solution", nodeId: "solution", layer: "core", productId: null, initiativeId: null, useCaseIndex: null, verticals: ["general"], subtitle: fw.solutionCategory.tagline });
  fw.solutionCategory.pillars.forEach(p => {
    out.push({ id: mid(), title: p.label, type: "solution", nodeId: "solution", layer: "technical", productId: null, initiativeId: null, useCaseIndex: null, verticals: ["general"], subtitle: "Architectural pillar" });
  });
  out.push({ id: mid(), title: "Futureproof Workplace — Analyst Validation", type: "solution", nodeId: "solution", layer: "evidence", productId: null, initiativeId: null, useCaseIndex: null, verticals: ["general"], subtitle: "Gartner, Forrester, IDC convergence on workplace modernization" });

  // Product & initiative slides with layers
  fw.products.forEach(prod => {
    // Product core
    out.push({ id: mid(), title: prod.name, type: "product", nodeId: prod.id, layer: "core", productId: prod.id, initiativeId: null, useCaseIndex: null, verticals: ["general"], subtitle: prod.tagline });
    out.push({ id: mid(), title: `${prod.name} — Architecture`, type: "product", nodeId: prod.id, layer: "technical", productId: prod.id, initiativeId: null, useCaseIndex: null, verticals: ["general"], subtitle: `Technical architecture overview for ${prod.name}` });

    prod.initiatives.forEach(init => {
      // Initiative core
      out.push({ id: mid(), title: init.name, type: "initiative", nodeId: init.id, layer: "core", productId: prod.id, initiativeId: init.id, useCaseIndex: null, verticals: ["general"], subtitle: init.tagline });
      // Initiative technical
      out.push({ id: mid(), title: `${init.name} — Deep Dive`, type: "initiative", nodeId: init.id, layer: "technical", productId: prod.id, initiativeId: init.id, useCaseIndex: null, verticals: ["general"], subtitle: `Architecture and technical detail for ${init.name}` });
      // Initiative evidence
      out.push({ id: mid(), title: `${init.name} — Customer Results`, type: "initiative", nodeId: init.id, layer: "evidence", productId: prod.id, initiativeId: init.id, useCaseIndex: null, verticals: ["general"], subtitle: `Proof points and customer metrics for ${init.name}` });

      // Projects as use case slides (core layer)
      init.projects.forEach((proj, idx) => {
        out.push({ id: mid(), title: proj.name, type: "useCase", nodeId: `${init.id}-uc-${idx}`, layer: "core", productId: prod.id, initiativeId: init.id, useCaseIndex: idx, verticals: ["general"], subtitle: proj.detail.slice(0, 80) });
      });
    });
  });

  // Vertical-specific slides (as alternative layer variants)
  Object.entries(verticals).forEach(([vKey, vData]) => {
    if (vKey === "general" || !vData.products) return;
    vData.products.forEach(prod => {
      prod.initiatives.forEach(init => {
        out.push({ id: mid(), title: `${init.name} — ${vData.label}`, type: "initiative", nodeId: init.id, layer: "alternative", productId: prod.id, initiativeId: init.id, useCaseIndex: null, verticals: [vKey], subtitle: init.tagline });
        init.projects.forEach((proj, idx) => {
          out.push({ id: mid(), title: proj.name, type: "useCase", nodeId: `${init.id}-uc-${idx}`, layer: "core", productId: prod.id, initiativeId: init.id, useCaseIndex: idx, verticals: [vKey], subtitle: proj.detail.slice(0, 80) });
        });
      });
    });
  });

  return out;
}
export const allSlides = generateMockSlides();

// ─── STORY SLIDES (3 per story: title, solution, outcome) ──────────────────────
(function generateStorySlides() {
  let sc = 200;
  stories.forEach(story => {
    const ids = [];
    const base = { type: "story", storyId: story.id, productId: story.tags.products[0] || null, initiativeId: story.tags.initiatives[0] || null, useCaseIndex: null, verticals: [story.industry], layer: "evidence", nodeId: story.tags.initiatives[0] || "stories" };

    const titleId = `ss-${++sc}`;
    allSlides.push({ ...base, id: titleId, title: story.customer, subtitle: story.summary, storySlideVariant: "title", storyCustomer: story.customer, storyIndustry: story.industry, storyMetrics: story.metrics });
    ids.push(titleId);

    const solId = `ss-${++sc}`;
    allSlides.push({ ...base, id: solId, title: `${story.customer} — Solution`, subtitle: story.solution.slice(0, 120), storySlideVariant: "solution", storyCustomer: story.customer, storyIndustry: story.industry, storySolutionText: story.solution, storyProducts: story.tags.products, storyInitiatives: story.tags.initiatives });
    ids.push(solId);

    const outId = `ss-${++sc}`;
    allSlides.push({ ...base, id: outId, title: `${story.customer} — Outcome`, subtitle: story.outcome.slice(0, 120), storySlideVariant: "outcome", storyCustomer: story.customer, storyIndustry: story.industry, storyMetrics: story.metrics, storyOutcomeText: story.outcome });
    ids.push(outId);

    story.storySlideIds = ids;
  });
})();

// ─── SLIDE STACKS (group by nodeId for efficient lookup) ─────────────────────
export const slideStacks = {};
allSlides.forEach(s => {
  if (!s.nodeId) return;
  if (!slideStacks[s.nodeId]) slideStacks[s.nodeId] = [];
  slideStacks[s.nodeId].push(s);
});

// ─── CORE DECKS (predefined paths through the stacks) ────────────────────────
function buildCoreDeck(verticalFilter) {
  const coreSlides = allSlides.filter(s =>
    s.layer === "core" &&
    s.type !== "useCase" &&
    s.type !== "story" &&
    (s.verticals.includes("general") || s.verticals.includes(verticalFilter))
  );
  return coreSlides.map(s => s.id);
}

export const coreDecks = {
  general: { name: "Futureproof Workplace — Leadership Briefing", description: "Executive-level narrative across all pillars", slideIds: buildCoreDeck("general") },
  healthcare: { name: "Healthcare Campus Modernization", description: "Vertical-specific leadership deck for healthcare", slideIds: buildCoreDeck("healthcare") },
  education: { name: "Education Network Transformation", description: "K-12 and higher ed campus modernization", slideIds: buildCoreDeck("education") },
  government: { name: "Government Zero Trust Campus", description: "Compliance-focused modernization for public sector", slideIds: buildCoreDeck("government") },
  manufacturing: { name: "Manufacturing IT/OT Convergence", description: "Factory floor to front office unification", slideIds: buildCoreDeck("manufacturing") },
  retail: { name: "Retail Connected Experience", description: "In-store and distribution center modernization", slideIds: buildCoreDeck("retail") },
  financial: { name: "Financial Services Secure Campus", description: "Post-quantum and zero trust for financial institutions", slideIds: buildCoreDeck("financial") },
};

// ─── SLIDE LIBRARY (for Co-Author shelf recommendations) ──────────────────────
export const slideLibrary = [
  { id: "sl-1", title: "AgenticOps: Autonomous Network Operations", type: "narrative", source: { deckId: "deck-cl-us-keynote", deckTitle: "FPW Keynote — Cisco Live US", slideNumber: 8 }, products: ["networking"], initiatives: ["n2"], audiences: ["cio", "nb3"], verticals: ["all"], tags: ["AI", "automation", "vision"], keywords: ["autonomous", "AI-driven", "network operations", "self-healing"], narrativeContext: "Sets up the AgenticOps vision as the next evolution beyond traditional AIOps. Positions Cisco's approach as moving from monitoring to autonomous remediation." },
  { id: "sl-2", title: "Security-First Architecture: Built In, Not Bolted On", type: "architecture", source: { deckId: "deck-cl-us-keynote", deckTitle: "FPW Keynote — Cisco Live US", slideNumber: 14 }, products: ["networking"], initiatives: ["n3"], audiences: ["ciso", "nb1"], verticals: ["all"], tags: ["security", "architecture", "differentiation"], keywords: ["zero trust", "PQC", "encryption", "segmentation"], narrativeContext: "Architecture diagram showing how Cisco embeds security at the network layer vs. competitors who require overlay solutions." },
  { id: "sl-3", title: "Meraki + Catalyst Unification: One Platform", type: "narrative", source: { deckId: "deck-cl-us-breakout", deckTitle: "Campus Networking Deep Dive", slideNumber: 3 }, products: ["networking"], initiatives: ["n1"], audiences: ["nb1", "nb3"], verticals: ["all"], tags: ["unification", "platform", "simplicity"], keywords: ["Meraki", "Catalyst", "unified", "single platform", "management"], narrativeContext: "Explains the Meraki + Catalyst convergence story — one hardware, one license, choice of management plane." },
  { id: "sl-4", title: "Campus Network TCO: Cisco vs. Arista vs. Juniper", type: "data", source: { deckId: "deck-gartner-q1-brief", deckTitle: "Gartner MQ Briefing Deck", slideNumber: 11 }, products: ["networking"], initiatives: ["n1"], audiences: ["cio", "cfo"], verticals: ["all"], tags: ["TCO", "competitive", "data"], keywords: ["cost", "savings", "ROI", "total cost", "comparison"], narrativeContext: "Data slide comparing 3-year TCO across campus networking vendors. Cisco shows 23% lower TCO through unified licensing." },
  { id: "sl-5", title: "AI Canvas: Multiplayer Network Operations", type: "architecture", source: { deckId: "deck-cl-us-keynote", deckTitle: "FPW Keynote — Cisco Live US", slideNumber: 18 }, products: ["networking"], initiatives: ["n2"], audiences: ["nb1", "nb3"], verticals: ["all"], tags: ["AI Canvas", "collaboration", "operations"], keywords: ["AI Canvas", "multiplayer", "NetOps", "SecOps", "telemetry"], narrativeContext: "Shows AI Canvas as a collaborative workspace where operators and AI agents work together on network operations." },
  { id: "sl-6", title: "Healthcare Campus: Mercy Health Case Study", type: "customer-quote", source: { deckId: "deck-gcab-emea-vertical", deckTitle: "Vertical Deep Dive: Healthcare", slideNumber: 6 }, products: ["networking"], initiatives: ["n2", "n3"], audiences: ["cio", "nb3"], verticals: ["healthcare"], tags: ["healthcare", "case study", "customer"], keywords: ["healthcare", "hospital", "patient", "compliance", "HIPAA"], narrativeContext: "Customer testimonial from Mercy Health on AgenticOps reducing network incidents by 40% in clinical environments." },
  { id: "sl-7", title: "Wi-Fi 7: Next-Gen Campus Connectivity", type: "narrative", source: { deckId: "deck-ps-enablement", deckTitle: "Partner Enablement: Sell the Refresh", slideNumber: 5 }, products: ["networking"], initiatives: ["n1"], audiences: ["nb1", "vpIt"], verticals: ["all"], tags: ["Wi-Fi 7", "wireless", "campus"], keywords: ["Wi-Fi 7", "CW9172", "access point", "wireless", "density"], narrativeContext: "Positions Wi-Fi 7 portfolio as the campus refresh catalyst — single-SKU dual-mode APs with built-in ThousandEyes." },
  { id: "sl-8", title: "Shadow AI Governance: Visibility & Control", type: "architecture", source: { deckId: "deck-eb-pqc", deckTitle: "PQC Readiness — Executive Briefing", slideNumber: 8 }, products: ["networking"], initiatives: ["n3"], audiences: ["ciso", "vpSecurity"], verticals: ["all", "financial"], tags: ["shadow AI", "governance", "security"], keywords: ["shadow AI", "governance", "policy", "AI Defense", "visibility"], narrativeContext: "Shows how AI Defense provides visibility and enforcement for unsanctioned AI tools operating on the enterprise network." },
  { id: "sl-9", title: "Post-Quantum Cryptography Readiness Roadmap", type: "data", source: { deckId: "deck-eb-pqc", deckTitle: "PQC Readiness — Executive Briefing", slideNumber: 4 }, products: ["networking"], initiatives: ["n3"], audiences: ["ciso", "cio"], verticals: ["all", "financial", "government"], tags: ["PQC", "roadmap", "compliance"], keywords: ["post-quantum", "cryptography", "CNSA", "compliance", "quantum"], narrativeContext: "Timeline showing Cisco's PQC migration path — IOS XE 26 capabilities, CNSA 2.0 compliance, and competitive gap vs. Arista/Juniper." },
  { id: "sl-10", title: "Futureproof Workplace: Three Pillars", type: "narrative", source: { deckId: "deck-cl-us-keynote", deckTitle: "FPW Keynote — Cisco Live US", slideNumber: 4 }, products: ["networking", "collaboration"], initiatives: ["n2", "n3", "n1"], audiences: ["cio", "vpIt"], verticals: ["all"], tags: ["vision", "pillars", "strategy"], keywords: ["futureproof", "pillars", "AgenticOps", "security", "AI-ready"], narrativeContext: "Overview slide establishing the three-pillar framework: AgenticOps, Security-First Architecture, AI-Ready Devices." },
  { id: "sl-11", title: "Webex AI Assistant: Every Interaction Smarter", type: "narrative", source: { deckId: "deck-wxone-keynote", deckTitle: "Webex One Keynote — AI Workplace", slideNumber: 12 }, products: ["collaboration"], initiatives: ["c1"], audiences: ["cb1", "vpWorkplace"], verticals: ["all"], tags: ["Webex", "AI", "meetings"], keywords: ["Webex", "AI Assistant", "transcription", "meetings", "calling"], narrativeContext: "Positions Webex AI Assistant capabilities across meetings, calling, and messaging — 50+ language support." },
  { id: "sl-12", title: "RoomOS 26: AI-Powered Collaboration Devices", type: "architecture", source: { deckId: "deck-wxone-fpw", deckTitle: "FPW Crossover: Network Meets Endpoint", slideNumber: 8 }, products: ["collaboration"], initiatives: ["c2"], audiences: ["vpWorkplace", "cb1"], verticals: ["all"], tags: ["RoomOS", "devices", "AI"], keywords: ["RoomOS", "Room Bar", "Board Pro", "NVIDIA", "camera"], narrativeContext: "Architecture view of RoomOS 26 on NVIDIA — edge AI processing, multi-platform support, Notetaker Agent." },
  { id: "sl-13", title: "Contact Center AI: Self-Service to Agent Assist", type: "narrative", source: { deckId: "deck-wxone-keynote", deckTitle: "Webex One Keynote — AI Workplace", slideNumber: 22 }, products: ["collaboration"], initiatives: ["c3"], audiences: ["cb3", "vpWorkplace"], verticals: ["all"], tags: ["contact center", "CX", "AI"], keywords: ["contact center", "self-service", "agent assist", "CX", "Webex AI Agent"], narrativeContext: "End-to-end view of AI across the customer journey — from autonomous self-service to real-time agent assist." },
  { id: "sl-14", title: "Education Campus: Broward County Transformation", type: "customer-quote", source: { deckId: "deck-gcab-emea-vertical", deckTitle: "Vertical Deep Dive: Healthcare + Education", slideNumber: 14 }, products: ["networking"], initiatives: ["n1", "n2"], audiences: ["cio", "nb3"], verticals: ["education"], tags: ["education", "case study", "campus"], keywords: ["education", "school", "campus", "student", "K-12"], narrativeContext: "Broward County Public Schools deployed unified Meraki + Catalyst across 270 schools — 30% OpEx reduction." },
  { id: "sl-15", title: "Hybrid Mesh Firewall: Enforcement at the Switch", type: "architecture", source: { deckId: "deck-cl-us-breakout", deckTitle: "Campus Networking Deep Dive", slideNumber: 18 }, products: ["networking"], initiatives: ["n3"], audiences: ["ciso", "nb1"], verticals: ["all"], tags: ["firewall", "microsegmentation", "DPU"], keywords: ["hybrid mesh", "firewall", "DPU", "switch", "HyperShield", "microsegmentation"], narrativeContext: "Shows enforcement on smart switches with DPUs — packet inspection where packets flow, no extra hops." },
  { id: "sl-16", title: "Cisco Spaces: Network as Workplace Sensor", type: "narrative", source: { deckId: "deck-wxone-fpw", deckTitle: "FPW Crossover: Network Meets Endpoint", slideNumber: 14 }, products: ["collaboration"], initiatives: ["c2"], audiences: ["vpWorkplace", "nb3"], verticals: ["all"], tags: ["Cisco Spaces", "smart workspace", "IoT"], keywords: ["Spaces", "occupancy", "desk booking", "sustainability", "UWB"], narrativeContext: "Positions Cisco Spaces as the smart workspace platform leveraging the Meraki network as a sensor." },
  { id: "sl-17", title: "IT/OT Convergence: Factory Floor to Front Office", type: "narrative", source: { deckId: "deck-ps-enablement", deckTitle: "Partner Enablement: Sell the Refresh", slideNumber: 16 }, products: ["networking"], initiatives: ["n1"], audiences: ["cio", "nb3"], verticals: ["manufacturing"], tags: ["IT/OT", "manufacturing", "industrial"], keywords: ["IT/OT", "factory", "industrial", "Cyber Vision", "URWB", "manufacturing"], narrativeContext: "Converging IT and OT networks under a single management plane — Industrial Ethernet, Cyber Vision, URWB." },
  { id: "sl-18", title: "Government Zero Trust: City of Atlanta Case Study", type: "customer-quote", source: { deckId: "deck-gartner-q1-roadmap", deckTitle: "Confidential Roadmap Appendix", slideNumber: 6 }, products: ["networking"], initiatives: ["n3"], audiences: ["ciso", "cio"], verticals: ["government"], tags: ["government", "zero trust", "case study"], keywords: ["government", "zero trust", "Atlanta", "municipal", "compliance"], narrativeContext: "City of Atlanta achieved zero lateral breaches after deploying campus microsegmentation with identity-based policy." },
  { id: "sl-19", title: "Financial Services: JPMorgan Chase Deployment", type: "customer-quote", source: { deckId: "deck-gartner-q1-brief", deckTitle: "Gartner MQ Briefing Deck", slideNumber: 18 }, products: ["networking"], initiatives: ["n3", "n2"], audiences: ["ciso", "cio"], verticals: ["financial"], tags: ["financial", "trading", "security"], keywords: ["financial", "trading", "JPMorgan", "post-quantum", "compliance"], narrativeContext: "JPMorgan Chase secured global trading floor with PQC-ready infrastructure — 95% alert reduction." },
  { id: "sl-20", title: "Deep Network Model: 40M+ CCIE-Level Tokens", type: "data", source: { deckId: "deck-forrester-wave", deckTitle: "Forrester Wave Briefing — Network Automation", slideNumber: 9 }, products: ["networking"], initiatives: ["n2"], audiences: ["nb1", "nb3"], verticals: ["all"], tags: ["AI model", "deep learning", "expertise"], keywords: ["Deep Network Model", "CCIE", "tokens", "AI model", "training"], narrativeContext: "Data on the Deep Network Model — trained on 40M+ tokens of CCIE-level networking expertise for domain-specific reasoning." },
  { id: "sl-21", title: "Single-Vendor SASE: SD-WAN + SSE Unified", type: "architecture", source: { deckId: "deck-cl-us-breakout", deckTitle: "Campus Networking Deep Dive", slideNumber: 24 }, products: ["networking"], initiatives: ["n3"], audiences: ["ciso", "nb1"], verticals: ["all"], tags: ["SASE", "SD-WAN", "SSE"], keywords: ["SASE", "SD-WAN", "SSE", "Secure Access", "identity"], narrativeContext: "Architecture showing Cisco's single-vendor SASE combining world-class SD-WAN and SSE — fastest growing Cisco product." },
  { id: "sl-22", title: "Multi-Agent Collaboration: A2A + MCP Protocols", type: "architecture", source: { deckId: "deck-wxone-keynote", deckTitle: "Webex One Keynote — AI Workplace", slideNumber: 28 }, products: ["collaboration"], initiatives: ["c3"], audiences: ["cb3", "cio"], verticals: ["all"], tags: ["multi-agent", "A2A", "MCP"], keywords: ["multi-agent", "A2A", "MCP", "orchestration", "interoperability"], narrativeContext: "Shows how Webex AI Agent orchestrates with third-party agents via A2A and MCP — open protocol approach." },
];
