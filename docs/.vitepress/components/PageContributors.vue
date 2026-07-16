<template>
  <div v-if="author" class="page-contributors">
    <span class="page-contributors-label">作者</span>
    <span class="page-contributor-name">{{ author }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useData } from "vitepress";

const { frontmatter } = useData();
const author = computed(() => frontmatter.value.author as string | undefined);
</script>

<style scoped>
.page-contributors {
  margin-top: 32px;
  padding: 12px 16px;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 13px;
  color: var(--vp-c-text-2);
  display: flex;
  gap: 6px;
}

.page-contributors-label {
  font-weight: 600;
  white-space: nowrap;
}

.page-contributor-name {
  color: var(--vp-c-text-1);
}
</style>
