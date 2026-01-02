<template>
  <div class="pdf-container">
    <div ref="pdfContainer" class="pdf-content"></div>
    <div v-if="loading" class="pdf-loading">加载中...</div>
    <div v-if="error" class="pdf-error">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onBeforeUnmount } from 'vue'
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.js?url'

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  scale: {
    type: Number,
    default: 1.5,
  },
})

const pdfContainer = ref<HTMLElement | null>(null)
const loading = ref(true)
const error = ref('')
let cancelled = false

const clearContainer = () => {
  if (pdfContainer.value) {
    pdfContainer.value.innerHTML = ''
  }
}

const loadPdf = async () => {
  loading.value = true
  error.value = ''
  clearContainer()

  try {
    const { getDocument, GlobalWorkerOptions } = await import('pdfjs-dist')
    GlobalWorkerOptions.workerSrc = workerSrc

    const pdf = await getDocument(props.src).promise

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum += 1) {
      if (cancelled) return
      const page = await pdf.getPage(pageNum)
      const viewport = page.getViewport({ scale: props.scale })

      const canvas = document.createElement('canvas')
      canvas.width = viewport.width
      canvas.height = viewport.height
      canvas.className = 'pdf-page'

      const context = canvas.getContext('2d')
      if (!context) {
        throw new Error('无法创建 canvas 渲染上下文')
      }

      await page.render({ canvasContext: context, viewport }).promise

      const pageContainer = document.createElement('div')
      pageContainer.className = 'pdf-page-container'

      const pageLabel = document.createElement('div')
      pageLabel.className = 'pdf-page-label'
      pageLabel.textContent = `第 ${pageNum} 页 / 共 ${pdf.numPages} 页`

      pageContainer.appendChild(canvas)
      pageContainer.appendChild(pageLabel)
      pdfContainer.value?.appendChild(pageContainer)
    }

    loading.value = false
  } catch (err) {
    console.error('PDF 加载失败:', err)
    error.value = '无法加载 PDF 文件，请检查路径与文件格式。'
    loading.value = false
  }
}

watch(
  () => props.src,
  () => {
    if (!props.src) return
    loadPdf()
  }
)

onMounted(loadPdf)
onBeforeUnmount(() => {
  cancelled = true
  clearContainer()
})
</script>

<style>
.pdf-container {
  position: relative;
  width: 100%;
}

.pdf-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.pdf-page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.pdf-page {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  max-width: 100%;
  height: auto;
}

.pdf-page-label {
  margin-top: 8px;
  font-size: 0.9em;
  color: #666;
}

.pdf-loading,
.pdf-error {
  padding: 20px;
  text-align: center;
}

.pdf-error {
  color: #e53935;
}
</style>
