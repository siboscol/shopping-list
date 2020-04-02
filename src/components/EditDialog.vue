<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" />

      <q-card-section>
        <q-btn
          fab
          color="primary"
          icon="camera_alt"
          class="absolute"
          style="top: 0; right: 12px; transform: translateY(-50%);"
        />

        <div class="row ">
            <q-input v-model="editedItem.title" class="col" type="text" label="Title" />
        </div>
      </q-card-section>

      <q-card-section class="row no-wrap q-pt-none">
        <q-input
          v-model.number="editedItem.price"
          class="col-6 .col-md-auto q-pr-xs"
          type="number"
          label="Price"
          filled
          prefix="€"
          :rules="[
            val => (val !== null && val !== '') || 'Please type a price',
            val => val > 0 || 'Please price can not be 0.'
          ]"
        />
        <q-input
          v-model.number="editedItem.quantity"
          type="number"
          label="Quantity"
          filled
          class="col-6 q-pl-xs"
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
        <q-btn color="primary" flat label="Cancel" @click="onCancelClick" />
        <q-btn color="primary" flat label="Save" @click="onOKClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'EditDialog',
  props: {
    item: Object
  },
  data() {
    return {
      editedItem: {...this.item}
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
    onOKClick() {
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      this.$emit('ok', this.editedItem)
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      this.hide()
    },
    onCancelClick() {
      // we just need to hide dialog
      this.hide()
    },
    addRemoveQty(type) {
      if (type === 'remove' && this.editedItem.quantity > 1) {
        this.editedItem.quantity = this.editedItem.quantity - 1
      }
      if (type === 'add') {
        this.editedItem.quantity = this.editedItem.quantity + 1
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