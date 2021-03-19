const express = require("express");
const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname + "/.env"),
});
const jwt = require("jsonwebtoken");

// const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
// secret key
const accessTokenSecret = "cliniDoc";

const app = express();
// config
const config = require("./config/config");

// database config
const db = require("./config/db");

app.use(express.json());
app.use(express.urlencoded({ extended: false })); //Parse URL-encoded bodies
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));

app.use(cors());
app.options("*", cors());

require("./app/routes")(app);

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message; // eslint-disable-line no-param-reassign
  res.locals.error = config.isDev ? err : {}; // eslint-disable-line no-param-reassign
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(config.server.port, function (err) {
  if (err) console.log("Error in server setup");
  console.log("Server listening on Port", config.server.port);
});
