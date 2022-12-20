const Router = require('@koa/router');
const toestelService = require('../service/toestel');
const Joi = require('joi');
const validate = require('./_validation');
const {
  hasPermission,
  permissions
} = require('../core/auth');

const getToestellen = async (ctx) => {
  ctx.body = await toestelService.getAll();
};

getToestellen.validationScheme = {
  query: Joi.object({
    limit: Joi.number().positive().max(1000).optional(),
    offset: Joi.number().min(0).optional(),
  }).and('limit', 'offset'),
}

const getToestellenById = async (ctx) => {
  ctx.body = await toestelService.getById(ctx.params.id);
};

getToestellenById.validationScheme = {
  params: Joi.object({
    id: Joi.number().invalid(0).integer().positive()
  })
}

const createToestel = async (ctx) => {
  ctx.body = await toestelService.create({
    ...ctx.request.body
  });
};

createToestel.validationScheme = {
  body: {
    type: Joi.string(),
    locatieid: Joi.number().invalid(0).integer().positive()
  }
}

const deleteToestel = async (ctx) => {
  await toestelService.deleteById(ctx.params.id);
  ctx.status = 204;
};

deleteToestel.validationScheme = {
  params: Joi.object({
    id: Joi.number().invalid(0).integer().positive()
  })
}

const updateToestel = async (ctx) => {
  ctx.body = await toestelService.updateById(ctx.params.id, {
    ...ctx.request.body
  });
};

updateToestel.validationScheme = {
  body: {
    type: Joi.string(),
    locatieid: Joi.number().invalid(0).integer().positive()
  },
  params: Joi.object({
    id: Joi.number().invalid(0).integer().positive()
  })
}



module.exports = (app) => {
  const router = new Router({
    prefix: '/toestellen'
  });

  router.get('/', hasPermission(permissions.read), validate(getToestellen.validationScheme), getToestellen);
  router.get('/:id', hasPermission(permissions.read), validate(getToestellenById.validationScheme), getToestellenById);
  router.post('/', hasPermission(permissions.write), validate(createToestel.validationScheme), createToestel);
  router.put('/:id', hasPermission(permissions.write), validate(updateToestel.validationScheme), updateToestel);
  router.delete('/:id', hasPermission(permissions.write), validate(deleteToestel.validationScheme), deleteToestel);

  app
    .use(router.routes())
    .use(router.allowedMethods());
}