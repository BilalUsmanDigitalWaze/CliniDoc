const Dao = require("../../utilities/Dao.js");
const moment = require("moment");

module.exports = {
  async getDepartments() {
    const sql = `select * from Department`;
    const res = await Dao.executeQuery(sql);
    return res;
  },
};
