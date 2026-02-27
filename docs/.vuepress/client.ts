import { defineWalineConfig } from "@vuepress/plugin-comment/client";
import { defineClientConfig } from "vuepress/client";
import Layout from "./layouts/Layout.vue";
import MarkdownEditor from "./components/MarkdownEditor.vue";
import ExpandableCard from "./components/ExpandableCard.vue";
import ContributorsList from "./components/ContributorsList.vue";

// 定义Waline评论配置
const walineComment = defineWalineConfig({
  serverURL: "https://scut-waline.vercel.app/",
});

// 导出合并后的客户端配置
export default defineClientConfig({
  layouts: {
    Layout,
  },
  // 注册评论插件
  enhance: ({ app, router, siteData }) => {
    // 注册Waline评论组件
    (app.use(walineComment),
      app.component("MarkdownEditor", MarkdownEditor),
      app.component("ExpandableCard", ExpandableCard),
      app.component("ContributorsList", ContributorsList));
  },
});
