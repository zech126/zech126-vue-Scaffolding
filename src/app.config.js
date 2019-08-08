const isProd = process.env.VUE_APP_ENV === 'prod'
const isServer = process.env.VUE_APP_CLIENT === 'server'

module.exports = {
  // 应用主标题，会使用在 <title>
  title: '',

  // 应用描述，会使用在 <meta name="description" />
  description: '',

  // 系统退出登录地址，会在接口调用返回 401 、登录超时等状态下跳转到该地址
  // 可填写 cas 注销地址
  logoutUrl: '',

  // Authorization 取值 cookie 名，应用不同环境取值名有所不同可在此配置
  authCookieName: isProd ? 'XT_AUTH' : 'XT_AUTH_DEV',

  // 是否对所有 api 接口请求 header 默认附带 `Authorization` 属性，
  // 若需要对特定接口独立配置（如单独关闭 auth 、 auth 取值与上面的 cookieName 配置不同等），
  // 可在 `/config/api.config.js` 中对特定接口进行配置。
  sendAuthByDefault: false,

  // 接口调用超时时间
  requestTimeout: 20000,

  // 顶部进度条配置
  loading: {
    color: '#2d9',
    showSpinner: false
  },

  // 路由切换时是否显示顶部进度条
  routerLoading: true,

  // 发送 http 请求时是否显示顶部进度条
  requestLoading: true,

  // 默认请求方法下，接口报错时是否显示错误码信息
  errorMessageHasCode: false,

  // 默认请求方法下，请求失败时是否在 console 面板打印错误信息
  logOnRequestError: !isServer || !isProd
}
