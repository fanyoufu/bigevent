## 基地址

接口的默认基地址为 http://localhost:8000。

- localhost它表示一个特殊的ip地址，就是当前电脑的地址。
- 如果你的api_server并不是在本机上运行，则这个localhost应该改成运行api_server的那台电脑的ip地址。
- 所有接口的完整地址均需要加上这个部分。



## 状态说明

| *状态码* | *含义*                | *说明*                                              |
| -------- | --------------------- | --------------------------------------------------- |
| 200      | OK                    | 请求成功                                            |
| 201      | CREATED               | 创建成功                                            |
| 204      | DELETED               | 删除成功                                            |
| 400      | BAD REQUEST           | 请求的地址不存在或者包含不支持的参数                |
| 401      | UNAUTHORIZED          | 未授权                                              |
| 403      | FORBIDDEN             | 被禁止访问                                          |
| 404      | NOT FOUND             | 请求的资源不存在                                    |
| 422      | Unprocesable entity   | [POST/PUT/PATCH] 当创建一个对象时，发生一个验证错误 |
| 500      | INTERNAL SERVER ERROR | 内部错误                                            |



## 前台接口



### 文章类型

请求地址：/category

请求方式：get

请求参数：无

返回数据：

| 名称 | 类型       | 说明     |
| ---- | ---------- | -------- |
| id   | number类型 | 类别id   |
| name | string类型 | 类别名称 |



### 文章搜索

请求地址：/search

请求方式：get

请求参数：

|  名称   |  类型  | 说明                                         |
| :-----: | :----: | -------------------------------------------- |
|   key   | string | 搜索关键词，可以为空，为空返回某类型所有文章 |
|  type   | number | 文章类型编号，可以为空，为空返回所有类型文章     |
|  page   | number | 当前页，为空返回第1页                        |
| perpage | number | 每页显示条数，为空默认每页6条                |

返回数据：

| 名称  |  类型  | 说明                                                         |
| :---: | :----: | ------------------------------------------------------------ |
| pages | number | 总页数                                                       |
| page  | number | 当前页                                                       |
| data  | array  | 文章数据数组，其中每个成员包含字段：<br />id: number类型，文章id<br>title:  string类型，文章标题<br>intro: string类型，文章文字内容截取<br />cover: string类型，文章封面图片地址<br />type: string类型，文章类型<br />read: number类型，文章阅读次数<br />comment: number类型，文章评论次数<br />date: string类型， 文章发布时间 |

返回数据结构示例：

```json
{
    "pages":5,
    "page":2,
    "data":[
        {
            "id":1,
            "title":'文章标题文字...',
            "intro":'文章内容文字...',
            "cover":'dfgh/hijk/iui8989.jpg'
            ......
        }
        ......
    ]
}
```



### 文章热门排行

请求地址：/rank

请求方式：get

请求参数：

​	type: 类别编号。如果不传则在全部的类别中进行排行。

返回数据：（只返回7条）

| 名称  | 类型       | 说明       |
| ----- | ---------- | ---------- |
| id    | number类型 | 文章id     |
| title | string     | 文章标题   |
| read  | number     | 阅读的次数 |



### 最新资讯

请求地址：/lastest

请求方式：get

请求参数：无

返回数据：（只返回5条）



| 名称 |    类型    | 说明                                                         |
| :--: | :--------: | ------------------------------------------------------------ |
| msg  |   string   | 字符串                                                       |
| code |   number   | 状态                                                         |
| data | array。5条 | 文章数据数组，其中每个成员包含字段：<br />id: number类型，文章id<br>title:  string类型，文章标题<br>intro: string类型，文章文字内容截取<br />cover: string类型，文章封面图片地址<br />type: string类型，文章类型<br />read: number类型，文章阅读次数<br />comment: number类型，文章评论次数<br />date: number类型，时间 戳 |

返



### 最新评论

请求地址：/get_latest_comment

请求方式：get

请求参数：

​	type: 类别编号。如果不传则在全部的类别中进行排行。

返回数据：（只返回6条）

|  名称   |  类型  | 说明       |
| :-----: | :----: | ---------- |
|  name   | string | 用户名称   |
|   dt    |  int   | 评论时间戳 |
| content | string | 评论内容   |





### 文章详情

请求地址：/article

