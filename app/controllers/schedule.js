const Schedule = require("../models/Schedule");
const express = require("express");
const router = express.Router();
const { check, validationResult, body } = require("express-validator");
const verifyToken = require("../verifyToken/verifyToken");


router.post(
  "/doctor/schedule",
  body("doctor_id")
    .not()
    .isEmpty()
    .isInt()
    .withMessage("Please enter valid doctor Id"),
    body("branch_id")
    .not()
    .isEmpty()
    .isInt()
    .withMessage("Please enter valid branch Id"),
    
  async (req, res, next) => {
    try {
      const token = await verifyToken(req.headers['authorization'].split(' ')[1])
      // const token = { status: 200 };
      if (token.status == 200) {
        const { doctor_id, branch_id } = req.body;
        console.log(doctor_id, branch_id);
        let schedule = await Schedule.getAccToDays(doctor_id, branch_id);
        console.log(schedule, "cll");
        return res.send({ ResponseCode: "Success", data: schedule });
      } else {
        return res.send({ ResponseCode: "Fail", data: token.message });
      }
    } catch (ex) {
      return res.status(400).send({
        ResponseCode: "Fail",
        errorMessage: ex.message,
      });
    }
  }
);

module.exports = router;
