var express = require('express');
var router = express.Router();
const Group = require("../models/group");
const Media = require("../models/media");
const ProblemStatement = require('../models/problemStatements');
const User = require('../models/users');

router.get('/:id/', function (req, res, next) {
    const { id } = req.params
    Group.findOne({
        _id: id
    }).populate('teamMembers').populate('problemStatement').exec((err, data) => {
        if (err) console.log(err);

        return res.send(data)
    })
});

router.get('/', function (req, res, next) {
    Group.find({
    }).populate('teamMembers').populate('problemStatement').exec((err, data) => {
        if (err) console.log(err);
        return res.send(data)
    })

});

router.post('/', async function (req, res, next) {
    const { name, problemStatement, term, year, teamMembers } = req.body

    const teamMemberIds = await User.find().where('email').in(teamMembers).exec();
    const problemStatementObj = await ProblemStatement.findOne({title: problemStatement});

    let group = new Group({
        name,
        term,
        year,
        teamMembers: teamMemberIds || [],
        problemStatement: problemStatementObj || null,
    })
    group.save().then(data => {
        //make users in team-members hasProject true
        console.log("Saving team members has Project to null")
        // User.updateMany({ _id: { "$in": teamMemberIds } }, { "$set": { hasTeam: true } }, { multi: true }).then(data=> console.log(data))
        return res.send(data)
    }).catch(err => {
        console.log('error',err)
        return res.status(400).send({ "error": err })
    })

});


module.exports = router;
