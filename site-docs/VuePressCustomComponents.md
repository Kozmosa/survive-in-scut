# VuePress 自定义组件使用说明

本文档汇总项目中已注册的 VuePress 自定义组件及其用法，便于后续页面复用。

组件注册位置：`docs/.vuepress/client.ts`

当前全局可用组件：

- `MarkdownEditor`
- `ExpandableCard`
- `ContributorsList`
- `AppLanding`
- `ProbabilityDistributionGallery`
- `ImmersiveShell`

## 1) MarkdownEditor

- 组件路径：`docs/.vuepress/components/MarkdownEditor.vue`
- 用途：Markdown 在线编辑/预览（编辑、预览、分栏三种视图）
- Props：
  - `content: string`（可选，默认空字符串）
- Emits：
  - `update:content`（编辑内容变化时触发）

示例：

```md
<MarkdownEditor />
```

带绑定示例（在 Vue 组件中）：

```vue
<template>
  <MarkdownEditor v-model:content="text" />
</template>

<script setup>
import { ref } from "vue";

const text = ref("# Hello");
</script>
```

当前使用页：`docs/others/contributing.md`

## 2) ExpandableCard

- 组件路径：`docs/.vuepress/components/ExpandableCard.vue`
- 用途：可展开/收起的卡片容器
- Props：
  - `title: string`（可选）
  - `defaultExpanded: boolean`（可选，默认 `true`）
- Slot：
  - 默认插槽（卡片内容）

示例：

```md
<ExpandableCard title="展开查看" :defaultExpanded="false">
  <p>这里放卡片内容。</p>
</ExpandableCard>
```

## 3) ContributorsList

- 组件路径：`docs/.vuepress/components/ContributorsList.vue`
- 用途：读取 `/contributors.json` 并展示贡献者列表
- Props：无

示例：

```md
<ContributorsList />
```

当前使用页：`docs/others/contributing.md`

## 4) AppLanding

- 组件路径：`docs/.vuepress/components/AppLanding.vue`
- 用途：App 下载入口与平台推荐（读取 `/assets/app/release.json`）
- Props：无

示例：

```md
<AppLanding />
```

当前使用页：`docs/others/app.md`

## 5) ProbabilityDistributionGallery

- 组件路径：`docs/.vuepress/components/ProbabilityDistributionGallery.vue`
- 内部资源：
  - `docs/.vuepress/components/probability/gallerySource.html`
  - `docs/.vuepress/components/probability/galleryAdapter.js`
- 用途：概率分布可视化工具（公式、图像、参数联动）
- 特性：
  - 支持 KaTeX 公式渲染（失败时保留纯文本回退）
  - 正态分布固定同标度对比（含标准正态参考曲线）

示例：

```md
<ProbabilityDistributionGallery />
```

当前使用页：`docs/learn/curricular/common/probalistics_and_statistics/distribution_gallery.md`

## 6) ImmersiveShell

- 组件路径：`docs/.vuepress/components/ImmersiveShell.vue`
- 用途：沉浸式全屏容器（导航栏下全屏区域）
- 行为：容器高度为 `calc(100vh - var(--navbar-height))`

示例：

```md
<ImmersiveShell>
  <ProbabilityDistributionGallery />
</ImmersiveShell>
```

## 全屏页面复用规范

若页面要实现“导航栏下全屏工具页”，建议配套使用：

1. Frontmatter 设置：

```md
---
immersive: true
sidebar: false
editLink: false
lastUpdated: false
contributors: false
---
```

2. 页面内容使用：

```md
<ImmersiveShell>
  <YourToolComponent />
</ImmersiveShell>
```

3. `YourToolComponent` 内部建议：

- 根容器 `height: 100%`
- 核心视图容器（iframe/canvas/plot）`width: 100%; height: 100%`
- 需要时增加 `overflow: hidden` 防止外层出现额外滚动条

## 维护建议

- 新增组件后，必须在 `docs/.vuepress/client.ts` 注册后才能在 Markdown 中直接使用。
- 面向浏览器 API（`window`/`document`）的逻辑，放在客户端生命周期中执行，避免 SSR 问题。
- 若组件依赖静态 JSON 或资源，优先放在 `docs/.vuepress/public/` 并通过绝对路径访问。
