const Koa = require('koa');
const {
	getLogger
} = require('./core/logging')
const config = require('config');
const bodyParser = require('koa-bodyparser');
const Router = require('@koa/router');
const transactionService = require('./service/transaction');

const NODE_ENV = config.get('env');
const LOG_LEVEL = config.get('log.level');
const LOG_DISABLED = config.get('log.disabled');

console.log({
	NODE_ENV,
	LOG_LEVEL,
	LOG_DISABLED
});

const app = new Koa();
const router = new Router();

app.use(bodyParser());

router.get('/api/transactions', async ctx => {
	getLogger().info(JSON.stringify(ctx.request));
	ctx.body = transactionService.getAll();
});

router.post('api/transactions', async ctx => {
	const newTransaction = transactionService.create({
		...ctx.request.body,
		date: new Date(ctx.request.body.date)
	});
	ctx.body = newTransaction;
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(9000, () => {
	getLogger().info('Server is listening on http://localhost:9000', {
		hello: 'world'
	});
});