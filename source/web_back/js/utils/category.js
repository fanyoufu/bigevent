
var category = {
    show : function( ){
        // alert('获取数据')
        return $.get(APIURLS.category_show)
    },
    del: function(id, callback){
        return $.post(APIURLS.category_del, {'id':id})
    },
    add: function(name,slug,callback){
        return $.post(APIURLS.category_add, {'name':name,'slug':slug})
    },
    edit: function(id,name,slug,callback){
        return $.post(APIURLS.category_edit, {'id': id, 'name':name,'slug':slug})
    }
}