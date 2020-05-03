<template>
  <q-layout view="lHh Lpr lFf">
    <q-img
      src="statics/mountains.jpg"
      class="fixed-top hero-image"
    ></q-img>
    <q-header class="bg-transparent">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-toolbar-title>
          My Shopping list
        </q-toolbar-title>
        <q-btn
          flat
          to="/auth"
          v-if="!isLoggedIn"
          dense
          icon-right="account_circle"
          label="Login"
        />
        <q-btn
          flat
          v-else
          icon-right="account_circle"
          label="Logout"
          dense
          @click="$emit('logout')"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="250"
      :breakpoint="600"
    >
      <q-scroll-area
        style="height: calc(100% - 176px); margin-top: 176px; border-right: 1px solid #ddd"
      >
        <q-list padding>
          <q-item to="/" exact clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="list" />
            </q-item-section>

            <q-item-section>
              Shopping list
            </q-item-section>
          </q-item>
          <q-item to="help" exact clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="help" />
            </q-item-section>

            <q-item-section>
              Help
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img
        class="absolute-top"
        src="statics/mountains.jpg"
        style="height: 176px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="statics/doubleb.png" />
          </q-avatar>
          <div class="text-weight-bold">Simone Boscolo Berto</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script>
import { date } from 'quasar'

export default {
  name: 'MainLayout',
  props: ['isLoggedIn'],
  data() {
    return {
      leftDrawerOpen: false
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

<style lang="scss">
.hero-image {
  height: 197px;
}
</style>