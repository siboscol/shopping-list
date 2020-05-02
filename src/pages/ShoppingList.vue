<template>
  <q-page class="bg-grey-3 column">
    <q-list class="bg-white move-below-bar" separator bordered>
      <q-item
        v-for="(item, index) in filterList"
        :key="index"
        v-ripple
        clickable
        @click.stop="editItem(index)"
        :class="{ 'done bg-blue-1': item.done }"
      >
        <q-item-section avatar>
          <q-checkbox v-model="item.done" color="primary" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ item.title }}</q-item-label>
          <q-item-label caption>{{ totalPrice(item) }} €</q-item-label>
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
              color="primary"
              icon="edit"
              @click.stop="editItem(index)"
            />
            <q-btn
              flat
              dense
              round
              color="primary"
              icon="delete"
              @click.stop="deleteItem(index)"
            />
          </div>
        </q-item-section>
      </q-item>
    </q-list>
    <div v-if="!list.length" class="no-items text-center q-my-md">
      <q-icon name="check" size="100px" color="primary" />
      <div class="text-h5 text-primary">
        No items
      </div>
    </div>
    <q-page-sticky expand position="top">
      <div class="col q-px-md q-py-sm bg-primary">
        <q-input
          filled
          v-model="newItem"
          placeholder="Search/Add item"
          class="col"
          dense
          bg-color="white"
          square
          @keyup.enter="addItem"
        >
          <template v-slot:after>
            <q-btn
              push
              color="white"
              text-color="primary"
              icon="add"
              @click="addItem"
            />
          </template>
        </q-input>
      </div>
      <q-toolbar class="q-px-md bg-white">
        <div class="column">
          <div>Cart Total: {{ crossedItemsTotal }} €</div>
          <div>List Total: {{ listTotal }} €</div>
        </div>
        <q-space />
        <div class="column">
          <div>Items crossed: {{ crossedItems.length }}</div>
          <div>Items in list: {{ list.length }}</div>
        </div>
      </q-toolbar>
    </q-page-sticky>
  </q-page>
</template>

<script>
import EditDialog from '../components/EditDialog'

export default {
  data() {
    return {
      newItem: '',
      list: []
    }
  },
  methods: {
    deleteItem(index) {
      this.$q
        .dialog({
          title: 'Confirm',
          message: 'Do you really want to delete it?',
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.list.splice(index, 1)
          this.$q.notify('Item deleted')
        })
    },
    editItem(index) {
      this.$q
        .dialog({
          component: EditDialog,
          item: this.list[index]
        })
        .onOk(editedItem => {
          this.list.splice(index, 1, editedItem)
          this.$q.notify('Item edited')
        })
    },
    addItem() {
      this.list.unshift({
        title: this.newItem,
        done: false,
        price: 0,
        quantity: 1
      })
      this.newItem = ''
      this.$q.notify('Item added')
    },
    getTotal(items) {
      const reducerSum = (sum, i) => sum + this.totalPrice(i)
      return items.reduce(reducerSum, 0)
    },
    totalPrice(item) {
      return item.price * item.quantity
    }
  },
  computed: {
    crossedItems() {
      return this.list.filter(i => i.done === true)
    },
    crossedItemsTotal() {
      return this.getTotal(this.crossedItems)
    },
    listTotal() {
      return this.getTotal(this.list)
    },
    filterList() {
      return this.list.filter(item => item.title.match(this.newItem))
    }
  }
}
</script>

<style lang="scss">
.done {
  .q-item__label {
    text-decoration: line-through;
    color: #bbb;
  }
}
.no-items {
  opacity: 0.5;
}
.move-below-bar {
  margin-top: 106px;
}
</style>