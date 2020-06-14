<template>
  <q-banner dense inline-actions :class="bgColor" class="text-white q-px-md">
    <span class="text-bold">
      <slot></slot>
    </span>
  </q-banner>
</template>

<script>
export default {
  props: ['bgColor']
}
</script>

<style>
</style>