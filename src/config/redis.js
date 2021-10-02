require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

module.exports = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
}