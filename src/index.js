const Koa = require('koa');
const {
  getLogger
} = require('./core/logging')
const config = require('config');
const bodyParser = require('koa-bodyparser');
const Router = require('@koa/router');
const locatieService = require('./service/locatie');

const logger = getLogger();
const NODE_ENV = config.get('env');
const LOG_LEVEL = config.get('log.level');
const LOG_DISABLED = config.get('log.disabled');
logger.info(`${NODE_ENV} - level : ${LOG_LEVEL}, disabled : ${LOG_DISABLED}`);

const app = new Koa();
const router = new Router();
app.use(bodyParser());

router.get('/api/locatie', async (ctx) => {
  ctx.body = locatieService.getAll();
});

router.get('/api/locatie/:id', async (ctx) => {
  ctx.body = locatieService.getById(ctx.params.id);
});

router.post('/api/locatie', async (ctx) => {
  ctx.body = locatieService.create({
    ...ctx.request.body
  });
});

router.delete('/api/locatie/:id', async (ctx) => {
  locatieService.deleteById(ctx.params.id);
  ctx.status = 204;
});

router.put('/api/locatie/:id', async (ctx) => {
  ctx.body = locatieService.updateById(ctx.params.id, {
    ...ctx.request.body
  });
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(9000);
logger.info("server started");