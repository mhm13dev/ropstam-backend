const Router = require("express").Router;
const { signup, login, logout } = require("../controllers/auth");
const { createCategory } = require("../controllers/categories");
const { isLoggedIn, authenticate } = require("../middlewares/auth");
const { NewCategorySchema } = require("../schemas/category.schema");
const { SignupSchema, LoginSchema } = require("../schemas/user.schema");
const { joiValidate } = require("../utils/joi.validate");

const mainRouter = Router();

// User Routes Start
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
// User Routes End

// Categories Routes Start
// Create New Category
mainRouter.post(
  "/api/categories",
  authenticate,
  joiValidate(NewCategorySchema, "body"),
  createCategory
);
// Categories Routes End
module.exports = {
  mainRouter,
};
