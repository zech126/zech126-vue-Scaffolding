import Page401 from '@/views/layout/ErrorPage/401.vue'
import Page403 from '@/views/layout/ErrorPage/403.vue'
import Page404 from '@/views/layout/ErrorPage/404.vue'
import Page500 from '@/views/layout/ErrorPage/500.vue'

const appRoutes = [
  {
    path: '/',
    name: 'Home',
    meta: { noAuthRequired: true },
    component: () => import('@/views/Home.vue')
  }
]

const staticRoutes = [
  {
    path: '/401',
    name: '401',
    meta: { noAuthRequired: true },
    component: Page401
  },
  {
    path: '/403',
    name: '403',
    meta: { noAuthRequired: true },
    component: Page403
  },
  {
    path: '/404',
    name: '404',
    meta: { noAuthRequired: true },
    component: Page404
  },
  {
    path: '/500',
    name: '500',
    meta: { noAuthRequired: true },
    component: Page500
  }
]

export default [
  ...staticRoutes,
  ...appRoutes,
  {
    path: '*',
    redirect: { name: '404' }
  }
]
