const Router = require("express").Router;
const { signup, login, logout } = require("../controllers/auth");
const { isLoggedIn } = require("../middlewares/auth");
const { SignupSchema, LoginSchema } = require("../schemas/user.schema");
const { joiValidate } = require("../utils/joi.validate");

const mainRouter = Router();

// Signup For a New User Account
mainRouter.post(
  "/api/signup",
  joiValidate(SignupSchema, "body"),
  isLoggedIn,
  signup
);

// Login to User Account
mainRouter.post(
  "/api/login",
  joiValidate(LoginSchema, "body"),
  isLoggedIn,
  login
);

// Logout from User Account
mainRouter.post("/api/logout", logout);

module.exports = {
  mainRouter,
};
