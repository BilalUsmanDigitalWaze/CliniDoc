const Dao = require("../../utilities/Dao.js");
const moment = require("moment");

module.exports = {
  async getDoctors({ department_id }) {
    const sql = `select * from Doctor where department_id=${department_id}`;
    
    const res = await Dao.executeQuery(sql);
    return res;
  },
  async setDoctorSlot({slotId,doctorId,fromDate,toDate}){
    
    const sql = `INSERT INTO Doctor_slots (slot_id,doctor_id,from_date,to_date) values(${slotId},${doctorId},"${fromDate}","${toDate}")`
    // const sql = 'CREATE TABLE Doctor_slots (id INT PRIMARY KEY AUTO_INCREMENT,slot_id INT,doctor_id INT,from_date DATE,to_date DATE)'
    const res = await Dao.executeQuery(sql);
    return res;
  }
};
