const Koa = require('koa');
const {
	getLogger
} = require('./core/logging')
const config = require('config');

const NODE_ENV = config.get('env');
const LOG_LEVEL = config.get('log.level');
const LOG_DISABLED = config.get('log.disabled');

console.log({
	NODE_ENV,
	LOG_LEVEL,
	LOG_DISABLED
});

const app = new Koa();

app.use(async (ctx) => {
	ctx.body = 'Hello World';
});

app.listen(9000, () => {
	getLogger().info('Server is listening on http://localhost:9000', {
		hello: 'world'
	});
});