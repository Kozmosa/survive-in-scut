# 代码库清理重构规范

> 本文件记录 survive-in-scut 从 VuePress 迁移到 VitePress 后的清理计划与标准。
> 目标：消除遗留代码、统一架构规范、提升可维护性。

---

## 规范概览

| Phase                                   | 范围                                 | 优先级 |
| --------------------------------------- | ------------------------------------ | ------ |
| [Phase 1](#phase-1-清除-vuepress-残留)  | 移除 VuePress 配置文件、插件、死代码 | P0     |
| [Phase 2](#phase-2-配置-sidebar)        | 配置 VitePress sidebar，完善导航     | P0     |
| [Phase 3](#phase-3-实现真实英文-locale) | 将名义 i18n 变为真实英文翻译 ✅      | P1     |
| [Phase 4](#phase-4-索引页--seo-优化)    | 补齐索引页、SEO 元信息 ✅            | P1     |

---

## Phase 1 — 清除 VuePress 残留

### 背景

项目已从 VuePress 2 迁移到 VitePress 2，Netlify CI 使用 `vitepress build`。但 `docs/.vuepress/` 目录完整残留（配置文件、插件、组件、构建产物），部分组件仍被 VitePress 主题通过跨目录 import 引用。

### 目标

彻底消除 `docs/.vuepress/`，所有活跃代码统一归入 `docs/.vitepress/`。

### 清单

#### 1.1 配置文件

- [x] 删除 `docs/.vuepress/config.js`
- [x] 删除 `docs/.vuepress/client.ts`

#### 1.2 Layout

- [x] 删除 `docs/.vuepress/layouts/Layout.vue`
- [x] 删除 `docs/.vuepress/layouts/` 目录

#### 1.3 插件

- [x] 删除 `docs/.vuepress/plugins/app-release/`
- [x] 删除 `docs/.vuepress/plugins/contributors/`
- [x] 删除 `docs/.vuepress/plugins/pdfviewer/`

#### 1.4 组件

- [x] 迁移 `AppLanding.vue` → `docs/.vitepress/components/`（已完成）
- [x] 迁移 `ContributorsList.vue` → `docs/.vitepress/components/`（已完成）
- [x] 迁移 `ImmersiveShell.vue` → `docs/.vitepress/components/`（已完成）
- [x] 迁移 `ProbabilityDistributionGallery.vue` → `docs/.vitepress/components/`（已完成）
- [x] 确认 `ExpandableCard.vue` 使用 `.vitepress` 版本后删除 `.vuepress` 版本
- [x] 确认 `MarkdownEditor.vue` 使用 `.vitepress` 版本后删除 `.vuepress` 版本
- [x] 删除 `docs/.vuepress/components/` 目录

#### 1.5 静态资源

- [x] `docs/public/` 设为 canonical source（已完成）
- [x] `.gitignore` 移除 `/docs/public/` 条目（已完成）
- [x] Sync 脚本方向反转（已完成）
- [x] 将 `docs/.vuepress/public/` 内容合并入 `docs/public/`（`docs/public` 已是 canonical source）
- [x] 删除 `docs/.vuepress/public/` 目录
- [x] 删除 `scripts/sync-vitepress-public.js`（不再需要向后兼容）

#### 1.6 构建产物

- [x] 删除 `docs/.vuepress/dist/`（已完成，50MB）
- [x] 删除 `docs/.vuepress/.cache/`（已完成）
- [x] 删除 `docs/.vuepress/.temp/`（已完成）
- [x] 删除 `/.vitepress/`（已完成，根目录错误缓存）

#### 1.7 其他残留

- [x] 删除 `packages/vuepress-plugin-todo/`（VuePress 旧 TODO 插件）
- [x] 删除 `examples/vuepress-config-example.js`
- [x] 删除 `create.sh`
- [x] 更新 `scripts/docs-build-platform.js`：移除 `syncLegacyPublicDir` 调用（已完成）
- [x] 确认 `docs/.vitepress/plugins/contributorsCollector.ts` 的 `excludeDirs` 中的 `".vuepress"` 已移除（已完成）

### 验收标准

- `docs/.vuepress/` 目录完全消失
- `npm run docs:build` 构建成功
- `npm run docs:build:platform` 构建成功
- 所有自定义 Vue 组件正常渲染

---

## Phase 2 — 配置 Sidebar

### 背景

当前 VitePress config **完全没有 sidebar 配置**。VitePress 2 不会自动生成 sidebar，用户进入子页面后左侧导航完全空白。

### 目标

为中文和英文 locale 分别配置完整的 multi-sidebar，覆盖所有内容 sections。

### 设计原则

1. **与导航结构一致但更细粒度**：sidebar 应反映 nav 的分组层次，但展开所有子页面以便浏览
2. **locale 感知**：`/` 下的 sidebar 用于中文，`/en/` 下的用于英文
3. **collapsible sections**：次级分组使用 `collapsed: true` 保持默认折叠
4. **索引页优先**：每个 section 的第一个条目指向其 `index.md`（待创建）

### 推荐结构

sidebar 定义提取到独立文件 `docs/.vitepress/sidebar.ts`，按 locale 导出 `sidebarZh` 和 `sidebarEn`。
中文 sidebar key 为 `'/'`，英文 key 为 `'/en/'`，VitePress 按最长路径匹配优先规则自动选择对应 sidebar。
在 `config.ts` 中通过 import 合并入 `themeConfig.sidebar`。

### 状态

- [x] 创建 `docs/.vitepress/sidebar.ts`，导出 `sidebarZh` 和 `sidebarEn`
- [x] 在 `config.ts` 中合并到 `themeConfig.sidebar`
- [x] 中英文各自独立配置，路径前缀正确处理
- [x] 所有 8 个导航分组均有对应 sidebar 条目
- [x] 构建验证通过

### 验收标准

- 每个内容 section 在 sidebar 中有对应分组
- 左侧导航在子页面可见，显示当前页面位置
- 移动端 sidebar menu 正常工作
- 中英文 sidebar 各自独立配置

---

## Phase 3 — 实现真实英文 Locale

### 背景

当前 51 个 `docs/en/` 下的文件，**49 个的 frontmatter 为 `lang: zh-CN`**，正文内容也是中文。英文版实质上不存在。仅有 `en/copyrights.md` 和 `en/learn/extra/srp.md` 正确设置 `lang: en-US`。

### 目标

将英文 locale 变为真正的英文内容，而非中文镜像。

### 翻译策略

#### 优先级分层

| 层级                 | 页面                                                        | 翻译策略                                             |
| -------------------- | ----------------------------------------------------------- | ---------------------------------------------------- |
| **T0（核心导航页）** | get-started, introduction, infra/index, README（首页）      | 人工翻译 + `llm_translated: false`（或不标注）       |
| **T1（高流量内容）** | infra/hemc/map, life/eat/_, life/time/_, health/alive_first | LLM 辅助翻译 + `llm_translated: true` → 后续人工审校 |
| **T2（专题内容）**   | learn/curricular/_, beyond/_, health/medical_care           | LLM 翻译 + `llm_translated: true`                    |
| **T3（元页面）**     | others/contributing, others/roadmap, copyrights             | 人工翻译                                             |

#### Frontmatter 规范

```yaml
---
lang: en-US
title: <English title>
description: <English description>
llm_translated: true # 仅 AI 翻译的页面添加，人工翻译不添加
---
```

> `llm_translated` 字段由 `AGENTS.md` 规则约束，所有 coding agent 在翻译时自动添加。

#### 翻译质量要求

- 自然英文，非逐字直译
- 保留原文中的人称和语气（学生视角、非正式口吻）
- 保留 Markdown 格式、内部链接、frontmatter
- 不翻译代码块、URL、专有名词（SCUT、HEMC、GZIC 等）

### 阶段性验收

1. T0 翻译完成 → 英文首页可完整浏览
2. T0 + T1 翻译完成 → 英文用户可基本使用
3. T0-T3 全部完成 → 英文内容功能完整

### 状态

- [x] T0 核心导航页翻译完成（get-started, introduction, infra/index, README 等）
- [x] T1 高流量内容翻译完成（life/, health/alive_first 等）
- [x] T2 专题内容翻译完成（learn/curricular/, beyond/, health/ 等）
- [x] T3 元页面翻译完成（others/contributing, others/roadmap 等）
- [x] 所有 51 个 `docs/en/` 文件 `lang` 修正为 `en-US`（原 45 个错误标记为 `zh-CN`）
- [x] 所有 LLM 翻译页面添加 `llm_translated: true`
- [x] 人工已有英文页面标注 `llm_translated: false`
- [x] 构建验证通过

---

## Phase 4 — 索引页 & SEO 优化

### 背景

当前仅 `infra/` 有 `index.md`。`life/`、`learn/`、`beyond/`、`health/`、`others/` 五个顶级目录均无索引页。导航中也仅有"设施"分组提供了"概览"链接入口。

### 目标

为每个内容 section 创建索引页，完善页面级 SEO 元信息。

### 清单

#### 4.1 索引页

为以下目录创建 `index.md`（中文 + 英文）：

- [x] `docs/life/index.md` + `docs/en/life/index.md`
- [x] `docs/learn/index.md` + `docs/en/learn/index.md`
- [x] `docs/beyond/index.md` + `docs/en/beyond/index.md`
- [x] `docs/health/index.md` + `docs/en/health/index.md`
- [x] `docs/others/index.md` + `docs/en/others/index.md`

索引页内容应包括：该 section 的简要概述、子页面列表及简短说明、典型使用场景指引。

#### 4.2 导航入口

- [x] 在每个导航分组中添加指向索引页的"概览"链接（如 `{ text: "概览", link: "/life/index" }`）

#### 4.3 页面元信息

检查现有所有 `.md` 文件的 frontmatter：

- [ ] `title` — 应为页面级别的具体标题，非 section 名称
- [ ] `description` — 应有 1-2 句 SEO 友好的页面摘要
- [ ] `lang` — 正确定义语言（`zh-CN` 或 `en-US`）
- [ ] 英文页面还需准备 `llm_translated`（见 Phase 3）

#### 4.4 SEO 全局配置

- [ ] 确认 `config.ts` 中 `description` 在 locale 级别正确设置
- [ ] 确认 open graph / Twitter card meta tags 是否需要补充
- [ ] 考虑添加 `<meta name="keywords">`（如适用）

### 验收标准

- 每个 section 可访问 `/life/`、`/learn/` 等路径而非 404
- 每个 section 导航分组中有"概览"入口
- 所有页面的 frontmatter `title` 和 `description` 已填充

---

## 附录

### 目录结构目标状态

```
docs/
├── .vitepress/           # 所有自定义代码
│   ├── config.ts
│   ├── sidebar.ts        # (新建) sidebar 定义
│   ├── theme/
│   ├── components/       # 所有 Vue 组件
│   ├── composables/
│   └── plugins/
├── public/               # 静态资源（唯一的 canonical source）
├── .vuepress/            # ❌ 应完全删除
├── infra/ life/ learn/ beyond/ health/ others/  # 内容
│   └── index.md          # (补全) 索引页
├── en/                   # 英文内容镜像
│   └── ...               # 所有页面 lang: en-US + 真实英文内容
└── *.md                  # 根级页面
```

### 相关文件

- [AGENTS.md](../AGENTS.md) — Agent 工作规则（含翻译 metadata 规则）
- [VitePressMigration.md](VitePressMigration.md) — 迁移状态追踪
