import { execFileSync } from "node:child_process";
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";

const CONTRIBUTOR_ALIASES: Record<string, string> = {
  Kozumi: "Kozumi",
  rankozumi: "Kozumi",
  Kozmosa: "Kozumi",
  "Yuyun Chen": "Rotioki",
};

const EXCLUDED_DIRECTORIES = new Set([
  ".git",
  ".vitepress",
  "dist",
  "node_modules",
  "public",
]);

export default function contributorsCollector(): Plugin {
  let sourceDir = "";

  const generate = () => {
    const repoRoot = path.resolve(sourceDir, "..");
    const contributors = Array.from(
      new Set(
        [
          ...collectGitContributors(repoRoot),
          ...collectMarkdownAuthors(sourceDir),
        ]
          .map((name) => CONTRIBUTOR_ALIASES[name] || name)
          .filter(Boolean),
      ),
    ).sort((left, right) =>
      left.localeCompare(right, "zh-Hans-CN", { sensitivity: "base" }),
    );

    const outputPath = path.join(sourceDir, "public", "contributors.json");
    mkdirSync(path.dirname(outputPath), { recursive: true });
    writeFileSync(
      outputPath,
      `${JSON.stringify(
        {
          generatedAt: new Date().toISOString(),
          total: contributors.length,
          items: contributors,
        },
        null,
        2,
      )}\n`,
      "utf8",
    );

    return outputPath;
  };

  return {
    name: "vitepress-contributors-collector",
    enforce: "pre",
    configResolved(config) {
      sourceDir = config.root;
    },
    buildStart() {
      generate();
    },
    configureServer(server) {
      sourceDir = server.config.root;
      const outputPath = generate();
      server.watcher.add(outputPath);
    },
  };
}

function collectGitContributors(repoRoot: string) {
  try {
    return execFileSync("git", ["log", "--format=%aN", "--", "docs"], {
      cwd: repoRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    })
      .split(/\r?\n/)
      .map((name) => name.trim())
      .filter(Boolean);
  } catch (error) {
    console.error(
      `[contributors] Unable to read Git history: ${formatError(error)}`,
    );
    return [];
  }
}

function collectMarkdownAuthors(directory: string): string[] {
  const authors: string[] = [];
  const entries = readdirSync(directory, { withFileTypes: true });

  for (const entry of entries) {
    if (EXCLUDED_DIRECTORIES.has(entry.name)) continue;

    const filePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      authors.push(...collectMarkdownAuthors(filePath));
      continue;
    }

    if (!entry.isFile() || !entry.name.endsWith(".md")) continue;

    const author = readFrontmatterAuthor(readFileSync(filePath, "utf8"));
    if (author) authors.push(author);
  }

  return authors;
}

function readFrontmatterAuthor(content: string) {
  const frontmatter = content.match(/^---\s*\r?\n([\s\S]*?)\r?\n---/);
  const author = frontmatter?.[1].match(/^author\s*:\s*(.+)$/m)?.[1];

  return author?.trim().replace(/^['"]|['"]$/g, "") || "";
}

function formatError(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}
