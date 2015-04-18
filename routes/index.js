var express = require('express');
var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res) {
//   res.render('index', { title: 'Express' });
// });

// a convenient variable to refer to the HTML directory
var html_dir = './public/html/';

// routes to serve the static HTML files
router.get('/', function(req, res) {
    res.sendfile(html_dir + 'index.html');
});

module.exports = router;
