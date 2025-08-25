// import { defaultTheme } from '@vuepress/theme-default'
// import { defineUserConfig } from 'vuepress/cli'
// import { viteBundler } from '@vuepress/bundler-vite'
// import { searchPlugin } from '@vuepress/plugin-search'
// import { readingTimePlugin } from '@vuepress/plugin-reading-time'

// 导入 VuePress 核心配置
import { defineUserConfig } from 'vuepress'; // 从 vuepress 直接导入，无需指定 cli

// 导入主题
import { defaultTheme } from '@vuepress/theme-default'; // 导入主题模块的默认导出
// 导入 Vite 打包器
import { viteBundler } from '@vuepress/bundler-vite'; // 保持不变（若使用默认打包器可省略）

// 导入插件
import { searchPlugin } from '@vuepress/plugin-search'; // 直接导入默认导出（searchPlugin 是默认导出）
import { readingTimePlugin } from '@vuepress/plugin-reading-time'
import { commentPlugin } from '@vuepress/plugin-comment'
import { languageMarkdown } from '@vuepress/plugin-prismjs';
import pdfviewer from './plugins/pdfviewer'
import todoCollector from 'vuepress-plugin-todo-collector'

export default defineUserConfig({
  lang: 'zh-CN',

  title: '华南理工生存手册',
  description: '你不为我而来，但我为你而写',

  base: '/',

  head: [
    ['link', { rel: 'icon', href: '/root-assets/logo/scut-cat-1.ico' }],
    ['link', { rel: 'stylesheet', href: '/styles/global.css' }],
  ],

  plugins: [
    // plugins configs
    searchPlugin({
      locales: {
        '/': {
          placeholder: '搜索',
        },
        '/en/': {
          placeholder: 'Search',
        },
      },
    }),
    readingTimePlugin(),
    commentPlugin({
      provider: 'Waline'
    }),
    pdfviewer,
    todoCollector({
      // 配置选项
      outputDir: 'others',
      outputFile: 'todo.md',
      todoKeywords: ['TODO', 'FIXME'],
      fileExtensions: ['.md', '.vue'],
      excludeDirs: ['node_modules', '.git', 'dist', 'others', '.temp'],
      addToNavbar: false
    }),
  ],

  theme: defaultTheme({
    // logo: '/root-assets/scut-logo.png',
    logo: '/root-assets/logo/scut-cat-1.jpg',

    navbar: [
      '/get-started',
      
      {
        text: '设施',
        prefix: '/infra/',
        children: [
          {
            text: '概览',
            link: 'index.md',
          },
          {
            text: '大学城',
            prefix: 'hemc/',
            children: [
              'map',
              'suishi',
              'nearby',
            ],
          },
          {
            text: '五山',
            prefix: 'wushan/',
            children: [
              'map',
              'nearby',
            ],
          },
          {
            text: '国际',
            prefix: 'gzic/',
            // 项目内链接的 .md 或 .html 后缀是可以省略的
            children: [
              'map',
              'nearby',
            ],
          },
        ],
      },

      {
        text: '生活',
        prefix: '/life/',
        children: [
          {
            text: '时间',
            prefix: 'time/',
            children: [
              'hemc_gzic',
              'wushan',
            ],
          },
          {
            text: '吃饭',
            prefix: 'eat/',
            children: [
              'hemc',
              'wushan',
              'gzic',
            ],
          },
          {
            text: '娱乐',
            prefix: 'entertainment/',
            children: [
              'hemc_gzic',
              'wushan',
            ],
          },
        ],
      },

      {
        text: '学习',
        prefix: '/learn/',
        children: [
          {
            text: '课内',
            prefix: 'curricular/',
            children: [
              'majors',
              'exam',
              'gpa',
              'transfer_major'
            ],
          },
          {
            text: '课外',
            prefix: 'extra/',
            children: [
              'srp',
              'contest',
              'innovation_humanities_scores'
            ],
          },
        ],
      },

      {
        text: '飞跃',
        prefix: '/beyond/',
        children: [
          {
            text: '境内',
            prefix: 'mainland/',
            children: [
              'recommend_graduate',
              'unified_admission',
              'phd',
            ],
          },
          {
            text: '境外',
            prefix: 'abroad/',
            children: [
              'master',
              'phd',
            ],
          },
        ],
      },

      {
        text: '立命',
        prefix: '/health/',
        children: [
          'alive_first'
        ],
      },

      {
        text: '其他',
        prefix: '/others/',
        children: [
          'contributing',
          'todo'
        ]
      }
    ],

    contributors: true,
    repo: 'Kozmosa/survive-in-scut',
    editLink: true,
    docsDir: 'docs',
    search: true,
    searchMaxSuggestions: 10,
    

    locales: {
      '/': {
        selectLanguageText: '选择语言',
        selectLanguageAriaLabel: '选择语言',
        selectLanguageName: '简体中文',
        editLinkText: '编辑此页',
        lastUpdatedText: '最后更新',
        contributorsText: '贡献者',
        contributorsTitle: '贡献者',
        contributorsAriaLabel: '所有贡献者',
        searchAriaLabel: '搜索本手册',
      },
      '/en/': {
        selectLanguageText: 'Languages',
        selectLanguageAriaLabel: 'Select language',
        selectLanguageName: 'English',
        editLinkText: 'Edit this page',
        lastUpdatedText: 'Last updated',
        contributorsText: 'Contributors',
        contributorsTitle: 'Contributors',
        contributorsAriaLabel: 'All contributors',
        searchAriaLabel: 'Search this site',

        navbar: [
          {
            text: 'I Got SCUT',
            link: '/en/get-started',
            
          },

          {
            text: 'Facilities',
            prefix: '/infra/',
            children: [
              {
                text: 'Overview',
                link: 'index.md',
              },
              {
                text: 'HEMC',
                prefix: 'hemc/',
                children: [
                  'map',
                  'suishi',
                  'nearby',
    
                  // 一个外部链接
                  {
                    text: 'Example',
                    link: 'https://example.com',
                  },
                ],
              },
              {
                text: 'Wushan',
                prefix: 'wushan/',
                children: [
                  'map',
                  'nearby',
                ],
              },
              {
                text: 'GZIC',
                prefix: 'gzic/',
                // 项目内链接的 .md 或 .html 后缀是可以省略的
                children: [
                  'map',
                  'nearby',
                ],
              },
            ],
          },
    
          {
            text: 'Life',
            prefix: '/life/',
            children: [
              {
                text: 'Timetable',
                prefix: 'time/',
                children: [
                  'hemc_gzic',
                  'wushan',
                ],
              },
              {
                text: 'Eat',
                prefix: 'eat/',
                children: [
                  'hemc',
                  'wushan',
                  'gzic',
                  {
                    text: '鳕鱼美食指南',
                    link: 'https://example.com',
                  },
                ],
              },
              {
                text: 'Entertainment',
                prefix: 'entertainment/',
                // 项目内链接的 .md 或 .html 后缀是可以省略的
                children: [
                  'hemc_gzic',
                  'wushan',
                ],
              },
            ],
          },
    
          {
            text: 'Learn',
            prefix: '/learn/',
            children: [
              {
                text: 'Curricular',
                prefix: 'curricular/',
                children: [
                  'majors',
                  'exam',
                  'gpa',
                ],
              },
              {
                text: 'Extra',
                prefix: 'extra/',
                // 项目内链接的 .md 或 .html 后缀是可以省略的
                children: [
                  'srp',
                  'contest'
                ],
              },
            ],
          },
    
          {
            text: 'Go Beyond',
            prefix: '/beyond/',
            children: [
              {
                text: 'Mainland',
                prefix: 'mainland/',
                children: [
                  'recommend_graduate',
                  'unified_admission',
                  'phd',
                ],
              },
              {
                text: 'Abroad',
                prefix: 'abroad/',
                // 项目内链接的 .md 或 .html 后缀是可以省略的
                children: [
                  'master',
                  'phd',
                ],
              },
            ],
          },
    
          {
            text: 'Health',
            prefix: '/health/',
            children: [
              'alive_first'
            ],
          },
        ],
      },
    },
  }),

  locales: {
    '/': {
      lang: 'zh-CN',
      title: '华南理工生存手册',
      description: '你不为我而来，但我为你而写',
    },
    '/en/': {
      lang: 'en-US',
      title: 'Survive in SCUT',
      description: 'You did not come for me, but I wrote for you',
    },
  },

  bundler: viteBundler(),
  vite: {
    resolve: {
      alias: {
        '@vueuse/core': '@vueuse/core', // 确保正确解析
      },
      dedupe: [
        // 确保所有 CodeMirror 依赖使用相同实例
        '@codemirror/state',
        '@codemirror/view',
        '@codemirror/basic-setup',
        '@codemirror/lang-markdown'
      ]
    }
  }
})
