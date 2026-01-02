<template>
  <div class="markdown-editor-container">
    <div class="editor-header">
      <div class="editor-tabs">
        <button
          class="editor-tab"
          :class="{ 'active': currentView === 'editor' }"
          @click="currentView = 'editor'"
        >
          <i class="fa fa-edit mr-2"></i>编辑
        </button>
        <button
          class="editor-tab"
          :class="{ 'active': currentView === 'preview' }"
          @click="currentView = 'preview'"
        >
          <i class="fa fa-eye mr-2"></i>预览
        </button>
        <button
          class="editor-tab"
          :class="{ 'active': currentView === 'split' }"
          @click="currentView = 'split'"
        >
          <i class="fa fa-columns mr-2"></i>分栏
        </button>

        <button class="editor-tab">
          <i class="fa fa-columns mr-2"></i>Kozumi Editor v0.1
        </button>
      </div>
    </div>

    <div class="editor-content">
      <div v-show="currentView === 'editor' || currentView === 'split'" class="editor-wrapper">
        <textarea
          v-model="markdownContent"
          class="editor-textarea"
          placeholder="在此输入 Markdown 内容..."
          @input="updatePreview"
        ></textarea>
      </div>

      <div
        v-show="currentView === 'preview' || currentView === 'split'"
        class="preview-wrapper"
        v-html="parsedMarkdown"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import * as marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.min.css'

const props = defineProps({
  content: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:content'])

const markdownContent = ref(props.content)
const parsedMarkdown = ref('')
const currentView = ref<'editor' | 'preview' | 'split'>('split')

marked.setOptions({
  highlight: (code, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value
    }
    return hljs.highlightAuto(code).value
  },
  breaks: true,
  gfm: true,
})

const updatePreview = () => {
  parsedMarkdown.value = marked.parse(markdownContent.value)
  emit('update:content', markdownContent.value)
}

watch(
  () => props.content,
  (newVal) => {
    if (newVal !== markdownContent.value) {
      markdownContent.value = newVal
      updatePreview()
    }
  }
)

onMounted(() => {
  updatePreview()
})
</script>

<style scoped>
.markdown-editor-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.editor-header {
  background-color: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  padding: 0.5rem;
}

.editor-tabs {
  display: flex;
}

.editor-tab {
  padding: 0.5rem 1rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  font-weight: 500;
  color: #4a5568;
  display: flex;
  align-items: center;
}

.editor-tab:hover {
  background-color: #edf2f7;
}

.editor-tab.active {
  background-color: #e2e8f0;
  color: #2d3748;
}

.editor-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.editor-wrapper,
.preview-wrapper {
  flex: 1;
  min-height: 400px;
  overflow: auto;
  padding: 1rem;
}

.editor-wrapper {
  background-color: #1e1e1e;
}

.editor-textarea {
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  color: #d4d4d4;
  font-family: Consolas, Monaco, 'Andale Mono', monospace;
  font-size: 14px;
  resize: none;
  outline: none;
  padding: 0;
}

.preview-wrapper {
  background-color: #ffffff;
}

.preview-wrapper > *:first-child {
  margin-top: 0;
}

.preview-wrapper h1,
.preview-wrapper h2,
.preview-wrapper h3,
.preview-wrapper h4,
.preview-wrapper h5,
.preview-wrapper h6 {
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  color: #1a202c;
}

.preview-wrapper p {
  margin-bottom: 1rem;
  line-height: 1.6;
  color: #2d3748;
}

.preview-wrapper ul,
.preview-wrapper ol {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.preview-wrapper li {
  margin-bottom: 0.5rem;
}

.preview-wrapper pre {
  background-color: #f7fafc;
  padding: 1rem;
  border-radius: 0.375rem;
  overflow-x: auto;
  margin-bottom: 1rem;
}

.preview-wrapper code {
  font-family: Consolas, Monaco, 'Andale Mono', monospace;
  font-size: 0.9rem;
  background-color: #edf2f7;
  padding: 0.1rem 0.3rem;
  border-radius: 0.25rem;
}

.preview-wrapper pre code {
  background-color: transparent;
  padding: 0;
}

.preview-wrapper blockquote {
  border-left: 4px solid #e2e8f0;
  padding-left: 1rem;
  margin-left: 0;
  margin-bottom: 1rem;
  color: #718096;
  font-style: italic;
}

.preview-wrapper a {
  color: #3182ce;
  text-decoration: none;
}

.preview-wrapper a:hover {
  text-decoration: underline;
}

.preview-wrapper img {
  max-width: 100%;
  height: auto;
  margin: 1rem 0;
  border-radius: 0.375rem;
}

.editor-content.split-mode {
  flex-direction: row;
}

.editor-content.single-mode {
  flex-direction: column;
}

@media (max-width: 768px) {
  .editor-content {
    flex-direction: column;
  }

  .editor-wrapper,
  .preview-wrapper {
    min-height: 200px;
  }
}
</style>
