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
    },
  },
  search: ''
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
  },
  setSearch(state, value) {
    state.search = value
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
  },
  setSearch({ commit }, value) {
    commit('setSearch', value)
  }
}

const getters = {
  itemsFiltered: state => {
    const itemsFiltered = {}
    if (state.search) {
      Object.keys(state.items).forEach(id => {
        const item = state.items[id],
          itemNameLowerCase = item.name.toLowerCase(),
          searchLowerCase = state.search.toLowerCase()
        if (itemNameLowerCase.includes(searchLowerCase)) {
          itemsFiltered[id] = item
        }
      })
      return itemsFiltered
    }
    return state.items
  },
  itemsToBuy: (state, getters) => {
    const itemsFiltered = getters.itemsFiltered
    const itemsToBuy = {}
    Object.keys(itemsFiltered).forEach(id => {
      const item = itemsFiltered[id]
      if (!item.done) {
        itemsToBuy[id] = item
      }
    })
    return itemsToBuy
  },
  itemsCart: (state, getters) => {
    const itemsFiltered = getters.itemsFiltered
    const itemsCart = {}
    Object.keys(itemsFiltered).forEach(id => {
      const item = itemsFiltered[id]
      if (item.done) {
        itemsCart[id] = item
      }
    })
    return itemsCart
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
