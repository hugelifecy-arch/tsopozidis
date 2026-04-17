# Album artwork

Local fallbacks for releases referenced in `src/lib/data/discography.ts`.

The site prefers `spotifyCoverUrl` (Spotify CDN). If that URL 404s, `AlbumCover`
falls back to the local `/images/albums/*.jpg` file. If that is also missing,
it renders a styled placeholder with the release title.

Expected filenames match each `Release.coverImage` entry in `discography.ts`:

- `za-toboi.jpg`
- `kanitel.jpg`
- `mia-kardia.jpg`
- `soltera.jpg`
- `par-shirkhani.jpg`
- `kavkaz.jpg`
- `ya-grek.jpg`
- `kortsopon.jpg`
- `monahos.jpg`
- `kapkan.jpg`
- `rasskazhi.jpg`
- `panagia.jpg`
- `dumanli.jpg`
- `tanets-greka.jpg`

Add 640×640 JPGs (or WEBP) when available. The directory is kept committed
so the fallback path resolves in production.
