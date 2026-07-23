---
name: changelog-notification
description: 从 Git 仓库的指定起始点（日期或 commit hash）到最新，自动生成中文更新通知消息。使用此 skill 当用户说"写更新通知"、"生成更新公告"、"写 changelog"、"生成更新消息"、"@全员"、"从 xx 到最新的更新"、"通知群里"、"写群公告"、"更新说明"、"发布更新"等任何与生成更新通知/发布说明相关的需求时。主动建议生成格式化的 @全员 通知消息。该 skill 会根据 git log 自动归类并生成结构化的中文更新通知。该 skill 仅适用于基于 conventional commit 规范的仓库。
compatibility:
  require_tools:
    - Bash
  require_commands:
    - git
---

# Changelog 更新通知生成 Skill

## 概述

根据用户指定的起始时间点（日期或 commit hash），读取当前项目仓库从该起始点到最新 commit 之间的 git log，生成一份格式化的中文更新通知消息。

该 skill 专为「Survive in SCUT」等中文技术手册类项目的更新通知场景设计，但也可适用于任何遵循 conventional commit 规范的 Git 仓库。

## 输入

用户需要提供以下**至少一个**参数：

- **起始日期**（推荐）：如 `2026-07-16` 或 `2026年7月16日`，表示从该日期之后（含当天）到最新的变更
- **起始 commit hash**：如 `e423bc55` 或完整 hash，表示从该 commit 之后（不含该 commit 本身）到最新的变更

如果用户同时提供两者，优先使用起始日期。如果用户没有提供任何参数，默认从最近一次发布/标记的 tag 开始，如果没有 tag 则从 7 天前开始。

## 处理流程

### 1. 解析用户输入

从用户的自然语言中提取起始参数。用户可能说：

- "帮我写一下从 7月16号 到现在的更新通知"
- "从 e423bc55 到最新的更新"
- "写个更新公告，从 2026-07-16 开始"
- "生成更新通知，上次发通知是 8bc12e23 那个版本"
- "从上次发通知后到现在的更新"

### 2. 确定起始点

```bash
# 如果用户提供了日期（如 2026-07-16）
SINCE="2026-07-16"
# 如果用户提供了 commit hash（如 e423bc55）
SINCE_COMMIT="e423bc55"
```

- **日期模式**：使用 `git log --oneline --since="<date>" --until="<today>" --format="%H %ad %s" --date=short`
- **commit hash 模式**：使用 `git log --oneline <hash>..HEAD --format="%H %ad %s" --date=short`
- **无参数默认模式**：先检查是否有 tag，有则用最新的 tag 作为起始点；没有 tag 则使用 `--since="7.days.ago"`

### 3. 获取并解析 git log

```bash
# 从日期开始
git log --oneline --since="$SINCE" --format="%s" --no-merges --reverse

# 从 commit hash 开始
git log --oneline ${SINCE_COMMIT}..HEAD --format="%s" --no-merges --reverse
```

- 使用 `--no-merges` 过滤掉 merge commit
- 使用 `--reverse` 让最早的变更排在最前面
- 排除带有 `[skip ci]` 标签的 chore commit（这些是自动生成的 TODO 更新，对读者无意义）

### 4. 归类整理 commit

将 conventional commit 按类型（`type`）分组。对于每个类型，将 scope 和描述合并成一句通顺的中文说明。

**类型映射规则**（从 commit 消息中提取 type 和 description）：

- `feat:` → 归类到「feat」（新功能/新内容）
- `fix:` → 归类到「fix」（修复）
- `docs:` → 归类到「docs」（文档更新）—— 注意：不要一看到 docs 就归类到 docs，要结合项目判断。对于文档类项目，`docs` 类型的 commit 实际上是内容变更，应根据具体情况归类到 docs 或其他更合适的类别。例如在纯文档项目中，docs 类型 commit 可能是核心内容变更而非辅助性文档更新。
- `chore:` → 归类到「chore」（杂务/构建/工具）
- `refactor:` → 归类到「refactor」（重构）
- `ci:` → 归类到「ci」（CI/部署）
- `test:` → 归类到「test」（测试）
- `perf:` → 归类到「perf」（性能优化）
- `style:` → 归类到「style」（代码风格）
- `revert:` → 归类到「revert」（回退）

