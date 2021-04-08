const User = require("../models/User");
const Patient = require("../models/Patient");
const express = require("express");
const router = express.Router();
const {validationResult,body}=require("express-validator")
const dotenv=require('dotenv')
dotenv.config();

const jwt = require("jsonwebtoken");

// LOGIN API
router.post("/login", 
  body('email').not().isEmpty().isEmail(),
  body('password').not().isEmpty(),
  async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
  try {
    // let user = await User.getUser(req.body.email, req.body.password);
    // console.log(user);
    // if (!user) {
    //   return res.status(400).send({
    //     ResponseCode: "Fail",
    //     message: "invalid user id or password",
    //   });
    // }
    // delete user[0].password;
    const accessToken = jwt.sign(
      { email: req.body.email, password: req.body.password },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.header('authorization',`bearer ${accessToken}`);
    console.log(accessToken)
    return res.send({ ResponseCode: "Success", data: accessToken });
  
  } catch (ex) {
    return res.status(400).send({
      ResponseCode: "Fail",
      errorMessage: ex.message,
    });
  }
});

module.exports = router;
