<template>
  <a :href="url" class="nav-link">
    <slot></slot>
  </a>
</template>
<script>
export default {
  props: ["url"],
};
</script>
