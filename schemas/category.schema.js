const Joi = require("joi");

exports.CategorySchema = Joi.object().keys({
  name: Joi.string()
    .label("Category Name")
    .required()
    .trim()
    .pattern(/^[A-Z0-9 ]*$/)
    .uppercase()
    .messages({
      "string.pattern.base":
        '{#label} should be alphanumeric text with spaces. e.g. "Cars 24"',
    }),
});
