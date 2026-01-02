import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import './style.css'
import MarkdownEditor from '../components/MarkdownEditor.vue'
import ExpandableCard from '../components/ExpandableCard.vue'
import PdfViewer from '../components/PdfViewer.vue'
import CommentService from '../components/CommentService.vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-after': () => h(CommentService),
    })
  },
  enhanceApp({ app }) {
    app.component('MarkdownEditor', MarkdownEditor)
    app.component('ExpandableCard', ExpandableCard)
    app.component('PdfViewer', PdfViewer)
    app.component('CommentService', CommentService)
  },
}
