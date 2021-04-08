const Dao = require("../../utilities/Dao.js");
const moment = require("moment");
const { compareSync } = require("bcryptjs");

module.exports = {
  // async insert(){
  //   // CREATE TABLE fruits (
  //   //   `fruit_name` VARCHAR(20) NOT NULL PRIMARY KEY,
  //   //   `color` VARCHAR(20),
  //   //   `price` INT
  //   //   );
  // // const sql ="drop table hours"
  //   // const sql = `alter table hours add (booked BOOLEAN)`
  //       // const sql=    'insert into hours (id,hour,slot) values (3,3,"morning")'
  //   // const sql = 'create table slots (id INT NOT NULL PRIMARY KEY,day varchar(30),hour_id INT)'

  //   // const sql = 'insert into slots (id, day,hour_id) values(1,"tuesday",1)'

  //   //     SELECT Orders.OrderID, Customers.CustomerName, Orders.OrderDate
  // // FROM Orders
  // // INNER JOIN Customers ON Orders.CustomerID=Customers.CustomerID;

  //   //  const sql ="select slot.*, hour.* from slots slot INNER JOIN hours hour ON slot.hour_id=hour.id and slot.day='monday'"

  //   // const sql = 'select * from Doctor'
  //   // const sql = 'insert into schedule (id,slot_id,doctor_id) values (4,1,1)'

  //   const day="morning"
  //   const item =1
  //   const sql =`select schedule.*, slot.*, hour.* from schedule INNER JOIN slots slot INNER JOIN hours hour ON slot.hour_id=hour.id and schedule.doctor_id=1 and slot.day="monday"`

  //   let res = await Dao.executeQuery(sql);
  //     console.log(res)
  //     return res
  // },

  async getScheduleAccToDoctor(doctorId) {
    // const sql = `select schedule.*, slot.*, hour.* from schedule INNER JOIN slots slot INNER JOIN hours hour ON slot.hour_id=hour.id and schedule.doctor_id=${doctorId}`;

    const sql = `select schedule.id as schedule_id, slot.*, hour.* from schedule INNER JOIN slots slot INNER JOIN hours hour ON slot.hour_id=hour.id and schedule.doctor_id=${doctorId}`;

    // const sql = `SELECT sch.id as schedule_id,usr.id , usr.socket_id FROM visits rd, users usr WHERE rd.visit_id=${visit_id}
    //     AND ( rd.contractor_user_id = usr.id  OR rd.customer_user_id = usr.id ) `;

    let res = await Dao.executeQuery(sql);
    return res;
  },

  async getAccToDays(doctorId, days) {
    let list = [];
    let res;

    // await days.map(async (day,index)=>{
    //       const sql =`select schedule.*, slot.*, hour.* from schedule INNER JOIN slots slot INNER JOIN hours hour ON slot.hour_id=hour.id and schedule.doctor_id=${doctorId} and slot.day="${day}"`
    //       res = await Dao.executeQuery(sql);
    //       console.log(res,'times',index)
    //       list.push(res)
    //     })

    const sql =
      "SELECT s.id as schedule_id,s.doctor_id, sl.id as slot_id , sl.hour FROM schedule s INNER JOIN slots sl ON s.slot_id = sl.id";
    res = await Dao.executeQuery(sql);

    // returning undefined
    return res;
  },
};
