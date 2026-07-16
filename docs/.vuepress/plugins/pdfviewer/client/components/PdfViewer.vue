<template>
  <div class="pdf-container">
    <div v-if="loading" class="pdf-status">加载中…</div>
    <div v-if="error" class="pdf-status pdf-error">{{ error }}</div>

    <template v-if="pdfLoaded">
      <div class="pdf-toolbar">
        <button
          class="pdf-btn"
          @click="prevPage"
          :disabled="currentPage <= 1"
          title="上一页 (←)"
        >
          ‹
        </button>
        <span class="pdf-page-indicator">
          <input
            class="pdf-page-input"
            type="number"
            :value="currentPage"
            @change="handlePageInput"
            @keydown.enter="handlePageInput"
            :min="1"
            :max="numPages"
          />
          <span class="pdf-page-sep">/</span>
          <span class="pdf-page-total">{{ numPages }}</span>
        </span>
        <button
          class="pdf-btn"
          @click="nextPage"
          :disabled="currentPage >= numPages"
          title="下一页 (→)"
        >
          ›
        </button>

        <span class="pdf-toolbar-sep">|</span>

        <button
          class="pdf-btn"
          @click="zoomOut"
          :disabled="scale <= 0.25"
          title="缩小"
        >
          −
        </button>
        <span class="pdf-zoom-text">{{ zoomPercent }}%</span>
        <button
          class="pdf-btn"
          @click="zoomIn"
          :disabled="scale >= 3"
          title="放大"
        >
          +
        </button>
        <button class="pdf-btn" @click="fitToWidth" title="适应宽度">⊡</button>
      </div>

      <div class="pdf-viewer-area" ref="viewerArea">
        <canvas ref="canvas" class="pdf-page"></canvas>
      </div>
    </template>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from "vue";

export default {
  name: "PdfViewer",
  props: {
    src: {
      type: String,
      required: true,
    },
    scale: {
      type: Number,
      default: 1.0,
    },
  },
  setup(props) {
    const canvas = ref(null);
    const viewerArea = ref(null);
    const loading = ref(true);
    const error = ref(null);
    const pdfLoaded = ref(false);

    let pdfDoc = null;
    let numPages = 0;
    let renderId = 0;

    const currentPage = ref(1);
    const pageCount = ref(0);
    const scale = ref(props.scale || 1.0);

    const zoomPercent = computed(() => Math.round(scale.value * 100));

    /* ---- PDF loading ---- */

    const loadPdf = async () => {
      loading.value = true;
      error.value = null;
      pdfLoaded.value = false;
      pdfDoc = null;

      try {
        const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
        const pdfjsWorker =
          await import("pdfjs-dist/legacy/build/pdf.worker.mjs?url");
        pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker.default;

        const pdf = await pdfjs.getDocument({ url: props.src }).promise;
        pdfDoc = pdf;
        numPages = pdf.numPages;
        pageCount.value = numPages;
        currentPage.value = 1;

        // Show viewer area first so we can measure its width
        pdfLoaded.value = true;
        loading.value = false;
        await nextTick();

        await fitToWidth();
        await renderPage(1);
      } catch (err) {
        console.error("PDF 加载失败:", err);
        error.value = "无法加载 PDF 文件。请确保文件路径正确且文件格式有效。";
        loading.value = false;
      }
    };

    /* ---- page rendering ---- */

    const renderPage = async (pageNum) => {
      if (!pdfDoc || !canvas.value) return;

      const id = ++renderId;
      const page = await pdfDoc.getPage(pageNum);
      if (id !== renderId) return; // superseded

      const viewport = page.getViewport({ scale: scale.value });
      canvas.value.width = viewport.width;
      canvas.value.height = viewport.height;

      const ctx = canvas.value.getContext("2d");
      const task = page.render({ canvasContext: ctx, viewport });
      await task.promise;
      // If superseded during render, the result will be overwritten shortly
    };

    /* ---- navigation ---- */

    const goToPage = async (pageNum) => {
      const clamped = Math.max(1, Math.min(numPages, pageNum));
      if (clamped !== currentPage.value) {
        currentPage.value = clamped;
        await renderPage(clamped);
      }
    };

    const prevPage = () => goToPage(currentPage.value - 1);
    const nextPage = () => goToPage(currentPage.value + 1);

    const handlePageInput = (e) => {
      const val = parseInt(e.target.value, 10);
      if (isNaN(val) || val < 1) {
        e.target.value = currentPage.value;
        return;
      }
      goToPage(val);
    };

    /* ---- zoom ---- */

    const zoomIn = async () => {
      scale.value = Math.min(3, +(scale.value + 0.25).toFixed(2));
      await renderPage(currentPage.value);
    };

    const zoomOut = async () => {
      scale.value = Math.max(0.25, +(scale.value - 0.25).toFixed(2));
      await renderPage(currentPage.value);
    };

    const fitToWidth = async () => {
      if (!pdfDoc || !viewerArea.value) return;
      const containerWidth = viewerArea.value.clientWidth - 4;
      if (containerWidth <= 0) return;

      const page = await pdfDoc.getPage(1);
      const orig = page.getViewport({ scale: 1 });
      scale.value = Math.min(3, Math.max(0.25, containerWidth / orig.width));
      await renderPage(currentPage.value);
    };

    /* ---- keyboard ---- */

    const handleKeydown = (e) => {
      if (e.key === "ArrowLeft") {
        prevPage();
        e.preventDefault();
      } else if (e.key === "ArrowRight") {
        nextPage();
        e.preventDefault();
      }
    };

    /* ---- lifecycle ---- */

    onMounted(() => {
      loadPdf();
      window.addEventListener("keydown", handleKeydown);
    });

    onUnmounted(() => {
      window.removeEventListener("keydown", handleKeydown);
    });

    watch(
      () => props.src,
      () => {
        pdfDoc = null;
        loadPdf();
      },
    );

    return {
      canvas,
      viewerArea,
      loading,
      error,
      pdfLoaded,
      currentPage,
      numPages: pageCount,
      scale,
      zoomPercent,
      goToPage,
      prevPage,
      nextPage,
      handlePageInput,
      zoomIn,
      zoomOut,
      fitToWidth,
    };
  },
};
</script>

