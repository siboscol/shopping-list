<template>
  <q-item v-ripple clickable :class="{ 'done bg-blue-1': item.done }">
    <q-item-section avatar>
      <q-checkbox
        @input="updateItem({ id: id, list: $route.params.id, updates: { done: !item.done } })"
        :value="item.done"
        color="primary"
      />
    </q-item-section>
    <q-item-section @click.stop="$router.push(to)">
      <q-item-label
        v-html="$options.filters.searchHighlight(item.name, search)"
      />
      <q-item-label caption>{{ totalPrice }} CHF</q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-item-label caption>Qty: {{ item.quantity }}</q-item-label>
    </q-item-section>
    <q-item-section side>
      <div class="text-grey-8 q-gutter-xs">
        <q-btn flat dense round color="primary" icon="edit" :to="to" />
        <q-btn
          flat
          dense
          round
          color="red"
          icon="delete"
          @click.stop="promptToDelete"
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
    ...mapState('items', ['search']),
    totalPrice() {
      return parseFloat((this.item.price * this.item.quantity).toFixed(2))
    },
    to() {
      return `${this.$route.params.id}/item/edit/${this.id}`
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
          this.deleteItem({ list: this.$route.params.id, itemId: this.id })
        })
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
