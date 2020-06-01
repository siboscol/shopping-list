<template>
  <q-item
    v-ripple
    clickable
    @click.stop="$emit('edit', id)"
    :class="{ 'done bg-blue-1': item.done }"
  >
    <q-item-section avatar>
      <q-checkbox v-model="item.done" color="primary" />
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ item.title }} {{ id }}</q-item-label>
      <q-item-label caption>{{ totalPrice }} CHF</q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-item-label caption>Qty: {{ item.quantity }}</q-item-label>
    </q-item-section>
    <q-item-section side>
      <div class="text-grey-8 q-gutter-xs">
        <q-btn
          flat
          dense
          round
          color="primary"
          icon="edit"
          @click.stop="$emit('edit', id)"
        />
        <q-btn
          flat
          dense
          round
          color="primary"
          icon="delete"
          @click.stop="$emit('delete', id)"
        />
      </div>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  props: ['item', 'id'],
  computed: {
    totalPrice() {
      return this.item.price * this.item.quantity
    }
  }
}
</script>
