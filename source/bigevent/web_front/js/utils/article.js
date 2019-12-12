
var article = {
    
    // 获取主页中的焦点图
    getFiveFocus: function(callback){
        $.get(APIURLS.article_search,
            {
                perpage: 5,
                state: '已发布'
            },
            function(res){
            callback(res)
        })
    },
    // 获取文章详情
    getDetail: function(id, callback){
        $.get(APIURLS.article_detail,
            {id},
            function(res){
                callback(res)
            }
        )
    },
    
    // 最新资讯
    getLastest: function(callback){
        $.get(APIURLS.article_lastest,
            function(res){
                callback(res)
            }
        )
    },

    // 列表页 
    getList: function({type,page},callback){
        $.get(APIURLS.article_search,
            {
                type, page
            },
            function(res){
                callback(res)
            }
        )
    },
    getRank: function({type},callback){
        $.get(APIURLS.article_rank,
            {type},
            function(res){
                callback(res)
            }
        )
    },
}