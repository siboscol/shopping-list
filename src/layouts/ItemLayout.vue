<template>
  <q-layout view="hHh Lpr fFf">
    <!-- Be sure to play with the Layout demo on docs -->
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          round
          dense
          icon="arrow_back"
          @click="$router.push('/')"
        />
        <q-toolbar-title> {{ headerTitle }} Item </q-toolbar-title>
        <q-btn flat to="/" icon-right="done" />
      </q-toolbar>

      <q-tabs>
        <q-route-tab icon="search" to="search" label="Search" exact />
        <q-route-tab
          icon="assignment"
          to="desc"
          label="Description"
          exact
        />
      </q-tabs>
    </q-header>

    <q-page-container>
      <!-- This is where pages get injected -->
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'ItemLayout',
  computed: {
    headerTitle() {
      return this.$route.params.id === 'new' ? 'New' : 'Edit'
    }
  }
}
</script>
