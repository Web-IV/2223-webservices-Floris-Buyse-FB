const Router = require('@koa/router');
const locatieService = require('../service/locatie');
const Joi = require('joi');
const validate = require('./_validation');

const getLocaties = async (ctx) => {
  ctx.body = await locatieService.getAll();
};

const getLocatiesById = async (ctx) => {
  ctx.body = await locatieService.getById(ctx.params.id);
};

getLocatiesById.validationScheme = {
  params: Joi.object({
    id: Joi.number().invalid(0).integer().positive()
  })
}

const createLocatie = async (ctx) => {
  ctx.body = await locatieService.create({
    ...ctx.request.body
  });
  ctx.status = 201;
};

createLocatie.validationScheme = {
  body: {
    stad: Joi.string(),
    postcode: Joi.number().invalid(0).integer().positive(),
    straat: Joi.string(),
    nummer: Joi.number().invalid(0).integer().positive()
  }
}

const deleteLocatie = async (ctx) => {
  await locatieService.deleteById(ctx.params.id);
  ctx.status = 204;
};

deleteLocatie.validationScheme = {
  params: Joi.object({
    id: Joi.number().invalid(0).integer().positive()
  })
}

const updateLocatie = async (ctx) => {
  ctx.body = await locatieService.updateById(ctx.params.id, {
    ...ctx.request.body
  });
};

updateLocatie.validationScheme = {
  body: {
    stad: Joi.string(),
    postcode: Joi.number().invalid(0).integer().positive(),
    straat: Joi.string(),
    nummer: Joi.number().invalid(0).integer().positive()
  },
  params: Joi.object({
    id: Joi.number().invalid(0).integer().positive()
  })
}


module.exports = (app) => {
  const router = new Router({
    prefix: '/locaties'
  });

  router.get('/', getLocaties);
  router.get('/:id', validate(getLocatiesById.validationScheme), getLocatiesById);
  router.post('/', validate(createLocatie.validationScheme), createLocatie);
  router.put('/:id', validate(updateLocatie.validationScheme), updateLocatie);
  router.delete('/:id', validate(deleteLocatie.validationScheme), deleteLocatie);

  app
    .use(router.routes())
    .use(router.allowedMethods());
}