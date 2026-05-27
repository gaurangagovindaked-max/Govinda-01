import React from 'react';
import { Theme } from '../types';

interface TechStackProps {
  theme: Theme;
}

export const TechStack: React.FC<TechStackProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  const categories = [
    {
      title: "Core Languages",
      desc: "Architecting systems with modern memory safety and fast compilation.",
      skills: [
        {
          name: "TypeScript",
          color: "hover:text-[#3178C6] hover:bg-[#3178C6]/5 hover:border-[#3178C6]/20",
          svg: (
            <svg viewBox="0 0 256 256" className="w-6 h-6 fill-current">
              <path d="M20 0h216c11.046 0 20 8.954 20 20v216c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20V20C0 8.954 8.954 0 20 0Z" className="text-[#3178C6] fill-current" />
              <path d="M150.518 200.475v27.62c4.492 2.302 9.805 4.028 15.938 5.179 6.133 1.151 12.597 1.726 19.393 1.726 6.622 0 12.914-.633 18.874-1.899 5.96-1.266 11.187-3.352 15.678-6.257 4.492-2.906 8.048-6.704 10.669-11.394 2.62-4.689 3.93-10.486 3.93-17.391 0-5.006-.749-9.394-2.246-13.163a30.748 30.748 0 0 0-6.479-10.055c-2.821-2.935-6.205-5.567-10.149-7.898-3.945-2.33-8.394-4.531-13.347-6.602-3.628-1.497-6.881-2.949-9.761-4.359-2.879-1.41-5.327-2.848-7.342-4.316-2.016-1.467-3.571-3.021-4.665-4.661-1.094-1.64-1.641-3.495-1.641-5.567 0-1.899.489-3.61 1.468-5.135s2.362-2.834 4.147-3.927c1.785-1.094 3.973-1.942 6.565-2.547 2.591-.604 5.471-.906 8.638-.906 2.304 0 4.737.173 7.299.518 2.563.345 5.14.877 7.732 1.597a53.669 53.669 0 0 1 7.558 2.719 41.7 41.7 0 0 1 6.781 3.797v-25.807c-4.204-1.611-8.797-2.805-13.778-3.582-4.981-.777-10.697-1.165-17.147-1.165-6.565 0-12.784.705-18.658 2.115-5.874 1.409-11.043 3.61-15.506 6.602-4.463 2.993-7.99 6.805-10.582 11.437-2.591 4.632-3.887 10.17-3.887 16.615 0 8.228 2.375 15.248 7.127 21.06 4.751 5.811 11.963 10.731 21.638 14.759a291.458 291.458 0 0 1 10.625 4.575c3.283 1.496 6.119 3.049 8.509 4.66 2.39 1.611 4.276 3.366 5.658 5.265 1.382 1.899 2.073 4.057 2.073 6.474a9.901 9.901 0 0 1-1.296 4.963c-.863 1.524-2.174 2.848-3.93 3.97-1.756 1.122-3.945 1.999-6.565 2.632-2.62.633-5.687.95-9.2.95-5.989 0-11.92-1.05-17.794-3.151-5.875-2.1-11.317-5.25-16.327-9.451Zm-46.036-68.733H140V109H41v22.742h35.345V233h28.137V131.742Z" className="text-white fill-current" />
            </svg>
          )
        },
        {
          name: "Python",
          color: "hover:text-[#3776AB] hover:bg-[#3776AB]/5 hover:border-[#3776AB]/20",
          svg: (
            <svg viewBox="16 16 32 32" className="w-6 h-6">
              <path fill="#387EB8" d="M31.885 16c-8.124 0-7.617 3.523-7.617 3.523l.01 3.65h7.752v1.095H21.197S16 23.678 16 31.876c0 8.196 4.537 7.906 4.537 7.906h2.708v-3.804s-.146-4.537 4.465-4.537h7.688s4.32.07 4.32-4.175v-7.019S40.374 16 31.885 16zm-4.275 2.454a1.394 1.394 0 1 1 0 2.79 1.393 1.393 0 0 1-1.395-1.395c0-.771.624-1.395 1.395-1.395z"/>
              <path fill="#FFC331" d="M32.115 47.833c8.124 0 7.617-3.523 7.617-3.523l-.01-3.65H31.97v-1.095h10.832S48 40.155 48 31.958c0-8.197-4.537-7.906-4.537-7.906h-2.708v3.803s.146 4.537-4.465 4.537h-7.688s-4.32-.07-4.32 4.175v7.019s-.656 4.247 7.833 4.247zm4.275-2.454a1.393 1.393 0 0 1-1.395-1.395 1.394 1.394 0 1 1 1.395 1.395z"/>
            </svg>
          )
        },
        {
          name: "Rust",
          color: "hover:text-[#DEA584] hover:bg-[#DEA584]/5 hover:border-[#DEA584]/20",
          svg: (
            <svg viewBox="0 0 224 224" className="w-6 h-6 fill-current">
              <path fill={isDark ? "#FFF" : "#000"} d="M218.46 109.358l-9.062-5.614c-.076-.882-.162-1.762-.258-2.642l7.803-7.265a3.107 3.107 0 00.933-2.89 3.093 3.093 0 00-1.967-2.312l-9.97-3.715c-.25-.863-.512-1.72-.781-2.58l6.214-8.628a3.114 3.114 0 00-.592-4.263 3.134 3.134 0 00-1.431-.637l-10.507-1.709a80.869 80.869 0 00-1.263-2.353l4.417-9.7a3.12 3.12 0 00-.243-3.035 3.106 3.106 0 00-2.705-1.385l-10.671.372a85.152 85.152 0 00-1.685-2.044l2.456-10.381a3.125 3.125 0 00-3.762-3.763l-10.384 2.456a88.996 88.996 0 00-2.047-1.684l.373-10.671a3.11 3.11 0 00-1.385-2.704 3.127 3.127 0 00-3.034-.246l-9.681 4.417c-.782-.429-1.567-.854-2.353-1.265l-1.713-10.506a3.098 3.098 0 00-1.887-2.373 3.108 3.108 0 00-3.014.35l-8.628 6.213c-.85-.27-1.703-.53-2.56-.778l-3.716-9.97a3.111 3.111 0 00-2.311-1.97 3.134 3.134 0 00-2.89.933l-7.266 7.802a93.746 93.746 0 00-2.643-.258l-5.614-9.082A3.125 3.125 0 00111.97 4c-1.09 0-2.085.56-2.642 1.478l-5.615 9.081a93.32 93.32 0 00-2.642.259l-7.266-7.802a3.13 3.13 0 00-2.89-.933 3.106 3.106 0 00-2.312 1.97l-3.715 9.97c-.857.247-1.71.506-2.56.778L73.7 12.588a3.101 3.101 0 00-3.014-.35A3.127 3.127 0 0068.8 14.61l-1.713 10.506c-.79.41-1.575.832-2.353 1.265l-9.681-4.417a3.125 3.125 0 00-4.42 2.95l.372 10.67c-.69.553-1.373 1.115-2.048 1.685l-10.383-2.456a3.143 3.143 0 00-2.93.832 3.124 3.124 0 00-.833 2.93l2.436 10.383a93.897 93.897 0 00-1.68 2.043l-10.672-.372a3.138 3.138 0 00-2.704 1.385 3.126 3.126 0 00-.246 3.035l4.418 9.7c-.43.779-.855 1.563-1.266 2.353l-10.507 1.71a3.097 3.097 0 00-2.373 1.886 3.117 3.117 0 00.35 3.013l6.214 8.628a89.12 89.12 0 00-.78 2.58l-9.97 3.715a3.117 3.117 0 00-1.035 5.202l7.803 7.265c-.098.879-.184 1.76-.258 2.642l-9.062 5.614A3.122 3.122 0 004 112.021c0 1.092.56 2.084 1.478 2.642l9.062 5.614c.074.882.16 1.762.258 2.642l-7.803 7.265a3.117 3.117 0 001.034 5.201l9.97 3.716a110 110 0 00.78 2.58l-6.212 8.627a3.112 3.112 0 00.6 4.27c.419.33.916.547 1.443.63l10.507 1.709c.407.792.83 1.576 1.265 2.353l-4.417 9.68a3.126 3.126 0 002.95 4.42l10.65-.374c.553.69 1.115 1.372 1.685 2.047l-2.435 10.383a3.09 3.09 0 00.831 2.91 3.117 3.117 0 002.931.83l10.384-2.436a82.268 82.268 0 002.047 1.68l-.371 10.671a3.11 3.11 0 001.385 2.704 3.125 3.125 0 003.034.241l9.681-4.416c.779.432 1.563.854 2.353 1.265l1.713 10.505a3.147 3.147 0 001.887 2.395 3.111 3.111 0 003.014-.349l8.628-6.213c.853.271 1.71.535 2.58.783l3.716 9.969a3.112 3.112 0 002.312 1.967 3.112 3.112 0 002.89-.933l7.266-7.802c.877.101 1.761.186 2.642.264l5.615 9.061a3.12 3.12 0 002.642 1.478 3.165 3.165 0 002.663-1.478l5.614-9.061c.884-.078 1.765-.163 2.643-.264l7.265 7.802a3.106 3.106 0 002.89.933 3.105 3.105 0 002.312-1.967l3.716-9.969c.863-.248 1.719-.512 2.58-.783l8.629 6.213a3.12 3.12 0 004.9-2.045l1.713-10.506c.793-.411 1.577-.838 2.353-1.265l9.681 4.416a3.13 3.13 0 003.035-.241 3.126 3.126 0 001.385-2.704l-.372-10.671a81.794 81.794 0 002.046-1.68l10.383 2.436a3.123 3.123 0 003.763-3.74l-2.436-10.382a84.588 84.588 0 001.68-2.048l10.672.374a3.104 3.104 0 002.704-1.385 3.118 3.118 0 00.244-3.035l-4.417-9.68c.43-.779.852-1.563 1.263-2.353l10.507-1.709a3.08 3.08 0 002.373-1.886 3.11 3.11 0 00-.35-3.014l-6.214-8.627c.272-.857.532-1.717.781-2.58l9.97-3.716a3.109 3.109 0 001.967-2.311 3.107 3.107 0 00-.933-2.89l-7.803-7.265c.096-.88.182-1.761.258-2.642l9.062-5.614a3.11 3.11 0 001.478-2.642 3.157 3.157 0 00-1.476-2.663h-.064z" />
            </svg>
          )
        },
        {
          name: "Golang",
          color: "hover:text-[#00ADD8] hover:bg-[#00ADD8]/5 hover:border-[#00ADD8]/20",
          svg: (
            <svg viewBox="0 0 207 78" className="w-8 h-6 fill-current text-white">
              <path d="m16.2 24.1c-.4 0-.5-.2-.3-.5l2.1-2.7c.2-.3.7-.5 1.1-.5h35.7c.4 0 .5.3.3.6l-1.7 2.6c-.2.3-.7.6-1 .6z" className="text-[#00ADD8] fill-current" />
              <path d="m1.1 33.3c-.4 0-.5-.2-.3-.5l2.1-2.7c.2-.3.7-.5 1.1-.5h45.6c.4 0 .6.3.5.6l-.8 2.4c-.1.4-.5.6-.9.6z" className="text-[#00ADD8] fill-current" />
              <path d="m25.3 42.5c-.4 0-.5-.3-.3-.6l1.4-2.5c.2-.3.6-.6 1-.6h20c.4 0 .6.3.6.7l-.2 2.4c0 .4-.4.7-.7.7z" className="text-[#00ADD8] fill-current" />
              <g transform="translate(55)"><path d="m74.1 22.3c-6.3 1.6-10.6 2.8-16.8 4.4-1.5.4-1.6.5-2.9-1-1.5-1.7-2.6-2.8-4.7-3.8-6.3-3.1-12.4-2.2-18.1 1.5-6.8 4.4-10.3 10.9-10.2 19 .1 8 5.6 14.6 13.5 15.7 6.8.9 12.5-1.5 17-6.6.9-1.1 1.7-2.3 2.7-3.7-3.6 0-8.1 0-19.3 0-2.1 0-2.6-1.3-1.9-3 1.3-3.1 3.7-8.3 5.1-10.9.3-.6 1-1.6 2.5-1.6h36.4c-.2 2.7-.2 5.4-.6 8.1-1.1 7.2-3.8 13.8-8.2 19.6-7.2 9.5-16.6 15.4-28.5 17-9.8 1.3-18.9-.6-26.9-6.6-7.4-5.6-11.6-13-12.7-22.2-1.3-10.9 1.9-20.7 8.5-29.3 7.1-9.3 16.5-15.2 28-17.3 9.4-1.7 18.4-.6 26.5 4.9 5.3 3.5 9.1 8.3 11.6 14.1.6.9.2 1.4-1 1.7z" className="text-[#00ADD8] fill-current" /><path d="m107.2 77.6c-9.1-.2-17.4-2.8-24.4-8.8-5.9-5.1-9.6-11.6-10.8-19.3-1.8-11.3 1.3-21.3 8.1-30.2 7.3-9.6 16.1-14.6 28-16.7 10.2-1.8 19.8-.8 28.5 5.1 7.9 5.4 12.8 12.7 14.1 22.3 1.7 13.5-2.2 24.5-11.5 33.9-6.6 6.7-14.7 10.9-24 12.8-2.7.5-5.4.6-8 .9zm23.8-40.4c-.1-1.3-.1-2.3-.3-3.3-1.8-9.9-10.9-15.5-20.4-13.3-9.3 2.1-15.3 8-17.5 17.4-1.8 7.8 2 15.7 9.2 18.9 5.5 2.4 11 2.1 16.3-.6 7.9-4.1 12.2-10.5 12.7-19.1z" fill-rule="nonzero" className="text-[#00ADD8] fill-current" /></g>
            </svg>
          )
        }
      ]
    },
    {
      title: "UI Frameworks & Builders",
      desc: "Delivering state of the art web interfaces and responsive mobile control decks.",
      skills: [
        {
          name: "React & Native",
          color: "hover:text-[#61DAFB] hover:bg-[#61DAFB]/5 hover:border-[#61DAFB]/20",
          svg: (
            <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-6 h-6 fill-none stroke-current text-[#61DAFB]">
              <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
              <g stroke="#61DAFB" strokeWidth="1">
                <ellipse rx="11" ry="4.2"/>
                <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
                <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
              </g>
            </svg>
          )
        },
        {
          name: "Vite",
          color: "hover:text-[#BD34FE] hover:bg-[#BD34FE]/5 hover:border-[#BD34FE]/20",
          svg: (
            <svg viewBox="0 0 512 512" className="w-6 h-6">
              <path fill="url(#vite-a)" d="M424 64 256 360 88 64z"/>
              <path fill="url(#vite-b)" d="m256 360 80-144H176z"/>
              <path fill="#FFC517" d="M288 384h-64l16-64h32z"/>
              <defs>
                <linearGradient id="vite-a" x1="19.07%" x2="75.9%" y1="27%" y2="52.9%">
                  <stop offset="0%" stopColor="#41D1FF"/>
                  <stop offset="100%" stopColor="#BD34FE"/>
                </linearGradient>
                <linearGradient id="vite-b" x1="0%" x2="100%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFEA79"/>
                  <stop offset="100%" stopColor="#FFAD1F"/>
                </linearGradient>
              </defs>
            </svg>
          )
        },
        {
          name: "Flutter",
          color: "hover:text-[#02569B] hover:bg-[#02569B]/5 hover:border-[#02569B]/20",
          svg: (
            <svg viewBox="0 0 256 317" className="w-6 h-6">
              <path fill="#47C5FB" d="M158 0 0 158l49 48L255 0zM157 145l-85 85 49 50 49-49 85-86z"/>
              <path fill="#00569E" d="m121 280 37 37h97l-85-86z"/>
              <path fill="#00B5F8" d="m72 230 48-48 50 49-49 49z"/>
            </svg>
          )
        },
        {
          name: "Next.js",
          color: "hover:text-neutral-400 hover:bg-neutral-500/5 hover:border-neutral-500/20",
          svg: (
            <svg viewBox="0 0 256 256" className="w-6 h-6 fill-current">
              <path d="M128 0C57.31 0 0 57.31 0 128s57.31 128 128 128 128-57.31 128-128S198.69 0 128 0zm52.79 178.69l-61.9-79.62v63.14h-12.78V92h11.23l60.27 77.8v-77.8h12.78v86.69h-9.6z" className={isDark ? "text-white" : "text-black"} />
            </svg>
          )
        }
      ]
    },
    {
      title: "Data & Infrastructure",
      desc: "Local/cloud orchestration pipelines and high-velocity storage backends.",
      skills: [
        {
          name: "PostgreSQL",
          color: "hover:text-[#336791] hover:bg-[#336791]/5 hover:border-[#336791]/20",
          svg: (
            <svg viewBox="0 0 256 256" className="w-6 h-6">
              <path fill="#336791" d="M128 0C57.31 0 0 57.31 0 128s57.31 128 128 128 128-57.31 128-128S198.69 0 128 0zm68.85 144.3c-2.3 5.4-6.2 9.8-11.4 12.8-5.2 3.1-11.4 4.6-18.4 4.6h-21.7V117h21.7c7 0 13.2 1.5 18.4 4.6 5.2 3.1 9.1 7.4 11.4 12.8 2.3 5.4 3.5 11.6 3.5 18.4s-1.2 13.1-3.5 18.4z"/>
            </svg>
          )
        },
        {
          name: "Supabase",
          color: "hover:text-[#3ECF8E] hover:bg-[#3ECF8E]/5 hover:border-[#3ECF8E]/20",
          svg: (
            <svg viewBox="0 0 256 256" className="w-6 h-6 fill-current text-[#3ECF8E]">
              <path d="M190.5 128h-50.7l44.3-88.6c1.6-3.2-1.3-6.8-4.9-5.9l-117.8 29.5c-4.1 1-5.6 6.1-2.7 9.1l82 82h50.7L97 242.7c-1.6 3.2 1.3 6.8 4.9 5.9l117.8-29.5c4.1-1 5.6-6.1 2.7-9.1l-81.9-82z"/>
            </svg>
          )
        },
        {
          name: "Convex",
          color: "hover:text-[#FF4F00] hover:bg-[#FF4F00]/5 hover:border-[#FF4F00]/20",
          svg: (
            <svg viewBox="0 0 256 256" className="w-6 h-6 fill-current text-[#FF4F00]">
              <path d="M128 0L32 96v64l96 96 96-96V96L128 0zm64 144l-64 64-64-64V112l64-64 64 64v32z"/>
            </svg>
          )
        },
        {
          name: "Docker",
          color: "hover:text-[#2496ED] hover:bg-[#2496ED]/5 hover:border-[#2496ED]/20",
          svg: (
            <svg viewBox="0 0 256 256" className="w-6 h-6">
              <path fill="#2496ED" d="M128 0C57.31 0 0 57.31 0 128s57.31 128 128 128 128-57.31 128-128S198.69 0 128 0zm-20 180H92v-16h16v16zm0-32H92v-16h16v16zm32 32h-16v-16h16v16zm0-32h-16v-16h16v16zm32 0h-16v-16h16v16z"/>
            </svg>
          )
        }
      ]
    },
    {
      title: "Agentic Systems & Orchestration",
      desc: "Autopilot controllers, temporal video evaluation engines, and pre-execution safety gates.",
      skills: [
        {
          name: "Claude Code",
          color: "hover:text-[#D97757] hover:bg-[#D97757]/5 hover:border-[#D97757]/20",
          svg: (
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current text-[#D97757]">
              <path d="M20.998 10.949H24v3.102h-3v3.028h-1.487V20H18v-2.921h-1.487V20H15v-2.921H9V20H7.488v-2.921H6V20H4.487v-2.921H3V14.05H0V10.95h3V5h17.998v5.949zM6 10.949h1.488V8.102H6v2.847zm10.51 0H18V8.102h-1.49v2.847z" />
            </svg>
          )
        },
        {
          name: "OpenAI Codex",
          color: "hover:text-[#10A37F] hover:bg-[#10A37F]/5 hover:border-[#10A37F]/20",
          svg: (
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current text-[#10A37F]">
              <path d="M8.086.457a6.105 6.105 0 013.046-.415c1.333.153 2.521.72 3.564 1.7a.117.117 0 00.107.029c1.408-.346 2.762-.224 4.061.366l.063.03.154.076c1.357.703 2.33 1.77 2.918 3.198.278.679.418 1.388.421 2.126a5.655 5.655 0 01-.18 1.631.167.167 0 00.04.155 5.982 5.982 0 011.578 2.891c.385 1.901-.01 3.615-1.183 5.14l-.182.22a6.063 6.063 0 01-2.934 1.851.162.162 0 00-.108.102c-.255.736-.511 1.364-.987 1.992-1.199 1.582-2.962 2.462-4.948 2.451-1.583-.008-2.986-.587-4.21-1.736a.145.145 0 00-.14-.032c-.518.167-1.04.191-1.604.185a5.924 5.924 0 01-2.595-.622 6.058 6.058 0 01-2.146-1.781c-.203-.269-.404-.522-.551-.821a7.74 7.74 0 01-.495-1.283 6.11 6.11 0 01-.017-3.064.166.166 0 00.008-.074.115.115 0 00-.037-.064 5.958 5.958 0 01-1.38-2.202 5.196 5.196 0 01-.333-1.589 6.915 6.915 0 01.188-2.132c.45-1.484 1.309-2.648 2.577-3.493.282-.188.55-.334.802-.438.286-.12.573-.22.861-.304a.129.129 0 00.087-.087A6.016 6.016 0 015.635 2.31C6.315 1.464 7.132.846 8.086.457zm-.804 7.85a.848.848 0 00-1.473.842l1.694 2.965-1.688 2.848a.849.849 0 001.46.864l1.94-3.272a.849.849 0 00.007-.854l-1.94-3.393zm5.446 6.24a.849.849 0 000 1.695h4.848a.849.849 0 000-1.696h-4.848z" />
            </svg>
          )
        },
        {
          name: "Hermes Agent",
          color: "hover:text-[#8B5CF6] hover:bg-[#8B5CF6]/5 hover:border-[#8B5CF6]/20",
          svg: (
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current text-[#8B5CF6]" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )
        },
        {
          name: "Inflection Pi",
          color: "hover:text-[#3B82F6] hover:bg-[#3B82F6]/5 hover:border-[#3B82F6]/20",
          svg: (
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current text-[#3B82F6]" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M9 17V11a3 3 0 0 1 6 0v6M12 7V9" strokeLinecap="round" />
            </svg>
          )
        }
      ]
    }
  ];

  return (
    <section className="py-24 px-6 relative z-10">
      <div className="container mx-auto max-w-[1600px]">
        {/* Header Block */}
        <div className="max-w-3xl mb-16 text-left">
          <span className={`block text-xs font-mono uppercase tracking-[0.2em] mb-4 ${
            isDark ? 'text-indigo-400' : 'text-indigo-600'
          }`}>
            Engineering Toolkit
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-extrabold tracking-tighter mb-6 leading-none">
            Technology Stack.
          </h2>
          <p className="text-lg opacity-60 leading-relaxed max-w-2xl font-sans">
            Forged after engineering more than 100 complex projects across multiple paradigms. Handpicked libraries and native components designed for maximum performance, robustness, and absolute scalability.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat, idx) => (
            <div 
              key={idx}
              className="glass-card rounded-[2.5rem] p-8 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-2xl font-display font-extrabold mb-2 tracking-tight">
                  {cat.title}
                </h3>
                <p className="text-sm opacity-50 mb-8 leading-relaxed font-sans max-w-lg">
                  {cat.desc}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {cat.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 ${
                      isDark 
                        ? 'border-zinc-800/80 bg-zinc-950/20 text-zinc-300' 
                        : 'border-zinc-200/80 bg-zinc-50/50 text-zinc-800'
                    } ${skill.color}`}
                  >
                    <div className="shrink-0">
                      {skill.svg}
                    </div>
                    <span className="text-sm font-mono font-bold tracking-tight">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
