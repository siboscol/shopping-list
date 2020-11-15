import Vue from 'vue'
import { uid } from 'quasar'
import { firebaseDb, firebaseAuth } from 'boot/firebase'
import { showErrorMessage } from 'src/utils/showErrorMessage'

const state = {
  items: {},
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
    const itemId = uid()
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
    const itemsList = firebaseDb.ref('itemsList/')

    // initial check for data
    itemsList.once(
      'value',
      snapshot => {
        commit('setItemsDownloaded', true)
      },
      error => {
        if (error) {
          showErrorMessage(error.message)
          this.$router.replace('/auth')
        }
      }
    )

    // Child Added
    itemsList.on('child_added', snapshot => {
      const item = snapshot.val()

      const payload = {
        id: snapshot.key,
        item: item
      }
      commit('addItem', payload)
    })

    // Child Changed
    itemsList.on('child_changed', snapshot => {
      const item = snapshot.val()

      const payload = {
        id: snapshot.key,
        updates: item
      }
      commit('updateItem', payload)
    })

    // Child Removed
    itemsList.on('child_removed', snapshot => {
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
  itemsFiltered: (state, getters) => {
    const itemsToAdd = getters.itemsToAdd
    const itemsFiltered = {}
    if (state.search) {
      Object.keys(itemsToAdd).forEach(id => {
        const item = itemsToAdd[id],
          itemNameLowerCase = item.name.toLowerCase(),
          searchLowerCase = state.search.toLowerCase()
        if (itemNameLowerCase.includes(searchLowerCase)) {
          itemsFiltered[id] = item
        }
      })
      return itemsFiltered
    }
    return itemsToAdd
  },
  itemsToAdd: (state, getters, rootState) => {
    const itemsFromCurrentList = rootState.items.items
    
    const totalItems = {}
    Object.keys(state.items).forEach(id => {
      if (!itemsFromCurrentList[id]) {
        const item = state.items[id]
        const defaultItem = {
          name: item.name,
          done: false,
          price: 0,
          quantity: 0,
          id
        }
        totalItems[id] = defaultItem
      }
    })

    return { ...itemsFromCurrentList, ...totalItems }
  },
  getItemById: state => id => {
    return state.items[id]
  },
  itemsFilteredTotal: (state, getters) => {
    const itemsFiltered = getters.itemsFiltered
    return Object.keys(itemsFiltered).length
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
