const Department = require("../models/Department");
const Doctor = require("../models/Doctor");
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const verifyToken = require("../verifyToken/verifyToken");

router.get(
  "/doctors",
  check("department_id")
    .not()
    .isEmpty()
    .isInt()
    .withMessage("Please enter valid Department Id"),
  async (req, res, next) => {
    const token = await verifyToken(req.headers["token"]);
    if (token.status == 200) {
      const { department_id } = req.query;
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }
        let doctorList = await Doctor.getDoctors({ department_id });

        return res.send({ ResponseCode: "Success", data: doctorList });
      } catch (ex) {
        return res.status(400).send({
          ResponseCode: "Fail",
          errorMessage: ex.message,
        });
      }
    } else {
      return res.send({ ResponseCode: "Fail", data: token.message });
    }
  }
);

router.get("/doctor/departments", async (req, res, next) => {
  try {
    const token = await verifyToken(req.headers["token"]);
    if (token.status == 200) {
      let departments = await Department.getDepartments();
      return res.send({ ResponseCode: "Success", data: departments });
    } else {
      return res.send({ ResponseCode: "Fail", data: token.message });
    }
  } catch (ex) {
    return res.status(400).send({
      ResponseCode: "Fail",
      errorMessage: ex.message,
    });
  }
});

module.exports = router;
