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
  ".vuepress",
  "dist",
  "node_modules",
  "public",
  "en",
]);

export default function contributorsCollector(): Plugin {
  let sourceDir = "";

  const generate = () => {
    const repoRoot = path.resolve(sourceDir, "..");

    // Flat contributor list (all unique names)
    const allContributors = Array.from(
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

    // Per-file contributor map
    const fileAuthorMap = collectFileAuthors(sourceDir);
    const fileGitMap = collectFileGitContributors(repoRoot, sourceDir);
    const fileMap: Record<string, string[]> = {};

    for (const [relPath, author] of fileAuthorMap) {
      fileMap[relPath] = [author];
    }
    for (const [relPath, gitNames] of fileGitMap) {
      const normalized = gitNames
        .map((n) => CONTRIBUTOR_ALIASES[n] || n)
        .filter((n) => !fileMap[relPath]?.includes(n));
      if (fileMap[relPath]) {
        fileMap[relPath].push(...normalized);
      } else if (normalized.length > 0) {
        fileMap[relPath] = normalized;
      }
    }

    const outputPath = path.join(sourceDir, "public", "contributors.json");
    mkdirSync(path.dirname(outputPath), { recursive: true });
    writeFileSync(
      outputPath,
      `${JSON.stringify(
        {
          generatedAt: new Date().toISOString(),
          total: allContributors.length,
          items: allContributors,
          fileMap,
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

function collectFileAuthors(sourceDir: string): Map<string, string> {
  const result = new Map<string, string>();
  const entries = readdirSync(sourceDir, { withFileTypes: true });

  for (const entry of entries) {
    if (EXCLUDED_DIRECTORIES.has(entry.name)) continue;

    const filePath = path.join(sourceDir, entry.name);
    if (entry.isDirectory()) {
      for (const [subPath, author] of collectFileAuthors(filePath)) {
        result.set(subPath, author);
      }
      continue;
    }

    if (!entry.isFile() || !entry.name.endsWith(".md")) continue;

    const author = readFrontmatterAuthor(readFileSync(filePath, "utf8"));
    if (author) {
      const relPath = path.relative(sourceDir, filePath).replace(/\\/g, "/");
      result.set(relPath, author);
    }
  }

  return result;
}

function collectFileGitContributors(
  repoRoot: string,
  sourceDir: string,
): Map<string, string[]> {
  const result = new Map<string, string[]>();

  const walk = (dir: string) => {
    const entries = readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (EXCLUDED_DIRECTORIES.has(entry.name)) continue;

      const filePath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(filePath);
        continue;
      }

      if (!entry.isFile() || !entry.name.endsWith(".md")) continue;

      const relPath = path.relative(sourceDir, filePath).replace(/\\/g, "/");
      try {
        const output = execFileSync(
          "git",
          ["log", "--format=%aN", "--follow", "--", filePath],
          {
            cwd: repoRoot,
            encoding: "utf8",
            stdio: ["ignore", "pipe", "pipe"],
          },
        );
        const names = [
          ...new Set(
            output
              .split(/\r?\n/)
              .map((n) => n.trim())
              .filter(Boolean),
          ),
        ];
        if (names.length > 0) {
          if (!result.has(relPath)) {
            result.set(relPath, names);
          }
        }
      } catch {
        // skip files without git history
      }
    }
  };

  walk(sourceDir);
  return result;
}

function readFrontmatterAuthor(content: string) {
  const frontmatter = content.match(/^---\s*\r?\n([\s\S]*?)\r?\n---/);
  const author = frontmatter?.[1].match(/^author\s*:\s*(.+)$/m)?.[1];

  return author?.trim().replace(/^['"]|['"]$/g, "") || "";
}

function formatError(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}
