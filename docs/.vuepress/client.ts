import { defineClientConfig } from "vuepress/client";
import { defineAsyncComponent } from "vue";
import Layout from "./layouts/Layout.vue";

// 导出合并后的客户端配置
export default defineClientConfig({
  layouts: {
    Layout,
  },
  enhance: ({ app }) => {
    app.component(
      "MarkdownEditor",
      defineAsyncComponent(() => import("./components/MarkdownEditor.vue")),
    );
    app.component(
      "ExpandableCard",
      defineAsyncComponent(() => import("./components/ExpandableCard.vue")),
    );
    app.component(
      "ContributorsList",
      defineAsyncComponent(() => import("./components/ContributorsList.vue")),
    );
    app.component(
      "AppLanding",
      defineAsyncComponent(() => import("./components/AppLanding.vue")),
    );
    app.component(
      "ProbabilityDistributionGallery",
      defineAsyncComponent(
        () => import("./components/ProbabilityDistributionGallery.vue"),
      ),
    );
    app.component(
      "ImmersiveShell",
      defineAsyncComponent(() => import("./components/ImmersiveShell.vue")),
    );
  },
});
