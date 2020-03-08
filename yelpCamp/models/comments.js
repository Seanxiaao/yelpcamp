var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    text: String,
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    username: String
});


module.exports = mongoose.model("comment", commentSchema); // the related are our schema, the name is db.comment....
