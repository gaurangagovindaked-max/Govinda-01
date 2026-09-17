/**
 * Structure tests for correct page order + layout rules.
 * Run: node tests/portfolio.structure.test.mjs
 */
import { createHash } from 'crypto';
import { readFileSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const hash = (rel) => createHash('md5').update(readFileSync(join(ROOT, rel))).digest('hex');
const assert = (c, m) => {
  if (!c) {
    console.error('FAIL:', m);
    process.exitCode = 1;
  } else console.log('OK:', m);
};

assert(hash('components/Hero.tsx') === '8eb30331d555704860f4c0459fd1840f', 'Hero frozen');
assert(hash('components/LanyardBadge.tsx') === 'c2dfad7587191ee6f877e9f10f0c631e', 'Lanyard frozen');

const app = readFileSync(join(ROOT, 'App.tsx'), 'utf8');
assert(app.includes('ResearchIndex'), 'research index component');
assert(app.includes('ProductShowcase'), 'product showcase');
assert(app.includes('GitHubSection'), 'github separate');
assert(app.includes('OthersEnd'), 'others at end');
assert(!app.includes('LiveProjectStrip'), 'no ribbon live strip in App');
assert(!app.includes('TechStack'), 'no skills wall');

const iR = app.indexOf('ResearchIndex');
const iP = app.indexOf('ProductShowcase');
const iG = app.indexOf('GitHubSection');
const iA = app.indexOf('OthersEnd');
assert(iR < iP && iP < iG && iG < iA, 'section order: research → products → github → others');

assert(existsSync(join(ROOT, 'public/gradient-soft-a.jpg')), 'soft gradient image a');
assert(existsSync(join(ROOT, 'public/gradient-soft-b.jpg')), 'soft gradient image b');

const show = readFileSync(join(ROOT, 'components/ProductShowcase.tsx'), 'utf8');
assert(show.includes('grid'), 'product gallery grid');
assert(show.includes('PRODUCT_ORDER'), 'product order list');
assert(show.includes('Delegators Client') || show.includes('PRODUCT_ORDER'), 'product titles');
assert(!show.includes('gradient-soft'), 'no gradient backgrounds in products');
assert(!show.includes('flex-row-reverse'), 'no alternating hero rows');
assert(!show.includes('iframe'), 'no scroll-trapped iframes in gallery');
assert(show.includes('Open') || show.includes('Live'), 'open/live links');

const research = readFileSync(join(ROOT, 'components/ResearchFirst.tsx'), 'utf8');
assert(/Working-Set|MoE|VRAM/i.test(research), 'Working-Set / MoE learnings');
assert(/AETHER|aether/i.test(research), 'AETHER post');
assert(
  research.includes('ResearchCharts') || existsSync(join(ROOT, 'components/ResearchCharts.tsx')),
  'graphs/learnings'
);
assert(research.includes('sticky'), 'research sidebar sticky');
assert(research.includes('scroll') || research.includes('onScroll'), 'scroll-linked sidebar');

const index = readFileSync(join(ROOT, 'components/ResearchIndex.tsx'), 'utf8');
assert(index.includes('Read more'), 'research read-more links');
assert(index.includes('ent-01.vercel.app'), 'research ent link');

const others = readFileSync(join(ROOT, 'components/OthersEnd.tsx'), 'utf8');
assert(/Experience/.test(others), 'others experience');
assert(/Education/.test(others), 'others education');
assert(/Publications/.test(others), 'others publications');

const tsx = spawnSync(
  'npx',
  [
    '--yes',
    'tsx',
    '-e',
    `
import { isLiveProductUrl, isGitHubUrl } from './lib/portfolioData.ts';
import { RESUME } from './constants.ts';
const live = RESUME.mvpProjects.filter(p => isLiveProductUrl(p.link));
const gh = RESUME.projects.filter(p => isGitHubUrl(p.link) && !isLiveProductUrl(p.link));
if (live.length < 4) throw new Error('live products < 4: '+live.length);
if (gh.length < 2) throw new Error('github repos < 2');
if (!RESUME.editorialNotes.some(n => n.id === 'breed-pareto')) throw new Error('missing breed note');
if (!RESUME.editorialNotes.some(n => n.id === 'aether-pipeline')) throw new Error('missing aether note');
console.log('PURE_OK live='+live.length+' gh='+gh.length);
`,
  ],
  { cwd: ROOT, encoding: 'utf8', timeout: 120000 }
);
if (tsx.status === 0 && (tsx.stdout || '').includes('PURE_OK')) {
  console.log('OK:', (tsx.stdout || '').trim().split('\n').pop());
} else {
  console.error(tsx.stdout, tsx.stderr);
  process.exitCode = 1;
}

if (process.exitCode) process.exit(1);
console.log('\nPASSED');
