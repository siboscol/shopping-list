<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <header-field>Edit Item</header-field>
      <form @submit="submit" class="q-gutter-md" novalidate="true">
        <q-card-section class="col q-pb-none">
          <name-field ref="nameField" v-model="editedItem.name" />
          <price-field ref="priceField" v-model="editedItem.price" />
          <quantity-field ref="quantityField" v-model="editedItem.quantity" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn color="primary" flat label="Cancel" @click="onCancelClick" />
          <q-btn color="primary" flat type="submit" label="Save" />
        </q-card-actions>
      </form>
    </q-card>
  </q-dialog>
</template>

<script>
import HeaderField from './components/HeaderField'
import NameField from './components/NameField'
import PriceField from './components/PriceField'
import QuantityField from './components/QuantityFIeld'

export default {
  name: 'EditDialog',
  components: {
    'header-field': HeaderField,
    'name-field': NameField,
    'price-field': PriceField,
    'quantity-field': QuantityField
  },
  props: {
    item: Object,
    id: String
  },
  data() {
    return {
      editedItem: {}
    }
  },
  methods: {
    // following method is REQUIRED
    // (don't change its name --> "show")
    show() {
      this.$refs.dialog.show()
    },
    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide() {
      this.$refs.dialog.hide()
    },
    onDialogHide() {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide')
    },
    onCancelClick() {
      // we just need to hide dialog
      this.hide()
    },
    submit(e) {
      this.$refs.nameField.$refs.name.validate()
      this.$refs.priceField.$refs.price.validate()
      this.$refs.quantityField.$refs.quantity.validate()
      if (
        !this.$refs.nameField.$refs.name.hasError ||
        !this.$refs.priceField.$refs.price.hasError ||
        !this.$refs.quantityField.$refs.quantity.hasError
      ) {
        // To avoid page reload
        e.preventDefault();
        // on Save, it is REQUIRED to
        // emit "ok" event (with optional payload)
        // before hiding the QDialog

        this.$emit('ok', this.editedItem)
        // or with payload: this.$emit('ok', { ... })

        // then hiding dialog
        this.hide()
      }
    }
  },
  mounted() {
    this.editedItem = Object.assign({}, this.item)
  }
}
</script>

<style>
input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
}
</style>