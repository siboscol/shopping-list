<template>
  <q-page class="bg-grey-3 column">
    <q-list v-for="item in list" :key="item.title" class="bg-white">
      <q-item v-ripple>
        <q-item-section avatar>
          <q-checkbox v-model="primary" color="primary" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{item.title}}</q-item-label>
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
          done: false
        },
        {
          title: 'Pears',
          done: false
        }
      ]
    }
  }
}
</script>
