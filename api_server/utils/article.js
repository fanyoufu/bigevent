const fs = require('fs')
const path = require('path')
const config = require(path.join(__dirname, '../utils/config'))

// 基地址
const basePath = path.join(__dirname, '../db')
// 读取数据

module.exports = {
  checkisExitType (typeId) {
    const article = this.getArticle()
    return !!article.find(it => it.type === typeId)
  },
  getArticle () {
    try {
      const list = JSON.parse(fs.readFileSync(path.join(basePath, 'article.json'), 'utf-8'))

      // 给封面图片补全地址
      list.forEach(item => {
        item.cover = item.cover.startsWith('http') ? item.cover : path.join(config.serverAddress, item.cover)
      })

      return list
    } catch (err) {
      const article = []
      fs.writeFileSync(path.join(basePath, 'article.json'), JSON.stringify(article))
      return article
    }
  },

  // 添加文章
  addArticle ({ title, content, cover, type, date, state = '草稿' }) {
    const list = JSON.parse(fs.readFileSync(path.join(basePath, 'article.json'), 'utf-8'))
    const article = list

    // const article = this.getArticle()
    article.push({
      id: Date.now(),
      title,
      content,
      cover,
      type,
      read: 0,
      comment: 0,
      date,
      author: '管理员',
      state: state
    })
    try {
      fs.writeFileSync(path.join(basePath, 'article.json'), JSON.stringify(article))
      return true
    } catch (error) {
      return false
    }
  },
  // 修改文章
  editArticle ({ id, title, content, cover, type, date }) {
    const article = this.getArticle()
    const editOne = article.find(v => {
      return v.id == id
    })
    if (!editOne) {
      return false
    }
    if (title) {
      editOne.title = title
    }
    if (content) {
      editOne.content = content
    }
    if (type) {
      editOne.type = type
    }
    if (date) {
      editOne.date = date
    }
    if (cover) {
      // 获取图片名
      const fileArr = editOne.cover.split('/')
      // 删除之前的图片
      fs.unlinkSync(path.join(__dirname, '../uploads/articles', fileArr[fileArr.length - 1]))
      editOne.cover = cover
    }

    try {
      fs.writeFileSync(path.join(basePath, 'article.json'), JSON.stringify(article))
      return true
    } catch (error) {
      return false
    }
  },

  // 删除文章
  del (id) {
    const articles = this.getArticle()
    const idx = articles.findIndex(v => {
      return Number(v.id) === Number(id)
    })
    if (idx !== -1) {
      articles.splice(idx, 1)
      console.log(`删除文章位置在${idx}`)
      try {
        fs.writeFileSync(path.join(basePath, 'article.json'), JSON.stringify(articles))
        return true
      } catch (error) {
        return false
      }
    } else {
      console.log(`删除文章失败，没有这个编号${id}`)
      return false
    }
  }
}
