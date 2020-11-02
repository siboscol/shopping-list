<template>
  <q-page padding>
    <name-field ref="nameField" v-model="editedItem.name" />
    <div class="row">
      <price-field
        class="col-6 q-pr-sm"
        ref="priceField"
        v-model="editedItem.price"
      />
      <quantity-field
        class="col-6"
        ref="quantityField"
        v-model="editedItem.quantity"
      />
    </div>
    <q-btn color="primary" flat label="Cancel" />
    <q-btn color="primary" :disable="!editedItem.name" push label="Save" />
  </q-page>
</template>

<script>
import NameField from "src/components/Modals/components/NameField"
import PriceField from "src/components/Modals/components/PriceField"
import QuantityField from "src/components/Modals/components/QuantityField"

export default {
  name: 'AddEditItem',
  components: {
    'name-field': NameField,
    'price-field': PriceField,
    'quantity-field': QuantityField
  },
  data() {
    return {
      editedItem: {
        name: this.name || '',
        price: '',
        quantity: 1,
        done: false
      }
    }
  }
}
</script>
