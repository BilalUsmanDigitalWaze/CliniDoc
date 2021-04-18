const Dao = require("../../utilities/Dao.js");
const moment = require("moment");

module.exports = {
  async getReceptionistHistroy( receptionistId) {
      
    const sql =`select Profile.*,Administrator.* 
    ,Appointment.* ,Patient.* from Profile INNER JOIN
     Administrator INNER JOIN Appointment INNER JOIN 
     Patient ON Profile.id=${receptionistId} and
      Administrator.profile_id=${receptionistId} and 
      Appointment.administrator_id=Administrator.id and 
      Appointment.patient_id=Patient.id`

  
    // const sql =`create table Appointment_type (id INT PRIMARY KEY AUTO_INCREMENT,
    //   description VARCHAR(50),
    //   label VARCHAR(20),
    //   urgency_level INT
    //   )`

    // const sql = 'alter table Schedule add column schedult_type_id INT,ADD COLUMN end_time TIME, ADD COLUMN start_time TIME'
   

    //  const sql = 'insert into Patient (patient_name,address,phone,dob,email,race,legal_gardian,reason_for_contact,referral_id,ssn) values("hello","asdffa","3242","9999-12-31 23:59:59","sfa","adfa","saf","afaf",1,1)'
    // const sql = 'insert into Referrals (referral_type_id,patient_name,patient_phone,reason_for_referral,assign_by,best_time_for_contact,referral_source_type) values(1,"sfa","fasa","adsfa","adfa","9999-12-31 23:59:59","adfaf")'
 

    const res = await Dao.executeQuery(sql);
    return res;
  },
  async getReceptionists( ) {
      
    const sql =`select Profile.*,Administrator.* 
    from Profile INNER JOIN Administrator ON
     Profile.id=Administrator.profile_id`

    const res = await Dao.executeQuery(sql);
    return res;
  }
};
