import fs from "fs";
import path from "path";

/**
 * 扫描目录中的TODO注释
 * @param {string} directory - 要扫描的目录
 * @param {Object} options - 配置选项
 * @returns {Array} 找到的TODO项列表
 */
export function scanDirectory(directory, options) {
  const { todoKeywords, fileExtensions, excludeDirs } = options;
  const todoList = [];

  function scan(dir) {
    try {
      const files = fs.readdirSync(dir);
      files.forEach((file) => {
        const fullPath = path.join(dir, file);

        // 检查是否为排除目录
        if (excludeDirs.some((excludeDir) => fullPath.includes(excludeDir))) {
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
      const relativePath = path.relative(sourceDir, filePath);

      content.split("\n").forEach((line, index) => {
        // 检查是否包含TODO关键词
        for (const keyword of todoKeywords) {
          if (line.includes(keyword + ":") || line.includes(keyword + " ")) {
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
