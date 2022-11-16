const Router = require('@koa/router');
const locatieService = require('../service/locatie');

const getLocaties = async (ctx) => {
  ctx.body = await locatieService.getAll();
};

const getLocatiesById = async (ctx) => {
  ctx.body = await locatieService.getById(ctx.params.id);
};

const createLocatie = async (ctx) => {
  ctx.body = await locatieService.create({
    ...ctx.request.body
  });
};

const deleteLocatie = async (ctx) => {
  await locatieService.deleteById(ctx.params.id);
  ctx.status = 204;
};

const updateLocatie = async (ctx) => {
  ctx.body = await locatieService.updateById(ctx.params.id, {
    ...ctx.request.body
  });
};



module.exports = (app) => {
  const router = new Router({
    prefix: '/locaties'
  });

  router.get('/', getLocaties);
  router.get('/:id', getLocatiesById);
  router.post('/', createLocatie);
  router.put('/:id', updateLocatie);
  router.delete('/:id', deleteLocatie);

  app
    .use(router.routes())
    .use(router.allowedMethods());
}