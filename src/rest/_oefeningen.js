const Router = require('@koa/router');
const Joi = require('joi');
const oefeningService = require('../service/oefening');
const validate = require('./_validation');

const getOefeningen = async (ctx) => {
  ctx.body = await oefeningService.getAll();
};

const getOefeningenById = async (ctx) => {
  ctx.body = await oefeningService.getById(ctx.params.id);
};

getOefeningenById.validationScheme = {
  params: Joi.object({
    id: Joi.number().invalid(0).integer().positive()
  })
}

const createOefening = async (ctx) => {
  ctx.body = await oefeningService.create({
    ...ctx.request.body
  });
};

createOefening.validationScheme = {
  body: {
    spiergroep: Joi.string(),
    moeilijkheidsgraad: Joi.string(),
    toestelid: Joi.number().invalid(0).integer().positive()
  }
}

const deleteOefening = async (ctx) => {
  await oefeningService.deleteById(ctx.params.id);
  ctx.status = 204;
};

deleteOefening.validationScheme = {
  params: Joi.object({
    id: Joi.number().invalid(0).integer().positive()
  })
}

const updateOefening = async (ctx) => {
  ctx.body = await oefeningService.updateById(ctx.params.id, {
    ...ctx.request.body
  });
};

updateOefening.validationScheme = {
  body: {
    spiergroep: Joi.string(),
    moeilijkheidsgraad: Joi.string(),
    toestelid: Joi.number().invalid(0).integer().positive()
  },
  params: Joi.object({
    id: Joi.number().invalid(0).integer().positive()
  })
}

module.exports = (app) => {
  const router = new Router({
    prefix: '/oefeningen'
  });

  router.get('/', getOefeningen);
  router.get('/:id', validate(getOefeningenById.validationScheme), getOefeningenById);
  router.post('/', validate(createOefening.validationScheme), createOefening);
  router.put('/:id', validate(updateOefening.validationScheme), updateOefening);
  router.delete('/:id', validate(updateOefening.validationScheme), updateOefening);

  app
    .use(router.routes())
    .use(router.allowedMethods());
}