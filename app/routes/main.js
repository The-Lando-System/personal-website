var express = require('express');
var path = require('path');
var redis = require('redis');
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

router.get('/word-chaining', function(req, res) {
  res.sendFile(path.join(__dirname, '../word-chaining','word-chaining.html'));
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

// Configuration ======================
var devConfig = false;
try {
    devConfig = require('../../config/config');
    console.log('Found development config file; using development environment variables')
} catch(err) {
    console.log('No config file detected, assuming production environment variables')
}
var dbUrl = devConfig ? devConfig.dbUrl : process.env.REDIS_DB_URL;
var dbPort = devConfig ? devConfig.dbPort : process.env.REDIS_DB_PORT;
var dbPassword = devConfig ? devConfig.dbPassword : process.env.REDIS_DB_PASSWORD;

// DB ================
var db = redis.createClient(dbPort, dbUrl, {no_ready_check: true});
db.auth(dbPassword, function (err) {
  if (err) console.log(err);
});

db.on('connect', function() {
  console.log('Connected to Redis');
});

router.get('/longest-chain/:id', function(req,res){
  db.hgetall(req.params.id, function (err, obj) {
    if (err) {
      console.log(err);
    } else {
      console.log("Chainer status: " + obj.complete);
      if (obj.complete === "true"){
        res.send(JSON.stringify(eval("(" + obj.chain + ")")));
      } else {
        res.send({notComplete:1});
      }
    }
  });
});

module.exports = router;