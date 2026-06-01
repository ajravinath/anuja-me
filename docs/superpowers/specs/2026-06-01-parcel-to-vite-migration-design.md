# Parcel v1 → Vite Migration — Design

**Date:** 2026-06-01
**Status:** Approved (design phase)

## Motivation

`npm audit` reports 16 remaining high/critical vulnerabilities, all rooted in
`parcel-bundler@1.12.5` (abandoned since ~2020) and its plugin's transitive
`minimatch`. None are fixable in place: `npm audit fix` is a no-op (everything is
pinned inside Parcel's tree) and `npm audit fix --force` downgrades the static-file
plugin back to a broken/vulnerable state. These are all build-time `devDependencies`
with no runtime exposure on the deployed static site, but the user has chosen to
remove the root cause by replacing the bundler.

Removing `parcel-bundler` and `parcel-plugin-static-files-copy` eliminates the
entire vulnerable subtree.

> Note: this intentionally supersedes the current `CLAUDE.md` statement "Bundled
> with Parcel v1." `CLAUDE.md` will be updated as part of this work.

## Decision

- **Bundler:** Vite (latest).
- **Browser target:** modern only — drop Babel/corejs polyfills. Reversible later
  via `@vitejs/plugin-legacy` if old-browser reach is ever needed again.

### Why Vite

The site references most assets by **runtime string URLs**, not bundler imports:

- `src/index.js`: `Papa.parse("./projects.csv", { download: true })`
- components emit `<img src="./glints.webp">` etc.
- `projects.csv` `image` column holds values like `"./glints.webp"`.

Vite's `publicDir` copies a directory verbatim to the output root, referenced by
root-relative URL — an exact match for this pattern, with zero plugins. Pointing
`publicDir` at the existing `src/assets/` keeps that folder canonical, so `CLAUDE.md`
and the `/add-project` skill ("file must exist in `src/assets/`") stay valid.

Parcel 2 only copies assets it can statically see, so it would require re-adding a
static-copy plugin (reintroducing the same class of dependency). esbuild would mean
hand-rolling HTML/SCSS/asset-copy handling. Both rejected.

## Current state (facts)

- Entry HTML: `public/index.html` → loads `../src/index.js`, preloads
  `../src/assets/ar_0.webp`, icon `./favicon.ico`.
- Entry JS: `src/index.js` imports `./index.scss`, `./media.scss`, components, and
  `papaparse`; fetches `./projects.csv`.
- Components (`src/components/*.js`) return HTML template-literal strings; all asset
  refs use the root-relative `./name.ext` form (verified by grep — only the HTML
  preload uses `../src/assets/...`).
- `.babelrc`: `@babel/plugin-transform-runtime` with corejs 3 + regenerator.
- Static assets: 23 files in `src/assets/` (images + `projects.csv`), copied verbatim
  today by `parcel-plugin-static-files-copy` (`staticFiles` config in package.json).
- `favicon.ico` lives in `public/`.
- Build output: `dist/` (Netlify/Vercel auto-deploy on merge to `main`).
- No `netlify.toml` / `vercel.json` / `.browserslistrc`.
- Node v22.22.2, npm 10.9.7 (fine for latest Vite).

## Target structure

| Action          | From                 | To                         | Why                                          |
| --------------- | -------------------- | -------------------------- | -------------------------------------------- |
| Move HTML entry | `public/index.html`  | `./index.html` (repo root) | Vite uses root `index.html` as entry         |
| Move favicon    | `public/favicon.ico` | `src/assets/favicon.ico`   | Copied verbatim to output root via publicDir |
| Remove dir      | `public/`            | —                          | Emptied by the two moves                     |
| Delete          | `.babelrc`           | —                          | Modern target; esbuild transforms            |
| Add             | —                    | `vite.config.js`           | publicDir + dev port                         |

`src/assets/` remains the canonical asset folder, configured as Vite `publicDir`.

## `vite.config.js`

```js
import { defineConfig } from "vite";

export default defineConfig({
  publicDir: "src/assets", // copied verbatim to dist root; ./glints.webp -> /glints.webp
  server: { port: 9000 }, // preserve current `npm run dev` port
  build: { outDir: "dist" }, // unchanged -> Netlify/Vercel publish dir stays "dist"
});
```

`base` stays the default `/` (site deploys at domain root, so `./projects.csv`
resolves to `/projects.csv`).

## `index.html` edits (after moving to repo root)

- `<script type="text/javascript" src="../src/index.js">`
  → `<script type="module" src="/src/index.js">`
- `<link rel="preload" as="image" href="../src/assets/ar_0.webp">`
  → `href="/ar_0.webp"`
- `<link rel="icon" type="image/x-icon" href="./favicon.ico">` — unchanged
  (favicon now served at root via publicDir).

## `package.json` changes

- **scripts:** `dev` → `vite`; `build` → `vite build`; add `preview` → `vite preview`.
- **remove devDeps:** `parcel-bundler`, `parcel-plugin-static-files-copy`,
  `@babel/core`, `@babel/plugin-transform-runtime`, `@babel/runtime-corejs3`.
- **add devDep:** `vite` (latest).
- **remove** the `staticFiles` config block.
- **keep:** `sass`, `papaparse`, `eslint`, `prettier`.

## Docs

- `CLAUDE.md`: replace "Bundled with Parcel v1. Do not introduce ..." bundler text
  with Vite; update the Architecture asset note to mention `publicDir`; refresh the
  Commands section. (The `staticFiles`/`parcel-plugin-static-files-copy` mention is
  removed.)
- `/add-project` skill: no change needed (assets still live in `src/assets/`).

## Success criteria

1. `npm run build` succeeds; `dist/` contains `index.html`, hashed JS/CSS, **and**
   the full contents of `src/assets/` verbatim at the root — 24 files: the 23
   existing assets (including `projects.csv`) plus the moved `favicon.ico`.
2. `npm run dev` serves on `:9000`; page renders, projects load from CSV, images
   display (verified by launching the dev server).
3. `npm audit` → **0 high / 0 critical**.
4. `npx eslint src` still passes.

## Risks / trade-offs

- **Dropping Babel/corejs** removes old-browser polyfills (modern target). Acceptable
  for a personal portfolio; reversible via `@vitejs/plugin-legacy`.
- **`publicDir: src/assets`** is slightly non-standard but deliberately preserves the
  project structure and existing docs/skill.
- **Netlify/Vercel:** build command `npm run build` + publish dir `dist` already
  match Parcel's output, so deploy should keep working. User to confirm dashboard
  settings once after merge.

## Out of scope

- No change to component code, SCSS, or `projects.csv` content.
- No refactoring beyond what the bundler swap requires.
- Moderate/low `npm audit` findings (dev-only) are not targeted by this work.
