import { defineConfig } from "vitepress";
import taskLists from "markdown-it-task-lists";
import llmstxt from "vitepress-plugin-llms";
import contributorsCollector from "./plugins/contributorsCollector";
import todoCollector from "./plugins/todoCollector";
import { sidebarZh, sidebarEn } from "./sidebar";

const REPOSITORY = "https://github.com/Kozmosa/survive-in-scut";

const navZh = [
  { text: "启程", link: "/get-started" },
  { text: "简介", link: "/introduction" },
  {
    text: "设施",
    items: [
      { text: "概览", link: "/infra/index" },
      {
        text: "大学城",
        items: [
          { text: "地图", link: "/infra/hemc/map" },
          { text: "穗石", link: "/infra/hemc/suishi" },
          { text: "周边", link: "/infra/hemc/nearby" },
        ],
      },
      {
        text: "五山",
        items: [
          { text: "地图", link: "/infra/wushan/map" },
          { text: "周边", link: "/infra/wushan/nearby" },
        ],
      },
      {
        text: "国际",
        items: [
          { text: "地图", link: "/infra/gzic/map" },
          { text: "周边", link: "/infra/gzic/nearby" },
        ],
      },
    ],
  },
  {
    text: "生活",
    items: [
      { text: "概览", link: "/life/index" },
      {
        text: "时间",
        items: [
          { text: "大学城/国际", link: "/life/time/hemc_gzic" },
          { text: "五山", link: "/life/time/wushan" },
          { text: "校巴", link: "/life/time/bus" },
        ],
      },
      {
        text: "吃饭",
        items: [
          { text: "大学城", link: "/life/eat/hemc" },
          { text: "五山", link: "/life/eat/wushan" },
          { text: "国际", link: "/life/eat/gzic" },
        ],
      },
      {
        text: "娱乐",
        items: [
          { text: "大学城/国际", link: "/life/entertainment/hemc_gzic" },
          { text: "五山", link: "/life/entertainment/wushan" },
        ],
      },
    ],
  },
  {
    text: "学习",
    items: [
      { text: "概览", link: "/learn/index" },
      {
        text: "课内",
        items: [
          { text: "课程性质", link: "/learn/curricular/lessons" },
          {
            text: "公共基础课",
            link: "/learn/curricular/common_basic_lessons",
          },
          { text: "专业", link: "/learn/curricular/majors" },
          { text: "考试", link: "/learn/curricular/exam" },
          { text: "绩点", link: "/learn/curricular/gpa" },
          { text: "转专业", link: "/learn/curricular/transfer_major" },
        ],
      },
      {
        text: "课外",
        items: [
          { text: "SRP", link: "/learn/extra/srp" },
          { text: "竞赛", link: "/learn/extra/contest" },
          {
            text: "科创/人文分",
            link: "/learn/extra/innovation_humanities_scores",
          },
        ],
      },
    ],
  },
  {
    text: "飞跃",
    items: [
      { text: "概览", link: "/beyond/index" },
      {
        text: "境内",
        items: [
          { text: "保研", link: "/beyond/mainland/recommend_graduate" },
          { text: "考研", link: "/beyond/mainland/unified_admission" },
          { text: "博士", link: "/beyond/mainland/phd" },
        ],
      },
      {
        text: "境外",
        items: [
          { text: "硕士", link: "/beyond/abroad/master" },
          { text: "博士", link: "/beyond/abroad/phd" },
        ],
      },
    ],
  },
  {
    text: "立命",
    items: [
      { text: "概览", link: "/health/index" },
      { text: "先活下去再说", link: "/health/alive_first" },
      { text: "立志篇", link: "/health/freshman_guidance" },
      { text: "就医指南", link: "/health/medical_care" },
    ],
  },
  {
    text: "其他",
    items: [
      { text: "概览", link: "/others/index" },
      { text: "贡献指南", link: "/others/contributing" },
      { text: "维护路线图", link: "/others/roadmap" },
      { text: "TODO 列表", link: "/others/todo" },
      { text: "App", link: "/others/app" },
      { text: "品牌素材", link: "/others/branding" },
      { text: "提问的智慧", link: "/others/ask-the-smart-way" },
      { text: "版权声明", link: "/copyrights" },
    ],
  },
];

