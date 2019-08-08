import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import store from '@/store'
import routes from './routes'
import appConfig from '@/app.config'

Vue.use(Router)

const router = new Router({
  routes,
  // mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})

router.beforeEach(async (routeTo, routeFrom, next) => {
  if (appConfig.routerLoading) {
    // 直接进入的第一个页面不显示路由切换的进度条
    if (routeFrom.name) {
      NProgress.start()
    }
  }

  // 默认所有页面__都需要__进行登录状态判断，
  // 如果有部分路由不需要登录即可查看（如分享类页面），
  // 可设置路由配置的 meta.noAuthRequired 为 `true`
  const noAuthRequired = routeTo.matched.some(
    (route) => route.meta.noAuthRequired
  )

  // 不需登录判断的页面直接进入
  if (noAuthRequired) return next()

  // 在没有会话接口用于验证登录状态的项目，使用是否获取到登录用户判断是否已登录。
  if (store.getters['auth/loggedIn']) {
    return next()
  } else {
    // return next({ name: '403' })

    // 除了直接进入 403 ，还可以通过下面代码的形式，在每次切换路由时尝试作一次请求获取登录状态，
    // 该形式不会与 store/auth/init 内的登录方法冲突产生两次请求，
    // 适用于登录失效后有其他补偿登录形式，如小弹窗、在新标签页面登录后再回来原页面有切换路由的操作。
    // 如果对于登录后有其他逻辑也可在此处处理，若无需跳转则直接运行 `next()` 即可。
    try {
      await store.dispatch('auth/getCurrentUser')
    } catch (e) {}
    if (store.getters['auth/loggedIn']) {
      return next()
    } else {
      return next({ name: '401' })
    }
  }
})

router.afterEach((routeTo, routeFrom) => {
  if (appConfig.routerLoading) {
    NProgress.done()
  }
})

export default router
