# FullPageComponent 实现说明

本文档记录本站“导航栏下全屏页面（沉浸式页面）”的实现方式，以概率分布工具页为示例。

## 1. 实现目标

- 保留 VuePress 顶部导航栏（navbar）
- navbar 下方全部由工具页面占据
- 去掉文档正文壳层（正文宽度限制、页面元信息、上一篇下一篇、评论等）
- 避免出现多余滚动条（尤其是 1px 级别的横向/纵向溢出）

## 2. 当前实现架构

### 2.1 Frontmatter 开关（页面级）

通过页面 frontmatter 启用沉浸模式：

- `immersive: true`
- `sidebar: false`
- 建议同时设置：
  - `editLink: false`
  - `lastUpdated: false`
  - `contributors: false`

示例（概率工具页）：

```md
---
lang: zh-CN
title: 概率分布图像工具
description: 概率论与数理统计常见分布函数图像的交互学习工具
immersive: true
sidebar: false
editLink: false
lastUpdated: false
contributors: false
---
```

### 2.2 全屏壳组件（通用复用）

使用 `ImmersiveShell` 作为全屏容器：

- 文件：`docs/.vuepress/components/ImmersiveShell.vue`
- 关键样式：
  - `height: calc(100vh - var(--navbar-height))`
  - `overflow: hidden`

页面内包裹方式：

```md
<ImmersiveShell>
  <YourToolComponent />
</ImmersiveShell>
```

### 2.3 布局层识别沉浸页

在自定义布局中读取 frontmatter 的 `immersive`：

- 文件：`docs/.vuepress/layouts/Layout.vue`
- 行为：
  - 若 `immersive: true`，给外层加 `.immersive-page` 类
  - 沉浸页不渲染评论区（`CommentService`）

### 2.4 全局样式统一去“文档壳”

- 文件：`docs/.vuepress/public/styles/global.css`
- 作用域：`.immersive-page .vp-theme-container ...`
- 主要处理：
  - 取消 `vp-page` 的侧边栏占位与默认底部留白
  - 让 `[vp-content]` 不受默认 max-width 限制
  - 隐藏沉浸页中的 `h1` / 首段说明（仅页面正文中的）
  - 隐藏 `.vp-page-meta`、`.vp-page-nav`、评论容器
  - 对关键容器设置 `overflow: hidden`，防止外层细小滚动条

## 3. 工具组件侧实现要点（避免滚动条）

以 iframe 方案为例：

- 文件：`docs/.vuepress/components/ProbabilityDistributionGallery.vue`
- 关键样式建议：
  - 外层容器 `height: 100%; overflow: hidden;`
  - iframe：
    - `display: block;`
    - `box-sizing: border-box;`
    - `width: 100%; height: 100%;`
- 说明：`display: block + border-box` 可避免 iframe 典型 1~2px 溢出导致的双滚动条

## 4. 当前示例页面

- 页面：`docs/learn/curricular/common/probalistics_and_statistics/distribution_gallery.md`
- 页面内容：

```md
<ImmersiveShell>
  <ProbabilityDistributionGallery />
</ImmersiveShell>
```

---

## 之后复用全屏实现、增加需要全屏显示的页面指南

新增任何“导航栏下全屏工具页”，按以下步骤执行：

1. 创建新页面 `docs/.../your_tool_page.md`
2. 在 frontmatter 添加：
   - `immersive: true`
   - `sidebar: false`
   - `editLink: false`
   - `lastUpdated: false`
   - `contributors: false`
3. 页面正文使用：
   - `<ImmersiveShell><YourToolComponent /></ImmersiveShell>`
4. 确保 `YourToolComponent` 满足：
   - 根容器 `height: 100%`
   - 内层核心视图（iframe / canvas / plot 容器）`width: 100%; height: 100%`
   - 必要时 `overflow: hidden`
5. 在 `docs/.vuepress/client.ts` 注册新组件（如未注册）
6. 本地验证：
   - `bun run docs:build`
   - 打开目标页检查：
     - 仅工具内部滚动（若内容超出）
     - 外层无多余横向/纵向滚动条
     - 移动端与桌面端均正常展示
