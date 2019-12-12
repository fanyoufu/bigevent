// 导入express
const express = require('express')
// 导入路由
const router = express.Router()
// 导入信息
const message = require('../utils/message')

const path = require('path')
// 导入数据
const db = require('../utils/db')
const CATE_PATH = path.join(__dirname, '../db/category.json')
// 导入控制器
const categoryController = require('../controllers/category')

// 文章搜索
router.get('/search', (req, res, next) => {
  // 参数获取
  const key = req.query.key || ''
  const type = req.query.type ? Number(req.query.type) : 0
  const page = Number(req.query.page) || 1
  const perpage = req.query.perpage ? Number(req.query.perpage) : 6

  // 类型判断
  if (isNaN(page) || isNaN(perpage)) {
    next({ msg: '参数格式不正确' })
    return
  }
  // 数据获取
  const article = db.getArticle().filter(it => {
    const rs = []
    rs.push(it.state === '已发布')
    if (type) {
      rs.push(it.type === type)
    }
    if (key) {
      rs.push(it.title.includes(key))
    }
    return rs.every(it => it)
  })

  const curArticleList = article.splice((page - 1) * perpage, perpage)

  res.json({
    code: 200,
    msg: '查询成功',
    pages: Math.ceil(article.length / perpage),
    page,
    data: curArticleList
  })
})

// 评论
router.post('/post_comment', (req, res) => {
  // 参数获取
  const article_id = req.body.article_id
  const name = req.body.name
  const content = req.body.content

  const result = db.addComments({ name, content, article_id })
  if (result) {
    res.send({
      msg: '添加评论成功',
      code: 200
    })
  } else {
    res.send({
      msg: '添加评论不成功',
      code: 400
    })
  }
})

// 获取指定文章编号的评论
router.get('/get_comments', (req, res) => {
  // 参数获取
  const article_id = req.query.article_id

  const result = db.getComments({ article_id })
  if (result) {
    res.send({
      msg: '获取评论成功！',
      code: 200,
      data: result
    })
  } else {
    res.send({
      msg: '获取评论不成功',
      code: 400
    })
  }
})

router.get('/lastest', (req, res) => {
  const cateList = require(CATE_PATH)
  console.log(cateList)
  var regx = /[\u4E00-\u9FA5\d]+/g
  // 数据获取
  const article = db.getArticle().reverse().splice(5, 5).map(it => {
    let { id, title, content, cover, type, read, comment, date } = it
    content += ''
    content = content.substr(0, 200)
    console.log(content)

    var matches = []
    var match = ''
    do {
      match = regx.exec(content)
      matches.push(match)
    } while (match)

    type = cateList.find(it => it.id == type)
    type = type ? type.name : '未知'
    return {
      id,
      title,
      intro: matches.join(),
      cover,
      type,
      read,
      comment,
      date
    }
  })

  res.json({
    code: 200,
    data: article
  })
})
// 分类获取
router.get('/category', categoryController.category_search)
router.get('/latest_comment', (req, res) => {
  const result = db.getComments()
  res.json({
    code: 200,
    msg: '获取成功',
    data: result.reverse().splice(0, 6)
  })
})

// 访问新闻详情
router.get('/article', (req, res, _next) => {
  let { id } = req.query
  id = Number(id)
  if (isNaN(id)) {
    _next({ msg: '文章编号格式不对' })
    return
  }
  const articleList = db.getArticle()

  const idx = articleList.findIndex(it => it.id === id)
  if (idx === -1) {
    res.json({ code: 404, msg: '没有找到' })
    return
  }
  let { title, author, type, date, read, comment, content, prev, next } = articleList[idx]

  // 增加一次阅读量
  db.editArticle({ id: id, read: 1 })

  comment = db.getComments({ article_id: id }).length

  if (idx > 0) {
    prev = { id: articleList[idx - 1].id, title: articleList[idx - 1].title }
  }
  if (idx < articleList.length - 1) {
    next = { id: articleList[idx + 1].id, title: articleList[idx + 1].title }
  }

  res.json({
    code: 200,
    data: {
      title, author, type, date, read, comment, content, prev, next
    }
  })
})

// 获取最新的6条评论列表
router.get('/get_latest_comments', (req, res) => {
  const commentList = db.getComments()
    .sort((a, b) => Number(b.dt) - Number(a.dt))
    .splice(0, 6)

  res.json({
    code: 200,
    data: commentList
  })
})

// 阅读量排行
router.get('/rank', (req, res, _next) => {
  let { type } = req.query
  type = type || 0
  type = Number(type)
  if (isNaN(type)) {
    _next({ msg: '文章编号格式不对' })
    return
  }

  let articleList = []
  if (type) {
    articleList = db.getArticle()
      .filter(it => (it.type == type))
      .sort((a, b) => b.read - a.read)
      .splice(0, 7)
      .map(it => ({ id: it.id, title: it.title, read: it.read }))
  } else {
    articleList = db.getArticle().sort((a, b) => b.read - a.read).splice(0, 7).map(it => ({ id: it.id, title: it.title, read: it.read }))
  }

  res.json({
    code: 200,
    data: articleList
  })
})
// 暴露
module.exports = router
