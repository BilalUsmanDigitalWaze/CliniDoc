const Dao = require("../../utilities/Dao.js");

module.exports = {

  async getAccToDays(doctorId,branchId) {
   
    const sql =`SELECT DS.from_date,DS.to_date,Slots.*,  
                Schedule.* from Doctor_slots DS
                INNER JOIN Slots 
                INNER JOIN Schedule ON 
                DS.doctor_id=${doctorId} 
                and DS.slot_id=Slots.id 
                and Schedule.Doctor_id=${doctorId} 
                and Slots.branch_id=${branchId}`
   
   const res = await Dao.executeQuery(sql);
    return res;
  },
};
