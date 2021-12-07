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


router.post("/", upload.single('file'), (req, res) => {
    console.log(req.body, req.file.filename)
    let { tags, description, problemStatement, group, mediaType } = req.body
    let media = new Media({
        tags,
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



router.post("/search",  (req, res) => {
    let { search } = req.body
    console.log(search)

    Media.find({"tags":{"$in": search}})
    .then(data=>{
        console.log(data)
        res.send(data)
    })
});

module.exports = router;
