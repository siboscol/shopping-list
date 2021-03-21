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
  addList(state, payload) {
    Vue.set(state.lists, payload.id, payload.list)
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
    dispatch('fbDeleteList', id)
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
    const listsList = firebaseDb.ref('lists/' + userId + '/')

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
      const list = snapshot.val()

      const payload = {
        id: snapshot.key,
        list: list
      }
      commit('addList', payload)
    })

    // Child Changed
    listsList.on('child_changed', snapshot => {
      const list = snapshot.val()

      const payload = {
        id: snapshot.key,
        updates: list
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
    const itemRef = firebaseDb.ref('lists/' + userId + '/' + payload.id)
    itemRef.set(payload.list, error => {
      if (error) {
        showErrorMessage(error.message)
      }
    })
  },
  fbUpdateList({ }, payload) {
    const userId = firebaseAuth.currentUser.uid
    const itemRef = firebaseDb.ref('lists/' + userId + '/' + payload.id)
    itemRef.update(payload.updates, error => {
      if (error) {
        showErrorMessage(error.message)
      }
    })
  },
  fbDeleteList({ }, listId) {
    const userId = firebaseAuth.currentUser.uid
    const itemRef = firebaseDb.ref('lists/' + userId + '/' + listId)
    itemRef.remove(error => {
      if (error) {
        showErrorMessage(error.message)
      }
    })
  }
}

const getters = {
  getListById: state => id => {
    return state.lists[id]
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
