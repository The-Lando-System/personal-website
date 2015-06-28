var express = require('express');
var path = require('path');
var router = express.Router();

var apiFunDir = '../public/api-fun/';

router.get('/main', function(req, res) {
    res.sendFile(path.join(__dirname, apiFunDir,'main.html'));
});

router.get('/github', function(req, res) {
    res.sendFile(path.join(__dirname, apiFunDir,'github.html'));
});

router.get('/codewars', function(req, res) {
    res.sendFile(path.join(__dirname, apiFunDir,'codewars.html'));
});

router.get('/weather', function(req, res) {
    res.sendFile(path.join(__dirname, apiFunDir,'weather.html'));
});

module.exports = router;