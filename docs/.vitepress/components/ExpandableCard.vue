<!--
  ExpandableCard — backward-compatible alias for Details.
  New code should use `<Details>` directly.
  This component applies the legacy default (defaultExpanded: true)
  and delegates all props to Details.
-->
<script setup lang="ts">
import Details from "./Details.vue";

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
