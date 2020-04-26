import createPersistedState from 'vuex-persistedstate'

const plugins = [createPersistedState({
  // storage: window.sessionStorage,
  reducer(val) { //记录在localStorage中
    return {
      token: val.token,
      userInfo: val.userInfo
    }
  }
})]
export default plugins