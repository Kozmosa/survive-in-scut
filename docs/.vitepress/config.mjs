import { defineConfig } from "vitepress";

const repo = "https://github.com/Kozmosa/survive-in-scut";

const zhNav = [
  { text: "启程", link: "/get-started" },
  { text: "简介", link: "/introduction" },
  {
    text: "设施",
    items: [
      { text: "概览", link: "/infra/" },
      { text: "大学城地图", link: "/infra/hemc/map" },
      { text: "五山地图", link: "/infra/wushan/map" },
      { text: "国际地图", link: "/infra/gzic/map" },
    ],
  },
  {
    text: "生活",
    items: [
      { text: "校巴时间", link: "/life/time/bus" },
      { text: "大学城觅食", link: "/life/eat/hemc" },
      { text: "五山觅食", link: "/life/eat/wushan" },
      { text: "娱乐", link: "/life/entertainment/hemc_gzic" },
    ],
  },
  {
    text: "学习",
    items: [
      { text: "课程性质介绍", link: "/learn/curricular/lessons" },
      { text: "公共基础课", link: "/learn/curricular/common_basic_lessons" },
      { text: "专业学习", link: "/learn/curricular/majors" },
      { text: "考试", link: "/learn/curricular/exam" },
      { text: "GPA", link: "/learn/curricular/gpa" },
      { text: "转专业", link: "/learn/curricular/transfer_major" },
      { text: "SRP", link: "/learn/extra/srp" },
      { text: "竞赛", link: "/learn/extra/contest" },
    ],
  },
  {
    text: "飞跃",
    items: [
      { text: "保研", link: "/beyond/mainland/recommend_graduate" },
      { text: "考研", link: "/beyond/mainland/unified_admission" },
      { text: "境外硕士", link: "/beyond/abroad/master" },
      { text: "境外博士", link: "/beyond/abroad/phd" },
    ],
  },
  {
    text: "立命",
    items: [
      { text: "先活下去", link: "/health/alive_first" },
      { text: "医疗须知", link: "/health/medical_care" },
      { text: "立志篇", link: "/health/freshman_guidance" },
    ],
  },
  {
    text: "其他",
    items: [
      { text: "参与贡献", link: "/others/contributing" },
      { text: "维护路线图", link: "/others/roadmap" },
      { text: "TODO 汇总", link: "/others/todo" },
      { text: "App", link: "/others/app" },
      { text: "品牌素材", link: "/others/branding" },
      { text: "提问的智慧", link: "/others/ask-the-smart-way" },
      { text: "版权声明", link: "/copyrights" },
    ],
  },
];

const enNav = [
  { text: "Start", link: "/en/get-started" },
  { text: "Introduction", link: "/en/introduction" },
  {
    text: "Facilities",
    items: [
      { text: "Overview", link: "/en/infra/" },
      { text: "HEMC Map", link: "/en/infra/hemc/map" },
      { text: "Wushan Map", link: "/en/infra/wushan/map" },
      { text: "GZIC Map", link: "/en/infra/gzic/map" },
    ],
  },
  {
    text: "Life",
    items: [
      { text: "Timetable", link: "/en/life/time/hemc_gzic" },
      { text: "Eat at HEMC", link: "/en/life/eat/hemc" },
      { text: "Eat at Wushan", link: "/en/life/eat/wushan" },
      { text: "Entertainment", link: "/en/life/entertainment/hemc_gzic" },
    ],
  },
  {
    text: "Learn",
    items: [
      { text: "Majors", link: "/en/learn/curricular/majors" },
      { text: "Exam", link: "/en/learn/curricular/exam" },
      { text: "GPA", link: "/en/learn/curricular/gpa" },
      { text: "Transfer Major", link: "/en/learn/curricular/transfer_major" },
      { text: "SRP", link: "/en/learn/extra/srp" },
    ],
  },
  {
    text: "Beyond",
    items: [
      {
        text: "Mainland Grad School",
        link: "/en/beyond/mainland/unified_admission",
      },
      {
        text: "Recommended Admission",
        link: "/en/beyond/mainland/recommend_graduate",
      },
      { text: "Master Abroad", link: "/en/beyond/abroad/master" },
      { text: "PhD Abroad", link: "/en/beyond/abroad/phd" },
    ],
  },
  {
    text: "Other",
    items: [
      { text: "Health", link: "/en/health/alive_first" },
      { text: "Copyrights", link: "/en/copyrights" },
    ],
  },
];

function createThemeConfig({
  nav,
  editLinkText,
  outlineLabel,
  prevLabel,
  nextLabel,
  footerMessage,
  footerCopyright,
}) {
  return {
    logo: "/root-assets/logo/scut-cat-1.jpg",
    nav,
    sidebar: {
      "/learn/curricular/": [
        {
          text: "课内",
          items: [
            { text: "课程性质介绍", link: "/learn/curricular/lessons" },
            {
              text: "公共基础课",
              link: "/learn/curricular/common_basic_lessons",
            },
            { text: "专业学习", link: "/learn/curricular/majors" },
            { text: "考试", link: "/learn/curricular/exam" },
            { text: "GPA", link: "/learn/curricular/gpa" },
            { text: "转专业", link: "/learn/curricular/transfer_major" },
          ],
        },
        {
          text: "课外",
          items: [
            { text: "SRP", link: "/learn/extra/srp" },
            { text: "竞赛", link: "/learn/extra/contest" },
          ],
        },
      ],
    },
    search: {
      provider: "local",
    },
    socialLinks: [{ icon: "github", link: repo }],
    editLink: {
      pattern: `${repo}/edit/main/docs/:path`,
      text: editLinkText,
    },
    outline: {
      level: [2, 3],
      label: outlineLabel,
    },
    docFooter: {
      prev: prevLabel,
      next: nextLabel,
    },
    footer: {
      message: footerMessage,
      copyright: footerCopyright,
    },
  };
}

export default defineConfig({
  lang: "zh-CN",
  title: "华南理工生存手册",
  description: "你不为我而来，但我为你而写",
  vite: {
    build: {
      rollupOptions: {
        onwarn(warning, warn) {
          const warningId = warning.id?.replaceAll("\\", "/") ?? "";
          const isVueusePureAnnotationWarning =
            warning.code === "INVALID_ANNOTATION" &&
            warningId.includes("node_modules/@vueuse/core/dist/index.js");

          if (isVueusePureAnnotationWarning) {
            return;
          }

          warn(warning);
        },
      },
    },
  },
  cleanUrls: true,
  ignoreDeadLinks: true,
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
      title: "华南理工生存手册",
      description: "你不为我而来，但我为你而写",
      themeConfig: createThemeConfig({
        nav: zhNav,
        editLinkText: "编辑此页",
        outlineLabel: "页面导航",
        prevLabel: "上一页",
        nextLabel: "下一页",
        footerMessage: "VitePress migration scaffold",
        footerCopyright: "Copyright © 2025-present Kozumi & 转群",
      }),
    },
    en: {
      label: "English",
      lang: "en-US",
      link: "/en/",
      title: "Survive in SCUT",
      description: "You did not come for me, but I wrote for you",
      themeConfig: createThemeConfig({
        nav: enNav,
        editLinkText: "Edit this page",
        outlineLabel: "On this page",
        prevLabel: "Previous page",
        nextLabel: "Next page",
        footerMessage: "VitePress migration scaffold",
        footerCopyright: "Copyright © 2025-present Kozumi & contributors",
      }),
    },
  },
});
