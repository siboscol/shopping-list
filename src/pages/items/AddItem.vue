<template>
  <q-page>
    <form-item :item="newItem"/>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'
import formItem from './components/formItem'

export default {
  name: 'AddItem',
  components: {
    'form-item': formItem
  },
  data() {
    return {
      newItem: {
        name: this.$route.params.id || '',
        price: '',
        quantity: 1,
        done: false
      }
    }
  },
  methods: {
    ...mapActions('items', ['addItem']),
    save() {
      // TODO Here should go some validation
      this.addItem(this.newItem)
    }
  }
}
</script>
