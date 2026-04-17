// Build-time guardrail: verify every coverImage referenced in discography.ts
// resolves to a real file under public/. Emits a clear warning list (or hard
// fails with --strict / CHECK_ALBUM_ART_STRICT=1) so we never silently ship
// 404s on album art — the issue flagged in AUDIT 2026-04-17 §1.5.
//
// Usage:
//   node scripts/check-album-art.mjs            # warn-only
//   node scripts/check-album-art.mjs --strict   # exit 1 if anything missing
//   CHECK_ALBUM_ART_STRICT=1 node scripts/check-album-art.mjs
//
// Wired into package.json as `prebuild` in warn mode so the signal surfaces
// in every Vercel build log without blocking deploys until real art lands.

import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, '..');

const DISCOGRAPHY = join(ROOT, 'src', 'lib', 'data', 'discography.ts');
const PUBLIC_DIR = join(ROOT, 'public');

const strict =
  process.argv.includes('--strict') || process.env.CHECK_ALBUM_ART_STRICT === '1';

const src = readFileSync(DISCOGRAPHY, 'utf8');
const matches = [...src.matchAll(/coverImage:\s*["']([^"']+)["']/g)].map((m) => m[1]);

if (matches.length === 0) {
  console.log('[check-album-art] No coverImage references found — nothing to verify.');
  process.exit(0);
}

const missing = [];
for (const ref of matches) {
  const abs = join(PUBLIC_DIR, ref.replace(/^\/+/, ''));
  if (!existsSync(abs)) missing.push(ref);
}

if (missing.length === 0) {
  console.log(
    `[check-album-art] OK — ${matches.length} cover references all resolve to disk.`
  );
  process.exit(0);
}

const header = strict
  ? '[check-album-art] FAIL — missing cover art files:'
  : '[check-album-art] WARN — missing cover art files (not blocking build):';
const stream = strict ? process.stderr : process.stdout;
stream.write(`\n${header}\n`);
for (const ref of missing) stream.write(`   × ${ref}\n`);
stream.write(
  `\nAdd the files above to ${PUBLIC_DIR}/images/albums/ or remove the` +
    ' reference from src/lib/data/discography.ts.\n'
);
stream.write(
  '(See public/images/albums/README.md for the canonical list of required filenames.)\n'
);

process.exit(strict ? 1 : 0);
