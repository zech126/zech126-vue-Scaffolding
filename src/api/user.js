import request from '@/utils/request'
import apiConfig from '@/api.config'

const silentRequestService = request(
  {
    baseURL: apiConfig.main.url
  },
  {
    ...apiConfig.main.requestConfig,
    silent: true
  }
)

export function getCurrentUser() {
  return silentRequestService({
    url: '/user/getCurrentUser',
    method: 'get'
  })
}
