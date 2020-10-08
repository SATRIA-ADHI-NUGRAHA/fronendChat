import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as VueGoogleMaps from 'vue2-google-maps'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueSweatalert2 from 'vue-sweetalert2'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBSraH5JA-j6lLMGSKkYtpBx0OwU9HoI2s'
  }
})

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueSweatalert2)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
