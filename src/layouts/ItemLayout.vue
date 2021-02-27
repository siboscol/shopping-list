<template>
  <q-layout view="hHh Lpr fFf">
    <q-img src="statics/mountains.jpg" class="fixed-top hero-image"></q-img>
    <q-header class="bg-transparent">
      <q-toolbar>
        <q-btn
          flat
          round
          dense
          icon="arrow_back"
          @click="$router.push('/')"
        />
        <q-toolbar-title> {{ headerTitle }}</q-toolbar-title>
        <q-btn v-if="$route.params.id" flat @click.stop="saveItem" to="/" icon-right="done" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view ref="item" />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'ItemLayout',
  computed: {
    headerTitle() {
      let title = this.$route.name === 'addItems' ? 'Add Items' : ''
      title = this.$route.name === 'editItem' ? 'Edit Item' : title
      title = this.$route.name === 'newItem' ? 'New Item' : title
      return title
    }
  },
  methods: {
    saveItem() {
      this.$refs.item.save()
      this.$router.push('/')
    }
  }
}
</script>
