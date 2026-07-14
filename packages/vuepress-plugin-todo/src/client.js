import { defineClientConfig } from "@vuepress/client";

export default defineClientConfig({
  enhance({ router, siteData }) {
    // 这里可以添加客户端增强逻辑
    // 注意：VuePress 2.x中动态添加导航项需要用不同方式实现
    // 这里的代码实际上不会动态添加导航，需要通过theme配置添加
  },
});
