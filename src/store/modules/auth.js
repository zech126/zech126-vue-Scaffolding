import debounce from 'debounce-promise'
import * as types from '../mutationTypes'
import { getCurrentUser } from '@/api/user'

export const state = {
  currentUser: null
}

export const mutations = {
  [types.SET_CURRENT_USER](state, userinfo) {
    state.currentUser = userinfo
  }
}

export const getters = {
  loggedIn: (state) => !!state.currentUser,
  currentUser: (state) => state.currentUser
}

export const actions = {
  async init({ dispatch }) {
    // 初始化时自动获取登录用户，刷新页面或直接进入 url 都会执行。
    try {
      return await dispatch('getCurrentUser')
    } catch (e) {}
  },

  // 获取当前登录用户
  getCurrentUser: debounce(async ({ commit }) => {
    const res = await getCurrentUser()
    commit(types.SET_CURRENT_USER, res.result)
    return res
  })
}
