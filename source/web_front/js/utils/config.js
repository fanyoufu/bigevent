// 整个项目的基地址
const BASE_URL = 'http://localhost:8000/'

// 列出所有用过的接口的地址
const APIURLS = {
   // 文章类别
   category_show: BASE_URL + 'category',
   // 文章详情
   article_detail: BASE_URL + 'article',
   // 最新资讯 共5条
   article_lastest: BASE_URL + 'lastest',
   // 文章搜索
   article_search: BASE_URL + 'search',
   // 文章排名
   article_rank: BASE_URL + 'rank',
   comments_lastest: BASE_URL + 'get_latest_comments',
   comment_add: BASE_URL + 'post_comment',
   comment_get: BASE_URL + 'get_comments'
}