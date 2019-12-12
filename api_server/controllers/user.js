const path = require('path')
const db = require(path.join(__dirname, '../utils/db'))
const config = require(path.join(__dirname, '../utils/config'))
const jwt = require('jsonwebtoken')
module.exports = {
  // 用户登录
  login (req, res) {
    // 数据获取
    const user_name = req.body.user_name || ''
    const password = req.body.password || ''
    // 类型判断
    if (user_name === 'admin' && password === '123456') {
      const secretOrPrivateKey = 'jwt' // 这是加密的key（密钥）
      const token = jwt.sign({ user_name: 'admin' }, secretOrPrivateKey, {
        expiresIn: 60 * 60 * 1 // 1小时过期
      })
      // res.setHeader('set-cookie', ['token=' + token]);
      res.cookie('token', token)
      // res.setHeader('set-cookie', [`token=${token};expires=${new Date(Date.now() -100).toUTCString()}`]);
      // res.setHeader('set-cookie', [`token=${token};expires=${new Date(Date.now() -100).toUTCString()}`]);
      res.send({
        msg: '登录成功',
        code: 200
      })
    } else {
      res.send({
        msg: '用户名或密码错误',
        code: 400
      })
    }
  },
  // 用户登出
  logout (req, res) {
    res.send({
      msg: '登出成功',
      code: 200
    })
  },
  // 获取用户信息
  getuser (req, res) {
    let { nickname, user_pic } = db.getUser()
    user_pic = config.serverAddress + user_pic
    // 获取用户信息
    res.send({
      msg: '获取成功',
      code: 200,
      data: { nickname, user_pic }
    })
  }
}
