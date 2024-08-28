import Vue from 'vue'
import App from './App.vue'
import router from './router'
import provedor from './provedor'
import http from '@/http'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'




Vue.config.productionTip = false

Vue.prototype.$http = http

new Vue({
  router,
  store: provedor,
  render: h => h(App)
}).$mount('#app')
