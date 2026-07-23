# AGENTS Guide for survive-in-scut

This file is for autonomous coding agents working in this repository.
Follow these rules unless a human maintainer explicitly says otherwise.

## Project snapshot

- Stack: VitePress, Vue 3, npm-first tooling, ESM JavaScript.
- Main app docs live in `docs/`.
- Custom code lives in `docs/.vitepress/` (config, theme, plugins), `scripts/`, and `docs/.vuepress/` (legacy VuePress config, still used by platform build script `scripts/docs-build-platform.js`).
- Primary package manager in CI and local development: npm.
- `package-lock.json` is the authoritative lockfile; do not create or commit `bun.lock` unless maintainers explicitly switch package managers.

## Rule files check (Cursor/Copilot)

The following policy files were searched and are currently not present:

- `.cursorrules`
- `.cursor/rules/`
- `.github/copilot-instructions.md`

If these files are added later, treat them as higher-priority instructions and update this guide.

## Install and environment

- Install dependencies: `npm ci` for clean installs, or `npm install` when intentionally updating `package-lock.json`.
- Node runtime is still required for VitePress build and scripts.
- Use repository root as working directory for top-level scripts.

## Git remote access

- Prefer SSH remotes for fetch and push operations, for example `git@github.com:Kozmosa/survive-in-scut.git`.
- Use HTTPS remotes only as a fallback when SSH is unavailable or a maintainer explicitly asks for HTTPS.

## Build, dev, lint, format, test commands

### Core commands (root)

- Dev server: `npm run docs:dev`
- Production docs build: `npm run docs:build`
- Preview production build: `npm run docs:preview`
- Platform build (rewrites base to `/docs/` for subdirectory deploy): `npm run docs:build:platform`
- Sync legacy VuePress public assets to VitePress: `npm run docs:sync:vitepress-public`
- Format check: `npm run docs:fmt`
- Auto-format: `npm run docs:fmt:fix`
- Pre-commit hook: managed by `simple-git-hooks` + `lint-staged` (runs `prettier --write` on staged files)

### Lint/test reality in this repo

- There is no dedicated lint script (ESLint not configured in repo root).
- There is no automated unit/integration test runner configured (no Vitest/Jest/Playwright config detected).
- Formatting is enforced by two quality gates:
  - CI (`npm run docs:fmt` in `.github/workflows/format.yml`).
  - Pre-commit hook (`simple-git-hooks` + `lint-staged`, runs `prettier --write`).

### "Single test" guidance (important)

Because no test framework exists yet, use targeted checks:

- Single-file formatting check: `npx prettier --check "docs/path/to/file.md"`
- Single JS/JSON/MD/Vue/TS/HTML/YML reformat: `npx prettier --write "docs/path/to/file.md"`
- Build validation (closest to integration test): `npm run docs:build`
- Focused runtime/manual check: `npm run docs:dev` and open the specific page/component route.

If you introduce a test framework, add `test` and `test:single` scripts and update this file.

## Where to change what

- VitePress navigation/theme/plugins: `docs/.vitepress/config.ts` and `docs/.vitepress/theme/`
- VitePress client/global components: `docs/.vitepress/theme/index.ts` and `docs/.vitepress/components/`
- Custom VitePress plugins: `docs/.vitepress/plugins/todoCollector.ts`, `docs/.vitepress/plugins/contributorsCollector.ts`, `docs/.vitepress/composables/useLocaleText.ts`
- Legacy VuePress config (platform build fallback): `docs/.vuepress/config.js` and `docs/.vuepress/client.ts`
- Legacy VuePress PDF viewer plugin: `docs/.vuepress/plugins/pdfviewer/`
- Cross-platform docs build script: `scripts/docs-build-platform.js`
- VitePress public asset sync script: `scripts/sync-vitepress-public.js`
- Content pages: `docs/**/*.md` and `docs/en/**/*.md`

## Code style guidelines

### General style baseline

- Use ESM (`import`/`export`), not CommonJS, unless editing legacy interoperability code.
- Keep changes minimal and local; avoid broad refactors unless requested.
- Prefer clear, readable code over dense abstractions.
- Match existing file-local style when it differs from global norms.

### Formatting

- Prettier is the enforced formatter for `*.js`, `*.ts`, `*.json`, `*.md`, `*.vue`, `*.html`, `*.yml` via repo script.
- Use 2-space indentation.
- In JS files covered by formatter, prefer double quotes and trailing semicolons.
- Keep line length reasonable; split long arrays/objects across lines.
- Avoid adding new formatting tools without request.

