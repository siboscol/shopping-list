<template>
  <q-page class="bg-grey-3 column">
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
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          title: 'Bananas',
          done: false
        },
        {
          title: 'Apples',
          done: true
        },
        {
          title: 'Pears',
          done: false
        }
      ]
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
</style>