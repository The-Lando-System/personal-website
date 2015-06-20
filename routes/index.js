var express = require('express');
var router = express.Router();

// a convenient variable to refer to the HTML directory
var html_dir = './public/html/';

/*
 * Routes to serve the static HTML files
 */
router.get('/', function(req, res) {
    res.sendfile(html_dir + 'index.html');
});

router.get('/nav-bar', function(req, res) {
    res.sendfile(html_dir + 'nav-bar.html');
});

router.get('/footer', function(req, res) {
    res.sendfile(html_dir + 'footer.html');
});

router.get('/about', function(req, res) {
    res.sendfile(html_dir + 'about.html');
});

router.get('/sound-project', function(req, res) {
    res.sendfile(html_dir + 'sound-project.html');
});

router.get('/to-do-list', function(req, res) {
    res.sendfile(html_dir + 'to-do-list.html');
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
