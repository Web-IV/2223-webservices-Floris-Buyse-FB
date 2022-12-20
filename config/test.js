module.exports = {
  port: 9000,
  log: {
    level: "test",
    disabled: true
  },
  database: {
    host: 'localhost',
    port: 3306,
    database: 'openluchtfitness_test',
    client: 'mysql2'
  }
}