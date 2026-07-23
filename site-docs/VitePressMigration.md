# VitePress Migration Notes

This file tracks the migration path from VuePress 2 to VitePress.

## Current Status (2026-07-24)

- **VitePress is now the primary build system.** Netlify deploys use `vitepress build docs`.
- Legacy VuePress config still exists under `docs/.vuepress/` but is being decommissioned.
- Static assets canonical source is now `docs/public/` (VitePress native). The legacy `docs/.vuepress/public/` is synced from `docs/public/` for backward compatibility via `scripts/sync-vitepress-public.js`.
- Custom Vue components are registered in `docs/.vitepress/theme/index.ts`.
- Build verified working:
  - `npm run docs:build`
  - `npm run docs:build:platform`

## Progress

- [x] VitePress scaffold under `docs/.vitepress/`
- [x] Static assets canonical source: `docs/public/`
- [x] Custom components registered in VitePress theme
- [x] TODO collection plugin ported: `docs/.vitepress/plugins/todoCollector.ts`
- [x] Contributors collection plugin ported: `docs/.vitepress/plugins/contributorsCollector.ts`
- [x] LLMs.txt generation via `vitepress-plugin-llms`
- [x] Waline comments wired in Layout.vue
- [x] PDF viewer component ported: `docs/.vitepress/components/PdfViewer.vue`
- [x] Scroll pager component ported: `docs/.vitepress/components/ScrollPager.vue`
- [x] Details and ExpandableCard components ported
- [x] Multi-locale routing works

## Remaining Cleanup

- [ ] Migrate remaining VuePress components from `docs/.vuepress/components/` to `docs/.vitepress/components/`
- [ ] Remove `docs/.vuepress/config.js` (legacy config)
- [ ] Remove `docs/.vuepress/client.ts`
- [ ] Remove `docs/.vuepress/layouts/`
- [ ] Remove `docs/.vuepress/plugins/` (all 3 plugins)
- [ ] Decommission `docs/.vuepress/public/` entirely
- [ ] Remove `scripts/sync-vitepress-public.js`
- [ ] Remove `packages/vuepress-plugin-todo/`
- [ ] Remove `examples/vuepress-config-example.js`
- [ ] Remove `create.sh`
- [ ] Clean up `docs/.vuepress/dist/` (50MB stale build output)

## New Architecture Principles

- `docs/public/` is the single canonical static assets directory
- All custom code lives in `docs/.vitepress/` (components, composables, plugins, theme)
- Scripts live in `scripts/`
- Content lives in `docs/` (zh) and `docs/en/` (en)

## Verification Commands

```bash
npm run docs:build
npm run docs:build:platform
```
