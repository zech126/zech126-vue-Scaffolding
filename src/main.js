import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import VueMeta from 'vue-meta'
import '@/utils/nprogress'

Vue.config.productionTip = false

// Vue plugins
Vue.use(VueMeta, { keyName: 'metaInfo' })

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
