# Album / Single Cover Art

Files in this folder are linked from `src/lib/data/discography.ts` via the
`coverImage` field and rendered by `SinglesGrid`. If a file is missing, the UI
shows a broken-image placeholder — which is exactly the issue flagged by
AUDIT 2026-04-17 §1.5.

## Required filenames

Every one of the filenames below must exist (recommended size: **1000×1000 px**,
sRGB, ≤ 300 KB, JPG unless transparency is needed):

- `za-toboi.jpg` — *За тобой* (2018 album)
- `kanitel.jpg` — *Канитель* (2019)
- `mia-kardia.jpg` — *Μια Καρδιά* (2020)
- `soltera.jpg` — *Soltera* (2020)
- `par-shirkhani.jpg` — *Par Shirkhani* (2021)
- `kavkaz.jpg` — *Кавказ* (2021)
- `ya-grek.jpg` — *Я грек* (2022)
- `kortsopon.jpg` — *Kortsopon* (2022)
- `monahos.jpg` — *Μοναχός* (2023)
- `kapkan.jpg` — *Капкан* (2023)
- `rasskazhi.jpg` — *Расскажи* (2024)
- `panagia.jpg` — *Παναγία* (2024)
- `dumanli.jpg` — *Dumanlı* (2024)
- `tanets-greka.jpg` — *Танец грека* (2025)

## Guardrail

Run `npm run check:album-art` locally to see which files are missing.
It also runs automatically as a `prebuild` hook so every `next build` /
Vercel deploy prints a warning list if anything is missing. To make the
check fatal in CI instead:

```
CHECK_ALBUM_ART_STRICT=1 npm run build
```
