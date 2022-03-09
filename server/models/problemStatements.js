const mongoose = require("mongoose");

const ProblemStatementsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    tags: [{
        type: String,
    }],
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
    year: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("problemStatements", ProblemStatementsSchema);