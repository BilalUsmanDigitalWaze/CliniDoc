const Referral = require("../models/Referral");
const ReferralLog = require("../models/ReferralLogs");

const express = require("express");
const router = express.Router();

const mailService = require("../../app/services/emailService");
// ADD REFERRALS
router.post("/referral", async (req, res, next) => {
  const {
    referral_source_type,
    referral_type_id,
    created_by,
    patient_name,
    patient_dob,
    patient_phone,
    reason_for_referral,
    assign_by,
    patient_email,
    best_time_for_contact,
    name_of_practice,
    phone_no_practice,
    email_of_contact_person,
    relationship_to_patient,
  } = req.body;
  console.log(req.body);
  let referral = await Referral.addReferral({
    referral_source_type,
    referral_type_id,
    created_by,
    patient_name,
    patient_dob,
    patient_phone,
    reason_for_referral,
    assign_by,
    patient_email,
    best_time_for_contact,
    name_of_practice,
    phone_no_practice,
    email_of_contact_person,
    relationship_to_patient,
  });

  return res.send({
    ResponseCode: "Success",
    message: "insert data successfully",
  });
});

// GET REFERRALS
router.get("/referral", async (req, res, next) => {
  let referral = await Referral.getReferral();

  return res.send({ ResponseCode: "Success", data: referral });
});

router.post("/referral/sendmail", async (req, res, next) => {
  const { email, subject, content } = req.body;

  const response = await mailService.sendEmail({ email, subject, content });

  console.log(response);
  return res.send({ ...response });
});

// logs
router.post("/referral/log", async (req, res, next) => {
  const {
    referral_id,
    call_status,
    receptionist_name,
    duration_in_sec,
    call_date_and_time,
    notes,
  } = req.body;

  let referralLog = await ReferralLog.addReferralLog({
    referral_id,
    call_status,
    receptionist_name,
    duration_in_sec,
    call_date_and_time,
    notes,
  });

  return res.send({
    ResponseCode: "Success",
    message: "insert data successfully",
  });
});

router.get("/referral/logs", async (req, res, next) => {
  let referralLogs = await ReferralLog.getReferralLogs();

  return res.send({ ResponseCode: "Success", data: referralLogs });
});

module.exports = router;
