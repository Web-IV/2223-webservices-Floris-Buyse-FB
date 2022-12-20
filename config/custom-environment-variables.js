module.exports = {
  env: "NODE_ENV",
  port: "PORT",
  database: {
    user: "DB_USER",
    password: "DB_PW",
  },
  auth: {
    jwksUri: 'AUTH_JWKS_URI',
    audience: 'AUTH_AUDIENCE',
    issuer: 'AUTH_ISSUER',
    userInfo: 'AUTH_USER_INFO',
  }
}