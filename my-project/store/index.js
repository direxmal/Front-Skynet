import Vuex from 'vuex'

var cookieparser = require('cookieparser')

const createStore = () => {
  return new Vuex.Store({
    state: {
      auth: null,
      rol: ''
    },
    mutations: {
      update (state, data) {
        state.auth = data
      },
      updateRol (state, data) {
        state.rol = data
      }
    },
    actions: {
      nuxtServerInit ({ commit }, { req }) {
        let accessToken = null
        if (req.headers.cookie) {
          var parsed = cookieparser.parse(req.headers.cookie)
          console.log(parsed)
          accessToken = JSON.parse(parsed.auth)
        }
        commit('update', accessToken)
      }
    }
  })
}

export default createStore
