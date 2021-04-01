const Department = require("../models/Department");

const Doctor = require("../models/Doctor");
const express = require("express");
const router = express.Router();

router.get("/doctors", async (req, res, next) => {
  const { department_id } = req.query;
  console.log(department_id);
  try {
    let doctorList = await Doctor.getDoctors({ department_id });

    return res.send({ ResponseCode: "Success", data: doctorList });
  } catch (ex) {
    return res.status(400).send({
      ResponseCode: "Fail",
      errorMessage: ex.message,
    });
  }
});

router.get("/doctor/departments", async (req, res, next) => {
  try {
    let departments = await Department.getDepartments();
    return res.send({ ResponseCode: "Success", data: departments });
  } catch (ex) {
    return res.status(400).send({
      ResponseCode: "Fail",
      errorMessage: ex.message,
    });
  }
});

module.exports = router;
