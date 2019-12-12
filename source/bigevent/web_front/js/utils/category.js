
var category = {
    show : function( callback ){
        if(callback) {
            $.get(APIURLS.category_show,function(res){
                callback(res)
            })
        } else {
            return $.get(APIURLS.category_show)
        }
    }
}