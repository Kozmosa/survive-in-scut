<template>
  <div class="expandable-card border rounded-lg overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md">
    <div class="flex items-center justify-between p-4 bg-gray-50 cursor-pointer" @click="toggleExpanded">
      <h3 class="text-lg font-semibold text-gray-800">{{ displayTitle }}</h3>
      <div class="transition-transform duration-300" :class="{ 'rotate-180': isExpanded }">
        <i class="fa fa-chevron-down text-gray-500"></i>
      </div>
    </div>

    <div class="max-h-0 overflow-hidden transition-all duration-500 ease-in-out" :style="{ maxHeight: isExpanded ? contentHeight : '0px' }">
      <div class="p-4 border-t">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch, computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  defaultExpanded: {
    type: Boolean,
    default: true,
  },
})

const isExpanded = ref(props.defaultExpanded)
const contentHeight = ref('0px')
const firstLine = ref('')
const contentRef = ref<HTMLElement | null>(null)

const displayTitle = computed(() => props.title || firstLine.value || '展开内容')

const calculateContentHeight = () => {
  if (contentRef.value) {
    contentHeight.value = `${contentRef.value.scrollHeight}px`
  }
}

const extractFirstLine = () => {
  if (contentRef.value) {
    const contentText = contentRef.value.textContent?.trim() || ''
    firstLine.value = contentText.split('\n')[0].trim()
  }
}

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value
}

onMounted(() => {
  nextTick(() => {
    extractFirstLine()
    if (isExpanded.value) {
      calculateContentHeight()
    }
  })
})

watch(isExpanded, (next) => {
  if (next) {
    nextTick(() => calculateContentHeight())
  } else {
    contentHeight.value = '0px'
  }
})
</script>

<style scoped>
.expandable-card {
  background: #fff;
}
</style>
