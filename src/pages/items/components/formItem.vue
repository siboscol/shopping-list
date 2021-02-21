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
    <!-- <q-btn color="primary" flat label="Cancel" />
    <q-btn color="primary" :disable="!item.name" push label="Save" /> -->
  </div>
</template>

<script>
import NameField from 'src/components/Modals/components/NameField'
import PriceField from 'src/components/Modals/components/PriceField'
import QuantityField from 'src/components/Modals/components/QuantityField'

export default {
  name: 'formItem',
  props: ['item'],
  components: {
    'name-field': NameField,
    'price-field': PriceField,
    'quantity-field': QuantityField
  }
}
</script>

<style>
</style>