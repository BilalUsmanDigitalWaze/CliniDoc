const Referral = require("../models/Referral");
const ReferralLog = require("../models/ReferralLogs");
const express = require("express");
const router = express.Router();
const { validationResult, body, check } = require("express-validator");
const mailService = require("../../app/services/emailService");
const verifyToken = require("../verifyToken/verifyToken");
// ADD REFERRALS

router.post(
  "/referral",

  body("referral_source_type").not().isEmpty().isString(),
  body("referral_type_id").not().isEmpty().isInt(),
  body("created_by").isString(),
  body("patient_name").not().isEmpty().isString(),
  body("patient_dob").not().isEmpty().isDate(),
  body("patient_phone").not().isEmpty().isMobilePhone(),
  body("reason_for_referral").not().isEmpty().isString(),
  body("assign_by").not().isEmpty().isString(),
  body("patient_email").not().isEmpty().isEmail(),
  // body('best_time_for_contact')
  // .exists()
  // .not()
  // .isEmpty()
  // .withMessage('start cannot be empty')
  // .matches(/\d{4}-[01]\d-[0-3]\d [0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?Z?/g)
  // .withMessage('Must be in correct format yyyy:mm:dd hh:mm:ss'),

  body("name_of_practice").not().isEmpty().isString(),
  body("phone_no_practice").not().isEmpty().isMobilePhone(),
  body("email_of_contact_person").not().isEmpty().isEmail(),
  body("relationship_to_patient").not().isEmpty().isString(),

  async (req, res, next) => {
    try {
      const token = await verifyToken(
        req.headers["authorization"].split(" ")[1]
      );
      if (token.status == 200) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }
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
          data: referral,
        });
      } else {
        return res.send({ ResponseCode: "Fail", data: token.message });
      }
    } catch (err) {
      console.log(err);
    }
  }
);

// GET REFERRALS
router.get("/referral", async (req, res, next) => {
  const token = await verifyToken(req.headers["authorization"].split(" ")[1]);
  if (token.status == 200) {
    let referral = await Referral.getReferral();
    return res.send({ ResponseCode: "Success", data: referral });
  } else {
    return res.send({ ResponseCode: "Fail", data: token.message });
  }
});

router.post(
  "/referral/sendmail",
  body("email").not().isEmpty().isEmail(),
  body("subject").not().isEmpty().isString(),
  body("content").not().isEmpty().isString(),
  async (req, res, next) => {
    const token = await verifyToken(req.headers["authorization"].split(" ")[1]);
    if (token.status == 200) {
      const { email, subject, content } = req.body;

      const response = await mailService.sendEmail({ email, subject, content });

      return res.send({ ...response });
    } else {
      return res.send({ ResponseCode: "Fail", data: token.message });
    }
  }
);

// logs
router.post(
  "/referral/log",
  body("referral_id").not().isEmpty().isInt(),
  body("call_status").not().isEmpty().isString(),
  body("receptionist_name").not().isEmpty().isString(),
  body("duration_in_sec").not().isEmpty().isString(),
  body("call_date_and_time")
    .exists()
    .not()
    .isEmpty()
    .withMessage("start cannot be empty")
    .matches(/\d{4}-[01]\d-[0-3]\d [0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?Z?/g)
    .withMessage("Must be in correct format yyyy:mm:dd hh:mm:ss"),
  body("notes").not().isEmpty().isString(),
  async (req, res, next) => {
    const token = await verifyToken(req.headers["authorization"].split(" ")[1]);
    if (token.status == 200) {
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
    } else {
      return res.send({ ResponseCode: "Fail", data: token.message });
    }
  }
);

router.get(
  "/referral/logs",
  check("referral_id").not().isEmpty().isInt(),
  async (req, res, next) => {
    const token = await verifyToken(req.headers["authorization"].split(" ")[1]);
    if (token.status == 200) {
      const { referral_id } = req.query;
      let referralLogs = await ReferralLog.getReferralLogs({ referral_id });

      return res.send({ ResponseCode: "Success", data: referralLogs });
    } else {
      return res.send({ ResponseCode: "Fail", data: token.message });
    }
  }
);

// update referral

router.patch(
  "/referral",
  body("id").not().isEmpty().isInt(),
  body("status_id").not().isEmpty().isInt(),
  async (req, res, next) => {
    const token = await verifyToken(req.headers["authorization"].split(" ")[1]);
    if (token.status == 200) {
      const { id, status_id } = req.body;
      let referral = await Referral.updateReferralStatus({ id, status_id });
      return res.send({ ResponseCode: "Success", data: referral });
    } else {
      return res.send({ ResponseCode: "Fail", data: token.message });
    }
  }
);

module.exports = router;
