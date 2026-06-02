<script setup>
import DefaultTheme from "vitepress/theme";
import { computed } from "vue";
import { useData } from "vitepress";

const { frontmatter } = useData();
const isImmersivePage = computed(() => frontmatter.value?.immersive === true);
</script>

<template>
  <div :class="{ 'immersive-page': isImmersivePage }">
    <DefaultTheme.Layout />
  </div>
</template>
