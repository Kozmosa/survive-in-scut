<template>
  <div class="comment-wrapper">
    <div ref="container" class="waline-container"></div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useData, useRoute } from "vitepress";
import { init, type WalineInstance } from "@waline/client";
import "@waline/client/style";

const container = ref<HTMLElement | null>(null);
const { lang } = useData();
const route = useRoute();
let waline: WalineInstance | null = null;

const commentLanguage = () =>
  lang.value ||
  (typeof navigator === "undefined" ? "zh-CN" : navigator.language);

onMounted(() => {
  if (!container.value) return;
  waline = init({
    el: container.value,
    serverURL: "https://scut-waline.vercel.app/",
    path: route.path,
    lang: commentLanguage(),
    reaction: true,
    dark: "html.dark",
  });
});

watch([() => route.path, lang], () => {
  waline?.update({
    path: route.path,
    lang: commentLanguage(),
  });
});

onBeforeUnmount(() => {
  waline?.destroy();
  waline = null;
});
</script>

<style scoped>
.comment-wrapper {
  margin-top: 2rem;
}

.waline-container {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 1.5rem;
}
</style>
