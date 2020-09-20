<template>
  <q-input
    ref="quantity"
    :value="value"
    @input="$emit('input', $event)"
    type="number"
    label="Quantity"
    outlined
    class="q-pt-sm"
    :rules="[
            val => (val !== null && val !== '') || 'Please type a quantity',
            val => val > 0 || 'Please quantity can not be 0.'
          ]"
  >
    <template v-slot:append>
      <q-btn
        round
        dense
        flat
        icon="remove"
        @click="value > 1 && $emit('input', value - 1)"
      />
      <q-btn round dense flat icon="add" @click="$emit('input', value + 1)" />
    </template>
  </q-input>
</template>

<script>
export default {
  name: 'QuatityField',
  props: ['value']
}
</script>

<style>
</style>