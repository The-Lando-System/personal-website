var express = require('express');
var path = require('path');
var router = express.Router();

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../layout/','shell.html'));
});

router.get('/nav-bar', function(req, res) {
  res.sendFile(path.join(__dirname, '../layout/','nav-bar.html'));
});

router.get('/footer', function(req, res) {
  res.sendFile(path.join(__dirname, '../layout/','footer.html'));
});

router.get('/main', function(req, res) {
  res.sendFile(path.join(__dirname, '../main/','main.html'));
});

router.get('/api-fun', function(req, res) {
  res.sendFile(path.join(__dirname, '../api-fun/index','index.html'));
});

router.get('/api-fun/main', function(req, res) {
  res.sendFile(path.join(__dirname, '../api-fun/main','main.html'));
});

router.get('/api-fun/github', function(req, res) {
  res.sendFile(path.join(__dirname, '../api-fun/github','github.html'));
});

router.get('/api-fun/weather', function(req, res) {
  res.sendFile(path.join(__dirname, '../api-fun/weather','weather.html'));
});

router.get('/api-fun/codewars', function(req, res) {
  res.sendFile(path.join(__dirname, '../api-fun/codewars','codewars.html'));
});

router.get('/api-fun/reddit', function(req, res) {
  res.sendFile(path.join(__dirname, '../api-fun/reddit','reddit.html'));
});

router.get('/sound-project', function(req, res) {
  res.sendFile(path.join(__dirname, '../sound-project','sound-project.html'));
});

router.get('/about', function(req, res) {
  res.sendFile(path.join(__dirname, '../about','about.html'));
});

router.get('/to-do-list', function(req, res) {
  res.sendFile(path.join(__dirname, '../to-do','to-do-list-shell.html'));
});

router.get('/to-do-list/to-dos', function(req, res) {
  res.sendFile(path.join(__dirname, '../to-do','to-do-list.html'));
});

router.get('/to-do-list/description', function(req, res) {
  res.sendFile(path.join(__dirname, '../to-do','to-do-list-description.html'));
});

router.get('/image-reader', function(req, res) {
  res.sendFile(path.join(__dirname, '../image-reader','image-reader.html'));
});

module.exports = router;