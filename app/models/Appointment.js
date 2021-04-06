const Dao = require("../../utilities/Dao.js");
const moment = require("moment");

module.exports = {
  async addAppointment({patient_id,administrator_id,appointment_type_id,schedule_id,row_source,created_by,modified_by,created_At,row_version,row_status,modified_at}) {
        const sql= `INSERT INTO Appointment (patient_id,administrator_id,appointment_type_id,schedule_id,row_source,created_by,modified_by,created_At,row_version,row_status,modified_at)
        VALUES (${patient_id},${administrator_id},${appointment_type_id},${schedule_id},${row_source},${created_by},${modified_by},${created_At},${row_version},${row_status},${modified_at})`;

        const res = await Dao.executeQuery(sql);
        return res;
  },
};
