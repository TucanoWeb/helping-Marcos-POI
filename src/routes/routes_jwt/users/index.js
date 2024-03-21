const Joi = require('@hapi/joi');
const { isUser } = require("../../middlewares/auth");

const userRoute = [
  {
    method: 'GET',
    path: '/',
    options: {
      pre: [{ method: isUser, assign: 'auth' }],
      handler: (request, h) => {
        if (request.pre.auth.isUser) {
          return 'First route!';
        } else {
          return h.response('You are not authorized to access this route').code(401);
        }
      },
      validate: {
        query: Joi.object({
          param1: Joi.string().required(),
          param2: Joi.number().integer().min(1).max(100)
          // Define other query parameters as needed
        }),
        headers: Joi.object({
          'authorization': Joi.string().required()
        }).unknown()
      }
    }
  },
  {
    method: 'POST',
    path: '/login',
    options: {
      pre: [{ method: isUser, assign: 'auth' }],
      handler: (request, h) => {
        if (request.pre.auth.isUser) {
          return 'First route!';
        } else {
          return h.response('You are not authorized to access this route').code(401);
        }
      },
      validate: {
        query: Joi.object({
          param1: Joi.string().required(),
          param2: Joi.number().integer().min(1).max(100)
          // Define other query parameters as needed
        }),
        headers: Joi.object({
          'authorization': Joi.string().required()
        }).unknown()
      }
    }
  },
];

module.exports = userRoute;
