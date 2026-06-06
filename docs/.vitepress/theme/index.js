import DefaultTheme from "vitepress/theme";
import Layout from "./Layout.vue";
import "./custom.css";

import AppLanding from "../../.vuepress/components/AppLanding.vue";
import ContributorsList from "../../.vuepress/components/ContributorsList.vue";
import ImmersiveShell from "../../.vuepress/components/ImmersiveShell.vue";
import MarkdownEditor from "../../.vuepress/components/MarkdownEditor.vue";
import ProbabilityDistributionGallery from "../../.vuepress/components/ProbabilityDistributionGallery.vue";

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component("AppLanding", AppLanding);
    app.component("ContributorsList", ContributorsList);
    app.component("ImmersiveShell", ImmersiveShell);
    app.component("MarkdownEditor", MarkdownEditor);
    app.component(
      "ProbabilityDistributionGallery",
      ProbabilityDistributionGallery,
    );
  },
};
