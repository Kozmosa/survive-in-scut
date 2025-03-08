import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'
import { searchPlugin } from '@vuepress/plugin-search'
import { readingTimePlugin } from '@vuepress/plugin-reading-time'

export default defineUserConfig({
  lang: 'zh-CN',

  title: '华工生存手册',
  description: '你不为我而来，但我为你而写',

  base: '/survive-in-scut/',

  head: [
    ['link', { rel: 'icon', href: '/survive-in-scut/root-assets/logo/scut-cat-1.ico' }],
    ['link', { rel: 'stylesheet', href: '/survive-in-scut/styles/global.css' }],
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

              // 一个外部链接
              {
                text: 'Example',
                link: 'https://example.com',
              },
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
              // 一个外部链接
              {
                text: '夏令时',
                link: 'https://example.com',
              },
            ],
          },
          {
            text: '吃饭',
            prefix: 'eat/',
            // 项目内链接的 .md 或 .html 后缀是可以省略的
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
            text: '娱乐',
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
            ],
          },
          {
            text: '课外',
            prefix: 'extra/',
            // 项目内链接的 .md 或 .html 后缀是可以省略的
            children: [
              'srp',
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
            // 项目内链接的 .md 或 .html 后缀是可以省略的
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
    ],

    contributors: true,
    repo: 'Kozmosa/survive-in-scut',
    editLink: true,
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
      title: '华工生存手册',
      description: '你不为我而来，但我为你而写',
    },
    '/en/': {
      lang: 'en-US',
      title: 'SCUT Survival Manual',
      description: 'You did not come for me, but I wrote for you',
    },
  },

  bundler: viteBundler(),
})
