const Joi = require("joi");

const customerQuerySchema = Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(20),
    status: Joi.string().valid("active", "inactive"),
    search: Joi.string().trim()
});

module.exports = customerQuerySchema;