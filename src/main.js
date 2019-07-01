import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import store from './store';
import router from './router';

import './directives/stars.js';

Vue.config.productionTip = false;

export const eventBus = new Vue();

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
