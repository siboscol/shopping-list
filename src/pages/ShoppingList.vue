<template>
  <q-page class="bg-grey-3 column">
    <div class="row q-pa-sm bg-primary">
      <q-input
        filled
        v-model="newItem"
        placeholder="Add item"
        class="col"
        dense
        bg-color="white"
        square
        @keyup.enter="addItem"
      >
        <template v-slot:after>
          <q-btn round dense flat icon="add" @click="addItem" />
        </template>
      </q-input>
    </div>
    <q-list class="bg-white" separator bordered>
      <q-item
        v-for="(item, index) in list"
        :key="index"
        v-ripple
        clickable
        @click="item.done = !item.done"
        :class="{ 'done bg-blue-1': item.done }"
      >
        <q-item-section avatar>
          <q-checkbox class="no-pointer-events" v-model="item.done" color="primary" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ item.title }}</q-item-label>
        </q-item-section>
        <q-item-section v-if="item.done" side>
          <q-btn flat dense round color="primary" icon="delete" @click.stop="deleteItem(index)" />
        </q-item-section>
      </q-item>
    </q-list>
    <div v-if="!list.length" class="no-items absolute-center">
      <q-icon name="check" size="100px" color="primary" />
      <div class="text-h5 text-primary text-center">
        No items
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      newItem: '',
      list: []
    }
  },
  methods: {
    deleteItem(index) {
      this.$q
        .dialog({
          title: 'Confirm',
          message: 'Do you really want to delete it?',
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.list.splice(index, 1)
          this.$q.notify('Item deleted')
        })
    },
    addItem() {
      this.list.push({
        title: this.newItem,
        done: false
      })
      this.newItem = ''
    }
  }
}
</script>

<style lang="scss">
.done {
  .q-item__label {
    text-decoration: line-through;
    color: #bbb;
  }
}
.no-items {
  opacity: 0.5;
}
</style>