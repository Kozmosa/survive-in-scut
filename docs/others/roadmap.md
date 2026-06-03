---
lang: zh-CN
title: 维护路线图
description: survive-in-scut 的近期维护顺序
---

# 维护路线图

> 更新时间：2026-06-03
> 适用对象：仓库维护者、准备提 PR 的贡献者

这页只记近期维护顺序，不写愿景口号。

## 当前判断

- 这个仓库首先是文档站。当前主要问题是入口页、版权页和英文页还不够稳，不是框架本身挡住了维护。
- 仓库已经绑了不少自定义能力：TODO 收集、contributors 生成、App release metadata、PDF 查看器、沉浸式工具页。迁框架不是改一份配置就能结束。
- 因此近期顺序应该是：先修读者直接会看到的内容，再拆构建耦合，最后再评估是否切到 `VitePress`。

## 近期优先级

### P0

1. 补齐版权说明与来源口径。

要求：`copyrights` 中英文页不再留空；`LICENSE`、站内版权页、第三方素材来源之间的关系写清楚。

2. 处理入口页和高流量说明页。

优先文件：

- `docs/get-started.md`
- `docs/introduction.md`
- `docs/health/medical_care.md`
- `docs/learn/curricular/common_basic_lessons.md`
- `docs/learn/curricular/transfer_major.md`

要求：先去掉明显过期、空白占位或容易误导新生的内容，再谈补全。

3. 明确 Issue #23 的范围。

要先定三件事：

- 只支持 WebVPN 入口，还是允许自定义 URL
- 哪些平台要支持
- 文档里怎么写限制和风险

4. 补最小可用的英文入口。

优先顺序：

- `en/get-started`
- `en/introduction`
- `en/others/contributing`
- `en/health/medical_care`
- `en/life/time/bus`

要求：宁可明确写“待补”，也不要继续把中文正文放进英文页里。

5. 继续把会复用的生成步骤从 VuePress 生命周期里拆出来。

优先是：

- TODO 收集
- contributors 生成
- app release metadata 同步

要求：这些步骤最终要能以独立 prebuild 的方式运行，不继续绑定在单一框架钩子上。

### P1

- 补 `infra/*/map|nearby`、`life/eat/*`、`life/entertainment/*` 这类高频生活页。
- 补 `learn/curricular/lessons.md`、`gpa.md`、`exam.md`、`majors.md` 这类学习入口页。
- 在 `contributing` 中补写作规范：附件命名、来源标注、时间敏感信息标记、翻译同步规则。
- 给高时效页面增加“最后核对日期”或“适用学年”标注。

## 暂时不要做

- 不要把 TODO 汇总页当正式 backlog。它适合找缺口，不适合直接代替维护判断。
- 不要在一个 PR 里同时混内容改写、构建改造和导航重排。范围一杂，review 成本就会上去。
- 不要在中文源内容还没稳定时追求全量双语同步，否则只会得到两份一起过期的页面。

## 关于 VitePress

当前可以做准备，但不建议现在切生产默认框架。

原因很直接：

- 现有 VuePress 自定义逻辑还没拆干净。
- 入口页和规则页本身还有 backlog。
- 迁移后需要重新验证组件、工具页、PDF、多语言路由是否等价。

更稳的顺序：

1. 先把入口页、版权页、贡献说明补稳。
2. 再把 TODO、contributors、app metadata 之类的生成逻辑改成独立 prebuild。
3. 然后再做双平台构建对照，检查导航、组件和工具页行为是否一致。
4. 最后才决定是否切换默认文档框架。

## 建议的 PR 划分

1. `copyrights + contributing`
2. `get-started` 年度清理或重写
3. `introduction` 重写
4. 英文入口页补完
5. `app` 文档和 Issue #23 方案说明
6. `infra / life / learn` 的占位页补完批次
