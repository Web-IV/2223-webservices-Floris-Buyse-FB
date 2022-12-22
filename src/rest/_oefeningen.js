const Router = require('@koa/router');
const oefeningService = require('../service/oefening');
const Joi = require('joi');
const validate = require('./_validation');
const {
  hasPermission,
  permissions
} = require('../core/auth');

/**
 * @api {GET} /oefeningen Get information about all the oefeningen
 * @apiName getOefeningen
 * @apiGroup Oefeningen
 */

const getOefeningen = async (ctx) => {
  ctx.body = await oefeningService.getAll();
};

getOefeningen.validationScheme = {
  query: Joi.object({
    limit: Joi.number().positive().max(1000).optional(),
    offset: Joi.number().min(0).optional(),
  }).and('limit', 'offset'),
}

/**
 * @api {GET} /oefeningen/:id Get information about a specific oefening
 * @apiName getOefeningenById
 * @apiGroup Oefeningen
 * 
 * @apiParam {Number} id Oefening id
 */

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

/**
 * @api {POST} /oefeningen Create a new oefening
 * @apiName createOefeningen
 * @apiGroup Oefeningen
 * 
 * @apiParam {String} spiergroep Group of muscles, targeted by the oefening
 * @apiParam {String} moeilijkheidsgraad Difficulty of the oefening
 * @apiParam {Number} toestel_id Toestel id of the toestel on which you can perform the excersice
 * 
 *  * @apiParamExample {json} Post JSON-body text example:
 *     {
 *       "spiergroep": "triceps",
 *       "moeilijkheidsgraad": "easy"
 *       "toestel_id": 2,
 *     }
 */

createOefening.validationScheme = {
  body: {
    spiergroep: Joi.string(),
    moeilijkheidsgraad: Joi.string(),
    toestelid: Joi.number().invalid(0).integer().positive()
  }
}

/**
 * @api {DELETE} /oefeningen/:id Delete a specific oefening
 * @apiName deleteOefeningen
 * @apiGroup Oefeningen
 * 
 * @apiParam {Number} id Oefening id
 */

const deleteOefening = async (ctx) => {
  await oefeningService.deleteById(ctx.params.id);
  ctx.status = 204;
};

deleteOefening.validationScheme = {
  params: Joi.object({
    id: Joi.number().invalid(0).integer().positive()
  })
}

/**
 * @api {PUT} /oefeningen/:id Update a specific oefening
 * @apiName updateOefeningen
 * @apiGroup Oefeningen
 * 
 * @apiParam {Number} id Oefening id
 * 
 * @apiParam {String} spiergroep Group of muscles, targeted by the oefening
 * @apiParam {String} moeilijkheidsgraad Difficulty of the oefening
 * @apiParam {Number} toeste_id Toestel id of the toestel on which you can perform the excersice
 */

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