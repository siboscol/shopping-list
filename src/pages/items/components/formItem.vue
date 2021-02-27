<template>
  <div>
    <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" />

    <div class="q-pa-md">
      <div class="column">
        <name-field ref="nameField" v-model="item.name" />
        <price-field ref="priceField" v-model="item.price" />
        <quantity-field ref="quantityField" v-model="item.quantity" />
      </div>
    </div>
  </div>
</template>

<script>
import NameField from 'src/components/Modals/components/NameField'
import PriceField from 'src/components/Modals/components/PriceField'
import QuantityField from 'src/components/Modals/components/QuantityField'

export default {
  name: 'FormItem',
  props: ['item'],
  components: {
    'name-field': NameField,
    'price-field': PriceField,
    'quantity-field': QuantityField
  },
  methods: {
    isValidForm() {
      this.$refs.nameField.$refs.name.validate()
      this.$refs.priceField.$refs.price.validate()
      this.$refs.quantityField.$refs.quantity.validate()

      if (!this.$refs.nameField.$refs.name.hasError) {
        if (
          this.item.price !== '' &&
          this.item.price !== '0' &&
          !this.item.done
        ) {
          this.item.done = !this.item.done
        }
        return true
      }
      return false
    }
  }
}
</script>

<style>
</style>