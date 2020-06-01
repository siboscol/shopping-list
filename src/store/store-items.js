import { storage } from 'firebase'
import store from '.'

const state = {
  items: {
    'id1': {
      title: 'pippo',
      done: false,
      price: '',
      quantity: 1
    },
    'id2': {
      title: 'pluto',
      done: false,
      price: 2,
      quantity: 3
    },
    'id3': {
      title: 'paperino',
      done: false,
      price: '',
      quantity: 1
    }
  }
}

const mutations = {}

const actions = {}

const getters = {
  items: state => {
    return state.items
  },
  itemsList: state => {
      return Object.keys(state.items).map(item => state.items[item])
  }
}

export default {
  namespace: true,
  state,
  mutations,
  actions,
  getters
}
