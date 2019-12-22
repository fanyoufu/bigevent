const { getIPAdress } = require('./ipAdress')
var ip = getIPAdress()
ip = ip || 'localhost'
module.exports = {
  // serverAddress:'https://autumnfish.cn/big'
  serverAddress: `http://${ip}:8000`
}
