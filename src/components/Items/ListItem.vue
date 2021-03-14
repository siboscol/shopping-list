<template>
  <q-item v-ripple clickable>
    <q-item-section @click="loadList()">
      <q-input
        ref="listName"
        v-model="currentList.name"
        @blur="isEdit = false"
        type="text"
        :readonly="!isEdit"
      />
    </q-item-section>
    <q-item-section side>
      <q-item-label caption
        >{{ currentList.cartTotal || 0 }}/{{
          currentList.itemsTotal || 0
        }}</q-item-label
      >
      <q-item-label caption>{{ currentList.priceTotal || 0 }} CHF</q-item-label>
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
      isEdit: false,
      currentList: {}
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
          this.deleteItem(this.list.id)
        })
    },
    renameSaveList() {
      if (this.isEdit) {
        this.$nextTick(() => {
          this.$refs.listName.focus()
        })
      } else {
        this.updateList({
          id: this.currentList.id,
          updates: this.currentList
        })
      }
    },
    loadList() {
      if (!this.isEdit) {
        this.fbReadData(this.list.id)
        this.$router.push(this.to)
      }
    }
  },
  watch: {
    isEdit() {
      this.renameSaveList()
    }
  },
  mounted() {
    this.currentList = Object.assign({}, this.list)
  }
}
</script>
