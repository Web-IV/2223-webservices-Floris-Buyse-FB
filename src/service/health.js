const pacakgeJSON = require('../../package.json')

const ping = () => ({
  pong: true
});

//naam en version teruggeven, con. database, etc...
const getVersion = () => ({
  version: pacakgeJSON.version,
  name: pacakgeJSON.name,
  env: process.env.NODE_ENV
});

module.exports = {
  ping,
  getVersion
}