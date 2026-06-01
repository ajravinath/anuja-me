# Styling Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Polish the `anuja-me` portfolio into a refined light/dark themed site with a teal accent, a responsive card grid, subtle motion, and a set of folded-in markup bug fixes — without restructuring the page or adding dependencies.

**Architecture:** A CSS custom-property (design-token) layer in `src/index.scss` drives both light and dark themes; an anti-FOUC inline script in `index.html` sets the theme before paint; a plain-JS toggle component (HTML-string, `window.toggleTheme`) flips `data-theme` on `<html>` and persists to `localStorage`. Visual refinement, the projects/skills grid, and `IntersectionObserver`-based scroll-in motion build on top of the tokens.

**Tech Stack:** Vanilla JS (HTML-string components), SCSS (`sass`), Vite, papaparse. **No new dependencies. No framework.**

---

## Important: this project has no automated test harness

There is no unit-test runner, and the spec/owner explicitly scoped one out (adding one would violate "no new dependencies"). So **"the test"** for every task below is:

1. `npx eslint src` → must pass clean.
2. `npm run build` → must succeed.
3. The described **manual visual check** via `npm run dev` (open the printed localhost URL).

Do **not** introduce Vitest/Jest/etc. Each task ends by running those three checks and committing.

**Branch:** Already on `styling-polish` (off `main`). Commit per task; do not push or open a PR until the owner asks. Commit messages: short, lowercase (project convention).

---

## File Structure

| File                                   | Responsibility                                 | Tasks         |
| -------------------------------------- | ---------------------------------------------- | ------------- |
| `src/components/section-about.js`      | About section markup                           | 1             |
| `src/components/section-experience.js` | Experience/skills markup                       | 1             |
| `src/components/section-projects.js`   | Projects markup                                | 1             |
| `src/components/section-contact.js`    | Contact markup                                 | 1             |
| `src/components/footer.js`             | Footer markup                                  | 1             |
| `src/components/side-menu.js`          | Hamburger nav markup + `window.toggleOpen`     | 1, 3          |
| `index.html`                           | HTML entry + anti-FOUC theme script            | 2             |
| `src/index.scss`                       | Tokens + all base/visual styles                | 2, 3, 4, 5, 6 |
| `src/media.scss`                       | Responsive overrides                           | 5             |
| `src/components/theme-toggle.js`       | **New** — toggle button + `window.toggleTheme` | 3             |
| `src/components/nav.js`                | Desktop nav markup                             | 3             |
| `src/index.js`                         | Render orchestration + scroll-in observer      | 3, 6          |
| `package.json`                         | Version bump                                   | 7             |

---

## Task 1: Fix component markup & content bugs

Pure HTML-string fixes in components. No CSS. Class names drive styling, so render is essentially unchanged — these are correctness/accessibility fixes.

**Files:**

- Modify: `src/components/section-about.js`
- Modify: `src/components/section-experience.js`
- Modify: `src/components/section-projects.js`
- Modify: `src/components/section-contact.js`
- Modify: `src/components/footer.js`
- Modify: `src/components/side-menu.js`

- [ ] **Step 1: Fix the `</h1>` closing tags on the four `<h2 class="title">` headings**

In `src/components/section-about.js`, change:

```js
      <h2 class="title">About Me</h1>
```

to:

```js
<h2 class="title">About Me</h2>
```

In `src/components/section-experience.js`, change:

```js
      <h2 class="title">Experience</h1>
```

to:

```js
<h2 class="title">Experience</h2>
```

In `src/components/section-contact.js`, change:

```js
      <h2 class="title">Contact me</h1>
```

to:

```js
<h2 class="title">Contact me</h2>
```

In `src/components/section-projects.js`, change:

```js
      <h2 class="title">Projects</h1>
```

to:

```js
<h2 class="title">Projects</h2>
```

- [ ] **Step 2: Fix the project-title heading tag + quote the img src + improve alt text**

In `src/components/section-projects.js`, inside the `renderProject` template, change:

```js
            <img src=${project[4]} alt="project 1" class="project-img" />
```

