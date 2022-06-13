import Vue from 'vue'
import VueRouter from 'vue-router'
import { getApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('./views/Login.vue')
  },
  {
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
    meta: { auth: true },
    component: () => import('./views/SelectingQuest.vue')
  },
  {
    path: '/select-quest-org',
    name: 'select-quest-org',
    meta: { auth: true },
    component: () => import('./views/OrgSelectQuest.vue')
  },
  {
    path: '/new-quest',
    name: 'new-quest',
    meta: { auth: true },
    component: () => import('./views/QuestCode.vue')
  },
  {
    path: '/player-quest-page/:code',
    name: 'player-quest-page',
    meta: { auth: true },
    component: () => import('./views/PlayerQuestPage.vue')
  },
  {
    path: '/creating-quest',
    name: 'creating-quest',
    meta: { auth: true },
    component: () => import('./views/CreatingQuest.vue')
  },
  {
    path: '/quest-org-info/:code',
    name: 'quest-full-info',
    meta: { auth: true },
    component: () => import('./views/OrganizatorQuestPage.vue')
  },
  {
    path: '/quest-edit/:code',
    name: 'quest-edit',
    meta: { auth: true },
    component: () => import('./views/QuestEdit.vue')
  },
  {
    path: '/creating-task/:code',
    name: 'creating-task',
    meta: { auth: true },
    component: () => import('./views/CreatingTask.vue')
  },
  {
    path: '/task-edit/:code/:taskId',
    name: 'task-edit',
    meta: { auth: true },
    component: () => import('./views/TaskEdit.vue')
  },
  {
    path: '/game/:code/:taskId',
    name: 'game',
    component: () => import('./views/Game.vue')
  },
  {
    path: '/creating-team',
    name: 'creating-team',
    component: () => import('./views/CreatingTeam.vue')
  },
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
    next('/login')
  } else {
    next() 
  }
})

export default router
