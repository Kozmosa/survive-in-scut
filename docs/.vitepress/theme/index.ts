import DefaultTheme from "vitepress/theme";
import Layout from "./Layout.vue";
import "./style.css";
import AppLanding from "../components/AppLanding.vue";
import ContributorsList from "../components/ContributorsList.vue";
import ImmersiveShell from "../components/ImmersiveShell.vue";
import ProbabilityDistributionGallery from "../components/ProbabilityDistributionGallery.vue";
import MarkdownEditor from "../components/MarkdownEditor.vue";
import Details from "../components/Details.vue";
import ExpandableCard from "../components/ExpandableCard.vue";
import PdfViewer from "../components/PdfViewer.vue";
import PageContributors from "../components/PageContributors.vue";
import CommentService from "../components/CommentService.vue";

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component("AppLanding", AppLanding);
    app.component("ContributorsList", ContributorsList);
    app.component("ImmersiveShell", ImmersiveShell);
    app.component(
      "ProbabilityDistributionGallery",
      ProbabilityDistributionGallery,
    );
    app.component("MarkdownEditor", MarkdownEditor);
    app.component("Details", Details);
    app.component("ExpandableCard", ExpandableCard);
    app.component("PdfViewer", PdfViewer);
    app.component("PageContributors", PageContributors);
    app.component("CommentService", CommentService);
  },
};
