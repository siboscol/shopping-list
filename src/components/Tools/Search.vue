<template>
  <q-input
    outlined
    v-select-all
    v-model="searchField"
    dense
    placeholder="Search"
    bg-color="white"
    color="bg-grey-7 shadow-1"
    debounce="500"
    @keyup.esc="searchField = ''"
  >
    <template v-slot:prepend>
      <q-icon name="search" />
    </template>
    <template v-slot:append>
      <q-icon
        v-if="searchField !== ''"
        name="close"
        @click="searchField = ''"
        class="cursor-pointer"
      />
    </template>
  </q-input>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { selectAll } from 'src/directives/select-all'

export default {
  directives: {
    selectAll
  },
  computed: {
    ...mapState('items', ['search']),
    searchField: {
      get() {
        return this.search
      },
      set(value) {
        this.setSearch(value)
      }
    }
  },
  methods: {
    ...mapActions('items', ['setSearch'])
  }
}
</script>

<style></style>
