var moogoose = require("mongoose");

var spectableSchema = new moogoose.Schema({
    name: String,
    url: String,
    description: String,
    author: {
        id: {
            type:moogoose.Schema.Types.ObjectId,
            ref:"user"
        },
        username: String,
    },
    comments: [
        {
            type: moogoose.Schema.Types.ObjectId,
            ref: "comment"
        }
    ]
});

module.exports = moogoose.model("spectacle", spectableSchema);