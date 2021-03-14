<template>
  <q-input
    ref="price"
    :value="value"
    v-select-all
    @input="$emit('input', $event)"
    type="number"
    label="Price"
    outlined
    class="q-pt-sm"
    clearable
    clear-icon="close"
    prefix="CHF"
    :rules="[val => (val !== null && val !== '') || 'Please type a price']"
  >
    <template v-slot:before>
      <q-icon name="local_offer" />
    </template>
  </q-input>
</template>

<script>
import { selectAll } from 'src/directives/select-all'

export default {
  name: 'PriceField',
  props: ['value'],
  directives: {
    selectAll
  }
}
</script>

<style></style>
