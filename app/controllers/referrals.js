const Referral = require("../models/Referral");
const express = require("express");
const router = express.Router();

// ADD REFERRALS
router.post("/referral", async (req, res, next) => {
  const { referral_source_type, referral_types_id, created_by } = req.body;
  console.log(req.body);
  let referral = await Referral.addReferral({
    referral_source_type,
    referral_types_id,
    created_by,
  });

  return res.send({
    ResponseCode: "Success",
    message: "insert data successfully",
  });
});

// GET REFERRALS

router.get("/referral", async (req, res, next) => {
  const { referral_source_type, referral_types_id, created_by } = req.body;
  console.log(req.body);
  let referral = await Referral.getReferral({
    referral_source_type,
    referral_types_id,
    created_by,
  });

  return res.send({ ResponseCode: "Success", data: referral });
});

module.exports = router;
