// 整个项目的基地址
var baseUrl = 'http://localhost:8000/'

// 列出所有用过的接口的地址
var APIURLS = {
   user_logout: baseUrl + 'admin/logout',
   user_login: baseUrl + 'admin/login',
   user_getInfo: baseUrl + 'admin/getuser',

   category_show: baseUrl + 'admin/category_search',
   category_del: baseUrl + 'admin/category_delete',
   category_add: baseUrl + 'admin/category_add',
   category_edit: baseUrl + 'admin/category_edit',

   article_show: baseUrl + 'admin/search',
   article_del: baseUrl + 'admin/article_delete',
   article_add: baseUrl + 'admin/article_publish',
   article_edit: baseUrl + 'admin/article_edit',

   // 获取月新增文章数量
   article_month_count: baseUrl + 'admin/month_article_count'

}