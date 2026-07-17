# 中文闪卡 · Chinese Flashcards

A fun, bilingual Chinese (HSK) vocabulary learning game with two modes:

- **Flashcards** — Flip cards to learn hanzi, pinyin, and meaning. Mark as "Got it" or "Still learning". Progress is saved in your browser.
- **Picture Match** — Fast-paced matching game. 6 images appear with Chinese labels. Find the 1–2 correct matches before they time out.

## Features
- HSK 1–6 vocabulary (~5,061 words total, full HSK 6 added)
- Picture Match supports pictures (or visual representations) for a wide range of words:
  - Best quality: Your 91 dedicated local photos
  - Fallback: Consistent generated placeholder images for other words
- Local progress tracking (Flashcards)
- High score for Picture Match
- **Pronunciation** — Uses your browser's built-in text-to-speech
- Keyboard friendly (1-6 keys + S to hear)
- Learning aids: Correct matches reveal English meaning + audio

## How to Run the Game (Important!)

This is a static web app (HTML + JavaScript + data files). It works best when served over **HTTP** (not `file://`).

### Best way (Windows)
1. Double-click `start-game.bat`
2. It will automatically open your browser at http://localhost:8080

The .bat file starts a tiny local server (`server.js`) using Node.js.

### If the .bat window disappears immediately
- Node.js is probably not installed.
- Install it from https://nodejs.org/ (LTS version) and try again.
- Or use the Python alternative below.

### Alternative without Node (Python)
Many Windows machines have Python:
```powershell
cd "path\to\Projects\new-project"
python -m http.server 8000
```
Then manually open http://localhost:8080 in your browser.

### Last resort: Direct file open
Double-click `index.html`. **This may cause Chinese font/character encoding issues** (mojibake like æ‘†è„±) because browsers sometimes misdetect encoding on file:// for large JS data files. **Always prefer the server** (double-click start-game.bat or python -m http.server). The server explicitly serves with charset=utf-8.

### Getting pictures for more words (strongly recommended)
Run the downloader to build a big local photo library:

```powershell
cd "C:\Users\hoang\Projects\new-project"
pip install requests
py download_images.py
```

It downloads real photos for missing words using Wikimedia Commons. Run it again later to get even more.

The game also automatically tries to find better online images (Wikimedia) for any word that doesn't have a local photo when you start Picture Match. These are cached in your browser.

## Why a server?
Large data files (hundreds of KB of JavaScript) load and parse more reliably over HTTP than the `file://` protocol. Local images and the game logic also behave more consistently.

## Controls Summary

**Flashcards**
- Click card or press **Space** → Flip
- ← / → arrows → Previous / Next
- "Got it!" or "Still learning" buttons

**Picture Match**
- Click (or tap) the correct image(s)
- **1 2 3 4 5 6** keys → Select slot
- **S** → Speak one of the current correct words

## Project Files

- `index.html` — Main UI
- `main.js` — Mode switching
- `flashcards.js` — Flashcard logic + progress
- `picture-game.js` — Picture Match game logic + audio
- `vocabulary.js` / `vocabulary.json` — HSK data
- `images.js` — Word-to-image mapping
- `styles.css` — Beautiful Chinese-inspired styling
- `server.js` + `start-game.bat` — Simple static server

## Hosting the Game for Friends (with your pictures)

The game is a **static website** — no backend required. You can easily host it publicly so your friends can play with your custom local images.

### Quick Hosting Options (free)
1. **Netlify Drop** (easiest for pictures):
   - Go to https://app.netlify.com/drop
   - Drag the entire `Projects/new-project` folder (or at least `index.html`, all `*.js`, `*.css`, `images/` folder, and `local-image-map.js`)
   - Get an instant public URL. Perfect — your pictures will be included.

2. **GitHub Pages**:
   - Create a new GitHub repo.
   - Upload/copy the files (put everything in root or `/docs` folder).
   - In repo Settings → Pages, choose the branch and folder.
   - Your site will be at `https://yourname.github.io/repo-name`

3. **Vercel** or **Cloudflare Pages**: Similar drag-and-drop or Git deploy.

### Important notes for pictures
- To let friends see **your downloaded local photos**, you must include the `images/` folder in the upload.
- The game automatically prefers local images when available.
- If you don't upload images, it gracefully falls back to online images (Wikimedia + placeholders).
- The online image resolver (Wikimedia search) works fine on any hosted site.
- No Node server is needed for production hosting (the `server.js` is only for local development).

### Tips
- Keep the folder structure the same (relative paths like `images/xxx.jpg` must work).
- If you have a lot of images, GitHub may complain about repo size — Netlify Drop handles it well.
- You can update images later by re-uploading.

This way your friends get the exact same experience, including any custom readings or downloaded pictures you have.

## Future Ideas / Roadmap
- Add audio files or better TTS voices
- Spaced repetition scheduling
- Custom word sets / import
- Dark mode
- Mobile app export (PWA)
- More game modes (typing, stroke order)

## Credits
- Vocabulary based on HSK lists
- Images sourced via Wikimedia / custom generation scripts
- Built for effective daily Chinese practice

练习中文，加油！ (Practice Chinese — keep it up!)
