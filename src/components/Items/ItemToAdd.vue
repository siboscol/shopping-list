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
        v-html="$options.filters.searchHighlight(item.name, search)"
      />
    </q-item-section>
    <q-item-section side>
      <q-item-label caption>Qty: {{ item.quantity }}</q-item-label>
    </q-item-section>
    <q-item-section side>
      <div class="text-grey-8 q-gutter-xs">
        <q-btn
          flat
          dense
          round
          color="red"
          icon="remove"
          @click.stop="promptToDelete"
        />
      </div>
    </q-item-section>
  </q-item>
</template>

<script>
import EditDialog from '../Modals/EditDialog'
import { mapActions, mapState } from 'vuex'

export default {
  props: ['item', 'id'],
  computed: {
    ...mapState('items', ['search']),
    totalPrice() {
      return parseFloat((this.item.price * this.item.quantity).toFixed(2))
    },
    to() {
      return `/item/${this.id}`
    }
  },
  methods: {
    ...mapActions('items', ['updateItem', 'deleteItem']),
    promptToDelete() {
      this.$q
        .dialog({
          title: 'Confirm',
          message: 'Do you really want to delete it?',
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.deleteItem(this.id)
        })
    },
    addToList() {
      console.log('Item added')
    }
  },
  filters: {
    searchHighlight(value, search) {
      if (search) {
        const searchRegExp = RegExp(search, 'ig')
        return value.replace(searchRegExp, match => {
          return '<span class="bg-yellow-6">' + match + '</span>'
        })
      }
      return value
    }
  }
}
</script>
