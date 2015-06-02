var express = require('express');
var router = express.Router();

/*
 * GET the projects
 */
router.get('/projects', function(req,res){
	var db = req.db;
	db.collection('projects').find().toArray(function(err,items){
		res.json(items);
	});
});

/*
 * POST to addproject
 */
router.post('/addproject', function(req,res){
	var db = req.db;
	db.collection('projects').insert(req.body, function(err,result){
		res.send(
			(err === null) ? { msg: '' } : { msg: err} 
		);
	});
});

/*
 * DELETE to deleteproject
 */
router.delete('/deleteproject/:id', function(req,res){
	var db = req.db;
	var projectToDelete = req.params.id;
	db.collection('projects').removeById(projectToDelete, function(err, result) {
		res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
	});
});

/*
 * PUT to updateproject
 */
router.put('/updateproject/:id', function(req,res){
	var db = req.db;
	var projectToUpdate = req.params.id;
	db.collection('projects').updateById(projectToUpdate, {$set:req.body}, function(err,result){
		res.send(
			(err === null) ? { msg: '' } : { msg: err }
		);
	});
});

/*
 * GET a single project
 */
router.get('/:id', function(req,res){
	var db = req.db;
	var projectToGet = req.params.id;
	db.collection('projects').findById(projectToGet, function(err,item){
		res.json(item);
	});
});

module.exports = router;