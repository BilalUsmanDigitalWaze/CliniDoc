const Patient = require("../models/Patient");
const express = require("express");
const router = express.Router();
const {validationResult,body}=require("express-validator")
const verifyToken = require("../verifyToken/verifyToken");

//insert patient
router.post("/patient", 

  body('referral_id').not().isEmpty().isInt().withMessage('Please enter Refrrel Id'),
  body('patient_name').not().isEmpty().isString(),
  body('address').not().isEmpty().isString().withMessage('Please enter your address'),
  body('phone').not().isEmpty().isMobilePhone().withMessage("Please enter your phone number"),
  body('dob').not().isEmpty().isDate().withMessage("Please enter you date of birth"),
  body('legal_gardian').not().isEmpty().isString().withMessage('Please enter Refrrel Id'),
  body('email').not().isEmpty().isEmail().withMessage("Please enter valid email"),
  body('marital_status').isString().withMessage('Please enter your marital status correctly'),
  body('race').isString().withMessage("Please enter race "),
  body('reason_for_contact').not().isEmpty().isString().withMessage("Please enter valid reason for contact"),
  body('insurance_name').isString().withMessage("Please enter valid insurance name"),
  body('insurance_member_id').isInt().withMessage('Please enter valid Insurance  Id'),
  body('insurance_group').isString().withMessage('Wrong insurance group'),
  body('insured_person').isString().withMessage('Enter valid insured person'),
  body('relationship_to_insured').isString().withMessage('Enter valid relationship to insured'),
  body('insured_dob').isDate().withMessage("Enter valid Insured Date of birth"),
  body('insured_ssn').isString().withMessage("enter valid SSN"),
  body('insurance_phone').isMobilePhone().withMessage("enter valid isurance phone"),
  body('ssn').isInt().withMessage("Enter valid ssn"),
  
  async (req, res, next) => {
    const token = await verifyToken(req.headers["token"])
    if(token.status==200){
      const errors = validationResult(req)
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() })
        }
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
        data:patient
      });
    } catch (ex) {
      return res.status(400).send({
        ResponseCode: "Fail",
        errorMessage: ex.message,
      });
    }
  }else{
    return res.send({ResponseCode:"Fail",data:token.message})
  }
});

//get patient
router.get("/patients", async (req, res, next) => {
  try {
    const token = await verifyToken(req.headers["token"])
    console.log(token)
    if(token.status==200){
      let allPatients = await Patient.getPatients();

      return res.send({ ResponseCode: "Success", data: allPatients });
    }else{
        return res.send({ResponseCode:"Fail",data:token.message})
    }
  } catch (ex) {
    return res.status(400).send({
      ResponseCode: "Fail",
      errorMessage: ex.message,
    });
  }
});

module.exports = router;
