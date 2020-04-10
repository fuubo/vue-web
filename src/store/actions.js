import {
  getUser,
  login,
  logout,
  getSystemDistrictList
} from '@/api'
import {
  SET_INFO,
  SET_LOGIN_STATE,
  SET_MENU,
  SET_DISTRICTS
} from './mutation-types.js'
import {
  LOGINAUTHTOKEN
} from '../utils/constants'

const actions = {
  async GET_DISTRICTS({
    commit
  }) {
    let districts = await getSystemDistrictList({
      levelList: [1, 2]
    });
    commit(SET_DISTRICTS, districts)
  },
  async GET_USER_INFO({
    commit
  }) {
    let result = await getUser()
    commit(SET_LOGIN_STATE, 'yes')
    commit(SET_INFO, result.data)
  },
  async LOGIN_ACTION({
    dispatch,
    commit
  }, loginData) {
    try {
      let result = await login(loginData)
      if (result && result.code === 0) {
        localStorage.setItem(LOGINAUTHTOKEN, result.data.token)
      }
      commit(SET_LOGIN_STATE, 'yes')
      dispatch('GET_USER_INFO')
    } catch (e) {
      localStorage.removeItem(LOGINAUTHTOKEN)
    }
  },
  async LOGOUT_ACTION({
    commit
  }) {
    await logout()
    commit(SET_INFO, null)
    commit(SET_MENU, null)
    commit(SET_LOGIN_STATE, null)
    localStorage.removeItem(LOGINAUTHTOKEN)
  }
}

export default actions