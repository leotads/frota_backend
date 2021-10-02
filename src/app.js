require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

const app = require("express")();
const consign = require("consign");

consign()
  //  .include("/config/passport.js")
  //  .then("/config/middlewares.js")
  //  .then("/config/swagger.js")
  .then("/src/api/controllers")
  .then("/src/routes")
  .into(app);

module.exports = app;