var express = require('express');
var router = express.Router();
const Tag = require("../models/tags");

router.get('/', function(req, res, next) {
    Tag.find({}).then(data =>{
        return res.send(data)
    })
});

router.post('/', function(req, res, next) {
    const {name} = req.body
    console.log(name)
    Tag.findOne({
        name: name}
    ).then(data =>{
        console.log(data)
        if(!data){
            const tag  = new Tag({
                name
            })
            tag.save().then(data =>{
                return res.send(data)
            }).catch(err=>{
                return res.send({"error": err})
            })
        }
        else{
            return res.send(data)
        }
    })
   .catch(err=>{
        return res.send({"error": err})
    })
});


module.exports = router;
