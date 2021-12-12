<template>
  <q-page>
    <form-item ref="formItem" :item="newItem" />
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'
import FormItem from './components/FormItem'

export default {
  name: 'NewItem',
  components: {
    'form-item': FormItem
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
      if (this.$refs.formItem.isValidForm()) {
        this.addItem({ item: this.newItem, list: this.$route.params.list })
      }
    }
  }
}
</script>
