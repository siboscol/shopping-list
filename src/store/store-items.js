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
  itemsDownloaded: false,
  listName: ''
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
  },
  setListName(state, value) {
    state.listName = value
  }
}

const actions = {
  updateItem({ dispatch }, payload) {
    dispatch('fbUpdateItem', payload)
  },
  deleteItem({ dispatch }, payload) {
    dispatch('fbDeleteItem', payload)
  },
  addItem({ dispatch }, { list, item }) {
    const itemId = item.id || uid()
    const payload = {
      id: itemId,
      list,
      item: item
    }
    dispatch('fbAddItem', payload)
  },
  setSearch({ commit }, value) {
    commit('setSearch', value)
  },
  fbReadData({ commit, dispatch }, value) {
    commit('clearItems')
    const userId = firebaseAuth.currentUser.uid
    const userItems = firebaseDb.ref('items/' + userId + '/' + value + '/items')

    // initial check for data
    userItems.once('value', snapshot => {
      commit('setItemsDownloaded', true)
      dispatch('fbReadListName', value)
    }, error => {
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
  fbAddItem({ }, payload) {
    const userId = firebaseAuth.currentUser.uid
    const itemRef = firebaseDb.ref('items/' + userId + '/' + payload.list + '/items/' + payload.id)
    itemRef.set(payload.item, error => {
      if (error) {
        showErrorMessage(error.message)
      }
    })
  },
  fbUpdateItem({ }, payload) {
    const userId = firebaseAuth.currentUser.uid
    const itemRef = firebaseDb.ref('items/' + userId + '/' + payload.list + '/items/' + payload.id)
    itemRef.update(payload.updates, error => {
      if (error) {
        showErrorMessage(error.message)
      }
    })
  },
  fbDeleteItem({ }, {list, itemId}) {
    const userId = firebaseAuth.currentUser.uid
    const itemRef = firebaseDb.ref('items/' + userId + '/' + list + '/items/' + itemId)
    itemRef.remove(error => {
      if (error) {
        showErrorMessage(error.message)
      }
    })
  },
  fbReadListName({ commit }, listId) {
    const userId = firebaseAuth.currentUser.uid
    const listRef = firebaseDb.ref('items/' + userId + '/' + listId + '/name')

    listRef.once('value', snapshot => {
      commit('setListName', snapshot.val())
    }, error => {
      if (error) {
        showErrorMessage(error.message)
        this.$router.replace("/auth")
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
