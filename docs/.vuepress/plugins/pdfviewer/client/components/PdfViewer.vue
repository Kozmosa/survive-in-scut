<template>
  <div class="pdf-container">
    <div ref="pdfContainer" class="pdf-content"></div>
    <div v-if="loading" class="pdf-loading">加载中...</div>
    <div v-if="error" class="pdf-error">{{ error }}</div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'

export default {
  name: 'PdfViewer',
  props: {
    src: {
      type: String,
      required: true,
    },
    scale: {
      type: Number,
      default: 1.5,
    },
  },
  setup(props) {
    const pdfContainer = ref(null)
    const loading = ref(true)
    const error = ref(null)
    
    const loadPdf = async () => {
      loading.value = true
      error.value = null
      
      try {
        // 动态导入 PDF.js
        const pdfjs = await import('pdfjs-dist/webpack')
        // 设置 worker 路径
        const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.entry')
        pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker

        // 清空容器
        if (pdfContainer.value) {
          pdfContainer.value.innerHTML = ''
        }

        // 加载 PDF
        const pdf = await pdfjs.getDocument(props.src).promise
        
        // 渲染每一页
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum)
          const viewport = page.getViewport({ scale: props.scale })
          
          // 创建 canvas 元素
          const canvas = document.createElement('canvas')
          canvas.width = viewport.width
          canvas.height = viewport.height
          canvas.className = 'pdf-page'
          
          // 渲染 PDF 到 canvas
          const context = canvas.getContext('2d')
          const renderContext = {
            canvasContext: context,
            viewport: viewport
          }
          await page.render(renderContext).promise
          
          // 添加页码信息
          const pageContainer = document.createElement('div')
          pageContainer.className = 'pdf-page-container'
          
          const pageLabel = document.createElement('div')
          pageLabel.className = 'pdf-page-label'
          pageLabel.textContent = `第 ${pageNum} 页 / 共 ${pdf.numPages} 页`
          
          pageContainer.appendChild(canvas)
          pageContainer.appendChild(pageLabel)
          pdfContainer.value.appendChild(pageContainer)
        }
        
        loading.value = false
      } catch (err) {
        console.error('PDF加载失败:', err)
        error.value = '无法加载PDF文件。请确保文件路径正确且文件格式有效。'
        loading.value = false
      }
    }
    
    // 监听 src 属性变化
    watch(() => props.src, loadPdf)
    
    onMounted(loadPdf)
    
    return {
      pdfContainer,
      loading,
      error
    }
  }
}
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

.pdf-loading, .pdf-error {
  padding: 20px;
  text-align: center;
}

.pdf-error {
  color: #e53935;
}
</style>