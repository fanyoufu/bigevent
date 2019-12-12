const path = require('path');
const db = require(path.join(__dirname, '../utils/category'));
const article = require(path.join(__dirname, '../utils/article'));
const config = require(path.join(__dirname, '../utils/config'));

module.exports = {
  // 分类查询
  category_search(req, res) {
    // 获取所有并返回
    res.send({
      msg: '分类获取完毕',
      code: 200,
      data: db
        .getCategory()
        .filter(v => {
          return !v.isDelete;
        })
        .map(v => {
          const { name, slug, id } = v;
          return {
            id,
            name,
            slug
          };
        })
    });
  },
  // 分类新增
  category_add(req, res) {
    // 获取数据
    if (!req.body.name || !req.body.name.trim()) {
      res.send({
        msg: 'name不能为空',
        code: 400
      });
      return;
    }
    if (!req.body.slug || !req.body.slug.trim()) {
      res.send({
        msg: 'slug不能为空',
        code: 400
      });
      return;
    }
    // 取值
    const name = req.body.name.trim();
    const slug = req.body.slug.trim();

    // 判断是否存在
    const filterCate = db.getCategory().filter(v => {
      return v.name == name || v.slug == slug;
    });
    if (filterCate.length != 0) {
      res.send({
        msg: 'name或slug已存在,请检查',
        code: 400
      });
    } else {
      // 新增
      if (db.addCategory({ name, slug })) {
        res.send({
          msg: '新增成功',
          code: 200
        });
      } else {
        res.send({
          msg: '新增失败，请检查',
          code: 400
        });
      }
    }
  },
  // 分类编辑
  category_edit(req, res) {
    // 获取数据
    if (!req.body.id || !req.body.id.trim || isNaN(req.body.id)) {
      res.send({
        msg: 'id不对哦，请检查',
        code: 400
      });
    }
    // 获取数据
    if (!req.body.name || !req.body.name.trim()) {
      res.send({
        msg: 'name不能为空',
        code: 400
      });
      return;
    }
    if (!req.body.slug || !req.body.slug.trim()) {
      res.send({
        msg: 'slug不能为空',
        code: 400
      });
      return;
    }
    // 获取数据
    const id = req.body.id;
    const name = req.body.name;
    const slug = req.body.slug;
    if (
      db.getCategory().filter(v => {
        return v.id == id;
      }).length != 1
    ) {
      res.send({
        msg: 'id不存在哦',
        code: 400
      });
      return;
    }

    // 调用修改方法
    if (db.editCategory({ id, name, slug })) {
      res.send({
        msg: '修改成功',
        code: 200
      });
    } else {
      res.send({
        msg: '修改失败,请重试',
        code: 400
      });
    }
  },
  // 分类删除
  category_delete(req, res) {
    // 获取数据
    if (!req.body.id || !req.body.id.trim || isNaN(req.body.id)) {
      res.send({
        msg: 'id不对哦，请检查',
        code: 400
      });
    }
    // 获取数据
    const id = req.body.id;
    if(article.checkisExitType(id) == true) {
      res.send({
        msg: '还有这个类型的文章，不能删除',
        code: 400
      });
      return; 
    }
    
    if (
      db.getCategory().filter(v => {
        return v.id == id;
      }).length != 1
    ) {
      res.send({
        msg: `${id}不存在哦`,
        code: 400
      });
      return;
    }

    if (db.del(id)) {
      res.send({
        msg: '删除成功',
        code: 200
      });
    } else {
      res.send({
        msg: '删除失败,请重试',
        code: 400
      });
    }
  }
};
