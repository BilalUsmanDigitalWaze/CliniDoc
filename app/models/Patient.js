const Dao = require("../../utilities/Dao.js");
const moment = require("moment");

module.exports = {
  async addPatient({
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
    emergency_name,
    emergency_phone,
    emergency_relationship,
  }) {
    const sql = `INSERT INTO Patient (referral_id,patient_name,address,phone,
          dob,legal_gardian,email,marital_status
          ,race,reason_for_contact,insurance_name,insurance_member_id
          ,insurance_group,insured_person,relationship_to_insured
          ,insured_dob,insured_ssn,insurance_phone,ssn,emergency_name,emergency_phone,emergency_relationship) VALUES (${referral_id}
                    ,"${patient_name || ""}","${address || ""}",${
      phone || ""
    },"${dob}","${legal_gardian || ""}"
          ,"${email || ""}","${marital_status || ""}","${race | ""}","${
      reason_for_contact || ""
    }"
          ,"${insurance_name}","${insurance_member_id}","${
      insurance_group || ""
    }"
          ,"${insured_person}","${
      relationship_to_insured || ""
    }","${insured_dob}"
          ,"${insured_ssn}","${insurance_phone}","${ssn}","${emergency_name}","${emergency_phone}","${emergency_relationship}")`;
    const res = await Dao.executeQuery(sql);
    return res;
  },

  async getPatients() {
    const sql = `select * from Patient`;
    const res = await Dao.executeQuery(sql);
    console.log("res");
    console.log(res);
    return res;
  },
};
