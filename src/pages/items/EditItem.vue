<template>
  <q-page>
    <form-item :item="item" />
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import formItem from './components/formItem'

export default {
  name: 'EditItem',
  components: {
    'form-item': formItem
  },
  data() {
    return {
      item: {}
    }
  },
  computed: {
    ...mapGetters('items', ['getItemById']),
  },
  methods: {
    ...mapActions('items', ['updateItem']),
    save() {
      // TODO Here should go some validation
      this.updateItem({ id: this.$route.params.id, updates: this.item })
    }
  },
  mounted() {
    const itemFromStore = this.getItemById(this.$route.params.id)
    this.item = Object.assign({}, itemFromStore)
  }
}
</script>
