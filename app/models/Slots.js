const Dao = require("../../utilities/Dao.js");
const moment = require("moment");

module.exports = {
 async getSlots({slotId}){
    let sql =`select * from slots where id=${slotId}`
    let res = await Dao.executeQuery(sql);
    return res
 },
 async getHours({day}){
   let sql =`select * from slots where day=${day}`
   let res = await Dao.executeQuery(sql);
   return res
 }

};
