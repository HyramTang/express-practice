const Genre = require('../models/genre');
var Book = require('../models/book');
var async = require('async');

// 显示完整的书籍类型列表
exports.genre_list = (req, res) => {
    Genre.find().sort([
            ['name', 'ascending']
        ])
        .exec(function (err, list_genres) {
            if (err) {
                return next(err);
            }
            res.render('genre_list', {
                title: 'Genre List',
                genre_list: list_genres
            });
        });
};

// 为每位书籍类型显示详细信息的页面
exports.genre_detail = (req, res) => {
    async.parallel({
        genre: function (callback) {
            Genre.findById(req.params.id)
                .exec(callback);
        },
        genre_books: function (callback) {
            Book.find({
                    'genre': req.params.id
                })
                .exec(callback);
        },
    }, function (err, results) {
        if (err) {
            return next(err);
        }
        if (results.genre == null) { // No results.
            var err = new Error('Genre not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render
        res.render('genre_detail', {
            title: 'Genre Detail',
            genre: results.genre,
            genre_books: results.genre_books
        });
    });
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