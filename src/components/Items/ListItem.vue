<template>
  <q-item v-ripple clickable>
    <q-item-section @click="loadList()">
      <q-input
        :autofocus="!isEdit"
        :value="list.name"
        @input="$emit('input', $event)"
        type="text"
        :readonly="!isEdit"
        :borderless="!isEdit"
      />
    </q-item-section>
    <q-item-section side>
      <q-item-label caption
        >{{ list.quantity }}/{{ list.quantity }}</q-item-label
      >
    </q-item-section>
    <q-item-section side>
      <div class="text-grey-8 row q-gutter-xs">
        <q-btn
          flat
          dense
          round
          color="primary"
          :icon="isEdit ? 'done' : 'edit'"
          @click.stop="isEdit = !isEdit"
        />
        <q-btn
          flat
          dense
          round
          color="red"
          icon="delete"
          @click.stop="promptToDelete"
        />
      </div>
    </q-item-section>
  </q-item>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  props: ['list'],
  data() {
    return {
      isEdit: false
    }
  },
  computed: {
    ...mapState('items', ['search']),
    totalPrice() {
      return parseFloat((this.list.price * this.list.quantity).toFixed(2))
    },
    to() {
      return `/list/${this.list.id}`
    }
  },
  methods: {
    ...mapActions('lists', ['deleteItem']),
    ...mapActions('items', ['fbReadData']),
    promptToDelete() {
      this.$q
        .dialog({
          title: 'Confirm',
          message: 'Do you really want to delete it?',
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.deleteItem(this.list.id)
        })
    },
    loadList() {
       this.fbReadData(this.list.id)
      this.$router.push(this.to)
    }
  }
}
</script>
