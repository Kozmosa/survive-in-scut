import fs from 'fs'
import path from 'path'
import type { Plugin } from 'vite'

type TodoOptions = {
  outputDir?: string
  outputFile?: string
  todoKeywords?: string[]
  fileExtensions?: string[]
  excludeDirs?: string[]
}

const DEFAULTS: Required<TodoOptions> = {
  outputDir: 'others',
  outputFile: 'todo.md',
  todoKeywords: ['TODO'],
  fileExtensions: ['.md', '.vue'],
  excludeDirs: ['node_modules', '.git', 'dist', '.vitepress/dist', 'others', '.temp'],
}

export default function todoCollector(options: TodoOptions = {}): Plugin {
  const cfg = { ...DEFAULTS, ...options }

  const generate = (rootDir: string) => {
    const formatToUtc8 = (date: Date) =>
      new Intl.DateTimeFormat('sv-SE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Asia/Shanghai',
      }).format(date)

    const sourceDir = rootDir
    const outputDirPath = path.resolve(sourceDir, cfg.outputDir)
    if (!fs.existsSync(outputDirPath)) {
      fs.mkdirSync(outputDirPath, { recursive: true })
    }

    const outputPath = path.resolve(outputDirPath, cfg.outputFile)
    const todoList: { file: string; line: number; text: string }[] = []

    const scanDir = (dir: string) => {
      const entries = fs.readdirSync(dir)
      entries.forEach((entry) => {
        const fullPath = path.join(dir, entry)
        const relPath = path.relative(sourceDir, fullPath)

        if (cfg.excludeDirs.some((excluded) => relPath.split(path.sep).includes(excluded))) {
          return
        }

        const stat = fs.statSync(fullPath)
        if (stat.isDirectory()) {
          scanDir(fullPath)
          return
        }

        if (!cfg.fileExtensions.some((ext) => fullPath.endsWith(ext))) {
          return
        }

        const content = fs.readFileSync(fullPath, 'utf-8')
        content.split('\n').forEach((line, index) => {
          for (const keyword of cfg.todoKeywords) {
            if (line.includes(`${keyword}:`) || line.includes(`${keyword} `)) {
              todoList.push({
                file: relPath.replace(/\\/g, '/'),
                line: index + 1,
                text: line.trim(),
              })
              break
            }
          }
        })
      })
    }

    scanDir(sourceDir)

    const todosByFile: Record<string, typeof todoList> = {}
    todoList.forEach((item) => {
      if (!todosByFile[item.file]) todosByFile[item.file] = []
      todosByFile[item.file].push(item)
    })

    const lines: string[] = [
      '---',
      'title: TODO 汇总',
      'outline: [2,3]',
      '---',
      '',
      '# TODO 汇总',
      '',
      `> 最后更新时间: ${formatToUtc8(new Date())} (UTC+8)`,
      '',
      `共找到 ${todoList.length} 个 TODO 项`,
      '',
    ]

    Object.entries(todosByFile).forEach(([file, items]) => {
      lines.push(`## ${file}`)
      lines.push('')
      items.forEach((item) => {
        lines.push(`- **第 ${item.line} 行**: ${item.text}`)
        lines.push(`  - [查看源文件](/${item.file})`)
      })
      lines.push('')
    })

    fs.writeFileSync(outputPath, lines.join('\n'), 'utf-8')
    return outputPath
  }

  return {
    name: 'vitepress-todo-collector',
    enforce: 'pre',
    buildStart() {
      const rootDir = path.resolve(__dirname, '..')
      generate(rootDir)
    },
    configureServer(server) {
      const rootDir = server.config.root || path.resolve(__dirname, '..')
      const outputPath = generate(rootDir)
      server.watcher.add(outputPath)
    },
  }
}
