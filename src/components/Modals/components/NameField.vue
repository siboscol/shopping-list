<template>
  <q-input
    ref="name"
    autofocus
    :value="name"
    @input="$emit('update:name', $event)"
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
export default {
  props: ['name']
}
</script>

<style>
</style>