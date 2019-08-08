/**
 * 用于等待权限 state 获取
 * 用法：
 *
  async beforeRouteEnter(to, from, next) {
    await waitPermission()
    const pagePermission = get(
      store.getters['auth/permission'],
      'LegalShopSiteController.index'
    )
    if (!pagePermission) {
      next({ name: '403' })
    } else {
      next()
    }
  },
 */
import store from '@/store'

export default function waitPermission() {
  return new Promise((resolve) => {
    // 权限信息存放在 auth.buttonPermission
    if (store.state.auth.buttonPermission === null) {
      const unwatch = store.watch(
        () => store.state.auth.buttonPermission,
        (value) => {
          unwatch()
          resolve()
        }
      )
    } else {
      resolve()
    }
  })
}
