const installLocatieRouter = require('./_locaties');
const installToestelRouter = require('./_toestellen');
const installOefeningRouter = require('./_oefeningen');
const installHealthRouter = require('./_health');
const Router = require('@koa/router');

module.exports = (app) => {
  const router = new Router({
    prefix: '/api'
  });

  installLocatieRouter(router);
  installToestelRouter(router);
  installOefeningRouter(router);
  installHealthRouter(router);

  app.use(router.routes()).use(router.allowedMethods());
}