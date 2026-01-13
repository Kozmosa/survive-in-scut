import { defineClientConfig } from "@vuepress/client";
import PdfViewer from "./components/PdfViewer.vue";

export default defineClientConfig({
  enhance({ app }) {
    app.component("PdfViewer", PdfViewer);
  },
});
