import fs from "fs";
import path from "path";

/**
 * 扫描目录中的TODO注释
 * @param {string} directory - 要扫描的目录
 * @param {Object} options - 配置选项
 * @returns {Array} 找到的TODO项列表
 */
export function scanDirectory(directory, options) {
  const { todoKeywords, fileExtensions, excludeDirs, ignoredFiles = [] } = options;
  const todoList = [];
  const ignoredRelativePaths = new Set(ignoredFiles);

  function matchesTodoLine(line, keyword) {
    const trimmed = line.trimStart();
    const candidates = [
      `${keyword}:`,
      `${keyword} `,
      `// ${keyword}:`,
      `// ${keyword} `,
      `/* ${keyword}:`,
      `/* ${keyword} `,
      `* ${keyword}:`,
      `* ${keyword} `,
      `<!-- ${keyword}:`,
      `<!-- ${keyword} `,
      `- ${keyword}:`,
      `- ${keyword} `,
      `* ${keyword}:`,
      `* ${keyword} `,
      `+ ${keyword}:`,
      `+ ${keyword} `,
      `> ${keyword}:`,
      `> ${keyword} `,
    ];
    return candidates.some((candidate) => trimmed.startsWith(candidate));
  }

  function normalizeRelativePath(fullPath) {
    return path.relative(directory, fullPath).replace(/\\/g, "/");
  }

  function shouldExcludePath(fullPath) {
    const relativePath = normalizeRelativePath(fullPath);
    if (ignoredRelativePaths.has(relativePath)) {
      return true;
    }

    return excludeDirs.some((excludeDir) => {
      const normalizedDir = String(excludeDir || "")
        .replace(/\\/g, "/")
        .replace(/^\.\//, "")
        .replace(/\/$/, "");
      return (
        normalizedDir &&
        (relativePath === normalizedDir ||
          relativePath.startsWith(`${normalizedDir}/`))
      );
    });
  }

  function scan(dir) {
    try {
      const files = fs.readdirSync(dir);
      files.forEach((file) => {
        const fullPath = path.join(dir, file);

        if (shouldExcludePath(fullPath)) {
          return;
        }

        if (fs.statSync(fullPath).isDirectory()) {
          scan(fullPath);
        } else if (fileExtensions.some((ext) => file.endsWith(ext))) {
          scanFile(fullPath, directory);
        }
      });
    } catch (err) {
      console.error(`[Todo Collector] 扫描目录错误 ${dir}: ${err.message}`);
    }
  }

  function scanFile(filePath, sourceDir) {
    try {
      const content = fs.readFileSync(filePath, "utf-8");
      const relativePath = normalizeRelativePath(filePath);

      content.split("\n").forEach((line, index) => {
        // 检查是否包含TODO关键词
        for (const keyword of todoKeywords) {
          if (matchesTodoLine(line, keyword)) {
            const todoText = line.trim();
            const todoItem = {
              file: relativePath,
              line: index + 1,
              text: todoText,
            };
            todoList.push(todoItem);
            break;
          }
        }
      });
    } catch (err) {
      console.error(
        `[Todo Collector] 读取文件错误 ${filePath}: ${err.message}`,
      );
    }
  }

  scan(directory);
  return todoList;
}
