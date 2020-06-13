<template>
  <q-item v-ripple clickable @click.stop="editItem" :class="{ 'done bg-blue-1': item.done }">
    <q-item-section avatar>
      <q-checkbox
        @input="updateItem({id: id, updates: { done: !item.done}})"
        :value="item.done"
        color="primary"
      />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ item.name }}</q-item-label>
      <q-item-label caption>{{ totalPrice }} CHF</q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-item-label caption>Qty: {{ item.quantity }}</q-item-label>
    </q-item-section>
    <q-item-section side>
      <div class="text-grey-8 q-gutter-xs">
        <q-btn flat dense round color="primary" icon="edit" @click.stop="editItem" />
        <q-btn flat dense round color="red" icon="delete" @click.stop="promptToDelete" />
      </div>
    </q-item-section>
  </q-item>
</template>

<script>
import EditDialog from '../Modals/EditDialog'
import { mapActions } from 'vuex'

export default {
  props: ['item', 'id'],
  computed: {
    totalPrice() {
      return this.item.price * this.item.quantity
    }
  },
  methods: {
    ...mapActions(['updateItem', 'deleteItem']),
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
          this.$q.notify('Item deleted')
        })
    },
    editItem() {
      this.$q
        .dialog({
          component: EditDialog,
          item: this.item,
          id: this.id
        })
        .onOk(editedItem => {
          this.updateItem({ id: this.id, updates: editedItem })
          this.$q.notify('Item edited')
        })
    }
  }
}
</script>
