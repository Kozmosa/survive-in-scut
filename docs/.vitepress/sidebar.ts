import type { Sidebar } from "vitepress";

const sidebarZh: Sidebar = {
  "/": [
    {
      text: "快速开始",
      items: [
        { text: "启程", link: "/get-started" },
        { text: "简介", link: "/introduction" },
      ],
    },
    {
      text: "设施",
      collapsed: false,
      items: [
        { text: "概览", link: "/infra/index" },
        {
          text: "大学城",
          collapsed: true,
          items: [
            { text: "地图", link: "/infra/hemc/map" },
            { text: "穗石", link: "/infra/hemc/suishi" },
            { text: "周边", link: "/infra/hemc/nearby" },
          ],
        },
        {
          text: "五山",
          collapsed: true,
          items: [
            { text: "地图", link: "/infra/wushan/map" },
            { text: "周边", link: "/infra/wushan/nearby" },
          ],
        },
        {
          text: "国际",
          collapsed: true,
          items: [
            { text: "地图", link: "/infra/gzic/map" },
            { text: "周边", link: "/infra/gzic/nearby" },
          ],
        },
      ],
    },
    {
      text: "生活",
      collapsed: false,
      items: [
        {
          text: "时间",
          collapsed: true,
          items: [
            { text: "大学城/国际", link: "/life/time/hemc_gzic" },
            { text: "五山", link: "/life/time/wushan" },
            { text: "校巴", link: "/life/time/bus" },
          ],
        },
        {
          text: "吃饭",
          collapsed: true,
          items: [
            { text: "大学城", link: "/life/eat/hemc" },
            { text: "五山", link: "/life/eat/wushan" },
            { text: "国际", link: "/life/eat/gzic" },
          ],
        },
        {
          text: "娱乐",
          collapsed: true,
          items: [
            { text: "大学城/国际", link: "/life/entertainment/hemc_gzic" },
            { text: "五山", link: "/life/entertainment/wushan" },
          ],
        },
      ],
    },
    {
      text: "学习",
      collapsed: false,
      items: [
        {
          text: "课内",
          collapsed: true,
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
          collapsed: true,
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
      collapsed: false,
      items: [
        {
          text: "境内",
          collapsed: true,
          items: [
            { text: "保研", link: "/beyond/mainland/recommend_graduate" },
            { text: "考研", link: "/beyond/mainland/unified_admission" },
            { text: "博士", link: "/beyond/mainland/phd" },
          ],
        },
        {
          text: "境外",
          collapsed: true,
          items: [
            { text: "硕士", link: "/beyond/abroad/master" },
            { text: "博士", link: "/beyond/abroad/phd" },
          ],
        },
      ],
    },
    {
      text: "立命",
      collapsed: false,
      items: [
        { text: "先活下去再说", link: "/health/alive_first" },
        { text: "立志篇", link: "/health/freshman_guidance" },
        { text: "就医指南", link: "/health/medical_care" },
      ],
    },
    {
      text: "其他",
      collapsed: false,
      items: [
        { text: "贡献指南", link: "/others/contributing" },
        { text: "维护路线图", link: "/others/roadmap" },
        { text: "TODO 列表", link: "/others/todo" },
        { text: "App", link: "/others/app" },
        { text: "品牌素材", link: "/others/branding" },
        { text: "提问的智慧", link: "/others/ask-the-smart-way" },
        { text: "版权声明", link: "/copyrights" },
      ],
    },
  ],
};

const sidebarEn: Sidebar = {
  "/en/": [
    {
      text: "Getting Started",
      items: [
        { text: "Start", link: "/en/get-started" },
        { text: "Introduction", link: "/en/introduction" },
      ],
    },
    {
      text: "Facilities",
      collapsed: false,
      items: [
        { text: "Overview", link: "/en/infra/index" },
        {
          text: "HEMC",
          collapsed: true,
          items: [
            { text: "Map", link: "/en/infra/hemc/map" },
            { text: "Suishi", link: "/en/infra/hemc/suishi" },
            { text: "Nearby", link: "/en/infra/hemc/nearby" },
          ],
        },
        {
          text: "Wushan",
          collapsed: true,
          items: [
            { text: "Map", link: "/en/infra/wushan/map" },
            { text: "Nearby", link: "/en/infra/wushan/nearby" },
          ],
        },
        {
          text: "GZIC",
          collapsed: true,
          items: [
            { text: "Map", link: "/en/infra/gzic/map" },
            { text: "Nearby", link: "/en/infra/gzic/nearby" },
          ],
        },
      ],
    },
    {
      text: "Life",
      collapsed: false,
      items: [
        {
          text: "Timetable",
          collapsed: true,
          items: [
            { text: "HEMC/GZIC", link: "/en/life/time/hemc_gzic" },
            { text: "Wushan", link: "/en/life/time/wushan" },
            { text: "Campus Bus", link: "/en/life/time/bus" },
          ],
        },
        {
          text: "Eat",
          collapsed: true,
          items: [
            { text: "HEMC", link: "/en/life/eat/hemc" },
            { text: "Wushan", link: "/en/life/eat/wushan" },
            { text: "GZIC", link: "/en/life/eat/gzic" },
          ],
        },
        {
          text: "Entertainment",
          collapsed: true,
          items: [
            {
              text: "HEMC/GZIC",
              link: "/en/life/entertainment/hemc_gzic",
            },
            { text: "Wushan", link: "/en/life/entertainment/wushan" },
          ],
        },
      ],
    },
    {
      text: "Learn",
      collapsed: false,
      items: [
        {
          text: "Curricular",
          collapsed: true,
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
          collapsed: true,
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
      collapsed: false,
      items: [
        {
          text: "Mainland",
          collapsed: true,
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
          collapsed: true,
          items: [
            { text: "Master", link: "/en/beyond/abroad/master" },
            { text: "PhD", link: "/en/beyond/abroad/phd" },
          ],
        },
      ],
    },
    {
      text: "Health",
      collapsed: false,
      items: [
        { text: "Stay Alive First", link: "/en/health/alive_first" },
        { text: "Freshman Guidance", link: "/en/health/freshman_guidance" },
        { text: "Medical Care", link: "/en/health/medical_care" },
      ],
    },
    {
      text: "Other",
      collapsed: false,
      items: [
        { text: "Contributing", link: "/en/others/contributing" },
        { text: "Roadmap", link: "/en/others/roadmap" },
        { text: "TODO List", link: "/en/others/todo" },
        { text: "App", link: "/en/others/app" },
        { text: "Brand Assets", link: "/en/others/branding" },
        {
          text: "How to Ask Questions",
          link: "/en/others/ask-the-smart-way",
        },
        { text: "Copyrights", link: "/en/copyrights" },
      ],
    },
  ],
};

export { sidebarZh, sidebarEn };