### Imports

- Order imports in this sequence when practical: Node built-ins, third-party packages, local relative imports.
- Separate groups with a blank line for non-trivial files.
- Prefer named imports where APIs are named; use default imports only when package exports default.
- Avoid unused imports; remove them during edits.

### Types and typing discipline

- No repo-wide TypeScript strict config is present.
- For JS modules, use JSDoc only when it clarifies non-obvious contracts.
- Preserve existing runtime prop validation in Vue components (`props` with `type`/`required`).
- Do not introduce `any`-style loose patterns when strong runtime checks are easy.

### Naming conventions

- Vue component filenames: PascalCase (for example `MarkdownEditor.vue`).
- Vue component names: PascalCase.
- Variables/functions: camelCase.
- Constants that are true constants: UPPER_SNAKE_CASE.
- Markdown content filenames generally use snake_case in this repo; follow local folder conventions.
- Keep bilingual docs folder structure mirrored where appropriate (`docs/` and `docs/en/`).

### Vue and frontend conventions

- Use Vue 3 patterns already present (`<script setup>` or `setup()`), and stay consistent within file.
- Keep component state with `ref`/`computed`/`watch` patterns already used nearby.
- Register global components/plugins in `docs/.vitepress/theme/index.ts` (or `client.ts` for legacy VuePress config).
- Avoid introducing heavy dependencies for simple UI behavior.

### Error handling and logging

- Fail fast with `throw new Error(...)` for unrecoverable startup/config issues.
- Use `try/catch` around filesystem or external IO that may fail at runtime.
- Include actionable context in error messages (path, operation, tool name).
- Prefer `console.error` for recoverable task errors in scripts/plugins.
- Do not swallow errors silently.

### Filesystem and path handling

- Use `node:path` utilities (`path.join`, `path.resolve`, `path.relative`) for portability.
- Normalize Windows separators when generating web links (replace `\\` with `/`).
- Prefer explicit UTF-8 reads/writes where text encoding matters.

### Markdown/content authoring conventions

- Include frontmatter when page metadata is needed (`title`, `description`, `lang`, etc.).
- Keep heading structure logical (`#` then `##`, avoid jumps).
- Use fenced code blocks with language labels when possible.
- Prefer concise prose edits that preserve original tone and language.

## Agent workflow expectations

- Before finalizing, run relevant commands when possible (`npm run docs:build` for config/plugin/script changes, `npm run docs:fmt` or targeted `npx prettier --write` for docs/content edits).
- If you cannot run commands, state what was not verified.
- Do not commit lockfile or generated output changes unless needed by the task.
- Build commands may refresh generated TODO/contributor/app release metadata. Do not keep pure timestamp or generated metadata churn unless the task needs it.
- Do not edit VuePress or VitePress cache/temp/dist artifacts unless explicitly requested (`docs/.vuepress/.cache/`, `docs/.vuepress/.temp/`, `docs/.vuepress/dist/`, `docs/.vitepress/cache/`, `docs/.vitepress/dist/`).

## Common pitfalls in this repo

- `docs:fmt` now targets `js,ts,json,md,vue,html,yml` — TS and Vue files are covered.
- Style may differ between older Vue/TS files and formatted JS files; preserve local consistency.
- The local TODO plugin scans source files synchronously; avoid expensive extra work in hot paths.
- `docs/others/todo.md` is auto-generated by the VitePress build pipeline (both local builds and CI). Do not edit it manually; edits will be overwritten on the next `npm run docs:build` or `npm run docs:dev`.
- Platform build script (`scripts/docs-build-platform.js`) rewrites docs base path to `/docs/` in a temp copy and builds with VitePress only. Run via `npm run docs:build:platform` or directly `node scripts/docs-build-platform.js`. Cleanup is automatic; set `KEEP_PLATFORM_TMP=1` to inspect intermediates.

## If you add new tooling

- Add npm scripts in root `package.json`.
- Update CI workflows if new checks must gate PRs.
- Extend this `AGENTS.md` with exact commands, including single-test invocation.

## Definition of done for agent changes

- Code/content change is minimal and scoped to request.
- Formatting is clean for touched files (JS/TS/JSON/MD/Vue/HTML/YML).
- Docs build still succeeds (or limitation is explicitly reported).
- Any new command introduced is documented here.
