const Genre=require('../models/genre');

// 显示完整的书籍类型列表
exports.genre_list = (req, res) => {
    res.send('未实现：书籍类型列表');
};

// 为每位书籍类型显示详细信息的页面
exports.genre_detail = (req, res) => {
    res.send('未实现：书籍类型详细信息：' + req.params.id);
};

// 由 GET 显示创建书籍类型的表单
exports.genre_create_get = (req, res) => {
    res.send('未实现：书籍类型创建表单的 GET');
};

// 由 POST 处理书籍类型创建操作
exports.genre_create_post = (req, res) => {
    res.send('未实现：创建书籍类型的 POST');
};

// 由 GET 显示删除书籍类型的表单
exports.genre_delete_get = (req, res) => {
    res.send('未实现：书籍类型删除表单的 GET');
};

// 由 POST 处理书籍类型删除操作
exports.genre_delete_post = (req, res) => {
    res.send('未实现：删除书籍类型的 POST');
};

// 由 GET 显示更新书籍类型的表单
exports.genre_update_get = (req, res) => {
    res.send('未实现：书籍类型更新表单的 GET');
};

// 由 POST 处理书籍类型更新操作
exports.genre_update_post = (req, res) => {
    res.send('未实现：更新书籍类型的 POST');
};