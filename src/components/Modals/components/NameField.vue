<template>
  <q-input
    ref="name"
    autofocus
    v-select-all
    :value="value"
    @input="$emit('input', $event)"
    outlined
    type="text"
    label="Name"
    clearable
    clear-icon="close"
    :rules="[
      val => (val !== null && val !== '') || 'Please type a name for the item'
    ]"
  />
</template>

<script>
import { selectAll } from 'src/directives/select-all'

export default {
  props: ['value'],
  directives: {
    selectAll
  }
}
</script>

<style>
</style>