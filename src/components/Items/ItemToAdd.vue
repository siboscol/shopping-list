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
    <template v-if="editedItem.quantity >= 1">
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
            :icon="editedItem.quantity === 1 ? 'clear' : 'remove'"
            @click.stop="removeFromList"
          />
        </div>
      </q-item-section>
    </template>
  </q-item>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  props: ['item', 'id'],
  computed: {
    ...mapState('itemsList', ['search']),
    to() {
      return `item/edit/${this.id}`
    },
    ...mapGetters('items', ['getItemById'])
  },
  data() {
    return {
      editedItem: {}
    }
  },
  methods: {
    ...mapActions('items', ['addItem', 'updateItem', 'deleteItem']),
    removeFromList() {
      if (this.editedItem.quantity > 1) {
        this.editedItem.quantity--
        this.updateItem({
          id: this.id,
          list: this.$route.params.list,
          updates: this.editedItem
        })
      } else if (this.editedItem.quantity === 1) {
        this.editedItem.quantity--
        this.deleteItem({ list: this.$route.params.list, itemId: this.id })
      }
    },
    addToList() {
      this.editedItem.quantity++
      const itemFromList = this.getItemById(this.id)
      if (!itemFromList) {
        this.addItem({ item: this.editedItem, list: this.$route.params.list })
      } else {
        this.updateItem({
          id: this.id,
          list: this.$route.params.list,
          updates: this.editedItem
        })
      }
    }
  },
  filters: {
    searchHighlight(value, search) {
      if (search) {
        const searchRegExp = RegExp(search, 'ig')
        return (
          value &&
          value.replace(searchRegExp, match => {
            return '<span class="bg-yellow-6">' + match + '</span>'
          })
        )
      }
      return value
    }
  },
  mounted() {
    this.editedItem = Object.assign({}, this.item)
  }
}
</script>
