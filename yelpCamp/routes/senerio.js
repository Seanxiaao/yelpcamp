var express = require('express'),
    bodyParse = require('body-parser'),
    specGround = require('../models/scenegrounds'),
    Comments = require("../models/comments"),
    User = require("../models/user"),
    router = express.Router();

function isLoggedin(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    } else  {
        req.flash("error", "Needs to be logged in first");
        res.redirect('/login');
    }
}

    /*GET senerio pages*/
router.get('/', function (req, res, next) {
    // get all the grounds;
    specGround.find({}, function (err, scenes) {
        if (err) {
            req.flash("error", "whops, something wrong happens");
        } else {
            res.render('senerios', {scenes: scenes, title: 'Scenario sites', currentUser: req.user});
        }
    });
}).post('/', isLoggedin, function (req, res, next) {
    //get the result, append sth and then redirect to current one;
    var name = req.body.name;
    var url = req.body.url;
    var description = req.body.description;
    var author = {id:req.user._id, username:req.user.username};
    specGround.create({name:name, url: url, description:description, author: author}, function (err, scene) {
        if (err) {
            req.flash("error", "whoops, failed to add");
        } else {
            res.redirect('/senerio');
        }
    });
});

router.get('/new', isLoggedin, function (req, res) {
    res.render('newscene', {title: "New Scene"});
});

router.get('/:id', function (req, res) {

    specGround.findById(req.params.id).populate("comments").exec(function (err, data) {
        if (err) {
            console.log("err");
        } else {
            res.render("details", {title: "details", data: data});
        }
    });
});

router.get('/:id/comments/new', isLoggedin, function (req, res) {
    //here do not use var data = .. findById etc
    specGround.findById(req.params.id, function (err, data) {
        if (err) {
            res.send(err);
            res.redirect("/");
        } else {
            res.render("newcomments", {title:"new comment", data: data});
        }
    });
}).post('/:id/comments/new',isLoggedin, function (req, res) {
    specGround.findById(req.params.id, function (err, data) {
        if (err) {
            res.send(err);
        } else {

            Comments.create({username: req.user.username, id: req.user._id, text: req.body.text}, function (err, comment) {
                if (err) {
                    res.send(err);
                } else {
                    data.comments.push(comment);
                    data.save();
                    res.redirect("/senerio/" + data._id);
                }
            })
        }
    })

});


// updata the senerio
router.get('/:id/edit',isLoggedin, function (req, res, next) {
    specGround.findById(req.params.id,  function (err, spec) {
        if(err) {
            res.redirect('/senerio');
        } else {
            res.render("edit", {title: "edit", spec: spec});
        }
    })
}).put('/:id', isLoggedin, function (req, res) {
   var newSpece = {name: req.body.name, url: req.body.url, description:req.body.description}
   specGround.findByIdAndUpdate(req.params.id, newSpece, function (err, spec) {
        if(err) {
            res.redirect('/senerio');
        } else {
            res.redirect('/senerio/' + req.params.id);
        }
   })
});

//delete the result
router.delete("/:id", isLoggedin, function (req, res) {
    specGround.findByIdAndRemove(req.params.id, function (err) {
        if(err) {
            console.log(err);
        }
        res.redirect('/senerio');
    })
});


//edit and update the comment
router.get("/:id/comments/:comment_id/edit", function (req, res) {
    Comments.findById(req.params.comment_id, function (err, comment) {
        if (err) {
            console.log(err);
            res.redirect('/senerio/' + req.params.id);
        } else {
            res.render("editcomment", {title:"edit comment", spec_id: req.params.id, comment: comment});
        }
    })
}).put("/:id/comments/:comment_id/", isLoggedin, function (req, res) {
    var newComment = {text: req.body.description, id: req.user.id, username:req.user.username};
    Comments.findByIdAndUpdate(req.params.comment_id, newComment, function (err, updateComment) {
        if (err) {
            console.log(err);
        }
        res.redirect("/senerio/" + req.params.id);
    })
});

router.delete("/:id/comments/:comment_id", function (req, res) {
    Comments.findByIdAndRemove(req.params.comment_id, function (err) {
        if(err) {
            console.log(err)
        }
        res.redirect("/senerio/" + req.params.id);
    })
});



module.exports = router;
