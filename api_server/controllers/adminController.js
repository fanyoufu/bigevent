const path = require('path')
// 导入moment
const moment = require('moment')
// 导入提示
const message = require(path.join(__dirname, '../utils/message'))
// 导入配置
const config = require(path.join(__dirname, '../utils/config'))
// 获取用户信息
const db = require(path.join(__dirname, '../utils/db'))
// 导入fs
const fs = require('fs')
// 导入数据验证
const cd = require(path.join(__dirname, '../utils/checkData'))

const user = require('./user')
const article = require('./article')
const category = require('./category')
const comment = require('./comment')
console.log({ ...user })
module.exports = {
  ...user,
  ...article,
  ...category,
  ...comment,
  // 获取文章数量统计
  article_count (req, res) {
    res.send({
      msg: '文章统计获取成功',
      code: 200,
      data: {
        all_count: db.getArticle().length,
        day_count: 5
      }
    })
  },
  // 获取评论数量统计
  comment_count (req, res) {
    res.send({
      msg: '评论数量获取成功',
      code: 200,
      data: {
        all_count: db.getComments().length,
        day_count: 10
      }
    })
  },
  // 月新增文章获取
  month_article_count (req, res) {
    // 根据今天日期获取一个月的
    // 生成日期数组
    const data = []
    for (let i = 30; i >= 1; i--) {
      data.push({
        day: moment()
          .subtract(i, 'days')
          .format('YYYY-MM-DD'),
        day_count: parseInt(Math.random() * 300)
      })
    }

    res.send({
      msg: '月新增文章数获取成功',
      code: 200,
      data
    })
  },
  // 获取类型对应文章数
  article_category_count (req, res) {
    res.send({
      msg: '类型统计数据获取成功',
      code: 200,
      data: [
        {
          type: '科技',
          all_count: 1
        },
        {
          type: '财经',
          all_count: 1
        }
      ]
    })
  },
  // 月文章访问量
  article_category_visit (req, res) {
    res.send({
      msg: '月文章访问量获取成功',
      code: 200,
      data: [
        {
          month: '1月',
          all_count: [
            {
              type: '科技',
              count: 237
            },
            {
              type: '财经',
              count: 237
            }
          ]
        },
        {
          month: '2月',
          all_count: [
            {
              type: '科技',
              count: 237
            },
            {
              type: '财经',
              count: 237
            }
          ]
        },
        {
          month: '三月',
          all_count: [
            {
              type: '科技',
              count: 237
            },
            {
              type: '财经',
              count: 237
            }
          ]
        },
        {
          month: '四月',
          all_count: [
            {
              type: '科技',
              count: 123
            },
            {
              type: '财经',
              count: 456
            }
          ]
        },
        {
          month: '五月',
          all_count: [
            {
              type: '科技',
              count: 99
            },
            {
              type: '财经',
              count: 300
            }
          ]
        }
      ]
    })
  },

  // 获取用户信息
  userinfo_get (req, res) {
    // 获取用户信息
    const user = db.getUser()
    user.user_pic = config.serverAddress + user.user_pic
    res.send({
      msg: '用户信息获取成功',
      code: 200,
      data: user
    })
  },
  userinfo_edit (req, res) {
    // 获取用户数据
    const user = db.getUser()
    // 允许的图片类型
    // 如果文件存在
    if (req.file) {
      // 文件大小判断
      if (req.file.size > 1024 * 1024 || ['image/gif', 'image/png', 'image/jpeg'].indexOf(req.file.mimetype) == -1) {
        res.send({
          msg: '文件大小或类型不对，请检查',
          code: 400
        })
        try {
          fs.unlinkSync(path.join(__dirname, '../', req.file.path))
        } catch (error) {}
        return
      }
      try {
        // 删除之前的文件
        fs.unlinkSync(path.join(__dirname, '../uploads/', user.user_pic.split('/')[2]))
      } catch (error) {}

      // console
      //   .log
      //   // path.join(__dirname, '../uploads/', user.user_pic.split('/')[2])
      //   ()
      // 设置文件信息
      user.user_pic = '/static/' + req.file.filename
    }

    if (cd.cExist(req.body.username)) {
      user.username = req.body.username
    }
    if (cd.cExist(req.body.nickname)) {
      user.nickname = req.body.nickname
    }
    if (cd.cExist(req.body.email)) {
      user.email = req.body.email
    }
    if (cd.cExist(req.body.password)) {
      user.password = req.body.password
    }
    // 保存
    if (db.editUser(user)) {
      res.send({
        msg: '修改成功',
        code: 200
      })
    } else {
      res.send({
        msg: '修改失败，请重试'
      })
    }
  }
}
