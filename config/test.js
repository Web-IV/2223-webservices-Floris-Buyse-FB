module.exports = {
  port: 9000,
  log: {
    level: "test",
    disabled: true
  },
  database: {
    host: '127.0.0.1',
    port: 3306,
    database: 'openluchtfitness_test',
    client: 'mysql2'
  }
}