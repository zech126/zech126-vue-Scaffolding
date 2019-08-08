import axios from 'axios'
import NProgress from 'nprogress'
import { Message } from 'element-ui'
import appConfig from '@/app.config'
import getAuthorization from '@/utils/get-authorization'

let requestCount = 0

function NProgressStart() {
  if (requestCount === 0) {
    NProgress.start()
  }
  requestCount++
}

function NProgressDone() {
  requestCount--
  if (requestCount > 0) {
    NProgress.inc()
  } else {
    NProgress.done()
  }
}

export default function request(axiosRequestConfig = {}, requestConfig = {}) {
  const service = axios.create({
    timeout: appConfig.requestTimeout,
    withCredentials: true,
    ...axiosRequestConfig
  })

  const { silent: silentRequest = false } = requestConfig

  // 请求拦截器
  service.interceptors.request.use(
    (config) => {
      if (appConfig.requestLoading) {
        NProgressStart()
      }

      const { auth, apiKey, requestHandler } = requestConfig
      const headers = {}

      // 请求是否附加 Authorization header
      const sendAuth = requestConfig.hasOwnProperty('auth')
        ? !!auth
        : appConfig.sendAuthByDefault
      if (sendAuth) {
        const Authorization = getAuthorization(auth)
        headers['Authorization'] = Authorization
      }

      // 请求是否附加 X-Gravitee-Api-Key header
      if (apiKey) {
        headers['X-Gravitee-Api-Key'] = apiKey
      }

      config.headers = headers

      // 自定义请求拦截器
      if (typeof requestHandler === 'function') {
        return requestHandler(config)
      }
      return config
    },
    (error) => Promise.reject(error)
  )

  // 响应拦截器
  // 根据接口规范对相应状态作处理，全局异常状态码及提示内容可在这里配置。
  service.interceptors.response.use(
    (response) => {
      if (appConfig.requestLoading) {
        NProgressDone()
      }

      const { responseHandler } = requestConfig

      // 自定义响应拦截器
      if (typeof responseHandler === 'function') {
        return responseHandler(response)
      }

      const res = response.data
      if (res.is_success === true) {
        return res
      } else if (!silentRequest) {
        let isShowMessage = true
        let showMessage = ''
        let logMessage = ''

        if (res.error_info) {
          // eslint-disable-next-line camelcase
          const { code, msg, validation_error_info } = res.error_info
          // 接口约定 code 小于 0 为不提示的错误信息
          isShowMessage = code > 0
          if (Array.isArray(validation_error_info)) {
            showMessage = validation_error_info
              .map((error) => error.message)
              .join(', ')
          } else {
            showMessage = msg
          }
          logMessage = `(${code}) ${showMessage}`
        } else {
          showMessage = '未知错误。'
        }

        if (isShowMessage) {
          Message({
            message: appConfig.errorMessageHasCode ? logMessage : showMessage,
            type: 'error',
            duration: 5000
          })
        }

        if (appConfig.logOnRequestError) {
          // eslint-disable-next-line no-console
          console.error(
            `[Error] 请求失败。url: ${
              response.request.responseURL
            }, message: ${logMessage}`
          )
        }
      }

      return Promise.reject(res.error_info)
    },
    (error) => {
      if (appConfig.requestLoading) {
        NProgressDone()
      }

      if (!silentRequest) {
        if (appConfig.logOnRequestError) {
          let message = error.message || ''
          if (message.match(/timeout of (\d*)ms exceeded/)) {
            message = '接口调用超时。'
          }

          // eslint-disable-next-line no-console
          console.error(`[Error] ${message}`)
        }
      }

      return Promise.reject(error)
    }
  )

  return service
}
