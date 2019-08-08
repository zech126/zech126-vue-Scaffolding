const router = require('express').Router()
const { resSuccess, resError } = require('../utils')
const users = require('../resources/users')
var delay = require('express-delay')

module.exports = (app) => {
  app.use(delay(200, 1000))

  router.post('/user/login', (req, res) => {
    const { account, password } = req.body
    const userData = users.findBy('account', account)
    if (userData) {
      if (userData.password !== password) {
        return res.json(resError('密码错误', 401))
      }
    } else {
      return res.json(resError('账号不存在', 401))
    }
    res.cookie('token', `token-${userData.user_id}`, {
      maxAge: 900000,
      httpOnly: true
    })
    return res.json(resSuccess())
  })

  router.get('/user/getCurrentUser', (req, res) => {
    app.use(delay(1000, 2000))
    const cookies = req.cookies
    if (cookies.token) {
      const userData = users.findBy('token', cookies.token)
      if (userData) {
        return res.json(
          resSuccess({
            user_id: userData.user_id,
            user_name: userData.user_name,
            department_name: userData.department_name,
            job_name: userData.job_name
          })
        )
      }
    }
    return res.json(resError('用户未登录', 401))
  })

  router.get('/user/logout', (req, res) => {
    res.clearCookie('token')
    return res.json(resSuccess())
  })

  return router
}
