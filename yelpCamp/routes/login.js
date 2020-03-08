var express = require("express"),
    passport = require('passport'),
    router = express.Router();



router.get('/', function (req, res) {
    res.render('login', {title: "login"});
}).post('/', passport.authenticate('local', {
    successRedirect:"/senerio",
    failureRedirect:"/"
}), function (req, res) {

});


module.exports = router;
