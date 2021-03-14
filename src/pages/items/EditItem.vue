<template>
  <q-page>
    <form-item ref="formItem" :item="item" />
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import FormItem from './components/FormItem'

export default {
  name: 'EditItem',
  components: {
    'form-item': FormItem
  },
  data() {
    return {
      item: {}
    }
  },
  computed: {
    ...mapGetters('items', ['getItemById'])
  },
  methods: {
    ...mapActions('items', ['updateItem']),
    save() {
      if (this.$refs.formItem.isValidForm()) {
        this.updateItem({
          id: this.$route.params.id,
          list: this.$route.params.list,
          updates: this.item
        })
      }
    }
  },
  mounted() {
    const itemFromStore = this.getItemById(this.$route.params.id)
    this.item = Object.assign({}, itemFromStore)
  }
}
</script>
