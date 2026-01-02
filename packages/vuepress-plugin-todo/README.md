# VuePress TODO 收集器插件

一个用于扫描VuePress项目中的TODO注释并生成汇总页面的插件。

## 功能

- 扫描项目中的所有Markdown和Vue文件
- 收集文件中的TODO注释
- 生成汇总页面，列出所有TODO项
- 按文件组织TODO项，提供源文件链接

## 安装

```bash
npm install vuepress-plugin-todo-collector
```

## 使用方法

在VuePress配置文件中添加插件：

```js
import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import todoCollector from 'vuepress-plugin-todo-collector'

export default defineUserConfig({
  plugins: [
    todoCollector({
      // 配置选项
      outputDir: '.vuepress/public',
      outputFile: 'todo.md',
      todoKeywords: ['TODO', 'FIXME'],
      fileExtensions: ['.md', '.vue'],
      excludeDirs: ['node_modules', '.git', 'dist'],
      addToNavbar: true
    }),
  ],
  
  theme: defaultTheme({
    navbar: [
      // 其他导航项...
      {
        text: 'TODO 列表',
        link: '/todo.html',
      },
    ],
  }),
})
```

## 配置选项

| 选项 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `outputDir` | `string` | `.vuepress/public` | 输出目录路径 |
| `outputFile` | `string` | `todo.md` | 输出文件名 |
| `todoKeywords` | `string[]` | `['TODO']` | 要搜索的TODO关键词 |
| `fileExtensions` | `string[]` | `['.md', '.vue']` | 要扫描的文件扩展名 |
| `excludeDirs` | `string[]` | `['node_modules', '.git', 'dist']` | 要排除的目录 |
| `addToNavbar` | `boolean` | `true` | 是否自动添加导航栏项 |

## 注意事项

- 插件仅在构建时运行，添加新的TODO后需要重新构建
- 导航栏项需要手动在主题配置中添加
