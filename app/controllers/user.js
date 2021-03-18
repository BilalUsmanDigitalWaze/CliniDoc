const User = require("../models/User");
const express = require("express");
const router = express.Router();

// LOGIN API
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body);
  let user = await User.getUser(req.body.email, req.body.password);
  delete user[0].password;
  return res.send({ ResponseCode: "Success", data: user });
});

module.exports = router;
