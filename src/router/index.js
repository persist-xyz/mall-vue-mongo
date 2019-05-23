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
      component: resolve => require(['@/page/goodList'], resolve),
      meta: {
        title: '商品列表页'
      }
    },
    {
      path: '/shoppingCart',
      name: 'shoppingCart',
      components: import('@/page/shoppingCart'),
      meta: {
        title: '购物车列表'
      }
    },
    {
      path: '/addressList',
      name: 'addressList',
      components: import('@/page/addressList'),
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
