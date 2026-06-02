import { cp, mkdir, rm, stat } from "node:fs/promises";
import path from "node:path";

const repoRoot = process.cwd();
const sourceDir = path.join(repoRoot, "docs", ".vuepress", "public");
const targetDir = path.join(repoRoot, "docs", "public");

try {
  await stat(sourceDir);
} catch {
  throw new Error(`Source public dir not found: ${sourceDir}`);
}

await rm(targetDir, { recursive: true, force: true });
await mkdir(path.dirname(targetDir), { recursive: true });
await cp(sourceDir, targetDir, { recursive: true });

console.log(`[sync-vitepress-public] copied ${sourceDir} -> ${targetDir}`);
