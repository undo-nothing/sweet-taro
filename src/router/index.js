import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import AdminLayout from '@/layout/admin'

const routes = [
  {
    path: '/404',
    component: () => import('@/views/error-page/404')
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401')
  },
  {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/admin',
    component: AdminLayout,
    redirect: '/admin/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/admin/dashboard'),
        meta: { title: '首页', requireAuth: true },
        name: 'Dashboard'
      },
      {
        path: 'bingwapper',
        component: () => import('@/views/admin/bingwapper'),
        meta: { title: '壁纸', requireAuth: true },
      },
      {
        path: 'account/user',
        component: () => import('@/views/admin/account/user'),
        meta: { title: '用户', requireAuth: true },
      },
      {
        path: 'account/group',
        component: () => import('@/views/admin/account/group'),
        meta: { title: '用户组', requireAuth: true },
      },
      {
        path: '/admin/icon',
        component: () => import('@/views/admin/icons/index')
      },
    ]
  },
  {
    path: '/bingwapper/index',
    name: 'bingwapper-index',
    component: () => import('@/views/bingwapper/index')
  },
  {
    path: '/bingwapper/:date',
    name: 'bingwapper-detail',
    component: () => import('@/views/bingwapper/detail'),
    props: (route) => ({ date: route.query.date })
  },
  {
    path: '/search',
    component: () => import('@/views/bingwapper/search'),
  },
  {
    path: '/search/:date',
    name: 'search-page',
    component: () => import('@/views/bingwapper/search'),
    props: (route) => ({ date: route.query.date })
  },
  {
    path: '/',
    component: () => import('@/views/bingwapper/index'),
    name: 'index-page',
    meta: { title: '首页' },
  },
  {
    path: '/icon',
    name: 'Icons',
    component: () => import('@/views/admin/icons')
  },
  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]

// 避免重复redundant navigation报错
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

const VueRouterReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(to) {
  return VueRouterReplace.call(this, to).catch(err => err)
}

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
