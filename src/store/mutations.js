import {
  SET_INFO,
  SET_LOGIN_STATE,
  USERLOGOUT,
  SET_MENU,
  SET_DISTRICTS,
  SET_SYSTEM_CLUB_MAP,
  SET_ACTIVITY_CATEGORY_MAP,
} from './mutation-types.js'
import {
  LOGINAUTHTOKEN
} from '../utils/constants'

const mutations = {
  [SET_INFO]: (state, info) => {
    state.userInfo = info
  },
  [SET_MENU]: (state, menu) => {
    state.menu = menu
  },
  [SET_LOGIN_STATE]: (state, status) => {
    state.islogin = status
  },
  [SET_DISTRICTS]: (state, districts) => {
    state.districts = districts
  },
  [USERLOGOUT]: (state) => {
    localStorage.removeItem(LOGINAUTHTOKEN)
    state.islogin = null
    state.userInfo = null
  },
  [SET_SYSTEM_CLUB_MAP]: (state, clubs) => {
    state.clubs = clubs
  },
  [SET_ACTIVITY_CATEGORY_MAP]: (state, activityCategories) => {
    state.activityCategories = activityCategories
  },
}
export default mutations