import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// import Layout from '@/layout'

const routes = [
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
  },
  {
    path: '/login',
    component: () => import('@/views/login'),
  },
  {
    path: '/bingwapper/index',
    name: 'bingwapper-index',
    component: () => import('@/views/bingwapper/index'),
  },
  {
    path: '/bingwapper/:date',
    name: 'bingwapper-detail',
    component: () => import('@/views/bingwapper/detail'),
    props: (route) => ({ date: route.query.date })
  },
  {
    path: '/search',
    component: () => import('@/views/search'),
  },
  {
    path: '/',
    component: () => import('@/views/index'),
  },
  {
    path: '/dashboard',
    omponent: () => import('@/views/dashboard')
  },
  {
    path: '/icon/index',
    name: 'Icons',
    component: () => import('@/views/icons/index'),
  },
  // {
  //   path: '/icon',
  //   // component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/icons/index'),
  //       name: 'Icons',
  //       meta: { title: 'Icons', icon: 'icon', noCache: true }
  //     }
  //   ]
  // },
]

// 避免重复redundant navigation报错
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
    return VueRouterPush.call(this, to).catch(err => err)
}

const VueRouterReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (to) {
  return VueRouterReplace.call(this, to).catch(err => err)
}

const router = new VueRouter({
  mode: 'history',
  routes
})


export default router