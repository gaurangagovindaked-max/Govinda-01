
export const RESUME = {
  header: {
    name: "GOVINDA CHAUHAN",
    email: "govindach.iitp@gmail.com",
    location: "Delhi, India",
    role: "Software Engineer & AI Researcher"
  },
  summary: "Full-stack software engineer and AI systems developer. Building tools, public repos, and measured behavior.",
  languages: [
    "Typescript",
    "Python",
    "Rust",
    "Golang",
    "React",
    "Vite",
    "Flutter",
    "React Native"
  ],
  tools: [
    "pi",
    "hermes agent",
    "claude",
    "codex",
    "Cloudflare"
  ],
  education: {
    institute: "Indian Institute of Technology Patna",
    degree: "BS in Computer Science & Data Analytics",
    batch: "2026",
    details: "Computer Science and Data Analytics foundation, with independent work across AI agents, evaluation systems, simulation, computer vision, and high-velocity product engineering."
  },
  experience: [
    {
      role: "Software Engineer",
      company: "Independent",
      duration: "2022–2026",
      description: "Developed and maintained full-stack applications and AI systems.",
      points: [
        "Built Doorway, Kairo, CHIMERA, AETHER, VideoUnit, Flow Mobile, and CEO Hunt.",
        "Engineered production-grade environments handling full-stack pipelines, mobile control surfaces, and custom automations.",
        "Built local-first desktop infrastructure, research prototypes, and pre-execution supply chain security layers."
      ]
    },
    {
      role: "Educator / Author",
      company: "Delhi",
      duration: "2023–2024",
      description: "Taught computing fundamentals while experimenting with AI-assisted learning systems and practical student-facing software.",
      points: [
        "Designed AI-aware learning modules and technical exercises.",
        "Mentored students in logic, programming fundamentals, and product thinking.",
        "Built the early conviction that education software should adapt to the learner, not the other way around."
      ],
      attachment: "/Applied-AI-Students.pdf",
      attachmentLabel: "Download Applied AI Students Book"
    }
  ],
  projects: [
    {
      title: "Doorway (Agent OS)",
      category: "Agent Cockpit",
      description: "Local-first desktop cockpit for terminal agents, git worktrees, review/merge flows, plugins, and visible automation. Built for the next generation of agentic development.",
      tags: ["Electron", "Agents", "Worktrees"],
      metric: "Desktop OS for agents",
      link: "https://github.com/GC-WORK11/doorway",
      image: "https://opengraph.githubassets.com/govinda-doorway/GC-WORK11/doorway",
      proof: "Public repo"
    },
    {
      title: "AETHER",
      category: "Physics Intelligence",
      description: "Marker-free physics extraction from video: discover kinematic structure, estimate parameters, and produce simulation-ready models from observed motion.",
      tags: ["Vision", "MuJoCo", "Research"],
      metric: "Video → physics model",
      link: "https://github.com/GC-WORK11/aether",
      image: "https://opengraph.githubassets.com/govinda-aether/GC-WORK11/aether",
      proof: "Benchmarks + architecture docs"
    },
    {
      title: "VideoUnit",
      category: "AI Video Evals",
      description: "Executable testing framework for AI-generated videos. Converts prompts into temporal assertions, finds frame-level failures, scores behavior, and emits reproducible reports.",
      tags: ["Evals", "Video", "Testing"],
      metric: "Prompts → contracts",
      link: "https://github.com/GC-WORK11/video-unit",
      image: "https://opengraph.githubassets.com/govinda-videounit/GC-WORK11/video-unit",
      proof: "CLI + SDK + reports"
    },
    {
      title: "Kairo",
      category: "Agent Safety",
      description: "Real-time cloud intelligence layer that checks package installs, terminal commands, and CI/CD changes against live software risk data before agents execute them.",
      tags: ["Rust", "MCP", "Security"],
      metric: "Risk gate for AI coding",
      link: "https://github.com/GC-WORK11/kairo",
      image: "https://opengraph.githubassets.com/govinda-kairo/GC-WORK11/kairo",
      proof: "CLI + MCP + GitHub Action"
    },
    {
      title: "CHIMERA",
      category: "Research Engine",
      description: "Autonomous multi-agent research workflow: scouts literature, reads PDFs, runs experiments, synthesizes reports, and critiques its own output.",
      tags: ["Python", "Research", "Agents"],
      metric: "7-agent pipeline",
      link: "https://github.com/GC-WORK11/chimera",
      image: "https://opengraph.githubassets.com/govinda-chimera/GC-WORK11/chimera",
      proof: "Research automation"
    }
  ],
  mvpProjects: [
    {
      title: "Doorway IDE",
      category: "Development Tool",
      description: "Product designed from idea to MVP to pitch.",
      tags: ["React"],
      metric: "IDE Environment",
      link: "https://doorway-ide.vercel.app/",
      image: "",
      proof: "Live site"
    },
    {
      title: "CEO Hunt",
      category: "Startup Marketplace",
      description: "Product designed from idea to MVP to pitch. Platform for founders, investors, and operators.",
      tags: ["React"],
      metric: "Founder/investor graph",
      link: "https://ceohunt.vercel.app/",
      image: "",
      proof: "Live site"
    },
    {
      title: "Flow Pitch",
      category: "Mobile",
      description: "Product designed from idea to MVP to pitch.",
      tags: ["React", "Vite"],
      metric: "Pitch tool",
      link: "https://flow-pitch.vercel.app/",
      image: "",
      proof: "Live site"
    },
    {
      title: "Flow DDSAS",
      category: "Web Application",
      description: "Product designed from idea to MVP to pitch.",
      tags: ["React"],
      metric: "Web Interface",
      link: "https://flow-ddsas.vercel.app/",
      image: "",
      proof: "Live site"
    }
  ],
  research: [
    {
      title: "AETHER Architecture",
      subtitle: "Physics from Video",
      points: [
        "Research program for extracting exact physical parameters from mechanism videos.",
        "Combines segmentation, tracking, kinematic discovery, differentiable simulation, and benchmark design."
      ],
      link: "https://github.com/GC-WORK11/aether/blob/main/ARCHITECTURE.md"
    },
    {
      title: "VideoUnit PRD",
      subtitle: "Testing AI Video",
      points: [
        "Defines temporal contracts for AI-generated video behavior rather than relying on subjective visual judgment.",
        "Frames video evaluation as executable assertions, failure localization, scoring, and reproducible evidence."
      ],
      link: "https://github.com/GC-WORK11/video-unit/blob/main/VIDEOUNIT_PRD.md"
    },
    {
      title: "Kairo Risk Layer",
      subtitle: "Agent Supply Chain Safety",
      points: [
        "Designs a pre-execution risk gate for AI coding agents touching packages, shell commands, and CI workflows.",
        "Connects live risk sources such as advisories and package metadata to developer tooling."
      ],
      link: "https://github.com/GC-WORK11/kairo"
    },
    {
      title: "CHIMERA Workflow",
      subtitle: "Multi-Agent Research",
      points: [
        "Models research as a coordinated pipeline of scout, reader, experimenter, synthesizer, critic, and formatter agents.",
        "Built to produce cited reports, runnable experiments, and adversarial review loops."
      ],
      link: "https://github.com/GC-WORK11/chimera"
    }
  ],
  vision: {
    startup: "Doorway",
    tagline: "From apps to orchestration, and now all-in on building the future of agentic harness.",
    description: "The long-term arc: make AI systems observable, testable, and useful enough to become infrastructure. Not demos. Not pitch-deck vapor. Working tools, public repos, measured behavior, and products that compound."
  }
};
