const Router = require('@koa/router');
const oefeningService = require('../service/oefening');
const Joi = require('joi');
const validate = require('./_validation');
const {
  hasPermission,
  permissions
} = require('../core/auth');

const getOefeningen = async (ctx) => {
  ctx.body = await oefeningService.getAll();
};

getOefeningen.validationScheme = {
  query: Joi.object({
    limit: Joi.number().positive().max(1000).optional(),
    offset: Joi.number().min(0).optional(),
  }).and('limit', 'offset'),
}

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

  router.get('/', hasPermission(permissions.read), validate(getOefeningen.validationScheme), getOefeningen);
  router.get('/:id', hasPermission(permissions.read), validate(getOefeningenById.validationScheme), getOefeningenById);
  router.post('/', hasPermission(permissions.write), validate(createOefening.validationScheme), createOefening);
  router.put('/:id', hasPermission(permissions.write), validate(updateOefening.validationScheme), updateOefening);
  router.delete('/:id', hasPermission(permissions.write), validate(updateOefening.validationScheme), updateOefening);

  app
    .use(router.routes())
    .use(router.allowedMethods());
}