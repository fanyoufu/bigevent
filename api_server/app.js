// 导入express
const express = require('express')
// 日志中间件
const morgan = require('morgan')
// cors中间件
const cors = require('cors')
// 导入路由

const jwt = require('jsonwebtoken')
const frontRouter = require('./router/frontRouter')
const adminRouter = require('./router/adminRouter')
// 实例化服务器对象
const app = express()
// 导入bodyParser中间件
const bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
var cookieParser = require('cookie-parser')
app.use(cookieParser())
// 日志中间件
app.use(morgan('tiny'))
// cors
// app.use(cors());
app.all('*', function (req, res, next) {
  console.log(`${Date.now()}:来自${req.connection.remoteAddress} 访问了 ${req.method}-${req.url}`)
  // console.log('携带cookie:')
  // console.log(req.cookies)
  res.header('Access-Control-Allow-Origin', req.headers.origin) // 需要显示设置来源
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Credentials', true) // 带cookies
  next()
})

// 托管静态资源
app.use('/static', express.static('uploads'))
// 是否使用 权限
// console.log(process.argv)

if (process.argv[2] === 'token') {
  app.use('/admin', function (req, res, next) {
    console.log(Date.now(), req.url)
    if (req.url === '/login') {
      next()
    } else if (req.url === '/logout') {
      // res.clearCookie('token');
      res.cookie('token', '1', { expires: new Date(Date.now() - 1000 * 5) })
      next()
    } else {
      const { token } = req.cookies
      const secretOrPrivateKey = 'jwt' // 这是加密的key（密钥）
      jwt.verify(token, secretOrPrivateKey, (err, decode) => {
        console.log('jwt.verify', token)
        if (err) {
          //  时间失效的时候 || 伪造的token
          res.statusCode = 403
          res.send({ success: false, msg: '无权访问' })
        } else {
          next()
        }
      })
    }
  })
}
// 注册前台路由
app.use('/', frontRouter)
// 注册后台路由
app.use('/admin', adminRouter)

app.use((err, req, res, next) => {
  console.log(err)
  res.json({ code: 500, err })
})
// 开启监听
app.listen(8000, () => {
  console.log('大事件项目后端服务器启动：')
  console.log('端口为：8000')
  console.log('http://localhost:8000')
})
