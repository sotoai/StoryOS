// ─── COMPETITIVE INTELLIGENCE DATA ───────────────────────────────────────────

export const competitors = {
  arista: {
    name: "Arista Networks",
    tagline: "The networking company for the AI era.",
    metrics: [
      { label: "Market Share (Campus)", value: "~8%", change: "+1.2 pts YoY", direction: "up" },
      { label: "Share of Voice", value: "Rising", change: "vs. Q3 2025", direction: "up" },
      { label: "Gartner MQ", value: "Challenger", change: "Wired/Wireless LAN", direction: "neutral" },
      { label: "Key Win Rate", value: "32%", change: "in competitive deals", direction: "neutral" },
    ],
    coreMessages: ["Cognitive Campus", "CloudVision AI", "Open Networking", "Single OS (EOS)", "Financial Services Focus"],

    recentMoves: [
      { date: "Feb 2026", category: "Product", title: "CW-750 Wi-Fi 7 AP announced", description: "New high-density campus AP targeting enterprise and stadium deployments. Tri-band 6 GHz with AI-assisted roaming.", url: "https://www.arista.com/en/company/news/press-release", source: "arista.com" },
      { date: "Jan 2026", category: "Analyst", title: "Gartner MQ positioning improved", description: "Moved closer to Leaders quadrant in Wired and Wireless LAN Infrastructure. Cited CloudVision maturity and EOS consistency.", url: "https://www.gartner.com/reviews/market/wired-and-wireless-lan-access-infrastructure", source: "gartner.com" },
      { date: "Jan 2026", category: "Earnings", title: "Q4 FY25 campus revenue +18% YoY", description: "Campus networking segment outpacing overall growth. Management cited AI networking demand and Cisco competitive displacement wins.", url: "https://investors.arista.com/financial-information/quarterly-results", source: "investors.arista.com" },
      { date: "Dec 2025", category: "Partnership", title: "Expanded Zscaler integration for campus SASE", description: "Deeper SSE integration positioning CloudVision as SASE-ready campus management plane. Directly counters Cisco single-vendor SASE story.", url: "https://www.arista.com/en/solutions/security", source: "arista.com" },
      { date: "Nov 2025", category: "Messaging", title: "New campaign: 'The Cognitive Campus'", description: "Major messaging refresh positioning EOS as the only AI-native campus OS. Heavy investment in analyst relations and social amplification.", url: "https://www.arista.com/en/solutions/cognitive-campus", source: "arista.com" },
      { date: "Oct 2025", category: "Product", title: "CV-CUE 2.0 cloud management platform", description: "Significant CloudVision-as-a-Service update with AI-assisted troubleshooting, predictive analytics, and multi-site management.", url: "https://www.arista.com/en/products/cloudvision", source: "arista.com" },
      { date: "Sep 2025", category: "Partnership", title: "Microsoft Copilot integration announced", description: "IT admins can query CloudVision through Microsoft Copilot for network diagnostics and configuration changes via natural language.", url: "https://blogs.arista.com/blog", source: "blogs.arista.com" },
    ],

    framework: {
      company: {
        headline: "Arista Networks",
        tagline: "The networking company for the AI era.",
        description: "Arista positions itself as the networking company purpose-built for AI workloads, extending its hyperscaler-proven EOS platform from data center to campus. Their narrative centers on a single binary OS (EOS) providing consistency from spine to leaf to access point, open standards and API-first architecture, and cloud-native management through CloudVision. They leverage their strong data center brand reputation to credentialize their campus entry.",
      },
      solution: {
        headline: "Cognitive Campus",
        tagline: "AI-driven campus networking with cloud-native management.",
        description: "Arista's campus solution frames campus networking as an extension of data center principles: one OS everywhere, programmable APIs, and AI-assisted operations. The 'Cognitive Campus' narrative positions their campus portfolio not as a standalone product line but as the natural campus extension of a platform that already runs the world's largest cloud networks.",
        pillars: ["Cloud-Native Management", "Universal EOS", "Cognitive Automation"],
      },
      products: [
        {
          id: "campus",
          name: "Campus Networking",
          tagline: "One OS from data center to campus — CloudVision everywhere.",
          description: "Arista's campus push leverages CX series switches, C-series Wi-Fi 7 APs, and CloudVision as the universal management plane. The core argument: customers already running EOS in the data center get campus networking 'for free' — same OS, same APIs, same operational model. Emphasis on EOS consistency and open API extensibility.",
          initiatives: [
            {
              id: "a-cv",
              name: "CloudVision / CV-CUE",
              tagline: "Cloud-native campus management with AI-assisted operations.",
              description: "CV-CUE is Arista's answer to Meraki Dashboard and Catalyst Center — a cloud-hosted management platform for campus switches and APs. AI-assisted troubleshooting, predictive capacity planning, and multi-site management. Key differentiator claim: built on the same CloudVision platform that manages hyperscaler data centers.",
              projects: [
                { name: "CV-CUE 2.0", detail: "Cloud-native management with AI-assisted troubleshooting, predictive analytics, and automated workflows. Multi-tenant, multi-site." },
                { name: "CloudVision Universal Client", detail: "Unified management plane for campus and data center — same API, same telemetry, same automation framework." },
                { name: "Copilot Integration", detail: "Natural language network management through Microsoft Copilot — query, diagnose, and configure via conversational AI." },
              ],
            },
            {
              id: "a-wifi",
              name: "Wi-Fi 7 & Cognitive Wireless",
              tagline: "AI-optimized wireless for high-density campus environments.",
              description: "Arista's C-350 and C-360 Wi-Fi 7 access points with the new CW-750 for high-density deployments. Cognitive wireless uses ML-based RF optimization, client steering, and anomaly detection. Positioning against Cisco's Wi-Fi 7 portfolio on density performance and EOS integration.",
              projects: [
                { name: "CW-750 Series", detail: "High-density Wi-Fi 7 AP for stadiums, convention centers, and large campus environments. Tri-band with 6 GHz priority." },
                { name: "Cognitive RF", detail: "ML-based radio frequency optimization — automated channel planning, power adjustment, and interference mitigation." },
                { name: "Client Insights", detail: "Per-client experience scoring and anomaly detection. Automated ticket creation when experience degrades below thresholds." },
              ],
            },
            {
              id: "a-sec",
              name: "Campus Security & Segmentation",
              tagline: "Macro Segmentation Service — network-level Zero Trust.",
              description: "Arista's MSS (Macro Segmentation Service) provides network-level segmentation using EOS-native constructs. Positioned as simpler than Cisco ISE/TrustSec — fewer components, less complexity. Integrated with Zscaler for SSE. Key gap: no equivalent to Cisco's hybrid mesh firewall or DPU-based enforcement.",
              projects: [
                { name: "MSS (Macro Segmentation)", detail: "Network-native segmentation using EOS groups and policies. Claim: 80% of segmentation use cases without a separate firewall." },
                { name: "Zscaler SSE Integration", detail: "Campus-to-cloud security through Zscaler partnership. Positions as best-of-breed vs. Cisco's single-vendor SASE approach." },
                { name: "Network Detection & Response", detail: "CloudVision-based threat detection using network telemetry. Anomaly scoring and automated quarantine for compromised endpoints." },
              ],
            },
          ],
        },
        {
          id: "datacenter",
          name: "Data Center",
          tagline: "Hyperscaler-proven networking for AI workloads.",
          description: "Arista's core strength. 7800R series and 7060X series provide spine-leaf fabric for cloud and enterprise data centers. VXLAN/EVPN fabric, DCI solutions, and AI/ML networking. This is where Arista's brand carries the most weight — their data center credibility is what powers the campus land-and-expand play.",
          initiatives: [
            {
              id: "a-dc-fabric",
              name: "AI Data Center Fabric",
              tagline: "Purpose-built networking for GPU clusters and AI training.",
              description: "800G spine switches with ultra-low latency for AI/ML workloads. RDMA over Converged Ethernet for GPU interconnect. Direct competitor to Cisco's Nexus AI fabric.",
              projects: [
                { name: "7800R4 Series", detail: "800G-capable spine switches for AI data center fabric. Sub-microsecond latency, lossless RDMA support." },
                { name: "DANZ Monitoring", detail: "Network-wide telemetry and flow monitoring. Deep packet analytics for compliance and troubleshooting." },
              ],
            },
          ],
        },
      ],
    },

    threats: {
      predictions: [
        { title: "CV-CUE will add agentic automation features at next analyst event", rationale: "Arista's Copilot integration signals intent to match Cisco's AgenticOps narrative. Expect 'Cognitive Agents' branding for autonomous troubleshooting in CV-CUE.", confidence: "High" },
        { title: "Arista will target healthcare vertical with EOS compliance story", rationale: "Healthcare is Cisco's strongest vertical for campus networking. Arista's Q4 earnings call specifically mentioned healthcare expansion as a FY26 priority.", confidence: "Medium" },
        { title: "Strategic OEM partnership with a major security vendor", rationale: "Arista's security portfolio has a clear gap — no native firewall, no DPU enforcement. A Palo Alto or CrowdStrike partnership would close this gap and threaten our 'security fused into the network' pillar.", confidence: "Medium" },
      ],
      conflicts: [
        {
          title: "Single OS narrative threatens Meraki + Catalyst unification story",
          theyClaim: "One OS (EOS) from data center to campus — no management mode choices, no confusion. Simplicity through uniformity.",
          ourPosition: "Choice is a feature, not a bug. Customers want cloud-managed simplicity OR on-prem control — and the ability to switch. One-size-fits-all OS means no optimization for either use case. Meraki + Catalyst unification gives customers flexibility Arista cannot match.",
          affectedTier: "Initiative",
          affectedPersona: "VP of IT",
        },
        {
          title: "CloudVision AI positioning erodes AgenticOps differentiation",
          theyClaim: "CV-CUE provides AI-native campus management with cognitive automation — same benefits as Cisco's AgenticOps but built on a single, consistent platform.",
          ourPosition: "CV-CUE is enhanced monitoring with ML assist — not true agentic operations. Cisco's AgenticOps uses the Deep Network Model (40M+ tokens of CCIE expertise), digital twin validation, and autonomous remediation. Arista's agents detect; Cisco's agents reason, test, and fix.",
          affectedTier: "Initiative",
          affectedPersona: "Network Ops Manager",
        },
        {
          title: "Best-of-breed security narrative undermines single-vendor SASE",
          theyClaim: "Partner with the best security vendors (Zscaler, CrowdStrike) rather than accepting a networking vendor's security. Best-of-breed beats bundled.",
          ourPosition: "Integration gaps between best-of-breed vendors create exploitable seams. Cisco's hybrid mesh firewall enforces on the switch with DPUs — no extra hops, no latency penalty. When agents operate at machine speed, you can't afford the policy sync delays of multi-vendor security stacks.",
          affectedTier: "Initiative",
          affectedPersona: "CISO",
        },
      ],
      flags: [
        { severity: "urgent", title: "CW-750 directly targets our Wi-Fi 7 stadium/high-density segment", description: "Arista's new AP matches our CW9172I specs and undercuts on list price by ~15%. Early competitive deals in higher education and hospitality show Arista leveraging existing data center relationships to land campus wireless.", suggestedAction: "Accelerate Wi-Fi 7 competitive battlecard. Arm SE team with TCO comparison including management plane costs (CloudVision licensing vs. Meraki Dashboard)." },
        { severity: "respond", title: "Cognitive Campus messaging gaining analyst traction", description: "Three Gartner analysts have published notes citing Arista's 'Cognitive Campus' as a credible alternative to Cisco's campus dominance. The EOS-everywhere narrative resonates with data center-first buyers.", suggestedAction: "Commission Forrester TEI study comparing total platform value. Publish AgenticOps differentiation brief targeting analyst community." },
        { severity: "watch", title: "Data center land-and-expand into campus accelerating", description: "Arista's campus attach rate for existing data center customers increased from 12% to 19% over the last two quarters. They're targeting the networking architect persona who already trusts EOS from data center deployments.", suggestedAction: "Monitor quarterly. Ensure Meraki + Catalyst unification messaging is reaching data center teams, not just campus teams." },
      ],
    },

    battlecard: [
      { theySay: "One OS everywhere — EOS runs from data center spine to campus AP.", weSay: "Consistency isn't the same as optimization. Campus and data center have fundamentally different operational models. Cisco offers purpose-built management for each domain (Meraki Dashboard, Catalyst Center, Nexus One) unified through Cisco Cloud Control.", audience: "Network Architect" },
      { theySay: "CloudVision gives you AI-native campus management.", weSay: "CV-CUE is enhanced monitoring — not agentic operations. Ask them: can CloudVision test a fix against a digital twin before deploying? Can it autonomously remediate without human intervention? Cisco's AgenticOps can.", audience: "VP of IT" },
      { theySay: "We partner with best-of-breed security vendors like Zscaler.", weSay: "Partnership means policy sync delays and integration gaps. When agents operate at machine speed, you need security at the switch — not a policy round-trip to a cloud proxy. Our hybrid mesh firewall with DPUs inspects packets where they flow. Zero added latency.", audience: "CISO" },
      { theySay: "Hyperscaler-proven architecture — we run the biggest clouds.", weSay: "Data center expertise doesn't equal campus expertise. Ask how many campus-specific features EOS has vs. Cisco IOS XE. How many campus deployments at 10K+ AP scale? Cisco has 30+ years of campus innovation. Arista has 3.", audience: "CIO / CTO" },
      { theySay: "Open APIs and programmability — no vendor lock-in.", weSay: "Cisco's platform is open by design: Meraki APIs, Catalyst Center APIs, Webex APIs. We integrate with 400+ ecosystem partners. Choice of management mode. Choice of silicon. And unlike Arista, we don't charge extra for API access.", audience: "Network Architect" },
      { theySay: "We're growing 18% in campus — fastest in the market.", weSay: "Growing from a small base is easy. Cisco serves 80%+ of enterprise campuses globally. Our innovation investment exceeds Arista's entire campus revenue. The question isn't who's growing fastest from zero — it's who's investing most in your future.", audience: "CFO / Procurement" },
    ],
  },
};
