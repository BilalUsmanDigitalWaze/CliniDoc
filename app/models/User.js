const Dao = require("../../utilities/Dao.js");
const moment = require("moment");

module.exports = {
  async insertUser() {
    // const sql = `select * from room_master where id=${room_id}`;
    const res = await Dao.executeQuery(sql);
    return res;
  },

  async getUser(email, password) {

    const sql = `select * from Profile where email="${email}" AND AES_DECRYPT(password="${password}",UNHEX("${process.env.SECRET_PASSPHRASE}"))`;
    const res = await Dao.executeQuery(sql);
    console.log("res");
    console.log(res);
    return res;
  },
};
