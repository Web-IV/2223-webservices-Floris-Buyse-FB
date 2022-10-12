const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  defaultMeta: {
    service: 'user-service'
  },
  transports: [
    new winston.transports.Console({
      silent: false
    }),
  ],
});

module.exports.getLogger = () => {
  return logger;
};