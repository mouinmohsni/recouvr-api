const Joi = require('joi');


exports.createClientSchema = Joi.object({
    name: Joi.string().required().min(3),
    email: Joi.string().email().required(),
    phone: Joi.string().allow('', null),
    address: Joi.string().allow('', null)
});


exports.updateClientSchema = Joi.object({
    name: Joi.string().min(3),
    email: Joi.string().email(),
    phone: Joi.string().allow('', null),
    address: Joi.string().allow('', null)
}).min(1);
