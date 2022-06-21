const Joi = require("joi");

exports.CategorySchema = Joi.object().keys({
  name: Joi.string()
    .label("Category Name")
    .required()
    .trim()
    .pattern(/^[a-z0-9_]*$/)
    .lowercase()
    .messages({
      "string.pattern.base":
        "{#label} should be alphanumeric text with underscores. e.g. cars_24",
    }),
});
