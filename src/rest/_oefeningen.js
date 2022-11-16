const Router = require('@koa/router');
const oefeningService = require('../service/oefening');

const getOefeningen = async (ctx) => {
  ctx.body = await oefeningService.getAll();
};

const getOefeningenById = async (ctx) => {
  ctx.body = await oefeningService.getById(ctx.params.id);
};

const createOefening = async (ctx) => {
  ctx.body = await oefeningService.create({
    ...ctx.request.body
  });
};

const deleteOefening = async (ctx) => {
  await oefeningService.deleteById(ctx.params.id);
  ctx.status = 204;
};

const updateOefening = async (ctx) => {
  ctx.body = await oefeningService.updateById(ctx.params.id, {
    ...ctx.request.body
  });
};



module.exports = (app) => {
  const router = new Router({
    prefix: '/oefeningen'
  });

  router.get('/', getOefeningen);
  router.get('/:id', getOefeningenById);
  router.post('/', createOefening);
  router.put('/:id', updateOefening);
  router.delete('/:id', deleteOefening);

  app
    .use(router.routes())
    .use(router.allowedMethods());
}