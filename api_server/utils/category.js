const fs = require('fs')
const path = require('path')
// 基地址
const basePath = path.join(__dirname, '../db')
// 读取数据
module.exports = {

  getCategory () {
    try {
      const category = JSON.parse(fs.readFileSync(path.join(basePath, 'category.json'), 'utf-8'))
      return category
    } catch (error) {
      const data = []
      fs.writeFileSync(path.join(basePath, 'category.json'), JSON.stringify(data))
      return data
    }
  },
  addCategory ({ name, slug }) {
    const categorys = this.getCategory()
    const idx = categorys.findIndex(item => item.name === name)
    if (idx !== -1) {
      console.log(`添加类别失败： name:${name}重复`)
      return false
    }
    categorys.push({
      id: Date.now(),
      name,
      slug
    })
    try {
      fs.writeFileSync(path.join(basePath, 'category.json'), JSON.stringify(categorys))
      return true
    } catch (error) {
      return false
    }
  },
  editCategory ({ id, name, slug }) {
    id = Number(id)
    const categorys = this.getCategory()
    const category = categorys.find(item => item.id === id)
    if (category) {
      category.name = name
      category.slug = slug

      try {
        fs.writeFileSync(path.join(basePath, 'category.json'), JSON.stringify(categorys))
        return true
      } catch (error) {
        return false
      }
    } else {
      return false
    }
  },
  del (id) {
    const categorys = this.getCategory()
    const idx = categorys.findIndex(item => item.id == id)
    if (idx === -1) {
      console.log(`删除类别失败： 没有找到这个${id}`)
      return false
    } else {
      try {
        categorys.splice(idx, 1)
        fs.writeFileSync(path.join(basePath, 'category.json'), JSON.stringify(categorys))
        return true
      } catch (error) {
        console.log('删除类别失败： 写入失败')
        return false
      }
    }
  }
}
