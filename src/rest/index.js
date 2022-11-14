const installLocatieRouter = require('./_locaties');
const installToestelRouter = require('./_toestellen');
const Router = require('@koa/router');

module.exports = (app) => {
  const router = new Router({
    prefix: '/api'
  });

  installLocatieRouter(router);
  installToestelRouter(router);

  app.use(router.routes()).use(router.allowedMethods());
}