请求方式：get

请求参数：

| 名称 | 类型   | 说明   |
| ---- | ------ | ------ |
| id   | string | 文章id |

返回数据：

| 名称      | 类型   | 说明                                                         |
| --------- | ------ | ------------------------------------------------------------ |
| title     | string | 文章标题                                                     |
| author    | string | 文章作者                                                     |
| type_name | string | 文章类型名称                                                 |
| type_id   | number | 文章类型编号                                                 |
| date      | string | 文章发布时间                                                 |
| read      | number | 阅读次数                                                     |
| comment   | number | 评论条数                                                     |
| content   | string | 文章内容                                                     |
| prev      | object | 上一篇文章<br />id： 上一篇文章的id<br />title：上一篇文章的标题 |
| next      | object | 下一篇文章<br />id： 下一篇文章的id<br />title：下一篇文章的标题 |

### 发表评论

请求地址：/post_comment

请求方式：post

请求参数：

| 名称       | 类型   | 说明               |
| ---------- | ------ | ------------------ |
| name       | string | 用户名称           |
| content    | string | 评论内容           |
| article_id | number | 要评论的文章的编号 |

返回数据：对象。



### 评论列表

获取指定文章的评论

请求地址：/get_comments

请求方式：get

请求参数：

| 名称       | 类型        | 说明   |
| ---------- | ----------- | ------ |
| article_id | number,必填 | 文章id |

返回数据：数组对象。



## 后台接口

### 用户登录

请求地址：基地址/admin/login

请求方式：post

请求参数：

| 名称      | 类型   | 说明            |
| --------- | ------ | --------------- |
| user_name | string | 用户名（admin） |
| password  | string | 密码(123456)    |

返回数据：

| 名称 |  类型  | 说明                                      |
| :--: | :----: | ----------------------------------------- |
| msg  | string | 文字信息   登录成功     用户名或密码出错  |



### 退出登录

请求地址：基地址/admin/logout

请求方式：post

请求参数：无

返回数据：对象



### 获取用户信息

请求地址：基地址/admin/getuser

请求方式：get

请求参数：无

返回数据：

|   名称   |  类型  | 说明         |
| :------: | :----: | ------------ |
| nickname | string | 用户昵称     |
| user_pic | string | 用户图片地址 |



### 文章数量统计

请求地址：基地址/admin/article_count

请求方式：get

请求参数：

返回数据：

|   名称    |  类型  | 说明                 |
| :-------: | :----: | -------------------- |
| all_count | number | 文章总数             |
| day_count | number | 当天文章发布文章总数 |



### 评论数量统计

请求地址：基地址/admin/comment_count

请求方式：get

请求参数：

返回数据：

|   名称    |  类型  | 说明             |
| :-------: | :----: | ---------------- |
| all_count | number | 评论总数         |
| day_count | number | 当天发布评论总数 |



### 月新增文章数

请求地址：基地址/admin/month_article_count

请求方式：get

请求参数：空

返回数据：（返回30条）

|   名称    |  类型  | 说明           |
| :-------: | :----: | -------------- |
|    day    | string | 日期           |
| day_count | number | 当天新增文章数 |

返回数据结构示例：

```json
[
    {
        "day":"2019-04-18",
        "day_count":135        
    },
    {
        "day":"2019-04-19",
        "day_count":145        
    },
    {
        "day":"2019-04-20",
        "day_count":168        
    },
	{
        "day":"2019-04-21",
        "day_count":110        
    },
	{
        "day":"2019-04-22",
        "day_count":147        
    }
    ......
]
```



### 各类型文章数量统计

请求地址：基地址/admin/article_category_count

请求方式：get

请求参数：

返回数据：（有多少类型，就返回多少条）

|   名称    |  类型  | 说明           |
| :-------: | :----: | -------------- |
|   type    | string | 文章类型       |
| all_count | number | 该类型文章总数 |



### 月文章访问量

请求地址：基地址/admin/article_category_visit

请求方式：post

请求参数：

返回数据：（返回最近6各月的，也就是6条）

|   名称    |  类型  | 说明                                                         |
| :-------: | :----: | ------------------------------------------------------------ |
|   month   | string | 月份                                                         |
| all_count | array  | 该月份各类型文章访问量<br />type：string，文章类型<br />count：number，该类型文章访问量 |

