# Press Kit Assets

Files in this folder are linked from `/[locale]/press` as downloadable press materials.

## Required filenames

| File | Linked from | Recommended spec |
|---|---|---|
| `alexandros-tsopozidis-landscape.jpg` | "Landscape Press Photo" card | 3000×2000 px, sRGB, ≤ 5 MB |
| `alexandros-tsopozidis-portrait.jpg` | "Portrait Press Photo" card | 2000×3000 px, sRGB, ≤ 5 MB |
| `alexandros-tsopozidis-logo.png` | "Artist Logo / Wordmark" card | 2048 px wide, transparent background |

## Current state

The `.jpg` files currently here are **placeholders copied from the hero/portrait**
so the download links do not 404. Replace them with real high-resolution press
photos before promoting the page. The logo file still needs to be provided —
until it exists, the "logo" download link will 404 (intentional, so the gap is
visible in analytics / devtools).

## Checklist before shipping

- [ ] Replace landscape with ≥ 3000 px wide horizontal photo
- [ ] Replace portrait with ≥ 2000 px wide vertical photo
- [ ] Drop `alexandros-tsopozidis-logo.png` into this folder
- [ ] Run `npm run build` to verify no broken references
