import fs from "fs";
import path from "path";
import type { Plugin } from "vite";

type TodoOptions = {
  outputDir?: string;
  outputFile?: string;
  todoKeywords?: string[];
  fileExtensions?: string[];
  excludeDirs?: string[];
  enOutput?: boolean;
};

type TodoItem = { file: string; line: number; text: string };

type LocaleLabels = {
  frontmatterLang: string | null;
  frontmatterTitle: string;
  heading: string;
  lastUpdated: (timestamp: string) => string;
  itemCount: (count: number) => string;
  lineLabel: (line: number) => string;
  viewSource: string;
};

const ZH_LABELS: LocaleLabels = {
  frontmatterLang: null,
  frontmatterTitle: "TODO 汇总",
  heading: "TODO 汇总",
  lastUpdated: (timestamp) => `最后更新时间: ${timestamp} (UTC+8)`,
  itemCount: (count) => `共找到 ${count} 个 TODO 项`,
  lineLabel: (line) => `第 ${line} 行`,
  viewSource: "查看源文件",
};

const EN_LABELS: LocaleLabels = {
  frontmatterLang: "en-US",
  frontmatterTitle: "TODO Summary",
  heading: "TODO Summary",
  lastUpdated: (timestamp) => `Last updated: ${timestamp} (UTC+8)`,
  itemCount: (count) => `${count} TODO items found in total`,
  lineLabel: (line) => `Line ${line}`,
  viewSource: "View source",
};

const DEFAULTS: Required<TodoOptions> = {
  outputDir: "others",
  outputFile: "todo.md",
  todoKeywords: ["TODO"],
  fileExtensions: [".md", ".vue"],
  excludeDirs: [
    "node_modules",
    ".git",
    "dist",
    ".vitepress/dist",
    "others",
    ".temp",
  ],
  enOutput: true,
};

export default function todoCollector(options: TodoOptions = {}): Plugin {
  const cfg = { ...DEFAULTS, ...options };
  let sourceDir = "";

  const normalizePath = (filePath: string) => filePath.replace(/\\/g, "/");

  const isExcluded = (relativePath: string) => {
    const normalizedPath = normalizePath(relativePath);
    const pathSegments = normalizedPath.split("/");

    return cfg.excludeDirs.some((excluded) => {
      const normalizedExcluded = normalizePath(excluded)
        .replace(/^\.\//, "")
        .replace(/\/$/, "");

      if (!normalizedExcluded) return false;

      return normalizedExcluded.includes("/")
        ? normalizedPath === normalizedExcluded ||
            normalizedPath.startsWith(`${normalizedExcluded}/`)
        : pathSegments.includes(normalizedExcluded);
    });
  };

  const formatToUtc8 = (date: Date) =>
    new Intl.DateTimeFormat("sv-SE", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Shanghai",
    }).format(date);

  // 扫描 scanRoot（相对该目录计算排除规则），返回相对 scanRoot 的文件路径
  const collectTodos = (scanRoot: string, outputPath: string): TodoItem[] => {
    const todoList: TodoItem[] = [];

    const scanDir = (dir: string) => {
      const entries = fs.readdirSync(dir);
      entries.forEach((entry) => {
        const fullPath = path.join(dir, entry);
        const relPath = path.relative(scanRoot, fullPath);

        if (path.resolve(fullPath) === path.resolve(outputPath)) {
          return;
        }

        if (isExcluded(relPath)) {
          return;
        }

        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          scanDir(fullPath);
          return;
        }

        if (!cfg.fileExtensions.some((ext) => fullPath.endsWith(ext))) {
          return;
        }

        const content = fs.readFileSync(fullPath, "utf-8");
        content.split("\n").forEach((line, index) => {
          for (const keyword of cfg.todoKeywords) {
            if (line.includes(`${keyword}:`) || line.includes(`${keyword} `)) {
              todoList.push({
                file: normalizePath(relPath),
                line: index + 1,
                text: line.trim(),
              });
              break;
            }
          }
        });
      });
    };

    scanDir(scanRoot);
    return todoList;
  };

  const renderTodoPage = (
    todoList: TodoItem[],
    linkPrefix: string,
    labels: LocaleLabels,
    timestamp: string,
  ) => {
    const todosByFile: Record<string, TodoItem[]> = {};
    todoList.forEach((item) => {
      if (!todosByFile[item.file]) todosByFile[item.file] = [];
      todosByFile[item.file].push(item);
    });

    const lines: string[] = ["---"];
    if (labels.frontmatterLang) {
      lines.push(`lang: ${labels.frontmatterLang}`);
    }
    lines.push(`title: ${labels.frontmatterTitle}`);
    lines.push("outline: [2, 3]");
    lines.push("---", "", `# ${labels.heading}`, "");
    lines.push(`> ${labels.lastUpdated(timestamp)}`, "");
    lines.push(labels.itemCount(todoList.length), "");

    Object.entries(todosByFile).forEach(([file, items]) => {
      lines.push(`## ${file}`);
      lines.push("");
      items.forEach((item) => {
        lines.push(`- **${labels.lineLabel(item.line)}**: ${item.text}`);
        lines.push(`  - [${labels.viewSource}](${linkPrefix}/${item.file})`);
      });
      lines.push("");
    });

    return lines.join("\n");
  };

  const generate = (rootDir: string) => {
    const timestamp = formatToUtc8(new Date());
    const writtenPaths: string[] = [];

    const writePage = (
      outputDir: string,
      enOnly: boolean,
      linkPrefix: string,
      labels: LocaleLabels,
    ) => {
      const outputDirPath = path.resolve(rootDir, outputDir);
      if (!fs.existsSync(outputDirPath)) {
        fs.mkdirSync(outputDirPath, { recursive: true });
      }

      const outputPath = path.resolve(outputDirPath, cfg.outputFile);
      const scanRoot = enOnly ? path.resolve(rootDir, "en") : rootDir;
      const todoList = collectTodos(scanRoot, outputPath);

      fs.writeFileSync(
        outputPath,
        renderTodoPage(todoList, linkPrefix, labels, timestamp),
        "utf-8",
      );
      writtenPaths.push(outputPath);
    };

    writePage(cfg.outputDir, false, "", ZH_LABELS);

    if (cfg.enOutput) {
      writePage(path.posix.join("en", cfg.outputDir), true, "/en", EN_LABELS);
    }

    return writtenPaths;
  };

  return {
    name: "vitepress-todo-collector",
    enforce: "pre",
    configResolved(config) {
      sourceDir = config.root;
    },
    buildStart() {
      generate(sourceDir);
    },
    configureServer(server) {
      sourceDir = server.config.root;
      const outputPaths = generate(sourceDir);
      outputPaths.forEach((outputPath) => server.watcher.add(outputPath));
    },
  };
}
