const Genre = require('../models/genre');
const {
    body,
    validationResult
} = require('express-validator/check');
const {
    sanitizeBody
} = require('express-validator/filter');

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
    res.render('genre_form', {
        title: 'Create Genre'
    });
};

// 由 POST 处理书籍类型创建操作
exports.genre_create_post = [
    // Validate that the name field is not empty.
    body('name', 'Genre name required').isLength({
        min: 1
    }).trim(),

    // Sanitize (trim and escape) the name field.
    sanitizeBody('name').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a genre object with escaped and trimmed data.
        var genre = new Genre({
            name: req.body.name
        });


        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            res.render('genre_form', {
                title: 'Create Genre',
                genre: genre,
                errors: errors.array()
            });
            return;
        } else {
            // Data from form is valid.
            // Check if Genre with same name already exists.
            Genre.findOne({
                    'name': req.body.name
                })
                .exec(function (err, found_genre) {
                    if (err) {
                        return next(err);
                    }

                    if (found_genre) {
                        // Genre exists, redirect to its detail page.
                        res.redirect(found_genre.url);
                    } else {

                        genre.save(function (err) {
                            if (err) {
                                return next(err);
                            }
                            // Genre saved. Redirect to genre detail page.
                            res.redirect(genre.url);
                        });

                    }

                });
        }
    }
]

// 由 GET 显示删除书籍类型的表单
exports.genre_delete_get = (req, res) => {
    async.parallel({
        genre: function (callback) {
            Genre.findById(req.params.id).exec(callback)
        },
        genre_books: function (callback) {
            Book.find({
                'genre': req.params.id
            }).exec(callback)
        },
    }, function (err, results) {
        if (err) {
            return next(err);
        }
        if (results.genre == null) { // No results.
            res.redirect('/catalog/genres');
        }
        // Successful, so render.
        res.render('genre_delete', {
            title: 'Delete Genre',
            genre: results.genre,
            genre_books: results.genre_books
        });
    });
};

// 由 POST 处理书籍类型删除操作
exports.genre_delete_post = (req, res) => {
    async.parallel({
        genre: function (callback) {
            Genre.findById(req.body.genreid).exec(callback)
        },
        genre_books: function (callback) {
            Book.find({
                'genre': req.body.genreid
            }).exec(callback)
        },
    }, function (err, results) {
        if (err) {
            return next(err);
        }
        // Success
        if (results.genre_books.length > 0) {
            res.render('genre_books', {
                title: 'Delete Genre',
                genre: results.genre,
                genre_books: results.genre_books
            });
            return;
        } else {
            Genre.findByIdAndRemove(req.body.genreid, function deleteGenre(err) {
                if (err) {
                    return next(err);
                }
                // Success - go to author list
                res.redirect('/catalog/genres')
            })
        }
    });
};

// 由 GET 显示更新书籍类型的表单
exports.genre_update_get = (req, res) => {
    Genre.findById(req.params.id, function (err, genre) {
        if (err) {
            return next(err);
        }
        if (genre == null) { // No results.
            var err = new Error('Genre not found');
            err.status = 404;
            return next(err);
        }
        // Success.
        res.render('genre_form', {
            title: 'Update Genre',
            genre: genre
        });
    });
};

// 由 POST 处理书籍类型更新操作
exports.genre_update_post = [

    // Validate that the name field is not empty.
    body('name', 'Genre name required').isLength({
        min: 1
    }).trim(),

    // Sanitize (escape) the name field.
    sanitizeBody('name').escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request .
        const errors = validationResult(req);

        // Create a genre object with escaped and trimmed data (and the old id!)
        var genre = new Genre({
            name: req.body.name,
            _id: req.params.id
        });


        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values and error messages.
            res.render('genre_form', {
                title: 'Update Genre',
                genre: genre,
                errors: errors.array()
            });
            return;
        } else {
            // Data from form is valid. Update the record.
            Genre.findByIdAndUpdate(req.params.id, genre, {}, function (err, thegenre) {
                if (err) {
                    return next(err);
                }
                // Successful - redirect to genre detail page.
                res.redirect(thegenre.url);
            });
        }
    }
];