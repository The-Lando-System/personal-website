var express = require('express');
var router = express.Router();

/*
 * GET the sound-data
 */
router.get('/sound-data', function(req,res){
	var db = req.db;
	db.collection('sound-data').find().toArray(function(err,items){
		res.json(items);
	});
});

/*
 * POST to add-sound-data
 */
router.post('/add-sound-data', function(req,res){
	var db = req.db;
	db.collection('sound-data').insert(req.body, function(err,result){
		res.send(
			(err === null) ? { msg: '' } : { msg: err} 
		);
	});
});

/*
 * DELETE to delete-sound-data
 */
router.delete('/delete-sound-data', function(req,res){
	var db = req.db;
	db.collection('sound-data').remove(function(err, result) {
		res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
	});
});

module.exports = router;