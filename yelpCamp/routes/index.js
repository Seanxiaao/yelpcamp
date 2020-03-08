var express = require('express'),
    User = require('../models/user'),
    passport =require('passport');
var LocalStrategy = require('passport-local');


var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('landing');
});

module.exports = router;
