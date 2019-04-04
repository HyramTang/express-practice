const BookInstance = require('../models/bookinstance');

// 显示完整的书籍实例列表
exports.bookinstance_list = function (req, res, next) {

    BookInstance.find()
        .populate('book')
        .exec(function (err, list_bookinstances) {
            if (err) {
                return next(err);
            }
            // Successful, so render
            res.render('bookinstance_list', {
                title: 'Book Instance List',
                bookinstance_list: list_bookinstances
            });
        });

};

// 为每位书籍实例显示详细信息的页面
exports.bookinstance_detail = (req, res) => {
    BookInstance.findById(req.params.id)
        .populate('book')
        .exec(function (err, bookinstance) {
            if (err) {
                return next(err);
            }
            if (bookinstance == null) { // No results.
                var err = new Error('Book copy not found');
                err.status = 404;
                return next(err);
            }
            // Successful, so render.
            res.render('bookinstance_detail', {
                title: 'Book:',
                bookinstance: bookinstance
            });
        });
};

// 由 GET 显示创建书籍实例的表单
exports.bookinstance_create_get = (req, res) => {
    res.send('未实现：书籍实例创建表单的 GET');
};

// 由 POST 处理书籍实例创建操作
exports.bookinstance_create_post = (req, res) => {
    res.send('未实现：创建书籍实例的 POST');
};

// 由 GET 显示删除书籍实例的表单
exports.bookinstance_delete_get = (req, res) => {
    res.send('未实现：书籍实例删除表单的 GET');
};

// 由 POST 处理书籍实例删除操作
exports.bookinstance_delete_post = (req, res) => {
    res.send('未实现：删除书籍实例的 POST');
};

// 由 GET 显示更新书籍实例的表单
exports.bookinstance_update_get = (req, res) => {
    res.send('未实现：书籍实例更新表单的 GET');
};

// 由 POST 处理书籍实例更新操作
exports.bookinstance_update_post = (req, res) => {
    res.send('未实现：更新书籍实例的 POST');
};