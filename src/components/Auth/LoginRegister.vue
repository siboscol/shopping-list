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
        stack-label
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
        stack-label
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
        @click="goToRegister()"
      />
      <q-btn
        color="primary"
        v-if="panel === 'register'"
        flat
        label="Log in"
        @click="goToLogin()"
      />
      <q-space />
      <q-btn color="primary" flat :label="panel" type="submit" />
    </div>
  </form>
</template>

<script>
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
    submitForm() {
      this.$refs.email.validate()
      this.$refs.password.validate()
      if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
        if (this.panel === 'login') {
          console.log('Logging in')
        } else {
          console.log('Registering')
        }
      }
    },
    isValidEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    },
    goToRegister() {
      this.$emit('register')
    },
    goToLogin() {
      this.$emit('login')
    }
  },
  filters: {
    titleCase(val) {
      return val.charAt(0).toUpperCase() + val.slice(1)
    }
  }
}
</script>
