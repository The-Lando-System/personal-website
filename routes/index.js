var express = require('express');
var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res) {
//   res.render('index', { title: 'Express' });
// });

// a convenient variable to refer to the HTML directory
var html_dir = './public/html/';

router.get('/', function(req, res) {
    //res.sendfile(html_dir + 'index.html');
    res.sendfile(html_dir + 'index.html');
});

router.get('/nav-bar', function(req, res) {
    //res.sendfile(html_dir + 'index.html');
    res.sendfile(html_dir + 'nav-bar.html');
});

router.get('/header', function(req, res) {
    //res.sendfile(html_dir + 'index.html');
    res.sendfile(html_dir + 'header.html');
});

// routes to serve the static HTML files
router.get('/sound-project', function(req, res) {
    res.sendfile(html_dir + 'sound-project.html');
});

/*
 * GET a single project
 */
router.get('/:id/project', function(req,res){
	var db = req.db;
	var projectToGet = req.params.id;
	db.collection('projects').findById(projectToGet, function(err,item){
		res.sendfile(html_dir + 'project.html');
	});
});

module.exports = router;
