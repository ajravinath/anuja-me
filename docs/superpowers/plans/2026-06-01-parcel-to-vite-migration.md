# Parcel v1 → Vite Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the abandoned `parcel-bundler@1.12.5` toolchain with Vite to eliminate all 16 high/critical `npm audit` findings, while keeping the site's build output and runtime behavior identical.

**Architecture:** Vite uses a root `index.html` as the entry and copies its `publicDir` verbatim to the build root. We point `publicDir` at the existing `src/assets/`, so assets referenced by runtime string URLs (`./projects.csv`, `./glints.webp`) keep resolving at the site root with no plugin. Babel/corejs polyfilling is dropped in favor of Vite's modern-browser target.

**Tech Stack:** Vite 8, Sass (existing), papaparse (existing), vanilla JS (unchanged).

**Spec:** `docs/superpowers/specs/2026-06-01-parcel-to-vite-migration-design.md`

**Branch:** Work continues on `migrate-to-vite` (already created; spec already committed there).

---

## Pre-flight facts (verified during design)

- Every asset reference in `src/` uses the root-relative `./name.ext` form. The only `../src/assets/...` reference is the preload in `public/index.html` (fixed in Task 1).
- SCSS files have **no** `url(...)`, `@use`, `@import`, or `@forward` — Vite has nothing to resolve in them.
- Components have no static `import`/`require` of assets — all asset refs are runtime strings.
- `.gitignore` already ignores `node_modules`, `dist`, `.cache`. `dist/` and `.cache` are untracked.
- `CLAUDE.md` is currently **untracked** (new file); it is updated and committed in Task 3.
- Node v22.22.2 / npm 10.9.7 — compatible with Vite 8.

---

## Task 1: Swap toolchain and get `npm run build` passing

This is the atomic migration. The build cannot pass until config, file moves, and dependencies are all changed, so all edits happen before the single verification + commit.

**Files:**

- Create: `vite.config.js`
- Move: `public/index.html` → `index.html` (then edit)
- Move: `public/favicon.ico` → `src/assets/favicon.ico`
- Delete: `.babelrc`, `public/` (emptied by the moves)
- Modify: `package.json`
- Regenerate: `package-lock.json`; stage deletion of `yarn.lock`

- [ ] **Step 1: Create `vite.config.js`**

Create `vite.config.js` with exactly:

```js
import { defineConfig } from "vite";

export default defineConfig({
  publicDir: "src/assets", // copied verbatim to dist root; ./glints.webp -> /glints.webp
  server: { port: 9000 }, // preserve the current `npm run dev` port
  build: { outDir: "dist" }, // unchanged -> Netlify/Vercel publish dir stays "dist"
});
```

- [ ] **Step 2: Move the entry HTML and favicon (staged via git)**

Run:

```bash
git mv public/index.html index.html
git mv public/favicon.ico src/assets/favicon.ico
```

`public/` had only those two tracked files, so git drops the now-empty directory automatically.

- [ ] **Step 3: Edit `index.html` for Vite**

The moved `index.html` is at the repo root. Vite resolves relative HTML asset paths against the project root, so the three Parcel-style relative paths must become public-root (`/`) paths and the script must be an ES module. Replace the file's contents with exactly:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="description" content="Portfolio, Anuja Ranwalage" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
      rel="stylesheet"
    />
    <link rel="preload" as="image" href="/ar_0.webp" />
    <title>Anuja &bull; Me</title>
  </head>
  <body>
    <div class="content" id="content"></div>
    <script type="module" src="/src/index.js"></script>
  </body>
