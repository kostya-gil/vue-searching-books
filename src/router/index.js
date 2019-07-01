import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home.vue';
import Selected from '../views/Selected.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/selected',
      name: 'Selected',
      component: Selected,
    },
  ],
});
