const router = require('express').Router()
const { resSuccess, resError } = require('../utils')
const posts = require('../resources/posts')

module.exports = (app) => {
  router.get('/category', (req, res) => {
    const categorys = []
    for (let i = 1; i <= 4; i++) {
      categorys.push({
        categoryId: i,
        categoryName: `栏目名称 ${i}`
      })
    }
    return res.json(resSuccess(categorys))
  })

  router.get('/post', (req, res) => {
    const listData = posts.all
    return res.json(
      resSuccess({
        items: listData,
        total: 20
      })
    )
  })

  router.get('/post/:postId', (req, res) => {
    const postId = req.params.postId
    const postData = posts.findBy('id', postId)

    return postData
      ? res.json(resSuccess(postData))
      : res.json(resError('没有匹配数据。', 404))
  })

  return router
}
