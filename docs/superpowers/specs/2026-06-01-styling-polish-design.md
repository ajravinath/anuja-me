# Styling Polish — `anuja-me`

**Date:** 2026-06-01
**Status:** Approved design, pending implementation plan
**Branch:** `styling-polish` (off `main`) → PR into `main`

## Goal

Polish the portfolio's styling from "generic dev-portfolio template" to something
that feels intentional and refined, without restructuring the page or introducing
a framework. Direction chosen: **Refined Light** — keep the clean light identity,
elevate type/spacing/color/motion. Add a **teal accent**, a **dark-mode toggle**,
and **fold in known bugs**.

### Decisions locked during brainstorming

| Decision         | Choice                                                                     |
| ---------------- | -------------------------------------------------------------------------- |
| Design direction | Refined Light (keep current layout & identity)                             |
| Accent colour    | Teal/Emerald — `#0D9488` (light), `#14B8A6`/`#2DD4BF` (dark, for contrast) |
| Dark mode        | Yes — light/dark toggle with persistence                                   |
| Cards layout     | Projects + skills wrap into a responsive grid (no horizontal scroll)       |
| Bug fixes        | Folded into this work                                                      |
| Stack            | Stays vanilla JS + SCSS, Vite. **No new dependencies, no framework.**      |

## Constraints

- Components remain plain arrow functions returning HTML template-literal strings
  (tagged `/*html*/`), `export default`. No JSX, no DOM-node construction.
- Shared/global state continues to hang off `window`/`document` (e.g. `window.toggleOpen`),
  matching existing patterns — only where the existing code already does this.
- Styles stay in `src/index.scss` (main) + `src/media.scss` (responsive), imported from
  `src/index.js`. Assets referenced by root-relative runtime paths.
- Prettier defaults (2-space indent, double quotes, semicolons). `npx eslint src` must pass.

## Design

### 1. Design tokens + theming (foundation)

Introduce CSS custom properties in `index.scss`, defined once and consumed everywhere:

```
--bg, --surface, --text, --text-muted, --border, --accent, --accent-contrast, --shadow
```

- `:root` holds the **light** palette; `:root[data-theme="dark"]` (or `[data-theme="dark"]`)
  overrides with the **dark** palette.
- Every hardcoded colour currently scattered through the SCSS
  (`rgb(85,85,85)`, `rgb(53,53,53)`, `rgb(163,163,163)`, `white`, `black`,
  `rgb(250,250,250)`, the `rgb(14,23,146)` "year" blue) is replaced by the matching token.
- Accent: `--accent: #0D9488` in light; brightened in dark (`#14B8A6`/`#2DD4BF`) so it stays
  legible on the dark surface.

**Light palette (target):** bg `#fafafa`/`#fff`, surface `#fff`, text `#111`,
text-muted `#6b7280`, border `#ececec`/`#eee`, accent `#0D9488`.

**Dark palette (target):** bg `#0f1413`, surface `#161c1b`, text `#f3f5f4`,
text-muted `#9aa3a1`, border `#233029`, accent `#14B8A6`.
(Exact values may be nudged during implementation for contrast.)

### 2. Dark-mode toggle

- New component `src/components/theme-toggle.js` — returns an HTML string for a small
  ◐ toggle button. Its click handler is hung off `window` (e.g. `window.toggleTheme`),
  matching the existing `window.toggleOpen` pattern in `side-menu.js`.
- `toggleTheme` flips `data-theme` on `document.documentElement` and writes the choice to
  `localStorage` (key e.g. `theme`).
- The toggle is rendered in **both** the desktop nav (`nav.js`) and the hamburger menu
  (`side-menu.js`) so it's reachable at every breakpoint.
- **Anti-FOUC:** a tiny inline `<script>` in `index.html` runs before the module bundle,
  reading `localStorage.theme` (falling back to `prefers-color-scheme`) and setting
  `data-theme` on `<html>` immediately, so the correct theme paints on first frame.

### 3. Visual refinement (no layout restructure)

- **Type:** keep Poppins; define a consistent scale for `.title` (h1/h2), `h3`,
  body, and the small "eyebrow" labels.
- **Eyebrows:** standardize `.section__text__p1` ("Get to know more", "Explore My", …)
  as small, uppercase, letter-spaced, accent-coloured text.
