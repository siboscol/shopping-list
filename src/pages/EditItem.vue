<template>
  <q-page>
    <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg">
      <div class="absolute-bottom">
        <div class="text-h6">{{ item.name }}</div>
      </div>
    </q-img>

    <div class="q-pa-md">
      <div class="column">
        <price-field ref="priceField" v-model="item.price" />
        <quantity-field ref="quantityField" v-model="item.quantity" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import PriceField from '../components/Modals/components/PriceField'
import QuantityField from '../components/Modals/components/QuantityFIeld'

export default {
  name: 'EditItem',
  components: {
    'price-field': PriceField,
    'quantity-field': QuantityField
  },
  computed: {
    ...mapGetters('items', ['getItemById']),
    item() {
      return this.getItemById(this.$route.params.id)
    }
  }
}
</script>
