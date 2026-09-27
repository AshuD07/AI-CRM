const Joi = require("joi");

const createCustomerSchema = Joi.object({
    name: Joi.string().required(),

    email: Joi.string().email().required(),

    phone: Joi.string(),

    company: Joi.string(),

    status: Joi.string()
        .valid("active", "inactive")
        .default("active"),

    assignedTo: Joi.string()
});

const updateCustomerSchema = Joi.object({
    name: Joi.string(),

    email: Joi.string().email(),

    phone: Joi.string(),

    company: Joi.string(),

    status: Joi.string()
        .valid("active", "inactive"),

    assignedTo: Joi.string()
});


module.exports = {
    createCustomerSchema,
    updateCustomerSchema
};

