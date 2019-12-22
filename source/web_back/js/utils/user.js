
// 模块
// 把所有的，有关于用户的操作全写在一起
var user = {
    logout:  callback => $.post(APIURLS.user_logout,res=>callback(res)), 

    login: function(myName, myPassword, callback) {
        // console.log(myName,myPassword)
        $.post(APIURLS.user_login,
            {
                user_name: myName, 
                password:myPassword
            },
            function(res){
                callback(res)
            }
        )
    },
    getInfo: function(callback) {
        // $.get(地址，参数，回调)
        $.get(APIURLS.user_getInfo,function(res){
            callback(res)
        })
    }
}