<template>
  <q-page class="column move-below-bar">
    <no-items v-if="!itemsToBuyTotal" @addItem="createItem" />
    <items-to-buy v-else :itemsToBuy="itemsToBuy" />
    <items-cart v-if="itemsCartTotal" :itemsCart="itemsCart" />
    <div class="absolute-bottom text-center q-mb-lg">
      <q-btn round color="primary" size="lg" icon="add" @click="createItem" />
    </div>
    <q-page-sticky expand position="top" class="q-px-md">
      <div class="row q-py-sm full-width text-white">
        <div class="column">
          <div class="text-h5">Total</div>
          <div class="text-subtitle1">{{ itemsToBuyTotal }} items</div>
        </div>
        <q-space />
        <div class="column">
          <div class="text-h4">{{ itemsToBuyPrice }}</div>
          <div class="text-subtitle3 text-right">CHF</div>
        </div>
      </div>
      <div class="q-py-sm full-width">
        <search />
      </div>
    </q-page-sticky>
  </q-page>
</template>

<script>
import ItemsToBuy from '../components/Items/ItemsToBuy'
import ItemsCart from '../components/Items/ItemsCart'
import NoItems from '../components/Items/NoItems'
import AddDialog from '../components/Modals/AddDialog'
import Search from '../components/Tools/Search'
import { mapGetters, mapActions } from 'vuex'
import ItemsToBuyVue from '../components/Items/ItemsToBuy.vue'

export default {
  components: {
    'items-to-buy': ItemsToBuy,
    'items-cart': ItemsCart,
    'no-items': NoItems,
    'search': Search
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
          name: this.newItem,
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
          component: AddDialog,
          titleDialog: 'Add item'
        })
        .onOk(newItem => {
          this.addItem(newItem)
          this.$q.notify('Item added')
        })
    },
    itemsPriceTotal(items) {
      const reducerSum = (sum, i) => sum + this.totalPrice(i)
      const itemsValues = Object.values(items)
      return Math.round(itemsValues.reduce(reducerSum, 0) * 100) / 100
    },
    totalPrice(item) {
      return item.price * item.quantity
    },
    itemsNumber(items) {
      if (!items) {
        return 0
      }
      return Object.keys(items).length
    }
  },
  computed: {
    ...mapGetters({
      itemsCart: 'itemsCart',
      itemsToBuy: 'itemsToBuy'
    }),
    itemsCartTotal() {
      return this.itemsNumber(this.itemsCart)
    },
    itemsCartPrice() {
      return this.itemsPriceTotal(this.itemsCart)
    },
    itemsToBuyTotal() {
      return this.itemsNumber(this.itemsToBuy)
    },
    itemsToBuyPrice() {
      return this.itemsPriceTotal(this.itemsToBuy)
    },
    filterList() {
      return Object.values(items).filter(item => item.title.match(this.newItem))
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