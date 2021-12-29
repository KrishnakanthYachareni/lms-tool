var express = require('express');
var router = express.Router();
var multer = require('multer')
const Media = require("../models/media");


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


router.post("/", (req, res) => {
    console.log(req.body,)
    let { tags, description, problemStatement, group, mediaType } = req.body
    Tag.insertMany(data, { ordered: false })
        .then(data => {
            console.log("tags created")
        })
        .catch(err => {
            console.log("tags creation error")
        })

    let media = new Media({
        tags: tags.map(item => item.name),
        description,
        problemStatement,
        group,
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

module.exports = router;
