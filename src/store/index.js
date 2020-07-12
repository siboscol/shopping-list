import Vue from 'vue'
import Vuex from 'vuex'

import items from './store-items'
import settings from './store-settings'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      items,
      settings
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}