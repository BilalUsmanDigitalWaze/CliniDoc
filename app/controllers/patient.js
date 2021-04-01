const Patient = require("../models/Patient");
const express = require("express");
const router = express.Router();

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
