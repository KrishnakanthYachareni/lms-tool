var express = require('express');
var router = express.Router();
var multer = require('multer')
const Tag = require("../models/tags");
const Template = require("../models/templates");

router.get('/', function (req, res, next) {
    Template.find({}).then(data => {
        return res.send(data)
    })
});



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        var now = new Date().toISOString().replace(/:/g, '-')
        var fileName = now + file.originalname
        console.log(fileName)
        cb(null, fileName)
    }
})

var upload = multer({ storage: storage })

router.post('/', upload.array('m',20), async(req, res) => {
    const { title, description, tags, createdBy, year } = req.body;
    console.log(tags)
    let tagsList = []
    let tagsObject = []
    let referencesObject = []

    req.files.forEach(elem=>{
        var filenameObject = elem.filename.split('.')
        referencesObject.push({
            mediaType: filenameObject[filenameObject.length-1],
            media: elem.filename 
        })
    })
    tags.split(',').map(item => {
        tagsList.push(item)
        tagsObject.push({
            name: item
        })
    })
    Tag.insertMany(tagsObject, { ordered: false })
        .then(data => {
            console.log("tags created", data)
        })
        .catch(err => {
            console.log("tags creation error",err)
        })
    
    const template = new Template({
        title,
        description,
        tags: tagsList,
        createdBy,
        references: referencesObject,
        year,
    })
    template.save().then(data => {
        return res.send(data)
    }).catch(err => {
        return res.send({ "error": err })
    })
});

module.exports = router;
