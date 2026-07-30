/**
 * Pure helpers for portfolio content — unit-tested without mounting Three/Lanyard.
 */
import { FORBIDDEN_COPY, RESUME, RIBBON_FIELD_CSS_SNIPPET } from '../constants';
import type { Project } from '../types';

/** Product hosts that can be iframe-previewed. */
export function isLiveProductUrl(url?: string): boolean {
  if (!url) return false;
  try {
    const u = new URL(url);
    return (
      u.protocol === 'https:' &&
      (u.hostname.endsWith('vercel.app') ||
        u.hostname.includes('delegators') ||
        u.hostname.includes('ceohunt') ||
        u.hostname.includes('doorway') ||
        u.hostname.includes('virtual-os') ||
        u.hostname.includes('flow-pitch'))
    );
  } catch {
    return false;
  }
}

export function isGitHubUrl(url?: string): boolean {
  return Boolean(url && url.includes('github.com'));
}

/** All showcase projects for the gradient strip (live first, then systems with links). */
export function getStripProjects(): Project[] {
  const seen = new Set<string>();
  const out: Project[] = [];
  const push = (p: Project) => {
    const key = p.link || p.title;
    if (seen.has(key)) return;
    seen.add(key);
    out.push(p);
  };
  // Live product surfaces first
  for (const p of RESUME.mvpProjects) push(p);
  // Engineered systems
  for (const p of RESUME.projects) push(p);
  return out;
}

export function getLiveStripProjects(): Project[] {
  return getStripProjects().filter((p) => isLiveProductUrl(p.link));
}

export function stripHasMinLive(min = 4): boolean {
  const live = getLiveStripProjects();
  return (
    live.length >= min &&
    live.every(
      (p) =>
        Boolean(p.title && p.description && p.link?.startsWith('https') && (p.tags?.length ?? 0) >= 1)
    )
  );
}

export function hasAetherResearch(): boolean {
  return (
    RESUME.publications.some((p) => /aether/i.test(p.title + (p.link || ''))) ||
    RESUME.editorialNotes.some((n) => /aether/i.test(n.id + n.title))
  );
}

export function hasHonestMeasuredNote(): boolean {
  return RESUME.editorialNotes.some(
    (n) => n.figure || /vram|quality|measured|seal/i.test(n.body.join(' ') + n.title)
  );
}

export function ribbonCssContainsExactTokens(css: string): boolean {
  const need = [
    'background-color: #1D62D7',
    '#C3CFEA 43.89%',
    '#3CC1F6 48.89%',
    '#1839A7 58.19%',
    '#1E788A 81.5%',
    'linear-gradient(135deg',
    'background-blend-mode: overlay, normal, normal',
    'background-size: 120px 120px, auto, auto',
  ];
  const norm = css.replace(/\s+/g, ' ');
  return need.every((t) => norm.includes(t.replace(/\s+/g, ' ')) || css.includes(t));
}

export function getRibbonCssSnippet(): string {
  return RIBBON_FIELD_CSS_SNIPPET;
}

export function pageHasForbiddenHireCopy(blob: string): boolean {
  const lower = blob.toLowerCase();
  return FORBIDDEN_COPY.some((s) => lower.includes(s));
}

export function collectPublicCopyBlob(): string {
  return [
    RESUME.worksLead,
    ...RESUME.projects.map((p) => p.description),
    ...RESUME.mvpProjects.map((p) => p.description),
    ...RESUME.publications.map((p) => p.summary),
    ...RESUME.editorialNotes.flatMap((n) => [n.dek, ...n.body]),
  ].join('\n');
}
