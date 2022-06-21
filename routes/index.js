const Router = require("express").Router;
const { signup } = require("../controllers/auth");
const { isLoggedIn } = require("../middlewares/auth");
const { SignupSchema } = require("../schemas/user.schema");
const { joiValidate } = require("../utils/joi.validate");

const mainRouter = Router();

// Signup For a New User Account
mainRouter.post(
  "/api/signup",
  joiValidate(SignupSchema, "body"),
  isLoggedIn,
  signup
);

module.exports = {
  mainRouter,
};
