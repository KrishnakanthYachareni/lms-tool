var express = require('express');
var router = express.Router();
var multer = require('multer')
const Video = require("../models/admin");


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        console.log('dadada',file)
        var now = new Date().toISOString().replace(/:/g, '-')
        var fileName = now + file.originalname
        console.log(fileName)
        cb(null, fileName)
    }
})

var upload = multer({ storage: storage })


router.post("/", upload.single('file'), (req, res) => {
    console.log(req.body,);
    let { tags, description, project, group } = req.body
    // let video = new Video({
    //     tags,
    //     description,
    //     project,
    //     group,
    //     videoUrl: req.fileName
    // });

    // video.save();
    res.send("ok")

});

router.get('/', (req,res)=>{
    res.send("Server Running");
    return;
})

module.exports = router;