对于 `docs` 类型，做一个额外判断：如果整个仓库就是文档项目（如 `survive-in-scut`），`docs:` commit 通常代表**实质性的内容变更**（新增页面、补充内容等），应根据描述内容重新判断归类。例如：

- `docs: add exam hacker resource` → 这是内容新增 → 归类为 `feat`
- `docs: update exam hacker tooltip` → 这是内容更新 → 归类为 `docs`
- `docs: fix typos` → 文字修正 → 归类为 `fix`

归纳规则：先看实际变更了什么，而不是机械地按 tag 分类。

**分组规则**：将有共同 scope 的 commit 合并为一条描述。

### 5. 构建通知消息

使用以下模板生成通知消息：

```
@全体成员 各位好！手册更新了！

  - <type>：<中文描述>
  - <type>：<中文描述>
  ...
```

**格式要求：**

1. **首行**：`@全体成员 各位好！手册更新了！`（固定开场白）
2. **空一行**
3. **每个 bullet**：以 ` -`（两个空格 + 短横 + 空格）开头，格式为 `<类型标签>：<中文描述>`
4. **类型标签**使用小写英文字母，后跟中文冒号（全角）：`feat：` `fix：` `docs：` `chore：` `refactor：` `ci：`
5. **排序规则**：优先将重要程度高的类型排在前面，参考顺序：feat > fix > docs > refactor > perf > chore > ci > test > style
6. **描述撰写**：
   - 每个 bullet 的描述应该简洁明了，用一句话概括同一类别下的变更
   - 将多个同类 commit 合并成通顺的一句话，而不是简单罗列
   - 描述围绕"用户能感知到的变化"来写，避免过于技术性的内部细节
   - 如果某个类型下有多个独立变更，可拆成多个 bullet，但每个 bullet 仍需简洁
   - 使用中文撰写描述
   - 描述中不应出现 commit hash、作者信息等
7. **行尾不要有标点符号**（句号、分号等）

### 6. 输出示例

以下是一个输出示例：

```
@全体成员 各位好！手册更新了！

  - feat：补齐英文站目录，页面由 30 页增加至 51 页；缺失译文暂以最新版中文内容占位，并同步相关图片资源；完成英文首页翻译
  - fix：修复 VitePress 2 多语言i18n配置未生效的问题，英文站标题、导航、搜索、页面大纲、翻页、404 和内部链接现已正确切换
  - fix：统一中英文首页 Hero 结构、图片和语言路径，解决切换英文后 Hero 样式突变及按钮跳回中文站的问题
  - fix：Waline 评论框现可跟随站内深浅色主题切换，暗色模式下不再显示浅色评论框
  - chore：为 PDF 预览、Markdown 编辑器、贡献者列表、App 下载页等自定义组件补齐双语 UI，并避免英文占位内容重复进入 TODO汇总
```

注意每条 bullet 简洁、信息量大、每个类别可能有多条 bullet 分别描述不同的变更。

## 重要注意事项

- **不要**在通知中包含过于技术性的细节（如依赖版本号、重构内部实现等），除非对用户有直接影响
- **不要**包含 merge commit、`[skip ci]` 的自动提交、TODO 自动更新等嘈杂的 commit
- **不要**在输出中显示 commit hash 或作者信息
- **不要**在行尾添加标点符号
- **应该**将同类型的相似变更合并为一条描述
- **应该**让描述围绕"用户可见的变化"来组织
- **应该**确保类型标签按重要程度排序
- 在执行 git log 命令时，**务必使用绝对路径** `git -C /Users/kozmosa/code/survive-in-scut` 以确保命令能正确执行
- **生成完通知消息后，直接展示给用户**，等待用户的进一步指令（如复制、发送到群等），不要自作主张发送或复制到剪贴板

## 执行步骤总结

1. 询问或从用户输入中解析起始参数（日期或 commit hash）
2. 确认项目路径为 `/Users/kozmosa/code/survive-in-scut`
3. 根据起始参数执行 git log 命令获取 commit 列表
4. 过滤无关 commit（merge、[skip ci]、TODO 自动更新等）
5. 按类型归类整理，合并同类描述
6. 按重要程度排序类型
7. 格式化输出通知消息
8. 展示给用户并询问是否需要调整