to:

```js
<img src="${project[4]}" alt="${project[0]}" class="project-img" />
```

and change:

```js
          <h3 class="experience-sub-title project-title">${project[0]}</h2>
```

to:

```js
<h3 class="experience-sub-title project-title">${project[0]}</h3>
```

- [ ] **Step 3: Remove the duplicate "TypeScript" skill in Languages**

In `src/components/section-experience.js`, the Languages list contains TypeScript twice. Delete the **second** occurrence (the one that sits between the `Python` article and the `CSS 3` article) — this exact block:

```js
<article>
  <img src="./checkmark.png" alt="experience icon" class="icon" />
  <div>
    <p>TypeScript</p>
    <p>Experienced</p>
  </div>
</article>
```

Leave the first TypeScript article (right after JavaScript) in place.

- [ ] **Step 4: Fix the broken hamburger menu anchor hrefs**

In `src/components/side-menu.js`, change:

```js
                <li><a href="#project" onclick="toggleOpen()">Projects</a></li>
                <li><a href="#contacts" onclick="toggleOpen()">Contact</a></li>
```

to:

```js
                <li><a href="#projects" onclick="toggleOpen()">Projects</a></li>
                <li><a href="#contact" onclick="toggleOpen()">Contact</a></li>
```

- [ ] **Step 5: Make the footer year dynamic**

In `src/components/footer.js`, change:

```js
<p>© 2023 ${document.myName}</p>
```

to:

```js
<p>
  © ${new Date().getFullYear()} ${document.myName}
</p>
```

- [ ] **Step 6: Verify**

Run: `npx eslint src` → Expected: no errors.
Run: `npm run build` → Expected: build succeeds.
Run `npm run dev`, open the site: every section header still shows, the hamburger menu (narrow the window < 1200px) links now jump to Projects and Contact, the Languages list no longer repeats TypeScript, the footer shows the current year.

- [ ] **Step 7: Commit**

```bash
git add src/components/
git commit -m "fix component markup and content bugs"
```

---

## Task 2: Design tokens + anti-FOUC theme init

