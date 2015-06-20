var express = require('express');
var router = express.Router();

/*
 * GET the to-dos
 */
router.get('/to-dos', function(req,res){
	var db = req.db;
	db.collection('to-dos').find().toArray(function(err,items){
		res.json(items);
	});
});

/*
 * POST to addproject
 */
router.post('/add-to-do', function(req,res){
	var db = req.db;
	db.collection('to-dos').insert(req.body, function(err,result){
		res.send(
			(err === null) ? { msg: '' } : { msg: err} 
		);
	});
});

/*
 * DELETE to deleteproject
 */
router.delete('/delete-to-do/:id', function(req,res){
	var db = req.db;
	var toDoToDelete = req.params.id;
	db.collection('to-dos').removeById(toDoToDelete, function(err, result) {
		res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
	});
});

/*
 * PUT to update a to-do
 */
router.put('/update-to-do/:id', function(req,res){
	var db = req.db;
	var toDoToUpdate = req.params.id;
	db.collection('to-dos').updateById(toDoToUpdate, {$set:req.body}, function(err,result){
		res.send(
			(err === null) ? { msg: '' } : { msg: err }
		);
	});
});

/*
 * GET a single to-do
 */
router.get('/:id', function(req,res){
	var db = req.db;
	var toDoToGet = req.params.id;
	db.collection('to-dos').findById(toDoToGet, function(err,item){
		res.json(item);
	});
});

module.exports = router;