import Vue from 'vue'
import { uid } from 'quasar'
import { storage } from 'firebase'
import store from '.'

const state = {
  items: {
    // 'id1': {
    //   title: 'pippo',
    //   done: false,
    //   price: '',
    //   quantity: 1
    // },
    // 'id2': {
    //   title: 'pluto',
    //   done: false,
    //   price: 2,
    //   quantity: 3
    // },
    // 'id3': {
    //   title: 'paperino',
    //   done: false,
    //   price: '',
    //   quantity: 1
    // }
  }
}

const mutations = {
  updateItem(state, payload) {
    Object.assign(state.items[payload.id], payload.updates)
  },
  deleteItem(state, id) {
    Vue.delete(state.items, id)
  },
  addItem(state, payload) {
    Vue.set(state.items, payload.id, payload.item)
  }
}

const actions = {
  updateItem({ commit }, payload) {
    commit('updateItem', payload)
  },
  deleteItem({ commit }, id) {
    commit('deleteItem', id)
  },
  addItem({ commit }, item) {
    const itemId = uid()
    const payload = {
      id: itemId,
      item: item
    }
    commit('addItem', payload)
  }
}

const getters = {
  items: state => {
    return state.items
  },
  itemsList: state => {
    return Object.keys(state.items).map(item => state.items[item])
  }
}

export default {
  namespace: true,
  state,
  mutations,
  actions,
  getters
}