返回数据结构示例：

```json
[
    {
        "month":'1月',
        "all_count":[
            {
             "type":"科技",
             "count":237
            },
            {
             "type":"经济",
             "count":237
            },
            {
             "type":"股市",
             "count":237
            },
    		{
             "type":"商品",
             "count":237
            },
            {
             "type":"外汇",
             "count":237
            }
        ]
    },
    {
        "month":'2月',
        "all_count":[
            {
             "type":"科技",
             "count":237
            },
            {
             "type":"经济",
             "count":237
            },
            {
             "type":"股市",
             "count":237
            },
    		{
             "type":"商品",
             "count":237
            },
            {
             "type":"外汇",
             "count":237
            }
        ]
    },
    {
        "month":'三月',
        "all_count":[
            {
             "type":"科技",
             "count":237
            },
            {
             "type":"经济",
             "count":237
            },
            {
             "type":"股市",
             "count":237
            },
    		{
             "type":"商品",
             "count":237
            },
            {
             "type":"外汇",
             "count":237
            }
        ]
    }
    ......
    
]
```



### 文章搜索

请求地址：基地址/admin/search

请求方式：get

请求参数：

|  名称   |  类型  | 说明                                                         |
| :-----: | :----: | ------------------------------------------------------------ |
|   key   | string | 搜索关键词，**可以为空**，为空返回某类型所有文章             |
|  type   | number | 文章类型的编号，**可以为空**，为空返回所有类型文章           |
|  state  | string | 文章状态，"草稿"或者"已发布"， 为空就是两种可以              |
|  page   | number | 当前页，**为空**返回第1页                                    |
| perpage | number | 每页显示条数，**为空**默认每页6条                            |
|   id    | number | 文章id，根据id查询时，其余参数可以不选择。用来查询某一篇文章的详情 |

返回数据：

| 名称  |  类型  | 说明                                                         |
| :---: | :----: | ------------------------------------------------------------ |
| pages | number | 总页数                                                       |
| page  | number | 当前页                                                       |
| data  | array  | 文章数据数组，其中每个成员包含字段：<br />id: number类型，文章id<br />title:  string类型，文章标题<br />intro: string类型，文章文字内容截取<br />cover: string类型，文章封面图片地址<br />type: string类型，文章类型<br />read: number类型，文章阅读次数<br />comment: number类型，文章评论次数<br />date:string类型， 文章发布时间<br />state:string类型，文章状态 |



### 发布文章

请求地址：基地址/admin/article_publish

请求方式：post

请求参数：formData

| 名称    | 类型   | 说明         |
| ------- | ------ | ------------ |
| title   | string | 文章标题     |
| cover   | file   | 文章封面图片 |
| type     | number | 文章类型id   |
| date    | string | 日期         |
| content | string | 文章内容     |
| state | string | 文章状态(草稿或已发布) |

返回数据：

| 名称 |  类型  | 说明                              |
| :--: | :----: | --------------------------------- |
| msg  | string | 文字信息  ‘发布成功’   ‘发布失败’ |



### 文章编辑

请求地址：基地址/admin/article_edit

请求方式：post

请求参数：

| 名称    | 类型   | 说明         |
| ------- | ------ | ------------ |
| id      | number | 文章id       |
| title   | string | 文章标题     |
| cover   | file   | 文章封面图片 |
| type    | number | 文章类型id   |
| date    | string | 日期         |
| content | string | 文章内容     |

返回数据：

| 名称 |  类型  | 说明                              |
| :--: | :----: | --------------------------------- |
| msg  | string | 文字信息  ‘修改成功’   ‘修改失败’ |



### 删除文章

请求地址：基地址/admin/article_delete

请求方式：get

请求参数：

| 名称 | 类型   | 说明   |
| ---- | ------ | ------ |
| id   | number | 文章id |

返回数据：

| 名称 |  类型  | 说明                              |
| :--: | :----: | --------------------------------- |
| msg  | string | 文字信息  ‘删除成功’   ‘删除失败’ |



### 文章类别搜索

请求地址：基地址/admin/category_search

请求方式：get

请求参数：无

返回数据：

| 名称 |  类型  | 说明     |
| :--: | :----: | -------- |
|  id  | number | 类别     |
| name | string | 类别名称 |
| slug | string | 别名     |



