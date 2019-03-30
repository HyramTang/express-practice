var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

var photos = [];

photos.push({
  name: 'Node.js Logo',
  path: 'https://nodejs.org/images/logos/nodejs-green.png'
})

photos.push({
  name: 'Hyram',
  path: 'https://nodejs.org/images/ryan-speaker.jpg'
});

router.get('/photos', function (req, res, next) {
  res.render('photos', {
    title: 'Photos',
    photos: photos
  });
});

router.get('/form', function (req, res) {
  res.render('photos/upload', {
    title: 'Photo upload'
  });
})

module.exports = router;