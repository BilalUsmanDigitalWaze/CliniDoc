const Referral = require("../models/Referral");
const express = require("express");
const router = express.Router();
var MailConfig = require("../services/emailService");
var hbs = require("nodemailer-express-handlebars");
var gmailTransport = MailConfig.GmailTransport;
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

// var smtpTransport = MailConfig.SMTPTransport;

router.post("/referral/sendmail", async (req, res, next) => {
  const { email, subject, content } = req.body;

  const response = await mailService.sendEmail({ email, subject, content });

  console.log(response);
  return res.send({ ...response });
});

module.exports = router;
