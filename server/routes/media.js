var express = require('express');
var router = express.Router();
var multer = require('multer');
const Media = require("../models/media");
const Tag = require("../models/tags");
const Group = require("../models/group");


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        var now = new Date().toISOString().replace(/:/g, '-')
        var fileName = now + file.originalname
        cb(null, fileName)
    }
})

var upload = multer({ storage: storage })


router.post("/",  upload.single('file'),async(req, res) => {
    console.log(req.body,)
    let { tags, description,  group, mediaType } = req.body
	console.log(tags)

	let tagsList = []
    let tagsObject = []
    
	tags.split(',').map(item=>{
		tagsList.push(item)
        tagsObject.push({
            name: item
        })
	})
    Tag.insertMany(tagsObject, { ordered: false })
        .then(data => {
            console.log("tags created",data)
        })
        .catch(err => {
            console.log("tags creation error")
        })
    
    const groupObj = await Group.findOne({name: group})

    console.log(groupObj)

    let media = new Media({
        tags: tagsList,
        description,
        group: groupObj,
        mediaUrl: req.file.filename,
        mediaType: mediaType
    });

    media.save().then(data => {
        return res.send(data)
    }).catch(err => {
        console.log('error')
        return res.status(400).send({ "error": err })
    })

});



router.post("/search", (req, res) => {
    let { search } = req.body
    console.log(search)

    Media.find({ "tags": { "$in": search } })
        .then(data => {
            console.log(data)
            res.send(data)
        })
});

router.post('/group/', function (req, res, next) {
    const { id } = req.body
    Media.find({
        group:id
    }).then(( data) => {
        console.log(data)
        return res.send(data)
    })
})

module.exports = router;