Introduce the light/dark token layer and the inline script that sets the theme before the bundle runs. Buttons are intentionally **left for Task 4** (they're rebuilt there); this task tokenizes everything else.

**Files:**

- Modify: `src/index.scss` (top of file + color references throughout)
- Modify: `index.html` (head)

- [ ] **Step 1: Add the token blocks at the very top of `src/index.scss`**

Insert above the existing `* { margin: 0; padding: 0; }` rule:

```scss
:root {
  --bg: #fafafa;
  --surface: #ffffff;
  --text: #111111;
  --text-muted: #6b7280;
  --border: #e6e6e6;
  --accent: #0d9488;
  --accent-contrast: #ffffff;
  --shadow: 0 6px 20px rgba(17, 17, 17, 0.06);
  --shadow-hover: 0 12px 28px rgba(17, 17, 17, 0.1);
}

:root[data-theme="dark"] {
  --bg: #0f1413;
  --surface: #161c1b;
  --text: #f3f5f4;
  --text-muted: #9aa3a1;
  --border: #233029;
  --accent: #14b8a6;
  --accent-contrast: #06251f;
  --shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
  --shadow-hover: 0 12px 28px rgba(0, 0, 0, 0.5);
}
```

- [ ] **Step 2: Make `body` consume the background/text tokens**

Change the existing `body` rule:

```scss
body {
  font-family: "Poppins", sans-serif;
}
```

to:

```scss
body {
  font-family: "Poppins", sans-serif;
  background: var(--bg);
  color: var(--text);
  transition:
    background 0.3s ease,
    color 0.3s ease;
}
```

- [ ] **Step 3: Replace the remaining hardcoded colors with tokens (except `.btn*`)**

Apply these exact replacements in `src/index.scss`:

| Selector                                                  | Old                                                                                                       | New                                                                                                   |
| --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `p`                                                       | `color: rgb(85, 85, 85);`                                                                                 | `color: var(--text-muted);`                                                                           |
| `a`                                                       | `color: black;`                                                                                           | `color: var(--text);`                                                                                 |
| `a:hover`                                                 | `color: gray;` and `text-decoration-color: rgb(181, 181, 181);`                                           | `color: var(--accent);` and `text-decoration-color: var(--accent);`                                   |
| `.hamburger-icon span`                                    | `background-color: black;`                                                                                | `background-color: var(--text);`                                                                      |
| `.menu-links`                                             | `background-color: white;`                                                                                | `background-color: var(--surface);`                                                                   |
| `.menu-links a`                                           | `color: black;`                                                                                           | `color: var(--text);`                                                                                 |
| `.about-details-container .text-container .year`          | `color: rgb(14, 23, 146);`                                                                                | `color: var(--accent);`                                                                               |
| `.about-details-container .text-container .about-caption` | `color: black;`                                                                                           | `color: var(--text);`                                                                                 |
| `.details-container`                                      | `border: rgb(53, 53, 53) 0.1rem solid; border-color: rgb(163, 163, 163);` and `background: white;`        | `border: 1px solid var(--border);` (delete the `border-color` line) and `background: var(--surface);` |
| `.experience-sub-title`                                   | `color: rgb(85, 85, 85);`                                                                                 | `color: var(--text-muted);`                                                                           |
| `.color-container`                                        | `border-color: rgb(163, 163, 163); background: rgb(250, 250, 250);`                                       | `border-color: var(--border); background: var(--surface);`                                            |
| `.project-img`                                            | `filter: drop-shadow(0 0 0.3rem rgb(163, 163, 163));`                                                     | `filter: drop-shadow(0 0 0.3rem var(--border));`                                                      |
| `.project-title`                                          | `color: black;`                                                                                           | `color: var(--text);`                                                                                 |
| `.project-btn`                                            | `color: black; border-color: rgb(163, 163, 163);`                                                         | `color: var(--accent); border-color: var(--accent);`                                                  |
| `.contact-info-upper-container`                           | `border: rgb(53, 53, 53) 0.1rem solid; border-color: rgb(163, 163, 163); background: rgb(250, 250, 250);` | `border: 1px solid var(--border); background: var(--surface);` (delete the `border-color` line)       |

Leave the `.btn`, `.btn-color-1`, `.btn-color-2` rules exactly as they are for now (rebuilt in Task 4).

**Also** fix two malformed `transition` values in the same file (the `s` unit is missing). In both `.hamburger-icon span` and `.menu-links a`, change:

```scss
transition: all 0.3 ease-in-out;
```

to:

```scss
transition: all 0.3s ease-in-out;
```

- [ ] **Step 4: Add the anti-FOUC inline script to `index.html`**

In `index.html`, add this `<script>` inside `<head>`, immediately **before** the `<title>` line:

```html
<script>
  (function () {
    try {
      var t = localStorage.getItem("theme");
      if (!t)
        t = window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      document.documentElement.setAttribute("data-theme", t);
    } catch (e) {}
  })();
</script>
```

- [ ] **Step 5: Verify**

Run: `npx eslint src` → Expected: no errors.
Run: `npm run build` → Expected: build succeeds.
Run `npm run dev`: the light theme looks consistent (slightly cleaner greys, teal "year" labels in About). Then in DevTools console run `document.documentElement.setAttribute('data-theme','dark')` — backgrounds, text, cards, and contact box should flip to the dark palette (buttons will look unstyled-dark; that's expected, fixed in Task 4). Reload with `localStorage.setItem('theme','dark')` set and confirm the page paints dark with no white flash.

- [ ] **Step 6: Commit**

```bash
git add src/index.scss index.html
git commit -m "add design tokens and anti-fouc theme init"
```

---

## Task 3: Theme toggle component + wiring

**Files:**

- Create: `src/components/theme-toggle.js`
- Modify: `src/components/nav.js`
- Modify: `src/components/side-menu.js`
- Modify: `src/index.js`
- Modify: `src/index.scss` (toggle button style)

- [ ] **Step 1: Create the toggle component**

Create `src/components/theme-toggle.js`:

```js
const ThemeToggle = () => {
  window.toggleTheme = () => {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // ignore storage errors (e.g. private mode)
    }
    document.querySelectorAll(".theme-toggle").forEach((btn) => {
      btn.textContent = next === "dark" ? "☀" : "☾";
    });
  };

  const current =
    document.documentElement.getAttribute("data-theme") || "light";
  const icon = current === "dark" ? "☀" : "☾";

  return /*html*/ `<button class="theme-toggle" type="button" aria-label="Toggle colour theme" title="Toggle theme" onclick="toggleTheme()">${icon}</button>`;
};

export default ThemeToggle;
```

- [ ] **Step 2: Place the toggle in the desktop nav**

In `src/components/nav.js`, add the import-free call by interpolating it. Change the closing of the nav so the toggle sits after the links list:

```js
const Nav = () => {
  const template = /*html*/ `<nav id="desktop-nav">
  <div class="logo">${document.myName}</div>
  <div class="nav-right">
    <ul class="nav-links">
      <li>
      <a href="#about">About</a>
      </li>
      <li><a href="#experience">Experience</a>
      </li>
      <li><a href="#projects">Projects</a>
      </li>
      <li><a href="#contact">Contact</a></li>
    </ul>
    ${ThemeToggle()}
  </div>
  </nav>`;

  return template;
};
```

Add the import at the top of the file:

```js
import ThemeToggle from "./theme-toggle";
```

- [ ] **Step 3: Place the toggle in the hamburger nav**

In `src/components/side-menu.js`, add the import at the top:

```js
import ThemeToggle from "./theme-toggle";
```

Then add the toggle next to the hamburger icon. Change:

```js
        <div class="hamburger-menu">
            <div class="hamburger-icon" onclick="toggleOpen()">
```

to:

```js
        <div class="hamburger-menu">
            ${ThemeToggle()}
            <div class="hamburger-icon" onclick="toggleOpen()">
```

> Note: `ThemeToggle()` defines `window.toggleTheme` each time it is called; being called from both `Nav` and `SideMenu` is harmless (same definition).

- [ ] **Step 4: Style the toggle button in `src/index.scss`**

Add near the nav rules:

```scss
.nav-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

// keep the toggle and hamburger icon side-by-side on narrow screens
.hamburger-menu {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
}

.theme-toggle {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text);
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  font-size: 1rem;
  line-height: 1;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition:
    border-color 0.2s ease,
    transform 0.2s ease;
}

.theme-toggle:hover {
  border-color: var(--accent);
  color: var(--accent);
  transform: translateY(-1px);
}
```

- [ ] **Step 5: Verify**

Run: `npx eslint src` → Expected: no errors.
Run: `npm run build` → Expected: build succeeds.
Run `npm run dev`: a ☾ button appears in the desktop nav (and in the hamburger header below 1200px). Click it → whole site flips to dark and the icon becomes ☀. Reload → it stays dark (persisted). Clear `localStorage` and set your OS to light/dark → first load matches the OS preference, no white flash. (Buttons still look rough — fixed next.)

- [ ] **Step 6: Commit**

```bash
git add src/components/theme-toggle.js src/components/nav.js src/components/side-menu.js src/index.scss
git commit -m "add light/dark theme toggle"
```

---

## Task 4: Visual refinement — type, eyebrows, buttons, cards

Rebuild the buttons cleanly on tokens (this fixes the broken/mis-grouped hover rules), standardize the eyebrow labels and headings, unify card styling, and add subtle hover lifts.

**Files:**

- Modify: `src/index.scss`

- [ ] **Step 1: Rebuild the button block**

In `src/index.scss`, **delete** the entire existing button section — every rule from `.btn { ... }` through the duplicated `.btn-container { gap: 1rem; }`, i.e. all of:
`.btn`, `.btn-color-1, .btn-color-2`, `.btn-color-1:hover, .btn-color-2:hover`, `.btn-color-1, .btn-color-2:hover`, `.btn-color-1:hover`, `.btn-color-2`, `.btn-color-2:hover`, and the second `.btn-container`.
Replace with:

```scss
.btn {
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.75rem 1.25rem;
  min-width: 8rem;
  border-radius: 999px;
  border: 1.5px solid transparent;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    background 0.2s ease,
    color 0.2s ease,
    box-shadow 0.2s ease,
    filter 0.2s ease;
}

.btn:hover {
  transform: translateY(-2px);
}

.btn:active {
  transform: translateY(0);
}

// primary (filled)
.btn-color-1 {
  background: var(--accent);
  color: var(--accent-contrast);
  border-color: var(--accent);
}

.btn-color-1:hover {
  filter: brightness(1.08);
  box-shadow: var(--shadow);
}

// secondary (outline)
.btn-color-2 {
  background: transparent;
  color: var(--accent);
  border-color: var(--accent);
}

.btn-color-2:hover {
  background: var(--accent);
  color: var(--accent-contrast);
}
```

(The `.btn-container` flex/centering rule earlier in the file stays; only the duplicate second `.btn-container { gap: 1rem; }` is removed.)

- [ ] **Step 2: Style the eyebrow labels and refine the title**

Replace the existing `.section__text__p1` rule:

```scss
.section__text__p1 {
  font-size: 1.05rem;
  // display: none;
  text-align: center;
}
```

with:

```scss
.section__text__p1 {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-weight: 600;
  color: var(--accent);
  text-align: center;
}
```

And replace the `.title` rule:

```scss
.title {
  font-size: 3rem;
  text-align: center;
}
```

with:

```scss
.title {
  font-size: 2.75rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  text-align: center;
  margin-bottom: 1.5rem;
}
```

- [ ] **Step 3: Unify card styling + hover lift**

Replace the `.details-container` rule (as left after Task 2) with:

```scss
.details-container {
  border: 1px solid var(--border);
  border-radius: 1.25rem;
  padding: 1.5rem;
  flex: 1;
  background: var(--surface);
  box-shadow: var(--shadow);
  text-align: center;
  justify-self: center;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.details-container:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-hover);
}
```

- [ ] **Step 4: Verify**

Run: `npx eslint src` → Expected: no errors.
Run: `npm run build` → Expected: build succeeds.
Run `npm run dev`: "View CV" is an outline-teal pill, "Contact Info" is a filled-teal pill; hovering a secondary button fills it teal, hovering primary brightens it — both lift slightly. Eyebrow labels ("Get to know more", "Explore My", "Browse My Recent", "Get in Touch") are small uppercase teal. Cards have soft shadows and lift on hover. Toggle to dark and confirm buttons/cards read correctly there too.

- [ ] **Step 5: Commit**

```bash
git add src/index.scss
git commit -m "refine typography, buttons and cards"
```

---

## Task 5: Projects & skills → responsive grid

Replace the forced horizontal scroll with grids that wrap by viewport width.

**Files:**

- Modify: `src/index.scss`
- Modify: `src/media.scss`

- [ ] **Step 1: Turn off the horizontal scroll on the projects strip**

In `src/index.scss`, change the `.experience-details-container` rule's `&.pj` modifier:

```scss
&.pj {
  overflow-x: scroll;
}
```

to:

```scss
&.pj {
  overflow-x: visible;
}
```

- [ ] **Step 2: Make the projects row a grid**

In `src/index.scss`, add (after the `.article-container` rule):

```scss
.about-containers.about-projects {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
  margin-bottom: 0;
}
```

- [ ] **Step 3: Make the skills list a grid**

In `src/index.scss`, replace the `.skills-container` opening so the inner `.article-container` becomes a grid. Change:

```scss
.skills-container{
  margin-bottom:1rem;
  article {
```

to:

```scss
.article-container.skills-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(8.5rem, 1fr));
  gap: 0.75rem 1.2rem;
  margin-bottom: 1rem;
  article {
```

(The nested `article { ... }` block and its closing brace are unchanged.)

- [ ] **Step 4: Drop the now-redundant mobile flex override**

In `src/media.scss`, inside the `@media screen and (max-width: 600px)` block, remove:

```scss
.about-projects,
.about-about {
  flex-direction: column;
}
```

and replace it with just the about-about rule (projects is a grid now and collapses on its own):

```scss
.about-about {
  flex-direction: column;
}
```

- [ ] **Step 5: Verify**

Run: `npx eslint src` → Expected: no errors.
Run: `npm run build` → Expected: build succeeds.
Run `npm run dev`: the Projects section shows cards in a centered multi-column grid that reflows (no sideways scrollbar) as you resize from wide → narrow, collapsing to one column on mobile. The Experience skill chips wrap into tidy columns inside each card. Check at ~1300px, ~1100px, and ~500px widths.

- [ ] **Step 6: Commit**

```bash
git add src/index.scss src/media.scss
git commit -m "wrap projects and skills into responsive grid"
```

---

## Task 6: Scroll-in motion + reduced-motion

**Files:**

- Modify: `src/index.scss`
- Modify: `src/index.js`

- [ ] **Step 1: Add reveal + reduced-motion styles**

In `src/index.scss`, append:

```scss
.reveal {
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
}

.reveal.is-visible {
  opacity: 1;
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
  .reveal {
    opacity: 1;
    transform: none;
  }
}
```

- [ ] **Step 2: Attach an IntersectionObserver after render**

In `src/index.js`, inside `setData`, replace:

```js
  content.innerHTML = elements;
};
```

with:

```js
  content.innerHTML = elements;

  const sections = document.querySelectorAll("section");
  if ("IntersectionObserver" in window) {
    sections.forEach((el) => el.classList.add("reveal"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    sections.forEach((el) => observer.observe(el));
  }
};
```

- [ ] **Step 3: Verify**

Run: `npx eslint src` → Expected: no errors.
Run: `npm run build` → Expected: build succeeds.
Run `npm run dev`: the first (profile) section is visible immediately; scrolling down fades/slides each following section in once. Then enable "Emulate prefers-reduced-motion: reduce" in DevTools Rendering and reload — all sections show instantly with no fade/slide.

- [ ] **Step 4: Commit**

```bash
git add src/index.scss src/index.js
git commit -m "add subtle scroll-in motion with reduced-motion support"
```

---

## Task 7: Version bump + final verification

**Files:**

- Modify: `package.json`

- [ ] **Step 1: Bump the version**

In `package.json`, change:

```json
  "version": "2.3.0",
```

to:

```json
  "version": "2.4.0",
```

- [ ] **Step 2: Full verification pass**

Run: `npx eslint src` → Expected: no errors.
Run: `npm run build` → Expected: build succeeds.
Run `npm run dev` and walk the spec's acceptance checklist:

- Every section renders in **light** and **dark**.
- Toggle persists across reload; first visit respects `prefers-color-scheme`; no flash of wrong theme.
- Breakpoints ≤1400 / ≤1200 / ≤600: projects & skills wrap as a grid, hamburger menu works (and its links scroll to the right sections), the toggle is reachable.
- `prefers-reduced-motion: reduce` disables the scroll/hover animations.
- Footer shows the current year; Languages list has no duplicate TypeScript.

- [ ] **Step 3: Commit**

```bash
git add package.json
git commit -m "bump version to 2.4.0"
```

- [ ] **Step 4: Hand back for PR**

Do not push or open a PR automatically. Report completion and let the owner decide when to push `styling-polish` and open the PR into `main`.

---

## Notes for the implementer

- Keep components as HTML-string arrow functions tagged `/*html*/`; never convert to JSX or DOM nodes.
- All browser globals used (`window`, `document`, `localStorage`, `matchMedia`, `IntersectionObserver`) are covered by the ESLint browser-globals config — no eslint-disable needed.
- Prettier defaults (2-space, double quotes, semicolons) — formatting matches the surrounding files.
- If a manual visual check looks wrong, fix it before committing that task; don't carry a broken state into the next task.
