#!/usr/bin/env node
/**
 * zhlint runner with per-file fault isolation.
 *
 * Why this wrapper exists instead of calling the zhlint CLI directly:
 * - the CLI only reads its first file argument, so a glob plus extra files
 *   (or a lint-staged file list) would be silently dropped;
 * - one file crashing inside zhlint (known upstream bug in 0.8.2 with
 *   `**Q1**:`-style bold + colon patterns) aborts the whole CLI run, while
 *   here the file is skipped with a warning;
 * - `--fix` mirrors the CLI semantics: fix what is fixable, always exit 0,
 *   so the pre-commit hook never gets blocked by unfixable leftovers.
 *
 * Usage:
 *   node scripts/zhlint-run.js            # lint all docs markdown + README
 *   node scripts/zhlint-run.js --fix      # auto-fix files in place
 *   node scripts/zhlint-run.js a.md b.md  # lint explicit files (lint-staged)
 *
 * Rules and ignored files come from .zhlintrc / .zhlintignore at repo root.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readRc, runWithConfig, report } from "zhlint";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_TARGETS = ["docs", "README.md"];

const argv = process.argv.slice(2);
const fix = argv.includes("--fix");
const explicitFiles = argv.filter((arg) => !arg.startsWith("--"));

const toPosix = (p) => p.split(path.sep).join("/");
const relToRoot = (file) => toPosix(path.relative(ROOT, path.resolve(file)));

// zhlint does not understand YAML frontmatter and reports bogus
// unmatched-quote errors on lines like `---` and `lang: en-US`,
// so lint the body only and keep the frontmatter as-is.
const FRONTMATTER_RE = /^---\r?\n[\s\S]*?\r?\n---\r?\n?/;
const splitFrontmatter = (content) => {
  const match = content.match(FRONTMATTER_RE);
  return match
    ? { front: match[0], body: content.slice(match[0].length) }
    : { front: "", body: content };
};

const walkMarkdown = (dir) => {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walkMarkdown(full));
    else if (entry.name.endsWith(".md")) files.push(full);
  }
  return files;
};

const collectTargets = () => {
  if (explicitFiles.length) return explicitFiles;
  const files = [];
  for (const target of DEFAULT_TARGETS) {
    const full = path.join(ROOT, target);
    if (!fs.existsSync(full)) continue;
    files.push(
      ...(fs.statSync(full).isDirectory() ? walkMarkdown(full) : [full]),
    );
  }
  return files;
};

// Minimal .zhlintignore matching: exact file paths and `dir/` prefixes.
// Full gitignore syntax is not supported; anything else fails loudly so an
// ignored file can never slip through because its pattern was not honored.
const buildIgnoreMatcher = (ignoreLines) => {
  const patterns = (ignoreLines || [])
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));
  for (const pattern of patterns) {
    if (pattern.startsWith("!") || pattern.includes("*")) {
      throw new Error(
        `scripts/zhlint-run.js: unsupported .zhlintignore pattern "${pattern}" ` +
          `(only exact paths and dir/ prefixes are supported)`,
      );
    }
  }
  return (relPath) =>
    patterns.some(
      (pattern) =>
        relPath === pattern ||
        (pattern.endsWith("/") && relPath.startsWith(pattern)),
    );
};

const config = readRc(ROOT);
const isIgnored = buildIgnoreMatcher(config.fileIgnores);

// zhlint's unpaired quote/bracket detections cannot be auto-fixed and fire
// on English apostrophes (SCUT's, Xi'an) in this bilingual repo, so in check
// mode they are reported as warnings instead of blocking the exit code.
const PAIR_DETECTION_MESSAGES = [
  "引号未匹配",
  "引号未闭合",
  "括号未匹配",
  "括号未闭合",
];
const isPairDetection = (validation) =>
  PAIR_DETECTION_MESSAGES.includes(validation.message);

const results = [];
let crashed = 0;
for (const file of collectTargets()) {
  const rel = relToRoot(file);
  if (isIgnored(rel)) continue;
  console.log(`[start] ${rel}`);
  let origin;
  try {
    origin = fs.readFileSync(file, "utf8");
  } catch (e) {
    console.error(`[error] cannot read ${rel}: ${e.message}`);
    process.exitCode = 1;
    continue;
  }
  try {
    const { front, body } = splitFrontmatter(origin);
    const { result, validations } = runWithConfig(body, config);
    // report against the body so line numbers match the validations,
    // re-attach the frontmatter only when writing fixes back
    results.push({ file: rel, origin: body, result, front, validations });
  } catch (e) {
    // zhlint crashed on this file's content: its own bug, not a content
    // error, so skip the file instead of aborting the whole run
    console.warn(`[skipped] ${rel} — zhlint internal error: ${e.message}`);
    crashed++;
  }
}

if (fix) {
  for (const { file, origin, result, front } of results) {
    if (origin !== result) {
      fs.writeFileSync(path.resolve(ROOT, file), front + result);
      console.log(`[fixed] ${file}`);
    }
  }
  console.log(
    `Done. ${results.length} file(s) processed` +
      (crashed ? `, ${crashed} skipped due to zhlint internal errors.` : "."),
  );
} else {
  const pairWarnings = results.flatMap(({ file, validations }) =>
    validations
      .filter(isPairDetection)
      .map((validation) => `${file} - ${validation.message}`),
  );
  if (pairWarnings.length) {
    console.warn(
      `[warn] ${pairWarnings.length} unpaired quote/bracket detection(s) ` +
        `(usually English apostrophes, not blocking):`,
    );
    pairWarnings.forEach((line) => console.warn(`[warn] ${line}`));
  }
  const blocking = results.map(({ validations, ...rest }) => ({
    ...rest,
    validations: validations.filter(
      (validation) => !isPairDetection(validation),
    ),
  }));
  const exitCode = report(blocking);
  if (crashed) {
    console.warn(
      `Warning: ${crashed} file(s) skipped due to zhlint internal errors.`,
    );
  }
  if (exitCode) process.exit(exitCode);
}
