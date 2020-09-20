<template>
  <q-page>
    <div class="absolute full-width full-height column">
      <div class="q-px-md">
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
      </div>
      <q-scroll-area class="q-scroll-area-items">
        <no-items
          v-if="!itemsToBuyTotal && !search && !settings.showItemsInOneList"
          @addItem="createItem"
        />
        <p v-if="search && !itemsToBuyTotal && !itemsCartTotal" class="q-pa-md">No search results.</p>
        <items-to-buy v-if="itemsToBuyTotal" :itemsToBuy="itemsToBuy" />
        <items-cart v-if="itemsCartTotal" :itemsCart="itemsCart" />
      </q-scroll-area>
      <div class="absolute-bottom text-center q-mb-lg no-pointer-events">
        <q-btn
          round
          color="primary"
          size="lg"
          icon="add"
          @click="createItem"
          class="all-pointer-events"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import ItemsToBuy from '../components/Items/ItemsToBuy'
import ItemsCart from '../components/Items/ItemsCart'
import NoItems from '../components/Items/NoItems'
import AddDialog from '../components/Modals/AddDialog'
import Search from '../components/Tools/Search'
import { mapGetters, mapActions, mapState } from 'vuex'
import ItemsToBuyVue from '../components/Items/ItemsToBuy.vue'

export default {
  components: {
    'items-to-buy': ItemsToBuy,
    'items-cart': ItemsCart,
    'no-items': NoItems,
    search: Search
  },
  methods: {
    ...mapActions('items', ['addItem']),
    createItem() {
      this.$q
        .dialog({
          component: AddDialog,
          titleDialog: 'Add item'
        })
        .onOk(newItem => {
          this.addItem(newItem)
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
    ...mapState('items', ['search']),
    ...mapGetters('items', {
      itemsCart: 'itemsCart',
      itemsToBuy: 'itemsToBuy'
    }),
    ...mapGetters('settings', ['settings']),
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
.q-scroll-area-items {
  display: flex;
  flex-grow: 1;
}
</style>