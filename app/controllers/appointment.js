const Appointment = require("../models/Appointment");
const {body,validationResult}=require("express-validator")
const express = require("express");
const router = express.Router();
const verifyToken = require("../verifyToken/verifyToken");


router.post("/appointment", 

  body('patient_id').not().isEmpty().isInt().withMessage('Please enter valid patient Id'),
  body('administrator_id').not().isEmpty().isInt().withMessage('Please enter valid administrator Id'),
  body('appointment_type_id').not().isEmpty().isInt().withMessage('Please enter valid appointment type id'),
  body('schedule_id').not().isEmpty().isInt().withMessage('Please enter valid schedule Id'),
// body('row_source').isString().withMessage('Please enter valid row source'),
// body('created_by').isString().withMessage('Please enter valid created by'),
// body('modified_by').isString().withMessage('Please enter valid modified by value'),
// body('created_At').isISO8601().toDate().withMessage('Please enter valid Date Created at'),
// body('row_version').isString().withMessage('Please enter valid row verison'),
// body('row_status').isString().withMessage('Please enter valid row status'),
// body('modified_at').isISO8601().toDate().withMessage('Please enter modified at Date'),

async (req, res, next) => {
  const token = await verifyToken(req.headers["token"])
  if(token.status==200){
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
      }
    try {
      const {patient_id,administrator_id,appointment_type_id,schedule_id,
        row_source,created_by,modified_by,
        created_At,row_version,row_status,modified_at}=req.body
      let appointment = await Appointment.addAppointment({patient_id,administrator_id,appointment_type_id,schedule_id,row_source,created_by,modified_by,created_At,row_version,row_status,modified_at});
      return res.send({ ResponseCode: "Success", message: 'Data Inserted'});
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
  
module.exports=router