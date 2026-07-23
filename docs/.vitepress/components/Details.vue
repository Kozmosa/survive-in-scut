<script setup lang="ts">
import { ref } from "vue";
import { useLocaleText } from "../composables/useLocaleText";

const props = withDefaults(
  defineProps<{
    title?: string;
    defaultExpanded?: boolean;
  }>(),
  {
    title: "",
    defaultExpanded: false,
  },
);

const open = ref(props.defaultExpanded);

const defaultTitle = useLocaleText("展开查看", "Expand to view");

function onToggle(event: Event) {
  open.value = (event.target as HTMLDetailsElement).open;
}
</script>

<template>
  <details class="vp-details" :open="open" @toggle="onToggle">
    <summary class="vp-details-summary">
      <span class="vp-details-title">{{ title || defaultTitle }}</span>
      <svg
        class="vp-details-chevron"
        :class="{ rotated: open }"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </summary>
    <div class="vp-details-content">
      <slot />
    </div>
  </details>
</template>

<style scoped>
.vp-details {
  display: block;
  margin: 16px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  overflow: hidden;
  transition: border-color 0.2s;
}

.vp-details[open] {
  border-color: var(--vp-c-brand-1);
}

.vp-details-summary {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  cursor: pointer;
  user-select: none;
  font-weight: 600;
  color: var(--vp-c-text-1);
  -webkit-tap-highlight-color: transparent;
  list-style: none;
}

/* Remove the native disclosure triangle across browsers */
.vp-details-summary::-webkit-details-marker {
  display: none;
}

.vp-details-summary::marker {
  display: none;
  content: "";
}

.vp-details-summary:hover {
  background-color: var(--vp-c-bg-mute);
}

.vp-details-title {
  flex: 1;
  min-width: 0;
}

.vp-details-chevron {
  flex-shrink: 0;
  color: var(--vp-c-text-2);
  transition: transform 0.25s ease;
}

.vp-details-chevron.rotated {
  transform: rotate(180deg);
}

.vp-details-content {
  padding: 16px;
  border-top: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
}

.vp-details-content > :first-child {
  margin-top: 0;
}

.vp-details-content > :last-child {
  margin-bottom: 0;
}
</style>
