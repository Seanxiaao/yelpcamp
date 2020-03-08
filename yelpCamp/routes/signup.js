var express = require('express'),
    User = require('../models/user'),
    passport =require('passport');
var LocalStrategy = require('passport-local');


var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Scenario sites' });
}).post('/', function (req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err)
            req.flash("error", err.message);
            res.redirect('/');
        } else {
            passport.authenticate("local") (req, res, function () {
                req.flash("success", "Welcome! how is your day, " + user.username);
                res.redirect("/senerio");
            })
        }
    })
});

module.exports = router;