const navEn = [
  { text: "Start", link: "/en/get-started" },
  { text: "Introduction", link: "/en/introduction" },
  {
    text: "Facilities",
    items: [
      { text: "Overview", link: "/en/infra/index" },
      {
        text: "HEMC",
        items: [
          { text: "Map", link: "/en/infra/hemc/map" },
          { text: "Suishi", link: "/en/infra/hemc/suishi" },
          { text: "Nearby", link: "/en/infra/hemc/nearby" },
        ],
      },
      {
        text: "Wushan",
        items: [
          { text: "Map", link: "/en/infra/wushan/map" },
          { text: "Nearby", link: "/en/infra/wushan/nearby" },
        ],
      },
      {
        text: "GZIC",
        items: [
          { text: "Map", link: "/en/infra/gzic/map" },
          { text: "Nearby", link: "/en/infra/gzic/nearby" },
        ],
      },
    ],
  },
  {
    text: "Life",
    items: [
      { text: "Overview", link: "/en/life/index" },
      {
        text: "Timetable",
        items: [
          { text: "HEMC/GZIC", link: "/en/life/time/hemc_gzic" },
          { text: "Wushan", link: "/en/life/time/wushan" },
          { text: "Campus Bus", link: "/en/life/time/bus" },
        ],
      },
      {
        text: "Eat",
        items: [
          { text: "HEMC", link: "/en/life/eat/hemc" },
          { text: "Wushan", link: "/en/life/eat/wushan" },
          { text: "GZIC", link: "/en/life/eat/gzic" },
        ],
      },
      {
        text: "Entertainment",
        items: [
          { text: "HEMC/GZIC", link: "/en/life/entertainment/hemc_gzic" },
          { text: "Wushan", link: "/en/life/entertainment/wushan" },
        ],
      },
    ],
  },
  {
    text: "Learn",
    items: [
      { text: "Overview", link: "/en/learn/index" },
      {
        text: "Curricular",
        items: [
          { text: "Course Types", link: "/en/learn/curricular/lessons" },
          {
            text: "Common Basic Courses",
            link: "/en/learn/curricular/common_basic_lessons",
          },
          { text: "Majors", link: "/en/learn/curricular/majors" },
          { text: "Exam", link: "/en/learn/curricular/exam" },
          { text: "GPA", link: "/en/learn/curricular/gpa" },
          {
            text: "Transfer Major",
            link: "/en/learn/curricular/transfer_major",
          },
        ],
      },
      {
        text: "Extra",
        items: [
          { text: "SRP", link: "/en/learn/extra/srp" },
          { text: "Contests", link: "/en/learn/extra/contest" },
          {
            text: "Innovation/Humanities Credits",
            link: "/en/learn/extra/innovation_humanities_scores",
          },
        ],
      },
    ],
  },
  {
    text: "Go Beyond",
    items: [
      { text: "Overview", link: "/en/beyond/index" },
      {
        text: "Mainland",
        items: [
          {
            text: "Recommended Admission",
            link: "/en/beyond/mainland/recommend_graduate",
          },
          {
            text: "Graduate Entrance Exam",
            link: "/en/beyond/mainland/unified_admission",
          },
          { text: "PhD", link: "/en/beyond/mainland/phd" },
        ],
      },
      {
        text: "Abroad",
        items: [
          { text: "Master", link: "/en/beyond/abroad/master" },
          { text: "PhD", link: "/en/beyond/abroad/phd" },
        ],
      },
    ],
  },
  {
    text: "Health",
    items: [
      { text: "Overview", link: "/en/health/index" },
      { text: "Stay Alive First", link: "/en/health/alive_first" },
      { text: "Freshman Guidance", link: "/en/health/freshman_guidance" },
      { text: "Medical Care", link: "/en/health/medical_care" },
    ],
  },
  {
    text: "Other",
    items: [
      { text: "Overview", link: "/en/others/index" },
      { text: "Contributing", link: "/en/others/contributing" },
      { text: "Roadmap", link: "/en/others/roadmap" },
      { text: "TODO List", link: "/en/others/todo" },
      { text: "App", link: "/en/others/app" },
      { text: "Brand Assets", link: "/en/others/branding" },
      { text: "How to Ask Questions", link: "/en/others/ask-the-smart-way" },
      { text: "Copyrights", link: "/en/copyrights" },
    ],
  },
];

