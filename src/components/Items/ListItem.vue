<template>
  <q-item v-ripple clickable>
    <q-item-section @click="loadList()">
      <q-input
        ref="listName"
        :value="list.name"
        @input="updateList({ id: id, updates: { name: $event } })"
        @blur="isEdit = false"
        type="text"
        :readonly="!isEdit"
      />
    </q-item-section>
    <q-item-section side @click="loadList()">
      <q-item-label caption>
        {{ list.cartTotal || 0 }}/{{ list.itemsTotal || 0 }}
      </q-item-label>
      <q-item-label caption>
        {{ list.priceTotal || 0 }} CHF
      </q-item-label>
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
  props: ['list', 'id'],
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
      return `/list/${this.id}`
    }
  },
  methods: {
    ...mapActions('lists', ['deleteItem', 'updateList']),
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
          this.deleteItem(this.id)
        })
    },
    loadList() {
      if (!this.isEdit) {
        this.fbReadData(this.id)
        this.$router.push(this.to)
      }
    }
  },
  watch: {
    isEdit() {
      if (this.isEdit) {
        this.$nextTick(() => {
          this.$refs.listName.focus()
        })
      }
    }
  }
}
</script>
