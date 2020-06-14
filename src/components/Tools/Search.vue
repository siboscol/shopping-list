<template>
  <q-input outlined bottom-slots v-model="searchField" label="Search" dense bg-color="white">
    <template v-slot:append>
      <q-icon v-if="searchField !== ''" name="close" @click="searchField = ''" class="cursor-pointer" />
      <q-icon name="search" />
    </template>
  </q-input>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      searchField: state => state.items.search
    })
  }
}
</script>

<style>
</style>