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

        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">
            {{item.title}}
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input v-model="editedItem.title" type="text" label="Title" />
        <q-input v-model="editedItem.price" type="number" label="Price" />
        <q-input v-model="editedItem.quantity" type="number" label="Quantity" />
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn color="primary" label="Save" @click="onOKClick" />
        <q-btn color="primary" label="Cancel" @click="onCancelClick" />
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
      editedItem: this.item
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
    }
  }
}
</script>

<style>
</style>