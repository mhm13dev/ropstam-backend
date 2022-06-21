const Router = require("express").Router;
const { signup, login, logout } = require("../controllers/auth");
const { createCar } = require("../controllers/cars");
const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/categories");
const { isLoggedIn, authenticate } = require("../middlewares/auth");
const { NewCarSchema } = require("../schemas/car.schema");
const { CategorySchema } = require("../schemas/category.schema");
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
  joiValidate(CategorySchema, "body"),
  createCategory
);
mainRouter.get("/api/categories", authenticate, getCategories);
mainRouter.get("/api/categories/:id", authenticate, getCategoryById);
mainRouter.patch(
  "/api/categories/:id",
  authenticate,
  joiValidate(CategorySchema, "body"),
  updateCategory
);
mainRouter.delete("/api/categories/:id", authenticate, deleteCategory);
// Categories Routes End

// Cars Routes Start
// Create New Car
mainRouter.post(
  "/api/cars",
  authenticate,
  joiValidate(NewCarSchema, "body"),
  createCar
);
// Cars Routes End
module.exports = {
  mainRouter,
};
