import { defineConfig } from 'vitepress'
import todoCollector from './plugins/todoCollector'

const navZh = [
  { text: '启程', link: '/get-started' },
  {
    text: '设施',
    items: [
      { text: '概览', link: '/infra/index' },
      {
        text: '大学城',
        items: [
          { text: '地图', link: '/infra/hemc/map' },
          { text: '穗石', link: '/infra/hemc/suishi' },
          { text: '周边', link: '/infra/hemc/nearby' },
        ],
      },
      {
        text: '五山',
        items: [
          { text: '地图', link: '/infra/wushan/map' },
          { text: '周边', link: '/infra/wushan/nearby' },
        ],
      },
      {
        text: '国际',
        items: [
          { text: '地图', link: '/infra/gzic/map' },
          { text: '周边', link: '/infra/gzic/nearby' },
        ],
      },
    ],
  },
  {
    text: '生活',
    items: [
      {
        text: '时间',
        items: [
          { text: '大学城', link: '/life/time/hemc_gzic' },
          { text: '五山', link: '/life/time/wushan' },
        ],
      },
      {
        text: '吃饭',
        items: [
          { text: '大学城', link: '/life/eat/hemc' },
          { text: '五山', link: '/life/eat/wushan' },
          { text: '国际', link: '/life/eat/gzic' },
        ],
      },
      {
        text: '娱乐',
        items: [
          { text: '大学城/国际', link: '/life/entertainment/hemc_gzic' },
          { text: '五山', link: '/life/entertainment/wushan' },
        ],
      },
    ],
  },
  {
    text: '学习',
    items: [
      {
        text: '课内',
        items: [
          { text: '专业', link: '/learn/curricular/majors' },
          { text: '考试', link: '/learn/curricular/exam' },
          { text: '绩点', link: '/learn/curricular/gpa' },
          { text: '转专业', link: '/learn/curricular/transfer_major' },
        ],
      },
      {
        text: '课外',
        items: [
          { text: 'SRP', link: '/learn/extra/srp' },
          { text: '竞赛', link: '/learn/extra/contest' },
          { text: '科创/人文分', link: '/learn/extra/innovation_humanities_scores' },
        ],
      },
    ],
  },
  {
    text: '飞跃',
    items: [
      {
        text: '境内',
        items: [
          { text: '保研', link: '/beyond/mainland/recommend_graduate' },
          { text: '考研', link: '/beyond/mainland/unified_admission' },
          { text: '博士', link: '/beyond/mainland/phd' },
        ],
      },
      {
        text: '境外',
        items: [
          { text: '硕士', link: '/beyond/abroad/master' },
          { text: '博士', link: '/beyond/abroad/phd' },
        ],
      },
    ],
  },
  {
    text: '立命',
    items: [
      { text: '先活下去再说', link: '/health/alive_first' },
      { text: '就医指南', link: '/health/medical_care' },
    ],
  },
  {
    text: '其他',
    items: [
      { text: '贡献指南', link: '/others/contributing' },
      { text: 'TODO 列表', link: '/others/todo' },
    ],
  },
]

