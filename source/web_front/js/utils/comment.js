var comment = {
    add:function(name,content,article_id ){
        return $.post(APIURLS.comment_add,{
            'name': name,
            'content' : content,
            'article_id': article_id
        })
    },
    get_lastest:function(){
        return $.get(APIURLS.comments_lastest)
    },
    get:function(article_id){
        return $.get(APIURLS.comment_get,
            {   
                'article_id': article_id
            }
        )
    }
}