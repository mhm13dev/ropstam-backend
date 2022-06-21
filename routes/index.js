const Router = require("express").Router;
const { signup, login, logout, getMe } = require("../controllers/auth");
const {
  createCar,
  getCars,
  getCarById,
  updateCar,
  deleteCar,
  getCarsCount,
} = require("../controllers/cars");
const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getCategoriesCount,
} = require("../controllers/categories");
const { isLoggedIn, authenticate } = require("../middlewares/auth");
const { NewCarSchema, UpdateCarSchema } = require("../schemas/car.schema");
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

// Get Logged In User
mainRouter.get("/api/me", authenticate, getMe);

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

// Get All Categories
mainRouter.get("/api/categories", authenticate, getCategories);

// Get Category By ID
mainRouter.get("/api/categories/count", authenticate, getCategoriesCount);

// Get Category By ID
mainRouter.get("/api/categories/:id", authenticate, getCategoryById);

// Update Category
mainRouter.patch(
  "/api/categories/:id",
  authenticate,
  joiValidate(CategorySchema, "body"),
  updateCategory
);

// Delete Category
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

// Get All Cars
mainRouter.get("/api/cars", authenticate, getCars);

// Get All Cars Count
mainRouter.get("/api/cars/count", authenticate, getCarsCount);

// Get Car By ID
mainRouter.get("/api/cars/:id", authenticate, getCarById);

// Update Car
mainRouter.patch(
  "/api/cars/:id",
  authenticate,
  joiValidate(UpdateCarSchema, "body"),
  updateCar
);

// Delete Car
mainRouter.delete("/api/cars/:id", authenticate, deleteCar);
// Cars Routes End

module.exports = {
  mainRouter,
};