- **Spacing:** consistent section padding, container width, and gap rhythm.
- **Cards:** unify `.details-container` / `.color-container` — consistent radius, border,
  soft shadow, and a subtle hover lift.
- **Buttons:** refine the pill buttons into clean primary (filled) / secondary (outline)
  states built on tokens; remove the current broken/mis-grouped hover rules (see §6).

### 4. Cards → responsive grid

- Projects (`.about-projects` inside `.experience-details-container.pj`) move from
  `overflow-x: scroll` to CSS `grid` with `repeat(auto-fill, minmax(...))`, wrapping and
  centering by viewport width. The forced horizontal scroll is removed.
- Skills articles wrap into a neat grid the same way.
- `media.scss` breakpoints (1400 / 1200 / 600) updated to match the new spacing and grid.

### 5. Motion

- Subtle only: hover lifts on cards/buttons/icons, smooth colour transitions, and an
  optional fade/slide-in-on-scroll using a small vanilla `IntersectionObserver`.
- All motion wrapped in `@media (prefers-reduced-motion: reduce)` so it's disabled for
  users who opt out. Keep existing `scroll-behavior: smooth`.

### 6. Bug fixes (folded in)

- Malformed headings — `<h2 class="title">…</h1>` in `section-about.js`,
  `section-experience.js`, `section-projects.js`, `section-contact.js`, and
  `<h3 …>…</h2>` in `section-projects.js` → matched closing tags.
- Duplicate **"TypeScript"** entry in the Languages list (`section-experience.js`) → removed.
- Broken `.btn-color-2:hover { background: rgb(255,255,255) 0.1rem solid; }` (invalid) and
  the mis-grouped `.btn-color-1, .btn-color-2:hover { … }` selector → rebuilt cleanly on tokens.
- `transition: all 0.3 ease-in-out` (missing `s` unit, two occurrences) → `0.3s`.
- Hamburger links `#project` / `#contacts` (`side-menu.js`) → `#projects` / `#contact`
  (they currently fail to scroll to their sections).
- Footer "© 2023" (`footer.js`) → dynamic current year.
- Quote the unquoted `<img src=${project[4]}>` in `section-projects.js`.

## Files touched

| File                                   | Change                                                                        |
| -------------------------------------- | ----------------------------------------------------------------------------- |
| `src/index.scss`                       | Token system + refined styles (colors, type, spacing, cards, buttons, motion) |
| `src/media.scss`                       | Responsive tweaks + grid layout for projects/skills                           |
| `index.html`                           | Anti-FOUC inline theme script                                                 |
| `src/index.js`                         | Wire theme init; include `ThemeToggle` in render                              |
| `src/components/theme-toggle.js`       | **New** — toggle component + `window.toggleTheme`                             |
| `src/components/nav.js`                | Add toggle to desktop nav                                                     |
| `src/components/side-menu.js`          | Add toggle to hamburger menu; fix anchor hrefs                                |
| `src/components/section-about.js`      | Fix heading tag                                                               |
| `src/components/section-experience.js` | Fix heading tag; remove duplicate skill                                       |
| `src/components/section-projects.js`   | Fix heading tags; quote img src                                               |
| `src/components/section-contact.js`    | Fix heading tag                                                               |
| `src/components/footer.js`             | Dynamic year                                                                  |
| `package.json`                         | Bump `version` (e.g. 2.3.0 → 2.4.0)                                           |

## Out of scope

- No page/section restructure, no new content sections.
- No framework, no new runtime dependencies.
- No backend, no analytics.
- Editing actual project data (`projects.csv`) — content stays as-is.

## Verification

No automated test suite exists. Verification is manual + lint/build:

1. `npm run dev` — eyeball every section (profile, about, experience, projects, contact, footer).
2. Toggle dark/light; confirm it persists across a page reload and respects
   `prefers-color-scheme` on first visit (no flash of wrong theme).
3. Check the three breakpoints (≤1400, ≤1200, ≤600) — projects/skills wrap as a grid,
   hamburger menu works, toggle reachable.
4. Verify `prefers-reduced-motion` disables the scroll/hover animations.
5. `npx eslint src` passes.
6. `npm run build` succeeds.

## Workflow

- Implement on `styling-polish` (off `main`), PR into `main` (merge, not squash). Merge to `main` auto-deploys.
- Short lowercase commit messages (e.g. `add teal accent + dark toggle`).
