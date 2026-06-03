---
lang: zh-CN
title: 维护路线图
description: 近期维护顺序
---

# 维护路线图

> 2026-06-03

这页就是最近需要修的东西，按顺序排的。不是正式规划文档，会随着进度随时改。

## 当前判断

仓库本质上是个文档站，先修读者会点进去的页面比先搞框架重要。现有的 VuePress 自定义逻辑已经不少，不是改一份配置就能换掉的。所以顺序是先补内容，再拆耦合，最后才评估 VitePress。

## 优先修什么

1. 版权页和来源标注：`copyrights` 中英文页现在要么空着要么口径不清。先把 LICENSE、站内版权声明、第三方素材之间的关系写明白。

2. 入口页修到不坑人：`get-started.md`、`introduction.md`、`medical_care.md`、`common_basic_lessons.md`、`transfer_major.md`——先把过期年份和空白占位去掉，不用一口气写到完美。

3. Issue #23 范围定调：App 那边是只加 WebVPN 入口还是允许自定义 URL，平台支持范围，文档里该写什么限制和风险。不定边界后面两边都返工。

4. 英文最小入口：先补 `get-started`、`introduction`、`contributing`、`medical_care`、`bus`。没翻的页面写"待补"，别把中文塞进英文页糊弄。

5. 生成逻辑解耦：TODO 收集、contributors、app release metadata 这仨如果能脱离 VuePress 生命周期跑起来，后面不管用哪个框架都会轻松。

## 前五条做完了再碰

- 英文全量翻译：中文源都还在修，追双语同步只能得到两份过期文档。
- 把 TODO 汇总页当 backlog：它适合找缺口，不适合当看板。
- PR 混搭：别在一个 PR 里同时改内容、改构建、改导航。

## VitePress

先准备，不着急切。
原因很简单：VuePress 自定义逻辑还没拆开，入口页 backlog 还在，迁完还得逐个验证组件、PDF、多语言路由。
顺序：先稳内容 → 拆生成逻辑 → 双平台对比构建 → 再决定换不换。

## 建议的 PR 拆法

1. copyrights + contributing
2. get-started 年度清理
3. introduction 重写
4. 英文入口
5. app 文档 + #23 方案
6. infra/life/learn 占位补完
