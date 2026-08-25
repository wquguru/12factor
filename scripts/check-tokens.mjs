#!/usr/bin/env node
/**
 * Guards the single-source-of-truth rule for colour.
 * Components must use semantic tokens — never raw hex, never a `dark:` colour
 * variant (the token already differs per theme), never a Tailwind palette scale.
 * Baseline before the token migration: 232 hex literals, ~615 `dark:` variants.
 */
import fs from 'fs';
import path from 'path';

const files = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (p.endsWith('.tsx') || p.endsWith('.ts')) files.push(p);
  }
})('src');

const PALETTE = 'slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose';
const checks = [
  [/#[0-9a-fA-F]{6}\b/g, 'hex colour literal — use a semantic token'],
  [/\bdark:(?:text|bg|border|ring|from|via|to|divide|placeholder|shadow|fill|stroke)-/g,
   '`dark:` colour variant — tokens already resolve per theme'],
  [new RegExp(`\\b(?:text|bg|border|ring|from|via|to|divide)-(?:${PALETTE})-\\d{2,3}\\b`, 'g'),
   'Tailwind palette scale — use a semantic token'],
  [/\bfocus:outline-none\b(?![^"'`]*focus(?:-visible)?:(?:ring|outline|border))/g,
   'focus:outline-none with no replacement indicator'],
];

let bad = 0;
for (const f of files) {
  if (f.includes('/components/icons/')) continue; // doc comment names the glyphs
  const src = fs.readFileSync(f, 'utf8');
  src.split('\n').forEach((line, i) => {
    for (const [re, msg] of checks) {
      re.lastIndex = 0;
      const m = re.exec(line);
      if (m) { console.error(`${f}:${i + 1}  ${m[0]}  — ${msg}`); bad++; }
    }
  });
}
if (bad) { console.error(`\n✗ ${bad} colour-token violation(s)`); process.exit(1); }
console.log('✓ no colour literals, no dark: variants, no palette scales');
