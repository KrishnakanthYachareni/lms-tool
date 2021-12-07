const mongoose = require("mongoose");

const MediaSchema = mongoose.Schema({
    problemStatement: {
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
    mediaUrl: {
        type: String,
        required: true
    },
    tags: [{
        type: String,
        required: false
    }],
    mediaType: {
        type: String,
        required: true
    }
}, {
    timestamps: true
  });

// export model user with AdminUserSchema
module.exports = mongoose.model("media", MediaSchema);