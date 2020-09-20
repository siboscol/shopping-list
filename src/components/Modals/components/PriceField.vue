<template>
  <q-input
    ref="price"
    v-model.number="price"
    v-select-all
    @input="$emit('input', $event)"
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
import { selectAll } from 'src/directives/select-all'

export default {
  name: 'PriceField',
  props: ['value'],
  data() {
    return {
      price: this.value
    }
  },
  directives: {
    selectAll
  }
}
</script>

<style>
</style>