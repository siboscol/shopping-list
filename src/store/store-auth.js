import { firebaseAuth } from "boot/firebase";
import { LocalStorage, Loading } from 'quasar'
import { showErrorMessage } from 'src/utils/showErrorMessage'

const state = {
  loggedIn: false
}

const mutations = {
  setLoggedIn(state, value) {
    state.loggedIn = value
  }
}
const actions = {
  async registerUser({ }, payload) {
    try {
      Loading.show()
      const res = await firebaseAuth.createUserWithEmailAndPassword(
        payload.email,
        payload.password
      )
      console.log('Registered', res)
    } catch (error) {
      console.log('Error Registering', error)
      showErrorMessage(error.message)
    }
  },
  async loginUser({ }, payload) {
    try {
      Loading.show()
      const res = await firebaseAuth.signInWithEmailAndPassword(
        payload.email,
        payload.password
      )
      console.log('Logged in', res)
    } catch (error) {
      console.log('Error Logging in', error)
      showErrorMessage(error.message)
    }
  },
  logoutUser() {
    firebaseAuth.signOut()
  },
  handleAuthStateChange({ commit, dispatch }) {
    firebaseAuth.onAuthStateChanged(user => {
      Loading.hide()
      if (user) {
        commit('setLoggedIn', true)
        LocalStorage.set('loggedIn', true)
        this.$router.push('/').catch(err => { })
        dispatch('itemsList/fbReadData', null, { root: true })
        dispatch('lists/fbReadData', null, { root: true })
      } else {
        commit('items/clearItems', null, { root: true })
        commit('lists/clearlists', null, { root: true })
        commit('items/setItemsDownloaded', false, { root: true })
        commit('lists/setlistsDownloaded', false, { root: true })
        commit('setLoggedIn', false)
        LocalStorage.set('loggedIn', false)
        this.$router.replace('/auth').catch(err => { })
      }
    })
  }
}

const getters = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
