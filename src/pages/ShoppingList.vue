<template>
  <q-page class="column">
    <q-list class="bg-white move-below-bar" separator bordered>
      <item v-for="(item, key) in items" :key="key" :item="item" :id="key"></item>
    </q-list>
    <div v-if="!list.length" class="no-items text-center q-my-md">
      <q-icon name="check" size="100px" color="primary" />
      <div class="text-h5 text-primary">No items</div>
    </div>
    <div class="absolute-bottom text-center q-mb-lg">
      <q-btn round color="primary" size="lg" icon="add" @click="createItem" />
    </div>
    <q-page-sticky expand position="top" class="q-px-md">
      <div class="row q-py-sm full-width text-white">
        <div class="column">
          <div class="text-h5">Total</div>
          <div class="text-subtitle1">{{ list.length }} items</div>
        </div>
        <q-space />
        <div class="column">
          <div class="text-h4">{{ listTotal }}</div>
          <div class="text-subtitle3 text-right">CHF</div>
        </div>
      </div>
      <div class="row q-py-sm full-width">
        <q-input
          v-model="newItem"
          placeholder="Search/Add item"
          class="col"
          dense
          bg-color="white"
          outlined
          @keyup.enter="createItem"
        >
          <template v-slot:after>
            <q-btn push color="white" text-color="primary" icon="add" @click="createItem" />
          </template>
        </q-input>
      </div>
    </q-page-sticky>
  </q-page>
</template>

<script>
import Item from '../components/Items/Item'
import EditDialog from '../components/Modals/EditDialog'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    item: Item
  },
  data() {
    return {
      newItem: ''
    }
  },
  methods: {
    ...mapActions(['addItem']),
    createItem() {
      if (this.newItem === '') {
        this.promptToAddItem()
      } else {
        const newItem = {
          title: this.newItem,
          done: false,
          price: 0,
          quantity: 1
        }
        this.addItem(newItem)
        this.$q.notify('Item added')
      }
      this.newItem = ''
    },
    promptToAddItem() {
      this.$q
        .dialog({
          component: EditDialog,
          titleDialog: 'Add item'
        })
        .onOk(newItem => {
          this.addItem(newItem)
          this.$q.notify('Item added')
        })
    },
    getTotal(items) {
      const reducerSum = (sum, i) => sum + this.totalPrice(i)
      return Math.round(items.reduce(reducerSum, 0) * 100) / 100
    },
    totalPrice(item) {
      return item.price * item.quantity
    }
  },
  computed: {
    ...mapGetters({
      items: 'items',
      list: 'itemsList'
    }),
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
  margin-top: 147px;
}
</style>