const navEn = [
  { text: 'I Got SCUT', link: '/en/get-started' },
  {
    text: 'Facilities',
    items: [
      { text: 'Overview', link: '/en/infra/index' },
      {
        text: 'HEMC',
        items: [
          { text: 'Map', link: '/en/infra/hemc/map' },
          { text: 'Suishi', link: '/en/infra/hemc/suishi' },
          { text: 'Nearby', link: '/en/infra/hemc/nearby' },
        ],
      },
      {
        text: 'Wushan',
        items: [
          { text: 'Map', link: '/en/infra/wushan/map' },
          { text: 'Nearby', link: '/en/infra/wushan/nearby' },
        ],
      },
      {
        text: 'GZIC',
        items: [
          { text: 'Map', link: '/en/infra/gzic/map' },
          { text: 'Nearby', link: '/en/infra/gzic/nearby' },
        ],
      },
    ],
  },
  {
    text: 'Life',
    items: [
      {
        text: 'Timetable',
        items: [
          { text: 'HEMC/GZIC', link: '/en/life/time/hemc_gzic' },
          { text: 'Wushan', link: '/en/life/time/wushan' },
        ],
      },
      {
        text: 'Eat',
        items: [
          { text: 'HEMC', link: '/en/life/eat/hemc' },
          { text: 'Wushan', link: '/en/life/eat/wushan' },
          { text: 'GZIC', link: '/en/life/eat/gzic' },
        ],
      },
      {
        text: 'Entertainment',
        items: [
          { text: 'HEMC/GZIC', link: '/en/life/entertainment/hemc_gzic' },
          { text: 'Wushan', link: '/en/life/entertainment/wushan' },
        ],
      },
    ],
  },
  {
    text: 'Learn',
    items: [
      {
        text: 'Curricular',
        items: [
          { text: 'Majors', link: '/en/learn/curricular/majors' },
          { text: 'Exam', link: '/en/learn/curricular/exam' },
          { text: 'GPA', link: '/en/learn/curricular/gpa' },
          { text: 'Transfer Major', link: '/en/learn/curricular/transfer_major' },
        ],
      },
      {
        text: 'Extra',
        items: [
          { text: 'SRP', link: '/en/learn/extra/srp' },
          { text: 'Contests', link: '/en/learn/extra/contest' },
          { text: 'Innovation/Humanities', link: '/en/learn/extra/innovation_humanities_scores' },
        ],
      },
    ],
  },
  {
    text: 'Go Beyond',
    items: [
      {
        text: 'Mainland',
        items: [
          { text: 'Recommend', link: '/en/beyond/mainland/recommend_graduate' },
          { text: 'Unified Admission', link: '/en/beyond/mainland/unified_admission' },
          { text: 'PhD', link: '/en/beyond/mainland/phd' },
        ],
      },
      {
        text: 'Abroad',
        items: [
          { text: 'Master', link: '/en/beyond/abroad/master' },
          { text: 'PhD', link: '/en/beyond/abroad/phd' },
        ],
      },
    ],
  },
  {
    text: 'Health',
    items: [
      { text: 'First Aid', link: '/en/health/alive_first' },
      { text: 'Medical Care', link: '/en/health/medical_care' },
    ],
  },
  {
    text: 'Others',
    items: [
      { text: 'Copyrights', link: '/en/copyrights' },
      { text: 'Introduction', link: '/en/introduction' },
    ],
  },
]

export default defineConfig({
  title: '华南理工生存手册',
  description: '你不为我而来，但我为你而写',
  lang: 'zh-CN',
  cleanUrls: true,
  lastUpdated: true,
  base: '/',
  head: [
    ['link', { rel: 'icon', href: '/root-assets/logo/scut-cat-1.ico' }],
  ],

  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/',
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
    },
  },

  themeConfig: {
    logo: '/root-assets/logo/scut-cat-1.jpg',
    search: {
      provider: 'local',
    },
    nav: navZh,
    outline: [2, 3],
    lastUpdatedText: '最后更新',
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    editLink: {
      pattern: 'https://github.com/Kozmosa/survive-in-scut/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Kozmosa/survive-in-scut' },
    ],
    footer: {
      message: 'CC-BY-SA 2.0 Licensed',
      copyright: 'Copyright © 2025-present Kozumi & 转群 & 卷群',
    },

    locales: {
      root: {
        label: '简体中文',
        nav: navZh,
      },
      en: {
        label: 'English',
        nav: navEn,
        editLink: {
          pattern: 'https://github.com/Kozmosa/survive-in-scut/edit/main/docs/:path',
          text: 'Edit this page on GitHub',
        },
        lastUpdatedText: 'Last updated',
        docFooter: {
          prev: 'Previous',
          next: 'Next',
        },
      },
    },
  },

  vite: {
    plugins: [
      todoCollector({
        outputDir: 'others',
        outputFile: 'todo.md',
        todoKeywords: ['TODO', 'FIXME'],
        fileExtensions: ['.md', '.vue'],
        excludeDirs: ['node_modules', '.git', 'dist', 'others', '.temp'],
      }),
    ],
    optimizeDeps: {
      include: ['pdfjs-dist'],
    },
  },

  ignoreDeadLinks: true,
})
