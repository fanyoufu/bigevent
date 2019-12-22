const fs = require('fs')
const path = require('path')
// 导入提示
const message = require(path.join(__dirname, '../utils/message'))
// 基地址
const BASEPATH = path.join(__dirname, '../db', 'comments.json')
module.exports = {

  // 添加新评论
  addComments ({ article_id, name, content }) {
    const comments = this.getComments({})
    const id = comments.length ? comments[comments.length - 1].id + 1 : 1
    comments.push({ id, article_id, name, content, state: '通过', dt: Date.now() })
    try {
      fs.writeFileSync(BASEPATH, JSON.stringify(comments))
      return true
    } catch (error) {
      return false 
    }
  },
  // 获取评论数据
  getComments ({ article_id = -1, state = 'all' } = {}) {
    article_id = Number(article_id)
    try {
      var comments = JSON.parse(fs.readFileSync(BASEPATH))
      if (state != 'all') {
        comments = comments.filter(item => item.state === state)
      }
      if (article_id > 0) {
        return comments.filter(item => Number(item.article_id) === article_id)
      }
      return comments
    } catch (error) {
      // const comments = [];
      // fs.writeFileSync(path.join(BASEPATH, 'comments.json'), JSON.stringify([]));
      return []
    }
  },

  // 通过评论
  passComments (id, isPass) {
    const comments = this.getComments()

    const c = comments.find(item => item.id === id)
    if (!c) {


      return false
    }
    c.state = isPass ? '批准' : '不通过'
    try {
      fs.writeFileSync(BASEPATH, JSON.stringify(comments))
      return true
    } catch (error) {
      return false
    }
  },
  // 删除评论
  deleteComments (id) {
    const comments = this.getComments()
    const idx = comments.findIndex(item => item.id === id)
    if (idx == -1) {
      return false
    }
    comments.splice(idx, 1)

    try {
      fs.writeFileSync(BASEPATH, JSON.stringify(comments))
      return true
    } catch (error) {
      return false
    }
  }
}
