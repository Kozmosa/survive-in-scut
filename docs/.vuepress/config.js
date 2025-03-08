import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress/cli'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  lang: 'zh-CN',

  title: '华工生存手册',
  description: '你不为我而来，但我为你而写',

  theme: defaultTheme({
    logo: '/root-assets/scut-logo.png',

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
              'foo.md', // 解析为 `/guide/group/sub1/bar.md`
              'bar.md', // 解析为 `/guide/group/sub1/bar.md`

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
              'foo', // 解析为 `/guide/group/sub2/foo.md`
              'bar', // 解析为 `/guide/group/sub2/bar.md`

              '/baz/', // 解析为 `/baz/README.md`
            ],
          },
          {
            text: '国际',
            prefix: 'gzic/',
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
        text: '生活',
        prefix: '/life/',
        children: [
          {
            text: 'SubGroup1',
            prefix: 'sub1/',
            children: [
              'foo.md', // 解析为 `/guide/group/sub1/bar.md`
              'bar.md', // 解析为 `/guide/group/sub1/bar.md`

              // 一个外部链接
              {
                text: 'Example',
                link: 'https://example.com',
              },
            ],
          },
          {
            text: 'SubGroup2',
            prefix: 'sub2/',
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
        text: '学习',
        prefix: '/learn/',
        children: [
          {
            text: '课内',
            prefix: 'curricular/',
            children: [
              'foo.md', // 解析为 `/guide/group/sub1/bar.md`
              'bar.md', // 解析为 `/guide/group/sub1/bar.md`

              // 一个外部链接
              {
                text: 'Example',
                link: 'https://example.com',
              },
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
    ],
  }),

  bundler: viteBundler(),
})
