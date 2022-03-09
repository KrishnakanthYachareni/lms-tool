const mongoose = require("mongoose");
const User =require( './users')
const ProblemStatement =require( './problemStatements')
const  Media =require( './media')
const GroupSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    term: {
        type: String,
        required: true
    },
    teamMembers: [{
        type: mongoose.Schema.Types.ObjectId, ref: "users",
    }],
    problemStatement :{
        type: mongoose.Schema.Types.ObjectId, ref: "problemStatements",
    }
}, {
    timestamps: true
  });

module.exports = mongoose.model("group", GroupSchema);