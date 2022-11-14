const Router = require('@koa/router');
const toestelService = require('../service/toestel');

const getToestellen = async (ctx) => {
  ctx.body = toestelService.getAll();
};

const getToestellenById = async (ctx) => {
  ctx.body = toestelService.getById(ctx.params.id);
};

const createToestel = async (ctx) => {
  ctx.body = toestelService.create({
    ...ctx.request.body
  });
};

const deleteToestel = async (ctx) => {
  toestelService.deleteById(ctx.params.id);
  ctx.status = 204;
};

const updateToestel = async (ctx) => {
  ctx.body = toestelService.updateById(ctx.params.id, {
    ...ctx.request.body
  });
};



module.exports = (app) => {
  const router = new Router({
    prefix: '/toestellen'
  });

  router.get('/', getToestellen);
  router.get('/:id', getToestellenById);
  router.post('/', createToestel);
  router.put('/:id', updateToestel);
  router.delete('/:id', deleteToestel);

  app
    .use(router.routes())
    .use(router.allowedMethods());
}