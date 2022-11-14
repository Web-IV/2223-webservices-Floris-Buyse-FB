const Koa = require('koa');
const config = require('config');
const bodyParser = require('koa-bodyparser');
const {
  initializeLogger,
  getLogger
} = require('./core/logging');
const installRest = require('./rest/index');
const {
  initializeDatabase
} = require('./data/index');


const NODE_ENV = config.get('env');
const LOG_LEVEL = config.get('log.level');
const LOG_DISABLED = config.get('log.disabled');

const main = async () => {

  initializeLogger({
    level: LOG_LEVEL,
    disabled: LOG_DISABLED,
    defaultMeta: {
      NODE_ENV
    },
  });

  const app = new Koa();

  const logger = getLogger();

  app.use(bodyParser());

  installRest(app);

  app.listen(9000);
  logger.info("server started");
}

main();