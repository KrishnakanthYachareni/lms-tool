const mongoose = require("mongoose");
const  Group =require( './group')

const MediaSchema = mongoose.Schema({
    
    group: {
        type: mongoose.Schema.Types.ObjectId, ref: "group",
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