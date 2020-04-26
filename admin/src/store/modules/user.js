// import { login, logout, getInfo } from '@/api/user'

const state = {
  token: 0,
  info: {},
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INFO(state, info) {
    state.info = info;
  },
}

const actions = {
  // user login
  login({ dispatch, commit }, loginInfo) {
    const { account, password } = loginInfo
    // return new Promise((resolve, reject) => {
    //   login({ account: account.trim(), password: password }).then(res => {
    //     const { data } = res
    //     commit('SET_TOKEN', data.token)
        
    //     resolve()
    //   }).catch(err => {
    //     reject(err)
    //   })
    // })
    dispatch('getInfo')
    return new Promise((resolve) => {
      commit('SET_TOKEN', account + password)

      resolve()
    })
  },

  // get user info
  getInfo({ commit, state }) {
    // return new Promise((resolve, reject) => {
    //   getInfo(state.token).then(response => {
    //     const { data } = response

    //     if (!data) {
    //       reject('Verification failed, please Login again.')
    //     }

    //     const { name, avatar } = data

    //     commit('SET_NAME', name)
    //     commit('SET_AVATAR', avatar)
    //     resolve(data)
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
    return new Promise((resolve) => {
      commit('SET_INFO', {
        name: 'admin',
        age: 18,
        sex: '男',
        id: state.token
      })

      resolve()
    })
  },

  // user logout
  logout({ commit }) {
    // return new Promise((resolve, reject) => {
    //   logout(state.token).then(() => {
    //     commit('SET_TOKEN', 0)
    //     commit('SET_INFO', {})
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
    return new Promise((resolve) => {
      commit('SET_TOKEN', 0)
      commit('SET_INFO', {})

      resolve()
    })
  },

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

