const Book = require('../models/book');

// 站点首页
exports.index = (req, res) => {
    res.send('未实现：站点首页');
};

// 显示完整的书籍列表
exports.book_list = (req, res) => {
    res.send('未实现：书籍列表');
};

// 为每本书籍显示详细信息的页面
exports.book_detail = (req, res) => {
    res.send('未实现：书籍详细信息：' + req.params.id);
};

// 由 GET 显示创建书籍的表单
exports.book_create_get = (req, res) => {
    res.send('未实现：书籍创建表单的 GET');
};

// 由 POST 处理书籍创建操作
exports.book_create_post = (req, res) => {
    res.send('未实现：创建书籍的 POST');
};

// 由 GET 显示删除书籍的表单
exports.book_delete_get = (req, res) => {
    res.send('未实现：书籍删除表单的 GET');
};

// 由 POST 处理书籍删除操作
exports.book_delete_post = (req, res) => {
    res.send('未实现：删除书籍的 POST');
};

// 由 GET 显示更新书籍的表单
exports.book_update_get = (req, res) => {
    res.send('未实现：书籍更新表单的 GET');
};

// 由 POST 处理书籍更新操作
exports.book_update_post = (req, res) => {
    res.send('未实现：更新书籍的 POST');
};