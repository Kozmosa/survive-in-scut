import fs from "fs";
import path from "path";

export default (options = {}) => {
  const {
    outputDir = "others", // 默认输出到 others 目录
    outputFile = "todo.md",
    jsonOutputDir = ".vuepress/public",
    jsonOutputFile = "todo.json",
    todoKeywords = ["TODO"],
    fileExtensions = [".md", ".vue"],
    excludeDirs = ["node_modules", ".git", "dist", ".vuepress/dist"],
    runOnBuildOnly = true,
  } = options;

  let todoCollectorPromise = null;
  let todoCollectorSkipped = false;

  return {
    name: "vuepress-plugin-todo-collector",

    async extendsPageOptions(_pageOptions, app) {
      const isProductionBuild = process.env.NODE_ENV === "production";
      if (runOnBuildOnly && !isProductionBuild) {
        if (!todoCollectorSkipped) {
          console.log("[Todo Collector] 跳过 TODO 扫描：仅在生产构建时生成。");
          todoCollectorSkipped = true;
        }
        return;
      }

      if (todoCollectorPromise) {
        await todoCollectorPromise;
        return;
      }

      todoCollectorPromise = (async () => {
        const sourceDir = app.dir.source();

        // 确保输出目录存在
        const outputDirPath = path.resolve(sourceDir, outputDir);
        if (!fs.existsSync(outputDirPath)) {
          fs.mkdirSync(outputDirPath, { recursive: true });
        }
        const jsonOutputDirPath = path.resolve(sourceDir, jsonOutputDir);
        if (!fs.existsSync(jsonOutputDirPath)) {
          fs.mkdirSync(jsonOutputDirPath, { recursive: true });
        }

        const outputPath = path.resolve(outputDirPath, outputFile);
        const jsonOutputPath = path.resolve(jsonOutputDirPath, jsonOutputFile);
        const ignoredFiles = new Set([
          path.relative(sourceDir, outputPath).replace(/\\/g, "/"),
          path.relative(sourceDir, jsonOutputPath).replace(/\\/g, "/"),
        ]);

        // 扫描TODO列表
        const todoList = [];

        const matchesTodoLine = (line, keyword) => {
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
        };

        const normalizeRelativePath = (fullPath) =>
          path.relative(sourceDir, fullPath).replace(/\\/g, "/");

        const shouldExcludePath = (fullPath) => {
          const relativePath = normalizeRelativePath(fullPath);
          if (ignoredFiles.has(relativePath)) {
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
        };

        // 扫描目录函数
        const scanDir = (dir) => {
          try {
            const files = fs.readdirSync(dir);
            files.forEach((file) => {
              const fullPath = path.join(dir, file);

              if (shouldExcludePath(fullPath)) {
                return;
              }

              if (fs.statSync(fullPath).isDirectory()) {
                scanDir(fullPath);
              } else if (fileExtensions.some((ext) => file.endsWith(ext))) {
                try {
                  const content = fs.readFileSync(fullPath, "utf-8");
                  const relativePath = normalizeRelativePath(fullPath);

                  content.split("\n").forEach((line, index) => {
                    // 检查是否包含TODO关键词
                    for (const keyword of todoKeywords) {
                      if (matchesTodoLine(line, keyword)) {
                        const todoText = line.trim();
                        todoList.push({
                          file: relativePath,
                          line: index + 1,
                          text: todoText,
                        });
                        break;
                      }
                    }
                  });
                } catch (err) {
                  console.error(
                    `[Todo Collector] 读取文件错误 ${fullPath}: ${err.message}`,
                  );
                }
              }
            });
          } catch (err) {
            console.error(
              `[Todo Collector] 扫描目录错误 ${dir}: ${err.message}`,
            );
          }
        };

        // 开始扫描
        console.log("[Todo Collector] 开始扫描 TODO...");
        scanDir(sourceDir);
        console.log(`[Todo Collector] 共找到 ${todoList.length} 个 TODO 项`);

        // 按文件分组
        const todosByFile = {};
        todoList.forEach((item) => {
          if (!todosByFile[item.file]) {
            todosByFile[item.file] = [];
          }
          todosByFile[item.file].push(item);
        });

        // 生成 Markdown 内容
        const todoContent = [
          "---",
          "sidebar: auto",
          "title: TODO 汇总",
          "description: 项目中的 TODO 列表汇总",
          "---",
          "",
          "# TODO 汇总",
          "",
          `> 最后更新时间: ${new Date().toISOString().replace("T", " ").substr(0, 19)}`,
          "",
          `共找到 ${todoList.length} 个 TODO 项`,
          "",
        ];

        // 按文件添加 TODO 项
        Object.entries(todosByFile).forEach(([file, items]) => {
          todoContent.push(`## ${file}`);
          todoContent.push("");

          items.forEach((item) => {
            todoContent.push(`- **第 ${item.line} 行**: ${item.text}`);
            todoContent.push(`  - [查看源文件](/${file})`);
          });

          todoContent.push("");
        });

        // 写入文件
        try {
          fs.writeFileSync(outputPath, todoContent.join("\n"), "utf-8");

          const todoJson = {
            generatedAt: new Date().toISOString(),
            total: todoList.length,
            items: todoList,
          };
          fs.writeFileSync(
            jsonOutputPath,
            JSON.stringify(todoJson, null, 2),
            "utf-8",
          );

          console.log(
            `[Todo Collector] 生成了 ${todoList.length} 个TODO项到: ${outputPath}`,
          );
          console.log(`[Todo Collector] 生成 JSON 到: ${jsonOutputPath}`);

          // 获取相对路径用于URL
          const relativePath = path
            .join(outputDir, outputFile)
            .replace(/\\/g, "/");
          const todoUrl = `/${relativePath.replace(/\.md$/, ".html")}`;
          console.log(`[Todo Collector] TODO页面URL: ${todoUrl}`);

          // 注意：不再尝试修改 app.pages，让 VuePress 自然地发现并处理这个文件
        } catch (err) {
          console.error(`[Todo Collector] 写入文件错误: ${err.message}`);
        }
      })();

      await todoCollectorPromise;
    },
  };
};
