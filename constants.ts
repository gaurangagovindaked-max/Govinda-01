import type {
  EditorialNote,
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
        'The OG Roadmap · The Complete Book: six-part inference-engineering curriculum with a 157-item implementation gauntlet.',
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
    {
      title: 'The OG Roadmap',
      category: 'Inference curriculum',
      description:
        'Six-part self-directed inference-engineering curriculum with a 157-item implementation gauntlet: mathematics, PyTorch, serving, C++ systems, CUDA/Triton, evaluation, and contribution.',
      tags: ['Education', 'CUDA', 'Serving'],
      metric: '157-item gauntlet',
      link: 'https://github.com/GC-WORK11',
      image: '',
      proof: 'Curriculum',
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
