<template>
  <div class="comment-wrapper">
    <div ref="container" class="waline-container"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { init } from '@waline/client'
import '@waline/client/style'

const container = ref<HTMLElement | null>(null)
let destroy: (() => void) | undefined

onMounted(() => {
  if (!container.value) return
  destroy = init({
    el: container.value,
    serverURL: 'https://scut-waline.vercel.app/',
    lang: 'zh-CN',
    reaction: true,
  })
})

onBeforeUnmount(() => {
  if (destroy) destroy()
})
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
