import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";

const repoRoot = process.cwd();
const docsDir = path.join(repoRoot, "docs");
const tempRoot = path.join(repoRoot, `.platform-build-tmp-${Date.now()}`);
const tempDocsDir = path.join(tempRoot, "docs");

const vueOutputDir = path.join(repoRoot, "vue-platform-dist");
const viteOutputDir = path.join(repoRoot, "vite-platform-dist");

const vueConfigName = await findConfigName(path.join(docsDir, ".vuepress"));
const viteConfigName = await findConfigName(path.join(docsDir, ".vitepress"));

if (!vueConfigName && !viteConfigName) {
  throw new Error("No docs config found in docs/.vuepress or docs/.vitepress");
}

await rm(vueOutputDir, { recursive: true, force: true });
await rm(viteOutputDir, { recursive: true, force: true });

await mkdir(tempRoot, { recursive: true });

try {
  await cp(docsDir, tempDocsDir, { recursive: true });

  if (vueConfigName) {
    const vueConfigPath = path.join(tempDocsDir, ".vuepress", vueConfigName);
    await rewriteBaseToDocs(vueConfigPath);
    await runCli("vuepress", ["build", tempDocsDir, "--dest", vueOutputDir]);
  }

  if (viteConfigName) {
    const viteConfigPath = path.join(tempDocsDir, ".vitepress", viteConfigName);
    await rewriteBaseToDocs(viteConfigPath);
    await runCli("vitepress", [
      "build",
      tempDocsDir,
      "--outDir",
      viteOutputDir,
    ]);
  }
} finally {
  if (process.env.KEEP_PLATFORM_TMP !== "1") {
    await rm(tempRoot, { recursive: true, force: true });
  }
}

async function findConfigName(configDir) {
  const candidates = ["config.ts", "config.js", "config.mjs", "config.cjs"];
  for (const fileName of candidates) {
    const fullPath = path.join(configDir, fileName);
    try {
      await readFile(fullPath);
      return fileName;
    } catch {
      // continue
    }
  }
  return null;
}

async function rewriteBaseToDocs(configPath) {
  const content = await readFile(configPath, "utf8");
  const basePattern = /(^\s*base\s*:\s*)(["'`])([^"'`]*?)\2(\s*,?)/m;
  const baseMatch = content.match(basePattern);
  if (baseMatch) {
    const updated = content.replace(
      basePattern,
      (_full, prefix, quote, _oldBase, suffix) =>
        `${prefix}${quote}/docs/${quote}${suffix}`,
    );
    await writeFile(configPath, updated, "utf8");
    return;
  }

  const insertionPoints = [
    /define\w*Config\s*\(\s*\{/,
    /export\s+default\s*\{/,
    /module\.exports\s*=\s*\{/,
  ];

  for (const pattern of insertionPoints) {
    const match = pattern.exec(content);
    if (!match) {
      continue;
    }
    const braceIndex = content.indexOf("{", match.index);
    if (braceIndex === -1) {
      continue;
    }

    const updated = `${content.slice(0, braceIndex + 1)}\n  base: \"/docs/\",${content.slice(braceIndex + 1)}`;
    await writeFile(configPath, updated, "utf8");
    return;
  }

  throw new Error(`Cannot locate config object to set base in ${configPath}`);
}

function runCli(toolName, args) {
  return new Promise((resolve, reject) => {
    const command = `npm exec --no -- ${toolName} ${args.map(quoteArg).join(" ")}`;
    const child = spawn(command, {
      cwd: repoRoot,
      stdio: "inherit",
      shell: true,
    });

    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(`Command failed: ${toolName} ${args.join(" ")}`));
    });

    child.on("error", reject);
  });
}

function quoteArg(value) {
  if (/^[A-Za-z0-9_./:-]+$/.test(value)) {
    return value;
  }
  return `"${value.replace(/"/g, '\\"')}"`;
}
