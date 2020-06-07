<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section class="row">
        <div class="text-h6">{{titleDialog}}</div>
        <q-space />
        <q-btn flat round dense icon="close" v-close-popup />
      </q-card-section>

      <q-form @submit="submit" class="q-gutter-md">
        <q-card-section class="col q-pb-none">
          <q-input
            ref="title"
            autofocus
            v-model="editedItem.title"
            outlined
            type="text"
            label="Description"
            clearable
            clear-icon="close"
            :rules="[
            val => (val !== null && val !== '') || 'Please type a description'
          ]"
            @keyup.enter="submit"
          />
          <q-input
            ref="price"
            v-model.number="editedItem.price"
            type="number"
            label="Price"
            outlined
            class="q-pt-sm"
            clearable
            clear-icon="close"
            prefix="CHF"
            :rules="[
            val => (val !== null && val !== '') || 'Please type a price'
          ]"
            @keyup.enter="submit"
          />
          <q-input
            ref="quantity"
            v-model.number="editedItem.quantity"
            type="number"
            label="Quantity"
            outlined
            class="q-pt-sm"
            :rules="[
            val => (val !== null && val !== '') || 'Please type a quantity',
            val => val > 0 || 'Please quantity can not be 0.'
          ]"
          >
            <template v-slot:append>
              <q-btn round dense flat icon="remove" @click="addRemoveQty('remove')" />
              <q-btn round dense flat icon="add" @click="addRemoveQty('add')" />
            </template>
          </q-input>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn color="primary" flat type="reset" label="Cancel" @click="onCancelClick" />
          <q-btn color="primary" flat type="submit" label="Save" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'EditDialog',
  props: {
    titleDialog: String,
    item: Object
  },
  data() {
    return {
      editedItem: {
        title: '',
        price: 0,
        quantity: 1,
        done: false,
        ...this.item
      }
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
    addRemoveQty(type) {
      if (type === 'remove' && this.quantity > 1) {
        this.quantity = this.quantity - 1
      }
      if (type === 'add') {
        this.quantity = this.quantity + 1
      }
    },
    submit() {
      this.$refs.title.validate()
      this.$refs.price.validate()
      this.$refs.quantity.validate()
      if (
        !this.$refs.title.error ||
        !this.$refs.price.error ||
        !this.$refs.quantity.error
      ) {
        // on Save, it is REQUIRED to
        // emit "ok" event (with optional payload)
        // before hiding the QDialog

        this.$emit('ok', this.editedItem)
        // or with payload: this.$emit('ok', { ... })

        // then hiding dialog
        this.hide()
      }
    }
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