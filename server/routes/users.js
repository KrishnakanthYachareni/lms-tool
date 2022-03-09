const express = require("express");
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../models/users");

/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */

router.post("/signup", async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    userType
  } = req.body;

  let user = await User.findOne({
    email
  });
  if (user) {
    return res.status(400).json({
      msg: "User Already Exists"
    });
  }

  user = new User({
    userType,
    email,
    password,
    firstName,
    lastName,
    hasProject: false
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  await user.save();
  res.send({
    data: user,
    success: true
  })

}
);


router.post(
  "/login",
  async (req, res) => {

    console.log(req.body)
    const { email, password, userType } = req.body;

    let user = await User.findOne({
      email,
      userType
    });
    if (!user)
      return res.status(400).json({
        message: "User Not Exist"
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.json({
        success: false,
        message: "Incorrect Password !"
      });

    return res.send({
      data: user,
      success: true
    })
  }
);

router.get("/students", (req, res) => {
  User.find({
    userType: "student",
    hasTeam: false
  })
    .select("_id email firstName lastName")
    .then((results) => {
      res.send(results)
      return;
    })
})

module.exports = router;
