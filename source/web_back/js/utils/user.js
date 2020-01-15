
// 模块
// 把所有的，有关于用户的操作全写在一起
var user = {
    logout:  () => $.post(APIURLS.user_logout), 

    login: function(myName, myPassword) {
        // console.log(myName,myPassword)
        return $.post(APIURLS.user_login,
            {
                user_name: myName, 
                password:myPassword
            }
        )
    },
    getInfo: function(callback) {
        // $.get(地址，参数，回调)
        return $.get(APIURLS.user_getInfo)
    }
}