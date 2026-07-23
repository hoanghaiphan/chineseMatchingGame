# 中文词汇练习 · Chinese Vocab Practice

A bilingual Chinese (HSK) vocabulary matching game.

## Modes

- **Use your own reading** — Paste Chinese text, filter by HSK, extract words, play matching.
- **Ready-made sets** — Practice HSK-level word groups.
- **Add your own words** — Add missing vocabulary (and optional image URLs) stored in this browser.

## Features

- HSK 1–6 vocabulary
- **Pictures** for matching when available:
  1. **Shared library** (Supabase) — multi-user edits, survives deploys
  2. Built-in map in `images.js` (Wikimedia URLs shipped with the site)
  3. Live multi-source photo search when still missing (session / browser cache)
  4. Text fallback (hanzi + English) when no picture
- **Edit pictures (shared)** — On any word list, click **Image** to:
  - Search **Wikimedia**, **Openverse** (no keys), plus optional **Unsplash / Pexels / Pixabay**
  - Compare thumbnails, pick the best, then **Save** to the shared library
  - Force “no image”, or clear the shared entry
- High score, TTS pronunciation, keyboard (1–6, S)

## Shared image library (multi-user database)

Image links edited by players are stored in **Supabase Postgres**, not in the Netlify deploy. Updating the site or Netlify Functions does **not** wipe the library.

### One-time setup

1. Create a free project at [supabase.com](https://supabase.com)
2. SQL Editor → run `supabase/schema.sql`
3. Copy `config.example.js` → `config.js` and set:
   - `supabaseUrl` (Project Settings → API)
   - `supabaseAnonKey` (anon public key)
   - (Optional) photo API keys under `IMAGE_SEARCH_CONFIG` — see below
4. Redeploy / refresh the site

Until `config.js` is filled in, the game still works with `images.js` + Wikimedia/Openverse; **Save** will explain that the shared library is not configured.

### Optional photo sources (Unsplash / Pexels / Pixabay)

The image editor can search several **legal bulk** sources. Free with no key:

| Source | Key needed? | Notes |
|--------|-------------|--------|
| **Wikimedia Commons** | No | Default for built-in map + live fill |
| **Openverse** | No | Creative Commons / public-domain aggregator |

Optional free APIs (paste keys into `config.js` → `IMAGE_SEARCH_CONFIG`):

| Source | Get a free key |
|--------|----------------|
| **Unsplash** | [unsplash.com/developers](https://unsplash.com/developers) → Access Key |
| **Pexels** | [pexels.com/api](https://www.pexels.com/api/) |
| **Pixabay** | [pixabay.com/api/docs](https://pixabay.com/api/docs/) |

Keys in the browser are visible to users (normal for client-side demos). Prefer free-tier keys and domain restrictions if the provider supports them.

### How multi-user edits work

| Action | Effect |
|--------|--------|
| Save URL / Search / No image | Upsert row in `chinese_word_images` |
| Use default | Deletes shared row → built-in map / live search again |
| Many users | Last write wins per 汉字; everyone reads the same table |

LocalStorage only caches the shared map for faster loads — **source of truth is Supabase**.

## How to run

### Windows
1. Double-click `start-game.bat` (or `node server.js 8080`)
2. Open http://localhost:8080

### Python
```powershell
cd "C:\Users\hoang\Projects\ChineseWordMatching"
python -m http.server 8080
```

Prefer HTTP over opening `index.html` directly (encoding + large JS files).

## Rebuilding the built-in image map

```powershell
cd "C:\Users\hoang\Projects\ChineseWordMatching"
node build-images.js
```

This regenerates `images.js` with Wikimedia thumbnail links. Redeploy the site to share the updated map with everyone.

## Project files

| File | Role |
|------|------|
| `index.html` | UI + image edit modal |
| `config.js` / `config.example.js` | Supabase + optional Unsplash/Pexels/Pixabay keys |
| `image-library.js` | Shared library client (read/write Supabase) |
| `supabase/schema.sql` | Database table + RLS policies |
| `main.js` | Boot |
| `picture-game.js` | Game, extract, user words, image UI |
| `vocabulary.js` | HSK data |
| `images.js` | Built-in word → image URL map (defaults) |
| `build-images.js` | Rebuild `images.js` |
| `styles.css` | Styling |
| `server.js` | Local static server |

## Hosting (Netlify / GitHub Pages / etc.)

Upload static files including `config.js` (with your anon key).  
The **image database stays in Supabase** across every deploy.

## Controls

**Matching game**

- Tap the card where Chinese matches the English meaning (or the correct picture pairing)
- **1–6** select slot · **S** speak

练习中文，加油！
