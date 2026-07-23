<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useLocaleText } from "../composables/useLocaleText";

const SCROLL_EDGE_THRESHOLD = 64;

const canScrollUp = ref(false);
const canScrollDown = ref(false);

const labelUp = useLocaleText("向上滚动一屏", "Scroll up one screen");
const labelDown = useLocaleText("向下滚动一屏", "Scroll down one screen");

let ticking = false;

function updateVisibility() {
  const scrollY = window.scrollY;
  const maxScrollY = document.documentElement.scrollHeight - window.innerHeight;
  canScrollUp.value = scrollY > SCROLL_EDGE_THRESHOLD;
  canScrollDown.value = scrollY < maxScrollY - SCROLL_EDGE_THRESHOLD;
}

function onScroll() {
  if (ticking) return;
  ticking = true;
  window.requestAnimationFrame(() => {
    updateVisibility();
    ticking = false;
  });
}

function scrollByOneScreen(direction: 1 | -1) {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  window.scrollBy({
    top: direction * window.innerHeight,
    behavior: reducedMotion ? "auto" : "smooth",
  });
}

onMounted(() => {
  updateVisibility();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("resize", onScroll);
});
</script>

<template>
  <div class="scroll-pager">
    <button
      type="button"
      class="scroll-pager-button"
      :class="{ 'is-hidden': !canScrollUp }"
      :aria-label="labelUp"
      :disabled="!canScrollUp"
      @click="scrollByOneScreen(-1)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="m18 15-6-6-6 6" />
      </svg>
    </button>
    <button
      type="button"
      class="scroll-pager-button"
      :class="{ 'is-hidden': !canScrollDown }"
      :aria-label="labelDown"
      :disabled="!canScrollDown"
      @click="scrollByOneScreen(1)"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
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
    </button>
  </div>
</template>

<style scoped>
.scroll-pager {
  position: fixed;
  right: 16px;
  bottom: calc(72px + env(safe-area-inset-bottom, 0px));
  z-index: 30;
  display: none;
  flex-direction: column;
  gap: 12px;
  pointer-events: none;
}

.scroll-pager-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 50%;
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  box-shadow: var(--vp-shadow-2);
  opacity: 0.9;
  cursor: pointer;
  user-select: none;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  pointer-events: auto;
  transition:
    opacity 0.25s ease,
    transform 0.15s ease;
}

.scroll-pager-button:active {
  transform: scale(0.92);
}

.scroll-pager-button.is-hidden {
  opacity: 0;
  pointer-events: none;
}

@media (max-width: 768px) {
  .scroll-pager {
    display: flex;
  }
}
</style>
