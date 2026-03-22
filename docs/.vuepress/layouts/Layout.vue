<script setup>
import ParentLayout from "@vuepress/theme-default/layouts/Layout.vue";
import { computed } from "vue";
import { useData } from "vuepress/client";

const { frontmatter } = useData();

const isImmersivePage = computed(() => frontmatter.value.immersive === true);

const shouldShowComment = computed(() => {
  return !isImmersivePage.value;
});
</script>

<!-- Gray filter for special moments and events -->
<!-- <style>
html {
  filter: grayscale(100%);
}
</style> -->

<template>
  <div :class="{ 'immersive-page': isImmersivePage }">
    <ParentLayout>
      <template #page-bottom>
        <CommentService v-if="shouldShowComment" />
      </template>
    </ParentLayout>
  </div>
</template>
