import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
  // {
  //   path: '/',
  //   name: 'login',
  //   component: () => import('./views/Login.vue'),
  //   children: [
  //     {
  //       path: 'registration',
  //       name: 'registration',
  //       component: () => import('./views/Registration.vue')
  //     }
  //   ],
  // },
  {
    //path: '/registration',
    path: '/',
    name: 'registration',
    component: () => import('./views/Registration.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
});

export default router
