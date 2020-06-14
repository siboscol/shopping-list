import Vue from 'vue'
import { uid } from 'quasar'
import { storage } from 'firebase'
import store from '.'

const state = {
  items: {
    'id1': {
      name: 'pippo',
      done: false,
      price: 0,
      quantity: 1
    },
    'id2': {
      name: 'pluto',
      done: false,
      price: 2,
      quantity: 3
    },
    'id3': {
      name: 'paperino',
      done: false,
      price: 0,
      quantity: 1
    }
  },
  search: 'pippo'
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
  itemsToBuy: state => {
    const itemsToBuy = {}
    Object.keys(state.items).forEach(id => {
      const item = state.items[id]
      if (!item.done) {
        itemsToBuy[id] = item
      }
    })
    return itemsToBuy
  },
  itemsCart: state => {
    const itemsCart = {}
    Object.keys(state.items).forEach(id => {
      const item = state.items[id]
      if (item.done) {
        itemsCart[id] = item
      }
    })
    return itemsCart
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
