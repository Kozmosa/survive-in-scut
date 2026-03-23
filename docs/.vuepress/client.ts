import { defineClientConfig } from "vuepress/client";
import Layout from "./layouts/Layout.vue";
import MarkdownEditor from "./components/MarkdownEditor.vue";
import ExpandableCard from "./components/ExpandableCard.vue";
import ContributorsList from "./components/ContributorsList.vue";
import AppLanding from "./components/AppLanding.vue";
import ProbabilityDistributionGallery from "./components/ProbabilityDistributionGallery.vue";
import ImmersiveShell from "./components/ImmersiveShell.vue";

// 导出合并后的客户端配置
export default defineClientConfig({
  layouts: {
    Layout,
  },
  enhance: ({ app }) => {
    app.component("MarkdownEditor", MarkdownEditor);
    app.component("ExpandableCard", ExpandableCard);
    app.component("ContributorsList", ContributorsList);
    app.component("AppLanding", AppLanding);
    app.component(
      "ProbabilityDistributionGallery",
      ProbabilityDistributionGallery,
    );
    app.component("ImmersiveShell", ImmersiveShell);
  },
});
