import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import * as Units from './constants'
Vue.config.productionTip = false

Vue.prototype.$units = {
  metric: Units.METRIC_CONVERSIONS,
  imperial: Units.IMPERIAL_CONVERSIONS
}

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')