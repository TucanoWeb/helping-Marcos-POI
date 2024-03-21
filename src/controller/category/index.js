const Joi = require('joi');

const schemaCategory = Joi.object({
    name: Joi.string()
        .min(3)
        .max(40)
        .required(),
})

const schemaCategoryUpdate = Joi.string().required()

const schemaCategoryDelete = Joi.string().required()


module.exports = {
    schemaCategory,
    schemaCategoryDelete,
    schemaCategoryUpdate
}