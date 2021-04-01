const User = require("../models/User");

const Patient = require("../models/Patient");
const express = require("express");
const router = express.Router();
// const jwt = require("jsonwebtoken");

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

    // const accessToken = jwt.sign(
    //   { email: email, password: password },
    //   process.env.ACCESS_TOKEN_SECRET
    // );
    // res.header("token", accessToken);
    return res.send({ ResponseCode: "Success", data: user });
  } catch (ex) {
    return res.status(400).send({
      ResponseCode: "Fail",
      errorMessage: ex.message,
    });
  }
});

//insert patient
router.post("/patient", async (req, res, next) => {
  const {
    referral_id,
    patient_name,
    address,
    phone,
    dob,
    legal_gardian,
    email,
    marital_status,
    race,
    reason_for_contact,
    insurance_name,
    insurance_member_id,
    insurance_group,
    insured_person,
    relationship_to_insured,
    insured_dob,
    insured_ssn,
    insurance_phone,
    ssn,
  } = req.body;
  try {
    let patient = await Patient.addPatient({
      referral_id,
      patient_name,
      address,
      phone,
      dob,
      legal_gardian,
      email,
      marital_status,
      race,
      reason_for_contact,
      insurance_name,
      insurance_member_id,
      insurance_group,
      insured_person,
      relationship_to_insured,
      insured_dob,
      insured_ssn,
      insurance_phone,
      ssn,
    });

    return res.send({
      ResponseCode: "Success",
      message: "insert data successfully",
    });
  } catch (ex) {
    return res.status(400).send({
      ResponseCode: "Fail",
      errorMessage: ex.message,
    });
  }
});

//get patient
router.get("/patients", async (req, res, next) => {
  try {
    let allPatients = await Patient.getPatients();

    return res.send({ ResponseCode: "Success", data: allPatients });
  } catch (ex) {
    return res.status(400).send({
      ResponseCode: "Fail",
      errorMessage: ex.message,
    });
  }
});

module.exports = router;
