import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const CONTRIBUTOR_ALIASES = {
  Kozumi: "Kozumi",
  rankozumi: "Kozumi",
  Kozmosa: "Kozumi",
};

export default (options = {}) => {
  const {
    jsonOutputDir = ".vuepress/public",
    jsonOutputFile = "contributors.json",
    githubApiBase = "https://api.github.com",
    commitLookupLimit = 10,
  } = options;

  return {
    name: "contributors-collector",

    async onPrepared(app) {
      const sourceDir = app.dir.source();
      const repoRoot = path.resolve(sourceDir, "..");

      const jsonOutputDirPath = path.resolve(sourceDir, jsonOutputDir);
      if (!fs.existsSync(jsonOutputDirPath)) {
        fs.mkdirSync(jsonOutputDirPath, { recursive: true });
      }

      const gitContributors = collectGitContributors(repoRoot);
      const mdContributors = collectMarkdownAuthors(sourceDir);
      const gitRepo = detectGitHubRepo(repoRoot);
      const chineseNameFallbackMap = await resolveChineseGitNameFallbacks({
        contributors: gitContributors,
        repoRoot,
        gitRepo,
        githubApiBase,
        commitLookupLimit,
      });
      const contributors = Array.from(
        new Set(
          [...gitContributors, ...mdContributors]
            .map((name) =>
              normalizeContributorName(name, chineseNameFallbackMap),
            )
            .filter(Boolean),
        ),
      ).sort((a, b) =>
        a.localeCompare(b, "zh-Hans-CN", { sensitivity: "base" }),
      );

      const outputPath = path.resolve(jsonOutputDirPath, jsonOutputFile);
      fs.writeFileSync(
        outputPath,
        JSON.stringify(
          {
            generatedAt: new Date().toISOString(),
            total: contributors.length,
            items: contributors,
          },
          null,
          2,
        ),
        "utf-8",
      );

      console.log(
        `[Contributors Collector] 生成了 ${contributors.length} 位贡献者到: ${outputPath}`,
      );
    },
  };
};

function collectGitContributors(repoRoot) {
  try {
    const stdout = execFileSync("git", ["log", "--format=%an", "--", "."], {
      cwd: repoRoot,
      encoding: "utf-8",
      stdio: ["ignore", "pipe", "pipe"],
    });

    return stdout
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
  } catch (err) {
    console.error(`[Contributors Collector] 获取 git 作者失败: ${err.message}`);
    return [];
  }
}

function collectMarkdownAuthors(sourceDir) {
  const mdFiles = [];
  walkMarkdownFiles(sourceDir, mdFiles);

  const authors = [];
  for (const filePath of mdFiles) {
    try {
      const content = fs.readFileSync(filePath, "utf-8");
      const author = parseFrontmatterAuthor(content);
      if (author) {
        authors.push(author);
      }
    } catch (err) {
      console.error(
        `[Contributors Collector] 读取 markdown 失败 ${filePath}: ${err.message}`,
      );
    }
  }

  return authors;
}

function walkMarkdownFiles(dir, result) {
  let entries = [];
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch (err) {
    console.error(
      `[Contributors Collector] 扫描目录失败 ${dir}: ${err.message}`,
    );
    return;
  }

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".git") {
        continue;
      }
      walkMarkdownFiles(fullPath, result);
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".md")) {
      result.push(fullPath);
    }
  }
}

function parseFrontmatterAuthor(content) {
  const frontmatterMatch = content.match(/^---\s*\r?\n([\s\S]*?)\r?\n---/);
  if (!frontmatterMatch) {
    return null;
  }

  const frontmatter = frontmatterMatch[1];
  const authorMatch = frontmatter.match(/^author\s*:\s*(.+)$/m);
  if (!authorMatch) {
    return null;
  }

  return sanitizeAuthor(authorMatch[1]);
}

function sanitizeAuthor(value) {
  const trimmed = value.trim();
  const unquoted = trimmed.replace(/^['"]|['"]$/g, "");
  return unquoted.trim() || null;
}

function normalizeContributorName(value, chineseNameFallbackMap = new Map()) {
  const trimmed = (value || "").trim();
  if (!trimmed) {
    return null;
  }
  const fallbackName = chineseNameFallbackMap.get(trimmed) || trimmed;
  return CONTRIBUTOR_ALIASES[fallbackName] || fallbackName;
}

function detectGitHubRepo(repoRoot) {
  try {
    const remoteUrl = execFileSync("git", ["remote", "get-url", "origin"], {
      cwd: repoRoot,
      encoding: "utf-8",
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();

    const httpsMatch = remoteUrl.match(
      /github\.com[:/]([^/]+)\/([^/]+?)(?:\.git)?$/i,
    );
    if (httpsMatch) {
      return {
        owner: httpsMatch[1],
        repo: httpsMatch[2],
      };
    }
  } catch (err) {
    console.error(`[Contributors Collector] 解析 origin 失败: ${err.message}`);
  }

  return null;
}

async function resolveChineseGitNameFallbacks({
  contributors,
  repoRoot,
  gitRepo,
  githubApiBase,
  commitLookupLimit,
}) {
  const fallbackMap = new Map();
  if (!gitRepo) {
    return fallbackMap;
  }

  const chineseNames = Array.from(
    new Set(contributors.filter((name) => containsChinese(name))),
  );

  for (const chineseName of chineseNames) {
    const commitShas = collectRecentCommitShasByAuthor(
      repoRoot,
      chineseName,
      commitLookupLimit,
    );

    const login = await resolveLoginFromCommits({
      owner: gitRepo.owner,
      repo: gitRepo.repo,
      commitShas,
      githubApiBase,
    });

    if (login) {
      fallbackMap.set(chineseName, login);
    }
  }

  return fallbackMap;
}

function collectRecentCommitShasByAuthor(repoRoot, authorName, limit) {
  try {
    const stdout = execFileSync(
      "git",
      [
        "log",
        "--author",
        authorName,
        "--format=%H",
        "-n",
        String(limit),
        "--",
        ".",
      ],
      {
        cwd: repoRoot,
        encoding: "utf-8",
        stdio: ["ignore", "pipe", "pipe"],
      },
    );

    return stdout
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
  } catch (err) {
    console.error(
      `[Contributors Collector] 获取作者 ${authorName} 提交失败: ${err.message}`,
    );
    return [];
  }
}

async function resolveLoginFromCommits({
  owner,
  repo,
  commitShas,
  githubApiBase,
}) {
  for (const sha of commitShas) {
    try {
      const response = await fetch(
        `${githubApiBase}/repos/${owner}/${repo}/commits/${sha}`,
        {
          headers: {
            Accept: "application/vnd.github+json",
            "User-Agent": "survive-in-scut-contributors-collector",
          },
        },
      );

      if (!response.ok) {
        continue;
      }

      const data = await response.json();
      const login = data?.author?.login;
      if (login && typeof login === "string") {
        return login;
      }
    } catch {
      // Ignore and continue resolving from next commit.
    }
  }

  return null;
}

function containsChinese(value) {
  return /[\u3400-\u9FFF]/.test(value || "");
}
