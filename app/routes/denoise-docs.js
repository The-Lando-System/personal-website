var express = require('express');
var path = require('path');
var router = express.Router();

router.get('/row-pixel-averages', function(req, res) {
    res.sendFile(path.join(__dirname, '../../public/data/','rowAverages.json'));
});

router.get('/col-pixel-averages', function(req, res) {
    res.sendFile(path.join(__dirname, '../../public/data/','colAverages.json'));
});

module.exports = router;