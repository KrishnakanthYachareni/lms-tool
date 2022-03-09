var express = require('express');
var router = express.Router();
var multer = require('multer');
const Media = require("../models/media");
const Tag = require("../models/tags");
const Group = require("../models/group");
const ProblemStatement = require("../models/problemStatements")

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


router.post("/", upload.single('file'), async (req, res) => {
    console.log(req.body,)
    let { tags, description, group, mediaType } = req.body
    console.log(tags)

    let tagsList = []
    let tagsObject = []

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
            console.log("tags creation error")
        })

    const groupObj = await Group.findOne({ name: group })

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



router.post("/search", async (req, res) => {
    let { search } = req.body

    var results = [];

    var data = await Media.find({ "tags": { "$in": search } }).populate("group").exec()
    data.forEach(item => {
        var elem = {};

        elem.updatedAt = item.updatedAt;
        elem.mediaType = item.mediaType;
        elem.mediaUrl = item.mediaUrl;
        results.push(elem)
    })
    var data = await ProblemStatement.find({ "tags": { "$in": search } })
    data && data.length > 0 && data.map(item => {
        var refs = item.references;
        refs && refs.length > 0 && refs.map(ref => {
            var elem = {};
            elem.updatedAt = item.updatedAt || '';
            elem.mediaType = ref.mediaType;
            elem.mediaUrl = ref.media;
            results.push(elem)
        })

    })

    return res.send(results)

});

router.post('/group/', function (req, res, next) {
    const { id } = req.body
    Media.find({
        group: id
    }).then((data) => {
        console.log(data)
        return res.send(data)
    })
})

module.exports = router;
