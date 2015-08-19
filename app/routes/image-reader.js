var express = require('express');
var path = require('path');
var router = express.Router();

router.get('/test-data', function(req, res) {
    res.sendFile(path.join(__dirname, '../../public/data/','test-data.json'));
});

router.get('/train-data', function(req, res) {
    res.sendFile(path.join(__dirname, '../../public/data/','train-data.json'));
});

module.exports = router;