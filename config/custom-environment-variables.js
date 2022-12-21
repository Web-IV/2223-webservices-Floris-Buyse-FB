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
    client_id: 'AUTH_CLIENT_ID',
    client_secret: 'AUTH_CLIENT_SECRET',
    token_url: 'AUTH_TOKEN_URL',
    testUser: {
      userId: 'AUTH_TEST_USER_USER_ID',
      username: 'AUTH_TEST_USER_USERNAME',
      password: 'AUTH_TEST_USER_PASSWORD',
    },
  }
}