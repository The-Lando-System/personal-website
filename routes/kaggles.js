var express = require('express');
var router = express.Router();

var kaggleDir = './public/kaggle-projects/';

router.get('/partial', function(req, res) {
    res.sendfile(kaggleDir + 'partial.html');
});

router.get('/partial2', function(req, res) {
    res.sendfile(kaggleDir + 'partial2.html');
});


module.exports = router;