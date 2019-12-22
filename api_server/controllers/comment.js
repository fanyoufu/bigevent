const path = require('path')
const db = require(path.join(__dirname, '../utils/db'))

// 导入提示
const message = require(path.join(__dirname, '../utils/message'))

// 导入数据验证
const cd = require(path.join(__dirname, '../utils/checkData'))
module.exports = {
  // 文章评论搜索
  comment_search(req, res) {
    // 数据获取
    let page = req.query.page
    let perpage = req.query.perpage
    // 数据判断
    if (cd.cExist(page) == false) {
      page = 1
    }
    if (!cd.cExist(perpage)) {
      perpage = 6
    }
    if (cd.cNum(page) == false) {
      message.invalidParameter(res, 'page')
      return
    }
    if (cd.cNum(perpage) == false) {
      message.invalidParameter(res, 'perpage')
      return
    }
    // 查询数据
    let comments = db.getComments()

    // 起始索引
    const startI = (page - 1) * perpage
    let endI = startI + perpage
    let data = []
    // 判断是否可以取到值
    if (startI > comments.length) {
      res.send({
        msg: '页码过大',
        code: 400
      })
    }
    if (endI > comments.length) {
      endI = comments.length
    }
    // 取值
    for (let i = startI; i < endI; i++) {
      data.push(comments[i])
    }
    res.send({
      msg: '获取成功',
      code: 200,
      data
    })
  },
  // 评论id验证
  comment_Check(req, res, next) {
    // 获取id
    let id = req.body.id

    if (!cd.cExist(id)) {
      message.invalidParameter(res, 'id')
      return
    }
    if (!cd.cNum(id)) {
      message.invalidParameter(res, 'id')
      return
    }
    // 查询数据
    const comments = db.getComments()
    const filterComments = comments.filter(v => {
      return v.id == id
    })
    if (filterComments.length == 0) {
      message.invalidParameter(res, 'id', '不存在')
      return
    }
    next()
  },
  // 评论审核通过
  comment_pass(req, res) {
    if (db.passComments(req.body.id, true)) {
      res.send({
        msg: '设置成功',
        code: 200
      })
    } else {
      res.send({
        msg: '设置失败,请重试',
        code: 400
      })
    }
  }, // 评论审核通过
  comment_reject(req, res) {
    if (db.passComments(req.body.id, false)) {
      res.send({
        msg: '设置成功',
        code: 200
      })
    } else {
      res.send({
        msg: '设置失败,请重试',
        code: 400
      })
    }
  },
  // 评论删除
  comment_delete(req, res) {
    if (db.deleteComments(req.body.id)) {
      res.send({
        msg: '删除成功',
        code: 200
      })
    } else {
      res.send({
        msg: '删除失败,请重试',
        code: 400
      })
    }
  }
}
