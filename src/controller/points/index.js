const Joi = require('joi');

const schemaPoints = Joi.object({
    name: Joi.string()
        .min(3)
        .max(40)
        .required(),
    category_id: Joi.string().required(),
    description: Joi.string().required()
})

const schemaPointsUpdate = Joi.string().required()

const schemaPointsDelete = Joi.string().required()


module.exports = {
    schemaPoints,
    schemaPointsDelete,
    schemaPointsUpdate
}