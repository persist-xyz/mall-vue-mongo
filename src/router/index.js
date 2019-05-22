import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      components: import('../page/goodList'),
      meta: {
        title: '商品列表页'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = from.meta.title
  next()
})
export default router
