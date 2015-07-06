var express = require('express');
var path = require('path');
var router = express.Router();

router.get('/get-zip-data', function(req, res) {
    res.sendFile(path.join(__dirname, '../../public/data/','zipcode.csv'));
});

module.exports = router;