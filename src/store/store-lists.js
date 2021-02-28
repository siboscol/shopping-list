import Vue from 'vue'
import { uid } from 'quasar'
import { firebaseDb, firebaseAuth } from 'boot/firebase'
import { showErrorMessage } from 'src/utils/showErrorMessage'

const state = {
  lists: {},
  listsDownloaded: false
}

const mutations = {
  updateItem(state, payload) {
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
  updateItem({ dispatch }, payload) {
    dispatch('fbUpdateItem', payload)
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
      commit('updateItem', payload)
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
  fbUpdateItem({ }, payload) {
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
      list.id = id
      acc.unshift(list)
      return acc
    }, [])
    return listOfLists
  },
  getListById: state => id => {
    return state.lists[id]
  },
  listsTotal: (state, getters) => {
    const listOfLists = getters.listOfLists
    return Object.keys(listOfLists).length
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
