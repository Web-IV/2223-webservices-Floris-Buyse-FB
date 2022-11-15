const {
  database
} = require("./development");

module.exports = {
  env: "NODE_ENV",
  database: {
    username: "DB_USER",
    password: "DB_PW"
  }
}