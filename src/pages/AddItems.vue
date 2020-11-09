<template>
  <q-page>
    <q-toolbar class="bg-primary text-white">
      <div class="q-py-sm full-width">
        <Search />
      </div>
    </q-toolbar>
    <q-list class="bg-white" separator bordered>
      <Item
        v-for="(item, key) in itemsToBuy"
        :key="key"
        :item="item"
        :id="item.id"
      />
    </q-list>
  </q-page>
</template>

<script>
import Search from '../components/Tools/Search'
import Item from '../components/Items/ItemToAdd'
import { mapGetters } from 'vuex'

export default {
  name: 'AddItems',
  components: { Search, Item },
  computed: {
    ...mapGetters('items', {
      itemsToBuy: 'itemsToBuy'
    })
  }
}
</script>
