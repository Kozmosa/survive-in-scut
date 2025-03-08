import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  lang: 'zh-CN',

  title: '华工生存手册',
  description: '你不为我而来，但我为你而写',

  base: '/survive-in-scut/',

  head: [
    ['link', { rel: 'icon', href: '/survive-in-scut/root-assets/logo/scut-cat-1.ico' }],
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
              'gpa',
              'exam',
            ],
          },
          {
            text: '课外',
            prefix: 'extra/',
            // 项目内链接的 .md 或 .html 后缀是可以省略的
            children: [
              'foo', // 解析为 `/guide/group/sub2/foo.md`
              'bar', // 解析为 `/guide/group/sub2/bar.md`

              // 不在 SubGroup2 内的链接
              '/baz/', // 解析为 `/baz/README.md`
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
    ],

    locales: {
      contributors: true,
    }
  }),

  bundler: viteBundler(),
})
