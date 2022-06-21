const Joi = require("joi");

exports.NewCategorySchema = Joi.object().keys({
  name: Joi.string()
    .label("Category Name")
    .required()
    .trim()
    .alphanum()
    .lowercase(),
});
