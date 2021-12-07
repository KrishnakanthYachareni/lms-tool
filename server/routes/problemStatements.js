var express = require('express');
var router = express.Router();
const Project = require("../models/project");

router.get('/', function(req, res, next) {
    Project.find({}).then(data =>{
        return res.send(data)
    })
});

router.post('/', function(req, res, next) {

    const {title,description,tags, category, createdby, references} = req.body
    const project  = new Project({
        title,
        description,
        tags,
        category,
        createdby,
        references
    })
    project.save().then(data =>{
        return res.send(data)
    })
});

module.exports = router;
