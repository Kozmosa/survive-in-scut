import { defineUserConfig } from "vuepress";
import { defaultTheme } from "@vuepress/theme-default";
import todoCollector from "vuepress-plugin-todo-collector";

export default defineUserConfig({
  lang: "zh-CN",
  title: "SCUTSE生存指南",
  description: "华南理工大学软件学院学生的全方位指南",

  theme: defaultTheme({
    navbar: [
      // 导航项
      {
        text: "首页",
        link: "/",
      },
      {
        text: "指南",
        link: "/guide/",
      },
      {
        text: "TODO 列表",
        link: "/todo.html",
      },
    ],
  }),

  plugins: [
    todoCollector({
      todoKeywords: ["TODO", "FIXME"],
      fileExtensions: [".md", ".vue"],
      excludeDirs: ["node_modules", ".git", "dist", ".vuepress/dist"],
    }),
  ],
});
