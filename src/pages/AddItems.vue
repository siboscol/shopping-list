<template>
  <q-page>
    <q-toolbar class="bg-primary text-white bg-transparent">
      <div class="q-py-sm full-width">
        <Search />
      </div>
    </q-toolbar>
    <template v-if="itemsDownloaded">
      <q-list
        v-if="itemsFilteredTotal"
        class="bg-white scroll"
        separator
        bordered
        :style="scrollAreaHeight"
      >
        <Item
          v-for="(item, key) in itemsFiltered"
          :key="key"
          :item="item"
          :id="item.id"
        />
      </q-list>
      <NoItems
        v-if="search && !itemsFilteredTotal"
        message="No items found."
        @add-item="createItem(search)"
      />
    </template>
    <template v-else>
      <span class="absolute-center">
        <q-spinner-oval color="primary" size="3em" />
      </span>
    </template>
  </q-page>
</template>

<script>
import Search from '../components/Tools/SearchToAdd'
import Item from '../components/Items/ItemToAdd'
import NoItems from '../components/Items/NoItems'
import { mapGetters, mapState, mapActions } from 'vuex'

export default {
  name: 'AddItems',
  components: { Search, Item, NoItems },
  data() {
    return {
      scrollAreaHeight: {}
    }
  },
  computed: {
    ...mapState('itemsList', ['search', 'itemsDownloaded']),
    ...mapGetters('itemsList', {
      itemsFiltered: 'itemsFiltered',
      itemsFilteredTotal: 'itemsFilteredTotal'
    })
  },
  methods: {
    ...mapActions('itemsList', ['setSearch']),
    createItem(nameItem) {
      console.log('Item to create', nameItem)
    }
  },
  mounted() {
    this.$nextTick(() => {
      const offsetHeight =
        document.getElementsByTagName('header')[0].offsetHeight +
        document.getElementsByClassName('q-toolbar')[1].offsetHeight
      let style = {
        height: `calc(100vh - ${offsetHeight}px)`
      }
      this.scrollAreaHeight = style
    })
    this.setSearch('')
  }
}
</script>
