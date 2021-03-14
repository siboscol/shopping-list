import Vue from 'vue'
import { uid } from 'quasar'
import { firebaseDb, firebaseAuth } from 'boot/firebase'
import { showErrorMessage } from 'src/utils/showErrorMessage'

const state = {
  lists: {},
  listsDownloaded: false
}

const mutations = {
  updateList(state, payload) {
    Object.assign(state.lists[payload.id], payload.updates)
  },
  deleteItem(state, id) {
    Vue.delete(state.lists, id)
  },
  addItem(state, payload) {
    Vue.set(state.lists, payload.id, payload.item)
  },
  clearlists(state) {
    state.lists = {}
  },
  setlistsDownloaded(state, value) {
    state.listsDownloaded = value
  }
}

const actions = {
  updateList({ dispatch }, payload) {
    dispatch('fbUpdateList', payload)
  },
  deleteItem({ dispatch }, id) {
    dispatch('fbDeleteItem', id)
  },
  addList({ dispatch }, list) {
    const listId = uid()
    const payload = {
      id: listId,
      list: list
    }
    dispatch('fbAddList', payload)
  },
  setSearch({ commit }, value) {
    commit('setSearch', value)
  },
  fbReadData({ commit }, value) {
    const userId = firebaseAuth.currentUser.uid
    const listsList = firebaseDb.ref('items/' + userId + '/')

    // initial check for data
    listsList.once(
      'value',
      snapshot => {
        commit('setlistsDownloaded', true)
      },
      error => {
        if (error) {
          showErrorMessage(error.message)
          this.$router.replace('/auth')
        }
      }
    )

    // Child Added
    listsList.on('child_added', snapshot => {
      const item = snapshot.val()

      const payload = {
        id: snapshot.key,
        item: item
      }
      commit('addItem', payload)
    })

    // Child Changed
    listsList.on('child_changed', snapshot => {
      const item = snapshot.val()

      const payload = {
        id: snapshot.key,
        updates: item
      }
      commit('updateList', payload)
    })

    // Child Removed
    listsList.on('child_removed', snapshot => {
      const itemId = snapshot.key
      commit('deleteItem', itemId)
    })
  },
  fbAddList({ }, payload) {
    const userId = firebaseAuth.currentUser.uid
    const itemRef = firebaseDb.ref('items/' + userId + '/' + payload.id)
    itemRef.set(payload.list, error => {
      if (error) {
        showErrorMessage(error.message)
      }
    })
  },
  fbUpdateList({ }, payload) {
    const userId = firebaseAuth.currentUser.uid
    const itemRef = firebaseDb.ref('items/' + userId + '/' + payload.id)
    itemRef.update(payload.updates, error => {
      if (error) {
        showErrorMessage(error.message)
      }
    })
  },
  fbDeleteItem({ }, itemId) {
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
  listOfLists: (state) => {
    const listOfLists = Object.keys(state.lists).reduce((acc, id) => {
      const list = state.lists[id]
      const items = list.items
      list.id = id
      if (items) {
        list.priceTotal = itemsPriceTotal(items)
        list.itemsTotal = itemsNumber(Object.values(items))
        list.cartTotal = itemsNumber(Object.values(items).filter(i => i.done))
      }
      acc.unshift(list)
      return acc
    }, [])
    return listOfLists
  },
  getListById: state => id => {
    return state.lists[id]
  }
}

const itemsPriceTotal = items => {
  const reducerSum = (sum, i) => sum + totalPrice(i)
  const itemsValues = Object.values(items)
  return Math.round(itemsValues.reduce(reducerSum, 0) * 100) / 100
}

const totalPrice = item => {
  return item.price * item.quantity
}

const itemsNumber = items => {
  if (!items) {
    return 0
  }
  return Object.keys(items).length
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
