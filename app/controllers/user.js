const User = require("../models/User");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// LOGIN API
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    let user = await User.getUser(req.body.email, req.body.password);
    console.log(user);
    if (!user) {
      return res.status(400).send({
        ResponseCode: "Fail",
        message: "invalid user id or password",
      });
    }
    delete user[0].password;

    const accessToken = jwt.sign(
      { email: email, password: password },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.header("token", accessToken);
    return res.send({ ResponseCode: "Success", data: user });
  } catch (ex) {
    return res.status(400).send({
      ResponseCode: "Fail",
      errorMessage: ex.message,
    });
  }
});

module.exports = router;
