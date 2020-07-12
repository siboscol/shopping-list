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
  }
}

const actions = {
  setShowItemsInOneList({ commit }, value) {
    commit('setShowItemsInOneList', value)
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
