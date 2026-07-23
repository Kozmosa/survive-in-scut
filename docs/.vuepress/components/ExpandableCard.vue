<!--
  ExpandableCard — backward-compatible alias for Details (legacy VuePress).
  New code should use `<Details>` directly.
  See docs/.vitepress/components/Details.vue for the canonical implementation.
-->
<script setup lang="ts">
import Details from "../../.vitepress/components/Details.vue";

withDefaults(
  defineProps<{
    title?: string;
    defaultExpanded?: boolean;
  }>(),
  {
    title: "",
    defaultExpanded: true,
  },
);
</script>

<template>
  <Details v-bind="$props"><slot /></Details>
</template>
