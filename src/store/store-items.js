import Vue from 'vue'
import { uid } from 'quasar'
import { firebaseDb, firebaseAuth } from 'boot/firebase'
import { showErrorMessage } from 'src/utils/showErrorMessage'

const state = {
  items: {
    // 'id1': {
    //   name: 'pippo',
    //   done: false,
    //   price: 0,
    //   quantity: 1
    // },
    // 'id2': {
    //   name: 'pluto',
    //   done: false,
    //   price: 2,
    //   quantity: 3
    // },
    // 'id3': {
    //   name: 'paperino',
    //   done: false,
    //   price: 0,
    //   quantity: 1
    // },
  },
  search: '',
  itemsDownloaded: false
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
  clearItems(state) {
    state.items = {}
  },
  setSearch(state, value) {
    state.search = value
  },
  setItemsDownloaded(state, value) {
    state.itemsDownloaded = value
  }
}

const actions = {
  updateItem({ dispatch }, payload) {
    dispatch('fbUpdateItem', payload)
  },
  deleteItem({ dispatch }, id) {
    dispatch('fbDeleteItem', id)
  },
  addItem({ dispatch }, item) {
    const itemId = item.id || uid()
    const payload = {
      id: itemId,
      item: item
    }
    dispatch('fbAddItem', payload)
  },
  setSearch({ commit }, value) {
    commit('setSearch', value)
  },
  fbReadData({ commit }, value) {
    const userId = firebaseAuth.currentUser.uid
    const userItems = firebaseDb.ref('items/' + userId)

    // initial check for data
    userItems.once('value', snapshot => {
      commit('setItemsDownloaded', true)
    },  error => {
      if (error) {
        showErrorMessage(error.message)
        this.$router.replace("/auth")
      }
    })

    // Child Added
    userItems.on('child_added', snapshot => {
      const item = snapshot.val()

      const payload = {
        id: snapshot.key,
        item: item
      }
      commit('addItem', payload)
    })

    // Child Changed
    userItems.on('child_changed', snapshot => {
      const item = snapshot.val()

      const payload = {
        id: snapshot.key,
        updates: item
      }
      commit('updateItem', payload)
    })

    // Child Removed
    userItems.on('child_removed', snapshot => {
      const itemId = snapshot.key
      commit('deleteItem', itemId)
    })
  },
  fbAddItem({}, payload) {
    const userId = firebaseAuth.currentUser.uid
    const itemRef = firebaseDb.ref('items/' + userId + '/' + payload.id)
    itemRef.set(payload.item, error => {
      if (error) {
        showErrorMessage(error.message)
      }
    })
  },
  fbUpdateItem({}, payload) {
    const userId = firebaseAuth.currentUser.uid
    const itemRef = firebaseDb.ref('items/' + userId + '/' + payload.id)
    itemRef.update(payload.updates, error => {
      if (error) {
        showErrorMessage(error.message)
      }
    })
  },
  fbDeleteItem({}, itemId) {
    const userId = firebaseAuth.currentUser.uid
    const itemRef = firebaseDb.ref('items/' + userId + '/' + itemId)
    itemRef.remove(error => {
      if (error) {
        showErrorMessage(error.message)
      }
    })
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
    const itemsToBuy = Object.keys(itemsFiltered).reduce((acc, id) => {
      const item = itemsFiltered[id]
      item.id = id
      if (!item.done) {
        acc.unshift(item)
      }
      return acc
    }, [])
    return itemsToBuy
  },
  itemsCart: (state, getters) => {
    const itemsFiltered = getters.itemsFiltered
    const itemsCart = Object.keys(itemsFiltered).reduce((acc, id) => {
      const item = itemsFiltered[id]
      item.id = id
      if (item.done) {
        acc.unshift(item)
      }
      return acc
    }, [])
    return itemsCart
  },
  getItemById: (state) => (id) => {
    return state.items[id]
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
