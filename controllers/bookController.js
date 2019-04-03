var Book = require('../models/book');
var Author = require('../models/author');
var Genre = require('../models/genre');
var BookInstance = require('../models/bookinstance');

var async = require('async');

// 站点首页

exports.index = function (req, res) {

    async.parallel({
        book_count: function (callback) {
            Book.count({}, callback); // Pass an empty object as match condition to find all documents of this collection
        },
        book_instance_count: function (callback) {
            BookInstance.count({}, callback);
        },
        book_instance_available_count: function (callback) {
            BookInstance.count({
                status: 'Available'
            }, callback);
        },
        author_count: function (callback) {
            Author.count({}, callback);
        },
        genre_count: function (callback) {
            Genre.count({}, callback);
        },
    }, function (err, results) {
        res.render('index', {
            title: 'Local Library Home',
            error: err,
            data: results
        });
    });
};

// 显示完整的书籍列表
exports.book_list = function (req, res, next) {

    Book.find({}, 'title author')
        .populate('author')
        .exec(function (err, list_books) {
            if (err) {
                return next(err);
            }
            //Successful, so render
            res.render('book_list', {
                title: 'Book List',
                book_list: list_books
            });
        });

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