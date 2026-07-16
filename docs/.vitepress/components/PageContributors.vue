<template>
  <div v-if="names.length > 0" class="page-contributors">
    <span class="page-contributors-label">
      {{ label }}
    </span>
    <span class="page-contributors-names">
      <span v-for="(name, i) in names" :key="name" class="page-contributor-name">
        {{ name }}<template v-if="i < names.length - 1">、</template>
      </span>
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from "vue";
import { useData } from "vitepress";

const { frontmatter, page } = useData();

type ContributorMap = Record<string, string[]>;

const contributorNames = ref<string[]>([]);
const dataLoaded = ref(false);

// Normalize VitePress page path to match fileMap keys from the plugin
function normalizePath(relativePath: string): string {
  // VitePress normalizes README.md → index.md; the plugin uses README.md
  return relativePath.replace(/\/index\.md$/, "/README.md");
}

watchEffect(async () => {
  const relPath = normalizePath(page.value.relativePath);

  // Try frontmatter author first
  const fmAuthor = frontmatter.value.author as string | undefined;
  if (fmAuthor) {
    contributorNames.value = [fmAuthor];
    dataLoaded.value = true;
    return;
  }

  // Fall back to fileMap from contributors.json
  if (!dataLoaded.value) {
    try {
      const resp = await fetch("/contributors.json", { cache: "no-store" });
      if (resp.ok) {
        const data: { fileMap?: ContributorMap } = await resp.json();
        const map = data.fileMap ?? {};

        // Try normalized path, then fall back to original
        const names = map[relPath] ?? map[page.value.relativePath] ?? [];
        contributorNames.value = names;
      }
    } catch {
      // silent fail
    }
    dataLoaded.value = true;
  }
});

const label = computed(() => {
  if (contributorNames.value.length === 0) return "";
  return contributorNames.value.length === 1 ? "作者" : "贡献者";
});

const names = computed(() => contributorNames.value);
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
  flex-wrap: wrap;
}

.page-contributors-label {
  font-weight: 600;
  white-space: nowrap;
}

.page-contributor-name {
  color: var(--vp-c-text-1);
}
</style>
