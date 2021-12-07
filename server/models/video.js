const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    project: {
        type: String,
        required: true
    },
    group: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    },
    tags: [{
        type: String,
        required: false
    }]
});

// export model user with AdminUserSchema
module.exports = mongoose.model("videos", UserSchema);