const receptionist = require("../models/Receptionist");

const express = require("express");
const router = express.Router();
const {validationResult,body}=require("express-validator")
const dotenv=require('dotenv')
dotenv.config();
const verifyToken = require("../verifyToken/verifyToken");

const jwt = require("jsonwebtoken");

// LOGIN API
router.post("/receptionistDetails", 
    body("receptionistId")
    .not()
    .isEmpty()
    .isInt()
    .withMessage("Please enter valid Receptionist Profile Id"),
  async (req, res, next) => {
    try {
        const token = await verifyToken(req.headers['authorization'].split(' ')[1])
        // const token = { status: 200 };
        if (token.status == 200) {
          const { receptionistId } = req.body;
          let recep = await receptionist.getReceptionistHistroy(receptionistId);
          return res.send({ ResponseCode: "Success", data: recep });
        } else {
          return res.send({ ResponseCode: "Fail", data: token.message });
        }
      } catch (ex) {
        return res.status(400).send({
          ResponseCode: "Fail",
          errorMessage: ex.message,
        });
      }
});

module.exports = router;
