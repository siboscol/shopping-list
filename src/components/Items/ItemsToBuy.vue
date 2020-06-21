<template>
  <div>
    <list-header bgColor="bg-primary">List to buy</list-header>
    <q-list class="bg-white" separator bordered>
      <item v-for="(item, key) in itemsToBuy" :key="key" :item="item" :id="key"></item>
    </q-list>
  </div>
</template>

<script>
import Item from './Item'
import ListHeader from '../Shared/ListHeader'

export default {
  props: ['itemsToBuy'],
  components: {
    'item': Item,
    'list-header': ListHeader
  }
}
</script>

<style>
</style>