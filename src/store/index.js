import Vue from 'vue'
import Vuex from 'vuex'

import items from './store-items'
import itemsList from './store-items-list'
import lists from "./store-lists";
import settings from './store-settings'
import auth from './store-auth'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      items,
      itemsList,
      lists,
      settings,
      auth
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}