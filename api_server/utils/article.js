const fs = require('fs')
const path = require('path')
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
      return JSON.parse(fs.readFileSync(path.join(basePath, 'article.json'), 'utf-8'))
    } catch (err) {
      const article = [
        // {
        //   id: 1,
        //   title: '西兰花好好吃',
        //   content: '多次西兰花有益身心健康',
        //   cover: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2189299806,3304117673&fm=179&app=42&f=JPEG?w=121&h=140',
        //   type: '1',
        //   read: '10',
        //   comment: '10',
        //   date: '2019-5-22'
        // }
      ]
      fs.writeFileSync(path.join(basePath, 'article.json'), JSON.stringify(article))
      return article
    }
  },

  // 添加文章
  addArticle ({ title, content, cover, type, date, state = '草稿' }) {
    const article = this.getArticle()
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
  editArticle ({ id, title, content, cover, type, isDelete, date }) {
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

    // log(editOne);
    // 保存
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
