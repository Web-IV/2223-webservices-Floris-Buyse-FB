const Router = require('@koa/router');
const toestelService = require('../service/toestel');
const Joi = require('joi');
const validate = require('./_validation');
const {
  hasPermission,
  permissions
} = require('../core/auth');

/**
 * @api {GET} /toestellen Get information about all the toestellen
 * @apiName getToestellen
 * @apiGroup Toestellen
 * 
 */

const getToestellen = async (ctx) => {
  ctx.body = await toestelService.getAll();
};

getToestellen.validationScheme = {
  query: Joi.object({
    limit: Joi.number().positive().max(1000).optional(),
    offset: Joi.number().min(0).optional(),
  }).and('limit', 'offset'),
}

/**
 * @api {GET} /toestellen/:id Get information about a specific toestel
 * @apiName getToestellenById
 * @apiGroup Toestellen
 * 
 * @apiParam {Number} id Locatie id
 */

const getToestellenById = async (ctx) => {
  ctx.body = await toestelService.getById(ctx.params.id);
};

getToestellenById.validationScheme = {
  params: Joi.object({
    id: Joi.number().invalid(0).integer().positive()
  })
}

/**
 * @api {POST} /toestellen Create a new toestel
 * @apiName createToestel
 * @apiGroup Toestellen
 * 
 * @apiParam {String} type Bodyweight or free weight excercise
 * @apiParam {Number} locatie_id id of the location where this toestel is
 * 
 * @apiParamExample {json} Post JSON-body text example:
 *     {
 *       "type": "bodyweight",
 *       "locatie_id": 2,
 *     }
 */

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

/**
 * @api {DELETE} /toestellen/:id Delete a specific toestel
 * @apiName deleteToestel
 * @apiGroup Toestellen
 * 
 * @apiParam {Number} id Toestel id
 */

const deleteToestel = async (ctx) => {
  await toestelService.deleteById(ctx.params.id);
  ctx.status = 204;
};

deleteToestel.validationScheme = {
  params: Joi.object({
    id: Joi.number().invalid(0).integer().positive()
  })
}

/**
 * @api {PUT} /toestellen/:id Update a specific toestel
 * @apiName updateToestel
 * @apiGroup Toestellen
 * 
 * @apiParam {Number} id Toestel id
 * @apiParam {String} type Bodyweight or free weight excercise
 * @apiParam {Number} locatie_id id of the location where this toestel is
 */

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