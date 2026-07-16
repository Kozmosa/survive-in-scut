# VitePress Migration Notes

This file tracks the low-priority migration path from VuePress 2 to VitePress.

## Current Status

- A first VitePress scaffold now exists under `docs/.vitepress/`.
- Static assets are mirrored from `docs/.vuepress/public/` into `docs/public/` via `scripts/sync-vitepress-public.js`.
- The repo now has VitePress scripts in `package.json`:
  - `docs:dev:vitepress`
  - `docs:build:vitepress`
  - `docs:preview:vitepress`
- The scaffold reuses the existing content tree under `docs/`.
- Root and English home routes are rewritten from `README.md` to `index.md` for VitePress builds.
- Existing custom Vue components are registered in the VitePress theme layer.
- Verified on 2026-06-02:
  - `npm run docs:build`
  - `npm run docs:build:vitepress`
  - `npm run docs:build:platform`
    all completed successfully.

## What Already Carries Over

- Markdown content pages
- Multi-locale routing for `/` and `/en/`
- Top navigation in a simplified VitePress-compatible structure
- Custom components used directly in markdown:
  - `AppLanding`
  - `ContributorsList`
  - `ImmersiveShell`
  - `MarkdownEditor`
  - `ProbabilityDistributionGallery`

## What Is Still Not Parity

- The VuePress home-page frontmatter (`home`, `heroImage`, `actions`, `features`) is not yet rewritten into a VitePress home-page design.
- Waline comments are not yet wired into the VitePress theme.
- The immersive layout is only approximated with CSS and a wrapper layout, not yet pixel-matched.
- The VuePress-only plugin lifecycle is still the source of generated data for:
  - TODO collection
  - contributors list generation
  - app release metadata
- PDF viewer plugin support has not been ported.
- The English section is still content-incomplete, so migration does not solve that by itself.

## Recommended Next Steps

1. Split TODO / contributors / app-release generation into standalone prebuild scripts.
2. Rebuild the home page as a native VitePress landing page instead of relying on VuePress frontmatter.
3. Port comments and any page-bottom extensions into the VitePress theme.
4. Verify immersive pages, especially the probability tool page, on desktop and mobile.
5. Only after parity is acceptable, consider switching CI and deployment to VitePress.

## Verification Commands

```bash
npm run docs:build
npm run docs:build:vitepress
npm run docs:build:platform
```

`docs:build:platform` is the most useful parity check because it builds both outputs with `/docs/` as the base path.
