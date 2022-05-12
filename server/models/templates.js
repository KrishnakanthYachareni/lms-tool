const mongoose = require("mongoose");

const TemplatesSchema = mongoose.Schema({
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
    },
},{
    timestamps: true
  });

module.exports = mongoose.model("templates", TemplatesSchema);