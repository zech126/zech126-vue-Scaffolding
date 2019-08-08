import Loading from '@/views/layout/Loading.vue'
import Timeout from '@/views/layout/Timeout.vue'

// 通过使用[异步组件][async-component]的工厂函数来包装需要渲染的视图组件，
// 可在视图组件读取完成之前使用 loading 组件填充页面，
// 在读取组件出错或超时时也展示超时面板，在路由中的使用方法：
//
// component: () => lazyLoadView(import('@views/my-view'))
//
// 注: 组件通过 lazyLoadView 这种异步形式调用的时候，不会触发组件内配置的路由“进入”类钩子，
// 如： `beforeRouteEnter`, `beforeRouteUpdate`, `beforeRouteLeave` 。
// 如果需要使用路由事件钩子，可以使用路由配置中的[路由独享的守卫][navigation-guards]，
// 或者直接使用[路由懒加载][lazy-route]功能：
//
// component: () => import('@views/my-view')
//
export default function lazyLoadView(AsyncView) {
  const AsyncHandler = () => ({
    component: AsyncView,
    loading: Loading,
    error: Timeout,
    delay: 400,
    timeout: 10000
  })

  return Promise.resolve({
    functional: true,
    render(h, { data, children }) {
      // 将 data 与 children 转发给视图组件
      return h(AsyncHandler, data, children)
    }
  })
}
