const Dao = require("../../utilities/Dao.js");
const moment = require("moment");

module.exports = {
  async addReferral({
    referral_source_type,
    referral_type_id,
    created_by,
    patient_name,
    dob,
    patient_phone,
    reason_for_referral,
    assign_by,
    email,
    best_time_for_contact,
  }) {
    try {
      const sql = `INSERT INTO Referrals (referral_source_type, referral_type_id, created_by, created_at ,patient_name,patient_phone,
    reason_for_referral,
    assign_by,
    email,best_time_for_contact ) VALUES ("${referral_source_type}", ${referral_type_id}, "${created_by}",'${moment().format(
        "YYYY-MM-DDTHH:mm:ss"
      )}',"${patient_name}","${patient_phone}",
              "${reason_for_referral}","${assign_by}",
                "${email}","${best_time_for_contact}");`;

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
