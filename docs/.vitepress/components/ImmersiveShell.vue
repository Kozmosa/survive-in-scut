<template>
  <section class="immersive-shell">
    <slot />
  </section>
</template>

<style scoped>
.immersive-shell {
  width: 100%;
  height: calc(100vh - var(--navbar-height));
  overflow: hidden;
}
</style>
