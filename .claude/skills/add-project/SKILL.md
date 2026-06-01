---
name: add-project
description: Add or update a project entry in src/assets/projects.csv for the anuja-me portfolio site. Use when the user wants to add, edit, or remove a project card shown in the Projects section.
---

# Add a project to the portfolio

Projects render from `src/assets/projects.csv`. Each data row becomes one project card in the Projects section (see `src/components/section-projects.js`).

Arguments (if provided): `$ARGUMENTS` — e.g. a project title, description, links, and image. If anything needed below is missing, ask before writing.

## CSV format (do not break it)

Header row (row 1) is fixed and **skipped at render time** — never remove it:

```
title,description,code,link,image
```

Columns, in order:

1. `title` — project name.
2. `description` — short blurb. **If it contains a comma, wrap the whole field in double quotes** (`"like, this"`).
3. `code` — source/repo URL for the **Source** button. Use the literal string `null` (not blank) to disable that button.
4. `link` — live/demo URL for the **Show Project** button. Use the literal string `null` to disable that button.
5. `image` — root-relative filename only, e.g. `./glints.webp`. The file **must exist in `src/assets/`**.

Match the quoting style of existing rows. The string `null` disables a button; an empty field does not — always use `null` when there's no URL.

## Steps

1. Gather: title, description, source URL (or `null`), live URL (or `null`), and image.
2. **Image**: confirm the image file is in `src/assets/`. Prefer `.webp` (all existing images are `.webp`). If the user gives a path elsewhere, copy/move it into `src/assets/` and use its `./<filename>` form in the CSV. If it isn't there yet, tell the user to add it.
3. Append the new row to `src/assets/projects.csv` (or edit/remove the matching row for an update/delete). Keep the header row first.
4. Verify CSV validity: the row has exactly 5 fields, commas inside `description` are quoted, and `null` is used for any missing URL.
5. Suggest the user run `npm run dev` (port 9000) and check the Projects section renders the card with the correct buttons enabled/disabled.

## Example row

```
Glints,"Online job recruitment platform and job marketplace",null,"https://glints.com/id/en","./glints.webp"
```

Here `code` is `null` (no Source button) and `link` is set (Show Project button is active).
