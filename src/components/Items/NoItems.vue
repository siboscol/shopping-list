<template>
  <q-banner class="bg-grey-3">
    <template v-slot:avatar>
      <q-icon name="check" color="primary" />
    </template>
    No products added
    <template v-slot:action>
      <q-btn flat color="primary" label="Add product" @click="$emit('addItem')" />
    </template>
  </q-banner>
</template>

<script>
export default {}
</script>

<style>
</style>