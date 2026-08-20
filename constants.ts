import type {
  EditorialNote,
  EntCeremonyStep,
  EntReceipt,
  EntStat,
  Project,
  Publication,
  ResearchItem,
  StripCard,
} from './types';

export const RESUME = {
  header: {
    name: 'GOVINDA CHAUHAN',
    email: 'govindasince2004@gmail.com',
    location: 'Delhi, India',
    role: 'Computer Science Student',
  },

  /** Short lead under the card — simple student story, not a sales pitch. */
  worksLead:
    'A computer science student. It all started with the terminal, networks, and Linux, then languages. After that I found agents, and it is astonishing to me how machines think. Now I am all in towards machine and inference learning.',

  languages: [
    'Python',
    'Rust',
    'Go',
    'SQL',
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
  ],
  tools: [
    'PyTorch',
    'Transformers',
    'CUDA measurement',
    'PostgreSQL',
    'Redis',
    'Docker',
  ],

  education: {
    institute: 'Indian Institute of Technology Patna',
    degree: 'BS, Computer Science & Data Analytics',
    batch: 'Expected 2026',
    details:
      'Learning ML systems, software, and agent tools through research, products, and teaching.',
  },

  experience: [
    {
      role: 'Builder · independent systems',
      company: 'Software, agents & ML labs',
      duration: '2022–2026',
      description:
        'I move between products people can open and research I can measure—sessions, local agent tooling, and inference experiments on free dual-T4 hardware.',
      points: [
        'Shipped Delegators SWE Agentic API: routing, streaming, quotas, payments, artifacts, and deployment checks.',
        'Built KERNEL (financial runtime debugger), Doorway (local terminal-agent cockpit), and related product surfaces.',
        'Designed Infinity: Rust-first session hypervisor for handoffs across coding-agent harnesses.',
        'Ran Working-Set Routing experiments on a measured OLMoE parent—VRAM, throughput, and quality sealed together.',
      ],
    },
    {
      role: 'Learning & teaching',
      company: 'Student materials',
      duration: '2023–2026',
      description:
        'I teach fundamentals through projects and write long-form curricula when the notes have to stand alone.',
      points: [
        'Student-facing applied-computing material and programming exercises.',
        'Applied AI materials for students learning logic, programming, and judgment.',
      ],
      attachment: '/Applied-AI-Students.pdf',
      attachmentLabel: 'Applied AI Students book',
    },
  ],

  /** Core engineered systems — aligned to resume; calm wording. */
  projects: [
    {
      title: 'Delegators',
      category: 'Routing · streaming · payments',
      description:
        'Pay-per-session coding-agent platform with compatible API access, provider routing, streaming, quotas, admin controls, payments, artifact workflows, and deployment checks.',
      tags: ['Go', 'TypeScript', 'Sessions'],
      metric: 'Live · API · payments',
      link: 'https://delegators-client-site.vercel.app',
      image: '',
      proof: 'Live product surface',
    },
    {
      title: 'KERNEL',
      category: 'Financial runtime',
      description:
        'Debugger for autonomous purchasing: replay and fork trajectories, test assertions, and turn verified behavior into scoped Prava permissions.',
      tags: ['Runtime', 'Agents', 'Finance'],
      metric: 'Replay · assert · scope',
      link: 'https://github.com/GC-WORK11',
      image: '',
      proof: 'Live systems work',
    },
    {
      title: 'Infinity',
      category: 'Session hypervisor',
      description:
        'Rust-first design for transactional handoffs across coding-agent harnesses while preserving workspace state, artifacts, journals, and execution continuity.',
      tags: ['Rust', 'Systems', 'Agents'],
      metric: 'Handoffs · journals',
      link: 'https://github.com/GC-WORK11',
      image: '',
      proof: 'Systems design',
    },
    {
      title: 'Doorway',
      category: 'Local terminal-agent cockpit',
      description:
        'Local cockpit for terminal agents—inspectable multi-agent work, worktrees, and review flows instead of a chat scroll you cannot audit.',
      tags: ['Electron', 'Git', 'Agents'],
      metric: 'Worktrees · review',
      link: 'https://github.com/GC-WORK11/doorway',
      image: 'https://opengraph.githubassets.com/govinda-doorway/GC-WORK11/doorway',
      proof: 'Public repository',
    },
    {
      title: 'AETHER',
      category: 'Physics from video',
      description:
        'How ordinary video might become a simulation-ready model: object tracking, kinematic discovery, constraint inference, and marker-free physics extraction.',
      tags: ['Vision', 'Simulation', 'Research'],
      metric: 'Video → parameters',
      link: 'https://github.com/GC-WORK11/aether',
      image: 'https://opengraph.githubassets.com/govinda-aether/GC-WORK11/aether',
      proof: 'Architecture notes',
    },
    {
      title: 'VideoUnit',
      category: 'Generated-video evaluation',
      description:
        'Evaluation harness for generated video: temporal checks, frame-level failures, and reproducible reports.',
      tags: ['Evals', 'Video', 'CLI'],
      metric: 'Contracts · reports',
      link: 'https://github.com/GC-WORK11/video-unit',
      image: 'https://opengraph.githubassets.com/govinda-videounit/GC-WORK11/video-unit',
      proof: 'CLI + SDK',
    },
    {
      title: 'Kairo',
      category: 'Rust / MCP safety',
      description:
        'Safety concept for scoring package installs, shell commands, and CI changes before an agent runs them.',
      tags: ['Rust', 'MCP', 'Security'],
      metric: 'ALLOW · WARN · BLOCK',
      link: 'https://github.com/GC-WORK11/kairo',
      image: 'https://opengraph.githubassets.com/govinda-kairo/GC-WORK11/kairo',
      proof: 'Core + MCP',
    },
  ] as Project[],

  /** Live product surfaces — titles/links unchanged so product showcase stays intact. */
  mvpProjects: [
    {
      title: 'Delegators Client',
      category: 'Product site',
      description:
        'Public surface for coding-agent sessions: pricing, docs, account, and purchase.',
      tags: ['React', 'Vite', 'TypeScript', 'Node.js', 'Cloudflare'],
      metric: 'Sessions · pricing · account',
      link: 'https://delegators-client-site.vercel.app',
      image: '',
      proof: 'Live product surface for governed agent sessions.',
    },
    {
      title: 'Delegators Workbench',
      category: 'Artifacts',
      description:
        'Workspace for resumes, reports, decks, sheets, and PDFs that come out of a session plan.',
      tags: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Supabase'],
      metric: 'Plan → document workspace',
      link: 'https://delegators-workbench.vercel.app',
      image: '',
      proof: 'Live artifact workspace.',
    },
    {
      title: 'Remote-os',
      category: 'WebOS prototype',
      description:
        'Browser-based desktop shell: wallpaper, dock, windows, files, terminal—student computer access as a product story.',
      tags: ['React', 'Vite', 'TypeScript', 'Node.js'],
      metric: 'Desktop metaphor',
      link: 'https://virtual-os-iota.vercel.app',
      image: '',
      proof: 'Live WebOS product demo.',
    },
    {
      title: 'Doorway IDE',
      category: 'Multi-model thread',
      description:
        'Several models in one thread through native CLIs—one thin surface for comparison.',
      tags: ['React', 'TypeScript', 'Node.js', 'Go'],
      metric: 'Native CLI routing',
      link: 'https://doorway-ide.vercel.app/',
      image: '',
      proof: 'Live multi-model client.',
    },
    {
      title: 'CEO Hunt',
      category: 'Founder discovery',
      description:
        'Tool for connecting founders, investors, and operators on a calm product surface.',
      tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Supabase'],
      metric: 'Founder · investor · ops',
      link: 'https://ceohunt.vercel.app/',
      image: '',
      proof: 'Live marketplace surface.',
    },
    {
      title: 'Flow Pitch',
      category: 'Pitch workflow',
      description:
        'Mobile-first agent pitch surface—workflows that fit a pocket, not only a desktop IDE.',
      tags: ['React', 'Vite', 'TypeScript', 'Node.js'],
      metric: 'Mobile agent UI',
      link: 'https://flow-pitch.vercel.app/',
      image: '',
      proof: 'Live pitch concept.',
    },
  ] as Project[],

  weekendProjects: [
    {
      title: 'Flow Pitch',
      category: 'Weekend surface',
      description: 'Pocket-scale agent UI experiment shipped as a live pitch site.',
      tags: ['React'],
      metric: 'Shipped weekend',
      link: 'https://flow-pitch.vercel.app/',
      image: '',
      proof: 'Live',
    },
    {
      title: 'Remote-os',
      category: 'Product prototype',
      description: 'Full WebOS metaphor built to explain student computer access as a product story.',
      tags: ['React'],
      metric: 'Interactive prototype',
      link: 'https://virtual-os-iota.vercel.app',
      image: '',
      proof: 'Live',
    },
    {
      title: 'Doorway IDE',
      category: 'Tooling',
      description: 'Quick multi-CLI model thread for comparing agents without a heavy desktop install.',
      tags: ['React'],
      metric: 'Thin client',
      link: 'https://doorway-ide.vercel.app/',
      image: '',
      proof: 'Live',
    },
  ] as Project[],

  /** Publications-style list — no fake venues/DOIs. */
  publications: [
    {
      year: '2026',
      title: 'Working-Set Routing for Memory-Constrained MoE Inference',
      venue: 'Working paper · 2× Tesla T4 · measured 6.78B OLMoE parent',
      summary:
        'Expert retention, 64-to-32 fusion, router recovery, and exact paging. Strongest static run: 53.7% less allocated VRAM, 1.08× suite throughput, 80.7% of an exploratory within-run quality score. Static removal hurt behavior; exact paging stayed exact but transfer-bound—now guiding a confidence-aware ActiveSet design.',
      link: 'https://active-parameter-runtime.govindach-iitp.chatgpt.site/',
      kind: 'lab-notes',
    },
    {
      year: '2025',
      title: 'AETHER: Marker-free physics extraction from mechanism video',
      venue: 'Architecture notes · public repository',
      summary:
        'Ordinary video toward a simulation-ready model: tracking, kinematic discovery, constraint inference, and marker-free physics extraction.',
      link: 'https://github.com/GC-WORK11/aether/blob/main/ARCHITECTURE.md',
      kind: 'architecture',
    },
    {
      year: '2025',
      title: 'VideoUnit: temporal contracts for generative video',
      venue: 'Systems note · evaluation framework',
      summary:
        'Executable checks over generated video timelines, frame-level failure localization, and reproducible scoring.',
      link: 'https://github.com/GC-WORK11/video-unit',
      kind: 'artifact',
    },
    {
      year: '2024',
      title: 'fConnect: quick-commerce dynamics in India',
      venue: 'Market analysis',
      summary:
        'A quiet look at rapid-delivery models and market structure—analysis, not a pitch.',
      link: '/Connect.pdf',
      kind: 'analysis',
    },
  ] as Publication[],

  research: [
    {
      title: 'Working-Set Routing — paper site',
      subtitle: 'MoE lab · hosted paper',
      points: [
        'Memory-constrained MoE on free dual-T4 with sealed VRAM, throughput, and quality.',
        'Open the long-hosted research site for the full write-up and notes.',
      ],
      link: 'https://active-parameter-runtime.govindach-iitp.chatgpt.site/',
    },
    {
      title: 'Working-Set Routing — PDF',
      subtitle: 'Working paper · PDF',
      points: [
        'PDF of Working-Set Routing for Memory-Constrained MoE Inference.',
        '53.7% VRAM cut, 1.08× suite TPS, ~80.7% quality on the best static run—honest misses included.',
      ],
      link: 'https://active-parameter-runtime.govindach-iitp.chatgpt.site/working-set-routing-paper.pdf',
    },
    {
      title: 'Applied AI Students Book',
      subtitle: 'Education · PDF',
      points: [
        'Materials from teaching computing fundamentals with practical exercises.',
        'For students learning logic, programming, and calm product judgment.',
      ],
      link: '/Applied-AI-Students.pdf',
    },
    {
      title: 'AETHER architecture',
      subtitle: 'Physics from video',
      points: [
        'Pipeline for kinematic structure and parameters from mechanism video.',
        'Segmentation, tracking, discovery, simulation-ready models.',
      ],
      link: 'https://github.com/GC-WORK11/aether/blob/main/ARCHITECTURE.md',
    },
    {
      title: 'fConnect',
      subtitle: 'Market analysis',
      points: [
        'Quick-commerce patterns in India.',
        'Delivery models and market dynamics.',
      ],
      link: '/Connect.pdf',
    },
  ] as ResearchItem[],

  /**
   * Measured numbers for figures only — aligned with resume working paper.
   */
  measuredBreed: {
    fatherVramGb: 12.533,
    childVramGb: 5.798,
    vramRatio: 0.463,
    qualityRatio: 0.807,
    pureTpsX: 1.08,
    nExpertsFather: 64,
    nExpertsChild: 32,
    parent: 'measured 6.78B OLMoE parent',
  },

  editorialNotes: [
    {
      id: 'aether-pipeline',
      title: 'AETHER in one page',
      dek: 'From ordinary video toward parameters a simulator can run.',
      body: [
        'I explored how a mechanism on film could become a simulation-ready model: track parts, recover kinematics, infer constraints, and extract physics without markers.',
        'The architecture notes stay the source of truth—quiet engineering, not a trailer.',
      ],
      pipeline: [
        'Video',
        'Segment',
        'Track',
        'Kinematics',
        'Parameters',
        'Simulate',
      ],
      link: 'https://github.com/GC-WORK11/aether/blob/main/ARCHITECTURE.md',
      linkLabel: 'Architecture notes',
    },
    {
      id: 'breed-pareto',
      title: 'Working-Set Routing on dual-T4',
      dek: 'VRAM · quality · throughput—measured together, without slogans.',
      body: [
        'On a measured 6.78B-parameter OLMoE parent I tested expert retention, 64-to-32 fusion, router recovery, and exact paging under free dual-T4 memory limits.',
        'The strongest static run cut allocated VRAM by about 53.7%, reached 1.08× suite throughput, and kept about 80.7% of an exploratory within-run quality score. Removing weights is not the same as preserving their computation: static removal damaged behavior; exact paging stayed exact but became transfer-bound. That tension now guides a confidence-aware ActiveSet design.',
      ],
      figure: {
        id: 'breed-bars',
        caption:
          'Parent-relative metrics from dual-T4 static runs (lower VRAM ratio is better; quality and TPS are ratios vs parent).',
        bars: [
          { label: 'VRAM (child/parent)', value: 0.46, note: '↓ better' },
          { label: 'Quality ratio', value: 0.81, note: '↑ better' },
          { label: 'Suite TPS ×', value: 1.08, note: '↑ better' },
        ],
        maxValue: 1.2,
      },
      pipeline: [
        'Parent suite',
        'Retain / fuse',
        'Router recover',
        'Exact page',
        'Seal q / V / t',
      ],
      link: 'https://active-parameter-runtime.govindach-iitp.chatgpt.site/',
      linkLabel: 'Paper site',
    },
  ] as EditorialNote[],

  vision: {
    startup: 'Delegators',
    tagline: 'Student · learning in public.',
    description:
      'Networks and Linux first, then code and small tools, then agents—and now machine learning and inference. Still a student; still learning.',
  },

  /**
   * ENT — the flagship system. Every sentence and number here is measured
   * and traceable to the trial logs (Rules.prd R10: no invented numbers).
   * Copy lives in this file so the component stays pure presentation.
   */
  ent: {
    kicker: '00 · flagship system · private build',
    headline: 'Why is everybody talking about inference?',
    subhead:
      'Strip away the hype and AI software is one thing: turning electricity and silicon into tokens. Tokens are the unit every product pays in. This is the story of why that makes compute the next gold — and what happens when you make a machine that mints it out of laptops people already own.',

    gold: {
      title: 'Compute is the next gold',
      beats: [
        'Every AI product — every chat, every agent, every search — pays for its existence in tokens. Tokens are made in exactly one way: GPUs and servers running the model. When a whole economy pays in one commodity, the commodity becomes a currency. That is what inference is now: the currency of AI.',
        'Currencies concentrate. The weights of the best open models are free to download — frontier-scale, improving every month — but running them takes datacenter hardware that a handful of companies own. Open weights, closed compute. You can own the recipe and still not be allowed to cook.',
        'Like every gold, there is a reserve nobody is counting. The largest pool of computing power on the planet is not in a datacenter — it is laptops. Millions of them, idle most of the day, already paid for, plugged into wall power and home Wi-Fi. They are scattered, they are small, and above all: they do not trust each other.',
        'This is the page where the story of that reserve begins. Ent is my attempt to unlock it — a runtime that turns untrusted laptops into one temporary, encrypted computer, big enough to run an open model no single laptop can hold.',
      ] as string[],
    },

    problem: {
      title: 'The problem',
      paras: [
        'The models are open now — anyone can download frontier-scale weights. But a laptop holds 8–16 GB, and the models that matter are 60–200 GB. So the only way to actually run them is rented datacenter hardware, metered by the hour.',
        'Meanwhile the largest pool of computing power on the planet sits idle in laptops people already own. Those machines could hold the model together. They can’t team up today for one reason: trust. Nobody’s laptop should run a stranger’s code, and no stranger should be able to poison the computation.',
      ],
    },

    catch: {
      title: 'The catch',
      paras: [
        'Solving bandwidth alone is a solved problem. The hard part is that the machines volunteering their hardware are strangers to each other — a volunteer can crash, lie about its hardware, or quietly return wrong numbers, and a hostile host could try to read the volunteer’s machine.',
        'Every prior system dodged this by trusting its participants. Petals pools machines but is explicit that it cannot run untrusted code. llama.cpp ships the RPC plumbing with no trust layer at all. Nobody shipped the whole stack — because each layer is its own engineering project.',
      ],
    },

    idea: {
      title: 'The idea',
      paras: [
        'Ent treats trust as the product. A ten-law constitution (R1–R10) governs every session: the volunteer’s compute lives in a sandbox that touches nothing on disk; nothing persists after the session ends — the scratch space is a tmpfs that dies with the process, so the wipe is true by construction, not by cleanup.',
        'Consent and ownership are enforced, not promised: never more than 60% of a volunteer’s RAM is donated, a local thermal governor can throttle or walk away even against the host’s wishes, and one button ends everything. Every join generates a fresh cryptographic identity, and the volunteer’s hardware report is signed — lying about your machine is detectable.',
        'On top of that trust floor, pooled inference runs the way pipelines should: layer ranges are assigned by measured capability, activations are double-buffered so transfer overlaps compute, and every token is validated. About 23,000 lines of Rust across nine crates, and a gate that refuses to merge a single “TODO”.',
      ],
    },

    trialIntro: {
      title: 'The trial',
      lead: 'Two laptops, two different home networks, the open internet between them. The volunteer machine was a stock Windows 10 laptop whose hardware nobody had told the host — it measured itself.',
    },

    stats: [
      { v: '3 ms', k: 'link round-trip across two home networks' },
      { v: '26/26', k: 'tokens decoded · zero degradation events' },
      { v: '64%', k: 'of the model’s layers held by the volunteer' },
      { v: '283.6 MiB', k: 'of weights streamed over the air to it' },
      { v: '54 ms', k: 'mean steady token · about 18.5 tok/s' },
      { v: '60%', k: 'RAM cap — the volunteer kept the rest for its owner' },
    ] as EntStat[],

    ceremony: [
      { step: 'Invite', line: 'one code carries the session, rendezvous, host key and expiry' },
      { step: 'Measure', line: 'the laptop probes its own RAM, CPU, GPU, disk, battery — and signs the report' },
      { step: 'Admit', line: 'host verifies the signature against the floor; assigns a tier' },
      { step: 'Shard', line: 'layers split by measured capability, not by promise' },
      { step: 'Decode', line: 'tokens cross the wire per-token, every one measured' },
      { step: 'Wipe', line: 'sandbox scratch dies with the session; nothing persists' },
    ] as EntCeremonyStep[],

    trialStory: [
      'The volunteer installed a single executable, joined through an encrypted rendezvous, and its signed report arrived at the host: 12th-gen i5, 7,860 MiB of RAM, integrated graphics, on battery. The host kept 9 layers of the model; the laptop took 16 — almost two-thirds of every token flowed through a machine the host had never seen before.',
      'Weights streamed over the air, tokens flowed back, and when the host closed the session the volunteer wiped its scratch space and exited. The whole ceremony is measured end-to-end; every number on this page comes from those logs.',
    ],

    finding: {
      title: 'The finding',
      paras: [
        'The single most important result is that the trust stack costs almost nothing. With the model split across two home networks, the volunteer leg decoded tokens in a flat 50–61 ms band — while running at half duty, because Windows could not expose its thermal sensors and the governor chose the safe default. The physics of overlapping transfer with compute roughly halves the cost of distance (+0.99 → +0.48 ms of decode per added ms of round-trip), which is why a volunteer on ordinary Wi-Fi is viable at all.',
        'Equally: the ceremony mechanics — encrypted join, honest hardware reporting, capability-based sharding, mandatory wipe — all survived first contact with a real consumer Windows machine. That is the boring result that matters most: nothing about the trust floor broke when it met reality.',
      ],
    },

    receipts: [
      {
        name: 'Quorum',
        body: 'A poisoned leg was caught at the very first token — output delta 1.176 against a 1e-6 tolerance — ejected in 0.863 s, and the surviving leg finished bit-identical.',
      },
      {
        name: 'Live re-slice',
        body: 'A running decode was re-split across machines mid-stream: a 1.3–1.8 s stall, then logits resumed bit-identical. The model moved without a restart.',
      },
      {
        name: 'Wipe',
        body: 'When the host died, the volunteer wiped itself. Four disk-diff audits across full ceremonies found zero agent-attributable artifacts.',
      },
    ] as EntReceipt[],

    claim: {
      title: 'What is new here',
      paras: [
        'Pooling machines for inference is not new — Petals did it in 2022, and llama.cpp ships the plumbing. What no shipped system has done is hold the whole trust stack at once: untrusted volunteers running sandboxed, consent-scoped compute, with per-token quorum validation, live re-slicing, and a wipe that is true by construction.',
        'As far as my prior-art audit can find, the August 2026 run is the first measured demonstration of real pooled inference by an untrusted volunteer machine over the open internet under that entire stack — measured on two laptops, with every number traceable to logs.',
      ],
    },

    limits: {
      title: 'What it is not yet',
      items: [
        'The 0.5B model was the proof vehicle, not the target. The destination is a Flash-class MoE around 160 GB, which needs roughly 17–20 such laptops or one rented GPU session — hardware-gated, honestly.',
        'Quorum ran on local Linux legs; the wide-area version with two remote volunteers is the next unit of work.',
        'The sandboxed Windows worker path is still open — this trial used the documented conformance path.',
      ] as string[],
    },

    footer: 'R1–R10 constitution · 9 crates · ~23k LOC Rust · 306 tests green · private while the trial phase runs',
  },
};

