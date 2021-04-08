/* eslint-disable global-require, func-names */

module.exports = function (app) {
  // home
  app.use("/", require("./controllers/user"));
  app.use("/", require("./controllers/patient"));
  app.use("/", require("./controllers/doctor"));

  app.use("/", require("./controllers/referrals"));
  app.use('/',require("./controllers/appointment"))
  app.use('/',require("./controllers/schedule"))
  
};
