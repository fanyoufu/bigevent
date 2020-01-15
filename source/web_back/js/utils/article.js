var article = {
    // 作用：获取第curPage页，类型是tpype,状态是state 的数据 
    show: function(curPage,type,state, callback){
        // 根据接口的定义，要请哪一页的数据，就传对应的值给page
        return $.get(APIURLS.article_show,
            {
                page: curPage,
                type,
                state
            })
    },
    // 删除文章
    del: function(id,callback){
        return $.get(APIURLS.article_del,{id})
    },
    // 添加文章
    // 参数是formData对象
    add: function(fd){
        return $.ajax({
            url: APIURLS.article_add,
            type: 'post',
            data: fd,
            processData: false, // 不要让jquery去处理formdata数据
            contentType: false, // 不要使用默认的请求头
        })
    },
    // 编辑文章
    edit: function( fd){
        return $.ajax({
            url: APIURLS.article_edit,
            type: 'post',
            data: fd,
            processData: false, // 不要让jquery去处理formdata数据
            contentType: false, // 不要使用默认的请求头
            
        })
    },
    // 获取文章的详情
    getDetail: function(id){
        return $.get(APIURLS.article_show,
            {
                "id": id
            }
        )
    },
    getMonthCount:function(callback){
        return $.get(APIURLS.article_month_count)
    }

}