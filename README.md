# 中文词汇练习 · Chinese Vocab Practice

A bilingual Chinese (HSK) vocabulary matching game.

## Modes

- **Use your own reading** — Paste Chinese text, filter by HSK, extract words, play matching.
- **Ready-made sets** — Practice HSK-level word groups.
- **Add your own words** — Add missing vocabulary (and optional image URLs) stored in this browser.

## Features

- HSK 1–6 vocabulary
- **Pictures** for matching when available:
  1. Your custom image overrides (this browser)
  2. Built-in map in `images.js` (Wikimedia URLs)
  3. Live Wikimedia search when still missing (cached in the browser)
  4. Text fallback (hanzi + English) when no picture
- **Edit pictures** — On any word list, click **Image** to paste a URL, search Wikimedia, force “no image”, or restore default
- High score, TTS pronunciation, keyboard (1–6, S)

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

## User picture edits

- Stored only in **localStorage** (this browser / device)
- Not shared with other players or devices
- Use **Image** on a word in the list after extract or Preview
- When adding a custom word, optional **Image URL** field saves an override for that hanzi

## Project files

| File | Role |
|------|------|
| `index.html` | UI + image edit modal |
| `main.js` | Boot |
| `picture-game.js` | Game, extract, user words, image overrides |
| `vocabulary.js` | HSK data |
| `images.js` | Built-in word → image URL map |
| `build-images.js` | Rebuild `images.js` |
| `styles.css` | Styling |
| `server.js` | Local static server |

## Hosting (Netlify / GitHub Pages / etc.)

Static site only — upload `index.html`, `*.js`, `*.css`. **No** `images/` folder or `local-image-map.js` required.

Friends get the shared `images.js` map. Their personal picture fixes stay in their own browser.

## Controls

**Matching game**

- Tap the card where Chinese matches the English meaning (or the correct picture pairing)
- **1–6** select slot · **S** speak

练习中文，加油！
