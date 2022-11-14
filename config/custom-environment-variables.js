const {
  database
} = require("./development");

module.exports = {
  env: "NODE_ENV",
  database: {
    user: "DB_USER",
    password: "DB_PW"
  }
}