<script setup>
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
</script>

<style>
html {
  filter: grayscale(100%);
}
</style>

<template>
  <ParentLayout>
    <template #page-bottom>
      <CommentService />
    </template>
  </ParentLayout>
</template>