<style>
.pdf-container {
  width: 100%;
  margin: 16px 0;
}

.pdf-status {
  padding: 24px;
  text-align: center;
  color: #666;
  font-size: 14px;
}

.pdf-error {
  color: #e53935;
}

/* ---- toolbar ---- */

.pdf-toolbar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 6px 12px;
  background: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-bottom: none;
  border-radius: 8px 8px 0 0;
  flex-wrap: wrap;
  user-select: none;
}

.pdf-btn {
  background: #fff;
  border: 1px solid #d0d0d0;
  border-radius: 4px;
  padding: 2px 10px;
  cursor: pointer;
  font-size: 16px;
  line-height: 1.5;
  transition: background 0.15s;
}

.pdf-btn:hover:not(:disabled) {
  background: #e8e8e8;
}

.pdf-btn:disabled {
  opacity: 0.35;
  cursor: default;
}

.pdf-page-indicator {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: #444;
}

.pdf-page-input {
  width: 44px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 2px 4px;
  font-size: 14px;
  font-variant-numeric: tabular-nums;
}

.pdf-page-input::-webkit-inner-spin-button,
.pdf-page-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.pdf-page-input[type="number"] {
  -moz-appearance: textfield;
}

.pdf-page-sep {
  color: #999;
}

.pdf-page-total {
  color: #666;
  font-variant-numeric: tabular-nums;
}

.pdf-toolbar-sep {
  color: #ccc;
  font-size: 18px;
  line-height: 1;
}

.pdf-zoom-text {
  font-size: 13px;
  color: #555;
  min-width: 36px;
  text-align: center;
  font-variant-numeric: tabular-nums;
}

/* ---- viewer area ---- */

.pdf-viewer-area {
  display: flex;
  justify-content: center;
  padding: 20px;
  background: #fafafa;
  border: 1px solid #e0e0e0;
  border-top: none;
  border-radius: 0 0 8px 8px;
  overflow-x: auto;
}

.pdf-page {
  display: block;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  background: #fff;
}
</style>
