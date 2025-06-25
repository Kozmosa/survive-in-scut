<template>
  <div class="expandable-card border rounded-lg overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md">
    <!-- 卡片标题区域 -->
    <div 
      class="flex items-center justify-between p-4 bg-gray-50 cursor-pointer"
      @click="toggleExpanded"
    >
      <h3 class="text-lg font-semibold text-gray-800">{{ displayTitle }}</h3>
      <div class="transition-transform duration-300" :class="{ 'rotate-180': isExpanded }">
        <i class="fa fa-chevron-down text-gray-500"></i>
      </div>
    </div>
    
    <!-- 卡片内容区域 -->
    <div 
      class="max-h-0 overflow-hidden transition-all duration-500 ease-in-out"
      :style="{ maxHeight: isExpanded ? contentHeight : '0px' }"
    >
      <div class="p-4 border-t">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch, computed } from 'vue';

// 定义组件属性
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  // 默认展开状态改为true
  defaultExpanded: {
    type: Boolean,
    default: true
  }
});

// 定义组件状态
const isExpanded = ref(props.defaultExpanded);
const contentHeight = ref('0px');
const firstLine = ref('');

// 定义DOM引用
const contentRef = ref(null);

// 计算显示的标题（优先使用props.title，否则使用内容第一行）
const displayTitle = computed(() => {
  return props.title || firstLine.value || '展开内容';
});

// 计算内容区域的高度
const calculateContentHeight = () => {
  if (contentRef.value) {
    contentHeight.value = contentRef.value.scrollHeight + 'px';
  }
};

// 提取内容第一行作为标题
const extractFirstLine = () => {
  if (contentRef.value) {
    // 获取内容文本
    const contentText = contentRef.value.textContent.trim();
    // 提取第一行
    const firstLineText = contentText.split('\n')[0].trim();
    firstLine.value = firstLineText;
  }
};

// 切换展开/收起状态
const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value;
};

// 组件挂载后计算内容高度和提取第一行
onMounted(() => {
  nextTick(() => {
    extractFirstLine();
    if (isExpanded.value) {
      calculateContentHeight();
    }
  });
});

// 监听展开状态变化，更新内容高度
watch(isExpanded, (newValue) => {
  if (newValue) {
    // 展开时计算内容高度
    nextTick(() => {
      calculateContentHeight();
    });
  } else {
    // 收起时重置高度
    contentHeight.value = '0px';
  }
});
</script>

<style scoped>
/* 这里可以添加自定义样式，如果需要的话 */
</style>    