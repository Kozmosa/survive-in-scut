<template>
  <section class="probability-gallery-page">
    <iframe
      class="gallery-frame"
      :srcdoc="gallerySrcDoc"
      title="概率论与数理统计函数图像库"
      loading="lazy"
      referrerpolicy="no-referrer"
      @load="handleLoaded"
    ></iframe>
    <p v-if="!loaded" class="gallery-loading">图像工具加载中...</p>
    <p v-if="errorMessage" class="gallery-error">{{ errorMessage }}</p>
  </section>
</template>

<script setup>
import { computed, ref } from "vue";
import galleryHtml from "../../../probability_distribution_gallery.html?raw";

const loaded = ref(false);
const errorMessage = ref("");

const gallerySrcDoc = computed(() => {
  if (!galleryHtml || typeof galleryHtml !== "string") {
    errorMessage.value = "概率论学习工具内容缺失，请检查资源文件后重试。";
    return "";
  }
  return galleryHtml;
});

function handleLoaded() {
  loaded.value = true;
  try {
    errorMessage.value = "";
  } catch (error) {
    console.error("[ProbabilityDistributionGallery] 初始化失败", error);
    errorMessage.value =
      "概率论学习工具加载失败，请刷新页面后重试，或稍后再访问。";
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
