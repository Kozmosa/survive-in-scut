<template>
  <section class="probability-gallery-page">
    <iframe
      class="gallery-frame"
      :srcdoc="gallerySrcDoc"
      :title="ui.title"
      loading="lazy"
      referrerpolicy="no-referrer"
      @load="handleLoaded"
    ></iframe>
    <p v-if="!loaded" class="gallery-loading">{{ ui.loading }}</p>
    <p v-if="errorMessage" class="gallery-error">{{ errorMessage }}</p>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import galleryHtmlUrl from "./probability/gallerySource.html?url";
import { buildIntegratedGalleryHtml } from "./probability/galleryAdapter";
import { useLocaleText } from "../../.vitepress/composables/useLocaleText";

const loaded = ref(false);
const errorMessage = ref("");
const gallerySrcDoc = ref("");
const ui = useLocaleText(
  {
    title: "概率论与数理统计函数图像库",
    loading: "图像工具加载中...",
    missingResource: "概率论学习工具内容缺失，请检查资源文件后重试。",
    loadError: "概率论学习工具加载失败，请刷新页面后重试，或稍后再访问。",
  },
  {
    title: "Probability and Statistics Function Gallery",
    loading: "Loading the visualization tool...",
    missingResource:
      "The probability learning tool is missing required resources. Check the files and try again.",
    loadError:
      "Unable to load the probability learning tool. Refresh the page or try again later.",
  },
);

onMounted(async () => {
  try {
    const response = await fetch(galleryHtmlUrl);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const galleryHtml = await response.text();
    gallerySrcDoc.value = buildIntegratedGalleryHtml(galleryHtml);
  } catch (error) {
    console.error(
      "[ProbabilityDistributionGallery] Unable to load resource",
      error,
    );
    errorMessage.value = ui.value.missingResource;
  }
});

function handleLoaded() {
  if (!gallerySrcDoc.value) {
    return;
  }
  loaded.value = true;
  try {
    errorMessage.value = "";
  } catch (error) {
    console.error(
      "[ProbabilityDistributionGallery] Initialization failed",
      error,
    );
    errorMessage.value = ui.value.loadError;
  }
}
</script>

<style scoped>
.probability-gallery-page {
  position: relative;
  height: 100%;
  overflow: hidden;
}

.gallery-frame {
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border: 1px solid var(--vp-c-border);
  border-radius: 14px;
  background: var(--vp-c-bg-soft);
}

.gallery-loading,
.gallery-error {
  margin-top: 0.75rem;
  padding: 0.8rem 1rem;
  border-radius: 10px;
}

.gallery-loading {
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
}

.gallery-error {
  border-radius: 10px;
  border: 1px solid var(--vp-c-danger-soft, #f5d0d0);
  background: var(--vp-c-danger-soft, #fff1f1);
  color: var(--vp-c-danger-1, #9f1d1d);
}

@media (max-width: 960px) {
  .gallery-frame {
    border-radius: 0;
  }
}
</style>
