const mongoose = require("mongoose");

const TagsSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
});

// export model user with AdminUserSchema
module.exports = mongoose.model("tags", TagsSchema);