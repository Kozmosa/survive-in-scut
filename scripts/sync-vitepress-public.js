import { cp, mkdir, stat } from "node:fs/promises";
import path from "node:path";

/**
 * This script syncs canonical public assets from docs/public/ (VitePress native)
 * to docs/.vuepress/public/ (legacy VuePress) for backward compatibility.
 *
 * The canonical source is docs/public/. Do NOT add new assets to .vuepress/public.
 * This script is temporary and should be removed when the legacy VuePress
 * public directory is fully decommissioned.
 */

const repoRoot = process.cwd();
const sourceDir = path.join(repoRoot, "docs", "public");
const targetDir = path.join(repoRoot, "docs", ".vuepress", "public");

try {
  await stat(sourceDir);
} catch {
  throw new Error(`Source public dir not found: ${sourceDir}`);
}

await mkdir(targetDir, { recursive: true });
await cp(sourceDir, targetDir, { recursive: true });

console.log(
  `[sync-legacy-public] synced ${sourceDir} -> ${targetDir} (legacy backward compat)`,
);