</html>
```

The three changes vs. the original: `href="./favicon.ico"` → `href="/favicon.ico"`; `href="../src/assets/ar_0.webp"` → `href="/ar_0.webp"`; `<script type="text/javascript" src="../src/index.js">` → `<script type="module" src="/src/index.js">`.

- [ ] **Step 4: Delete the Babel config (staged via git)**

Run:

```bash
git rm .babelrc
```

- [ ] **Step 5: Rewrite `package.json`**

Replace `package.json` with exactly (Vite scripts; Parcel + Babel devDeps removed; `vite` added; `staticFiles` block removed; version bumped to 2.3.0 for the release):

```json
{
  "name": "anuja-me",
  "version": "2.3.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "eslint": "^10.4.1",
    "prettier": "^3.8.3",
    "sass": "^1.26.3",
    "vite": "^8.0.16"
  },
  "dependencies": {
    "papaparse": "^5.4.1"
  }
}
```

- [ ] **Step 6: Clean reinstall to regenerate a Parcel-free lockfile**

Run:

```bash
rm -rf node_modules package-lock.json
npm install
```

Expected: install completes; the printed audit summary should show **0 critical and 0 high** (it may still list moderate/low dev-only findings — those are out of scope).

- [ ] **Step 7: Build and verify output**

Run:

```bash
npm run build
```

Expected: `✓ built in ...`, exit 0. (Harmless Sass deprecation notices may appear; they are non-fatal.)

Then verify the bundle and verbatim assets landed in `dist/`:

```bash
test -f dist/index.html && echo "html OK"
ls dist/assets/*.js >/dev/null 2>&1 && echo "hashed js OK"   # Vite emits hashed JS/CSS under dist/assets/
test -f dist/projects.csv && echo "csv OK"
test -f dist/favicon.ico && echo "favicon OK"
test -f dist/glints.webp && test -f dist/arrow.png && echo "images OK"
echo "verbatim file count (expect 24):" $(comm -12 <(ls src/assets | sort) <(ls dist | sort) | wc -l | tr -d ' ')
```

Expected: every line prints its OK marker and the verbatim count is **24** (23 original assets incl. `projects.csv`, plus the moved `favicon.ico`).

- [ ] **Step 8: Commit the migration**

Run:

```bash
git add vite.config.js index.html src/assets/favicon.ico package.json package-lock.json
git add yarn.lock          # stage the already-removed yarn lockfile
git status --short          # confirm: no .claude/ or CLAUDE.md staged
git commit -m "migrate from parcel v1 to vite"
```

Expected: commit succeeds; `git status --short` before commit shows only the migration paths staged (plus untracked `.claude/`, `CLAUDE.md` left alone).

---

## Task 2: Verify runtime, security, and lint (no code changes expected)

Pure verification of the spec's success criteria. If any check fails, stop and fix before continuing.

- [ ] **Step 1: Confirm 0 high/critical vulnerabilities**

Run:

```bash
npm audit --json | node -e 'let d="";process.stdin.on("data",c=>d+=c);process.stdin.on("end",()=>{const m=JSON.parse(d).metadata.vulnerabilities;console.log("critical:",m.critical,"high:",m.high);process.exit(m.critical+m.high?1:0)})'
```

Expected: `critical: 0 high: 0`, exit 0.

- [ ] **Step 2: Confirm the dev server serves the app and assets**

Run (starts Vite, probes the key URLs, then stops it):

```bash
npm run dev >/tmp/vite-dev.log 2>&1 &
VITE_PID=$!
sleep 3
for url in / /src/index.js /projects.csv /glints.webp /favicon.ico; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:9000$url")
  echo "$code  $url"
done
kill $VITE_PID
```

Expected: every URL returns `200`. (`/` is the HTML shell — it renders to a blank `#content` until JS runs; the 200s on `/src/index.js` and `/projects.csv` confirm the wiring.)

- [ ] **Step 3: Optional visual confirmation**

Open `http://localhost:9000` in a browser (or use the `verify` skill) and confirm: nav, profile image, experience checkmarks, and the Projects section (cards built from `projects.csv` with their images) all render. This is the human-in-the-loop check for the JS-rendered content.

- [ ] **Step 4: Confirm lint still passes**

Run:

```bash
npx eslint src
```

Expected: no output, exit 0.

---

## Task 3: Update `CLAUDE.md`

`CLAUDE.md` still describes Parcel. Update the two bundler-specific statements. (The file is untracked, so this is its first commit.)

**Files:**

- Modify: `CLAUDE.md`

- [ ] **Step 1: Read the current file**

Run: `Read CLAUDE.md` (to get exact surrounding text before editing).

- [ ] **Step 2: Update the "What this is" bundler line**

Replace:

```
**Plain vanilla JavaScript — no React/Vue/framework.** Bundled with Parcel v1. Do not introduce JSX or a framework.
```

with:

```
**Plain vanilla JavaScript — no React/Vue/framework.** Bundled with Vite. Do not introduce JSX or a framework.
```

- [ ] **Step 3: Update the asset-copy architecture line**

Replace:

```
- `src/assets/` is copied verbatim into the build by `parcel-plugin-static-files-copy`. Reference assets by their root-relative runtime path (e.g. `./glints.webp`, `./arrow.png`), not by `src/assets/...`.
```

with:

```
- `src/assets/` is Vite's `publicDir` (configured in `vite.config.js`) — its contents are copied verbatim into the build root. Reference assets by their root-relative runtime path (e.g. `./glints.webp`, `./arrow.png`), not by `src/assets/...`. The HTML entry is the root `index.html`.
```

- [ ] **Step 4: Commit**

Run:

```bash
git add CLAUDE.md
git commit -m "update claude.md for vite migration"
```

Expected: commit succeeds.

---

## Task 4: Finishing up

- [ ] **Step 1: Tidy `.gitignore` (remove the Parcel-only `.cache` entry)**

Replace `.gitignore` contents with exactly (adds a trailing newline; drops the now-unused `.cache`; Vite's cache lives under the already-ignored `node_modules/.vite`):

```
node_modules
dist
```

- [ ] **Step 2: Commit the cleanup**

Run:

```bash
git add .gitignore
git commit -m "drop parcel .cache from gitignore"
```

- [ ] **Step 3: Final whole-repo sanity check**

Run:

```bash
git status --short        # working tree clean except untracked .claude/
npm run build             # one more clean build, exit 0
npm audit | tail -1       # confirms residual moderate/low only
```

Expected: build exits 0; no high/critical in the audit summary.

- [ ] **Step 4: Hand off for integration**

The branch `migrate-to-vite` is ready. Per the project workflow, open a PR into `main` (merges auto-deploy via Netlify/Vercel). After the first deploy, confirm in the Netlify/Vercel dashboard that the build command is `npm run build` and the publish directory is `dist` (unchanged from Parcel, so it should already match). Use the `pr-description` skill for the PR text.

---

## Self-review notes

- **Spec coverage:** Target structure (Task 1 steps 1–5), `vite.config.js` (T1 s1), `index.html` edits (T1 s3), `package.json` changes (T1 s5), success criteria #1 build/assets (T1 s7), #2 dev server (T2 s2–3), #3 audit 0 high/critical (T2 s1), #4 eslint (T2 s4), docs (T3) — all mapped.
- **Correction vs. spec:** the spec said the favicon `<link>` was "unchanged"; in fact its `href` must change `./favicon.ico` → `/favicon.ico` because Vite resolves root-`index.html` relative paths against the project root. Captured in T1 s3.
- **No placeholders:** every code/edit step shows full content; every command shows expected output.
