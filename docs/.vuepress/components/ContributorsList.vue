<template>
  <div>
    <p v-if="loading">正在加载贡献者列表...</p>
    <p v-else-if="error">{{ error }}</p>
    <ul v-else>
      <li v-for="name in contributors" :key="name">{{ name }}</li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const loading = ref(true);
const error = ref("");
const contributors = ref([]);

onMounted(async () => {
  try {
    const response = await fetch("/contributors.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    contributors.value = Array.isArray(data?.items) ? data.items : [];
  } catch (err) {
    error.value = "贡献者列表加载失败，请稍后重试。";
    console.error("[ContributorsList]", err);
  } finally {
    loading.value = false;
  }
});
</script>
