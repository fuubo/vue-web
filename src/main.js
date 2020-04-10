import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import request from '@/api/request'
import * as filters from './utils/filter'
import VueAreaLinkage from 'vue-area-linkage'
import 'vue-area-linkage/dist/index.css'
import moment from 'moment'
import uuid4 from 'uuid/v4'
import VueTailwind from 'vue-tailwind'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueSweetalert2 from 'vue-sweetalert2'

require('./styles/screen.css')

Vue.prototype.$request = request
Vue.prototype.$uuid = uuid4

Vue.config.productionTip = false
Vue.use(VueAreaLinkage)
Vue.use(VueTailwind)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueSweetalert2)

const errorHandler = (err, vm, info) => {
  if (err.response) {
    let status = err.response.status
    let errorTip = ''
    switch (status) {
      case 403:
        errorTip = '没有权限'
        break
      case 401:
        store.commit('SET_INFO', null)
        store.commit('SET_LOGIN_STATE', null)
        localStorage.clear()
        vm.$router.push('/login')
        errorTip = '请重新登录'
        break
      case 404:
        store.commit('SET_INFO', null)
        store.commit('SET_LOGIN_STATE', null)
        localStorage.clear()
        vm.$router.push('/login')
        errorTip = '请重新登录'
        break
      default:
        console.error(status, 'response error', err.response);
    }
    if (info) {
      errorTip = info.errorHeader + errorTip
    }
    vm.$swal(errorTip);
  } else if (err.request) {
    console.error('request error', err.request)
  } else {
    if (err !== 'cancel' && err !== 'close') {
      console.error('business error', err)
      Vue.prototype.$swal('出错了！' + err.message);
    }
  }
}

Vue.config.productionTip = false
Vue.config.errorHandler = errorHandler

Vue.prototype.$moment = moment

Object.defineProperty(Vue.prototype, '$throw', { value: (error, vm, info) => errorHandler(error, vm, info) })
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
