<template>
  <q-input
    ref="price"
    :value="price"
    @input="$emit('update:price', $event)"
    type="number"
    label="Price"
    outlined
    class="q-pt-sm"
    clearable
    clear-icon="close"
    prefix="CHF"
    :rules="[
            val => (val !== null && val !== '') || 'Please type a price'
          ]"
  />
</template>

<script>
export default {
  props: ['price']
}
</script>

<style>
</style>