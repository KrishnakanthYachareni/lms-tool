const mongoose = require("mongoose");

const ProblemStatementsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    tags: [{
        type: String,
    }],
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    references: [{
      mediaType: String,
      media: String  
    }],
    createdBy:{
        type:String,
        required: true
    },      
    Year: {
        type: String,
        required: true
    }
});

// export model user with AdminUserSchema
module.exports = mongoose.model("ProblemStatements", ProblemStatementsSchema);