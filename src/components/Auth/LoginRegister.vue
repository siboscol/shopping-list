<template>
  <form @submit.prevent="submitForm()">
    <div class="row q-mb-md">
      <q-banner class="bg-grey-3 col">
        <template v-slot:avatar>
          <q-icon name="account_circle" color="primary" />
        </template>
        {{ panel | titleCase }} to access your shopping list anywhere!
      </q-banner>
    </div>
    <div class="row q-mb-md">
      <q-input
        ref="email"
        outlined
        class="col"
        v-model="formData.email"
        label="Email"
        :rules="[
          val => isValidEmail(val) || 'Please enter a valid email address.'
        ]"
        lazy-rules
      />
    </div>
    <div class="row q-mb-md">
      <q-input
        ref="password"
        outlined
        class="col"
        v-model="formData.password"
        type="password"
        label="Password"
        :rules="[
          val => val.length >= 6 || 'Password should be at least 6 characters.'
        ]"
        lazy-rules
      />
    </div>
    <div class="row">
      <q-btn
        color="primary"
        v-if="panel === 'login'"
        flat
        label="Create account"
        @click="$emit('register')"
      />
      <q-btn
        color="primary"
        v-if="panel === 'register'"
        flat
        label="Log in"
        @click="$emit('login')"
      />
      <q-space />
      <q-btn color="primary" :label="panel" type="submit" />
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Register',
  props: ['panel'],
  data() {
    return {
      formData: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions('auth', ['registerUser', 'loginUser']),
    async submitForm() {
      this.$refs.email.validate()
      this.$refs.password.validate()
      if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
        try {
          this.$q.loading.show()
          if (this.panel === 'login') {
            await this.loginUser(this.formData)
          } else {
            await this.registerUser(this.formData)
          }
          this.$q.loading.hide()
        } catch (error) {
          console.log('Error Registering', error)
        }
      }
    },
    isValidEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    },
  },
  filters: {
    titleCase(val) {
      return val.charAt(0).toUpperCase() + val.slice(1)
    }
  }
}
</script>
