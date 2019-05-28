import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/goodList'
    },
    {
      path: '/goodList',
      name: 'goodList',
      component: () => System.import('@/page/goodList'),
      // component: resolve => require(['@/page/goodList'], resolve),
      meta: {
        title: '商品列表页'
      }
    },
    {
      path: '/shoppingCart',
      name: 'shoppingCart',
      component: resolve => require(['@/page/shoppingCart'], resolve),
      meta: {
        title: '购物车列表'
      }
    },
    {
      path: '/addressList',
      name: 'addressList',
      component: resolve => require(['@/page/addressList'], resolve),
      meta: {
        title: '收货地址'
      }
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})
export default router
