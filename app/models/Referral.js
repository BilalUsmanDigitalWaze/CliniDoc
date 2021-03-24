const Dao = require("../../utilities/Dao.js");
const moment = require("moment");

module.exports = {
  async addReferral({
    referral_source_type,
    referral_type_id,
    created_by,
    patient_name,
    patient_phone,
    reason_for_referral,
    assign_by,
    patient_email,
    best_time_for_contact,
    name_of_practice,
    phone_no_practice,
    email_of_contact_person,
    relationship_to_patient,
    patient_dob,
  }) {
    try {
      const sql = `INSERT INTO Referrals (referral_source_type, referral_type_id, created_by, created_at ,patient_name,patient_phone,
    reason_for_referral,
    assign_by,
    patient_email,best_time_for_contact,name_of_practice,
    phone_no_practice,
    email_of_contact_person,
    relationship_to_patient ,patient_dob ) VALUES ("${
      referral_source_type || ""
    }", ${referral_type_id || ""}, "${created_by || ""}",'${moment().format(
        "YYYY-MM-DDTHH:mm:ss"
      )}',"${patient_name || ""}","${patient_phone || ""}",
              "${reason_for_referral || ""}","${assign_by || ""}",
                "${patient_email || ""}","${
        best_time_for_contact || moment().format("YYYY-MM-DDTHH:mm:ss")
      }","${name_of_practice || ""}","${phone_no_practice || ""}","${
        email_of_contact_person || ""
      }","${relationship_to_patient || ""}","${
        patient_dob || moment().format("YYYY-MM-DDTHH:mm:ss")
      }"
       );`;

      const res = await Dao.executeQuery(sql);
      return res;
    } catch (exp) {
      return response
        .status(400)
        .send({ errorMessage: exp.message, ResponseCode: "Fail" });
    }
  },

  async getReferral() {
    const sql = `select * from Referrals`;
    const res = await Dao.executeQuery(sql);
    console.log("res");
    console.log(res);
    return res;
  },

  async updateReferral() {
    const sql = `select * from Profile where email="${email}" AND password="${password}"`;
    const res = await Dao.executeQuery(sql);
    console.log("res");
    console.log(res);
    return res;
  },
};
