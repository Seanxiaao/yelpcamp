var express = require("express");
var router = express.Router();


router.get("/", function (req, res) {
    req.logout();
    req.flash("success", "Bye, have a good day");
    res.redirect("/senerio");
});

module.exports = router;
