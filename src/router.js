import Vue from 'vue'
import VueRouter from 'vue-router'
import { getApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

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
    path: '/registration',
    name: 'registration',
    component: () => import('./views/Registration.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./views/Login.vue')
  },
  {
    path: '/image-upload',
    name: 'test',
    component: () => import('./views/ImageUpload.vue')
  },
  {
    path: '/role',
    name: 'role',
    component: () => import('./views/SelectingRole.vue')
  },
  {
    path: '/select-quest',
    name: 'select-quest',
    component: () => import('./views/SelectingQuest.vue')
  },
  {
    path: '/new-quest',
    name: 'new-quest',
    component: () => import('./views/QuestCode.vue')
  },
  {
    path: '/player-quest-page',
    name: 'player-quest-page',
    component: () => import('./views/PlayerQuestPage.vue')
  },
  {
    path: '/creating-quest',
    name: 'creating-quest',
    component: () => import('./views/CreatingQuest.vue')
  },
  {
    path: '/quest-full-info',
    name: 'quest-full-info',
    component: () => import('./views/OrganizatorQuestPage.vue')
  },
  {
    path: '/creating-task',
    name: 'creating-task',
    component: () => import('./views/CreatingTask.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
});

router.beforeEach((to, from, next) => {
  const currentUser = getAuth(getApp()).currentUser
  const requireAuth = to.matched.some(record => record.meta.auth)

  if (requireAuth && !currentUser) {
    next('/login?message=login')
  } else {
    next() 
  }
})

export default router
