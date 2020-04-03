<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <div class="q-px-lg q-pt-xl q-md-md">
        <div class="text-h3">Shopping list</div>
        <div class="text-subtitle1">{{ todaysDate }}</div>
      </div>
      <q-img
        src="/statics/mountains.jpg"
        class="header-image absolute-top"
      ></q-img>
    </q-header>

    <q-page-container>
      <q-page padding>
        <q-card class="auth-card">
          <q-tab-panels
            v-model="panel"
            animated
            class="shadow-2 rounded-borders"
          >
            <q-tab-panel name="login">
              <login-register :panel="panel" @register="panel = 'register'" />
            </q-tab-panel>

            <q-tab-panel name="register">
              <login-register :panel="panel" @login="panel = 'login'" />
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { date } from 'quasar'
import Register from 'components/Auth/LoginRegister'

export default {
  name: 'Auth',
  components: {
    'login-register': Register
  },
  data() {
    return {
      panel: 'login'
    }
  },
  computed: {
    todaysDate() {
      const timestamp = Date.now()
      return date.formatDate(timestamp, 'dddd D MMMM')
    }
  }
}
</script>

<style lang="stylus">
.auth-card {
  max-width: 500px;
  margin: 0 auto;
}

.header-image {
  height: 100%;
  z-index: -1;
  opacity: 0.2;
  filter: grayscale(100%);
}
</style>