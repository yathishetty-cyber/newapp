# nairuHealth Prototype — Deploy to Vercel

This is a ready-to-deploy Vite + React project. Every file needed for Vercel to
auto-detect and build it is already in place — you don't need to run any setup
commands, just push and deploy.

## What's in here

- `index.html` — the entry HTML file (the "index file")
- `src/main.jsx` — mounts the app into `#root`
- `src/App.jsx` — the actual nairuHealth app (unchanged from the source you already have)
- `src/index.css` — loads Tailwind CSS, which the app's `className`s depend on for
  layout (flexbox, spacing, rounded corners). Without this file wired in, the app
  would render with broken layout even though the JSX itself is correct.
- `tailwind.config.js`, `postcss.config.js` — Tailwind setup
- `vite.config.js` — standard Vite + React plugin config
- `vercel.json` — tells Vercel explicitly this is a Vite project (belt-and-suspenders;
  Vercel usually auto-detects this anyway)

## Deploy — Option A: GitHub + Vercel (recommended)

1. Create a new GitHub repo and push this whole folder to it:
   ```bash
   cd nairuhealth-deploy
   git init
   git add .
   git commit -m "nairuHealth prototype"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com), sign in with GitHub.
3. Click **"Add New Project"** → select your repo → Vercel auto-detects Vite → click **Deploy**.
4. Done. You'll get a live URL like `nairuhealth-prototype.vercel.app`.

Every future `git push` to `main` auto-redeploys.

## Deploy — Option B: Vercel CLI (no GitHub needed)

```bash
npm install -g vercel
cd nairuhealth-deploy
npm install
vercel
```
Follow the prompts (first deploy asks a few setup questions, defaults are fine). It gives you a live URL immediately, and running `vercel --prod` promotes it to your production URL.

## Running locally first (optional, but worth doing before deploying)

```bash
npm install
npm run dev
```
Opens at `http://localhost:5173`. Confirms everything renders correctly — icons, charts, layout — before you deploy.

## About the phone-frame behavior

The app automatically shows a decorative phone-frame (border, shadow, centered) when
viewed on a screen wider than 480px, and switches to full-bleed (fills the real
screen) on an actual phone. No configuration needed — it's handled inside `App.jsx`
via a window-width check.

## Known limitations (by design, not bugs)

This is an illustrative prototype: there is no real backend, authentication, or data
persistence — everything resets on page reload. AI summarization, OCR, and voice
recognition are simulated with canned responses and timers, not real model calls.
