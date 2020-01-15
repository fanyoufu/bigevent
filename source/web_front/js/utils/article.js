
var article = {
    
    // 获取主页中的焦点图
    getFiveFocus: function(){
        return $.get(APIURLS.article_search,
            {
                perpage: 5,
                state: '已发布'
            })
    },
    // 获取文章详情
    getDetail: function(id){
        return $.get(APIURLS.article_detail,{id})
    },
    
    // 最新资讯
    getLastest: function(){
        return $.get(APIURLS.article_lastest)
    },

    // 列表页 
    getList: function({type,page}){
        return $.get(APIURLS.article_search,
            {
                type, page
            }
        )
    },
    getRank: function({type}={}){
        return $.get(APIURLS.article_rank,{type})
    }
}