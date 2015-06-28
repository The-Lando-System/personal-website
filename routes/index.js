var express = require('express');
var path = require('path');
var router = express.Router();

// a convenient variable to refer to the HTML directory
var html_dir = '../public/html/';

/*
 * Routes to serve the static HTML files
 */
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, html_dir,'index.html'));
});

router.get('/nav-bar', function(req, res) {
    res.sendFile(path.join(__dirname, html_dir,'nav-bar.html'));
});

router.get('/footer', function(req, res) {
    res.sendFile(path.join(__dirname, html_dir,'footer.html'));
});

router.get('/about', function(req, res) {
    res.sendFile(path.join(__dirname, html_dir,'about.html'));
});

router.get('/sound-project', function(req, res) {
    res.sendFile(path.join(__dirname, html_dir,'sound-project.html'));
});

router.get('/to-do-list', function(req, res) {
    res.sendFile(path.join(__dirname, html_dir,'to-do-list.html'));
});

router.get('/kaggle-projects', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/kaggle-projects/','index.html'));
});

router.get('/api-fun', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/api-fun/','index.html'));
});

module.exports = router;
