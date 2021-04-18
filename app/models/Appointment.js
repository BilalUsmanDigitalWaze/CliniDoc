const Dao = require("../../utilities/Dao.js");
const moment = require("moment");

module.exports = {
  async addAppointment({
    patient_id,
    administrator_id,
    appointment_type_id,
    schedule_id,
    row_source,
    created_by,
    modified_by,
    created_At,
    row_version,
    row_status,
    modified_at,
  }) {
    let sql = `INSERT INTO Appointment (patient_id,administrator_id,appointment_type_id,schedule_id,row_source,created_by,modified_by,created_At,row_version,row_status,modified_at)
        VALUES (${patient_id},${administrator_id},${appointment_type_id},${schedule_id},${row_source},${created_by},${modified_by},${created_At},${row_version},${row_status},${modified_at})`;

    const res = await Dao.executeQuery(sql);

    sql = `UPDATE Schedule
                    SET booked = true
                    WHERE id = ${schedule_id}; `;

    let res1 = await Dao.executeQuery(sql);
    res1 = { appoitnment: res, schedule: res1 };
    return res1;
  },
  async getAppointments() {
    const sql = `SELECT Patient.*,Administrator.* FROM Appointment INNER JOIN Patient INNER JOIN Administrator ON Appointment.administrator_id=Administrator.id and Appointment.patient_id=Patient.id `;
    const res = await Dao.executeQuery(sql);
    return res;
  },
  async getAppointments() {
    const sql = `SELECT Patient.*,Administrator.* FROM Appointment INNER JOIN Patient INNER JOIN Administrator ON Appointment.administrator_id=Administrator.id and Appointment.patient_id=Patient.id `;
    const res = await Dao.executeQuery(sql);
    return res;
  },
  async getAppointmentWaitingList() {
    //schedule_type_id=1 is for waiting

    const sql = `SELECT Appointment.*,Schedule_type.*,Patient.*,Administrator.*, Schedule.*
      FROM Appointment INNER JOIN Schedule INNER JOIN Administrator 
      INNER JOIN Schedule_type INNER JOIN Patient ON
      Appointment.administrator_id=Administrator.id 
      and Appointment.patient_id=Patient.id 
      and Appointment.schedule_id=Schedule.id and Schedule.schedult_type_id=1`;

    const res = await Dao.executeQuery(sql);
    return res;
  },
};
