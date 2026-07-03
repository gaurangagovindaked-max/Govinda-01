
export const RESUME = {
  header: {
    name: "GOVINDA CHAUHAN",
    email: "govindasince2004@gmail.com",
    location: "Delhi, India",
    role: "Software Engineer, AI Systems & Automation Agents"
  },
  summary: "IIT Patna BS student and software engineer building AI-assisted developer tools, automation agents, full-stack web systems, and practical product infrastructure. I like systems that work with real tools: Claude Code, Codex-style clients, Cursor-like IDE flows, Cline, Continue, Roo, and the messy workflows developers actually use.",
  languages: [
    "Typescript",
    "Python",
    "Rust",
    "Golang",
    "Node.js",
    "Next.js",
    "React",
    "Vite",
    "Flutter",
    "React Native",
    "Electron"
  ],
  tools: [
    "pi",
    "hermes agent",
    "claude",
    "codex",
    "cursor",
    "Cloudflare",
    "Ubuntu"
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
        "Built Delegators, Doorway, Kairo, CHIMERA, AETHER, VideoUnit, Flow Mobile, and CEO Hunt.",
        "Created AI agents for personal automation, coding workflows, PR review support, research assistance, and repetitive operational tasks.",
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
      title: "Delegators",
      category: "AI Coding Platform",
      description: "Pay-per-session platform for running AI coding tools with governed sessions. It issues short-lived keys for OpenAI-compatible clients, routes model providers, tracks quota/cost, and connects a public pricing site with a Workbench for generated artifacts.",
      tags: ["Go", "TypeScript", "Agents"],
      metric: "Coding tools → governed sessions",
      link: "https://delegators-client-site.vercel.app",
      image: "",
      proof: "Live client site + Workbench"
    },
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
      title: "Delegators Client Site",
      category: "AI Coding Platform",
      description: "Public product, pricing, docs, account, and purchase portal for Delegators coding-agent sessions.",
      tags: ["React", "Vite"],
      metric: "Live product site",
      link: "https://delegators-client-site.vercel.app",
      image: "",
      proof: "Live site"
    },
    {
      title: "Delegators Workbench",
      category: "Artifact Agent",
      description: "Artifact workspace connected to Delegators plans for resumes, reports, decks, sheets, PDFs, and document workflows.",
      tags: ["React", "Node"],
      metric: "Artifact workspace",
      link: "https://delegators-workbench.vercel.app",
      image: "",
      proof: "Live site"
    },
    {
      title: "Remote-os",
      category: "Browser Linux Desktop",
      description: "A webOS-style product for opening a remote Linux desktop from the browser, with a clean desktop shell, dock, file windows, terminal, and student-friendly access flow.",
      tags: ["React", "Vite", "Linux"],
      metric: "Phone/browser -> Linux desktop",
      link: "https://virtual-os-iota.vercel.app",
      image: "",
      proof: "Live site"
    },
    {
      title: "Doorway IDE",
      category: "Development Tool",
      description: "Multiple models in one thread through their native CLI",
      tags: ["React"],
      metric: "IDE Environment",
      link: "https://doorway-ide.vercel.app/",
      image: "",
      proof: "Live site"
    },
    {
      title: "CEO Hunt",
      category: "Startup Marketplace",
      description: "A marketplace platform connecting founders, investors, and operators.",
      tags: ["React"],
      metric: "Founder/investor graph",
      link: "https://ceohunt.vercel.app/",
      image: "",
      proof: "Live site"
    },
    {
      title: "Flow Pitch",
      category: "Mobile",
      description: "Mobile-first agent interface concept for carrying AI workflows in your pocket.",
      tags: ["React", "Vite"],
      metric: "Mobile UI",
      link: "https://flow-pitch.vercel.app/",
      image: "",
      proof: "Live site"
    }
  ],
  research: [
    {
      title: "Paper Resume",
      subtitle: "ATS-Friendly PDF",
      points: [
        "One-page software engineering resume with project links, Delegators, Remote-os, Doorway, Flow, CEO Hunt, and Workbench references.",
        "Designed for HR screening while keeping the claims grounded in shipped and prototype work."
      ],
      link: "/Govinda_Chauhan_Paper_Resume.pdf"
    },
    {
      title: "AETHER Architecture",
      subtitle: "Physics from Video",
      points: [
        "Architecture for extracting exact physical parameters from mechanism videos.",
        "Combines segmentation, tracking, kinematic discovery, differentiable simulation, and benchmark design."
      ],
      link: "https://github.com/GC-WORK11/aether/blob/main/ARCHITECTURE.md"
    },
    {
      title: "fConnect",
      subtitle: "E-Commerce Market Analysis",
      points: [
        "A deeper look into the quick e-commerce market disruption of India.",
        "Analysis of rapid delivery models and market dynamics."
      ],
      link: "/Connect.pdf"
    }
  ],
  vision: {
    startup: "Delegators",
    tagline: "From apps to orchestration, now focused on practical AI coding infrastructure.",
    description: "The long-term arc: make AI systems observable, testable, and useful enough to become infrastructure. The work is moving from demos toward tools that fit real developer workflows, team review loops, and product-quality automation."
  }
};
