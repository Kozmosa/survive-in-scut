<script setup>
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
import { useSiteData } from 'vuepress/client'
import { computed } from 'vue'

const siteData = useSiteData()
const isBlackWhiteMode = computed(() => {
  return siteData.value.blackWhiteMode?.enabled === true
})
</script>

<template>
  <div :class="{ 'black-white-mode': isBlackWhiteMode }">
    <ParentLayout>
      <template #page-bottom>
        <CommentService />
      </template>
    </ParentLayout>
  </div>
</template>