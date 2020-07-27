import { LocalStorage } from 'quasar'

const state = {
  settings: {
    showItemsInOneList: false,
    currency: 'CHF',
    currencies: ['CHF', 'EUR']
  }
}

const mutations = {
  setShowItemsInOneList(state, value) {
    state.settings.showItemsInOneList = value
  },
  setSettings(state, settings) {
    Object.assign(state.settings, settings)
  }
}
const actions = {
  setShowItemsInOneList({ commit, dispatch }, value) {
    commit('setShowItemsInOneList', value)
    dispatch('saveSettings')
  },
  saveSettings({ state }) {
    LocalStorage.set('settings', state.settings)
  },
  getSettings({ commit }) {
    const settings = LocalStorage.getItem('settings')
    if (settings) {
      commit('setSettings', settings)
    }
  }
}

const getters = {
  settings: state => {
    return state.settings
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
