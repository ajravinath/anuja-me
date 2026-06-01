## What this is

A personal portfolio site (`anuja-me`). **Plain vanilla JavaScript — no React/Vue/framework.** Bundled with Vite. Do not introduce JSX or a framework.

## Commands

- check `package.json` scripts for commands
- Lint: `npx eslint src` (ESLint 10 flat config in `eslint.config.mjs` — `eslint:recommended` + browser globals; there is **no `lint` script**).

## Architecture

- Entry: `src/index.js` fetches/parses `src/assets/projects.csv` (via papaparse), then builds the page by concatenating component output into one HTML string and assigning it to `#content`'s `innerHTML`.
- **Components** (`src/components/*.js`) are plain arrow functions that **return HTML template-literal strings** — not DOM nodes, not JSX. Tag the template with a `/*html*/` comment for editor highlighting, and `export default` the function. Match the existing component style when adding new ones.
- Shared/global state is hung off the `document` object (e.g. `document.myName`, `document.renderProject`) rather than passed as params. Follow this pattern only where the existing code already does.
- Styles: `src/index.scss` (main) and `src/media.scss` (responsive/media queries) — both imported from `src/index.js`.
- `src/assets/` is Vite's `publicDir` (set in `vite.config.js`) — its contents are copied verbatim into the build root. Reference assets by their root-relative runtime path (e.g. `./glints.webp`, `./arrow.png`), not by `src/assets/...`. The HTML entry is the root `index.html`.

## Editing project data (`src/assets/projects.csv`)

Columns, in order: `title,description,code,link,image`. The first row is a header and is skipped at render time. The literal string `"null"` (not empty) in the `code` or `link` column disables the corresponding button. The `image` value is a root-relative filename (e.g. `./glints.webp`) whose file must exist in `src/assets/`. (See the `/add-project` skill.)

## Style

Prettier formats on save (VSCode `esbenp.prettier-vscode`, no config file → Prettier defaults: 2-space indent, double quotes, semicolons). Keep edits consistent with that.

## Git workflow

Feature work goes on the `dev` branch, then a PR into `main` (PRs are merged, not squashed). Keep commit messages short and lowercase (e.g. `add stackoverflow link`, `update version to 2.2.3`). Bump the `version` in `package.json` for releases. Merges to `main` auto-deploy via Netlify/Vercel.
