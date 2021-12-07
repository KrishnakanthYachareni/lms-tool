var express = require('express');
var router = express.Router();
const ProblemStatement = require("../models/problemStatements");

router.get('/', function(req, res, next) {
    ProblemStatement.find({}).then(data =>{
        return res.send(data.map(elem=> elem.title))
    })
});

router.post('/', function(req, res, next) {

    const {title,description,tags, category, createdBy,year, references} = req.body
    const problemStatement  = new ProblemStatement({
        title,
        description,
        tags,
        category,
        createdBy,
        references,
        year,
    })
    problemStatement.save().then(data =>{
        return res.send(data)
    }).catch(err=>{
        return res.send({"error": err})
    })
});

module.exports = router;
