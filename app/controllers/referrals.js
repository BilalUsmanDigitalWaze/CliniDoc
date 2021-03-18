const Referral = require("../models/Referral");
const express = require("express");
const router = express.Router();

// ADD REFERRALS
router.post("/referral", async (req, res, next) => {
  const {
    referral_source_type,
    referral_types_id,
    created_by,
    patient_name,
    dob,
    patient_phone,
    reason_for_referral,
    assign_by,
    email,
  } = req.body;
  console.log(req.body);
  let referral = await Referral.addReferral({
    referral_source_type,
    referral_types_id,
    created_by,
    patient_name,
    dob,
    patient_phone,
    reason_for_referral,
    assign_by,
    email,
  });

  return res.send({
    ResponseCode: "Success",
    message: "insert data successfully",
  });
});

// GET REFERRALS

router.get("/referral", async (req, res, next) => {
  let referral = await Referral.getReferral({
    referral_source_type,
    referral_types_id,
    created_by,
  });

  return res.send({ ResponseCode: "Success", data: referral });
});

module.exports = router;
