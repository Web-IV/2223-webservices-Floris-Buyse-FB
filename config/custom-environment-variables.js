module.exports = {
  env: "NODE_ENV",
  port: "PORT",
  database: {
    host: "DB_HOST",
    port: "DB_PORT",
    user: "DB_USER",
    password: "DB_PW",
    name: "DB_NAME",
    database: "DB_DB",
    client: "DB_CLIENT"
  },
  auth: {
    jwksUri: 'AUTH_JWKS_URI',
    audience: 'AUTH_AUDIENCE',
    issuer: 'AUTH_ISSUER',
  }
}