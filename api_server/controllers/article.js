const path = require('path')
const article = require(path.join(__dirname, '../utils/article'))
const category = require(path.join(__dirname, '../utils/category'))
const config = require(path.join(__dirname, '../utils/config'))
const moment = require('moment')
const fs = require('fs')
module.exports = {
  // 文章搜索

  search (req, res) {
    // 获取提交的数据
    const key = req.query.key || ''
    const type = req.query.type || ''
    const state = req.query.state || ''
    const page = parseInt(req.query.page || 1)
    const perpage = parseInt(req.query.perpage || 6)
    const id = req.query.id

    // 文章检索
    let articles = article.getArticle()
    // 类型筛选
    articles = articles.filter(v => {
      // 类型筛选
      const rs = []
      rs.push(type == '' ? true : v.type == type)
      rs.push(state == '' ? true : v.state == state)
      return rs.every(item => item)
    })

    // 获取分类
    const cateData = {}
    category.getCategory().map(v => {
      cateData[v.id] = v.name
    })
    // 关键字
    articles = articles
      .filter(v => {
        if (key == '') return true
        try {
          return v.title.indexOf(key) != -1 || v.content.indexOf(key) != -1
        } catch (error) {
          return false
        }
      })
      .reverse()
      .map(v => {
        let { id, title, content, cover, type, read, comment, date, state, author } = v
        if (cover.indexOf('http') == -1 && cover.indexOf(config.serverAddress) == -1) {
          cover = config.serverAddress + cover
        }
        type = cateData[type]
        return {
          id,
          title,
          content,
          cover,
          type,
          read,
          comment,
          date,
          state,
          author
        }
      })
    if (id) {
      // 如果只是id
      const editOne = articles.filter(v => {
        return v.id == id
      })[0]

      // 设置type 为id
      for (const key in cateData) {
        if (cateData[key] == editOne.type) {
          editOne.type = key
        }
      }
      if (editOne) {
        res.send({
          msg: '获取成功',
          code: 200,
          data: editOne
        })
        return
      }
    }

    // 实现分页
    const startIndex = (page - 1) * perpage
    let endIndex = startIndex + perpage
    if (endIndex > articles.length) {
      endIndex = articles.length
    }
    // 总页数
    const totalPage = Math.ceil(articles.length / perpage) || 1
    // 返回的数据
    var backData = []
    console.log(`分页 起始索引${startIndex}  结束索引${endIndex}`)
    for (let i = startIndex; i < endIndex; i++) {
      backData.push(articles[i])
    }
    res.send({
      msg: '搜索成功',
      code: 200,
      totalPage,
      data: backData
    })
  },
  // 文章发布
  article_publish (req, res) {
    // 获取数据
    const title = req.body.title || ''
    const type = req.body.type || 1
    const date = req.body.date || moment().format('YYYY-MM-DD')
    const content = req.body.content || ''
    const state = req.body.state || '草稿'
    let cover
    // 允许的图片类型
    if (!req.file) {
      res.send({
        msg: '封面不能为空哦',
        code: 400
      })
      return
    } else if (req.file.size > 1024 * 1024 * 5 || ['image/gif', 'image/png', 'image/jpeg'].indexOf(req.file.mimetype) == -1) {
      res.send({
        msg: '文件大小或类型不对，请检查',
        code: 400
      })
      fs.unlinkSync(path.join(__dirname, '../', req.file.path))
      return
    }
    // 标题判断
    if (!title) {
      res.send({
        msg: '标题不能为空哦',
        code: 400
      })
      return
    }
    // 标题判断
    if (!type) {
      res.send({
        msg: '类型不能为空哦',
        code: 400
      })
      return
    }
    // 设置封面
    cover = config.serverAddress + `/static/articles/${req.file.filename}`
    // 获取文章
    if (
      article.addArticle({
        title,
        content,
        cover,
        type,
        date,
        author: '管理员',
        state
      })
    ) {
      res.send({
        msg: '发布成功',
        code: 201
      })
    } else {
      res.send({
        msg: '发布失败',
        code: 400
      })
    }
    // 类型判断
    // res.send(req.file)
  },
  // 文章编辑
  article_edit (req, res) {
    const id = req.body.id
    // 获取数据
    const title = req.body.title
    const type = req.body.type
    const date = req.body.date
    const content = req.body.content
    let cover

    // id不能为空
    if (!id || isNaN(id)) {
      res.send({
        msg: 'id不能为空',
        code: 400
      })
      return
    }
    // 标题判断
    if (!title) {
      res.send({
        msg: '标题不能为空哦',
        code: 400
      })
      return
    }
    // 标题判断
    if (!type) {
      res.send({
        msg: '类型不能为空哦',
        code: 400
      })
      return
    } else {
    }

    // 允许的图片类型
    if (req.file) {
      if (req.file.size > 1024 * 1024 || ['image/gif', 'image/png', 'image/jpeg'].indexOf(req.file.mimetype) == -1) {
        res.send({
          msg: '文件大小或类型不对，请检查',
          code: 400
        })
        fs.unlinkSync(path.join(__dirname, '../', req.file.path))
        return
      }
      cover = config.serverAddress + `/static/articles/${req.file.filename}`
    }
    // 设置封面
    // 修改文章
    if (article.editArticle({ id, title, type, content, cover, date })) {
      res.send({
        msg: '修改成功',
        code: 200
      })
    } else {
      res.send({
        msg: '修改失败，请检查参数',
        code: 400
      })
    }

    // 类型判断
    // res.send(req.file)
  },

  // 文章删除
  article_delete (req, res) {
    console.log('article_delete....', req.query.id)
    // 获取id
    if (!req.query.id) {
      res.send({ msg: 'id不能为空', code: 400 })
      return
    }
    // 获取id
    const id = req.query.id
    if (isNaN(id)) {
      res.send({ msg: 'id无效,请检查', code: 400 })
      return
    }

    // 删除
    if (article.del(id)) {
      res.send({ msg: '删除成功', code: 200 })
    } else {
      res.send({ msg: '删除失败，请检查', code: 200 })
    }
  }
}
