<template>
  <div>
    <list-header bgColor="bg-primary">In the cart</list-header>
    <q-list class="bg-white" separator bordered>
      <item v-for="(item, key) in itemsCart" :key="key" :item="item" :id="key"></item>
    </q-list>
  </div>
</template>

<script>
import Item from './Item'
import ListHeader from '../Shared/ListHeader'

export default {
  props: ['itemsCart'],
  components: {
    'item': Item,
    'list-header': ListHeader
  }
}
</script>

<style>
</style>