/**
 * 21st.dev Ribbon Field — exact CSS body (matches styles/ribbonField.css).
 * Tests assert these tokens; do not invent a different palette.
 */
export const RIBBON_FIELD_CSS_SNIPPET = `
.ribbon-field-gradient {
  background-color: #1D62D7;
  background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.500'/></svg>"), radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0) 52%, rgba(0, 0, 0, 0.32000000000000006) 100%), linear-gradient(135deg, #1D62D7 0.91%, #1D62D7 42.59%, #C3CFEA 43.89%, #C3CFEA 48.11%, #3CC1F6 48.89%, #3CC1F6 56.11%, #1839A7 58.19%, #1839A7 79.81%, #1E788A 81.5%, #1E788A 100%);
  background-size: 120px 120px, auto, auto;
  background-blend-mode: overlay, normal, normal;
}
`.trim();

export const RIBBON_FIELD = {
  colors: ['#3CC1F6', '#C3CFEA', '#1D62D7', '#1839A7', '#1E788A'] as const,
  angle: 135,
  softness: 26,
  wave: 12,
  grain: 100,
  backdrop: '#1D62D7',
};

export const FORBIDDEN_COPY = [
  'hire me',
  'open to work',
  'looking for opportunities',
  'world-class vibecoder',
  'i am a vibe',
  'please hire',
];
