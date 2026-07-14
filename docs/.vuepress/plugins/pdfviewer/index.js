import { path } from "@vuepress/utils";

export default (options) => ({
  name: "pdfviewer",
  clientConfigFile: path.resolve(__dirname, "./client/config.js"),
});
