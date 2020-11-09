<template>
  <q-layout view="hHh Lpr fFf">
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
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'ItemLayout',
  computed: {
    headerTitle() {
      return !this.$route.params.id ? 'New' : 'Edit'
    }
  }
}
</script>