export default defineConfig({
  title: "华南理工生存手册",
  description: "你不为我而来，但我为你而写",
  lang: "zh-CN",
  base: "/",
  cleanUrls: true,
  lastUpdated: true,
  rewrites: {
    "README.md": "index.md",
    "en/README.md": "en/index.md",
  },
  head: [
    ["link", { rel: "icon", href: "/root-assets/logo/scut-cat-1.ico" }],
    ["link", { rel: "stylesheet", href: "/styles/global.css" }],
  ],
  locales: {
    root: {
      label: "简体中文",
      lang: "zh-CN",
      link: "/",
      title: "华南理工生存手册",
      description: "你不为我而来，但我为你而写",
      themeConfig: {
        nav: navZh,
        outline: {
          level: [2, 3],
          label: "大纲",
        },
        lastUpdatedText: "最后更新",
        docFooter: { prev: "上一页", next: "下一页" },
        editLink: {
          pattern: `${REPOSITORY}/edit/main/docs/:path`,
          text: "编辑此页",
        },
        darkModeSwitchLabel: "切换外观",
        darkModeSwitchTitle: "切换到深色模式",
        lightModeSwitchTitle: "切换到浅色模式",
        sidebarMenuLabel: "菜单",
        returnToTopLabel: "返回顶部",
        langMenuLabel: "切换语言",
        skipToContentLabel: "跳到正文",
        notFound: {
          title: "页面未找到",
          quote: "你访问的页面不存在，或尚未提供当前语言版本。",
          link: "/",
          linkLabel: "返回中文首页",
          linkText: "返回首页",
        },
      },
    },
    en: {
      label: "English",
      lang: "en-US",
      link: "/en/",
      title: "Survive in SCUT",
      description: "You did not come for me, but I wrote for you",
      themeConfig: {
        nav: navEn,
        outline: {
          level: [2, 3],
          label: "Outline",
        },
        lastUpdatedText: "Last updated",
        docFooter: { prev: "Previous", next: "Next" },
        editLink: {
          pattern: `${REPOSITORY}/edit/main/docs/:path`,
          text: "Edit this page",
        },
        darkModeSwitchLabel: "Appearance",
        darkModeSwitchTitle: "Switch to dark theme",
        lightModeSwitchTitle: "Switch to light theme",
        sidebarMenuLabel: "Menu",
        returnToTopLabel: "Return to top",
        langMenuLabel: "Change language",
        skipToContentLabel: "Skip to content",
        notFound: {
          title: "PAGE NOT FOUND",
          quote:
            "The page does not exist or is not available in this language yet.",
          link: "/en/",
          linkLabel: "Go to the English home page",
          linkText: "Take me home",
        },
      },
    },
  },
  markdown: {
    math: true,
    config: (md) => {
      md.use(taskLists);
    },
  },
  themeConfig: {
    logo: "/root-assets/logo/scut-cat-1.jpg",
    sidebar: { ...sidebarZh, ...sidebarEn },
    search: {
      provider: "local",
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: "搜索",
                buttonAriaLabel: "搜索文档",
              },
              modal: {
                displayDetails: "显示详细列表",
                resetButtonTitle: "清除搜索",
                backButtonTitle: "关闭搜索",
                noResultsText: "未找到相关结果",
                footer: {
                  selectText: "选择",
                  selectKeyAriaLabel: "回车键",
                  navigateText: "切换",
                  navigateUpKeyAriaLabel: "向上箭头",
                  navigateDownKeyAriaLabel: "向下箭头",
                  closeText: "关闭",
                  closeKeyAriaLabel: "Esc 键",
                },
              },
            },
          },
          en: {
            translations: {
              button: {
                buttonText: "Search",
                buttonAriaLabel: "Search documentation",
              },
              modal: {
                displayDetails: "Display detailed list",
                resetButtonTitle: "Reset search",
                backButtonTitle: "Close search",
                noResultsText: "No results found",
                footer: {
                  selectText: "to select",
                  selectKeyAriaLabel: "enter",
                  navigateText: "to navigate",
                  navigateUpKeyAriaLabel: "up arrow",
                  navigateDownKeyAriaLabel: "down arrow",
                  closeText: "to close",
                  closeKeyAriaLabel: "escape",
                },
              },
            },
          },
        },
      },
    },
    socialLinks: [{ icon: "github", link: REPOSITORY }],
    footer: {
      message: "CC0 1.0 Licensed",
      copyright: "Copyright © 2025-present Kozumi & 转群",
    },
  },
  vite: {
    plugins: [
      todoCollector({
        outputDir: "others",
        outputFile: "todo.md",
        todoKeywords: ["TODO", "FIXME"],
        fileExtensions: [".md", ".vue"],
        excludeDirs: [
          "node_modules",
          ".git",
          "dist",
          ".vitepress",
          ".temp",
          "en", // English pages currently mirror the canonical Chinese content.
        ],
      }),
      contributorsCollector(),
      llmstxt({
        ignoreFiles: ["others/todo.md", "en/others/todo.md"],
        excludeUnnecessaryFiles: true,
        excludeIndexPage: true,
        excludeBlog: true,
        excludeTeam: true,
      }),
    ],
    optimizeDeps: {
      include: ["pdfjs-dist"],
    },
    ssr: {
      external: ["pdfjs-dist"],
    },
  },
  ignoreDeadLinks: false,
});
