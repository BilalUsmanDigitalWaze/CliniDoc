const Dao = require("../../utilities/Dao.js");
const moment = require("moment");

module.exports = {
  async addAppointment({patient_id,administrator_id,appointment_type_id,schedule_id,row_source,created_by,modified_by,created_At,row_version,row_status,modified_at}) {
        let sql= `INSERT INTO Appointment (patient_id,administrator_id,appointment_type_id,schedule_id,row_source,created_by,modified_by,created_At,row_version,row_status,modified_at)
        VALUES (${patient_id},${administrator_id},${appointment_type_id},${schedule_id},${row_source},${created_by},${modified_by},${created_At},${row_version},${row_status},${modified_at})`;
         
       const res = await Dao.executeQuery(sql);
       
       sql =`UPDATE Schedule
                    SET booked = true
                    WHERE id = ${schedule_id}; `

        let res1 = await Dao.executeQuery(sql);
        res1= {appoitnment:res,schedule:res1}
        return res1;
  },

};
