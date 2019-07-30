import Vue from 'vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueGlobalVariable from 'vue-global-var';
import CKEditor from '@ckeditor/ckeditor5-vue'

import routes from './routes'

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(VueGlobalVariable, {
  globals: {
    $apiUrl: "http://localhost:8081"
  }
})
Vue.use( CKEditor )
Vue.config.productionTip = false

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')

