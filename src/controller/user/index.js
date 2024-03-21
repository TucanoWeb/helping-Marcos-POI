const Joi = require('joi');

const schemaUserCreate = Joi.object({
    name: Joi.string()
        .min(3)
        .max(40)
        .required(),

    password: Joi.string().required(),

    email: Joi.string().email().required()
})

const schemaUserLogin = Joi.object({

    password: Joi.string().required(),
    email: Joi.string().email().required()
})

const schemaUserDelete = Joi.string().email().required()

const schemaUserUpdate = Joi.object({
    name: Joi.string()
    .min(3)
    .max(40)
    .required(),
    password: Joi.string().required(),
    email: Joi.string().email().required()
})

module.exports = {
    schemaUserCreate,
    schemaUserLogin,
    schemaUserDelete,
    schemaUserUpdate
}