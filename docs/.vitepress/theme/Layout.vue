<script setup lang="ts">
import DefaultTheme from "vitepress/theme";
import { computed } from "vue";
import { useData } from "vitepress";
import CommentService from "../components/CommentService.vue";
import PageContributors from "../components/PageContributors.vue";

const { frontmatter } = useData();
const isImmersivePage = computed(() => frontmatter.value.immersive === true);
</script>

<template>
  <div :class="{ 'immersive-page': isImmersivePage }">
    <DefaultTheme.Layout>
      <template #doc-after>
        <PageContributors v-if="!isImmersivePage" />
        <CommentService v-if="!isImmersivePage" />
      </template>
    </DefaultTheme.Layout>
  </div>
</template>
