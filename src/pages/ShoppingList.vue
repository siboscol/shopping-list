<template>
  <q-page>
    <div class="column" :class="{ 'bg-white': !itemsDownloaded }">
      <template v-if="itemsDownloaded">
        <div id="summaryHeader" class="q-px-md">
          <div class="row q-py-sm full-width text-white">
            <div class="column">
              <div class="text-h5">Total</div>
              <div class="text-subtitle1">{{ itemsCartTotal }} items</div>
            </div>
            <q-space />
            <div class="column">
              <div class="text-h4">{{ itemsCartPrice }}</div>
              <div class="text-subtitle3 text-right">CHF</div>
            </div>
          </div>
          <div class="q-py-sm full-width">
            <search />
          </div>
        </div>
        <q-scroll-area :style="calcHeight">
          <no-items
            v-if="!itemsToBuyTotal && !search && !settings.showItemsInOneList"
            message="No items to buy"
            @add-item="createItem()"
          />
          <no-items
            v-if="search && !itemsToBuyTotal && !itemsCartTotal"
            message="No items found."
            @add-item="createItem(search)"
          />
          <items-to-buy v-if="itemsToBuyTotal" :itemsToBuy="itemsToBuy" />
          <items-cart v-if="itemsCartTotal" :itemsCart="itemsCart" />
        </q-scroll-area>
        <div class="absolute-bottom text-center q-mb-lg no-pointer-events">
          <q-btn
            round
            color="primary"
            size="lg"
            icon="add"
            @click="createItem()"
            class="all-pointer-events"
          />
        </div>
      </template>
      <template v-else>
        <span class="absolute-center">
          <q-spinner-oval color="primary" size="3em" />
        </span>
      </template>
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
import calcHeight from "src/mixins/calcHeight";

export default {
  components: {
    'items-to-buy': ItemsToBuy,
    'items-cart': ItemsCart,
    'no-items': NoItems,
    search: Search
  },
  mixins: [calcHeight],
  methods: {
    ...mapActions('items', ['addItem', 'setSearch']),
    createItem(nameItem) {
      this.$q
        .dialog({
          component: AddDialog,
          name: nameItem,
          titleDialog: 'Add item'
        })
        .onOk(newItem => {
          this.addItem(newItem)
          if (nameItem) {
            this.setSearch('')
          }
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
    ...mapState('items', ['search', 'itemsDownloaded']),
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
</style>