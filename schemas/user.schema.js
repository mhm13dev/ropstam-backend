const Joi = require("joi");

exports.SignupSchema = Joi.object().keys({
  email: Joi.string().label("Email").required().trim().lowercase().email(),
});

exports.LoginSchema = Joi.object().keys({
  email: Joi.string().label("Email").required().trim().lowercase().email(),
  password: Joi.string().label("Password").required(),
});
