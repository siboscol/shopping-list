<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { firebaseAuth } from 'boot/firebase'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  data() {
    return {
      isLoggedIn: false
    }
  },
  methods: {
    ...mapActions('settings', ['getSettings']),
    ...mapActions('auth', ['handleAuthStateChange'])
  },
  mounted() {
    this.getSettings()
    this.handleAuthStateChange()
  }
}
</script>
