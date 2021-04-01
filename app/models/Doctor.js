const Dao = require("../../utilities/Dao.js");
const moment = require("moment");

module.exports = {
  async getDoctors({ department_id }) {
    const sql = `select * from Doctor where department_id=${department_id}`;
    const res = await Dao.executeQuery(sql);
    return res;
  },
};
