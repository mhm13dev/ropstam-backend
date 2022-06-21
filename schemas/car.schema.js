const Joi = require("joi");

exports.NewCarSchema = Joi.object().keys({
  model: Joi.string()
    .label("Model")
    .required()
    .trim()
    .pattern(/^[a-zA-Z0-9 ]*$/)
    .messages({
      "string.pattern.base":
        '{#label} should be alphanumeric text with spaces. e.g. "BMW X1"',
    }),
  make: Joi.string()
    .label("Make")
    .required()
    .trim()
    .pattern(/^[a-zA-Z0-9 ]*$/)
    .messages({
      "string.pattern.base":
        '{#label} should be alphanumeric text with spaces. e.g. "Nissan"',
    }),
  color: Joi.string()
    .label("Color")
    .required()
    .trim()
    .pattern(/^[a-zA-Z ]*$/)
    .messages({
      "string.pattern.base":
        '{#label} should be text with spaces. e.g. "Sky Blue"',
    }),
  reg_num: Joi.string()
    .label("Registration Number")
    .required()
    .trim()
    .pattern(/^[A-Z0-9 ]*$/)
    .uppercase()
    .messages({
      "string.pattern.base":
        '{#label} should be alphanumeric text with spaces. e.g. "LAT 324"',
    }),
  category_id: Joi.string()
    .label("Category ID")
    .required()
    .trim()
    .lowercase()
    .pattern(/^[a-f\d]{24}$/i)
    .messages({
      "string.pattern.base": "{#label} is invalid",
    }),
});

exports.UpdateCarSchema = Joi.object().keys({
  model: Joi.string()
    .label("Model")
    .trim()
    .pattern(/^[a-zA-Z0-9 ]*$/)
    .messages({
      "string.pattern.base":
        '{#label} should be alphanumeric text with spaces. e.g. "BMW X1"',
    }),
  make: Joi.string()
    .label("Make")
    .trim()
    .pattern(/^[a-zA-Z0-9 ]*$/)
    .messages({
      "string.pattern.base":
        '{#label} should be alphanumeric text with spaces. e.g. "Nissan"',
    }),
  color: Joi.string()
    .label("Color")
    .trim()
    .pattern(/^[a-zA-Z ]*$/)
    .messages({
      "string.pattern.base":
        '{#label} should be text with spaces. e.g. "Sky Blue"',
    }),
  reg_num: Joi.string()
    .label("Registration Number")
    .trim()
    .pattern(/^[A-Z0-9 ]*$/)
    .uppercase()
    .messages({
      "string.pattern.base":
        '{#label} should be alphanumeric text with spaces. e.g. "LAT 324"',
    }),
  category_id: Joi.string()
    .label("Category ID")
    .trim()
    .lowercase()
    .pattern(/^[a-f\d]{24}$/i)
    .messages({
      "string.pattern.base": "{#label} is invalid",
    }),
});
