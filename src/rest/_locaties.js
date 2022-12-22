const Router = require('@koa/router');
const locatieService = require('../service/locatie');
const Joi = require('joi');
const validate = require('./_validation');
const {
  hasPermission,
  permissions,
} = require('../core/auth');

/**
 * @api {GET} /locaties Get information about all the locaties
 * @apiName getLocaties
 * @apiGroup Locaties
 * 
 * @apiSucces {Number} id Locatie id
 * @apiSucces {String} stad Name of the city
 * @apiSucces {Number} postcode Postalcode of the city
 * @apiSucces {String} straat Street name of the location
 * @apiSucces {Number} nummer Number in the street
 * 
 * @apiSuccesExample {json} Succesful Response:
 *    HTTP/1.1 200 OK
 *    "items": [
 *      {
 *          "id": 3,
 *          "stad": "Gent",
 *          "postcode": 9000,
 *          "straat": "Bijloke site",
 *          "nummer": 10
 *      },
 *      {
 *          "id": 1,
 *          "stad": "Gent",
 *          "postcode": 9000,
 *          "straat": "Blaarmeersen",
 *          "nummer": 1
 *      },
 *      {
 *          "id": 2,
 *          "stad": "Gent",
 *          "postcode": 9000,
 *          "straat": "Rabotpark",
 *          "nummer": 95
 *      }
 *  ]
 * 
 */

const getLocaties = async (ctx) => {
  ctx.body = await locatieService.getAll();
};

getLocaties.validationScheme = {
  query: Joi.object({
    limit: Joi.number().positive().max(1000).optional(),
    offset: Joi.number().min(0).optional(),
  }).and('limit', 'offset'),
}

/**
 * @api {GET} /locaties/:id Get information about a specific locatie
 * @apiName getLocatiesById
 * @apiGroup Locaties
 * 
 * @apiParam {Number} id Locatie id
 */

const getLocatiesById = async (ctx) => {
  ctx.body = await locatieService.getById(ctx.params.id);
};

getLocatiesById.validationScheme = {
  params: Joi.object({
    id: Joi.number().invalid(0).integer().positive()
  })
}

/**
 * @api {POST} /locaties Create a new locatie
 * @apiName createLocaties
 * @apiGroup Locaties
 * 
 * @apiParam {String} stad Name of the city
 * @apiParam {Number} postcode Postalcode of the city
 * @apiParam {String} straat Street name of the location
 * @apiParam {Number} nummer Number in the street
 * 
 * @apiParamExample {json} Post JSON-body text example:
 *     {
 *       "stad": "gent",
 *       "postcode": 9000,
 *       "straat": "Veldstraat",
 *       "nummer": 15
 *     }
 */

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

/**
 * @api {DELETE} /locaties/:id Delete a specific locatie
 * @apiName deleteLocaties
 * @apiGroup Locaties
 * 
 * @apiParam {Number} id Locatie id
 */

const deleteLocatie = async (ctx) => {
  await locatieService.deleteById(ctx.params.id);
  ctx.status = 204;
};

deleteLocatie.validationScheme = {
  params: Joi.object({
    id: Joi.number().invalid(0).integer().positive()
  })
}

/**
 * @api {PUT} /locaties/:id Update a specific locatie
 * @apiName updateLocaties
 * @apiGroup Locaties
 * 
 * @apiParam {Number} id Locatie id
 * @apiParam {String} stad Name of the city
 * @apiParam {Number} postcode Postalcode of the city
 * @apiParam {String} straat Street name of the location
 * @apiParam {Number} nummer Number in the street
 */

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

  router.get('/', hasPermission(permissions.read), validate(getLocaties.validationScheme), getLocaties);
  router.get('/:id', hasPermission(permissions.read), validate(getLocatiesById.validationScheme), getLocatiesById);
  router.post('/', hasPermission(permissions.write), validate(createLocatie.validationScheme), createLocatie);
  router.put('/:id', hasPermission(permissions.write), validate(updateLocatie.validationScheme), updateLocatie);
  router.delete('/:id', hasPermission(permissions.write), validate(deleteLocatie.validationScheme), deleteLocatie);

  app
    .use(router.routes())
    .use(router.allowedMethods());
}