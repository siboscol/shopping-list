<template>
  <div id="q-app">
    <router-view :isLoggedIn="isLoggedIn" @logout="logout" />
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
    logout() {
      firebaseAuth.signOut()
    }
  },
  mounted() {
    this.getSettings()
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        this.isLoggedIn = true
        this.$q.localStorage.set('loggedIn', true)
        this.$router.push('/').catch(err => {})
      } else {
        this.isLoggedIn = false
        this.$q.localStorage.set('loggedIn', false)
        this.$router.replace('/auth').catch(err => {})
      }
    })
  }
}
</script>
