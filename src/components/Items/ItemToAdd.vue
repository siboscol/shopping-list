<template>
  <q-item v-ripple>
    <q-item-section avatar>
      <q-btn
        flat
        dense
        round
        color="primary"
        icon="add"
        @click.stop="addToList"
      />
    </q-item-section>
    <q-item-section @click="$router.push(to)">
      <q-item-label
        v-html="$options.filters.searchHighlight(editedItem.name, search)"
      />
    </q-item-section>
    <q-item-section side>
      <q-item-label caption>Qty: {{ editedItem.quantity }}</q-item-label>
    </q-item-section>
    <q-item-section side>
      <div class="text-grey-8 q-gutter-xs">
        <q-btn
          flat
          dense
          round
          color="red"
          icon="remove"
          @click.stop="removeFromList"
        />
      </div>
    </q-item-section>
  </q-item>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  props: ['item', 'id'],
  computed: {
    ...mapState('itemsList', ['search']),
    to() {
      return `/item/${this.id}`
    }
  },
  data() {
    return {
      editedItem: {}
    }
  },
  methods: {
    ...mapActions('itemsList', ['updateItem']),
    removeFromList() {
      if (this.editedItem.quantity > 0) {
        this.editedItem.quantity--
      }
    },
    addToList() {
      this.editedItem.quantity++
      // this.updateItem({ id: this.id, updates: this.editedItem })
    }
  },
  filters: {
    searchHighlight(value, search) {
      if (search) {
        const searchRegExp = RegExp(search, 'ig')
        return value && value.replace(searchRegExp, match => {
          return '<span class="bg-yellow-6">' + match + '</span>'
        })
      }
      return value
    }
  },
  mounted() {
    this.editedItem = Object.assign({}, this.item)
  }
}
</script>
