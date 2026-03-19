// ─── FRAMEWORK DATA ────────────────────────────────────────────────────────────
// One Cisco Narrative Framework — Cisco Live EMEA 2026
// Structure: Vision → Design Philosophy → Solutions → Products → Initiatives → Use Cases

export const fw = {
  company: {
    headline: "One Cisco",
    tagline: "The critical infrastructure company for the AI era.",
    description: "Cisco uniquely combines networking, security, observability, and collaboration into a single platform where each capability compounds the value of every other. Under one product organization, Cisco's breadth becomes its greatest differentiator — it's no longer about deploying product features, it's about delivering real business outcomes. You do that with platforms, not products. Tokens per dollar per hour is the new currency of global competitiveness, and Cisco provides the full stack from silicon to software to make that economy work.",
    detail: {
      sections: [
        {
          title: "Design Philosophy: Platform Advantage",
          content: "Tightly integrated, loosely coupled. Every Cisco technology compounds the value of every other — the marginal cost of adoption drops with each addition. Buy one thing, it adds value. Buy two things together, they work like magic. Full-stack innovation from custom silicon (G300, P200, Silicon One) to systems, software, security, observability, and data platform — all built by Cisco, all working as one cohesive unit. Cisco Cloud Control is the unified management scaffolding: Nexus One for data center, Security Cloud Control for security, Meraki Dashboard and Catalyst Center for campus, Splunk for observability — converging into one place.",
        },
        {
          title: "Design Philosophy: Open Ecosystem",
          content: "No walled garden. Cisco integrates with third-party technologies even when those vendors compete in some dimension. Start from the customer, work backwards. If you've invested in two or three providers, Cisco makes all of them work better together. Choice is the commitment: Cisco silicon or NVIDIA Spectrum X Ethernet. NXOS, ACI, or SONiC. Cloud-managed or on-prem. Webex rooms running Teams, Zoom, or Google Meet natively. The platform is open because customers demand it and because openness accelerates adoption.",
        },
        {
          title: "Three Solutions",
          content: "AI-Ready Data Centers — where the digital workers live, the token generation factory scaled, secured, and economically efficient. Futureproof Workplace — where humans collaborate with agents, modernizing campus, branch, and collaboration infrastructure. Digital Resilience — the ability to stay secure, up, and running in the face of any disruption, powered by Cisco and Splunk.",
        },
        {
          title: "The Four Imperatives",
          content: "Time: the window is closing — 89% of EMEA organizations are not fully prepared for AI. Preparedness is an immediate imperative, not a long-term goal. Trust: security trust, innovation trust, execution trust, sovereign trust. Talent: 10M more people trained through Cisco certifications — the workforce will work alongside AI agents. Technology: the same infrastructure wasn't built for tomorrow's workloads — 62% expect workloads to rise 30%+ in 2–3 years. The solution isn't stacking products, it's platforms.",
        },
      ],
    },
  },

  solutionCategory: {
    headline: "Futureproof Workplace",
    tagline: "Modernize everywhere people work and connect.",
    vision: "The workplace of the future isn't just for people. Agents, robots, and IoT devices will operate alongside humans — collaborating, automating, and making decisions at machine speed. This explosion of AI presence on the network, both sanctioned and shadow, will expand operational complexity exponentially and test the flexibility, scalability, and security of every network and system it touches. Analyst frameworks from Gartner, Forrester, and IDC all converge on the same insight: workplace modernization is no longer optional.",
    solution: "Cisco transforms campus, branch, and collaboration infrastructure through three pillars: agentic operations that simplify IT in the face of this complexity, security fused directly into the network fabric to protect against threats moving at agent speed, and next-generation devices purpose-built for an AI-saturated workplace.",
    pillars: [
      { label: "AgenticOps for Operational Simplicity" },
      { label: "Security Fused into the Network" },
      { label: "AI-Ready Devices" },
    ],
    detail: {
      sections: [
        {
          title: "The Workplace Challenge",
          content: "The workplace of the future has people, agents, robots, and IoT devices operating side by side. It faces sophisticated threat attacks at machine scale and a massive power shortage. This explosion of AI presence on the network — both sanctioned deployments and shadow AI — will expand operational complexity exponentially and test the flexibility, scalability, and security of every network and system it touches.",
        },
        {
          title: "AgenticOps for Operational Simplicity",
          content: "The next evolution beyond AIOps. Infrastructure operates at agent speed, not human speed. Human in the loop, agent in every loop. Ambient agents monitor the network 24/7, detect anomalies through cross-domain telemetry correlation, reason using an ensemble of models including the Deep Network Model, test fixes on digital twins, and only escalate to humans when judgment is needed.",
        },
        {
          title: "Security Fused into the Network",
          content: "Zero trust extended from humans to agents to agent-to-agent communication. The scale is fundamentally different — hundreds of thousands of agents operating at machine speed. Identity Intelligence uses dynamic behavioral assessment, not static entitlements. AI Defense protects agents from the world. Secure Access protects the world from agents. Enforcement happens on smart switches with DPUs — no extra hops, no added latency.",
        },
        {
          title: "AI-Ready Devices",
          content: "Fully refreshed hardware and software for campus, branch, and collaboration. Unified Catalyst + Meraki hardware with one licensing model. Post-quantum capabilities in IOS XE 26. Wi-Fi 7 APs as single-SKU dual-mode. Webex Suite with AI-powered meetings, calling, contact center. Collaboration devices on RoomOS 26 running Webex, Teams, Zoom, and Google Meet natively. Cisco Spaces transforms the network into a sensor platform.",
        },
      ],
    },
  },

  products: [
    {
      id: "networking",
      name: "Cisco Networking",
      subtitle: "Campus & Branch",
      tagline: "One network. Your choice of management. Built for AI.",
      description: "Cisco unifies Meraki and Catalyst into a single networking platform — one hardware lineup, one licensing model, your choice of cloud or on-prem management. AI-native assurance from ThousandEyes, agentic operations via AI Canvas, enterprise-grade Wi-Fi 7, and zero-trust security embedded at every layer deliver the infrastructure for the AI era. Recognized as a Leader in the IDC MarketScape for Enterprise WLAN and a five-time Gartner Magic Quadrant Leader for SD-WAN.",
      detail: {
        sections: [
          {
            title: "Platform Unification",
            content: "Cisco has completely refreshed the entire lineup from Wi-Fi access points to switches to routers and unified the hardware so Catalyst and Meraki came together. The management plane has come together. Post-quantum capabilities are included in IOS XE 26. Expanded secure router models include DSL-to-fiber and merged Wi-Fi + 5G form factors. A single global view into Meraki Dashboard and Catalyst Center with cloud-deployed plug-and-play fabrics.",
          },
          {
            title: "Why Cisco Networking",
            content: "Cisco makes its own silicon, its own systems, its own software, its own security platform, its own observability platform, and has its own data platform — all working together in one cohesive unit. This is a massive differentiator. The innovations hyperscalers have enjoyed are now available to everyone: neoclouds, sovereign clouds, service providers, and enterprises.",
          },
        ],
      },
      initiatives: [
        {
          id: "n2",
          name: "AgenticOps & AI-Powered Network Operations",
          pillar: "AgenticOps for Operational Simplicity",
          tagline: "From reactive alerts to autonomous action. Human in the loop, agent in every loop.",
          description: "AgenticOps transforms IT with ambient agents that monitor the network 24/7, correlating cross-domain telemetry to detect anomalies before humans notice. An ensemble of models — foundation models plus the domain-specific Deep Network Model trained on 40M+ tokens of CCIE-level expertise — enables agents to reason, diagnose root cause, test fixes against digital twins, and only escalate when judgment is needed. Infrastructure operates at agent speed, not human speed. Gartner's 2025 Hype Cycle calls Agent-Native I&O the biggest disruption since cloud.",
          detail: {
            sections: [
              {
                title: "Why AgenticOps",
                content: "As agents flood the workplace, the network must operate at agent speed, not human speed. AIOps was a start — pattern recognition, anomaly detection. AgenticOps goes further: autonomous agents that don't just detect problems but reason about root cause, propose fixes, test those fixes against digital twins, and execute with human approval. The operating model for IT changes fundamentally.",
              },
              {
                title: "How It Works",
                content: "Step 1: Cross-domain telemetry — ambient agents correlate data across network, security, and application domains. Step 2: Ensemble of models — foundation models plus the Deep Network Model (trained on 40M+ tokens of CCIE-level expertise) provide domain-specific reasoning. Step 3: Agents conduct tasks — troubleshooting, optimization, validation — and only escalate to humans when judgment is needed. Step 4: Multiple interfaces — dashboard, AI Assistant, AI Canvas, Cisco Cloud Control.",
              },
              {
                title: "New Capabilities (2026)",
                content: "Troubleshooting: agents identify root cause and propose remediation autonomously. Experience metrics monitor the full end-to-end user experience — connectivity, capacity, coverage, roaming, applications. Optimization: agents continuously ensure the network is in its best state. Validation: agents verify changes against digital twins before rollout to production. Beta Q2 2026, select capabilities GA June 2026. Expanding across the entire Cisco portfolio.",
              },
            ],
          },
          projects: [
            { name: "AI Canvas", detail: "Multiplayer generative workspace unifying NetOps, SecOps, and DevOps with real-time telemetry from Meraki, ThousandEyes, and Splunk — not a dashboard, a collaborative workspace where operators and AI agents work together" },
            { name: "Agentic Troubleshooting", detail: "Agents identify root cause autonomously, propose remediation, and execute with human approval. Experience metrics monitor full end-to-end user experience: connectivity, capacity, coverage, roaming, applications" },
            { name: "Agentic Optimization & Validation", detail: "Agents continuously tune the network and verify changes against digital twins before production rollout. Configuration drift detected and corrected automatically" },
            { name: "AI Assistant for Networking", detail: "Natural language automation for switch migration, Wi-Fi setup, device onboarding, and root-cause analysis directly in the Meraki Dashboard" },
            { name: "Workflows Engine", detail: "Low/no-code cross-domain automation spanning Meraki, Catalyst Center, SD-WAN Manager, ISE, Nexus, and third-party apps" },
          ],
        },
        {
          id: "n1",
          name: "Meraki + Catalyst Unification",
          pillar: "AI-Ready Devices",
          tagline: "One platform. Pick how you deploy.",
          description: "Cisco converges Meraki and Catalyst into a single architecture — unified hardware on Silicon One ASICs, unified licensing via Cisco Networking Subscription, and a single Global Overview dashboard. New Wi-Fi 7 APs ship as one SKU that boots into Meraki cloud or Catalyst controller mode. No more either/or — deploy cloud-managed, on-prem, or hybrid, and switch at any time. Expanded secure router models include DSL-to-fiber and merged Wi-Fi + 5G form factors. Post-quantum capabilities embedded in IOS XE 26.",
          detail: {
            sections: [
              {
                title: "The Unification Story",
                content: "For years, customers had to choose between Meraki (cloud simplicity) and Catalyst (on-prem control). That choice is over. Cisco converges both into a single architecture: unified hardware on Silicon One ASICs, unified licensing via Cisco Networking Subscription, and a single Global Overview dashboard. New Wi-Fi 7 APs ship as one SKU that boots into either management mode. Deploy cloud-managed, on-prem, or hybrid — and switch at any time without replacing hardware.",
              },
              {
                title: "Licensing Simplification",
                content: "Cisco Networking Subscription: one license covering Wireless, Switching, and WAN across Essentials and Advantage tiers. Portable across management modes. 36–84 month terms. No more per-device, per-feature licensing complexity.",
              },
              {
                title: "Post-Quantum & Secure Routers",
                content: "Cisco 8000 Secure Routers deliver single-box branch WAN with native SD-WAN, L7 NGFW, and post-quantum cryptography at 3x prior throughput. New form factors for Europe: DSL-to-fiber channel and merged Wi-Fi + 5G. IOS XE 26 includes post-quantum capabilities across the portfolio.",
              },
            ],
          },
          projects: [
            { name: "Smart Switches (C9350/C9610)", detail: "Silicon One-powered switches manageable via Meraki Dashboard or Catalyst Center — same hardware, customer chooses management mode" },
            { name: "Global Overview Dashboard", detail: "Single cloud dashboard providing unified visibility into both Meraki and Catalyst Center-managed networks" },
            { name: "Cisco Networking Subscription", detail: "One license covering Wireless, Switching, and WAN across Essentials and Advantage tiers — portable across management modes, 36–84 month terms" },
            { name: "Cisco 8000 Secure Routers", detail: "Single-box branch WAN with native SD-WAN, L7 NGFW, and post-quantum cryptography at 3x prior throughput. New DSL-to-fiber and Wi-Fi + 5G form factors" },
            { name: "Wi-Fi 7 Portfolio (CW9172I / CW9179F)", detail: "Single-SKU dual-mode APs for branches, clinics, stadiums, and high-density campus environments — with built-in ThousandEyes active testing" },
          ],
        },
        {
          id: "n3",
          name: "Security Fused into the Campus Network",
          pillar: "Security Fused into the Network",
          tagline: "Zero trust from the switch port to the agent.",
          description: "When hundreds of thousands of agents operate at machine speed across the workplace, security can't be bolted on — it must be woven into the infrastructure. Cisco extends zero trust from human-to-application to agent-to-agent and agent-to-application. Identity Intelligence dynamically assesses behavior, not static entitlements. AI Defense protects agents from the world. Secure Access protects the world from agents. The hybrid mesh firewall enforces policy on smart switches with DPUs — packet inspection where packets flow, no extra hops. Single-vendor SASE brings world-class SD-WAN and SSE together.",
          detail: {
            sections: [
              {
                title: "The Agent Security Challenge",
                content: "With chatbots, you worry about what they say. With agents, you worry about what they do. Hundreds of thousands of agents operating at machine speed, ingrained in every business process. Two challenges: protect agents from the world (jailbreaking, prompt injection, model manipulation) and protect the world from agents (guardrails so agents can't take harmful actions). Agents must go through the same qualification as human employees: skills validation, background checks, ongoing reviews.",
              },
              {
                title: "AI Defense & MCP Protection",
                content: "AI Defense scans the entire end-to-end agent supply chain — from model selection to MCP server to runtime execution. Algorithmic model validation, runtime guardrails, and continuous protection for agents and models. Native visibility and protection for MCP servers: scan, monitor behavior, intercept when needed. Available mid-2025.",
              },
              {
                title: "Hybrid Mesh Firewall & Smart Switches",
                content: "Fully refreshed firewall lineup from branch to cloud — price/performance leadership in every category. Hybrid mesh firewall combines physical and virtual firewall with Secure Workload, HyperShield, and third-party products from one management plane. The disruptive piece: enforcement on smart switches with data processing units. Packet inspection on the same device where packets flow — low latency, no extra hops. Security enforced on a top-of-rack switch, on a server, or next to the kernel. No one else in the industry has this.",
              },
              {
                title: "Single-Vendor SASE",
                content: "World-class SD-WAN and SSE brought together — because agentic AI demands bandwidth-hungry operations at machine scale, and 'good enough' networking alongside great security is no longer sufficient. Identity Intelligence uses dynamic behavioral assessment rather than static entitlements. One of the fastest-growing products in Cisco history.",
              },
            ],
          },
          projects: [
            { name: "AI Defense", detail: "Scans the entire agent supply chain from model selection to MCP server to runtime. Algorithmic model validation, runtime guardrails, and continuous protection. Native MCP server visibility: scan, monitor, intercept" },
            { name: "Identity Intelligence & Secure Access", detail: "Every device, person, and agent connected to any application with zero trust. Dynamic behavioral assessment, not static entitlements. Native agent protection available mid-2025. Agents treated like employees: validated, monitored, reviewed" },
            { name: "Hybrid Mesh Firewall on Smart Switches", detail: "Enforcement on switches with data processing units. HyperShield runs on the same device where packets flow — low latency, no extra hops. Security enforced at the top-of-rack switch, on a server, or next to the kernel. No one else has this" },
            { name: "Single-Vendor SASE", detail: "World-class SD-WAN + SSE in one solution. Fully refreshed firewall lineup from branch to cloud with price/performance leadership. Traffic inspection optimized for bandwidth-hungry agentic operations at machine scale" },
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
      detail: {
        sections: [
          {
            title: "Connected Intelligence",
            content: "The Connected Intelligence vision connects people to people, people to AI, and AI to AI — all secured on Cisco infrastructure. As agentic AI matures, collaboration shifts from humans scheduling meetings to agents orchestrating workflows, surfacing context, and taking action on behalf of users. Webex is the platform where this human-agent collaboration happens.",
          },
          {
            title: "Market Leadership",
            content: "Gartner Magic Quadrant Leader for UCaaS (7 consecutive years) and Meeting Solutions (12 consecutive years). Omdia named Cisco best-in-class for Smart Collaboration Devices 2025. IDC MarketScape Leader for CCaaS. 18M+ Webex Calling users across 190+ markets. 99.999% SLA.",
          },
        ],
      },
      initiatives: [
        {
          id: "c1",
          name: "AI-Powered Meetings & Calling",
          pillar: "AgenticOps for Operational Simplicity",
          tagline: "Every interaction smarter. Migrate at your own pace.",
          description: "Webex embeds AI across every interaction — summaries, real-time translation in 50+ languages, action items, and agentic capabilities including Task Agent, Polling Agent, Meeting Scheduler, and Translator Agent. As the only vendor supporting cloud, on-prem, and hybrid calling with full feature parity, Cisco gives organizations a path forward at any stage of their cloud journey. 18M+ Webex Calling users across 190+ markets.",
          detail: {
            sections: [
              {
                title: "AI Across Every Interaction",
                content: "Webex AI Assistant provides real-time transcription, meeting summaries, action items, and catch-me-up in 50+ languages. Ask AI Assistant searches across all prior calls, meetings, and messages. Agentic capabilities go further: Task Agent follows up on action items, Polling Agent gauges sentiment during meetings, Meeting Scheduler coordinates across calendars and time zones, Translator Agent provides real-time interpretation.",
              },
              {
                title: "Calling Flexibility",
                content: "Cisco is the only vendor supporting cloud, on-prem, and hybrid calling with full feature parity. The industry-first Hybrid model lets UCM customers keep on-prem infrastructure while gaining cloud AI features incrementally. No forced migration. 18M+ users across 190+ markets. 99.999% SLA.",
              },
            ],
          },
          projects: [
            { name: "AI Assistant for Webex", detail: "Real-time transcription, meeting summaries, action items, and catch-me-up in 50+ languages — plus Ask AI Assistant to search across all prior calls, meetings, and messages" },
            { name: "Webex Calling (Cloud / Hybrid / On-Prem)", detail: "99.999% SLA — industry-first Hybrid model lets UCM customers keep on-prem infrastructure while gaining cloud AI features incrementally" },
            { name: "AI Receptionist", detail: "Always-on virtual receptionist for Webex Calling — automates routine queries, transfers calls, and schedules appointments" },
            { name: "Agentic Capabilities", detail: "Task Agent, Polling Agent, Meeting Scheduler, Translator Agent — AI agents that participate in meetings and take autonomous action on behalf of users" },
          ],
        },
        {
          id: "c2",
          name: "Intelligent Workspaces & Devices",
          pillar: "AI-Ready Devices",
          tagline: "Bring people back to the office — on purpose.",
          description: "Cisco collaboration devices run RoomOS 26 powered by NVIDIA — transforming rooms into AI-powered environments with Notetaker Agent for in-room transcription, Director Agent for cinematic camera views, and Audio Zones for precision capture. Devices run Webex, Microsoft Teams, Zoom, and Google Meet natively — an open-ecosystem approach analysts are actively tracking as a strategic differentiator.",
          detail: {
            sections: [
              {
                title: "RoomOS 26 + NVIDIA",
                content: "Collaboration devices run RoomOS 26 powered by NVIDIA, transforming rooms into AI-powered environments. Notetaker Agent provides in-room transcription without cloud dependency. Director Agent delivers cinematic camera framing. Audio Zones create digital sound boundaries using 64 mic elements and eight adaptive AI beams. Edge-based AI processing means intelligence lives in the room, not just the cloud.",
              },
              {
                title: "Open Ecosystem Devices",
                content: "Devices run Webex, Microsoft Teams, Zoom, and Google Meet natively — an open-ecosystem approach analysts track as a strategic differentiator. Room Bar Pro and Board Pro G2 feature dual 48MP AI cameras and multi-platform support. Customers don't have to choose a collaboration vendor to choose Cisco hardware.",
              },
              {
                title: "Cisco Spaces",
                content: "Smart workspace platform leveraging the Meraki network as a sensor — occupancy analytics, desk booking, sustainability controls, UWB asset tracking, and AI-powered indoor navigation. The network becomes the workspace intelligence platform without additional sensor hardware.",
              },
            ],
          },
          projects: [
            { name: "Room Bar Pro & Board Pro G2", detail: "Dual 48MP AI cameras, multi-platform support (Cisco Rooms + MTR/Zoom/Google Meet), edge-based AI processing" },
            { name: "Ceiling Microphone Pro", detail: "64 mic elements, eight adaptive AI beams, directional voice detection with Audio Zones for digital sound boundaries" },
            { name: "Cisco Spaces", detail: "Smart workspace platform leveraging the Meraki network as a sensor — occupancy, desk booking, sustainability controls, UWB asset tracking, and AI-powered indoor navigation" },
            { name: "RoomOS 26 AI Agents", detail: "Notetaker Agent for in-room transcription, Director Agent for cinematic framing, Audio Intelligence for meeting equity — edge-based processing powered by NVIDIA" },
          ],
        },
        {
          id: "c3",
          name: "Contact Center & Customer Experience",
          pillar: "Security Fused into the Network",
          tagline: "AI-powered CX from self-service to agent assist.",
          description: "Webex Contact Center infuses AI across the customer journey — from autonomous self-service to real-time agent assist and AI-powered quality management. Multi-agent collaboration via industry-standard A2A and MCP protocols enables interoperability with third-party AI agents. IDC MarketScape Leader for CCaaS. Native integrations with Salesforce, ServiceNow, and Epic.",
          detail: {
            sections: [
              {
                title: "AI Across the Customer Journey",
                content: "Webex Contact Center infuses AI at every stage: autonomous self-service via Webex AI Agent (50+ languages, natural language understanding, intent routing), real-time agent assist with suggested responses and mid-call summaries, automated wrap-up that eliminates after-call work, and AI quality management that scores every interaction and identifies coaching opportunities.",
              },
              {
                title: "Multi-Agent Collaboration",
                content: "Industry-standard A2A and MCP protocols enable Webex AI Agent to orchestrate with third-party agents across the enterprise. This means a customer inquiry can be handled by a Webex agent that coordinates with a Salesforce agent, a ServiceNow agent, and an internal knowledge agent — all in real time, all through open protocols.",
              },
            ],
          },
          projects: [
            { name: "Webex AI Agent", detail: "Autonomous and guided self-service with natural language understanding across 50+ languages, intent routing, and multi-agent orchestration" },
            { name: "AI Assistant for Contact Center", detail: "Suggested responses, real-time transcription, mid-call summaries, automated wrap-up, and AI quality management for agent coaching" },
            { name: "Salesforce & Epic Integrations", detail: "Bring Your Own Contact Center for Salesforce (GA Q1 2026) and Epic healthcare integration for vertical-specific CX workflows" },
            { name: "Multi-Agent Collaboration", detail: "A2A and MCP protocol support enabling Webex AI Agent to orchestrate with third-party agents across the enterprise" },
          ],
        },
      ],
    },
  ],
};