### 新增文章类别

请求地址：基地址/admin/category_add

请求方式：post

请求参数：

| 名称 | 类型   | 说明     |
| ---- | ------ | -------- |
| name | string | 类别名称 |
| slug | string | 别名     |

返回数据：

| 名称 |  类型  | 说明                              |
| :--: | :----: | --------------------------------- |
| msg  | string | 文字信息  ‘增加成功’   ‘增加失败’ |



### 编辑文章类别

请求地址：基地址/admin/category_edit

请求方式：post

请求参数：

| 名称 | 类型   | 说明     |
| ---- | ------ | -------- |
| id   | number | 文章id   |
| name | string | 类别名称 |
| slug | string | 别名     |

返回数据：

| 名称 |  类型  | 说明                              |
| :--: | :----: | --------------------------------- |
| msg  | string | 文字信息  ‘编辑成功’   ‘编辑失败’ |



### 删除文章类别

请求地址：基地址/admin/category_delete

请求方式：post

请求参数：

| 名称 | 类型   | 说明   |
| ---- | ------ | ------ |
| id   | number | 类别id |

返回数据：

| 名称 |  类型  | 说明                              |
| :--: | :----: | --------------------------------- |
| msg  | string | 文字信息  ‘删除成功’   ‘删除失败’ |



### 文章评论搜索

请求地址：基地址/admin/comment_search

请求方式：get

请求参数：

|  名称   |  类型  | 说明                          |
| :-----: | :----: | ----------------------------- |
|  page   | number | 当前页，为空返回第1页         |
| perpage | number | 每页显示条数，为空默认每页6条 |

返回数据：

|  名称   |  类型  | 说明                     |
| :-----: | :----: | ------------------------ |
|   id    | number | 评论id                   |
| author  | string | 评论作者                 |
| content | string | 评论内容                 |
|   aid   | number | 对应文章id               |
|  title  | string | 对应文章标题             |
|  date   | string | 评论发表时间             |
|  state  | string | 评论状态 ‘批准’ ‘待审核’ |



### 评论审核通过

请求地址：基地址/admin/comment_pass

请求方式：post

请求参数：

| 名称 | 类型   | 说明   |
| ---- | ------ | ------ |
| id   | number | 评论id |

返回数据：

| 名称 |  类型  | 说明                              |
| :--: | :----: | --------------------------------- |
| msg  | string | 文字信息  ‘设置成功’   ‘设置失败’ |



### 评论审核不通过

请求地址：基地址/admin/comment_reject

请求方式：post

请求参数：

| 名称 | 类型   | 说明   |
| ---- | ------ | ------ |
| id   | number | 评论id |

返回数据：

| 名称 |  类型  | 说明                              |
| :--: | :----: | --------------------------------- |
| msg  | string | 文字信息  ‘设置成功’   ‘设置失败’ |



### 删除评论

请求地址：基地址/admin/comment_delete

请求方式：post

请求参数：

| 名称 | 类型   | 说明   |
| ---- | ------ | ------ |
| id   | number | 评论id |

返回数据：

| 名称 |  类型  | 说明                              |
| :--: | :----: | --------------------------------- |
| msg  | string | 文字信息  ‘删除成功’   ‘删除失败’ |



### 获取用户信息

请求地址：基地址/admin/userinfo_get

请求方式：get

请求参数：无

返回数据：

|   名称   |  类型  | 说明         |
| :------: | :----: | ------------ |
| username | string | 用户名称     |
| nickname | string | 用户昵称     |
|  email   | string | 用户邮箱     |
| user_pic | string | 用户图片地址 |
| password | string | 用户密码     |



### 编辑用户信息

请求地址：基地址/admin/userinfo_edit

请求方式：post

请求参数：使用formdata提交

|   名称   |  类型  | 说明         |
| :------: | :----: | ------------ |
| username | string | 用户名称     |
| nickname | string | 用户昵称     |
|  email   | string | 用户邮箱     |
| user_pic | string | 用户图片地址 |
| password | string | 用户密码     |

返回数据：

| 名称 |  类型  | 说明                              |
| :--: | :----: | --------------------------------- |
| msg  | string | 文字信息  ‘修改成功’   ‘修改失败’ |

